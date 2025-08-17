"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";
import type { Feature, FeatureCollection, Geometry } from "geojson";

// Country data with accurate information
const countryData = {
  Kazakhstan: {
    capital: "Astana",
    population: "19.4 million",
    flag: "🇰🇿",
    highlights: ["Largest landlocked country", "Rich oil and gas reserves", "Baikonur Cosmodrome"],
    color: "#3B82F6", // Blue
    description: "The largest Central Asian nation, known for its vast steppes and modern capital.",
    iso_a3: "KAZ",
  },
  Kyrgyzstan: {
    capital: "Bishkek",
    population: "6.7 million",
    flag: "🇰🇬",
    highlights: ["Mountainous terrain", "Issyk-Kul Lake", "Nomadic heritage"],
    color: "#10B981", // Emerald
    description: "A mountainous country famous for its pristine lakes and nomadic culture.",
    iso_a3: "KGZ",
  },
  Uzbekistan: {
    capital: "Tashkent",
    population: "35.6 million",
    flag: "🇺🇿",
    highlights: ["Silk Road cities", "Samarkand architecture", "Cotton production"],
    color: "#F59E0B", // Amber
    description: "Home to ancient Silk Road cities with stunning Islamic architecture.",
    iso_a3: "UZB",
  },
  Tajikistan: {
    capital: "Dushanbe",
    population: "9.8 million",
    flag: "🇹🇯",
    highlights: ["Pamir Mountains", "Hydroelectric power", "Persian culture"],
    color: "#EF4444", // Red
    description: "A mountainous nation in the heart of Central Asia with rich Persian heritage.",
    iso_a3: "TJK",
  },
  Turkmenistan: {
    capital: "Ashgabat",
    population: "6.1 million",
    flag: "🇹🇲",
    highlights: ["Natural gas reserves", "Karakum Desert", "Darvaza gas crater"],
    color: "#8B5CF6", // Violet
    description: 'Known for its vast natural gas reserves and the famous "Door to Hell" crater.',
    iso_a3: "TKM",
  },
};

const sections = [
  { href: "/explorer/music", title: "Music Hub", emoji: "🎵", desc: "Curated playlists and Song of the Month." },
  { href: "/explorer/recipes", title: "Recipe Collection", emoji: "🍽️", desc: "Step-by-step cooking from the region." },
  { href: "/explorer/traditions", title: "Traditions Calendar", emoji: "🎭", desc: "What's being celebrated now." },
  { href: "/explorer/tours", title: "Virtual City Tours", emoji: "🏛️", desc: "Photo stories across CA cities." },
  { href: "/explorer/language", title: "Language Corner", emoji: "📚", desc: "Phrases and fun translations." },
  { href: "/explorer/art", title: "Art & Crafts", emoji: "🎨", desc: "Patterns and modern interpretations." },
];

export default function ExplorerPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [map, setMap] = useState<Leaflet.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [geoJsonLayer, setGeoJsonLayer] = useState<Leaflet.GeoJSON | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      if (mapRef.current && !map) {
        const leafletMap = L.map(mapRef.current, {
          center: [42.5, 64.5],
          zoom: 4,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          dragging: true,
          touchZoom: true,
          attributionControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(leafletMap);

        try {
          // Use Natural Earth data from a reliable CDN
          const response = await fetch(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
          );
          const worldData = await response.json();

          // Filter for Central Asian countries
          const centralAsiaData: FeatureCollection<Geometry, any> = {
            type: "FeatureCollection",
            features: (worldData.features as Feature[]).filter((feature: Feature) => {
              const props: any = feature.properties ?? {};
              const name = props.NAME || props.name;
              const admin = props.ADMIN || props.admin;
              const nameEn = props.NAME_EN || props.name_en;

              // Check multiple name fields to ensure we catch all variations
              const possibleNames = [name, admin, nameEn].filter(Boolean);
              return possibleNames.some((n) => Object.keys(countryData).includes(n));
            }),
          };

          const layer = L.geoJSON(centralAsiaData, {
            style: (feature?: Feature) => {
              if (!feature) return {} as Leaflet.PathOptions;
              const countryName = getCountryNameFromFeature(feature);
              const country = countryName ? countryData[countryName as keyof typeof countryData] : null;
              const isHovered = hoveredCountry === countryName;
              const isSelected = selectedCountry === countryName;

              return {
                fillColor: country?.color || "#94A3B8",
                weight: isSelected ? 3 : isHovered ? 2 : 1,
                opacity: 1,
                color: isSelected ? "#1F2937" : isHovered ? "#374151" : "#6B7280",
                dashArray: "",
                fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7,
              };
            },
            onEachFeature: (feature: Feature, featLayer: Leaflet.Layer) => {
              const countryName = getCountryNameFromFeature(feature);

              featLayer.on({
                mouseover: () => {
                  setHoveredCountry(countryName);
                },
                mouseout: () => {
                  setHoveredCountry(null);
                },
                click: () => {
                  setSelectedCountry(countryName);
                  const anyLayer = featLayer as unknown as { getBounds?: () => Leaflet.LatLngBounds; getLatLng?: () => Leaflet.LatLng };
                  if (anyLayer.getBounds) {
                    leafletMap.fitBounds(anyLayer.getBounds(), { padding: [20, 20] });
                  } else if (anyLayer.getLatLng) {
                    leafletMap.setView(anyLayer.getLatLng(), 6);
                  }
                },
              });

              if (countryName) {
                (featLayer as any).bindTooltip(countryName, {
                  permanent: false,
                  direction: "center",
                  className: "country-tooltip",
                });
              }
            },
          }).addTo(leafletMap);

          setGeoJsonLayer(layer);
          setIsLoaded(true);
        } catch (error) {
          console.error("Error loading GeoJSON data:", error);
          setIsLoaded(true);
        }

        setMap(leafletMap);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (geoJsonLayer) {
      geoJsonLayer.setStyle((feature?: Feature) => {
        if (!feature) return {} as Leaflet.PathOptions;
        const countryName = getCountryNameFromFeature(feature);
        const country = countryName ? countryData[countryName as keyof typeof countryData] : null;
        const isHovered = hoveredCountry === countryName;
        const isSelected = selectedCountry === countryName;

        return {
          fillColor: country?.color || "#94A3B8",
          weight: isSelected ? 3 : isHovered ? 2 : 1,
          opacity: 1,
          color: isSelected ? "#1F2937" : isHovered ? "#374151" : "#6B7280",
          dashArray: "",
          fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7,
        };
      });
    }
  }, [hoveredCountry, selectedCountry, geoJsonLayer]);

  const getCountryNameFromFeature = (feature: Feature) => {
    const properties: any = feature.properties as any;
    const possibleNames = [
      properties.NAME,
      properties.name,
      properties.ADMIN,
      properties.admin,
      properties.NAME_EN,
      properties.name_en,
    ];

    for (const name of possibleNames) {
      if (name && Object.keys(countryData).includes(name)) {
        return name;
      }
    }

    // ISO code mapping as fallback
    const isoMapping: { [key: string]: string } = {
      KAZ: "Kazakhstan",
      KGZ: "Kyrgyzstan",
      UZB: "Uzbekistan",
      TJK: "Tajikistan",
      TKM: "Turkmenistan",
    };

    const iso = properties.iso_a3 || properties.ISO_A3;
    return iso ? isoMapping[iso] : null;
  };

  const selectedCountryData = selectedCountry ? countryData[selectedCountry as keyof typeof countryData] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Central Asian Explorer</h1>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-prose">
        Click countries on the map to explore or dive into cultural areas.
      </p>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Interactive Map Section */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Interactive Map */}
          <div className="rounded-xl sm:rounded-2xl border overflow-hidden bg-card">
            <div className="p-3 sm:p-4 border-b">
              <h2 className="text-lg sm:text-xl font-semibold">Interactive Geographic Map</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Click any country to explore its details</p>
            </div>
            <div className="relative">
              <div ref={mapRef} className="h-[300px] sm:h-[400px] lg:h-[500px] w-full" style={{ background: "#f8fafc" }} />
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Loading geographic data...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Country Information Panel */}
          {selectedCountryData && (
            <div className="rounded-xl sm:rounded-2xl border p-4 sm:p-6 bg-card">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="text-2xl sm:text-3xl">{selectedCountryData.flag}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold truncate">{selectedCountry}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{selectedCountryData.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCountry(null)}
                  className="rounded-full p-1.5 sm:p-2 hover:bg-accent transition-colors flex-shrink-0 ml-2"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-secondary rounded-lg">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">Capital</div>
                  <div className="font-semibold text-sm sm:text-base">{selectedCountryData.capital}</div>
                </div>
                <div className="p-2 sm:p-3 bg-secondary rounded-lg">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">Population</div>
                  <div className="font-semibold text-sm sm:text-base">{selectedCountryData.population}</div>
                </div>
              </div>
              
              <div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Cultural Highlights</div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedCountryData.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs border"
                      style={{
                        backgroundColor: `${selectedCountryData.color}20`,
                        color: selectedCountryData.color,
                        borderColor: `${selectedCountryData.color}40`,
                      }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">5</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </div>
            <div className="rounded-xl border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">75M+</div>
              <div className="text-xs text-muted-foreground">Total Population</div>
            </div>
            <div className="rounded-xl border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">4M</div>
              <div className="text-xs text-muted-foreground">km² Area</div>
            </div>
            <div className="rounded-xl border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">100+</div>
              <div className="text-xs text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>

        {/* Cultural Sections Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Explore Culture</h2>
          <div className="space-y-2 sm:space-y-3">
            {sections.map((section) => (
              <Link 
                key={section.href} 
                href={section.href} 
                className="group block rounded-xl border p-3 sm:p-4 hover:bg-accent transition-colors duration-200"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-200">
                    {section.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm leading-tight">
                      {section.title}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {section.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />

      <style jsx>{`
        .country-tooltip {
          background: rgba(15, 23, 42, 0.9) !important;
          border: none !important;
          border-radius: 6px !important;
          color: white !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }
        
        .country-tooltip::before {
          border-top-color: rgba(15, 23, 42, 0.9) !important;
        }
        
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }
        
        .leaflet-control-zoom a {
          background: white !important;
          border: 1px solid #e2e8f0 !important;
          color: #475569 !important;
          font-weight: bold !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: #f8fafc !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>
    </div>
  );
} 