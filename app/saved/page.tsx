'use client';
import { useEffect, useState } from 'react';
import ArticleCard from '../../components/ArticleCard';

export default function SavedPage(){
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{
    try {
      const raw = localStorage.getItem('tnl_bookmarks') || '[]';
      setItems(JSON.parse(raw));
    } catch(e){ setItems([]) }
  }, []);

  function remove(url:string){
    const filtered = items.filter(i=>i.url !== url);
    setItems(filtered);
    localStorage.setItem('tnl_bookmarks', JSON.stringify(filtered));
  }

  if(items.length===0) return <div className="text-center text-slate-500">No saved articles yet.</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(it=> (
        <div key={it.url} className="relative">
          <ArticleCard article={it} />
          <button onClick={()=>remove(it.url)} className="absolute top-3 right-3 p-2 rounded bg-white/80 dark:bg-slate-900/80">Remove</button>
        </div>
      ))}
    </div>
  )
}
