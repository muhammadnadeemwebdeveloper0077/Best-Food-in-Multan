import React, { useState } from 'react';
import { Restaurant, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { checkIsOpenNow, formatPKR, getPriceRangeSymbol } from '../utils/helpers';
import {
  X,
  MapPin,
  Phone,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Star,
  Clock,
  Heart,
  MessageCircle,
  Plus,
  Flame,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  UtensilsCrossed
} from 'lucide-react';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  allRestaurants: Restaurant[];
  onSelectSimilarRestaurant: (restaurant: Restaurant) => void;
  onOpenReportError: (restaurant: Restaurant) => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
  allRestaurants,
  onSelectSimilarRestaurant,
  onOpenReportError
}) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Customizer state
  const [selectedOptions, setSelectedOptions] = useState<{ [groupName: string]: string }>({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customQuantity, setCustomQuantity] = useState(1);

  const isFav = isFavorite(restaurant.id);
  const { isOpen, statusText } = checkIsOpenNow(restaurant.openingHours);

  // Filter menu items by active tab
  const displayedMenuItems =
    selectedCategoryTab === 'All'
      ? restaurant.menuItems
      : restaurant.menuItems.filter(item => item.category === selectedCategoryTab);

  // Similar restaurants in same neighborhood or category
  const similarRestaurants = allRestaurants
    .filter(
      r =>
        r.id !== restaurant.id &&
        (r.neighborhood === restaurant.neighborhood || r.category === restaurant.category)
    )
    .slice(0, 3);

  const cleanPhone = restaurant.phone.replace(/[^0-9+]/g, '');

  const whatsappInquiryUrl = restaurant.whatsappNumber
    ? `https://wa.me/${restaurant.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Hi ${restaurant.name}! I am looking at your verified menu on Best Food in Multan and would like to place an inquiry.`
      )}`
    : null;

  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setCustomQuantity(1);
    setSpecialInstructions('');

    // Preselect first option in required groups
    const initialOptions: { [groupName: string]: string } = {};
    if (item.optionGroups) {
      item.optionGroups.forEach(grp => {
        if (grp.required && grp.options.length > 0) {
          initialOptions[grp.name] = grp.options[0].name;
        }
      });
    }
    setSelectedOptions(initialOptions);
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;

    const chosenOptionObjs: { groupName: string; optionName: string; priceDelta: number }[] = [];

    if (customizingItem.optionGroups) {
      customizingItem.optionGroups.forEach(grp => {
        const chosenName = selectedOptions[grp.name];
        if (chosenName) {
          const match = grp.options.find(o => o.name === chosenName);
          if (match) {
            chosenOptionObjs.push({
              groupName: grp.name,
              optionName: match.name,
              priceDelta: match.priceDelta
            });
          }
        }
      });
    }

    addToCart(
      restaurant,
      customizingItem,
      chosenOptionObjs,
      specialInstructions,
      customQuantity
    );
    setCustomizingItem(null);
  };

  // Calculate current unit price in customizer
  const currentOptionsDelta = customizingItem?.optionGroups
    ? customizingItem.optionGroups.reduce((acc, grp) => {
        const chosen = selectedOptions[grp.name];
        if (!chosen) return acc;
        const opt = grp.options.find(o => o.name === chosen);
        return acc + (opt?.priceDelta || 0);
      }, 0)
    : 0;

  const currentCustomizedUnitPrice = (customizingItem?.price || 0) + currentOptionsDelta;
  const currentCustomizedTotal = currentCustomizedUnitPrice * customQuantity;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close restaurant view"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-lg flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Hero Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900 flex-shrink-0">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

          {/* Top verified status chips */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4" />
              Verified Multan Branch ({restaurant.verificationDate})
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                isOpen ? 'bg-stone-900 text-emerald-400' : 'bg-red-700 text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5 inline mr-1" />
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>

          {/* Bottom Title & Neighborhood */}
          <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                <span>{restaurant.category}</span>
                <span>•</span>
                <span>{getPriceRangeSymbol(restaurant.priceRange)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {restaurant.rating.toFixed(1)} ({restaurant.reviewCount} reviews)
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {restaurant.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <span>{restaurant.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => toggleFavorite(restaurant.id)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isFav
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-xs'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-8 flex-1">
          {/* Quick Actions & Contact Bar */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {restaurant.phone && (
              <a
                href={`tel:${cleanPhone}`}
                className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 text-stone-800 transition-all flex flex-col items-center justify-center gap-1"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold">Call Branch</span>
                <span className="text-[10px] text-stone-500 truncate max-w-full">{restaurant.phone}</span>
              </a>
            )}

            {whatsappInquiryUrl && (
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 text-stone-800 transition-all flex flex-col items-center justify-center gap-1"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold">WhatsApp</span>
                <span className="text-[10px] text-stone-500">Order Inquiry</span>
              </a>
            )}

            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-blue-500 hover:bg-blue-50 text-stone-800 transition-all flex flex-col items-center justify-center gap-1"
            >
              <Navigation className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold">Directions</span>
              <span className="text-[10px] text-stone-500">Google Maps</span>
            </a>

            {restaurant.orderingUrl ? (
              <a
                href={restaurant.orderingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-orange-200 hover:bg-orange-50 text-[#EA580C] transition-all flex flex-col items-center justify-center gap-1"
              >
                <ExternalLink className="w-4 h-4 text-[#F97316]" />
                <span className="text-xs font-bold">Official Online</span>
                <span className="text-[10px] text-stone-500">External Site</span>
              </a>
            ) : (
              <button
                onClick={() => onOpenReportError(restaurant)}
                className="p-2.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold">Suggest Update</span>
                <span className="text-[10px] text-stone-400">Report Changes</span>
              </button>
            )}
          </div>

          {/* Operational Info & Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-base font-bold text-stone-900">About {restaurant.name}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {restaurant.description}
              </p>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {restaurant.dineIn && (
                  <span className="px-3 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold">
                    ✓ Dine-in Available
                  </span>
                )}
                {restaurant.takeaway && (
                  <span className="px-3 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold">
                    ✓ Takeaway / Drive-thru
                  </span>
                )}
                {restaurant.delivery && (
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    ✓ Home Delivery across Multan
                  </span>
                )}
              </div>

              {/* Data Verification notice */}
              <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3 text-xs text-stone-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-800">Verified Listing:</span> {restaurant.dataSource}.
                  Prices are listed in Pakistani Rupees (PKR) and cross-checked with the Multan branch.
                </div>
              </div>
            </div>

            {/* Hours Schedule */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#F97316]" /> Opening Hours
              </div>
              <div className="space-y-1.5 text-xs">
                {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-stone-600">
                    <span className="font-medium">{day}:</span>
                    <span className="font-semibold text-stone-900">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deals Section if present */}
          {restaurant.deals && restaurant.deals.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F97316]" /> Exclusive Deals at this Branch
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {restaurant.deals.map(deal => (
                  <div
                    key={deal.id}
                    className="p-4 rounded-2xl border border-orange-200 bg-orange-50/40 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-stone-900">{deal.title}</div>
                      <div className="text-xs text-stone-600 line-clamp-1">{deal.description}</div>
                      <div className="text-sm font-black text-[#EA580C] mt-1">
                        {formatPKR(deal.price)}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        addToCart(restaurant, {
                          id: deal.id,
                          name: deal.title,
                          description: deal.description,
                          price: deal.price,
                          category: 'Deals',
                          image: restaurant.coverImage,
                          isDeal: true
                        })
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs flex-shrink-0 cursor-pointer"
                    >
                      Add Deal
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menu Categories Tabs */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-[#F97316]" />
                  Verified Menu & Prices
                </h3>
                <p className="text-xs text-stone-500">
                  Select an item to customize options and add to your order.
                </p>
              </div>
            </div>

            {/* Category tabs pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategoryTab('All')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategoryTab === 'All'
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All Items ({restaurant.menuItems.length})
              </button>
              {restaurant.menuCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryTab(cat.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategoryTab === cat.name
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayedMenuItems.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-stone-200 hover:border-orange-300 hover:shadow-md transition-all bg-white flex justify-between gap-3 group"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900 group-hover:text-[#F97316] transition-colors">
                          {item.name}
                        </span>
                        {item.isPopular && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                            Popular
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5" /> Spicy
                          </span>
                        )}
                      </div>

                      {item.urduName && (
                        <div className="text-[11px] text-stone-500 font-serif-accent mt-0.5">
                          {item.urduName}
                        </div>
                      )}

                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                      <span className="text-base font-black text-[#EA580C]">
                        {formatPKR(item.price)}
                      </span>

                      <button
                        onClick={() => handleOpenCustomizer(item)}
                        className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-[#F97316] text-[#EA580C] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {item.image && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Similar Multan Restaurants Nearby */}
          {similarRestaurants.length > 0 && (
            <div className="pt-6 border-t border-stone-200">
              <h3 className="text-base font-bold text-stone-900 mb-3">
                Similar Food Points in {restaurant.neighborhood}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarRestaurants.map(sim => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilarRestaurant(sim)}
                    className="p-3 rounded-2xl border border-stone-200 hover:border-orange-300 hover:bg-orange-50/40 transition-all flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={sim.coverImage}
                      alt={sim.name}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-stone-900 truncate">{sim.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">{sim.category}</div>
                      <div className="text-[11px] font-bold text-[#EA580C]">
                        ★ {sim.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Item Customizer Modal Overlay */}
      {customizingItem && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{customizingItem.name}</h3>
                <div className="text-xs text-stone-500">{restaurant.name}</div>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option Groups */}
            {customizingItem.optionGroups && customizingItem.optionGroups.map(grp => (
              <div key={grp.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>{grp.name}</span>
                  {grp.required && <span className="text-[10px] text-orange-600 uppercase">Required</span>}
                </div>
                <div className="space-y-1.5">
                  {grp.options.map(opt => {
                    const isSelected = selectedOptions[grp.name] === opt.name;
                    return (
                      <button
                        key={opt.name}
                        onClick={() =>
                          setSelectedOptions(prev => ({
                            ...prev,
                            [grp.name]: opt.name
                          }))
                        }
                        className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-orange-50 border-[#F97316] text-[#EA580C]'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{opt.name}</span>
                        <span>{opt.priceDelta > 0 ? `+₨ ${opt.priceDelta}` : opt.priceDelta < 0 ? `-₨ ${Math.abs(opt.priceDelta)}` : 'Standard'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Special Instructions */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Less spicy, extra mint raita, crispy fries..."
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-700">Quantity</span>
              <div className="flex items-center gap-3 bg-stone-100 px-3 py-1.5 rounded-xl">
                <button
                  onClick={() => setCustomQuantity(Math.max(1, customQuantity - 1))}
                  className="font-bold text-stone-700 text-base px-1"
                >
                  -
                </button>
                <span className="text-sm font-bold text-stone-900 w-4 text-center">
                  {customQuantity}
                </span>
                <button
                  onClick={() => setCustomQuantity(customQuantity + 1)}
                  className="font-bold text-stone-700 text-base px-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Submit */}
            <button
              onClick={handleConfirmAddToCart}
              className="w-full py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all flex items-center justify-between px-5 cursor-pointer"
            >
              <span>Add to Cart</span>
              <span>{formatPKR(currentCustomizedTotal)}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
