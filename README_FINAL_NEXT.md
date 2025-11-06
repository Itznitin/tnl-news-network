TNL News - Next.js Professional Build

Instructions:
1. Copy .env.local.example to .env.local and set NEWS_API_KEY to your News API key (NewsAPI.org or any compatible API).
2. Install and run: npm install && npm run dev
3. Deploy to Vercel by connecting this repo; set NEWS_API_KEY in Vercel project env.

Features:
- TailwindCSS
- Infinite scroll (client-side)
- /api/news proxy to external news service
- LocalStorage auth (tnl_user) and saved articles (tnl_saved)
- Jest unit test and Cypress e2e basic example

Enhancements added: framer-motion for micro-interactions, SVG placeholders and icons in /public, extra tests.
