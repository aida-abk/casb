export default function ArtCraftsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold">Art & Crafts</h1>
        <p className="mt-3 text-muted-foreground max-w-prose">Traditional patterns and modern interpretations.</p>
      </div>
      
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Central Asian Art Exhibitions Around the World</h2>
        <p className="mt-2 text-muted-foreground">Discover Central Asian artifacts and artworks displayed in prestigious museums worldwide.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <img 
                src="/museum/British Museum Image 1225508001.jpg" 
                alt="Central Asian artifact at British Museum"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="font-medium">British Museum Collection</h3>
              <p className="text-sm text-muted-foreground">Ancient Central Asian artifacts showcasing the region's rich cultural heritage</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <img 
                src="/museum/British Museum Image 302020001.jpg" 
                alt="Central Asian artwork at British Museum"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="font-medium">Silk Road Treasures</h3>
              <p className="text-sm text-muted-foreground">Exquisite textiles and decorative arts from the historic trade routes</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <img 
                src="/museum/RRM 16046 British Museum.jpg" 
                alt="Central Asian pottery at British Museum"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="font-medium">Ceramic Traditions</h3>
              <p className="text-sm text-muted-foreground">Traditional pottery and ceramic works reflecting local craftsmanship</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <img 
                src="/museum/Image Background Removed.png" 
                alt="Central Asian decorative art"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="font-medium">Decorative Arts</h3>
              <p className="text-sm text-muted-foreground">Intricate patterns and ornamental designs from Central Asian cultures</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <img 
                src="/museum/Image Remove Background.png" 
                alt="Central Asian cultural artifacts"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="font-medium">Cultural Heritage</h3>
              <p className="text-sm text-muted-foreground">Preserved artifacts representing centuries of artistic tradition</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border">
              <img 
                src="/museum/tg_image_2282267523.jpeg" 
                alt="Central Asian exhibition display"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="font-medium">Modern Exhibitions</h3>
              <p className="text-sm text-muted-foreground">Contemporary displays bringing Central Asian art to global audiences</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Pattern Library</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => {
            const idx = i + 1;
            const className = `aspect-square rounded-lg border bg-repeat bg-[length:200px_200px] bg-pattern-${idx} transition-all duration-500 ease-in-out hover:scale-110 hover:rotate-3 hover:shadow-lg cursor-pointer`;
            return (
              <div key={idx} className="space-y-2 group">
                <div className={className} />
                <p className="text-xs text-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Pattern {idx}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground animate-pulse">
            Hover over patterns to explore their details
          </p>
        </div>
      </section>
      
      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Color Themes</h2>
        <p className="text-sm text-muted-foreground">Switch between country color schemes (coming soon).</p>
      </section>
    </div>
  );
} 