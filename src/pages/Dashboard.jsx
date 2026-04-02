import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import brazil from '@svg-maps/brazil'

const GEO_URL = '/brazil-states.geojson'

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
              <div className="prose">
                <h3 className="font-serif text-xl text-[#001C3D]">Select a state to explore CS data.</h3>
                <p className="mt-4 text-base text-[#001C3D]">Click a state on the map to view available information.</p>
              </div>
            ) : (
              <div className="prose">
                <h3 className="font-serif text-2xl text-[#001C3D]">{selectedState}</h3>
                <p className="mt-4 text-base text-[#001C3D]">Data unavailable, come back later.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
