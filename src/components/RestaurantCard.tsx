import React from 'react';
import { Restaurant } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { checkIsOpenNow, getPriceRangeSymbol } from '../utils/helpers';
import {
  MapPin,
  Star,
  Phone,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Heart,
  Clock,
  MessageCircle,
  Utensils
} from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
  onOpenReportError: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onSelect,
  onOpenReportError
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(restaurant.id);
  const { isOpen, statusText } = checkIsOpenNow(restaurant.openingHours);

  const cleanPhoneForDial = restaurant.phone.replace(/[^0-9+]/g, '');

  const whatsappLink = restaurant.whatsappNumber
    ? `https://wa.me/${restaurant.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Hi! I found ${restaurant.name} on Best Food in Multan. I would like to check today's menu & availability.`
      )}`
    : null;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-300 transition-all duration-200 flex flex-col group">
      {/* Cover Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelect(restaurant)}>
        <img
          src={restaurant.coverImage}
          alt={`${restaurant.name} Multan`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {restaurant.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/95 text-white text-[11px] font-bold shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Multan
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${
                isOpen
                  ? 'bg-stone-900/90 text-emerald-400'
                  : 'bg-red-700/90 text-white'
              }`}
            >
              <Clock className="w-3 h-3" />
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>

          {/* Favorite Heart Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleFavorite(restaurant.id);
            }}
            aria-label="Save to favorites"
            className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-500 transition-colors shadow-xs"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Info: Price Range & Neighborhood */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 font-semibold bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="truncate max-w-[160px]">{restaurant.neighborhood}</span>
          </div>

          <div className="bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg font-bold text-amber-300">
            {getPriceRangeSymbol(restaurant.priceRange)}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#EA580C] uppercase tracking-wider text-[11px]">
              {restaurant.category}
            </span>
            <div className="flex items-center gap-1 text-stone-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal text-[10px]">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>

          {/* Restaurant Title */}
          <h3
            onClick={() => onSelect(restaurant)}
            className="text-lg font-bold text-[#191919] hover:text-[#F97316] transition-colors cursor-pointer line-clamp-1"
          >
            {restaurant.name}
          </h3>

          {/* Branch & Address */}
          <p className="text-xs text-stone-500 font-medium line-clamp-1 mt-0.5">
            {restaurant.branchName} • {restaurant.address}
          </p>

          {/* Description snippet */}
          <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Features Pills (Dine-in, Takeaway, Delivery) */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {restaurant.dineIn && (
              <span className="text-[10px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                Dine-in
              </span>
            )}
            {restaurant.takeaway && (
              <span className="text-[10px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                Takeaway
              </span>
            )}
            {restaurant.delivery && (
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200/50">
                Delivery Available
              </span>
            )}
            {restaurant.deals && restaurant.deals.length > 0 && (
              <span className="text-[10px] font-bold bg-orange-100 text-[#EA580C] px-2 py-0.5 rounded">
                🔥 {restaurant.deals.length} Deal{restaurant.deals.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="mt-4 pt-3.5 border-t border-stone-100 space-y-2">
          {/* Main Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(restaurant)}
              className="w-full py-2 px-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>View Menu</span>
            </button>

            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Directions</span>
            </a>
          </div>

          {/* Quick Contact & Online Order row */}
          <div className="flex items-center justify-between text-[11px] pt-1 px-1">
            <div className="flex items-center gap-3">
              {restaurant.phone && (
                <a
                  href={`tel:${cleanPhoneForDial}`}
                  className="font-semibold text-stone-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  title={`Call ${restaurant.name}`}
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call</span>
                </a>
              )}

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-600 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                  title="WhatsApp Inquiry"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            {restaurant.orderingUrl ? (
              <a
                href={restaurant.orderingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#EA580C] hover:underline flex items-center gap-1"
              >
                <span>Order Online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <button
                onClick={() => onOpenReportError(restaurant)}
                className="text-stone-400 hover:text-stone-600 text-[10px]"
              >
                Report update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
