import React, { useState } from 'react';
import { Restaurant } from '../types';
import { MapPin, Navigation, Phone, Star, ExternalLink, ShieldCheck, X } from 'lucide-react';

interface InteractiveMapProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  selectedArea?: string;
}

// Bounding box for Multan urban core
const MULTAN_BOUNDS = {
  minLat: 30.1650,
  maxLat: 30.2450,
  minLng: 71.4400,
  maxLng: 71.5300
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  restaurants,
  onSelectRestaurant,
  selectedArea
}) => {
  const [activePin, setActivePin] = useState<Restaurant | null>(restaurants[0] || null);

  // Convert lat/lng to percentage X/Y inside map box
  const getCoordinatesPct = (lat: number, lng: number) => {
    const latSpan = MULTAN_BOUNDS.maxLat - MULTAN_BOUNDS.minLat;
    const lngSpan = MULTAN_BOUNDS.maxLng - MULTAN_BOUNDS.minLng;

    const x = Math.max(5, Math.min(95, ((lng - MULTAN_BOUNDS.minLng) / lngSpan) * 100));
    // Invert Y because latitude goes up north
    const y = Math.max(5, Math.min(95, (1 - (lat - MULTAN_BOUNDS.minLat) / latSpan) * 100));

    return { x, y };
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
      {/* Map Header */}
      <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">Multan Food Navigator Map</h3>
            <p className="text-xs text-stone-400">
              {restaurants.length} verified food spots plotted across Multan
            </p>
          </div>
        </div>

        <div className="text-xs bg-stone-800 text-stone-300 px-3 py-1.5 rounded-lg border border-stone-700">
          Showing: <strong className="text-white">{selectedArea || 'All Multan'}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left / Center Map Visual Canvas */}
        <div className="lg:col-span-8 relative bg-[#F7F3EE] p-4 sm:p-8 overflow-hidden flex items-center justify-center">
          {/* Simulated Urban Roads and Landmarks */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {/* Major Arteries: Bosan Road (North-South diagonal), Abdali Road, Northern Bypass */}
            <line x1="20%" y1="10%" x2="80%" y2="85%" stroke="#CBD5E1" strokeWidth="12" strokeLinecap="round" />
            <line x1="10%" y1="65%" x2="90%" y2="55%" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
            <line x1="15%" y1="25%" x2="85%" y2="20%" stroke="#E2E8F0" strokeWidth="6" />
            <circle cx="50%" cy="50%" r="90" fill="#E2E8F0" opacity="0.4" />
          </svg>

          {/* Area Watermark Labels */}
          <div className="absolute top-6 left-8 text-xs font-black tracking-widest text-stone-300 uppercase pointer-events-none">
            Bosan Road Corridor (Mall of Multan)
          </div>
          <div className="absolute top-1/3 right-12 text-xs font-black tracking-widest text-stone-300 uppercase pointer-events-none">
            Gulgasht Colony
          </div>
          <div className="absolute bottom-12 left-12 text-xs font-black tracking-widest text-stone-300 uppercase pointer-events-none">
            Cantt & Saddar
          </div>
          <div className="absolute bottom-8 right-16 text-xs font-black tracking-widest text-stone-300 uppercase pointer-events-none">
            Old City & Ghanta Ghar
          </div>

          {/* Map Pins Container */}
          <div className="relative w-full h-[440px] max-w-2xl border-2 border-dashed border-stone-300/80 rounded-2xl p-4 bg-white/40 backdrop-blur-xs">
            {restaurants.map(rest => {
              const { x, y } = getCoordinatesPct(rest.latitude, rest.longitude);
              const isSelected = activePin?.id === rest.id;

              return (
                <div
                  key={rest.id}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => setActivePin(rest)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-transform duration-200 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                >
                  <div
                    className={`px-2.5 py-1 rounded-xl shadow-lg font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap border ${
                      isSelected
                        ? 'bg-[#191919] text-white border-orange-500 ring-4 ring-orange-500/20'
                        : 'bg-white text-stone-900 border-stone-300 hover:border-[#F97316]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#F97316] animate-ping' : 'bg-[#EA580C]'
                      }`}
                    ></span>
                    <span className="truncate max-w-[120px]">{rest.name}</span>
                  </div>

                  {/* Pin pointer triangle */}
                  <div
                    className={`w-2 h-2 rotate-45 mx-auto -mt-1 ${
                      isSelected ? 'bg-[#191919]' : 'bg-white'
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Location Card Preview */}
        <div className="lg:col-span-4 p-5 bg-white border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col justify-between">
          {activePin ? (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-44 bg-stone-100">
                <img
                  src={activePin.coverImage}
                  alt={activePin.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3" /> Verified Multan
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-xs p-2 rounded-xl text-white text-xs">
                  <div className="font-semibold text-amber-300">{activePin.category}</div>
                  <div className="text-[11px] text-stone-300 truncate">{activePin.neighborhood}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-[#191919]">{activePin.name}</h4>
                  <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{activePin.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-xs text-stone-500 mt-1">{activePin.address}</p>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {activePin.description}
                </p>
              </div>

              {/* Hours snippet */}
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs text-stone-700">
                <div className="font-bold text-stone-900 mb-0.5">Today's Hours:</div>
                <div className="text-stone-600">
                  {activePin.openingHours?.Monday || '12:00 PM - 02:00 AM'}
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onSelectRestaurant(activePin)}
                  className="w-full py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  View Full Menu & Prices
                </button>

                <a
                  href={activePin.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-400 text-sm">
              Click any restaurant marker on the Multan map to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
