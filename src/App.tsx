function App() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <p className="mb-4 font-[JetBrains_Mono] text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
          Portfolio scaffold ready
        </p>
        <h1 className="font-[Bangers] text-5xl leading-tight text-[var(--primary)] sm:text-6xl">
          Vite + React + TypeScript + Tailwind
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
          The requested structure, theme tokens, font declarations, and context shell are in place without UI implementation yet.
        </p>
      </section>
    </main>
  )
}

export default App
