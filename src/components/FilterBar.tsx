import React from 'react';
import { Neighborhood, FoodCategory, PriceRange } from '../types';
import { Search, MapPin, SlidersHorizontal, RotateCcw, Map, Grid, CheckCircle2 } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedArea: string;
  onAreaChange: (area: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedPrice: string;
  onPriceChange: (p: string) => void;
  openNowOnly: boolean;
  onOpenNowChange: (val: boolean) => void;
  verifiedOnly: boolean;
  onVerifiedChange: (val: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  neighborhoods: Neighborhood[];
  categories: FoodCategory[];
  totalResults: number;
  onResetFilters: () => void;
  viewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedArea,
  onAreaChange,
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  openNowOnly,
  onOpenNowChange,
  verifiedOnly,
  onVerifiedChange,
  sortBy,
  onSortChange,
  neighborhoods,
  categories,
  totalResults,
  onResetFilters,
  viewMode,
  onToggleViewMode
}) => {
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedArea !== 'All Areas' ||
    selectedCategory !== 'All' ||
    selectedPrice !== 'All' ||
    openNowOnly ||
    verifiedOnly;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Search & Primary Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Keyword Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search by restaurant name, dish, or Roman Urdu (e.g. karahi, tikka)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-[#F97316] focus:outline-hidden transition-all"
          />
        </div>

        {/* Neighborhood Area Selector */}
        <div className="md:col-span-4 relative">
          <MapPin className="w-4 h-4 text-[#F97316] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedArea}
            onChange={e => onAreaChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold text-stone-800 focus:bg-white focus:border-[#F97316] focus:outline-hidden cursor-pointer"
          >
            <option value="All Areas">All Multan Neighborhoods</option>
            {neighborhoods.map(nh => (
              <option key={nh.id} value={nh.name}>
                {nh.name} ({nh.popularSpotsCount} places)
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine Selector */}
        <div className="md:col-span-3">
          <select
            value={selectedCategory}
            onChange={e => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold text-stone-800 focus:bg-white focus:border-[#F97316] focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Cuisines</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sub-Filters & Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
        {/* Left: Price Tier, Open Now, Verified buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Price Range Toggles */}
          <div className="inline-flex rounded-xl bg-stone-100 p-0.5 border border-stone-200">
            {['All', '₨', '₨₨', '₨₨₨'].map(p => (
              <button
                key={p}
                onClick={() => onPriceChange(p)}
                className={`px-2.5 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  selectedPrice === p
                    ? 'bg-white text-[#EA580C] shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Open Now Toggle */}
          <button
            onClick={() => onOpenNowChange(!openNowOnly)}
            className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              openNowOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                openNowOnly ? 'bg-emerald-500' : 'bg-stone-300'
              }`}
            ></span>
            <span>Open Now</span>
          </button>

          {/* Verified Only Toggle */}
          <button
            onClick={() => onVerifiedChange(!verifiedOnly)}
            className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              verifiedOnly
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                verifiedOnly ? 'text-blue-600' : 'text-stone-400'
              }`}
            />
            <span>Verified Multan</span>
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-stone-500 hover:text-[#EA580C] font-semibold flex items-center gap-1 px-2 py-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Results Count, Sort By & View Mode */}
        <div className="flex items-center gap-3">
          <span className="text-stone-500 font-medium">
            <strong className="text-stone-900">{totalResults}</strong> restaurants found
          </span>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="rating">Highest Rated (★)</option>
            <option value="reviews">Most Reviewed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name (A to Z)</option>
          </select>

          {/* Grid vs Map Toggle */}
          <div className="inline-flex rounded-xl bg-stone-100 p-0.5 border border-stone-200">
            <button
              onClick={() => onToggleViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleViewMode('map')}
              title="Interactive Map View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-white text-[#EA580C] shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
