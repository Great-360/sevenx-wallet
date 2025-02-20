"use client";
import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <section className="bg-[#0B0B1E] text-white py-32 relative">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center text-purple-400 text-5xl font-semibold first-letter:text-sm">
            #1 Rated SevenX E-spcace <span className="ml-2">🔍</span>
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            The Go-to SevenX{' '}
            <span className="text-purple-400">{'{'}E-space{'}'}</span>
            <br />
             for your brand
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Logos, primary colors, descriptions, classifications, and more from any domain with a single api call.
          </p>
        </div>

        <div className="text-center mt-12 space-x-4">
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full">
            Get Started
          </button>
          <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-full inline-flex items-center">
            Book Demo <span className="ml-2">↗</span>
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">No credit card required</p>
        </div>
      </div>
    </section>
  )
}

export default Header
