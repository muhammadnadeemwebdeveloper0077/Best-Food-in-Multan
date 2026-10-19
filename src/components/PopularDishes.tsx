import React from 'react';
import { Restaurant, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/helpers';
import { Sparkles, ShoppingBag, ArrowRight, Star, Flame } from 'lucide-react';

interface PopularDishesProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onOpenCustomizer?: (restaurant: Restaurant, item: MenuItem) => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({
  restaurants,
  onSelectRestaurant,
  onOpenCustomizer
}) => {
  const { addToCart } = useCart();

  // Extract popular dishes paired with their parent restaurants
  const popularDishPairs: { item: MenuItem; restaurant: Restaurant }[] = [];

  restaurants.forEach(rest => {
    rest.menuItems.forEach(item => {
      if (item.isPopular && popularDishPairs.length < 8) {
        popularDishPairs.push({ item, restaurant: rest });
      }
    });
  });

  const handleQuickAdd = (rest: Restaurant, item: MenuItem) => {
    if (item.optionGroups && item.optionGroups.length > 0 && onOpenCustomizer) {
      onOpenCustomizer(rest, item);
    } else {
      addToCart(rest, item);
    }
  };

  return (
    <section className="py-14 bg-[#FFF9F2] border-b border-[#F0E3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F97316]">
              <Sparkles className="w-3.5 h-3.5" /> Multan's Most Ordered
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191919] tracking-tight mt-1">
              Popular Dishes in Multan
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Verified local crowd favorites with authentic prices in Pakistani Rupees.
            </p>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularDishPairs.map(({ item, restaurant }) => (
            <div
              key={`${restaurant.id}-${item.id}`}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-orange-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Dish Photo */}
                <div
                  className="relative h-44 w-full overflow-hidden bg-stone-100 cursor-pointer"
                  onClick={() => onSelectRestaurant(restaurant)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Price Tag */}
                  <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#EA580C] px-2.5 py-1 rounded-lg text-xs font-black shadow-xs">
                    {formatPKR(item.price)}
                  </div>

                  {/* Spicy / Veg indicator */}
                  {item.isSpicy && (
                    <div className="absolute top-2.5 right-2.5 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Flame className="w-2.5 h-2.5" /> Spicy
                    </div>
                  )}
                </div>

                {/* Dish Details */}
                <div className="p-4">
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3
                    onClick={() => onSelectRestaurant(restaurant)}
                    className="text-sm font-bold text-stone-900 group-hover:text-[#F97316] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                  >
                    {item.name}
                  </h3>

                  {item.urduName && (
                    <div className="text-[11px] text-stone-500 font-medium font-serif-accent mt-0.5">
                      {item.urduName}
                    </div>
                  )}

                  <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Restaurant Link & Quick Add */}
              <div className="p-4 pt-0 border-t border-stone-100/60 mt-2 space-y-2.5">
                <div
                  onClick={() => onSelectRestaurant(restaurant)}
                  className="flex items-center justify-between text-xs text-stone-500 hover:text-stone-900 cursor-pointer pt-2"
                >
                  <span className="font-semibold text-stone-700 truncate max-w-[150px]">
                    {restaurant.name}
                  </span>
                  <span className="text-[11px] text-stone-400">{restaurant.neighborhood}</span>
                </div>

                <button
                  onClick={() => handleQuickAdd(restaurant, item)}
                  className="w-full py-2 px-3 rounded-xl bg-orange-50 hover:bg-[#F97316] text-[#EA580C] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order / Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
