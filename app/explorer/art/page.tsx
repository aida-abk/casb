export default function ArtCraftsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Art & Crafts</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">Traditional patterns and modern interpretations.</p>
      </div>
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Pattern Library</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-secondary" />
          ))}
        </div>
      </section>
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Color Themes</h2>
        <p className="text-sm text-muted-foreground">Switch between country color schemes (coming soon).</p>
      </section>
    </div>
  );
} 