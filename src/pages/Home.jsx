import React, { useState, useEffect, useRef } from 'react'
import { Target, Map, BarChart2, BookOpen, GraduationCap, Users } from 'lucide-react'

const AUDIENCES = [
  {
    icon: Target,
    audience: 'Policy Makers',
    description: 'Identify best-in-class state programs and the structural choices behind their success.',
    uses: ['Benchmark your state against peers', 'Find models to adapt or replicate', 'Spot implementation gaps by region'],
  },
  {
    icon: GraduationCap,
    audience: 'Researchers & Educators',
    description: 'Structured, comparable data on CS curriculum across all 27 states, with links to primary sources.',
    uses: ['Cross-state comparative research', 'Access linked official materials', 'Track CS policy maturity over time'],
  },
  {
    icon: Users,
    audience: 'Parents & Caregivers',
    description: "Understand what CS education your child can access — and how your state stacks up.",
    uses: ["Check your state's CS offering", 'Understand delivery and scope', 'Advocate for better access'],
  },
]

function AudienceSection({ whoRef }) {
  const [active, setActive] = React.useState(0)
  const current = AUDIENCES[active]
  const Icon = current.icon

  return (
    <section className="bg-[#F9FAFB] py-20">
      <div ref={whoRef} className="fade-in-up max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start" style={{ animationDelay: '0.1s' }}>

        {/* Left — title */}
        <div className="lg:w-2/5 shrink-0">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A57B2F] mb-4">Audience</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#001C3D] leading-tight mb-8">Who is this for?</h2>
          <div className="flex flex-col gap-2">
            {AUDIENCES.map((a, i) => {
              const BtnIcon = a.icon
              const isActive = i === active
              return (
                <button
                  key={a.audience}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-4 text-left px-5 py-4 rounded-xl transition-all duration-200 group border ${isActive ? 'border-[#001C3D]' : 'border-[#001C3D]/20'}`}
                  style={{
                    backgroundColor: isActive ? '#001C3D' : 'transparent',
                    boxShadow: isActive ? '0 4px 20px rgba(0,28,61,0.15)' : 'none',
                  }}
                >
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${isActive ? 'bg-[#A57B2F]' : 'bg-[#001C3D]/8 group-hover:bg-[#001C3D]/12'}`}>
                    <BtnIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#001C3D]'}`} />
                  </div>
                  <span className={`font-semibold text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#374151] group-hover:text-[#001C3D]'}`}>
                    {a.audience}
                  </span>
                  {isActive && <span className="ml-auto text-[#A57B2F] text-xs">→</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right — detail panel */}
        <div className="flex-1 min-w-0">
          <div
            key={active}
            className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm wheel-fade-in"
          >
            <div className="w-12 h-12 rounded-xl bg-[#A57B2F] flex items-center justify-center mb-6">
              <Icon key={`icon-${active}`} className="w-6 h-6 text-white icon-bounce" />
            </div>
            <h3 className="font-serif text-3xl text-[#001C3D] mb-3">{current.audience}</h3>
            <p className="text-[#6B7280] text-base leading-relaxed mb-8">{current.description}</p>
            <ul className="flex flex-col gap-3">
              {current.uses.map(u => (
                <li key={u} className="flex items-center gap-3 text-sm text-[#374151] bg-[#F9FAFB] rounded-lg px-4 py-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A57B2F] shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
import PolicyWheel from '../components/PolicyWheel'

// ── Scroll fade-in hook ───────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
        const steps = 40
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + increment, target)
          setCount(Math.round(current))
          if (current >= target) clearInterval(timer)
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Home ──────────────────────────────────────────────────────────────────────
export default function Home({ setPage }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const heroRef = useFadeIn()
  const whatRef = useFadeIn()
  const statsRef = useFadeIn()
  const navRef = useFadeIn()
  const whoRef = useFadeIn()
  const contactRef = useFadeIn()

  function handleSubmit(e) {
    e.preventDefault()
    window.location.href = `mailto:lfares@gse.harvard.edu?subject=CodeMap Brasil — message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\nReply to: ' + form.email)}`
    setSent(true)
  }

  return (
    <div className="text-[#001C3D]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* dot-grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #001C3D18 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* gold accent blobs */}
        <div aria-hidden="true" className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#A57B2F] opacity-[0.06] blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 -left-24 w-[320px] h-[320px] rounded-full bg-[#001C3D] opacity-[0.04] blur-2xl pointer-events-none" />

        <div
          ref={heroRef}
          className="fade-in-up relative max-w-6xl mx-auto px-6 py-32 text-center"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A57B2F] mb-5">Research &amp; Public Policy</span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#001C3D] leading-tight">CodeMap Brasil</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-[#4B5563] leading-relaxed">
            The first comprehensive, open-access database mapping K-12 Computer Science
            education across all Brazilian states — from curriculum design to infrastructure,
            teacher profiles, and policy maturity.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setPage('dashboard')}
              className="bg-[#A57B2F] text-white rounded-lg px-9 py-4 text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              Explore State Insights →
            </button>
            <button
              onClick={() => setPage('comparison')}
              className="bg-white border border-[#001C3D] text-[#001C3D] rounded-lg px-9 py-4 text-base font-semibold hover:bg-[#F9FAFB] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              Compare Policies
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-y border-gray-100 bg-white">
        <div
          ref={statsRef}
          className="fade-in-up max-w-6xl mx-auto px-6 py-10 grid grid-cols-3 gap-8 text-center"
          style={{ animationDelay: '0.15s' }}
        >
          {[
            { value: 27, suffix: '', label: 'States tracked' },
            { value: 11, suffix: '', label: 'Policy dimensions' },
            { value: 100, suffix: '%', label: 'Open access' },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-serif text-4xl md:text-5xl text-[#A57B2F] font-bold">
                <Counter target={value} suffix={suffix} />
              </span>
              <span className="text-xs uppercase tracking-widest text-[#9CA3AF] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Policy Wheel ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-2/5 shrink-0">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A57B2F] mb-4">Framework</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#001C3D] leading-tight mb-6">11 Dimensions of CS Policy</h2>
            <p className="text-[#4B5563] text-base md:text-lg leading-relaxed">
              Hover over each icon to explore the policy dimensions we track across every Brazilian state — from infrastructure and teacher profiles to curriculum maturity and learning components.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <PolicyWheel />
          </div>
        </div>
      </section>

      {/* ── What is this ── */}
      <section className="bg-[#001C3D] py-20">
        <div
          ref={whatRef}
          className="fade-in-up max-w-6xl mx-auto px-6"
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white text-center mb-4">What is CodeMap Brasil?</h2>
          <p className="text-center text-[#9CA3AF] max-w-2xl mx-auto mb-14 text-base">
            Brazil's 2017 national curriculum (BNCC) introduced Computing as a required subject across K-12.
            But implementation varies enormously by state. CodeMap Brasil tracks{' '}
            <em className="text-white not-italic font-semibold">how</em> each state is translating that mandate into practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Map className="w-6 h-6" />, title: 'State-by-State Profiles', body: 'In-depth profiles covering curriculum design, delivery model, materials, infrastructure, and teacher support for each Brazilian state.' },
              { icon: <BarChart2 className="w-6 h-6" />, title: 'Policy Comparison Tool', body: 'Filter and compare states by region, school level, delivery model, material transparency, infrastructure, and more.' },
              { icon: <BookOpen className="w-6 h-6" />, title: 'Open Data', body: 'All data is collected from official state documents and fieldwork. Sources are cited and materials linked where publicly accessible.' },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:scale-105 transition-transform duration-300 cursor-default"
              >
                <div className="text-[#A57B2F]">{icon}</div>
                <h3 className="font-semibold text-white text-lg">{title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to navigate ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div ref={navRef} className="fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-serif text-3xl md:text-4xl text-[#001C3D] text-center mb-14">How to Navigate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                step: '01',
                title: 'State Insights',
                cta: 'dashboard',
                ctaLabel: 'Open State Insights',
                body: 'Start here. Use the interactive Brazil map to select a state and explore its full CS education profile — availability score, curriculum summary, delivery model, administrative scope, materials, and deep-dive implementation notes.',
              },
              {
                step: '02',
                title: 'Policy Comparison',
                cta: 'comparison',
                ctaLabel: 'Compare States',
                body: 'Use filters to compare states side by side. Narrow by region, network size, delivery model, school level, material transparency, infrastructure, teacher profile, and assessment type. Matched states are highlighted.',
              },
            ].map(({ step, title, cta, ctaLabel, body }) => (
              <div
                key={step}
                className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#A57B2F] bg-[#A57B2F]/10 rounded-md px-2 py-1 tracking-wider">{step}</span>
                  <h3 className="font-serif text-xl text-[#001C3D]">{title}</h3>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed flex-1">{body}</p>
                <button
                  onClick={() => setPage(cta)}
                  className="self-start text-xs font-semibold text-[#001C3D] border border-[#001C3D] rounded-lg px-4 py-2 hover:bg-[#001C3D] hover:text-white transition-colors"
                >
                  {ctaLabel} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who is this for ── */}
      <AudienceSection whoRef={whoRef} />

      {/* ── Contact ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div ref={contactRef} className="fade-in-up max-w-2xl mx-auto" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-serif text-3xl md:text-4xl text-[#001C3D] text-center mb-2">Get in Touch</h2>
          <p className="text-center text-[#6B7280] text-sm mb-10">
            Questions, suggestions, or data corrections? Reach out to{' '}
            <a href="mailto:lfares@gse.harvard.edu" className="text-[#A57B2F] hover:underline font-medium">Livia Fares</a>
            {' '}at Harvard Graduate School of Education.
          </p>

          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-8 py-10 text-center">
              <p className="font-semibold text-lg">Your email client should have opened!</p>
              <p className="text-sm mt-1">If it didn't, email directly at <a href="mailto:lfares@gse.harvard.edu" className="underline">lfares@gse.harvard.edu</a>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-5 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Your name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#001C3D] focus:outline-none focus:border-[#A57B2F]"
                    placeholder="Maria Silva"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Your email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#001C3D] focus:outline-none focus:border-[#A57B2F]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#001C3D] focus:outline-none focus:border-[#A57B2F] resize-none"
                  placeholder="Your question, suggestion, or data correction..."
                />
              </div>
              <button
                type="submit"
                className="self-end bg-[#001C3D] text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-[#0a2d5e] transition-colors"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        © 2026 CodeMap Brasil &nbsp;•&nbsp; Harvard Graduate School of Education &nbsp;•&nbsp;{' '}
        <a href="mailto:lfares@gse.harvard.edu" className="hover:text-[#A57B2F] transition-colors">lfares@gse.harvard.edu</a>
      </footer>
    </div>
  )
}
