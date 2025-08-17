"use client"

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface FullscreenGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
  cityName: string;
}

export function FullscreenGallery({ isOpen, onClose, images, initialIndex, cityName }: FullscreenGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [initialIndex]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentIndex((prev) => (prev + 1) % images.length);
          break;
        case "=":
        case "+":
          e.preventDefault();
          setScale((prev) => Math.min(prev + 0.25, 3));
          break;
        case "-":
          e.preventDefault();
          setScale((prev) => Math.max(prev - 0.25, 0.25));
          break;
        case "0":
          e.preventDefault();
          setScale(1);
          setRotation(0);
          setPosition({ x: 0, y: 0 });
          break;
        case "r":
          e.preventDefault();
          setRotation((prev) => (prev + 90) % 360);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0 && touchStart.x !== 0) {
      const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = touchEnd.y - touchStart.y;
      
      // Minimum swipe distance
      const minSwipeDistance = 50;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          prevImage();
        } else {
          nextImage();
        }
      }
      
      setTouchStart({ x: 0, y: 0 });
    }
  };

  const resetView = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold truncate">{cityName}</h2>
            <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      {/* Navigation Buttons - Hidden on mobile when zoomed */}
      {!isMobile || scale <= 1 ? (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </>
      ) : null}

      {/* Main Image */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-4 sm:p-16"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`${cityName} ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-300"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
          }}
          draggable={false}
        />
      </div>

      {/* Controls - Mobile optimized */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setScale((prev) => Math.max(prev - 0.25, 0.25))}
            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            disabled={scale <= 0.25}
          >
            <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={resetView}
            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.25, 3))}
            className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            disabled={scale >= 3}
          >
            <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
        
        {/* Zoom Level Indicator */}
        <div className="text-center mt-2">
          <span className="text-xs text-gray-300">
            {Math.round(scale * 100)}% {!isMobile && "• Use mouse wheel or +/- keys to zoom • Drag to pan • R to rotate"}
            {isMobile && "• Swipe to navigate • Pinch to zoom"}
          </span>
        </div>
      </div>

      {/* Thumbnail Strip - Mobile optimized */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 max-w-[90vw] sm:max-w-none">
        <div className="flex gap-1 sm:gap-2 p-2 bg-black/50 rounded-lg backdrop-blur-sm overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setScale(1);
                setRotation(0);
                setPosition({ x: 0, y: 0 });
              }}
              className={`w-12 h-9 sm:w-16 sm:h-12 rounded overflow-hidden transition-all duration-200 flex-shrink-0 ${
                index === currentIndex 
                  ? "ring-2 ring-white scale-110" 
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
