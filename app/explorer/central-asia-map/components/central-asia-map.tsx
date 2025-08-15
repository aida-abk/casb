"use client"

import { useEffect, useRef, useState } from "react"

interface CentralAsiaMapProps {
  onCountrySelect: (country: string | null) => void
  selectedCountry: string | null
  hoveredCountry: string | null
  onCountryHover: (country: string | null) => void
}

const countryColors = {
  Kazakhstan: "#3B82F6",
  Kyrgyzstan: "#10B981",
  Uzbekistan: "#F59E0B",
  Tajikistan: "#EF4444",
  Turkmenistan: "#8B5CF6",
}

export default function CentralAsiaMap({
  onCountrySelect,
  selectedCountry,
  hoveredCountry,
  onCountryHover,
}: CentralAsiaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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

        // Add tile layer
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution: "© OpenStreetMap contributors © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(leafletMap)

        try {
          const response = await fetch("/central-asia.geojson")
          const geoJsonData = await response.json()

          const geoJsonLayer = L.geoJSON(geoJsonData, {
            style: (feature) => {
              const countryName = feature?.properties?.name
              const color = countryName ? countryColors[countryName as keyof typeof countryColors] : "#94A3B8"
              const isHovered = hoveredCountry === countryName
              const isSelected = selectedCountry === countryName

              return {
                fillColor: color,
                weight: isSelected ? 3 : isHovered ? 2 : 1,
                opacity: 1,
                color: isSelected ? "#1F2937" : isHovered ? "#374151" : "#6B7280",
                dashArray: "",
                fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7,
              }
            },
            onEachFeature: (feature, layer) => {
              const countryName = feature.properties?.name

              layer.on({
                mouseover: () => {
                  onCountryHover(countryName)
                  layer.setStyle({
                    weight: 2,
                    color: "#374151",
                    fillOpacity: 0.8,
                  })
                },
                mouseout: () => {
                  onCountryHover(null)
                  geoJsonLayer.resetStyle(layer)
                },
                click: () => {
                  onCountrySelect(countryName)
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

          setMap(leafletMap)
          setIsLoaded(true)
        } catch (error) {
          console.error("Failed to load GeoJSON data:", error)
          setIsLoaded(true)
        }
      }
    }

    initMap()
  }, [hoveredCountry, selectedCountry, map, onCountrySelect, onCountryHover])

  return (
    <>
      <div ref={mapRef} className="h-[500px] w-full relative" style={{ background: "#f8fafc" }} />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading accurate geographical data...</p>
          </div>
        </div>
      )}
    </>
  )
}
