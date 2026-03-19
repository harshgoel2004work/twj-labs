// app/api/instagram/route.ts
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: 'Instagram access token not configured' },
            { status: 500 }
        );
    }

    try {
        const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
        const res = await fetch(
            `https://graph.instagram.com/me/media?fields=${fields}&limit=8&access_token=${token}`,
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
            const err = await res.json();
            console.error('Instagram API error:', err);
            return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: res.status });
        }

        const data = await res.json();

        // Filter only IMAGE and CAROUSEL_ALBUM types (skip pure videos if desired)
        const posts = (data.data as any[])
            .filter((p) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
            .slice(0, 8)
            .map((p) => ({
                id: p.id,
                image: p.media_url,
                caption: p.caption ?? '',
                link: p.permalink,
                timestamp: p.timestamp,
            }));

        return NextResponse.json({ posts });
    } catch (err) {
        console.error('Instagram fetch failed:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}