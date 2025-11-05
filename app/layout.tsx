import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = { title: 'TNL News Network' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
