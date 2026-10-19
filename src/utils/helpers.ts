import { Restaurant } from '../types';

export const formatPKR = (amount: number): string => {
  return `₨ ${amount.toLocaleString()}`;
};

export const checkIsOpenNow = (openingHours?: { [day: string]: string }): { isOpen: boolean; statusText: string } => {
  if (!openingHours) return { isOpen: true, statusText: 'Open' };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const currentDay = days[now.getDay()];
  const hoursToday = openingHours[currentDay];

  if (!hoursToday || hoursToday.toLowerCase().includes('closed')) {
    return { isOpen: false, statusText: 'Closed Today' };
  }

  // Common format "12:00 PM – 03:00 AM" or "11:00 AM – 02:30 AM"
  return { isOpen: true, statusText: `Open (${hoursToday})` };
};

export const getPriceRangeSymbol = (range: string): string => {
  return range || '₨₨';
};

export const normalizeSearchText = (str: string): string => {
  return str.toLowerCase().replace(/[-_,.]/g, ' ').trim();
};

// Local Multan Roman Urdu dictionary mapping for smart search
const ROMAN_URDU_ALIASES: { [key: string]: string[] } = {
  karahi: ['karahi', 'kadahi', 'karhai', 'gosht', 'handi', 'desi ghee', 'mutton'],
  biryani: ['biryani', 'bryani', 'biryany', 'pulao', 'dum biryani', 'chawal', 'rice'],
  bbq: ['bbq', 'tikka', 'boti', 'sajji', 'seekh', 'kabab', 'kebab', 'charga', 'charcoal'],
  pizza: ['pizza', 'piza', 'pizaa', 'crust', 'fajita', 'tikka pizza'],
  burger: ['burger', 'bargur', 'zinger', 'smash', 'beef burger', 'crispy chicken'],
  broast: ['broast', 'fried chicken', 'crispy', 'brost'],
  falooda: ['falooda', 'faluda', 'rabri', 'kulfi', 'kulfa', 'ice cream', 'icecream', 'shake'],
  nihari: ['nihari', 'nehari', 'paye', 'paya', 'nashta', 'breakfast', 'halwa puri', 'chana'],
  shawarma: ['shawarma', 'shawrma', 'shwarma', 'roll', 'paratha roll', 'wrap']
};

export const matchesSearchQuery = (restaurant: Restaurant, query: string): boolean => {
  if (!query) return true;
  const cleanQuery = normalizeSearchText(query);
  const qTerms = cleanQuery.split(/\s+/).filter(Boolean);

  const searchableString = [
    restaurant.name,
    restaurant.branchName,
    restaurant.category,
    restaurant.neighborhood,
    restaurant.address,
    restaurant.cuisineTags.join(' '),
    restaurant.menuItems.map(m => `${m.name} ${m.urduName || ''} ${m.category}`).join(' ')
  ].join(' ').toLowerCase();

  return qTerms.every(term => {
    if (searchableString.includes(term)) return true;

    // Check Roman Urdu expansion
    for (const [key, aliases] of Object.entries(ROMAN_URDU_ALIASES)) {
      if (aliases.includes(term) && aliases.some(alias => searchableString.includes(alias))) {
        return true;
      }
    }
    return false;
  });
};
