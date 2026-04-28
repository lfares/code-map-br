import React, { useState, useEffect } from 'react'

export default function Navbar({ setPage, currentPage }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home',              page: 'home' },
    { label: 'State Insights',    page: 'dashboard' },
    { label: 'Policy Comparison', page: 'comparison' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-40 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
      <nav className="max-w-6xl mx-auto px-6 py-5 md:py-6 flex items-center justify-between">
        <button onClick={() => setPage('home')} className="flex items-center space-x-4" aria-label="CodeMap Brasil home">
          <img src="/logo-map.png" alt="CodeMap map" className="h-14 w-auto object-contain scale-125 origin-center" />
          <img src="/logo-name.png" alt="CodeMap Brasil" className="h-7 sm:h-8 w-auto object-contain" />
        </button>

        <div className="hidden sm:flex items-center space-x-8 text-base md:text-lg font-medium">
          {links.map(({ label, page }) => {
            const active = currentPage === page
            return (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`relative pb-0.5 transition-colors duration-200 ${active ? 'text-[#A57B2F]' : 'text-[#001C3D] hover:text-[#A57B2F]'}`}
              >
                {label}
                <span
                  className="absolute left-0 -bottom-1 h-0.5 rounded-full bg-[#A57B2F] transition-all duration-300"
                  style={{ width: active ? '100%' : '0%' }}
                />
              </button>
            )
          })}
        </div>

        <button className="sm:hidden text-[#001C3D] text-base">Menu</button>
      </nav>
    </header>
  )
}
