import React, { useState } from 'react'
import { Target, Map, BarChart2, BookOpen, GraduationCap, Users } from 'lucide-react'

export default function Home({ setPage }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    window.location.href = `mailto:lfares@gse.harvard.edu?subject=CodeMap Brasil — message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\nReply to: ' + form.email)}`
    setSent(true)
  }

  return (
    <div className="text-[#001C3D]">

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#A57B2F] mb-4">Research & Public Policy</span>
        <h1 className="font-serif text-5xl md:text-6xl text-[#001C3D] leading-tight">CodeMap Brasil</h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-[#4B5563] leading-relaxed">
          The first comprehensive, open-access database mapping K-12 Computer Science education across all Brazilian states —
          from curriculum design to infrastructure, teacher profiles, and policy maturity.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setPage('dashboard')}
            className="bg-[#A57B2F] text-white rounded-lg px-8 py-4 text-base font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            Explore Dashboard →
          </button>
          <button
            onClick={() => setPage('comparison')}
            className="bg-white border border-[#001C3D] text-[#001C3D] rounded-lg px-8 py-4 text-base font-semibold hover:bg-[#F9FAFB] transition-colors"
          >
            Compare Policies
          </button>
        </div>
      </section>

      {/* ── What is this ── */}
      <section className="bg-[#001C3D] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-white text-center mb-4">What is CodeMap Brasil?</h2>
          <p className="text-center text-[#9CA3AF] max-w-2xl mx-auto mb-14 text-base">
            Brazil's 2017 national curriculum (BNCC) introduced Computing as a required subject across K-12. But implementation varies enormously by state.
            CodeMap Brasil tracks <em className="text-white not-italic">how</em> each state is translating that mandate into practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Map className="w-6 h-6" />, title: 'State-by-State Profiles', body: 'In-depth profiles for each Brazilian state covering curriculum design, delivery model, materials, infrastructure, and teacher support.' },
              { icon: <BarChart2 className="w-6 h-6" />, title: 'Policy Comparison Tool', body: 'Filter and compare states by region, school level, delivery model, material transparency, infrastructure, and more.' },
              { icon: <BookOpen className="w-6 h-6" />, title: 'Open Data', body: 'All data is collected from official state documents, secretariat websites, and fieldwork. Sources are cited and materials linked where publicly accessible.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
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
        <h2 className="font-serif text-3xl md:text-4xl text-[#001C3D] text-center mb-14">How to Navigate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              step: '01',
              title: 'Dashboard',
              cta: 'dashboard',
              ctaLabel: 'Open Dashboard',
              body: 'Start here. Use the interactive Brazil map to select a state and explore its full CS education profile — availability score, curriculum summary, delivery model, administrative scope, materials, and a deep-dive section with detailed implementation notes.',
            },
            {
              step: '02',
              title: 'Policy Comparison',
              cta: 'comparison',
              ctaLabel: 'Compare States',
              body: 'Use filters to compare states side by side. Narrow by region, network size, delivery model, school level, material transparency, infrastructure, teacher profile, and assessment type. Matched states are highlighted; click "Full Profile" to dive deeper.',
            },
          ].map(({ step, title, cta, ctaLabel, body }) => (
            <div key={step} className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-4 shadow-sm">
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
      </section>

      {/* ── Who is this for ── */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-[#001C3D] text-center mb-4">Who is this for?</h2>
          <p className="text-center text-[#6B7280] max-w-xl mx-auto mb-14 text-sm">
            CodeMap Brasil is designed to serve different audiences with different needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                audience: 'Policy Makers',
                description: 'Identify which states have the most mature CS programs and what structural choices — delivery model, teacher profile, infrastructure — correlate with broader reach and higher quality.',
                uses: ['Benchmark your state against peers', 'Find models to adapt or replicate', 'Spot implementation gaps by region'],
              },
              {
                icon: <GraduationCap className="w-6 h-6" />,
                audience: 'Researchers & Educators',
                description: 'Access structured, comparable data on CS curriculum across all 27 states, with links to official materials and detailed notes on content scope, pedagogy, and assessment.',
                uses: ['Cross-state comparative research', 'Access linked primary sources', 'Track CS maturity over time'],
              },
              {
                icon: <Users className="w-6 h-6" />,
                audience: 'Parents & Caregivers',
                description: 'Understand what computer science education your child has access to in their state — whether it\'s mandatory, what tools are used, and how it compares to other regions.',
                uses: ['Check your state\'s CS offering', 'Understand delivery and scope', 'Advocate for better access'],
              },
            ].map(({ icon, audience, description, uses }) => (
              <div key={audience} className="bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-[#A57B2F]">{icon}</div>
                  <h3 className="font-semibold text-[#001C3D] text-lg">{audience}</h3>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
                <ul className="flex flex-col gap-1.5 mt-auto">
                  {uses.map(u => (
                    <li key={u} className="flex items-start gap-2 text-xs text-[#374151]">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#A57B2F] shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
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
