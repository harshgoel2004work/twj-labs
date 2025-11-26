// server-action.ts (or wherever your function is)
"use server"

// 'https://twj-lab-dashboard-xxp5.vercel.app/api/pricing'

const serverURL = 'https://twj-lab-dashboard.vercel.app/api/pricing'

export async function getPricingPlans() {
    // fetching data from an external API
    const res = await fetch(serverURL, {
        next: { 
            // This caches the result for 7200 seconds (2 hours)
            revalidate: 7200
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch pricing plans');
    }

    const data = await res.json();
    return data;
}