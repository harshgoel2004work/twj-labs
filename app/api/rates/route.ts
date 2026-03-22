import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
    try {
        const res = await fetch("https://open.er-api.com/v6/latest/INR");
        if (!res.ok) throw new Error(`Rates API responded with ${res.status}`);
        
        const data = await res.json();
        
        // Return only the rates object for simplicity
        return NextResponse.json(data.rates || {});
    } catch (err: unknown) {
        console.error("[/api/rates] Error:", err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Failed to fetch rates" },
            { status: 500 }
        );
    }
}
