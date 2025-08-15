"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, MapPin, Users, Flag } from "lucide-react"

// Country data with accurate information
const countryData = {
  Kazakhstan: {
    capital: "Nur-Sultan (Astana)",
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
}

export default function CentralAsiaMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [map, setMap] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [geoJsonLayer, setGeoJsonLayer] = useState<any>(null)

  useEffect(() => {
    const initMap = async () => {
      const L = (await import("leaflet")).default

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

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
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(leafletMap)

        try {
          // Use Natural Earth data from a reliable CDN
          const response = await fetch(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
          )
          const worldData = await response.json()

          // Filter for Central Asian countries
          const centralAsiaData = {
            type: "FeatureCollection",
            features: worldData.features.filter((feature: any) => {
              const name = feature.properties.NAME || feature.properties.name
              const admin = feature.properties.ADMIN || feature.properties.admin
              const nameEn = feature.properties.NAME_EN || feature.properties.name_en

              // Check multiple name fields to ensure we catch all variations
              const possibleNames = [name, admin, nameEn].filter(Boolean)
              return possibleNames.some((n) => Object.keys(countryData).includes(n))
            }),
          }

          const layer = L.geoJSON(centralAsiaData, {
            style: (feature) => {
              const countryName = getCountryNameFromFeature(feature)
              const country = countryName ? countryData[countryName as keyof typeof countryData] : null
              const isHovered = hoveredCountry === countryName
              const isSelected = selectedCountry === countryName

              return {
                fillColor: country?.color || "#94A3B8",
                weight: isSelected ? 3 : isHovered ? 2 : 1,
                opacity: 1,
                color: isSelected ? "#1F2937" : isHovered ? "#374151" : "#6B7280",
                dashArray: "",
                fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7,
              }
            },
            onEachFeature: (feature, layer) => {
              const countryName = getCountryNameFromFeature(feature)

              layer.on({
                mouseover: () => {
                  setHoveredCountry(countryName)
                },
                mouseout: () => {
                  setHoveredCountry(null)
                },
                click: () => {
                  setSelectedCountry(countryName)
                  leafletMap.fitBounds(layer.getBounds(), { padding: [20, 20] })
                },
              })

              if (countryName) {
                layer.bindTooltip(countryName, {
                  permanent: false,
                  direction: "center",
                  className: "country-tooltip",
                })
              }
            },
          }).addTo(leafletMap)

          setGeoJsonLayer(layer)
          setIsLoaded(true)
        } catch (error) {
          console.error("Error loading GeoJSON data:", error)
          setIsLoaded(true)
        }

        setMap(leafletMap)
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (geoJsonLayer) {
      geoJsonLayer.setStyle((feature: any) => {
        const countryName = getCountryNameFromFeature(feature)
        const country = countryName ? countryData[countryName as keyof typeof countryData] : null
        const isHovered = hoveredCountry === countryName
        const isSelected = selectedCountry === countryName

        return {
          fillColor: country?.color || "#94A3B8",
          weight: isSelected ? 3 : isHovered ? 2 : 1,
          opacity: 1,
          color: isSelected ? "#1F2937" : isHovered ? "#374151" : "#6B7280",
          dashArray: "",
          fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7,
        }
      })
    }
  }, [hoveredCountry, selectedCountry, geoJsonLayer])

  const getCountryNameFromFeature = (feature: any) => {
    const properties = feature.properties
    const possibleNames = [
      properties.NAME,
      properties.name,
      properties.ADMIN,
      properties.admin,
      properties.NAME_EN,
      properties.name_en,
    ]

    for (const name of possibleNames) {
      if (name && Object.keys(countryData).includes(name)) {
        return name
      }
    }

    // ISO code mapping as fallback
    const isoMapping: { [key: string]: string } = {
      KAZ: "Kazakhstan",
      KGZ: "Kyrgyzstan",
      UZB: "Uzbekistan",
      TJK: "Tajikistan",
      TKM: "Turkmenistan",
    }

    const iso = properties.iso_a3 || properties.ISO_A3
    return iso ? isoMapping[iso] : null
  }

  const selectedCountryData = selectedCountry ? countryData[selectedCountry as keyof typeof countryData] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Central Asia Explorer</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Discover the heart of Eurasia through interactive geography
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Flag className="h-5 w-5" />
                  Interactive Geographic Map
                </CardTitle>
                <CardDescription>
                  Accurate country boundaries from Natural Earth data - click any country to explore
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={mapRef} className="h-[500px] w-full relative" style={{ background: "#f8fafc" }} />
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Loading geographic data...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Country Info Panel */}
          <div className="space-y-6">
            {selectedCountryData ? (
              <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedCountryData.flag}</span>
                      <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-slate-100">{selectedCountry}</CardTitle>
                        <CardDescription>{selectedCountryData.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCountry(null)} className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Capital</p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{selectedCountryData.capital}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Population
                      </p>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {selectedCountryData.population}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Cultural Highlights</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountryData.highlights.map((highlight, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: `${selectedCountryData.color}20`,
                            color: selectedCountryData.color,
                            border: `1px solid ${selectedCountryData.color}40`,
                          }}
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-slate-100">Explore Central Asia</CardTitle>
                  <CardDescription>
                    Click on any country on the map to discover its unique culture, geography, and history.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(countryData).map(([country, data]) => (
                      <Button
                        key={country}
                        variant="ghost"
                        className="justify-start h-auto p-3 text-left"
                        onClick={() => setSelectedCountry(country)}
                      >
                        <span className="text-lg mr-3">{data.flag}</span>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{country}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{data.capital}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(countryData).map(([country, data]) => (
                  <div key={country} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-sm border border-slate-300 dark:border-slate-600"
                      style={{ backgroundColor: data.color }}
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{country}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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
  )
}
