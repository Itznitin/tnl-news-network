import ArticleCard from '../../../components/ArticleCard'

async function getHeadlines(category='general') {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news?category=${category}`, { cache: 'no-store' })
  const json = await res.json()
  return json.items || []
}

export default async function CategoryPage({ params }: any) {
  const category = params.category || 'general'
  const items = await getHeadlines(category)
  return (
    <div>
      <h1 className="text-3xl font-bold capitalize">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {items.map((it:any) => <ArticleCard key={it.url} article={{...it, slug: encodeURIComponent(it.title?.slice(0,80) || it.url)}} />)}
      </div>
    </div>
  )
}
