'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiUsers, FiYoutube, FiX } from 'react-icons/fi';

const CATEGORIES = [
  { key:'business', title:'Business', image:'/images/cat-business.jpg', count:8 },
  { key:'economy', title:'Economy', image:'/images/cat-economy.jpg', count:8 },
  { key:'fashion', title:'Fashion', image:'/images/cat-fashion.jpg', count:12 },
  { key:'sports', title:'Sports', image:'/images/cat-sports.jpg', count:9 },
  { key:'gossip', title:'Gossip', image:'/images/cat-gossip.jpg', count:1 },
  { key:'tech', title:'Technology', image:'/images/cat-tech.jpg', count:6 },
];

export default function CategoryGrid(){
  const [query,setQuery] = useState('');
  const items = CATEGORIES.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Explore Top Categories</h3>
          <p className="text-sm text-slate-500">Uncover the stories that matter</p>
        </div>
        <div className="w-1/3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for the categories that you are interested in." className="w-full p-3 border rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((c)=> (
          <motion.div key={c.key} whileHover={{ y:-6 }} className="cat-card relative p-0 border overflow-hidden">
            <a href={`/category/${c.key}`} className="block">
              <div className="relative overflow-hidden rounded-md h-28">
                <img src={c.image} className="w-full h-full object-cover" alt={c.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-90"></div>
              </div>
              <div className="p-3 flex items-center justify-between bg-white dark:bg-slate-800">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-xs text-slate-400">{c.count} ARTICLES</div>
                </div>
                <button aria-label="add" className="p-2 rounded-full border"><FiPlus /></button>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-box flex items-center gap-3">
          <FiUsers size={28} />
          <div>
            <div className="font-semibold">2.5k Followers</div>
            <div className="text-sm text-slate-500">Like</div>
          </div>
        </div>
        <div className="stat-box flex items-center gap-3">
          <FiX size={28} />
          <div>
            <div className="font-semibold">611 Followers</div>
            <div className="text-sm text-slate-500">Follow</div>
          </div>
        </div>
        <div className="stat-box flex items-center gap-3">
          <FiYoutube size={28} />
          <div>
            <div className="font-semibold">2.3k Subscribers</div>
            <div className="text-sm text-slate-500">Subscribe</div>
          </div>
        </div>
      </div>
    </section>
  )
}
