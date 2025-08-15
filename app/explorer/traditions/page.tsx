export default function TraditionsPage() {
  const today = new Date();
  const traditions = [
    { date: "Mar 21", name: "Nowruz", desc: "Spring festival across Central Asia." },
    { date: "Dec", name: "Qorqyt Day", desc: "Cultural heritage celebrations." },
  ];
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Traditions Calendar</h1>
      <p className="mt-3 text-muted-foreground max-w-prose">What’s being celebrated right now.</p>
      <div className="mt-8 rounded-2xl border p-4">
        <div className="text-sm text-muted-foreground">Today: {today.toDateString()}</div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {traditions.map((t) => (
            <div key={t.name} className="rounded-xl border p-4">
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.date}</div>
              <p className="mt-1 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 