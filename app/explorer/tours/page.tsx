"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Camera, ArrowRight, Play, Pause, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { FullscreenGallery } from "../../../components/fullscreen-gallery";

export default function ToursPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState<{ [key: string]: boolean }>({});
  const [fullscreenGallery, setFullscreenGallery] = useState<{
    isOpen: boolean;
    cityName: string;
    images: string[];
    initialIndex: number;
  }>({
    isOpen: false,
    cityName: "",
    images: [],
    initialIndex: 0,
  });

  const tours = [
    {
      city: "Almaty",
      country: "Kazakhstan",
      description: "The cultural and financial capital of Kazakhstan, nestled at the foothills of the Trans-Ili Alatau mountains. Experience the perfect blend of Soviet-era architecture and modern urban development.",
      highlights: ["Medeu Ice Skating Rink", "Kok-Tobe Hill", "Central State Museum", "Green Bazaar", "Panfilov Park"],
      images: [
        "/cities/almaty/akmaral-khudaikulova-S4yT69sCTwo-unsplash.jpg",
        "/cities/almaty/alexander-serzhantov-ECRotWQ6T-M-unsplash.jpg",
        "/cities/almaty/andrew-krasilnikov-teFnNQtlJNM-unsplash.jpg",
        "/cities/almaty/arman-tpIDyt8ocF8-unsplash.jpg",
        "/cities/almaty/bekarys-khozhanazar-r16_5UAwLDY-unsplash.jpg",
        "/cities/almaty/chingiz-t-ZcinuhvzXXM-unsplash.jpg",
        "/cities/almaty/darya-jum-FWR8eBHyfA4-unsplash.jpg",
        "/cities/almaty/dmitriy-panchenko-FTCKM1QBVaM-unsplash.jpg",
        "/cities/almaty/ilyas-dautov-ljw3mBWuwTA-unsplash.jpg",
        "/cities/almaty/ilyas-dautov-MemMFhiLJOA-unsplash.jpg",
        "/cities/almaty/konstantin-dyadyun-txoO-N2-Aq8-unsplash.jpg",
        "/cities/almaty/michael-starkie-sM-OO4EjQAM-unsplash.jpg",
        "/cities/almaty/nurgissa-ussen-xYSZTuh2eLc-unsplash.jpg",
        "/cities/almaty/nursultan-abakirov-WVb4mjPOkWQ-unsplash.jpg"
      ]
    },
    {
      city: "Samarkand",
      country: "Uzbekistan",
      description: "One of the oldest continuously inhabited cities in Central Asia, known for its stunning Islamic architecture and the legendary Silk Road. Marvel at the intricate tilework and majestic domes.",
      highlights: ["Registan Square", "Bibi-Khanym Mosque", "Shah-i-Zinda", "Gur-e-Amir Mausoleum", "Ulugh Beg Observatory"],
      images: [
        "/cities/samarkand/ozodbek-erkinov-hvLu3ABC1n0-unsplash.jpg",
        "/cities/samarkand/hans-jurgen-weinhardt-JRpE5XBwlg0-unsplash.jpg",
        "/cities/samarkand/yumi-kim-4rJnEFhhEDE-unsplash.jpg",
        "/cities/samarkand/chi-lok-tsang-pk4unExZvOY-unsplash.jpg",
        "/cities/samarkand/artem-bryzgalov-cKBg2lao-k8-unsplash.jpg",
        "/cities/samarkand/nosirjon-saminjonov-V1zJPRsIdmE-unsplash.jpg"
      ]
    },
    {
      city: "Bishkek",
      country: "Kyrgyzstan",
      description: "The capital and largest city of Kyrgyzstan, surrounded by the beautiful Ala-Too mountain range. Discover a city that perfectly balances urban life with natural beauty.",
      highlights: ["Ala-Too Square", "Osh Bazaar", "State History Museum", "Victory Square", "Oak Park"],
      images: [
        "/cities/bishkek/irene-strong-ITB-8j8ozGc-unsplash.jpg",
        "/cities/bishkek/mike-dudin-oFXyWtZ2cDU-unsplash.jpg"
      ]
    },
    {
      city: "Astana",
      country: "Kazakhstan",
      description: "The modern capital of Kazakhstan, featuring futuristic architecture and impressive city planning. Experience the vision of a 21st-century Central Asian metropolis.",
      highlights: ["Bayterek Tower", "Khan Shatyr", "Nur-Astana Mosque", "Palace of Peace", "Astana Opera"],
      images: [
        "/cities/astana/tim-broadbent-zeuo_RU2954-unsplash.jpg",
        "/cities/astana/tim-broadbent-LixxrHI7H8o-unsplash.jpg",
        "/cities/astana/snowscat-bZai-fXBVIg-unsplash.jpg",
        "/cities/astana/ekrem-osmanoglu-IG0_Nl4T-JE-unsplash.jpg",
        "/cities/astana/bagzhan-sadvakassov-CxEaMcjrw28-unsplash.jpg",
        "/cities/astana/kate-ibragimova-EbjlcvEtWag-unsplash.jpg",
        "/cities/astana/maxim-potkin-wyxTcdibez0-unsplash.jpg",
        "/cities/astana/simon-sun-dZdnoZbUk2w-unsplash.jpg",
        "/cities/astana/frederick-wallace-xhPa4LEEUHA-unsplash.jpg",
        "/cities/astana/natalia-gusakova-UeV6-bYRNtw-unsplash.jpg",
        "/cities/astana/ruslan-fatihov-rRmD-uztRH4-unsplash.jpg",
        "/cities/astana/forzaalisherka-NXhgVLAne_U-unsplash.jpg"
      ]
    }
  ];

  const handleCityClick = (city: string) => {
    setSelectedCity(selectedCity === city ? null : city);
    if (selectedCity !== city) {
      setCurrentImageIndex(prev => ({ ...prev, [city]: 0 }));
      setIsAutoPlaying(prev => ({ ...prev, [city]: false }));
    }
  };

  const nextImage = (city: string) => {
    const tour = tours.find(t => t.city === city);
    if (tour) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [city]: (prev[city] || 0 + 1) % tour.images.length
      }));
    }
  };

  const prevImage = (city: string) => {
    const tour = tours.find(t => t.city === city);
    if (tour) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [city]: prev[city] === 0 ? tour.images.length - 1 : (prev[city] || 0) - 1
      }));
    }
  };

  const toggleAutoPlay = (city: string) => {
    setIsAutoPlaying(prev => ({ ...prev, [city]: !prev[city] }));
  };

  const openFullscreenGallery = (cityName: string, images: string[], initialIndex: number = 0) => {
    setFullscreenGallery({
      isOpen: true,
      cityName,
      images,
      initialIndex,
    });
  };

  const closeFullscreenGallery = () => {
    setFullscreenGallery(prev => ({ ...prev, isOpen: false }));
  };

  // Auto-play functionality
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};
    
    Object.entries(isAutoPlaying).forEach(([city, isPlaying]) => {
      if (isPlaying) {
        intervals[city] = setInterval(() => {
          nextImage(city);
        }, 3000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [isAutoPlaying]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          Central Asian Cities
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
          Embark on a visual journey through the architectural wonders and cultural treasures 
          of Central Asia. From ancient Silk Road cities to modern metropolises, 
          discover the unique character of each destination.
        </p>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {tours.map((tour) => (
          <div
            key={tour.city}
            className={`group relative rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-lg cursor-pointer ${
              selectedCity === tour.city 
                ? 'border-primary shadow-md' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => handleCityClick(tour.city)}
          >
            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={tour.images[currentImageIndex[tour.city] || 0]}
                alt={tour.city}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{
                  transform: `scale(${selectedCity === tour.city ? 1.02 : 1})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* City Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  <h2 className="text-xl sm:text-2xl font-bold">{tour.city}</h2>
                </div>
                <p className="text-base sm:text-lg opacity-90 mb-3 sm:mb-4">{tour.country}</p>
                
                {/* Image Navigation Controls */}
                {selectedCity === tour.city && (
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(tour.city); }}
                      className="p-1.5 sm:p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleAutoPlay(tour.city); }}
                      className="p-1.5 sm:p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                    >
                      {isAutoPlaying[tour.city] ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(tour.city); }}
                      className="p-1.5 sm:p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                    <span className="text-xs sm:text-sm bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      {((currentImageIndex[tour.city] || 0) + 1)} / {tour.images.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openFullscreenGallery(tour.city, tour.images, currentImageIndex[tour.city] || 0);
                }}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Expand/Collapse Indicator */}
              <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 transition-all duration-300 ${
                selectedCity === tour.city ? 'rotate-90' : 'rotate-0'
              }`}>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white bg-black/30 backdrop-blur-sm rounded-full p-1" />
              </div>
            </div>

            {/* Description */}
            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Expanded Content */}
            {selectedCity === tour.city && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                {/* Highlights */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 sm:h-6 bg-primary rounded-full" />
                    Architectural Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {tour.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-muted/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-muted transition-colors"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Gallery */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                    <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                    Photo Gallery
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                    {tour.images.map((image, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-lg overflow-hidden relative group cursor-pointer transition-all duration-300 ${
                          (currentImageIndex[tour.city] || 0) === index 
                            ? 'ring-2 ring-primary scale-105' 
                            : 'hover:scale-110'
                        }`}
                        onMouseEnter={() => setHoveredImage(`${tour.city}-${index}`)}
                        onMouseLeave={() => setHoveredImage(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(prev => ({ ...prev, [tour.city]: index }));
                        }}
                      >
                        <img
                          src={image}
                          alt={`${tour.city} ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {hoveredImage === `${tour.city}-${index}` && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
                            <Camera className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                          </div>
                        )}
                        {(currentImageIndex[tour.city] || 0) === index && (
                          <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                            Active
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 sm:mt-3 italic">
                    Click any image to view it in the main display above, or use the fullscreen button for immersive viewing
                  </p>
                </div>

                {/* Call to Action */}
                <div className="pt-3 sm:pt-4 border-t">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openFullscreenGallery(tour.city, tour.images, currentImageIndex[tour.city] || 0);
                    }}
                    className="w-full bg-primary text-primary-foreground py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
                  >
                    Experience {tour.city} in Full Screen
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-8 sm:py-12 bg-muted/30 rounded-xl sm:rounded-2xl border px-4">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">
          Ready to Experience Central Asia?
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
          Join our community to discover more about Central Asian culture, 
          participate in cultural events, and connect with fellow enthusiasts.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a 
            href="https://t.me/casb_brown" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center text-sm sm:text-base"
          >
            Join Our Telegram Chat
          </a>
          <Link 
            href="/events" 
            className="border border-primary text-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center text-sm sm:text-base"
          >
            View Cultural Events
          </Link>
        </div>
      </div>

      {/* Fullscreen Gallery */}
      <FullscreenGallery
        isOpen={fullscreenGallery.isOpen}
        onClose={closeFullscreenGallery}
        images={fullscreenGallery.images}
        initialIndex={fullscreenGallery.initialIndex}
        cityName={fullscreenGallery.cityName}
      />
    </div>
  );
} 