'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthModal({ open, mode='login', onClose }: { open: boolean, mode?: 'login'|'signup', onClose: ()=>void }){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [name,setName]=useState(''); const [user,setUser]=useState<any>(null);

  useEffect(()=>{ try{ const u=JSON.parse(localStorage.getItem('tnl_user')||'null'); setUser(u);}catch(e){} },[]);

  function handleSignup(e:any){ e.preventDefault(); const u={ name, email }; localStorage.setItem('tnl_user', JSON.stringify(u)); setUser(u); alert('Signed up (demo)'); onClose(); }
  function handleLogin(e:any){ e.preventDefault(); const u=JSON.parse(localStorage.getItem('tnl_user')||'null'); if(u && u.email===email){ alert('Logged in (demo)'); onClose(); } else { alert('No demo user found - please signup first or use same email'); } }

  if(!open) return null;
  return (
    <div className="modal-backdrop">
      <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} exit={{opacity:0}} className="modal-panel bg-white dark:bg-slate-800 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{mode==='login'?'Sign in to TNL':'Create your account'}</h3>
          <button onClick={onClose} className="px-2 py-1 rounded border">Close</button>
        </div>
        <form onSubmit={mode==='login'?handleLogin:handleSignup} className="space-y-3">
          {mode==='signup' && <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your name" className="w-full p-3 border rounded" />}
          <input value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Email" className="w-full p-3 border rounded" />
          <input value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Password" type="password" className="w-full p-3 border rounded" />
          <div className="flex items-center justify-between">
            <button type="submit" className="btn-signup">{mode==='login'?'Sign in':'Create account'}</button>
            <button type="button" className="px-3 py-2 rounded border" onClick={()=>{ navigator.clipboard?.writeText('demo@example.com'); alert('Demo credentials copied') }}>Use demo</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
