import '@styles/globals.css'
import { Inter } from 'next/font/google'

import Footer from '@components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Financial Schemes',
  description: 'FIE Group 3 Financial App Prototype',
  icons: {icon: '/icons/logo.svg'}
}

export default function RootLayout({ children }) {
  return (
    <html lang = 'en'>
      <body className = {inter.className}>
        <div className = 'w-full h-fit'>
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  )
}
