import React from 'react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3" aria-label="CodeMap Brasil home">
          <img src="/logo-map.png" alt="CodeMap map" className="h-9 w-auto object-contain" />
          <img src="/logo-name.png" alt="CodeMap Brasil" className="h-6 sm:h-8 w-auto object-contain" />
        </a>

        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium">
          <a href="#" className="text-[#001C3D] hover:underline">Home</a>
          <a href="#" className="text-[#001C3D] hover:underline">Dashboard</a>
        </div>

        <button className="sm:hidden text-[#001C3D]">Menu</button>
      </nav>
    </header>
  )
}
