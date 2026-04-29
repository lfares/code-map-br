import React, { useState } from 'react'
import stateData from '../data/state-data.json'
import { FILTERS, emptyFilters, matches } from '../data/filters.js'

// ── Sidebar Filters ──────────────────────────────────────────────────────────

function FilterGroup({ filter, activeFilters, onToggle }) {
  const activeCount = activeFilters[filter.key].size
  const [open, setOpen] = useState(activeCount > 0)

  return (
    <div className="border-b border-gray-50 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#F9FAFB] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">{filter.label}</span>
          {activeCount > 0 && (
            <span className="text-[10px] font-bold bg-[#A57B2F] text-white rounded-full w-4 h-4 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <span className="text-[#9CA3AF] text-xs transition-transform duration-200" style={{ display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </button>
      {open && (
        <div className="px-5 pb-4 flex flex-col gap-1">
          {filter.options.map(option => {
            const active = activeFilters[filter.key].has(option)
            return (
              <button
                key={option}
                onClick={() => onToggle(filter.key, option)}
                className={`text-left text-xs px-3 py-2 rounded-lg border transition-all duration-150 ${
                  active
                    ? 'bg-[#A57B2F] text-white border-[#A57B2F] font-semibold'
                    : 'bg-transparent text-[#374151] border-transparent hover:bg-[#F9FAFB] hover:border-gray-200'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FilterSidebar({ activeFilters, onToggle, onClearAll, hasActiveFilters }) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="bg-[#001C3D] px-5 py-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>
          {hasActiveFilters && (
            <button onClick={onClearAll} className="text-xs text-[#A57B2F] hover:opacity-80 transition-opacity">
              Clear all
            </button>
          )}
        </div>
        <div>
          {FILTERS.map(filter => (
            <FilterGroup
              key={filter.key}
              filter={filter}
              activeFilters={activeFilters}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

// ── Analytics Bar ────────────────────────────────────────────────────────────

function AnalyticsBar({ stateEntries, total, hasActiveFilters }) {
  const count = stateEntries.length
  const mandatory = stateEntries.filter(([, d]) => [d.meta.deliveryModel].flat().includes('Mandatory for all students')).length
  const open = stateEntries.filter(([, d]) => d.meta.materialTransparency === 'Open').length
  const withAI = stateEntries.filter(([, d]) => d.meta.learningComponents?.includes('Data Science & AI')).length
  const avgScore = count > 0
    ? (stateEntries.reduce((sum, [, d]) => sum + d.availability.score, 0) / count).toFixed(1)
    : '—'

  const stats = [
    { value: hasActiveFilters ? `${count} / ${total}` : count, label: 'States' },
    { value: mandatory, label: 'Mandatory' },
    { value: open, label: 'Open Materials' },
    { value: withAI, label: 'Teach AI' },
    { value: `${avgScore} / 5`, label: 'Avg. Transparency Score' },
  ]

  return (
    <div className="grid grid-cols-5 gap-3 mb-6">
      {stats.map(({ value, label }) => (
        <div key={label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex flex-col gap-1">
          <span className="text-2xl font-bold text-[#001C3D]">{value}</span>
          <span className="text-xs text-[#9CA3AF] uppercase tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ── State Card ───────────────────────────────────────────────────────────────

const DELIVERY_COLOR = {
  'Mandatory for all students': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  "Itinerary (depends on student's specialty choice)": { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Transversal': { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
}

function StateCard({ stateName, data, isMatch, hasActiveFilters, onLearnMore }) {
  const dim = hasActiveFilters && !isMatch
  const elevated = hasActiveFilters && isMatch
  const deliveryModels = [data.meta?.deliveryModel].flat().filter(Boolean)

  return (
    <div
      className={`bg-white rounded-2xl border flex flex-col overflow-hidden transition-all duration-200
        ${dim ? 'opacity-25 grayscale pointer-events-none' : ''}
        ${elevated ? 'border-[#A57B2F] shadow-lg shadow-[#A57B2F]/10' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'}
      `}
    >
      {/* Card header */}
      <div className="bg-[#001C3D] px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#A57B2F] text-white rounded-md px-2 py-0.5">{data.meta?.abbr}</span>
            <h3 className="font-serif text-xl text-white">{stateName}</h3>
          </div>
          <div className="flex items-center gap-1 shrink-0 pt-1">
            {[1, 2, 3, 4, 5].map(i => {
              const pct = data.availability.score >= i ? 100 : data.availability.score <= i - 1 ? 0 : (data.availability.score - (i - 1)) * 100
              return (
                <div key={i} className="w-2.5 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#A57B2F' }} />
                </div>
              )
            })}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{data.availability.label}</p>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 flex flex-col gap-3 flex-1">
        {/* Short summary */}
        <p className="text-sm text-[#374151] leading-relaxed">
          {data.shortSummary}
        </p>

        {/* Delivery model */}
        <div className="flex flex-wrap items-center gap-1.5">
          {deliveryModels.map((dm, i) => {
            const c = DELIVERY_COLOR[dm] || { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' }
            return (
              <span key={i} className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                {dm}
              </span>
            )
          })}
        </div>

        {/* Scope + transparency tags */}
        <div className="flex flex-wrap gap-1.5">
          {[data.meta?.adminScope?.join(' & '), data.meta?.materialTransparency]
            .filter(Boolean)
            .map((tag, i) => (
              <span key={i} className="text-xs bg-[#F0F4F8] text-[#6B7280] px-2.5 py-1 rounded-full">{tag}</span>
            ))}
        </div>

        {/* Learning components — dot-separated */}
        {data.meta?.learningComponents?.length > 0 && (
          <p className="text-xs text-[#6B7280]">
            <span className="font-semibold text-[#001C3D]">Covers: </span>
            {data.meta.learningComponents.join(' · ')}
          </p>
        )}
      </div>

      {/* Card footer */}
      <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-[#9CA3AF]">Since</span>
          <span className="text-sm font-semibold text-[#001C3D]">{data.meta?.maturityYear}</span>
        </div>
        <button
          onClick={() => onLearnMore(stateName)}
          className="bg-[#001C3D] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0a2d5e] transition-colors"
        >
          Full Profile →
        </button>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PolicyComparison({ setPage, setSelectedState }) {
  const [activeFilters, setActiveFilters] = useState(emptyFilters())

  const hasActiveFilters = Object.values(activeFilters).some(s => s.size > 0)

  function toggle(filterKey, option) {
    setActiveFilters(prev => {
      const next = new Set(prev[filterKey])
      next.has(option) ? next.delete(option) : next.add(option)
      return { ...prev, [filterKey]: next }
    })
  }

  function clearAll() {
    setActiveFilters(emptyFilters())
  }

  function handleLearnMore(stateName) {
    setSelectedState(stateName)
    setPage('dashboard')
  }

  const allStates = Object.entries(stateData).filter(([, d]) => d.meta).sort(([a], [b]) => a.localeCompare(b))
  const matched = allStates.filter(([, d]) => matches(d.meta, activeFilters))
  const unmatched = allStates.filter(([, d]) => !matches(d.meta, activeFilters))
  const ordered = [...matched, ...unmatched]
  const summaryStates = hasActiveFilters ? matched : allStates

  return (
    <div className="min-h-[70vh] bg-[#F9FAFB] text-[#001C3D]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h2 className="font-serif text-3xl text-[#001C3D]">Policy Comparison</h2>
          <p className="text-sm text-[#6B7280] mt-1">Filter states by policy dimensions to compare CS education approaches across Brazil.</p>
        </div>

        <AnalyticsBar stateEntries={summaryStates} total={allStates.length} hasActiveFilters={hasActiveFilters} />

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <FilterSidebar
            activeFilters={activeFilters}
            onToggle={toggle}
            onClearAll={clearAll}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex-1 min-w-0">
            {hasActiveFilters && (
              <p className="text-sm text-[#6B7280] mb-4">
                <span className="font-semibold text-[#001C3D]">{matched.length}</span> of {allStates.length} states match your filters.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {ordered.map(([name, data]) => (
                <StateCard
                  key={name}
                  stateName={name}
                  data={data}
                  isMatch={matches(data.meta, activeFilters)}
                  hasActiveFilters={hasActiveFilters}
                  onLearnMore={handleLearnMore}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
