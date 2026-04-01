import React from 'react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <section className="text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-[#001C3D] leading-tight">
          CodeMap Brasil — Academic Research
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-[#001C3D]">
          CodeMap Brasil maps curriculum-aligned CS learning pathways and classroom practices.
          Our goal is to support research-driven decisions and provide a clear dashboard for educators.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-block bg-[#A57B2F] text-white rounded-md px-6 py-3 text-sm font-medium shadow-sm hover:opacity-95"
          >
            Explore Dashboard
          </a>
        </div>

        <div className="mt-10 mx-auto w-full md:w-2/3 border border-dashed border-gray-200 rounded h-44 flex items-center justify-center">
          <span className="text-gray-400">logo-map.svg (placeholder)</span>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="sr-only">How to use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white shadow-md rounded p-6">
            <h3 className="font-semibold font-serif text-lg text-[#001C3D]">Get Started</h3>
            <p className="mt-2 text-sm text-[#001C3D]">Open the dashboard and sign in to view mapped curricula.</p>
          </article>

          <article className="bg-white shadow-md rounded p-6">
            <h3 className="font-semibold font-serif text-lg text-[#001C3D]">Explore Maps</h3>
            <p className="mt-2 text-sm text-[#001C3D]">Use filters to focus on grade, topic, or standards alignment.</p>
          </article>

          <article className="bg-white shadow-md rounded p-6">
            <h3 className="font-semibold font-serif text-lg text-[#001C3D]">Share Findings</h3>
            <p className="mt-2 text-sm text-[#001C3D]">Export summaries or share links for collaborative research.</p>
          </article>
        </div>
      </section>

      <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
        © 2026 CodeMap Brasil • Harvard K-12 CS Research
      </footer>
    </div>
  )
}
