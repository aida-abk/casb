import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Events & Community</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">
          Stay connected with upcoming events and relive moments from recent gatherings.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-2xl border overflow-hidden">
          <div className="aspect-[4/3] grid place-items-center text-muted-foreground bg-secondary">
            Google Calendar Embed Placeholder
          </div>
        </div>
        <div className="rounded-2xl border p-4">
          <h2 className="font-semibold">RSVP</h2>
          <p className="text-sm text-muted-foreground">Register for our next event.</p>
          <form className="mt-4 grid gap-3">
            <input className="rounded-md border px-3 py-2" placeholder="Your name" />
            <input className="rounded-md border px-3 py-2" placeholder="Email" type="email" />
            <button className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-medium">Submit</button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">This is a placeholder. We’ll connect to a backend or Google Forms.</p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Photo Stories</h2>
          <Link href="#" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-xl border p-4">
              <div className="aspect-video rounded-lg bg-secondary" />
              <div className="mt-2 font-medium">Story {i}</div>
              <div className="text-sm text-muted-foreground">Short caption to set the scene.</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 