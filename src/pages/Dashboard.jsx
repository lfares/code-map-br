import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import brazil from '@svg-maps/brazil'

// Local GeoJSON fallback (saved to `public/` to avoid CORS/network issues)
const GEO_URL = '/brazil-states.geojson'

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState(null)
  const [geoStatus, setGeoStatus] = useState({ ok: null, length: 0, error: null })

  useEffect(() => {
    let mounted = true
    console.log('Dashboard mounted — checking local GEO_URL', GEO_URL)
    fetch(GEO_URL)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed ' + r.status)
        return r.json()
      })
      .then((json) => {
        if (!mounted) return
        const len = json && json.features ? json.features.length : 0
        console.log('fetched local geojson, features:', len)
        setGeoStatus({ ok: true, length: len, error: null })
      })
      .catch((err) => {
        console.warn('local geojson fetch error', err)
        if (!mounted) return
        setGeoStatus({ ok: false, length: 0, error: String(err) })
      })

    return () => {
      mounted = false
    }
  }, [])

  const mapStyles = {
    default: {
      fill: '#001C3D',
      stroke: '#A57B2F',
      strokeWidth: 0.5,
      outline: 'none'
    },
    hover: {
      fill: '#0E6680',
      outline: 'none'
    },
    pressed: {
      fill: '#A57B2F',
      outline: 'none'
    }
  }

  return (
    <div className="min-h-[70vh] bg-[#F9FAFB] text-[#001C3D]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-serif text-2xl md:text-3xl text-[#001C3D] mb-6">Interactive Map: Exploring State-by-State CS Education</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="p-2">
            <div className="w-full h-[560px] bg-white shadow-sm rounded relative overflow-hidden">
              <div className="absolute top-2 left-2 z-10 bg-white/90 text-sm text-[#001C3D] px-3 py-1 rounded shadow">
                {geoStatus.ok === null && 'Checking geojson…'}
                {geoStatus.ok === true && `GeoJSON OK — ${geoStatus.length} features`}
                {geoStatus.ok === false && `GeoJSON ERROR — ${geoStatus.error}`}
              </div>
              {geoStatus.ok ? (
                <ComposableMap projection="geoMercator" projectionConfig={{ scale: 700, center: [-54, -14] }} className="w-full h-full">
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) => (
                      <>
                        {console.log('react-simple-maps geographies count:', geographies.length)}
                        {geographies.map((geo) => {
                          const name = geo.properties && (geo.properties.name || geo.properties.NAME) ? (geo.properties.name || geo.properties.NAME) : 'Unknown'
                          const isSelected = selectedState && selectedState === name
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
                        })}
                      </>
                    )}
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
