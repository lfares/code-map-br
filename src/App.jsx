import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import StateInsights from './pages/StateInsights'
import PolicyComparison from './pages/PolicyComparison'

export default function App() {
  const [route, setRoute] = useState('home')
  const [selectedState, setSelectedState] = useState(null)

  return (
    <div className="min-h-screen bg-white text-[#001C3D] font-sans antialiased">
      <Navbar setPage={setRoute} currentPage={route} />

      <main className="pt-24">
        {route === 'home' && <Home setPage={setRoute} />}
        {route === 'dashboard' && <StateInsights selectedState={selectedState} setSelectedState={setSelectedState} />}
        {route === 'comparison' && <PolicyComparison setPage={setRoute} setSelectedState={setSelectedState} />}
      </main>
    </div>
  )
}
