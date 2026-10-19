import React, { useState, useMemo } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryCarousel } from './components/CategoryCarousel';
import { FilterBar } from './components/FilterBar';
import { RestaurantCard } from './components/RestaurantCard';
import { InteractiveMap } from './components/InteractiveMap';
import { PopularDishes } from './components/PopularDishes';
import { DealsSection } from './components/DealsSection';
import { NeighborhoodExplorer } from './components/NeighborhoodExplorer';
import { FoodGuidesSection } from './components/FoodGuidesSection';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminModal } from './components/AdminModal';
import { AddRestaurantModal } from './components/AddRestaurantModal';
import { ReportErrorModal } from './components/ReportErrorModal';
import { Footer } from './components/Footer';
import { Restaurant } from './types';
import { matchesSearchQuery, checkIsOpenNow } from './utils/helpers';
import { Utensils, Heart, X, Sparkles, MapPin } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { restaurants, neighborhoods, categories, guides } = useData();
  const { favorites } = useFavorites();

  // Filter state
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // Modals state
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [reportingErrorRestaurant, setReportingErrorRestaurant] = useState<Restaurant | null>(null);
  const [isAddRestaurantOpen, setIsAddRestaurantOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Filtered restaurants computation
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter(rest => {
        // Favorites filter
        if (showFavoritesOnly && !favorites.includes(rest.id)) {
          return false;
        }

        // Neighborhood Area filter
        if (selectedArea !== 'All Areas' && !rest.neighborhood.toLowerCase().includes(selectedArea.toLowerCase())) {
          return false;
        }

        // Cuisine Category filter
        if (selectedCategory !== 'All') {
          const catLower = selectedCategory.toLowerCase();
          const matchCategory =
            rest.category.toLowerCase().includes(catLower) ||
            rest.cuisineTags.some(tag => tag.toLowerCase().includes(catLower));
          if (!matchCategory) return false;
        }

        // Price range filter
        if (selectedPrice !== 'All' && rest.priceRange !== selectedPrice) {
          return false;
        }

        // Open now filter
        if (openNowOnly) {
          const { isOpen } = checkIsOpenNow(rest.openingHours);
          if (!isOpen) return false;
        }

        // Verified only
        if (verifiedOnly && !rest.isVerified) {
          return false;
        }

        // Search query
        if (searchQuery.trim() && !matchesSearchQuery(rest, searchQuery)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (sortBy === 'price-asc') return a.priceRange.length - b.priceRange.length;
        if (sortBy === 'price-desc') return b.priceRange.length - a.priceRange.length;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // default recommended order
      });
  }, [
    restaurants,
    favorites,
    showFavoritesOnly,
    selectedArea,
    selectedCategory,
    selectedPrice,
    openNowOnly,
    verifiedOnly,
    searchQuery,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSelectedArea('All Areas');
    setSelectedCategory('All');
    setSelectedPrice('All');
    setSearchQuery('');
    setOpenNowOnly(false);
    setVerifiedOnly(false);
    setShowFavoritesOnly(false);
    setSortBy('recommended');
  };

  const handleHeroSearch = (query: string, area: string) => {
    setSearchQuery(query);
    setSelectedArea(area);
    setShowFavoritesOnly(false);
    const directoryEl = document.getElementById('restaurants');
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#191919] flex flex-col">
      {/* Header */}
      <Header
        selectedArea={selectedArea}
        onSelectArea={area => {
          setSelectedArea(area);
          setShowFavoritesOnly(false);
        }}
        onOpenSearch={() => {
          const searchInput = document.getElementById('directory-search');
          if (searchInput) searchInput.focus();
          handleNavigateSection('restaurants');
        }}
        onOpenAddRestaurant={() => setIsAddRestaurantOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={handleNavigateSection}
        onViewFavorites={() => {
          setShowFavoritesOnly(true);
          handleNavigateSection('restaurants');
        }}
      />

      {/* Hero Section */}
      <div id="hero">
        <Hero
          onSearch={handleHeroSearch}
          selectedArea={selectedArea}
          onSelectArea={setSelectedArea}
          onExploreDesi={() => {
            setSelectedCategory('Karahi & Handi');
            handleNavigateSection('restaurants');
          }}
          onExploreAll={() => {
            handleResetFilters();
            handleNavigateSection('restaurants');
          }}
        />
      </div>

      {/* Categories Carousel */}
      <div id="categories">
        <CategoryCarousel
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={catName => {
            setSelectedCategory(catName);
            handleNavigateSection('restaurants');
          }}
        />
      </div>

      {/* Confirmed Deals Section */}
      <div id="deals">
        <DealsSection
          restaurants={restaurants}
          onSelectRestaurant={setSelectedRestaurant}
        />
      </div>

      {/* Main Restaurant Directory */}
      <section id="restaurants" className="py-12 bg-[#FFF9F2] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Section Heading & Favorites indicator */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F97316]">
                <Utensils className="w-3.5 h-3.5" /> Verified Directory
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191919] tracking-tight mt-1 flex items-center gap-3">
                <span>Restaurants in Multan</span>
                {showFavoritesOnly && (
                  <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    Saved Favorites
                    <button
                      onClick={() => setShowFavoritesOnly(false)}
                      className="ml-1 text-red-900 hover:text-black"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Showing authentic menus, phone numbers, opening hours & PKR prices.
              </p>
            </div>
          </div>

          {/* Filtering Bar */}
          <div id="directory-search">
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedArea={selectedArea}
              onAreaChange={setSelectedArea}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedPrice={selectedPrice}
              onPriceChange={setSelectedPrice}
              openNowOnly={openNowOnly}
              onOpenNowChange={setOpenNowOnly}
              verifiedOnly={verifiedOnly}
              onVerifiedChange={setVerifiedOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
              neighborhoods={neighborhoods}
              categories={categories}
              totalResults={filteredRestaurants.length}
              onResetFilters={handleResetFilters}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
            />
          </div>

          {/* Content View: Interactive Map or Cards Grid */}
          {filteredRestaurants.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center mx-auto">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                No matching restaurants found in Multan
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                We couldn't find any listings matching your current search or filters. Try choosing "All Multan Areas" or resetting the cuisine filter.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#F97316] text-white font-bold text-xs hover:bg-[#EA580C] shadow-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'map' ? (
            <InteractiveMap
              restaurants={filteredRestaurants}
              onSelectRestaurant={setSelectedRestaurant}
              selectedArea={selectedArea}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(rest => (
                <RestaurantCard
                  key={rest.id}
                  restaurant={rest}
                  onSelect={setSelectedRestaurant}
                  onOpenReportError={setReportingErrorRestaurant}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Dishes in Multan */}
      <div id="popular-dishes">
        <PopularDishes
          restaurants={restaurants}
          onSelectRestaurant={setSelectedRestaurant}
        />
      </div>

      {/* Multan Neighborhoods Explorer */}
      <div id="neighborhoods">
        <NeighborhoodExplorer
          neighborhoods={neighborhoods}
          selectedArea={selectedArea}
          onSelectArea={areaName => {
            setSelectedArea(areaName);
            handleNavigateSection('restaurants');
          }}
        />
      </div>

      {/* Curated Local Food Guides */}
      <div id="guides">
        <FoodGuidesSection
          guides={guides}
          restaurants={restaurants}
          onSelectRestaurant={setSelectedRestaurant}
          onFilterByCategory={cat => {
            setSelectedCategory(cat);
            handleNavigateSection('restaurants');
          }}
          onFilterByArea={area => {
            setSelectedArea(area);
            handleNavigateSection('restaurants');
          }}
        />
      </div>

      {/* Footer */}
      <Footer
        onSelectArea={area => {
          setSelectedArea(area);
          handleNavigateSection('restaurants');
        }}
        onSelectCategory={cat => {
          setSelectedCategory(cat);
          handleNavigateSection('restaurants');
        }}
        onOpenAddRestaurant={() => setIsAddRestaurantOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Overlays */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          allRestaurants={restaurants}
          onSelectSimilarRestaurant={setSelectedRestaurant}
          onOpenReportError={r => {
            setReportingErrorRestaurant(r);
          }}
        />
      )}

      <CartDrawer />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <AddRestaurantModal
        isOpen={isAddRestaurantOpen}
        onClose={() => setIsAddRestaurantOpen(false)}
      />

      <ReportErrorModal
        restaurant={reportingErrorRestaurant}
        isOpen={!!reportingErrorRestaurant}
        onClose={() => setReportingErrorRestaurant(null)}
      />
    </div>
  );
};

export function App() {
  return (
    <DataProvider>
      <CartProvider>
        <FavoritesProvider>
          <MainAppContent />
        </FavoritesProvider>
      </CartProvider>
    </DataProvider>
  );
}

export default App;
