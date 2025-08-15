export default function LanguageCornerPage() {
  const phrases = [
    { phrase: "Рахмет", lang: "Kazakh", meaning: "Thank you" },
    { phrase: "Рахмат", lang: "Uzbek", meaning: "Thank you" },
    { phrase: "Рахмат", lang: "Tajik", meaning: "Thank you" },
    { phrase: "Рахмат", lang: "Kyrgyz", meaning: "Thank you" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Language Corner</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">Basic phrases and fun translations.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {phrases.map((p) => (
          <div key={p.lang} className="rounded-2xl border p-4">
            <div className="text-2xl font-semibold">{p.phrase}</div>
            <div className="text-sm text-muted-foreground">{p.lang}</div>
            <p className="mt-2 text-sm">{p.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 