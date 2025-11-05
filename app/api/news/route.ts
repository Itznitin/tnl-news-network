import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get('category') || 'general';
  try {
    const key = process.env.NEWS_API_KEY;
    if(!key) return NextResponse.json({ ok:false, error:'NEWS_API_KEY not set' }, { status:500 });
    const res = await axios.get('https://newsapi.org/v2/top-headlines', { params: { category, pageSize: 20, country:'us' }, headers: { 'X-Api-Key': key } });
    const items = (res.data.articles || []).map((a:any)=>({ title:a.title, description:a.description, url:a.url, image:a.urlToImage, source:a.source?.name, publishedAt:a.publishedAt }));
    return NextResponse.json({ ok:true, items });
  } catch(err:any) {
    console.error(err?.message || err);
    return NextResponse.json({ ok:false, error: err?.message || 'error' }, { status:500 });
  }
}
