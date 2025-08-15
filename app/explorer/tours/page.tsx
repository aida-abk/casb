export default function ToursPage() {
  const tours = [
    { city: "Almaty", country: "Kazakhstan" },
    { city: "Samarkand", country: "Uzbekistan" },
    { city: "Bishkek", country: "Kyrgyzstan" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Virtual City Tours</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">Photo galleries with stories.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tours.map((t) => (
          <div key={t.city} className="rounded-2xl border p-4">
            <div className="font-semibold">{t.city}</div>
            <div className="text-sm text-muted-foreground">{t.country}</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded bg-secondary" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 