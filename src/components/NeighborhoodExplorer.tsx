import React from 'react';
import { Neighborhood } from '../types';
import { MapPin, ArrowRight, Utensils } from 'lucide-react';

interface NeighborhoodExplorerProps {
  neighborhoods: Neighborhood[];
  selectedArea: string;
  onSelectArea: (areaName: string) => void;
}

export const NeighborhoodExplorer: React.FC<NeighborhoodExplorerProps> = ({
  neighborhoods,
  selectedArea,
  onSelectArea
}) => {
  return (
    <section className="py-14 bg-[#FFF9F2] border-b border-[#F0E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#F97316]">
              Explore Multan By Area
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191919] tracking-tight mt-1">
              Food Hubs Across Multan
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              From the vibrant Goal Bagh cafes in Gulgasht to the centuries-old walled city around Ghanta Ghar.
            </p>
          </div>

          {selectedArea !== 'All Areas' && (
            <button
              onClick={() => onSelectArea('All Areas')}
              className="text-xs font-bold text-[#EA580C] hover:underline self-start sm:self-auto cursor-pointer"
            >
              Reset to All Multan ({neighborhoods.length} areas)
            </button>
          )}
        </div>

        {/* Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoods.map(nh => {
            const isSelected = selectedArea.toLowerCase() === nh.name.toLowerCase();

            return (
              <div
                key={nh.id}
                onClick={() => onSelectArea(nh.name)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#191919] text-white border-[#191919] shadow-xl'
                    : 'bg-white text-stone-900 border-stone-200/90 hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        isSelected
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : 'bg-orange-50 text-[#EA580C] border border-orange-100'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      {nh.popularSpotsCount}+ Verified Spots
                    </span>

                    {nh.isPopularFoodHub && (
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/10 text-white'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        Major Hub
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-base font-bold transition-colors ${
                      isSelected
                        ? 'text-white'
                        : 'text-stone-900 group-hover:text-[#F97316]'
                    }`}
                  >
                    {nh.name}
                  </h3>

                  <div
                    className={`text-[11px] font-medium mt-0.5 ${
                      isSelected ? 'text-stone-300' : 'text-stone-400'
                    }`}
                  >
                    Landmark: {nh.landmark}
                  </div>

                  <p
                    className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                      isSelected ? 'text-stone-300' : 'text-stone-600'
                    }`}
                  >
                    {nh.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100/30 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={
                      isSelected
                        ? 'text-orange-400'
                        : 'text-[#EA580C] group-hover:underline'
                    }
                  >
                    Explore Food Points
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                      isSelected ? 'text-orange-400' : 'text-stone-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
