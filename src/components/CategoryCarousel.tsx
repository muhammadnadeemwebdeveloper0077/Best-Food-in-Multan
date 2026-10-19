import React from 'react';
import { FoodCategory } from '../types';
import {
  Flame,
  FlameKindling,
  UtensilsCrossed,
  Pizza,
  Sandwich,
  Drumstick,
  CookingPot,
  Sun,
  Soup,
  Sparkles,
  BadgePercent,
  Coffee,
  IceCream,
  CircleDot
} from 'lucide-react';

interface CategoryCarouselProps {
  categories: FoodCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

const CATEGORY_ICONS: { [key: string]: React.ElementType } = {
  'karahi-handi': Flame,
  'bbq-tikka': FlameKindling,
  'biryani-pulao': UtensilsCrossed,
  pizza: Pizza,
  burgers: Sandwich,
  'fried-chicken': Drumstick,
  'shawarma-rolls': CookingPot,
  'desi-breakfast': Sun,
  'daal-roti': Soup,
  'chinese-food': UtensilsCrossed,
  'fast-food-deals': BadgePercent,
  'cafes-desserts': Coffee,
  'ice-cream-shakes': IceCream,
  'street-food': Sparkles
};

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="py-10 bg-white border-b border-[#F0E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#F97316]">
              Browse Multan Flavors
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191919] tracking-tight mt-1">
              Popular Food Categories
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Select a cuisine to discover top-rated spots across Gulgasht, Bosan Road, Cantt & Old City.
            </p>
          </div>

          {selectedCategory !== 'All' && (
            <button
              onClick={() => onSelectCategory('All')}
              className="text-xs font-bold text-stone-500 hover:text-[#F97316] underline self-start md:self-auto cursor-pointer"
            >
              Reset Category Filter (Show All)
            </button>
          )}
        </div>

        {/* Categories Grid / Horizontal Scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {/* 'All' Category button */}
          <button
            onClick={() => onSelectCategory('All')}
            className={`group p-3 rounded-2xl border text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#191919] text-white border-[#191919] shadow-md shadow-stone-900/10'
                : 'bg-[#FFF9F2] text-stone-800 border-[#E8D9CB] hover:border-[#F97316] hover:bg-white'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 ${
                selectedCategory === 'All'
                  ? 'bg-[#F97316] text-white'
                  : 'bg-white text-stone-700 shadow-2xs border border-stone-200'
              }`}
            >
              <CircleDot className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold tracking-tight">All Cuisines</span>
            <span className={`text-[10px] mt-0.5 ${selectedCategory === 'All' ? 'text-stone-300' : 'text-stone-400'}`}>
              Full Directory
            </span>
          </button>

          {categories.map(cat => {
            const IconComponent = CATEGORY_ICONS[cat.id] || UtensilsCrossed;
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group p-3 rounded-2xl border text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#F97316] text-white border-[#F97316] shadow-md shadow-orange-500/20'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-[#F97316] hover:bg-orange-50/50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-white text-[#EA580C]'
                      : 'bg-orange-50 text-[#EA580C] border border-orange-100'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold tracking-tight line-clamp-1">
                  {cat.name}
                </span>
                <span
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-orange-100' : 'text-stone-400'
                  }`}
                >
                  {cat.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
