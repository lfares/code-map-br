import React from 'react'

export default function Navbar({ setPage }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40">
      <nav className="max-w-6xl mx-auto px-6 py-5 md:py-6 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-4" aria-label="CodeMap Brasil home">
          <img src="/logo-map.png" alt="CodeMap map" className="h-14 w-auto object-contain" />
          <img src="/logo-name.png" alt="CodeMap Brasil" className="h-10 sm:h-12 w-auto object-contain" />
        </a>

        <div className="hidden sm:flex items-center space-x-8 text-base md:text-lg font-medium">
          <button onClick={() => setPage('home')} className="text-[#001C3D] hover:underline">Home</button>
          <button onClick={() => setPage('dashboard')} className="text-[#001C3D] hover:underline">Dashboard</button>
          <button onClick={() => setPage('comparison')} className="text-[#001C3D] hover:underline">Policy Comparison</button>
        </div>

        <button className="sm:hidden text-[#001C3D] text-base">Menu</button>
      </nav>
    </header>
  )
}
