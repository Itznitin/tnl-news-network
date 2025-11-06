'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Name is required.'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    alert('Account created (demo).');
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-slate-800 rounded-lg card-shadow">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-center">Create Account</motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="relative">
          <FiUser className="absolute top-3 left-3 text-slate-400" />
          <input type="text" className="w-full pl-10 pr-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="relative">
          <FiMail className="absolute top-3 left-3 text-slate-400" />
          <input type="email" className="w-full pl-10 pr-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="relative">
          <FiLock className="absolute top-3 left-3 text-slate-400" />
          <input type="password" className="w-full pl-10 pr-3 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Create password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full py-3 rounded-md bg-accent text-white font-semibold btn-smooth">Sign Up</button>
      </form>
      <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account? <Link href="/auth/login" className="text-accent hover:underline">Sign In</Link>
      </div>
    </div>
  );
}
