import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Clock,
  Navigation,
  ImagePlus,
  Camera,
  X,
  CheckCircle2,
  Upload
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface HeroProps {
  onSearch: (query: string, area: string) => void;
  selectedArea: string;
  onSelectArea: (area: string) => void;
  onExploreDesi: () => void;
  onExploreAll: () => void;
}

export interface HeroFoodPic {
  id: string;
  name: string;
  urduName?: string;
  restaurant: string;
  area: string;
  price: string;
  tag: string;
  image: string;
}

const INITIAL_HERO_FOOD_PICS: HeroFoodPic[] = [
  {
    id: 'karahi',
    name: 'Special Desi Ghee Mutton Karahi',
    urduName: 'دیسی گھی مٹن کڑاہی',
    restaurant: 'Al-Quresh Hotel',
    area: 'Dera Adda, Multan',
    price: '₨ 3,200/KG',
    tag: 'Multan Heritage Classic',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'pizza',
    name: 'Al Kaif Royal Crown Crust Pizza',
    urduName: 'کراؤن کرسٹ پیزا',
    restaurant: 'Al Kaif Pizza & Burger',
    area: 'Gulgasht Colony',
    price: '₨ 1,850',
    tag: 'Crown Crust & Mozzarella',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'bbq',
    name: 'Famous Multani Beef Bihari Boti',
    urduName: 'بیف بہاری کباب',
    restaurant: 'Siddiqui Tikka Shop',
    area: 'Cantt / Nawan Shehr',
    price: '₨ 680',
    tag: 'Charcoal Smoked Perfection',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'burger',
    name: 'The Big Beast Double Smashed Burger',
    urduName: 'دی بگ بیسٹ سمیش برگر',
    restaurant: 'Beast — Mall of Multan',
    area: 'Bosan Road',
    price: '₨ 990',
    tag: 'Gourmet Smashed Chuck',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'biryani',
    name: 'Special Double Chicken Dum Biryani',
    urduName: 'اسپیشل دم بریانی',
    restaurant: 'Naveed Chicken Biryani',
    area: 'Cantt Saddar',
    price: '₨ 480',
    tag: 'Saffron Basmati Degh',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'falooda',
    name: 'Royal Multani Rabri Falooda',
    urduName: 'شاہی ربڑی فالودہ',
    restaurant: 'Chaman Ice Cream & Falooda',
    area: 'Cantt Saddar Bazaar',
    price: '₨ 380',
    tag: 'Chilled Rabri & Pistachio',
    image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=1200&q=80'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  selectedArea,
  onSelectArea,
  onExploreDesi,
  onExploreAll
}) => {
  const { neighborhoods } = useData();
  const [searchInput, setSearchInput] = useState('');
  const [foodPics, setFoodPics] = useState<HeroFoodPic[]>(() => {
    try {
      const saved = localStorage.getItem('bfm_imported_food_pics');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_HERO_FOOD_PICS;
  });

  const [activeDishId, setActiveDishId] = useState<string>(foodPics[0]?.id || 'karahi');

  // Import Food Pic Modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [newPicUrl, setNewPicUrl] = useState('');
  const [newPicName, setNewPicName] = useState('');
  const [newPicRestaurant, setNewPicRestaurant] = useState('');
  const [newPicArea, setNewPicArea] = useState('Gulgasht Colony');
  const [newPicPrice, setNewPicPrice] = useState('₨ 850');
  const [importSuccessMessage, setImportSuccessMessage] = useState(false);

  const activeDish = foodPics.find(d => d.id === activeDishId) || foodPics[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput, selectedArea);
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchInput(tag);
    onSearch(tag, selectedArea);
  };

  const handleSelectFoodPic = (dish: HeroFoodPic) => {
    setActiveDishId(dish.id);
    setSearchInput(dish.name);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewPicUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPicUrl || !newPicName) {
      alert('Please provide a food image (URL or upload) and dish name.');
      return;
    }

    const newDish: HeroFoodPic = {
      id: `imported-${Date.now()}`,
      name: newPicName,
      restaurant: newPicRestaurant || 'Multan Local Food Point',
      area: newPicArea,
      price: newPicPrice.startsWith('₨') ? newPicPrice : `₨ ${newPicPrice}`,
      tag: 'Imported Food Photo',
      image: newPicUrl
    };

    const updatedPics = [newDish, ...foodPics];
    setFoodPics(updatedPics);
    setActiveDishId(newDish.id);
    try {
      localStorage.setItem('bfm_imported_food_pics', JSON.stringify(updatedPics));
    } catch {
      // ignore
    }

    setImportSuccessMessage(true);
    setTimeout(() => {
      setImportSuccessMessage(false);
      setIsImportModalOpen(false);
      setNewPicUrl('');
      setNewPicName('');
      setNewPicRestaurant('');
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F2] via-[#FFF3E4] to-[#FFF9F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#F0E3D5]">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Food Pics Showcase, Search & Actions with Fast Food Background */}
          <div className="lg:col-span-7 relative p-5 sm:p-8 rounded-3xl overflow-hidden bg-white/75 backdrop-blur-md border border-orange-200/90 shadow-xl shadow-stone-900/5 text-center lg:text-left">
            {/* Fast Food Picture in Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
              <img
                src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1200&q=80"
                alt="Delicious Fast Food Burger and Fries"
                className="w-full h-full object-cover object-center opacity-20 filter saturate-150 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F2]/95 via-[#FFF9F2]/90 to-[#FFEEDB]/85"></div>
            </div>

            <div className="relative z-10 space-y-6">
              {/* City Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#EA580C] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
                Multan, Punjab • Verified Food Directory
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#191919] tracking-tight leading-[1.12]">
                Discover the <br className="hidden sm:inline" />
                <span className="relative inline-block text-[#F97316]">
                  Best Food
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-3 text-[#F97316]/30 fill-current"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,0 Q50,12 100,0 Q50,6 0,0 Z" />
                  </svg>
                </span>{' '}
                in Multan
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-normal leading-relaxed">
                Find your favorite burgers, pizza, BBQ, karahi, biryani, and local food spots near you.
                Explore verified Multan menus, current PKR prices, Google Maps directions, and direct phone/WhatsApp contacts.
              </p>

              {/* Imported Food Pictures Showcase Bar */}
              <div className="p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-orange-200/90 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Multan Food Photo Showcase</span>
                    <span className="text-stone-400 font-normal">({foodPics.length} pics)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(true)}
                    className="font-bold text-[#EA580C] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <ImagePlus className="w-3.5 h-3.5" />
                    <span>Import Picture</span>
                  </button>
                </div>

                {/* Scrollable Food Photo Avatars / Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
                  {foodPics.map(dish => {
                    const isActive = dish.id === activeDishId;
                    return (
                      <button
                        key={dish.id}
                        type="button"
                        onClick={() => handleSelectFoodPic(dish)}
                        className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-left transition-all duration-150 flex-shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#191919] text-white border-[#191919] shadow-sm ring-2 ring-orange-500/30'
                            : 'bg-[#FFF9F2] text-stone-800 border-stone-200 hover:border-orange-300 hover:bg-white'
                        }`}
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-white/40"
                        />
                        <div className="leading-tight pr-1">
                          <div className="text-[11px] font-bold truncate max-w-[110px]">
                            {dish.name}
                          </div>
                          <div
                            className={`text-[10px] font-semibold ${
                              isActive ? 'text-amber-300' : 'text-[#EA580C]'
                            }`}
                          >
                            {dish.price}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Search & Area Filter Bar */}
              <form
                onSubmit={handleFormSubmit}
                className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl shadow-stone-900/5 border border-stone-200/80 max-w-2xl mx-auto lg:mx-0"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Area Dropdown */}
                  <div className="relative sm:w-1/3 border-b sm:border-b-0 sm:border-r border-stone-200 pb-2 sm:pb-0 sm:pr-2">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                      <select
                        value={selectedArea}
                        onChange={e => onSelectArea(e.target.value)}
                        className="w-full bg-transparent text-sm font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
                      >
                        <option value="All Areas">All Multan Areas</option>
                        {neighborhoods.map(nh => (
                          <option key={nh.id} value={nh.name}>
                            {nh.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dish/Restaurant Search Input */}
                  <div className="flex-1 flex items-center px-2 py-1.5">
                    <Search className="w-4 h-4 text-stone-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)}
                      placeholder="Search mutton karahi, zinger, crown pizza, bihari..."
                      className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                  >
                    <span>Search Food</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Quick Search Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
                <span className="font-semibold text-stone-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" /> Popular in Multan:
                </span>
                {[
                  'Mutton Karahi',
                  'Crown Crust Pizza',
                  'Smash Burgers',
                  'Beef Bihari Boti',
                  'Chicken Broast',
                  'Rabri Falooda',
                  'Student Deals'
                ].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-stone-700 hover:text-[#F97316] border border-stone-200 hover:border-orange-300 font-medium transition-all shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={onExploreAll}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#191919] hover:bg-stone-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Explore All Restaurants</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </button>
                <button
                  onClick={onExploreDesi}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-orange-50 text-stone-800 font-bold text-sm border border-stone-300 hover:border-orange-300 transition-all shadow-2xs flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-[#F97316]" />
                  <span>Explore Desi Food & Karahi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#EA580C] font-bold text-sm border border-orange-200 transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#F97316]" />
                  <span>Import Food Pic</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-left">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-stone-800">100% Verified</div>
                    <div className="text-[11px] text-stone-500">Real menus & prices in PKR</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <Navigation className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-stone-800">Exact Maps</div>
                    <div className="text-[11px] text-stone-500">Pinpoint directions in Multan</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-stone-800">Direct Contact</div>
                    <div className="text-[11px] text-stone-500">Phone & WhatsApp orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase Connected to Active Food Pic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white transition-all duration-300">
                <div className="relative h-72 sm:h-88">
                  <img
                    src={activeDish.image}
                    alt={activeDish.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Overlaid details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-1 rounded-md bg-[#F97316] text-[11px] font-bold tracking-wide uppercase">
                      {activeDish.tag}
                    </span>
                    <h3 className="text-xl font-bold mt-1.5 leading-tight">
                      {activeDish.name}
                    </h3>
                    {activeDish.urduName && (
                      <div className="text-xs text-amber-200 font-serif-accent mt-0.5">
                        {activeDish.urduName}
                      </div>
                    )}
                    <p className="text-xs text-stone-300 mt-0.5">
                      {activeDish.restaurant} • {activeDish.area} • <strong className="text-amber-300">{activeDish.price}</strong>
                    </p>
                  </div>
                </div>

                {/* Sub row with two quick food preview tiles from imported dataset */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-stone-50 border-t border-stone-100">
                  {foodPics
                    .filter(d => d.id !== activeDish.id)
                    .slice(0, 2)
                    .map(subDish => (
                      <button
                        key={subDish.id}
                        type="button"
                        onClick={() => handleSelectFoodPic(subDish)}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-stone-200 hover:border-orange-300 text-left transition-all cursor-pointer"
                      >
                        <img
                          src={subDish.image}
                          alt={subDish.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-stone-800 leading-tight truncate">
                            {subDish.name}
                          </div>
                          <div className="text-[11px] text-stone-500 truncate">{subDish.restaurant}</div>
                          <div className="text-[11px] font-bold text-[#EA580C]">{subDish.price}</div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                  ★ 4.8
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Multan Local Word</div>
                  <div className="text-[11px] text-stone-500">12,400+ Verified Diners</div>
                </div>
              </div>

              {/* Floating hours badge */}
              <div className="absolute -bottom-3 -right-3 bg-stone-900 text-white px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Late Night Open (till 3 AM)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import Food Picture Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsImportModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-stone-900">Import Multan Food Photo</h4>
                <p className="text-xs text-stone-500">Showcase your dish or food photograph</p>
              </div>
            </div>

            {importSuccessMessage ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h5 className="font-bold text-sm text-stone-900">Food Picture Imported!</h5>
                <p className="text-xs text-stone-500">
                  Featured in your Multan food showcase now.
                </p>
              </div>
            ) : (
              <form onSubmit={handleImportSubmit} className="space-y-3.5 text-xs">
                {/* Image Upload or URL */}
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Upload Picture or Enter Image URL *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={newPicUrl}
                      onChange={e => setNewPicUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... or paste image URL"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                    />

                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span>Or upload from device / camera:</span>
                      <label className="cursor-pointer font-bold text-[#EA580C] hover:underline flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {newPicUrl && (
                    <div className="mt-2 h-28 w-full rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                      <img
                        src={newPicUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Dish Name *</label>
                  <input
                    type="text"
                    required
                    value={newPicName}
                    onChange={e => setNewPicName(e.target.value)}
                    placeholder="e.g. Special White Mutton Karahi, Cheesy Burger..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Restaurant Name</label>
                    <input
                      type="text"
                      value={newPicRestaurant}
                      onChange={e => setNewPicRestaurant(e.target.value)}
                      placeholder="e.g. Al Kaif, Al-Quresh..."
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Price (PKR)</label>
                    <input
                      type="text"
                      value={newPicPrice}
                      onChange={e => setNewPicPrice(e.target.value)}
                      placeholder="₨ 1,200"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Multan Neighborhood</label>
                  <select
                    value={newPicArea}
                    onChange={e => setNewPicArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                  >
                    {neighborhoods.map(nh => (
                      <option key={nh.id} value={nh.name}>
                        {nh.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Import & Feature Picture
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
