import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import brazil from '@svg-maps/brazil'
import { BookOpen, Clock, CalendarDays, FileText, BarChart2 } from 'lucide-react'

const GEO_URL = '/brazil-states.geojson'

const STATE_DATA = {
  'São Paulo': {
    flag: '🏳️',
    availability: { score: 2, label: 'Restricted and Incomplete' },
    summary: 'A centralized platform-based model utilizing pre-defined scripts and pre-made slides through partnerships with private platforms. While focused on large-scale delivery, SEDUC restricts most pedagogical content to logged-in users, creating barriers to transparency and external collaboration.',
    details: [
      { icon: BookOpen, text: 'Tecnologia e Inovação' },
      { icon: Clock, text: '1 class-hour per week*' },
      { icon: CalendarDays, text: "Implemented as a mandatory curriculum in 2020 through the 'Inova Educação' Program." },
      { icon: FileText, text: 'Currículo Paulista — Educação Digital e Midiática (Aligned with CIEB standards)' },
      { icon: BarChart2, text: '100% Implemented across the state public network.' },
    ],
  },
}

function AvailabilityBar({ score, label }) {
  return (
    <div className="flex flex-col items-end gap-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Public Availability</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-1.5 w-6 rounded-full"
            style={{ backgroundColor: i <= score ? '#A57B2F' : '#D1D5DB' }}
          />
        ))}
      </div>
      <p className="text-xs text-[#6B7280]">{label}</p>
    </div>
  )
}

function StatePanel({ name }) {
  const data = STATE_DATA[name]

  if (!data) {
    return (
      <div>
        <h3 className="font-serif text-3xl text-[#001C3D]">{name}</h3>
        <p className="mt-4 text-base text-[#001C3D]">Data unavailable, come back later.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="font-serif text-3xl text-[#001C3D]">{name}</h3>
        <AvailabilityBar score={data.availability.score} label={data.availability.label} />
      </div>

      {/* Summary */}
      <p className="text-base italic text-[#001C3D] leading-relaxed">
        {data.summary}
      </p>

      {/* Info blocks */}
      <ul className="flex flex-col gap-5">
        {data.details.map(({ icon: Icon, text }, i) => (
          <li key={i} className="flex items-start gap-3">
            <Icon className="w-6 h-6 mt-0.5 shrink-0 text-[#A57B2F]" />
            <span className="text-base text-[#001C3D]">{text}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div>
        <button
          disabled
          className="inline-block bg-[#001C3D] text-white rounded-md px-6 py-3 text-sm font-semibold opacity-60 cursor-not-allowed"
          title="Coming soon"
        >
          Learn More
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState(null)
  const [geoReady, setGeoReady] = useState(null)

  useEffect(() => {
    let mounted = true
    fetch(GEO_URL)
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then(() => { if (mounted) setGeoReady(true) })
      .catch(() => { if (mounted) setGeoReady(false) })
    return () => { mounted = false }
  }, [])

  const mapStyles = {
    default: { fill: '#001C3D', stroke: '#A57B2F', strokeWidth: 0.5, outline: 'none' },
    hover: { fill: '#0E6680', outline: 'none' },
    pressed: { fill: '#A57B2F', outline: 'none' }
  }

  return (
    <div className="min-h-[70vh] bg-[#F9FAFB] text-[#001C3D]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-serif text-2xl md:text-3xl text-[#001C3D] mb-6">Interactive Map: Exploring State-by-State CS Education</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-2">
            <div className="w-full h-[780px]">
              {geoReady ? (
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1050, center: [-54, -26] }} className="w-full h-full">
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const name = geo.properties?.name || geo.properties?.NAME || 'Unknown'
                        const isSelected = selectedState === name
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onClick={() => setSelectedState(name)}
                            style={{
                              default: { ...mapStyles.default, fill: isSelected ? mapStyles.pressed.fill : mapStyles.default.fill },
                              hover: mapStyles.hover,
                              pressed: mapStyles.pressed
                            }}
                          />
                        )
                      })
                    }
                  </Geographies>
                </ComposableMap>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox={brazil.viewBox} className="w-full h-full">
                    <g>
                      {brazil.locations.map((loc) => (
                        <path key={loc.id} d={loc.path} fill={mapStyles.default.fill} stroke={mapStyles.default.stroke} strokeWidth={1} onClick={() => setSelectedState(loc.name)} />
                      ))}
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <aside className="p-2">
            {!selectedState ? (
              <div>
                <h3 className="font-serif text-xl text-[#001C3D]">Select a state to explore CS data.</h3>
                <p className="mt-4 text-base text-[#001C3D]">Click a state on the map to view available information.</p>
              </div>
            ) : (
              <StatePanel name={selectedState} />
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
