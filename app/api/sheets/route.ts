import { NextResponse } from "next/server";
import { google } from "googleapis";

// ─── Types ────────────────────────────────────────────────────────────────────

type Row = string[];

interface SheetPlan {
    id: string;
    name: string;
    sub: string;
    price: number;
    accent: string;
    features: string[];
}

interface HostingPlan {
    id: string;
    name: string;
    price: number;
    desc: string;
}

interface Location {
    id: string;
    name: string;
    multiplier: number;
    desc: string;
}

interface Addon {
    id: string;
    n: string;
    p: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Parse a cell that looks like ["item1","item2","item3"]
 * Handles both JSON arrays and comma-separated strings.
 */
function parseFeatures(raw: string): string[] {
    if (!raw) return [];
    const trimmed = raw.trim();
    try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String);
    } catch { }
    // Fallback: strip brackets and split on '","'
    return trimmed
        .replace(/^\[|\]$/g, "")
        .split(/",\s*"/)
        .map((s) => s.replace(/^"|"$/g, "").trim())
        .filter(Boolean);
}

function toNum(v: string): number {
    return parseFloat(v?.replace(/[^0-9.-]/g, "") || "0") || 0;
}

/**
 * Skip the header row (index 0) and map each data row.
 * Rows that are completely empty are also skipped.
 */
function dataRows(rows: Row[]): Row[] {
    return rows.slice(1).filter((r) => r.some((c) => c?.trim()));
}

// ─── Row parsers ─────────────────────────────────────────────────────────────

function parsePlanRow(r: Row): SheetPlan {
    // id | name | sub | price | accent | features
    return {
        id: r[0]?.trim() ?? "",
        name: r[1]?.trim() ?? "",
        sub: r[2]?.trim() ?? "",
        price: toNum(r[3]),
        accent: r[4]?.trim() ?? "#FFFFFF",
        features: parseFeatures(r[5] ?? ""),
    };
}

function parseHostingRow(r: Row): HostingPlan {
    // id | name | price | desc | icon
    return {
        id: r[0]?.trim() ?? "",
        name: r[1]?.trim() ?? "",
        price: toNum(r[2]),
        desc: r[3]?.trim() ?? "",
    };
}

function parseLocationRow(r: Row): Location {
    // id | name | multiplier | desc | icon
    return {
        id: r[0]?.trim() ?? "",
        name: r[1]?.trim() ?? "",
        multiplier: toNum(r[2]),
        desc: r[3]?.trim() ?? "",
    };
}

function parseAddonRow(r: Row): Addon {
    // id | n | p
    return {
        id: r[0]?.trim() ?? "",
        n: r[1]?.trim() ?? "",
        p: toNum(r[2]),
    };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

function getAuth() {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? "";

    let keyJson: Record<string, string>;
    try {
        // Support both plain JSON string and base64-encoded JSON
        const decoded = raw.startsWith("{")
            ? raw
            : Buffer.from(raw, "base64").toString("utf-8");
        keyJson = JSON.parse(decoded);
    } catch {
        throw new Error(
            "GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON or base64-encoded JSON."
        );
    }

    return new google.auth.GoogleAuth({
        credentials: keyJson,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
}

// ─── Handler ─────────────────────────────────────────────────────────────────

// Cache the response for 5 minutes (300 s) at the edge so every page load
// doesn't hit the Sheets API.
export const revalidate = 300;

export async function GET() {
    try {
        const auth = getAuth();
        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLE_SHEETS_DATA_ID ?? "";

        if (!spreadsheetId) {
            return NextResponse.json(
                { error: "GOOGLE_SHEETS_DATA_ID is not set." },
                { status: 500 }
            );
        }

        // ── Fetch all ranges in a single batchGet ────────────────────────────────
        // Sheet tab names must match exactly what you have in the spreadsheet.
        const RANGES = [
            "LOCAL_PLANS!A:F",
            "CORP_PLANS!A:F",
            "HOSTING_PLANS!A:E",
            "LOCATIONS!A:E",
            "IND_ADDONS!A:D",   // industry | id | name | price
        ];

        const batchRes = await sheets.spreadsheets.values.batchGet({
            spreadsheetId,
            ranges: RANGES,
        });

        const valueRanges = batchRes.data.valueRanges ?? [];

        const getRaw = (i: number): Row[] =>
            (valueRanges[i]?.values as Row[] | undefined) ?? [];

        // ── LOCAL_PLANS ──────────────────────────────────────────────────────────
        const localPlans: SheetPlan[] = dataRows(getRaw(0)).map(parsePlanRow);

        // ── CORP_PLANS ───────────────────────────────────────────────────────────
        const corpPlans: SheetPlan[] = dataRows(getRaw(1)).map(parsePlanRow);

        // ── HOSTING_PLANS ────────────────────────────────────────────────────────
        const hostingPlans: HostingPlan[] = dataRows(getRaw(2)).map(parseHostingRow);

        // ── LOCATIONS ────────────────────────────────────────────────────────────
        const locations: Location[] = dataRows(getRaw(3)).map(parseLocationRow);

        // ── IND_ADDONS ───────────────────────────────────────────────────────────
        // The flat sheet layout is:  industry_name | addon_id | addon_name | price
        // We group rows by industry name into a Record<string, Addon[]>
        //
        // Expected columns: A=industry  B=id  C=name  D=price
        // (If your sheet has A=industry  B=name  C=price with no id column,
        //  the parseAddonRow helper will still work — id just becomes the name cell.)
        const indAddonsFlat = dataRows(getRaw(4));
        const indAddons: Record<string, Addon[]> = {};

        for (const r of indAddonsFlat) {
            const industry = r[0]?.trim();
            if (!industry) continue;

            // Support both 3-col (id|name|price) and 4-col (industry|id|name|price)
            // Here we already sliced off the industry col, so cols are r[1..]:
            const addon: Addon = {
                id: r[1]?.trim() ?? "",
                n: r[2]?.trim() ?? "",
                p: toNum(r[3]),
            };

            if (!indAddons[industry]) indAddons[industry] = [];
            if (addon.n) indAddons[industry].push(addon);
        }

        return NextResponse.json({
            localPlans,
            corpPlans,
            hostingPlans,
            locations,
            indAddons,
        });
    } catch (err: unknown) {
        console.error("[/api/sheets] Error:", err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 }
        );
    }
}