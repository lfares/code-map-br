import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [route, setRoute] = useState('home')

  return (
    <div className="min-h-screen bg-white text-[#001C3D] font-sans antialiased">
      <Navbar setPage={setRoute} />

      <main className="pt-24">
        {route === 'home' && <Home />}
        {route === 'dashboard' && <Dashboard />}
      </main>
    </div>
  )
}
