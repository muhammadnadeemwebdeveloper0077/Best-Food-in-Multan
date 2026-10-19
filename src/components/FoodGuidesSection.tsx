import React, { useState } from 'react';
import { FoodGuide, Restaurant } from '../types';
import { BookOpen, Clock, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface FoodGuidesSectionProps {
  guides: FoodGuide[];
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onFilterByCategory?: (category: string) => void;
  onFilterByArea?: (area: string) => void;
}

export const FoodGuidesSection: React.FC<FoodGuidesSectionProps> = ({
  guides,
  restaurants,
  onSelectRestaurant,
  onFilterByCategory,
  onFilterByArea
}) => {
  const [activeGuide, setActiveGuide] = useState<FoodGuide | null>(null);

  const handleOpenGuide = (guide: FoodGuide) => {
    setActiveGuide(guide);
  };

  return (
    <section className="py-14 bg-white border-b border-[#F0E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EA580C]">
              <BookOpen className="w-3.5 h-3.5" /> Multan Food Guides
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191919] tracking-tight mt-1">
              Curated Local Food Guides
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Handcrafted recommendations written specifically for Multan food lovers and visitors.
            </p>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map(guide => (
            <div
              key={guide.id}
              onClick={() => handleOpenGuide(guide)}
              className="bg-[#FFF9F2] rounded-3xl border border-[#EADBCC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={guide.heroImage}
                    alt={guide.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-stone-900 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs">
                    {guide.badge}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-orange-400" />
                      {guide.readTime}
                    </span>
                    <span className="text-orange-300">Read Guide →</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                    {guide.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-[#EA580C]">
                  <span>Explore Recommendations</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Detail Reader Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => setActiveGuide(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Guide Header Banner */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={activeGuide.heroImage}
                alt={activeGuide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-[#F97316] text-xs font-bold uppercase tracking-wider">
                  {activeGuide.badge}
                </span>
                <h2 className="text-2xl font-bold mt-2 leading-tight">
                  {activeGuide.title}
                </h2>
              </div>
            </div>

            {/* Guide Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-stone-700 text-sm leading-relaxed font-normal">
                {activeGuide.intro}
              </p>

              {/* Insider Tips Box */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                  <Sparkles className="w-4 h-4" /> Local Multani Insider Tips
                </div>
                <div className="space-y-2">
                  {activeGuide.insiderTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Spots in this Guide */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-3">
                  Featured Multan Spots in this Guide:
                </h4>
                <div className="space-y-2.5">
                  {activeGuide.recommendedRestaurantIds.map(restId => {
                    const r = restaurants.find(res => res.id === restId);
                    if (!r) return null;

                    return (
                      <div
                        key={r.id}
                        onClick={() => {
                          setActiveGuide(null);
                          onSelectRestaurant(r);
                        }}
                        className="p-3 rounded-2xl border border-stone-200 hover:border-orange-300 hover:bg-orange-50/40 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={r.coverImage}
                            alt={r.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <div className="font-bold text-sm text-stone-900">{r.name}</div>
                            <div className="text-xs text-stone-500">{r.neighborhood} • {r.category}</div>
                          </div>
                        </div>

                        <div className="text-xs font-bold text-[#EA580C] flex items-center gap-1">
                          <span>View Menu</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Filter Action Button */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                {activeGuide.categoryFilter && onFilterByCategory && (
                  <button
                    onClick={() => {
                      onFilterByCategory(activeGuide.categoryFilter!);
                      setActiveGuide(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#F97316] text-white font-bold text-xs shadow-xs hover:bg-[#EA580C] cursor-pointer"
                  >
                    Filter Directory for {activeGuide.categoryFilter}
                  </button>
                )}
                {activeGuide.neighborhoodFilter && onFilterByArea && (
                  <button
                    onClick={() => {
                      onFilterByArea(activeGuide.neighborhoodFilter!);
                      setActiveGuide(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#191919] text-white font-bold text-xs shadow-xs hover:bg-stone-800 cursor-pointer"
                  >
                    Explore all in {activeGuide.neighborhoodFilter}
                  </button>
                )}
                <button
                  onClick={() => setActiveGuide(null)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs ml-auto cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
