"use server"

export async function getPortfolio() {
    // fetching data from an external API
    const res = await fetch('https://twj-lab-dashboard.vercel.app/api/portfolio');

    if (!res.ok) {
        throw new Error('Failed to fetch portfolio');
    }

    const data = await res.json();
    return data;

}
