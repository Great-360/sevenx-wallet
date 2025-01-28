import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-8 bg-[#0a0118]/50 backdrop-blur-md fixed top-0">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-purple-700"></div>
          <div className="w-6 h-6 rounded-full bg-purple-500"></div>
          <div className="w-6 h-6 rounded-full bg-purple-400"></div>
        </div>
      </div>

  
      <div className="flex items-center gap-8">
        <Link href="/use-cases" className="text-gray-300 hover:text-white transition-colors">
          Use Cases
        </Link>
        <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
          Blog
        </Link>
        <Link href="/documentation" className="text-gray-300 hover:text-white transition-colors">
          Documentation
        </Link>
        <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
          Pricing
        </Link>
        <Link 
          href="/get-started" 
          className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Get Started
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-slide"></div>
      </div>
    </nav>
  )
}

export default Navbar
