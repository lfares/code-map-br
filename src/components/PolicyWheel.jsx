import React, { useState } from 'react'
import {
  Map, School, BookOpen, Cpu, GraduationCap,
  Eye, FileText, Monitor, Users, BarChart2, CalendarDays,
} from 'lucide-react'

const DIMENSIONS = [
  { id: 'region',               title: 'Geographic Region',     description: 'Where is the state located in Brazil?',                                   Icon: Map },
  { id: 'networkSize',          title: 'Network Size',          description: 'How many schools are managed by the state?',                              Icon: School },
  { id: 'deliveryModel',        title: 'Delivery Model',        description: 'Is the subject mandatory, elective, or integrated?',                     Icon: BookOpen },
  { id: 'learningComponents',   title: 'Learning Components',   description: 'What specific tech topics are students actually learning?',               Icon: Cpu },
  { id: 'adminScope',           title: 'Administrative Scope',  description: 'Which age groups (K-12) does the state focus on?',                       Icon: GraduationCap },
  { id: 'materialTransparency', title: 'Material Transparency', description: 'How easy is it for the public to see the teaching materials?',           Icon: Eye },
  { id: 'materialSource',       title: 'Material Source',       description: 'Who wrote the curriculum? State, private sector, or open source?',       Icon: FileText },
  { id: 'infrastructure',       title: 'Min. Infrastructure',   description: 'What gadgets or labs are needed to teach the class?',                    Icon: Monitor },
  { id: 'teacherProfile',       title: 'Teacher Profile',       description: 'Who is in front of the classroom teaching the code?',                    Icon: Users },
  { id: 'assessmentType',       title: 'Assessment Type',       description: 'How do we know if students are actually learning?',                      Icon: BarChart2 },
  { id: 'maturityRange',        title: 'Curriculum Maturity',   description: 'When did the state start taking CS seriously?',                          Icon: CalendarDays },
]

const SIZE = 520
const CENTER = SIZE / 2
const RING_RADIUS = 200
const ICON_SIZE = 52
const N = DIMENSIONS.length

export default function PolicyWheel() {
  const [active, setActive] = useState(null)

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* ── SVG layer: ring + spokes ── */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Dashed outer ring */}
        <circle
          cx={CENTER} cy={CENTER} r={RING_RADIUS}
          fill="none"
          stroke="#001C3D"
          strokeWidth={1}
          strokeDasharray="3 8"
          opacity={0.18}
        />

        {/* Inner glow ring around center */}
        <circle
          cx={CENTER} cy={CENTER} r={97}
          fill="none"
          stroke={active ? '#A57B2F' : '#001C3D'}
          strokeWidth={1}
          opacity={active ? 0.35 : 0.1}
          style={{ transition: 'stroke 0.3s, opacity 0.3s' }}
        />

        {/* Spokes */}
        {DIMENSIONS.map((dim, i) => {
          const angle = (i * 2 * Math.PI / N) - Math.PI / 2
          const isActive = active?.id === dim.id
          return (
            <line
              key={dim.id}
              x1={CENTER + 100 * Math.cos(angle)}
              y1={CENTER + 100 * Math.sin(angle)}
              x2={CENTER + (RING_RADIUS - 29) * Math.cos(angle)}
              y2={CENTER + (RING_RADIUS - 29) * Math.sin(angle)}
              stroke={isActive ? '#A57B2F' : '#001C3D'}
              strokeWidth={isActive ? 1.5 : 0.5}
              opacity={isActive ? 0.7 : 0.12}
              style={{ transition: 'stroke 0.2s, opacity 0.2s, stroke-width 0.2s' }}
            />
          )
        })}
      </svg>

      {/* ── Center circle ── */}
      <div
        className="absolute rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: active ? 280 : 190,
          height: active ? 280 : 190,
          left: active ? CENTER - 140 : CENTER - 95,
          top: active ? CENTER - 140 : CENTER - 95,
          backgroundColor: '#001C3D',
          boxShadow: active
            ? '0 0 0 3px rgba(165,123,47,0.5), 0 12px 48px rgba(0,28,61,0.45)'
            : '0 0 0 1px rgba(165,123,47,0.2), 0 8px 24px rgba(0,28,61,0.25)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 3,
        }}
      >
        <div
          key={active?.id || 'default'}
          className="text-center px-6 wheel-fade-in"
        >
          {active ? (
            <>
              <p className="text-[#A57B2F] text-[10px] font-bold uppercase tracking-widest mb-2">Dimension</p>
              <p className="text-white font-serif text-lg font-semibold leading-snug mb-3">{active.title}</p>
              <p className="text-white/70 text-sm leading-relaxed">{active.description}</p>
            </>
          ) : (
            <>
              <p className="text-[#A57B2F] font-serif text-3xl font-bold leading-none">11</p>
              <p className="text-white text-[10px] font-semibold uppercase tracking-widest mt-1.5 opacity-70">Policy</p>
              <p className="text-white text-[10px] font-semibold uppercase tracking-widest opacity-70">Dimensions</p>
              <p className="text-white/30 text-[9px] mt-3 leading-relaxed">Hover any icon<br/>to explore</p>
            </>
          )}
        </div>
      </div>

      {/* ── Icon buttons ── */}
      {DIMENSIONS.map((dim, i) => {
        const angle = (i * 2 * Math.PI / N) - Math.PI / 2
        const cx = CENTER + RING_RADIUS * Math.cos(angle)
        const cy = CENTER + RING_RADIUS * Math.sin(angle)
        const isActive = active?.id === dim.id
        const { Icon } = dim

        return (
          <button
            key={dim.id}
            onMouseEnter={() => setActive(dim)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(active?.id === dim.id ? null : dim)}
            aria-label={dim.title}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE,
              left: cx - ICON_SIZE / 2,
              top: cy - ICON_SIZE / 2,
              backgroundColor: isActive ? '#A57B2F' : '#001C3D',
              boxShadow: isActive
                ? '0 0 0 5px rgba(165,123,47,0.22), 0 4px 16px rgba(0,0,0,0.22)'
                : '0 2px 8px rgba(0,0,0,0.18)',
              transform: isActive ? 'scale(1.18)' : 'scale(1)',
              transition: 'all 0.2s ease',
              zIndex: 2,
            }}
          >
            <Icon size={20} color="white" strokeWidth={1.8} />
          </button>
        )
      })}
    </div>
  )
}
