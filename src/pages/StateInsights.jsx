import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import brazil from '@svg-maps/brazil'
import { BookOpen, Clock, CalendarDays, FileText, BarChart2, ChevronDown, ChevronUp, School, GraduationCap, Users, Globe } from 'lucide-react'
import brazilMap from '@svg-maps/brazil'
import stateData from '../data/state-data.json'
import deepDiveData from '../data/deep-dive-data.json'

const ICON_MAP = { BookOpen, Clock, CalendarDays, FileText, BarChart2 }

const SOUTHEAST_IDS = ['sp', 'rj', 'mg', 'es']
const southeastLocations = brazilMap.locations.filter(l => SOUTHEAST_IDS.includes(l.id))

const GEO_URL = '/brazil-states.geojson'

function AdminScopeTimeline({ from, to, fromLabel, toLabel }) {
  const GRADES = 12
  const activeStart = ((from - 1) / GRADES) * 100
  const activeEnd = to === GRADES ? 100 : ((to - 1) / GRADES) * 100
  const activeWidth = activeEnd - activeStart

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-3">Administrative Scope</p>
      <div className="relative">
        {/* Track */}
        <div className="relative h-1.5 rounded-full bg-[#D1D5DB]">
          <div
            className="absolute h-1.5 rounded-full"
            style={{ left: `${activeStart}%`, width: `${activeWidth}%`, backgroundColor: '#A57B2F' }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white ring-1 ring-[#A57B2F] bg-[#A57B2F]"
            style={{ left: `calc(${activeStart}% - 5px)` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white ring-1 ring-[#A57B2F] bg-[#A57B2F]"
            style={{ left: `calc(${activeEnd}% - 5px)` }}
          />
        </div>

        {/* Grade marker row */}
        <div className="relative h-5 mt-1.5">
          {from !== 1 && <span className="absolute text-xs text-[#9CA3AF] -translate-x-1/2" style={{ left: '0%' }}>G1</span>}
          <span className="absolute text-xs font-bold text-[#A57B2F] -translate-x-1/2" style={{ left: `${activeStart}%` }}>G{from}</span>
          <span className="absolute text-xs font-bold text-[#A57B2F] -translate-x-1/2" style={{ left: `${activeEnd}%` }}>G{to}</span>
          {to !== 12 && <span className="absolute text-xs text-[#9CA3AF] -translate-x-full" style={{ left: '100%' }}>G12</span>}
        </div>

        {/* Scope label row */}
        <div className="relative h-5 mt-0.5">
          {fromLabel === toLabel ? (
            <div className="absolute flex justify-center" style={{ left: `${activeStart}%`, width: `${activeWidth}%` }}>
              <span className="text-xs font-bold text-[#A57B2F]">{fromLabel}</span>
            </div>
          ) : (
            <>
              <span className="absolute text-xs font-bold text-[#A57B2F] -translate-x-1/2" style={{ left: `${activeStart}%` }}>{fromLabel}</span>
              <span className="absolute text-xs font-bold text-[#A57B2F] -translate-x-1/2" style={{ left: `${activeEnd}%` }}>{toLabel}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
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

// ── Deep Dive generic renderer ────────────────────────────────────────────────

function renderBody(text) {
  const parts = text.split(/\*\*(.+?)\*\*/)
  return parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)
}

function DeepDiveBlock({ block }) {
  if (block.type === 'paragraph') {
    return (
      <div>
        <p className="font-semibold text-[#001C3D] mb-1">{block.heading}</p>
        <p>{renderBody(block.body)}</p>
      </div>
    )
  }
  if (block.type === 'alert') {
    const styles = block.variant === 'red'
      ? { wrap: 'bg-red-50 border-red-200', head: 'text-red-800', body: 'text-red-900' }
      : { wrap: 'bg-amber-50 border-amber-200', head: 'text-amber-800', body: 'text-amber-900' }
    return (
      <div className={`${styles.wrap} border rounded-md px-4 py-3`}>
        <p className={`font-semibold ${styles.head} mb-1`}>{block.heading}</p>
        <p className={`${styles.body} text-sm`}>{renderBody(block.body)}</p>
      </div>
    )
  }
  if (block.type === 'table') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#F0F4F8]">
              {block.columns.map(col => (
                <th key={col} className="text-left px-4 py-3 font-semibold text-[#001C3D] border border-gray-200">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="border border-gray-200 hover:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 border border-gray-200${j === 0 ? ' font-medium' : ''}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (block.type === 'links') {
    return (
      <div>
        <p className="font-semibold text-[#001C3D] mb-2">
          {block.heading}
          {block.headingNote && <span className="text-xs font-normal text-[#6B7280] ml-1">{block.headingNote}</span>}
        </p>
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#A57B2F] underline hover:opacity-80">{item.label}</a>
              {item.access && (
                <span className={`ml-2 text-xs font-medium ${item.access === 'Public' ? 'text-emerald-700' : 'text-[#6B7280]'}`}>({item.access})</span>
              )}
              {item.tag && (
                <span className={`ml-2 text-xs font-medium ${item.tagColor === 'red' ? 'text-red-600' : 'text-[#6B7280]'}`}>{item.tag}</span>
              )}
              {item.note && <p className="text-xs text-[#6B7280] mt-0.5">{item.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return null
}

function StateDeepDive({ stateName }) {
  const data = deepDiveData[stateName]
  if (!data) return null
  return (
    <section id={data.sectionId} className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[#001C3D] mb-10">{stateName} — State Deep Dive</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-start">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2">Southeast Region</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="316 295 231 203" className="w-2/3">
              {southeastLocations.map((loc) => (
                <path key={loc.id} d={loc.path} fill={loc.id === data.svgId ? '#A57B2F' : '#CBD5E1'} stroke="#fff" strokeWidth={1.5} />
              ))}
            </svg>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2">At a Glance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.glance.map((item, i) => {
                const Icon = { School, GraduationCap, Users, Globe }[item.icon]
                return (
                  <div key={i} className="flex items-start gap-3 bg-[#F9FAFB] rounded-lg px-4 py-4 border border-gray-100">
                    {Icon && <Icon className="w-6 h-6 text-[#A57B2F] shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-semibold text-[#001C3D] text-base">{item.value}</p>
                      {item.url
                        ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#A57B2F] underline hover:opacity-80">{item.urlDisplay}</a>
                        : <p className="text-sm text-[#6B7280]">{item.label}</p>
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {data.cards.map(card => (
            <AccordionCard key={card.title} title={card.title}>
              <div className="flex flex-col gap-4">
                {card.blocks.map((block, i) => <DeepDiveBlock key={i} block={block} />)}
              </div>
            </AccordionCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatePanel({ name, onLearnMore }) {
  const data = stateData[name]

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
      <div className="flex items-start justify-between">
        <h3 className="font-serif text-3xl text-[#001C3D]">{name}</h3>
        <AvailabilityBar score={data.availability.score} label={data.availability.label} />
      </div>

      <p className="text-base italic text-[#001C3D] leading-relaxed">
        {data.summary}
      </p>

      {data.scope && (
        <AdminScopeTimeline
          from={data.scope.from}
          to={data.scope.to}
          fromLabel={data.scope.fromLabel}
          toLabel={data.scope.toLabel}
        />
      )}

      <ul className="flex flex-col gap-5">
        {data.details.map(({ icon, text }, i) => {
          const Icon = ICON_MAP[icon]
          return (
            <li key={i} className="flex items-start gap-3">
              {Icon && <Icon className="w-6 h-6 mt-0.5 shrink-0 text-[#A57B2F]" />}
              <span className="text-base text-[#001C3D]">{text}</span>
            </li>
          )
        })}
      </ul>

      {data.footnote && (
        <p className="text-xs text-[#6B7280] leading-relaxed italic">{data.footnote}</p>
      )}

      <div>
        {data.deepDiveId ? (
          <button
            onClick={onLearnMore}
            className="inline-block bg-[#001C3D] text-white rounded-md px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Learn More
          </button>
        ) : (
          <button
            disabled
            className="inline-block bg-[#001C3D] text-white rounded-md px-6 py-3 text-sm font-semibold opacity-40 cursor-not-allowed"
            title="Coming soon"
          >
            Learn More
          </button>
        )}
      </div>
    </div>
  )
}

function AccordionCard({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-base text-[#001C3D]">{title}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#A57B2F] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#A57B2F] shrink-0" />}
      </button>
      {open && (
        <div className="px-5 py-5 bg-white border-t border-gray-100 text-sm text-[#001C3D] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}


export default function StateInsights({ selectedState, setSelectedState }) {
  const [activeDeepDive, setActiveDeepDive] = useState(null)
  const [geoReady, setGeoReady] = useState(null)

  useEffect(() => {
    if (!activeDeepDive) return
    const id = stateData[activeDeepDive]?.deepDiveId
    if (!id) return
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }, [activeDeepDive])

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
                            onClick={() => { setSelectedState(name); setActiveDeepDive(null); }}
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
              <StatePanel name={selectedState} onLearnMore={() => setActiveDeepDive(selectedState)} />
            )}
          </aside>
        </div>
      </div>

      {activeDeepDive && <StateDeepDive stateName={activeDeepDive} />}
    </div>
  )
}
