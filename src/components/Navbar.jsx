import React from 'react'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-[#001C3D] font-serif text-lg">CodeMap Brasil</div>

        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium">
          <a href="#" className="text-[#001C3D] hover:underline">Home</a>
          <a href="#" className="text-[#001C3D] hover:underline">Dashboard</a>
        </div>

        <button className="sm:hidden text-[#001C3D]">Menu</button>
      </nav>
    </header>
  )
}
