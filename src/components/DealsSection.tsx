import React from 'react';
import { Restaurant, Deal } from '../types';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/helpers';
import { Sparkles, Clock, CheckCircle2, ShoppingBag, ShieldCheck } from 'lucide-react';

interface DealsSectionProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  restaurants,
  onSelectRestaurant
}) => {
  const { addToCart } = useCart();

  // Aggregate verified deals
  const confirmedDeals: { deal: Deal; restaurant: Restaurant }[] = [];

  restaurants.forEach(rest => {
    if (rest.deals && rest.deals.length > 0) {
      rest.deals.forEach(deal => {
        confirmedDeals.push({ deal, restaurant: rest });
      });
    }
  });

  const handleOrderDeal = (deal: Deal, restaurant: Restaurant) => {
    // Treat deal as MenuItem in Cart
    addToCart(restaurant, {
      id: deal.id,
      name: deal.title,
      description: deal.description,
      price: deal.price,
      category: 'Deals & Combos',
      image: restaurant.coverImage,
      isDeal: true
    });
  };

  if (confirmedDeals.length === 0) return null;

  return (
    <section className="py-14 bg-white border-b border-[#F0E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EA580C]">
              <Sparkles className="w-3.5 h-3.5" /> Verified Multan Value
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191919] tracking-tight mt-1">
              Confirmed Deals & Offers
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Real combos confirmed with the restaurant branches. Never fabricated.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {confirmedDeals.map(({ deal, restaurant }) => {
            const savings = deal.originalPrice ? deal.originalPrice - deal.price : null;

            return (
              <div
                key={deal.id}
                className="bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 rounded-3xl border border-orange-200/80 p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl pointer-events-none"></div>

                <div>
                  {/* Top Bar with Restaurant & Validity */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <button
                      onClick={() => onSelectRestaurant(restaurant)}
                      className="font-bold text-[#EA580C] hover:underline flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{restaurant.name}</span>
                    </button>

                    {deal.validUntil && (
                      <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {deal.validUntil}
                      </span>
                    )}
                  </div>

                  {/* Deal Title */}
                  <h3 className="text-lg font-bold text-stone-900 leading-snug">
                    {deal.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {deal.description}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="mt-4 pt-3 border-t border-orange-100/80 space-y-1.5">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Includes:
                    </span>
                    {deal.itemsIncluded.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="mt-5 pt-4 border-t border-stone-200/70 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-[#EA580C]">
                        {formatPKR(deal.price)}
                      </span>
                      {deal.originalPrice && (
                        <span className="text-xs text-stone-400 line-through font-medium">
                          {formatPKR(deal.originalPrice)}
                        </span>
                      )}
                    </div>
                    {savings && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Save {formatPKR(savings)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOrderDeal(deal, restaurant)}
                    className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Claim Deal</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
