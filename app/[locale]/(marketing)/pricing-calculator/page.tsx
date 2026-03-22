"use client"

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
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

interface SheetsData {
    localPlans: Plan[];
    corpPlans: Plan[];
    hostingPlans: HostingPlan[];
    locations: Location[];
    indAddons: Record<string, Addon[]>;
}

interface FormData {
    country: string;
    scale: "local" | "corporate" | "";
    businessType: string;
    pages: number;
    additionalPages: string;
    visitors: string;
    tech: string;
    timeline: string;
    cms: string;
    // Lead info
    email: string;
    name: string;
    phone: string;
    businessName: string;
    designation: string;
}

interface Estimate {
    low: number;
    high: number;
    adjustedBase: number;
    hostingCost: number;
    cheapAddons: Addon[];
    richAddons: Addon[];
    basePlan: Plan;
    hostingPlan: HostingPlan | null;
    locationTier: Location;
    rushMult: number;
}

// ─── Static UI data (doesn't come from Sheets) ────────────────────────────────

const COUNTRIES = [
    "India", "United States", "Canada", "United Kingdom", "United Arab Emirates", "Saudi Arabia",
    "China", "Japan", "South Korea", "Australia", "New Zealand", "South Africa",
    "Albania", "Austria", "Belgium", "Czech Republic", "Denmark", "Finland", "France", "Germany",
    "Greece", "Hungary", "Ireland", "Italy", "Netherlands", "Norway", "Poland", "Portugal",
    "Romania", "Russia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine",
];

// International countries → use "intl" location tier
const INTL_COUNTRIES = new Set([
    "United States", "United Kingdom", "United Arab Emirates", "Australia", "Canada",
    "Germany", "France", "Singapore", "New Zealand", "Ireland", "Netherlands", "Sweden",
    "Norway", "Denmark", "Finland", "Switzerland", "Austria", "Belgium", "Israel", "Japan",
    "South Korea", "Italy", "Spain", "Portugal", "Greece",
]);

const COUNTRY_CODES = [
    { country: "India", code: "+91", flag: "🇮🇳" },
    { country: "United States", code: "+1", flag: "🇺🇸" },
    { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { country: "Canada", code: "+1", flag: "🇨🇦" },
    { country: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
    { country: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { country: "Australia", code: "+61", flag: "🇦🇺" },
    { country: "New Zealand", code: "+64", flag: "🇳🇿" },
    { country: "China", code: "+86", flag: "🇨🇳" },
    { country: "Japan", code: "+81", flag: "🇯🇵" },
    { country: "South Korea", code: "+82", flag: "🇰🇷" },
    { country: "South Africa", code: "+27", flag: "🇿🇦" },
    { country: "Germany", code: "+49", flag: "🇩🇪" },
    { country: "France", code: "+33", flag: "🇫🇷" },
    { country: "Italy", code: "+39", flag: "🇮🇹" },
    { country: "Spain", code: "+34", flag: "🇪🇸" },
    { country: "Netherlands", code: "+31", flag: "🇳🇱" },
    { country: "Switzerland", code: "+41", flag: "🇨🇭" },
];

const BUSINESS_TYPES = [
    { id: "cafe", label: "Café / Restaurant", icon: "☕" },
    { id: "ecommerce", label: "E-Commerce", icon: "🛒" },
    { id: "saas", label: "SaaS", icon: "⚡" },
    { id: "b2b", label: "Startup / B2B", icon: "🚀" },
    { id: "portfolio", label: "Portfolio / Agency", icon: "🎨" },
    { id: "healthcare", label: "Healthcare / Clinic", icon: "🏥" },
    { id: "realestate", label: "Real Estate", icon: "🏠" },
    { id: "education", label: "Education / Course", icon: "📚" },
    { id: "ngo", label: "NGO / Non-Profit", icon: "🤝" },
    { id: "event", label: "Events / Hospitality", icon: "🎪" },
    { id: "finance", label: "Finance / Legal", icon: "⚖️" },
    { id: "salon", label: "Salon / Spa", icon: "💇‍♀️" },
    { id: "gym", label: "Gym / Fitness", icon: "🏋️‍♂️" },
    { id: "other", label: "Something Else", icon: "✦" },
];

// Maps businessType → sheet industry name (must match IND_ADDONS sheet column A)
const BUSINESS_TO_INDUSTRY: Record<string, { local: string | null; corporate: string | null }> = {
    cafe: { local: "Restaurant", corporate: "E-commerce" },
    ecommerce: { local: "Retail Shop", corporate: "E-commerce" },
    saas: { local: "SaaS", corporate: "SaaS" },
    b2b: { local: "SaaS", corporate: "SaaS" },
    portfolio: { local: "Photography", corporate: "Interior Design" },
    healthcare: { local: "Clinic", corporate: "Healthcare" },
    realestate: { local: "Real Estate", corporate: "Real Estate" },
    education: { local: "Coaching Center", corporate: "EdTech" },
    ngo: { local: "Event Planner", corporate: "Event Planner" },
    event: { local: "Event Planner", corporate: "Event Planner" },
    finance: { local: "Pharmacy", corporate: "Fintech" },
    salon: { local: "Salon", corporate: "Salon" },
    gym: { local: "Gym", corporate: "Gym" },
    other: { local: null, corporate: null },
};

const VISITOR_RANGES = [
    { id: "micro", label: "Under 500", sub: "Just starting out" },
    { id: "small", label: "500 – 5,000", sub: "Growing audience" },
    { id: "medium", label: "5k – 50k", sub: "Established presence" },
    { id: "large", label: "50k+", sub: "High-traffic operation" },
];

const TECH_OPTIONS = [
    { id: "wordpress", label: "WordPress", desc: "Best for content-heavy sites & blogs", icon: "🔵" },
    { id: "framer", label: "Framer", desc: "Stunning animations & visual flair", icon: "🟣" },
    { id: "custom", label: "Custom Code", desc: "Full control, built from scratch", icon: "🟠" },
    { id: "choose", label: "Let You Decide", desc: "We pick the best tool for your goal", icon: "⚪" },
];

const TIMELINE_OPTIONS = [
    { id: "rush", label: "Within 7 Days", sub: "Rush delivery" },
    { id: "fast", label: "Within 14 Days", sub: "Expedited" },
    { id: "month", label: "Within a Month", sub: "Comfortable pace" },
    { id: "flexible", label: "Flexible / Let's Discuss", sub: "No fixed deadline" },
];

const CMS_OPTIONS = [
    { id: "never", label: "No, someone else handles it", sub: "Agency / developer manages" },
    { id: "rarely", label: "Rarely (a few times a year)", sub: "Occasional updates" },
    { id: "monthly", label: "Yes, monthly updates", sub: "Regular refreshes" },
    { id: "frequent", label: "Yes, very frequently", sub: "Daily or weekly changes" },
];

const STEPS = [
    { id: 1, label: "Business Profile" },
    { id: 2, label: "Website Scope" },
    { id: 3, label: "Project Details" },
];

// ─── Pricing engine ───────────────────────────────────────────────────────────

function getLocationTier(country: string, locations: Location[]): Location {
    const fallback = locations.find(l => l.id === "tier2") ?? locations[0];
    if (!country || !locations.length) return fallback;
    if (INTL_COUNTRIES.has(country)) return locations.find(l => l.id === "intl") ?? fallback;
    return fallback;
}

function getBasePlan(scale: string, pages: number, localPlans: Plan[], corpPlans: Plan[]): Plan | null {
    const plans = scale === "corporate" ? corpPlans : localPlans;
    if (!plans.length) return null;
    if (pages <= 1) return plans.find(p => p.id === "single") ?? null;
    if (pages <= 5) return plans.find(p => p.id === "starter") ?? null;
    if (pages <= 10) return plans.find(p => p.id === "growth") ?? null;
    if (pages <= 20) return plans.find(p => p.id === "premium") ?? null;
    return plans.find(p => p.id === "app") ?? plans[plans.length - 1];
}

function getHostingPlan(visitors: string, cms: string, hostingPlans: HostingPlan[]): HostingPlan | null {
    if (!hostingPlans.length) return null;
    if (visitors === "large" || cms === "frequent") return hostingPlans.find(h => h.id === "enterprise") ?? null;
    if (visitors === "medium" || cms === "monthly") return hostingPlans.find(h => h.id === "pro") ?? null;
    if (visitors === "small") return hostingPlans.find(h => h.id === "basic") ?? null;
    return hostingPlans.find(h => h.id === "none") ?? null;
}

function getRushMultiplier(timeline: string): number {
    if (timeline === "rush") return 1.25;
    if (timeline === "fast") return 1.10;
    return 1.0;
}

function getAddons(businessType: string, scale: string, indAddons: Record<string, Addon[]>): Addon[] {
    const mapping = BUSINESS_TO_INDUSTRY[businessType];
    if (!mapping) return [];
    const key = scale === "corporate" ? mapping.corporate : mapping.local;
    return (key && indAddons[key]) ? indAddons[key] : [];
}

function calculateEstimate(data: FormData, sheets: SheetsData): Estimate | null {
    const basePlan = getBasePlan(data.scale, data.pages, sheets.localPlans, sheets.corpPlans);
    if (!basePlan) return null;

    const locationTier = getLocationTier(data.country, sheets.locations);
    const rushMult = getRushMultiplier(data.timeline);
    const hostingPlan = getHostingPlan(data.visitors, data.cms, sheets.hostingPlans);
    const allAddons = getAddons(data.businessType, data.scale, sheets.indAddons);

    const adjustedBase = Math.round(basePlan.price * locationTier.multiplier * rushMult);
    const hostingCost = hostingPlan?.price ?? 0;

    const cheapAddons = [...allAddons].sort((a, b) => a.p - b.p).slice(0, 2);
    const richAddons = [...allAddons].sort((a, b) => b.p - a.p).slice(0, 5);

    const low = adjustedBase + hostingCost + cheapAddons.reduce((s, a) => s + a.p, 0);
    const high = adjustedBase + hostingCost + richAddons.reduce((s, a) => s + a.p, 0);

    return { low, high, adjustedBase, hostingCost, cheapAddons, richAddons, basePlan, hostingPlan, locationTier, rushMult };
}

// ─── Formatters ───────────────────────────────────────────────────────────────

// ─── Currency configuration ──────────────────────────────────────────────────

interface CurrencyConfig {
    code: string;
    locale: string;
    symbol: string;
}

const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
    "India": { code: "INR", locale: "en-IN", symbol: "₹" },
    "United States": { code: "USD", locale: "en-US", symbol: "$" },
    "Canada": { code: "CAD", locale: "en-CA", symbol: "$" },
    "Australia": { code: "AUD", locale: "en-AU", symbol: "$" },
    "New Zealand": { code: "NZD", locale: "en-NZ", symbol: "$" },
    "Japan": { code: "JPY", locale: "ja-JP", symbol: "¥" },
    "South Korea": { code: "KRW", locale: "ko-KR", symbol: "₩" },
    "China": { code: "CNY", locale: "zh-CN", symbol: "¥" },
    "United Arab Emirates": { code: "AED", locale: "ar-AE", symbol: "د.إ" },
    "Saudi Arabia": { code: "SAR", locale: "ar-SA", symbol: "﷼" },
    "South Africa": { code: "ZAR", locale: "en-ZA", symbol: "R" },
    // Europe entirety -> EUR
    "Austria": { code: "EUR", locale: "de-AT", symbol: "€" },
    "Belgium": { code: "EUR", locale: "nl-BE", symbol: "€" },
    "Finland": { code: "EUR", locale: "fi-FI", symbol: "€" },
    "France": { code: "EUR", locale: "fr-FR", symbol: "€" },
    "Germany": { code: "EUR", locale: "de-DE", symbol: "€" },
    "Greece": { code: "EUR", locale: "el-GR", symbol: "€" },
    "Ireland": { code: "EUR", locale: "en-IE", symbol: "€" },
    "Italy": { code: "EUR", locale: "it-IT", symbol: "€" },
    "Netherlands": { code: "EUR", locale: "nl-NL", symbol: "€" },
    "Portugal": { code: "EUR", locale: "pt-PT", symbol: "€" },
    "Spain": { code: "EUR", locale: "es-ES", symbol: "€" },
    "Sweden": { code: "EUR", locale: "sv-SE", symbol: "€" },
    "Norway": { code: "EUR", locale: "nb-NO", symbol: "€" },
    "Denmark": { code: "EUR", locale: "da-DK", symbol: "€" },
    "Switzerland": { code: "EUR", locale: "de-CH", symbol: "€" },
    "Poland": { code: "EUR", locale: "pl-PL", symbol: "€" },
    "Russia": { code: "EUR", locale: "ru-RU", symbol: "€" },
    "Turkey": { code: "EUR", locale: "tr-TR", symbol: "€" },
    "Ukraine": { code: "EUR", locale: "uk-UA", symbol: "€" },
    "United Kingdom": { code: "EUR", locale: "en-GB", symbol: "€" },
    "Czech Republic": { code: "EUR", locale: "cs-CZ", symbol: "€" },
    "Hungary": { code: "EUR", locale: "hu-HU", symbol: "€" },
    "Romania": { code: "EUR", locale: "ro-RO", symbol: "€" },
    "Albania": { code: "EUR", locale: "sq-AL", symbol: "€" },
};

function getCurrency(country: string): CurrencyConfig {
    return CURRENCY_CONFIGS[country] || CURRENCY_CONFIGS["India"];
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmt(n: number, country: string, rates?: Record<string, number>): string {
    const config = getCurrency(country);
    const val = rates && config.code !== "INR" ? n * (rates[config.code] || 1) : n;

    if (config.code === "INR") {
        if (val >= 100000) return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
        if (val >= 1000) return `₹${Math.round(val / 1000)}K`;
        return `₹${Math.round(val).toLocaleString("en-IN")}`;
    }

    // International: use standard compact notation or just symbol
    const formatter = new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: config.code,
        notation: "compact",
        maximumFractionDigits: 1,
    });
    return formatter.format(val);
}

function fmtFull(n: number, country: string, rates?: Record<string, number>): string {
    const config = getCurrency(country);
    const val = rates && config.code !== "INR" ? n * (rates[config.code] || 1) : n;

    return new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: config.code,
        maximumFractionDigits: 0,
    }).format(val);
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function RadioCard({ checked, onClick, children, className = "" }: {
    checked: boolean; onClick: () => void; children: React.ReactNode; className?: string;
}) {
    return (
        <button type="button" onClick={onClick}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 ${checked ? "border-[#554ae8] bg-[#554ae8]/10" : "border-[#252525] bg-[#151515] hover:border-[#333]"
                } ${className}`}
        >{children}</button>
    );
}

function RadioDot({ checked }: { checked: boolean }) {
    return (
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "border-[#554ae8]" : "border-[#444]"
            }`}>
            {checked && <div className="w-1.5 h-1.5 rounded-full bg-[#554ae8]" />}
        </div>
    );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/30 mb-3">{label}</p>
            {children}
        </div>
    );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`rounded-lg bg-[#1a1a1a] animate-pulse ${className}`} />
    );
}

function LoadingState() {
    return (
        <section className="w-full py-16 md:py-28 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 space-y-3">
                    <Skeleton className="h-3 w-48 mx-auto" />
                    <Skeleton className="h-10 w-96 mx-auto" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden">
                    <div className="p-10 space-y-6" style={{ background: "#0D0D0D" }}>
                        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                    </div>
                    <div className="p-10 space-y-4 border border-white/[0.07]">
                        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <section className="w-full py-16 md:py-28 px-4 md:px-16">
            <div className="max-w-md mx-auto text-center">
                <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-xl">⚠</div>
                <h3 className="text-white font-semibold mb-2">Couldn't load pricing data</h3>
                <p className="text-xs text-white/35 mb-6 leading-relaxed">{message}</p>
                <button onClick={onRetry}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-white border border-[#252525] hover:border-[#554ae8]/40 transition-colors">
                    Try again
                </button>
            </div>
        </section>
    );
}

// ─── Country Select ───────────────────────────────────────────────────────────

function CountrySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const filtered = COUNTRIES.filter(c => c.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button type="button" onClick={() => setOpen(v => !v)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${open ? "border-[#554ae8]" : "border-[#252525] hover:border-[#333]"
                    } bg-[#151515] text-left`}
            >
                <span className={value ? "text-white" : "text-white/30"}>{value || "Select your country…"}</span>
                <svg className={`w-4 h-4 text-white/30 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute z-100 mt-2 w-full bg-[#111] border border-[#252525] rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-2 border-b border-[#1a1a1a]">
                        <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                            placeholder="Search…" className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none px-2 py-1" />
                    </div>
                    <div className="max-h-64 overflow-y-auto overscroll-contain custom-scrollbar touch-action-pan-y" style={{ touchAction: "pan-y" }}>
                        {filtered.map(c => (
                            <button key={c} type="button"
                                onClick={() => { onChange(c); setOpen(false); setQuery(""); }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${c === value ? "text-[#554ae8] bg-[#554ae8]/10" : "text-white/70 hover:text-white hover:bg-white/5"
                                    }`}>{c}</button>
                        ))}
                        {filtered.length === 0 && <p className="px-4 py-3 text-sm text-white/30">No results</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Slider ───────────────────────────────────────────────────────────────────

function Slider({ min, max, step, value, onChange }: {
    min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div className="relative w-full flex items-center" style={{ height: 24 }}>
            <div className="relative w-full h-1.5 rounded-full bg-[#222]">
                <div className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${pct}%`, background: "#554ae8" }} />
                <input type="range" min={min} max={max} step={step} value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer" style={{ height: "100%", zIndex: 10 }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#554ae8] bg-[#0D0D0D] shadow-lg shadow-[#554ae8]/20"
                    style={{ left: `calc(${pct}% - 10px)`, pointerEvents: "none" }} />
            </div>
        </div>
    );
}

// ─── Step forms ───────────────────────────────────────────────────────────────

function Step1({ data, update }: { data: FormData; update: (k: keyof FormData, v: unknown) => void }) {
    return (
        <div className="space-y-7">
            <FieldGroup label="Where are you based?">
                <CountrySelect value={data.country} onChange={v => update("country", v)} />
            </FieldGroup>

            <FieldGroup label="Business scale">
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: "local", label: "Local Business", sub: "Small to mid-size, regional focus" },
                        { id: "corporate", label: "Corporate", sub: "Large org, national or global reach" },
                    ].map(opt => (
                        <RadioCard key={opt.id} checked={data.scale === opt.id} onClick={() => update("scale", opt.id)}>
                            <div className="flex items-start gap-2">
                                <RadioDot checked={data.scale === opt.id} />
                                <div>
                                    <p className="text-sm font-medium text-white leading-tight">{opt.label}</p>
                                    <p className="text-[10px] text-white/35 mt-0.5 leading-snug">{opt.sub}</p>
                                </div>
                            </div>
                        </RadioCard>
                    ))}
                </div>
            </FieldGroup>

            <FieldGroup label="What type of business is this?">
                <div className="grid grid-cols-3 gap-2">
                    {BUSINESS_TYPES.map(bt => (
                        <button key={bt.id} type="button" onClick={() => update("businessType", bt.id)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-150 ${data.businessType === bt.id
                                    ? "border-[#554ae8] bg-[#554ae8]/10"
                                    : "border-[#252525] bg-[#151515] hover:border-[#333]"
                                }`}
                        >
                            <span className="text-xl leading-none">{bt.icon}</span>
                            <span className="text-[10px] text-white/70 leading-tight">{bt.label}</span>
                        </button>
                    ))}
                </div>
            </FieldGroup>
        </div>
    );
}

function Step2({ data, update }: { data: FormData; update: (k: keyof FormData, v: unknown) => void }) {
    return (
        <div className="space-y-7">
            <FieldGroup label="How many pages do you need?">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white/50">Total pages</span>
                    <span className="text-2xl font-bold" style={{ color: "#554ae8" }}>
                        {data.pages}{data.pages === 100 ? "+" : ""}
                    </span>
                </div>
                <Slider min={1} max={100} step={1} value={data.pages} onChange={v => update("pages", v)} />
                <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-mono text-white/25">1 page</span>
                    <span className="text-[10px] font-mono text-white/25">100+ pages</span>
                </div>
            </FieldGroup>

            <FieldGroup label="Describe any additional or custom pages">
                <textarea value={data.additionalPages}
                    onChange={e => update("additionalPages", e.target.value)}
                    placeholder={`e.g. "A job board with filters, an interactive pricing configurator…"`}
                    rows={3}
                    className="w-full bg-[#151515] border border-[#252525] rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/20 outline-none resize-none focus:border-[#554ae8]/50 transition-colors leading-relaxed"
                />
                <p className="text-[10px] text-white/25 mt-1.5">Unique functionality beyond standard pages affects your estimate.</p>
            </FieldGroup>

            <FieldGroup label="Expected monthly visitors">
                <div className="grid grid-cols-2 gap-2">
                    {VISITOR_RANGES.map(vr => (
                        <RadioCard key={vr.id} checked={data.visitors === vr.id} onClick={() => update("visitors", vr.id)}>
                            <div className="flex items-start gap-2">
                                <RadioDot checked={data.visitors === vr.id} />
                                <div>
                                    <p className="text-sm font-medium text-white">{vr.label}</p>
                                    <p className="text-[10px] text-white/35">{vr.sub}</p>
                                </div>
                            </div>
                        </RadioCard>
                    ))}
                </div>
            </FieldGroup>

            <FieldGroup label="Preferred technology">
                <div className="grid grid-cols-2 gap-2">
                    {TECH_OPTIONS.map(t => (
                        <RadioCard key={t.id} checked={data.tech === t.id} onClick={() => update("tech", t.id)}>
                            <div className="flex items-start gap-2">
                                <span className="text-base leading-none mt-0.5">{t.icon}</span>
                                <div>
                                    <p className="text-sm font-medium text-white">{t.label}</p>
                                    <p className="text-[10px] text-white/35 leading-snug mt-0.5">{t.desc}</p>
                                </div>
                            </div>
                        </RadioCard>
                    ))}
                </div>
            </FieldGroup>
        </div>
    );
}

function Step3({ data, update }: { data: FormData; update: (k: keyof FormData, v: unknown) => void }) {
    return (
        <div className="space-y-7">
            <FieldGroup label="How fast do you need this?">
                <div className="space-y-2">
                    {TIMELINE_OPTIONS.map(t => (
                        <RadioCard key={t.id} checked={data.timeline === t.id} onClick={() => update("timeline", t.id)}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <RadioDot checked={data.timeline === t.id} />
                                    <span className="text-sm text-white">{t.label}</span>
                                </div>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex-shrink-0 ${data.timeline === t.id
                                        ? "border-[#554ae8]/40 text-[#554ae8] bg-[#554ae8]/10"
                                        : "border-[#252525] text-white/30"
                                    }`}>{t.sub}</span>
                            </div>
                        </RadioCard>
                    ))}
                </div>
            </FieldGroup>

            <FieldGroup label="Will you manage & update content frequently?">
                <div className="space-y-2">
                    {CMS_OPTIONS.map(c => (
                        <RadioCard key={c.id} checked={data.cms === c.id} onClick={() => update("cms", c.id)}>
                            <div className="flex items-center gap-3">
                                <RadioDot checked={data.cms === c.id} />
                                <div>
                                    <p className="text-sm text-white">{c.label}</p>
                                    <p className="text-[10px] text-white/35">{c.sub}</p>
                                </div>
                            </div>
                        </RadioCard>
                    ))}
                </div>
            </FieldGroup>
        </div>
    );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
    return (
        <div className="flex items-center gap-0 mb-8">
            {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${s.id < current ? "bg-[#554ae8] border-[#554ae8] text-white"
                                : s.id === current ? "border-[#554ae8] text-[#554ae8] bg-transparent"
                                    : "border-[#252525] text-white/25 bg-transparent"
                            }`}>
                            {s.id < current ? (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : s.id}
                        </div>
                        <span className={`text-xs hidden sm:block ${s.id === current ? "text-white/60" : "text-white/22"}`}>
                            {s.label}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`w-8 md:w-12 h-px mx-2 transition-colors ${s.id < current ? "bg-[#554ae8]/30" : "bg-[#1e1e1e]"}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Right panel (live brief) ─────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex items-start justify-between gap-4 py-2.5 border-b border-[#1a1a1a] last:border-0">
            <span className="text-xs text-white/30 shrink-0">{label}</span>
            <span className="text-xs text-white/75 text-right">{value}</span>
        </div>
    );
}

function RightPanel({
    data, sheets, rates, onSubmit,
}: {
    data: FormData;
    sheets: SheetsData | null;
    rates: Record<string, number> | null;
    onSubmit: () => void;
}) {
    const btLabel = BUSINESS_TYPES.find(b => b.id === data.businessType)?.label;
    const techLabel = TECH_OPTIONS.find(t => t.id === data.tech)?.label;
    const tlLabel = TIMELINE_OPTIONS.find(t => t.id === data.timeline)?.label;
    const cmsLabel = CMS_OPTIONS.find(c => c.id === data.cms)?.label;
    const visLabel = VISITOR_RANGES.find(v => v.id === data.visitors)?.label;
    const scaleLabel = data.scale === "local" ? "Local Business" : data.scale === "corporate" ? "Corporate" : null;

    const filledCount = [
        data.country, data.scale, data.businessType,
        data.pages > 1 ? true : null,
        data.visitors, data.tech, data.timeline, data.cms,
    ].filter(Boolean).length;
    const totalFields = 8;
    const completeness = Math.round((filledCount / totalFields) * 100);
    const isReady = filledCount >= 6 && !!sheets;

    const estimate = isReady && sheets ? calculateEstimate(data, sheets) : null;

    return (
        <div className="p-8 lg:p-10 border border-white/[0.07] rounded-r-2xl flex flex-col gap-6" style={{ minHeight: "700px" }}>
            <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/25 mb-1">Estimate in progress</p>
                <h3 className="text-xl font-semibold text-white">Your Project Brief</h3>
                <p className="text-xs text-white/35 mt-1.5 leading-relaxed">
                    Pricing is calculated from live sheet data. Fill in more details for a tighter estimate.
                </p>
            </div>

            {/* Completeness bar */}
            <div>
                <div className="flex justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Brief completeness</span>
                    <span className="text-[10px] font-mono text-[#554ae8]">{completeness}%</span>
                </div>
                <div className="h-1 rounded-full bg-[#1a1a1a] overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${completeness}%`, background: "linear-gradient(90deg, #554ae8, #7c3aed)" }} />
                </div>
            </div>

            {/* Summary */}
            <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a] flex-1 overflow-y-auto">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-3">Selected details</p>
                <SummaryRow label="Country" value={data.country} />
                <SummaryRow label="Scale" value={scaleLabel} />
                <SummaryRow label="Business type" value={btLabel} />
                <SummaryRow label="Pages" value={`${data.pages} pages`} />
                <SummaryRow label="Monthly visitors" value={visLabel} />
                <SummaryRow label="Technology" value={techLabel} />
                <SummaryRow label="Timeline" value={tlLabel} />
                <SummaryRow label="Content updates" value={cmsLabel} />
                {data.additionalPages && (
                    <div className="pt-2.5">
                        <p className="text-[10px] text-white/25 mb-1 font-mono uppercase tracking-wider">Custom notes</p>
                        <p className="text-xs text-white/55 leading-relaxed line-clamp-3">{data.additionalPages}</p>
                    </div>
                )}
                {filledCount === 0 && (
                    <p className="text-xs text-white/20 text-center py-6">Your selections will appear here…</p>
                )}
            </div>

            {/* Blurred price teaser */}
            <div className="rounded-2xl p-5 border transition-all duration-500 relative overflow-hidden"
                style={{
                    background: isReady ? "linear-gradient(135deg, #0f081a, #07060e)" : "#0D0D0D",
                    borderColor: isReady ? "rgba(85,74,232,0.25)" : "#1a1a1a",
                }}>
                {isReady && estimate ? (
                    <>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#554ae8]/60 mb-1">Estimated range</p>
                        <div className="flex items-baseline gap-3 mb-1" style={{ filter: "blur(6px)", userSelect: "none" }}>
                            <span className="text-3xl font-bold text-white tracking-tight">{fmt(estimate.low, data.country, rates || undefined)}</span>
                            <span className="text-white/30 text-lg">–</span>
                            <span className="text-3xl font-bold text-white tracking-tight">{fmt(estimate.high, data.country, rates || undefined)}</span>
                        </div>
                        <p className="text-xs text-white/40 flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="1" y="4" width="10" height="7" rx="1.5" stroke="#554ae8" strokeWidth="1.2" />
                                <path d="M4 4V3a2 2 0 114 0v1" stroke="#554ae8" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            Enter your email to unlock full breakdown
                        </p>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#252525] flex items-center justify-center text-base">◌</div>
                        <div>
                            <p className="text-sm text-white/40">Fill in more details</p>
                            <p className="text-[11px] text-white/20">Estimate unlocks when brief is ready</p>
                        </div>
                    </div>
                )}
            </div>

            {/* CTA */}
            <button type="button" onClick={onSubmit} disabled={!isReady}
                className={`w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${isReady
                        ? "bg-linear-to-r from-[#554ae8] to-[#7c3aed] text-white hover:opacity-90 shadow-lg shadow-[#554ae8]/20 cursor-pointer"
                        : "bg-[#151515] text-white/20 border border-[#1a1a1a] cursor-not-allowed"
                    }`}>
                {isReady
                    ? "Unlock My Estimate →"
                    : !sheets
                        ? "Loading pricing data…"
                        : `Complete ${totalFields - filledCount} more field${totalFields - filledCount !== 1 ? "s" : ""} to unlock`}
            </button>
        </div>
    );
}

// ─── Email gate ───────────────────────────────────────────────────────────────

// ─── Lead capture modal ──────────────────────────────────────────────────────

function PhoneInput({
    value, onChange, selectedCountry,
}: {
    value: string;
    onChange: (val: string) => void;
    selectedCountry: string;
}) {
    const defaultCode = COUNTRY_CODES.find(c => c.country === selectedCountry) || COUNTRY_CODES[0];
    const [code, setCode] = useState(defaultCode.code);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!value.includes(" ")) {
            onChange(`${code} `);
        }
    }, []);

    return (
        <div className="relative flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#554ae8]/50 transition-all">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
                <span>{COUNTRY_CODES.find(c => c.code === code)?.flag || "🏳️"}</span>
                <span>{code}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 max-h-72 overflow-y-auto overscroll-contain bg-[#151515] border border-white/10 rounded-xl shadow-2xl z-110 p-1 custom-scrollbar" style={{ touchAction: "pan-y" }}>
                    {COUNTRY_CODES.map((c) => (
                        <button
                            key={c.country}
                            type="button"
                            onClick={() => {
                                setCode(c.code);
                                onChange(`${c.code} ${value.split(" ").slice(1).join(" ")}`);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-left"
                        >
                            <span className="flex items-center gap-2">
                                <span>{c.flag}</span>
                                <span className="text-white/80">{c.country}</span>
                            </span>
                            <span className="text-white/40">{c.code}</span>
                        </button>
                    ))}
                </div>
            )}

            <div className="w-px h-4 bg-white/10 mx-1" />

            <input
                type="tel"
                placeholder="Phone number"
                value={value.replace(code, "").trim()}
                onChange={(e) => onChange(`${code} ${e.target.value}`)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20"
            />
        </div>
    );
}

function EmailGate({
    data, sheets, rates, onReveal, onCancel,
}: {
    data: FormData;
    sheets: SheetsData;
    rates: Record<string, number> | null;
    onReveal: (r: { email: string; name: string; estimate: Estimate }) => void;
    onCancel: () => void;
}) {
    const [localData, setLocalData] = useState({
        name: data.name,
        email: data.email,
        phone: data.phone,
        businessName: data.businessName,
        designation: data.designation,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const estimate = calculateEstimate(data, sheets);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!localData.email || !localData.name || !localData.phone) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        // Simulate lead save / email send
        await new Promise(r => setTimeout(r, 1200));
        onReveal({
            email: localData.email,
            name: localData.name,
            estimate: estimate!,
        });
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                onClick={onCancel} 
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-[#0D0D0D] border border-white/10 rounded-3xl shadow-2xl"
            >
                {/* Decorative gradients */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#554ae8]/20 blur-[80px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#7c3aed]/10 blur-[80px] rounded-full" />

                <div className="p-8 md:p-10">
                    <button onClick={onCancel} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-linear-to-br from-[#554ae8] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#554ae8]/20">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Unlock Your Full Quote</h3>
                        <p className="text-sm text-white/40">Complete your profile to see the dynamic breakdown.</p>
                    </div>

                    {estimate && (
                        <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5 text-center">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-[#554ae8]/60 mb-1">Indicative Range</p>
                            <div className="flex items-baseline justify-center gap-3">
                                <span className="text-3xl font-bold text-white" style={{ filter: "blur(8px)", userSelect: "none" }}>
                                    {fmt(estimate.low, data.country, rates || undefined)}
                                </span>
                                <span className="text-white/40 text-lg">–</span>
                                <span className="text-3xl font-bold text-white" style={{ filter: "blur(8px)", userSelect: "none" }}>
                                    {fmt(estimate.high, data.country, rates || undefined)}
                                </span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                required
                                value={localData.name}
                                onChange={e => setLocalData(d => ({ ...d, name: e.target.value }))}
                                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#554ae8]/50 outline-none transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email Address *"
                                required
                                value={localData.email}
                                onChange={e => setLocalData(d => ({ ...d, email: e.target.value }))}
                                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#554ae8]/50 outline-none transition-all"
                            />
                        </div>

                        <PhoneInput
                            value={localData.phone}
                            selectedCountry={data.country}
                            onChange={val => setLocalData(d => ({ ...d, phone: val }))}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Business Name"
                                value={localData.businessName}
                                onChange={e => setLocalData(d => ({ ...d, businessName: e.target.value }))}
                                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#554ae8]/50 outline-none transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Designation"
                                value={localData.designation}
                                onChange={e => setLocalData(d => ({ ...d, designation: e.target.value }))}
                                className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#554ae8]/50 outline-none transition-all"
                            />
                        </div>

                        {error && <p className="text-xs text-[#554ae8] text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 shadow-lg shadow-[#554ae8]/20 relative overflow-hidden"
                            style={{ background: "linear-gradient(135deg, #554ae8, #7c3aed)" }}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </div>
                            ) : (
                                "Reveal My Estimate →"
                            )}
                        </button>
                    </form>

                    <p className="text-[10px] text-white/20 text-center mt-6">
                        By proceeding, you agree to receive technical estimates. We never spam.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Price reveal ─────────────────────────────────────────────────────────────

function PriceReveal({
    result, data, rates, onReset,
}: {
    result: { email: string; name: string; estimate: Estimate };
    data: FormData;
    rates: Record<string, number> | null;
    onReset: () => void;
}) {
    const { email, name, estimate } = result;
    const { low, high, adjustedBase, hostingCost, cheapAddons, richAddons, basePlan, hostingPlan, locationTier, rushMult } = estimate;
    const btLabel = BUSINESS_TYPES.find(b => b.id === data.businessType)?.label ?? "";
    const scaleLabel = data.scale === "local" ? "Local" : "Corporate";

    // ── Market Comparison Logic ──────────────────────────────────────────────
    const getMarketMultiplier = (country: string) => {
        if (country === "India") return 1.8;
        if (["United States", "Canada", "United Kingdom", "Australia", "Switzerland"].includes(country)) return 3.5;
        return 2.5; // Europe/Other intl
    };

    const multiplier = getMarketMultiplier(data.country);
    const marketLow = low * multiplier;
    const marketHigh = high * multiplier;

    return (
        <section className="w-full py-16 md:py-24 px-4 md:px-16">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#554ae8]/20 bg-[#554ae8]/10 mb-5">
                        <div className="w-2 h-2 rounded-full bg-[#554ae8] animate-pulse" />
                        <span className="text-xs font-mono text-[#554ae8] uppercase tracking-wider">Estimate ready</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">
                        {name ? `Here's your estimate, ${name.split(" ")[0]}` : "Here's your estimate"}
                    </h2>
                    <p className="text-white/35 text-sm">Based on your {scaleLabel} · {btLabel} brief</p>
                </div>

                {/* Big range */}
                <div className="rounded-2xl p-8 md:p-12 mb-6 text-center border relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #0f081a, #07060e)", borderColor: "rgba(85,74,232,0.2)" }}>
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(85,74,232,0.12) 0%, transparent 70%)" }} />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#554ae8]/50 mb-3 relative">
                        Project investment range
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4 relative">
                        <div className="text-center">
                            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider mb-1">Starting from</p>
                            <p className="text-5xl md:text-6xl font-bold text-white tracking-tight">{fmt(low, data.country, rates || undefined)}</p>
                        </div>
                        <div className="text-white/20 text-3xl hidden sm:block">→</div>
                        <div className="text-[#554ae8]/40 text-xl sm:hidden">↓</div>
                        <div className="text-center">
                            <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider mb-1">Up to</p>
                            <p className="text-5xl md:text-6xl font-bold text-white tracking-tight">{fmt(high, data.country, rates || undefined)}</p>
                        </div>
                    </div>
                    <p className="text-xs text-white/30 relative">{fmtFull(low, data.country, rates || undefined)} – {fmtFull(high, data.country, rates || undefined)} · One-time project cost</p>
                </div>

                {/* Market Comparison Component */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#554ae8]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#554ae8]">Market Value Analysis</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <h4 className="text-lg font-medium text-white mb-2">How we compare to other premium agencies</h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Based on 2025 benchmarks for {data.country === "India" ? "top-tier Indian firms" : `specialized agencies in ${data.country}`}, similar project scopes typically range significantly higher due to larger overheads.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                            <p className="text-[10px] font-mono text-white/20 uppercase mb-1">Standard Agency</p>
                            <p className="text-xl font-semibold text-white/40 line-through decoration-[#554ae8]/30">
                                {fmt(marketLow, data.country, rates || undefined)} – {fmt(marketHigh, data.country, rates || undefined)}
                            </p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-right">
                            <p className="text-[10px] font-mono text-[#554ae8] uppercase mb-1">Our Studio</p>
                            <p className="text-2xl font-bold text-white">
                                {fmt(low, data.country, rates || undefined)} – {fmt(high, data.country, rates || undefined)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Breakdown grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    {/* Cost breakdown */}
                    <div className="rounded-2xl border border-[#1e1e1e] p-6" style={{ background: "#0D0D0D" }}>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-white/25 mb-5">What's included</p>
                        <div className="space-y-3">

                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2.5 min-w-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#554ae8] mt-1.5 flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm text-white truncate">{basePlan.name} {basePlan.sub}</p>
                                        {(locationTier.multiplier !== 1.0 || rushMult !== 1.0) && (
                                            <p className="text-[10px] text-white/30 mt-0.5">
                                                {locationTier.multiplier !== 1.0 && `${locationTier.name} ×${locationTier.multiplier}`}
                                                {rushMult !== 1.0 && ` · Rush ×${rushMult}`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-white/70 flex-shrink-0 font-mono">{fmtFull(adjustedBase, data.country, rates || undefined)}</span>
                            </div>

                            {hostingPlan && hostingPlan.price > 0 && (
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] mt-1.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-white">{hostingPlan.name}</p>
                                            <p className="text-[10px] text-white/30 mt-0.5">Annual hosting</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-white/70 flex-shrink-0 font-mono">{fmtFull(hostingPlan.price, data.country, rates || undefined)}</span>
                                </div>
                            )}

                            {cheapAddons.length > 0 && (
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#10D9A0] mt-1.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-white">Essential Add-ons ({cheapAddons.length})</p>
                                            <p className="text-[10px] text-white/30 mt-0.5 leading-relaxed">
                                                {cheapAddons.map(a => a.n).join(" · ")}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-white/70 flex-shrink-0 font-mono">
                                        {fmtFull(cheapAddons.reduce((s, a) => s + a.p, 0), data.country, rates || undefined)}
                                    </span>
                                </div>
                            )}

                            <div className="border-t border-[#1e1e1e] pt-3 flex justify-between">
                                <span className="text-sm font-semibold text-white">Low-end total</span>
                                <span className="text-sm font-bold text-white">{fmtFull(low, data.country, rates || undefined)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recommended add-ons */}
                    <div className="rounded-2xl border border-[#1e1e1e] p-6" style={{ background: "#0D0D0D" }}>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-white/25 mb-1">
                            Recommended for {btLabel}
                        </p>
                        <p className="text-xs text-white/30 mb-5">Add these to reach the high-end estimate</p>
                        {richAddons.length > 0 ? (
                            <div className="space-y-2.5">
                                {richAddons.map((a, i) => (
                                    <div key={i} className="flex items-center justify-between gap-3 py-2 border-b border-[#181818] last:border-0">
                                        <span className="text-xs text-white/65">{a.n}</span>
                                        <span className="text-xs font-mono text-[#7c3aed] flex-shrink-0">+{fmtFull(a.p, data.country, rates || undefined)}</span>
                                    </div>
                                ))}
                                <div className="pt-2 flex justify-between">
                                    <span className="text-xs text-white/40">Full bundle</span>
                                    <span className="text-xs font-mono text-white/60">
                                        +{fmtFull(richAddons.reduce((s, a) => s + a.p, 0), data.country, rates || undefined)}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-white/25 py-4">Add-ons vary — we'll discuss in your consultation.</p>
                        )}
                    </div>
                </div>

                {/* Plan features */}
                {basePlan.features.length > 0 && (
                    <div className="rounded-2xl border border-[#1e1e1e] p-6 mb-6" style={{ background: "#0D0D0D" }}>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-white/25 mb-4">
                            {basePlan.name} {basePlan.sub} — what's inside
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {basePlan.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                                        <circle cx="7" cy="7" r="6" stroke="#554ae8" strokeWidth="1.2" />
                                        <path d="M4.5 7l2 2 3-3" stroke="#554ae8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-xs text-white/60">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a href={`mailto:hello@yourwebstudio.com?subject=Website%20Quote%20Request&body=Hi%2C%20I%20just%20filled%20out%20your%20estimator.%20My%20email%20is%20${encodeURIComponent(email)}`}
                        className="flex-1 w-full py-4 rounded-xl text-sm font-semibold tracking-wide text-center text-white cursor-pointer transition-all hover:opacity-90 shadow-lg shadow-[#554ae8]/20"
                        style={{ background: "linear-gradient(135deg, #554ae8, #7c3aed)" }}>
                        Get My Full Proposal →
                    </a>
                    <button type="button" onClick={onReset}
                        className="flex-1 w-full py-4 rounded-xl text-sm font-medium tracking-wide text-white/40 border border-[#252525] hover:border-[#333] hover:text-white/60 transition-all">
                        Start Over
                    </button>
                </div>

                    <p className="text-[10px] text-white/20 text-center mt-5 leading-relaxed">
                        Estimate sent to <span className="text-white/40">{email}</span> · Rates fetched from global API · Final pricing confirmed after discovery.
                    </p>
            </div>
        </section>
    );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ProjectEstimationCalculator() {
    const [sheets, setSheets] = useState<SheetsData | null>(null);
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [screen, setScreen] = useState<"form" | "email" | "reveal">("form");
    const [result, setResult] = useState<{ email: string; name: string; estimate: Estimate } | null>(null);
    const [data, setData] = useState<FormData>({
        country: "", scale: "", businessType: "",
        pages: 5, additionalPages: "",
        visitors: "", tech: "", timeline: "", cms: "",
        email: "", name: "", phone: "", businessName: "", designation: "",
    });

    // ── Fetch sheet data once on mount ──────────────────────────────────────────
    const fetchData = async () => {
        setLoadError(null);
        try {
            const [sheetsRes, ratesRes] = await Promise.all([
                fetch("/api/sheets"),
                fetch("/api/rates")
            ]);

            if (!sheetsRes.ok) {
                const body = await sheetsRes.json().catch(() => ({}));
                throw new Error(body.error ?? `Sheets API Error: ${sheetsRes.status}`);
            }
            if (!ratesRes.ok) {
                console.error("Rates fetch failed");
            }

            const sheetsJson = await sheetsRes.json();
            setSheets(sheetsJson);

            if (ratesRes.ok) {
                const ratesJson = await ratesRes.json();
                setRates(ratesJson);
            }
        } catch (e: unknown) {
            setLoadError(e instanceof Error ? e.message : "Failed to load project data.");
        }
    };

    useEffect(() => { fetchData(); }, []);

    const update = (key: keyof FormData, value: unknown) =>
        setData(d => ({ ...d, [key]: value }));

    const canProceed = () => {
        if (step === 1) return !!(data.country && data.scale && data.businessType);
        if (step === 2) return !!(data.visitors && data.tech);
        return true;
    };

    const reset = () => {
        setStep(1); setScreen("form"); setResult(null);
        setData({
            country: "", scale: "", businessType: "", pages: 5, additionalPages: "", visitors: "", tech: "", timeline: "", cms: "",
            email: "", name: "", phone: "", businessName: "", designation: ""
        });
    };

    // ── Loading / error states ──────────────────────────────────────────────────
    if (!sheets && !loadError) return <LoadingState />;
    if (loadError) return <ErrorState message={loadError} onRetry={fetchData} />;


    if (screen === "reveal" && result)
        return <PriceReveal result={result} data={data} rates={rates} onReset={reset} />;

    // ── Main form ───────────────────────────────────────────────────────────────
    return (
        <section id="calculator-section" className="w-full py-16 md:py-28 px-4 md:px-16 relative">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/25 mb-4">
                        Try project estimation calculator
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white">
                        Get a premium website within your budget
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-visible">

                    {/* ── LEFT ── */}
                    <div className="p-8 lg:p-10" style={{ background: "#0D0D0D" }}>
                        <StepIndicator current={step} />

                        <div className="mb-7">
                            <h3 className="text-lg font-semibold text-white">
                                {step === 1 && "Tell us about your business"}
                                {step === 2 && "Describe your website"}
                                {step === 3 && "Timeline & content management"}
                            </h3>
                            <p className="text-xs text-white/30 mt-1 leading-relaxed">
                                {step === 1 && "We tailor pricing based on your region, scale, and industry."}
                                {step === 2 && "Scope, traffic expectations, and tech stack all shape your estimate."}
                                {step === 3 && "Deadlines and CMS needs affect technology choices and overall cost."}
                            </p>
                        </div>

                        {step === 1 && <Step1 data={data} update={update} />}
                        {step === 2 && <Step2 data={data} update={update} />}
                        {step === 3 && <Step3 data={data} update={update} />}

                        {/* Nav */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1a1a1a]">
                            <button type="button"
                                onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
                                className="text-sm text-white/30 hover:text-white/60 disabled:opacity-0 disabled:pointer-events-none transition-colors flex items-center gap-1.5">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Back
                            </button>

                            <div className="flex gap-1.5">
                                {STEPS.map(s => (
                                    <div key={s.id} className={`rounded-full transition-all duration-300 ${s.id === step ? "w-4 h-1.5 bg-[#554ae8]" : "w-1.5 h-1.5 bg-[#252525]"
                                        }`} />
                                ))}
                            </div>

                            {step < 3 ? (
                                <button type="button"
                                    onClick={() => canProceed() && setStep(s => s + 1)}
                                    className={`text-sm flex items-center gap-1.5 transition-colors ${canProceed()
                                            ? "text-[#554ae8] hover:text-[#ff7777] cursor-pointer"
                                            : "text-white/15 cursor-not-allowed"
                                        }`}>
                                    Continue
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            ) : (
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">Final step</span>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT ── */}
                    <RightPanel data={data} sheets={sheets} rates={rates} onSubmit={() => setScreen("email")} />
                </div>
            </div>

            <AnimatePresence>
                {screen === "email" && (
                    <EmailGate
                        data={data}
                        sheets={sheets!}
                        rates={rates}
                        onReveal={r => { setResult(r); setScreen("reveal"); }}
                        onCancel={() => setScreen("form")}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}