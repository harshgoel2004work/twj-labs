import { servicesForAI } from "@/data/services"

export default async function sitemap() {

    const service = servicesForAI.map((service) => ({
        url: `https://twjlabs.com${service.url}`,
        lastModified: new Date("2025-11-26"),
    }))

    return [{
        url: 'https://twjlabs.com',
        lastModified: new Date(),
    },
    ...service]
}