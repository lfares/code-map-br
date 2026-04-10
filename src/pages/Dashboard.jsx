import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import brazil from '@svg-maps/brazil'
import { BookOpen, Clock, CalendarDays, FileText, BarChart2, ChevronDown, ChevronUp, School, GraduationCap, Users, Globe } from 'lucide-react'
import brazilMap from '@svg-maps/brazil'
import stateData from '../data/state-data.json'

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

function StatePanel({ name }) {
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

      <div>
        {data.deepDiveId ? (
          <a
            href={`#${data.deepDiveId}`}
            className="inline-block bg-[#001C3D] text-white rounded-md px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Learn More
          </a>
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

function SPDeepDive() {
  return (
    <section id="sp-deep-dive" className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[#001C3D] mb-10">São Paulo — State Deep Dive</h2>

        {/* Map + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-start">
          {/* Southeast region map */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2">Southeast Region</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="316 295 231 203" className="w-2/3">
              {southeastLocations.map((loc) => (
                <path
                  key={loc.id}
                  d={loc.path}
                  fill={loc.id === 'sp' ? '#A57B2F' : '#CBD5E1'}
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              ))}
            </svg>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280] mb-2">At a Glance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-[#F9FAFB] rounded-lg px-4 py-4 border border-gray-100">
                <School className="w-6 h-6 text-[#A57B2F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#001C3D] text-base">+5,000</p>
                  <p className="text-sm text-[#6B7280]">Public Schools</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F9FAFB] rounded-lg px-4 py-4 border border-gray-100">
                <GraduationCap className="w-6 h-6 text-[#A57B2F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#001C3D] text-base">~3.1 Million</p>
                  <p className="text-sm text-[#6B7280]">Students</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F9FAFB] rounded-lg px-4 py-4 border border-gray-100">
                <Users className="w-6 h-6 text-[#A57B2F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#001C3D] text-base">20k–30k</p>
                  <p className="text-sm text-[#6B7280]">Tech &amp; Innovation Teachers (est.)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#F9FAFB] rounded-lg px-4 py-4 border border-gray-100">
                <Globe className="w-6 h-6 text-[#A57B2F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#001C3D] text-base">SEDUC-SP</p>
                  <a
                    href="https://www.educacao.sp.gov.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#A57B2F] underline hover:opacity-80"
                  >
                    educacao.sp.gov.br
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Cards */}
        <div className="flex flex-col gap-4">
          <AccordionCard title="Learning Components">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F0F4F8]">
                    <th className="text-left px-4 py-3 font-semibold text-[#001C3D] border border-gray-200">Axis (Pillar)</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#001C3D] border border-gray-200">Learning Milestone</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#001C3D] border border-gray-200">Classroom Approach</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#001C3D] border border-gray-200">Tools &amp; Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 font-medium">Computational Thinking</td>
                    <td className="px-4 py-3 border border-gray-200">Logic &amp; Problem Solving (Decomposition, patterns, algorithms)</td>
                    <td className="px-4 py-3 border border-gray-200"><span className="font-medium">EF:</span> Interactive stories/games. <span className="font-medium">EM:</span> Formal coding/automation</td>
                    <td className="px-4 py-3 border border-gray-200">Scratch, Blockly, Alura</td>
                  </tr>
                  <tr className="border border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 font-medium">Digital World</td>
                    <td className="px-4 py-3 border border-gray-200">Hardware &amp; Infrastructure (Binary, networks, physical parts)</td>
                    <td className="px-4 py-3 border border-gray-200">Hands-on: PC parts identification, Cloud/Wi-Fi concepts, basic robotics</td>
                    <td className="px-4 py-3 border border-gray-200">Robotics kits, simulators</td>
                  </tr>
                  <tr className="border border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 font-medium">Digital Culture</td>
                    <td className="px-4 py-3 border border-gray-200">Ethics &amp; Citizenship (Media analysis, digital footprint, AI impact)</td>
                    <td className="px-4 py-3 border border-gray-200">Debates: Anti-cyberbullying campaigns, fake news, LGPD/Privacy</td>
                    <td className="px-4 py-3 border border-gray-200">Google Workspace, CMSP materials</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionCard>

          <AccordionCard title="Available Materials">
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-semibold text-[#001C3D] mb-1">Official Curriculum</p>
                <a href="https://efape.educacao.sp.gov.br/curriculopaulista/" target="_blank" rel="noopener noreferrer" className="text-[#A57B2F] underline hover:opacity-80">
                  2026 Digital &amp; Media Literacy Curriculum — Currículo Paulista
                </a>
              </div>

              <div>
                <p className="font-semibold text-[#001C3D] mb-2">Public Resources</p>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="https://efape.educacao.sp.gov.br/materialdidatico/" target="_blank" rel="noopener noreferrer" className="text-[#A57B2F] underline hover:opacity-80">EF2 Materials</a>
                    <p className="text-xs text-[#6B7280] mt-0.5">Complete student notebooks available up to 2024. Teacher manuals are outdated (2023).</p>
                  </li>
                  <li>
                    <a href="https://efape.educacao.sp.gov.br/ensinomedio/" target="_blank" rel="noopener noreferrer" className="text-[#A57B2F] underline hover:opacity-80">EM — High School Materials</a>
                    <p className="text-xs text-[#6B7280] mt-0.5">Incomplete materials; only scattered semesters from 2024 available.</p>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-[#001C3D] mb-2">Digital Platforms <span className="text-xs font-normal text-[#6B7280]">(Require institutional login)</span></p>
                <ul className="flex flex-col gap-2">
                  <li><a href="https://efape.educacao.sp.gov.br" target="_blank" rel="noopener noreferrer" className="text-[#A57B2F] underline hover:opacity-80">EFAPE — Lesson Planning Portal</a></li>
                  <li><a href="https://sed.educacao.sp.gov.br" target="_blank" rel="noopener noreferrer" className="text-[#A57B2F] underline hover:opacity-80">SED Portal</a></li>
                  <li><a href="https://cmsp.educacao.sp.gov.br" target="_blank" rel="noopener noreferrer" className="text-[#A57B2F] underline hover:opacity-80">CMSP Repository</a></li>
                </ul>
              </div>
            </div>
          </AccordionCard>

          <AccordionCard title="Infrastructure">
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-[#001C3D] mb-1">Device Access</p>
                <p>São Paulo has undertaken a large-scale purchase of Chromebooks to equip its public school network. <span className="font-medium">Full-Time Schools (PEI)</span> aim for a 1:1 device-to-student ratio, while regular schools operate shared <span className="font-medium">'Chromebook Carts'</span> on a rotational basis across classrooms.</p>
              </div>
              <div>
                <p className="font-semibold text-[#001C3D] mb-1">Connectivity</p>
                <p>Reliable, high-speed internet access remains a critical bottleneck. The dependence on cloud-based platforms (CMSP, Alura, Google Workspace) means that connectivity gaps directly impact instructional delivery, particularly in peripheral and rural school units.</p>
              </div>
            </div>
          </AccordionCard>

          <AccordionCard title="Assessment & Feedback">
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-[#001C3D] mb-1">Internal Tracking</p>
                <p>Progress is monitored through <span className="font-medium">BI Educação</span>, SEDUC's internal business intelligence dashboard, which tracks platform completion rates — primarily Alura course tracks — as a proxy for instructional engagement.</p>
              </div>
              <div>
                <p className="font-semibold text-[#001C3D] mb-1">Saresp Integration</p>
                <p>The annual state exam (Saresp) now incorporates questions targeting logical reasoning and digital culture, signaling a formal institutionalization of CS competencies within the state's evaluation framework.</p>
              </div>
              <div>
                <p className="font-semibold text-[#001C3D] mb-1">Artifact Production</p>
                <p>The scripted curriculum mandates end-of-bimester project deliverables — for example, designing and presenting a Scratch game — as a tangible assessment of computational thinking skills.</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-md px-4 py-3">
                <p className="font-semibold text-amber-800 mb-1">Transparency Gap</p>
                <p className="text-amber-900">No formal public feedback mechanism from students or teachers currently exists. Anonymized student performance data is not publicly available. Reports from social media channels and teacher unions surface recurring concerns regarding limited teacher pedagogical autonomy and the poor maintenance of robotics kits and school Wi-Fi infrastructure.</p>
              </div>
            </div>
          </AccordionCard>
        </div>
      </div>
    </section>
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

      <SPDeepDive />
    </div>
  )
}
