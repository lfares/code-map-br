import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#001C3D] font-sans antialiased">
      <Navbar />

      <main className="pt-20">
        <Home />
      </main>
    </div>
  )
}
