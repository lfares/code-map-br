import React from 'react'
import { Database, Target, Cpu } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-28">
      <section className="text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[#001C3D] leading-tight">CodeMap Brasil</h1>

        <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-[#001C3D]">
          A data-driven analysis of K-12 Computer Science education across Brazil. Mapping the state of the art in programming curricula to inform research and public policy.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="inline-block bg-[#A57B2F] text-white rounded-md px-10 py-4 md:py-5 text-lg md:text-xl font-semibold shadow-sm hover:opacity-95"
          >
            Explore Dashboard
          </a>
        </div>
      </section>

      <section className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white shadow-md rounded p-8 flex flex-col items-start space-y-4">
            <Database className="text-[#A57B2F] w-8 h-8" />
            <h3 className="font-semibold font-serif text-xl md:text-2xl text-[#001C3D]">Data Transparency</h3>
            <p className="mt-1 text-base md:text-lg text-[#001C3D]">Providing a clear, comparative view of how each Brazilian state is implementing CS standards in middle and high schools.</p>
          </article>

          <article className="bg-white shadow-md rounded p-8 flex flex-col items-start space-y-4">
            <Target className="text-[#A57B2F] w-8 h-8" />
            <h3 className="font-semibold font-serif text-xl md:text-2xl text-[#001C3D]">Policy Insight</h3>
            <p className="mt-1 text-base md:text-lg text-[#001C3D]">Serving as a primary resource for policymakers to identify successful regional models and address implementation gaps.</p>
          </article>

          <article className="bg-white shadow-md rounded p-8 flex flex-col items-start space-y-4">
            <Cpu className="text-[#A57B2F] w-8 h-8" />
            <h3 className="font-semibold font-serif text-xl md:text-2xl text-[#001C3D]">Curricular Alignment</h3>
            <p className="mt-1 text-base md:text-lg text-[#001C3D]">Ensuring that pedagogical practices in computing and logic align with 21st-century digital demands.</p>
          </article>
        </div>
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#001C3D]">Explore the Landscape of Digital Literacy</h2>
            <ul className="mt-6 list-disc list-inside space-y-4 text-[#001C3D] text-lg md:text-xl">
              <li>State-by-State Comparison of CS maturity.</li>
              <li>K-12 Progression from Middle School to High School.</li>
              <li>Identification of regional infrastructure and teacher support gaps.</li>
              <li>Detailed access to specific programming and logic frameworks.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">© 2026 CodeMap Brasil • Harvard K-12 CS Research</footer>
    </div>
  )
}
