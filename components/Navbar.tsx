'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { FiSearch, FiMenu, FiUpload, FiHome, FiCloud, FiZap, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar(){ 
  const [open,setOpen]=useState(false); 
  const [logoData,setLogoData]=useState<string|null>(null); 
  const [mounted,setMounted]=useState(false); 
  const [moreOpen,setMoreOpen]=useState(false); 
  const closeTimer=useRef<number|null>(null); 
  const fileRef=useRef<HTMLInputElement|null>(null);

  useEffect(()=>{ setMounted(true); try{ const s=localStorage.getItem('tnl-logo'); if(s) setLogoData(s);}catch(e){} },[]);

  function handleFileChange(e:React.ChangeEvent<HTMLInputElement>){ 
    const file=e.target.files && e.target.files[0]; if(!file) return; 
    const reader=new FileReader(); reader.onload=()=>{ const data=String(reader.result||''); try{ localStorage.setItem('tnl-logo', data); setLogoData(data);}catch(e){} }; reader.readAsDataURL(file); 
  }
  function clearLogo(e?:React.MouseEvent){ e?.preventDefault(); try{ localStorage.removeItem('tnl-logo'); setLogoData(null);}catch(e){} }
  function openMore(){ if(closeTimer.current){ window.clearTimeout(closeTimer.current); closeTimer.current=null;} setMoreOpen(true); }
  function scheduleCloseMore(delay=220){ if(closeTimer.current) window.clearTimeout(closeTimer.current); closeTimer.current=window.setTimeout(()=> setMoreOpen(false), delay); }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="w-12 h-12 rounded-full logo-ring flex items-center justify-center">
              {mounted && logoData ? (
                <img src={logoData} alt="TNL" className="w-full h-full object-cover rounded-full" />
              ) : (
                <Image src="/images/tnl-logo.png" alt="TNL News" width={120} height={40} className="object-contain" priority />
              )}
            </motion.div>
            <div className="leading-tight">
              <div className="text-lg font-bold">TNL <span className="text-accent">News</span></div>
              <div className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Trusted • Timely • Thoughtful</div>
            </div>
          </Link>

          <nav className="hidden lg:flex gap-4 ml-6 text-sm items-center">
            <Link href="/" className="flex items-center gap-2 hover:text-accent transition nav-underline"><FiHome/> Home</Link>
            <Link href="/category/politics" className="hover:text-accent transition nav-underline">Politics</Link>
            <Link href="/category/technology" className="hover:text-accent transition nav-underline">Tech</Link>
            <Link href="/category/sports" className="hover:text-accent transition nav-underline">Sports</Link>
            <Link href="/category/entertainment" className="hover:text-accent transition nav-underline">Entertainment</Link>

            <div className="relative" onMouseEnter={openMore} onMouseLeave={()=> scheduleCloseMore(220)}>
              <button className="nav-underline px-2 py-1 rounded flex items-center gap-2">More ▾</button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.18 }} className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-800 border rounded shadow-lg dropdown-panel z-40 overflow-hidden">
                    <Link href="/category/weather" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"><FiCloud/> Weather</Link>
                    <Link href="/category/climate" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"><FiZap/> Climate</Link>
                    <Link href="/category/health" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"><FiHeart/> Health</Link>
                    <Link href="/category/style" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"><FiShoppingBag/> Style</Link>
                    <Link href="/category/fashion" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"><FiShoppingBag/> Fashion</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 border rounded-full px-3 py-1 bg-white/60 dark:bg-slate-800/60">
            <FiSearch className="text-slate-600 dark:text-slate-300" />
            <input placeholder="Search the categories that you are interested in." className="bg-transparent outline-none text-sm w-72" />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth/login" className="hidden md:inline-block px-3 py-1 rounded-full border text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition btn-smooth">Sign in</Link>
            <Link href="/saved" className="hidden md:inline-block px-3 py-1 rounded-full border text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition btn-smooth">Saved</Link>

            <div className="flex items-center gap-2">
              <label className="p-2 rounded-md border cursor-pointer flex items-center gap-2" title="Upload logo">
                <FiUpload />
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              {mounted && logoData && <button onClick={clearLogo} className="p-2 rounded-md border text-sm">Clear logo</button>}
            </div>

            <button onClick={()=>setOpen(!open)} className="md:hidden p-2">
              <FiMenu size={20}/>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 bg-white/80 dark:bg-slate-900/80 border-t dark:border-slate-800">
          <div className="flex flex-col gap-2">
            <Link href="/" className="block py-2">Home</Link>
            <Link href="/category/politics" className="block py-2">Politics</Link>
            <Link href="/category/technology" className="block py-2">Tech</Link>
            <Link href="/category/sports" className="block py-2">Sports</Link>
            <Link href="/category/entertainment" className="block py-2">Entertainment</Link>
            <Link href="/category/weather" className="block py-2">Weather</Link>
            <Link href="/category/health" className="block py-2">Health</Link>
          </div>
        </div>
      )}
    </header>
  );
}
