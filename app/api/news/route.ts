import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic'; // 👈 prevents static rendering

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category') || 'general';
    const key = process.env.NEWS_API_KEY;

    if (!key) {
      return NextResponse.json(
        { ok: false, error: 'NEWS_API_KEY not set' },
        { status: 500 }
      );
    }

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: { category, pageSize: 20, country: 'us' },
      headers: { 'X-Api-Key': key },
    });

    const items = (response.data.articles || []).map((a: any) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      source: a.source?.name,
      publishedAt: a.publishedAt,
    }));

    return NextResponse.json({ ok: true, items });
  } catch (err: any) {
    console.error('Error fetching news:', err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
