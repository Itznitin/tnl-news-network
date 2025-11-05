import Hero from '../components/Hero'
import FeaturedGrid from '../components/FeaturedGrid'
import ArticleCard from '../components/ArticleCard'
import CategoryGrid from '../components/CategoryGrid'

async function getHeadlines(cat='general') {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/news?category=${cat}`, { cache: 'no-store' })
  const j = await res.json()
  return j.items || []
}

export default async function Home() {
  const top = await getHeadlines('general')
  const tech = await getHeadlines('technology')
  const sports = await getHeadlines('sports')
  return (
    <div className="space-y-8">
      <Hero />
      <section><h2 className="text-2xl font-bold">Top Stories</h2><FeaturedGrid items={top.slice(0,6)} /></section>
      <section><h2 className="text-2xl font-bold">Technology</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{tech.slice(0,6).map((t:any)=>(<ArticleCard key={t.url} article={t}/>))}</div></section>
      <section><h2 className="text-2xl font-bold">Sports</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{sports.slice(0,6).map((t:any)=>(<ArticleCard key={t.url} article={t}/>))}</div></section>
      <CategoryGrid />
    </div>
  )
}
