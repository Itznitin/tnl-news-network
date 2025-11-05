export default async function ArticlePage({ params }: any) {
  const slug = decodeURIComponent(params.slug)
  // try to decode base64 url if present
  let url = ''
  try { url = Buffer.from(slug, 'base64').toString() } catch(e){}
  return (
    <article>
      <h1 className="text-3xl font-bold">Article</h1>
      <p className="mt-4">This demo shows a link to the original article. Open the source to read full content.</p>
      <a href={url || '#'} className="text-accent mt-3 inline-block">{url || 'External article'}</a>
    </article>
  )
}
