import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import {
  MapPin,
  Search,
  ShoppingBag,
  Heart,
  PlusCircle,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  selectedArea: string;
  onSelectArea: (area: string) => void;
  onOpenSearch: () => void;
  onOpenAddRestaurant: () => void;
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
  onViewFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedArea,
  onSelectArea,
  onOpenSearch,
  onOpenAddRestaurant,
  onOpenAdmin,
  onNavigateSection,
  onViewFavorites
}) => {
  const { neighborhoods } = useData();
  const { cartItemCount, cartSubtotal, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);

  const handleAreaPick = (areaName: string) => {
    onSelectArea(areaName);
    setAreaDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F2]/95 backdrop-blur-md border-b border-[#EADCCF] transition-all">
      {/* Top Banner Notice: Multan Local Notice */}
      <div className="bg-[#191919] text-white text-[12px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-stone-200">
              Multan Food Directory: Verified menus, PKR prices & direct restaurant contacts.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-400 text-[11px]">
            <span>Covering Gulgasht, Bosan Rd, Cantt, Old City & more</span>
            <button
              onClick={onOpenAddRestaurant}
              className="text-[#F97316] hover:text-orange-400 font-semibold flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Submit Restaurant
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => onNavigateSection('hero')}>
            <BrandLogo size="md" />
          </div>

          {/* Area Selector Dropdown (Desktop) */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E5D5C5] hover:border-[#F97316] text-stone-800 text-sm font-medium shadow-xs transition-all"
            >
              <MapPin className="w-4 h-4 text-[#F97316]" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-stone-400 block -mb-0.5">Location</span>
                <span className="font-semibold text-stone-800 line-clamp-1 max-w-[130px]">
                  {selectedArea === 'All Areas' ? 'All Multan' : selectedArea}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>

            {areaDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-80 overflow-y-auto">
                <div className="px-3 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                  Select Multan Area
                </div>
                <button
                  onClick={() => handleAreaPick('All Areas')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    selectedArea === 'All Areas'
                      ? 'bg-[#F97316] text-white'
                      : 'text-stone-700 hover:bg-orange-50'
                  }`}
                >
                  <span>All Multan Areas</span>
                  <span className="text-xs opacity-75">All Places</span>
                </button>
                {neighborhoods.map(nh => (
                  <button
                    key={nh.id}
                    onClick={() => handleAreaPick(nh.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      selectedArea === nh.name
                        ? 'bg-[#F97316] text-white'
                        : 'text-stone-700 hover:bg-orange-50'
                    }`}
                  >
                    <span className="truncate">{nh.name}</span>
                    <span className="text-xs text-stone-400">{nh.popularSpotsCount}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[#E5D5C5] text-stone-500 hover:border-[#F97316] w-64 text-sm shadow-xs transition-all"
          >
            <Search className="w-4 h-4 text-[#F97316]" />
            <span className="text-stone-400 truncate">Search burgers, karahi, pizza...</span>
            <kbd className="text-[10px] bg-stone-100 border border-stone-300 text-stone-500 px-1.5 py-0.5 rounded font-mono">
              /
            </kbd>
          </button>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <button
              onClick={() => onNavigateSection('restaurants')}
              className="hover:text-[#F97316] transition-colors"
            >
              Restaurants
            </button>
            <button
              onClick={() => onNavigateSection('categories')}
              className="hover:text-[#F97316] transition-colors"
            >
              Cuisines
            </button>
            <button
              onClick={() => onNavigateSection('popular-dishes')}
              className="hover:text-[#F97316] transition-colors"
            >
              Popular Dishes
            </button>
            <button
              onClick={() => onNavigateSection('deals')}
              className="hover:text-[#F97316] text-[#EA580C] flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Deals
            </button>
            <button
              onClick={() => onNavigateSection('guides')}
              className="hover:text-[#F97316] transition-colors"
            >
              City Guides
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search icon on mobile */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Multan Food"
              className="lg:hidden p-2.5 rounded-xl bg-white border border-[#E5D5C5] text-stone-700 hover:text-[#F97316]"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites Button */}
            <button
              onClick={onViewFavorites}
              aria-label="View Favorites"
              className="p-2.5 rounded-xl bg-white border border-[#E5D5C5] text-stone-700 hover:text-red-500 relative transition-colors shadow-xs"
              title="Saved Restaurants"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-[#F97316] text-white hover:bg-[#EA580C] shadow-md shadow-orange-500/20 font-semibold text-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 ? (
                <span className="bg-white text-[#EA580C] text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              ) : null}
              {cartSubtotal > 0 && (
                <span className="hidden md:inline border-l border-orange-400 pl-2 text-xs font-medium">
                  ₨ {cartSubtotal.toLocaleString()}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              aria-label="Admin Portal"
              title="Admin Portal (Password: multan2026)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2.5 rounded-xl bg-white border border-[#E5D5C5] text-stone-700 hover:text-[#F97316]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E5D5C5] px-4 pt-4 pb-6 space-y-4 shadow-xl">
          {/* Mobile Area Picker */}
          <div>
            <label className="text-xs font-bold uppercase text-stone-400 tracking-wider block mb-1">
              Multan Neighborhood
            </label>
            <select
              value={selectedArea}
              onChange={e => handleAreaPick(e.target.value)}
              className="w-full bg-[#FFF9F2] border border-[#E5D5C5] rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-800"
            >
              <option value="All Areas">All Multan Areas</option>
              {neighborhoods.map(nh => (
                <option key={nh.id} value={nh.name}>
                  {nh.name} ({nh.popularSpotsCount} spots)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-sm font-semibold">
            <button
              onClick={() => {
                onNavigateSection('restaurants');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-orange-50 text-stone-800 hover:bg-orange-100"
            >
              🍽️ All Restaurants
            </button>
            <button
              onClick={() => {
                onNavigateSection('categories');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-orange-50 text-stone-800 hover:bg-orange-100"
            >
              🍕 Food Cuisines
            </button>
            <button
              onClick={() => {
                onNavigateSection('deals');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-orange-50 text-stone-800 hover:bg-orange-100"
            >
              🔥 Multan Deals
            </button>
            <button
              onClick={() => {
                onNavigateSection('popular-dishes');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-orange-50 text-stone-800 hover:bg-orange-100"
            >
              🥘 Signature Dishes
            </button>
            <button
              onClick={() => {
                onNavigateSection('neighborhoods');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-orange-50 text-stone-800 hover:bg-orange-100"
            >
              📍 Explore Areas
            </button>
            <button
              onClick={() => {
                onNavigateSection('guides');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-orange-50 text-stone-800 hover:bg-orange-100"
            >
              📖 Local Food Guides
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAddRestaurant();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#191919] text-white font-medium text-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#F97316]" />
              Submit Your Multan Restaurant
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-medium text-xs hover:bg-stone-200"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
