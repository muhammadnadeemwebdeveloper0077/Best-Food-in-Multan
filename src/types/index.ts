export type PriceRange = '₨' | '₨₨' | '₨₨₨' | '₨₨₨₨';

export interface MenuItemOption {
  name: string;
  priceDelta: number;
}

export interface MenuItemOptionGroup {
  name: string;
  required: boolean;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  description: string;
  price: number; // in PKR
  category: string;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
  isDeal?: boolean;
  dealTag?: string;
  servesCount?: number;
  optionGroups?: MenuItemOptionGroup[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  price: number; // in PKR
  originalPrice?: number;
  validUntil?: string;
  itemsIncluded: string[];
  bannerImage?: string;
}

export interface OpeningHourDay {
  open: string;  // e.g. "12:00 PM"
  close: string; // e.g. "02:00 AM"
  isClosed?: boolean;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  branchName: string;
  category: string; // e.g. "Fast Food & Pizza", "Desi Food & BBQ", "Traditional Karahi", "Cafes & Desserts"
  cuisineTags: string[]; // e.g. ["Pizza", "Burgers", "Fast Food"]
  description: string;
  address: string;
  neighborhood: string; // e.g. "Gulgasht Colony"
  latitude: number;
  longitude: number;
  phone: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  orderingUrl?: string;
  menuUrl?: string;
  foodpandaUrl?: string;
  googleMapsUrl: string;
  coverImage: string;
  logoImage?: string;
  galleryImages: string[];
  imageSource: string; // e.g. "Restaurant Official / Licensed"
  licenseInfo: string;
  openingHours: {
    [day: string]: string; // "Monday": "12:00 PM - 02:00 AM"
  };
  priceRange: PriceRange;
  rating: number; // e.g. 4.6
  reviewCount: number;
  ratingSource: string; // e.g. "Google Maps & Verified Diners"
  dineIn: boolean;
  takeaway: boolean;
  delivery: boolean;
  isVerified: boolean;
  verificationDate: string; // e.g. "October 2026"
  dataSource: string; // e.g. "Verified Direct Branch & Menu Inspection"
  adminNotes?: string;
  deals?: Deal[];
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  popularSpotsCount: number;
  description: string;
  landmark: string;
  isPopularFoodHub: boolean;
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  description: string;
  tagline: string;
}

export interface CartItem {
  id: string; // unique item cart instance id
  menuItem: MenuItem;
  restaurantId: string;
  restaurantName: string;
  restaurantPhone?: string;
  restaurantWhatsApp?: string;
  quantity: number;
  selectedOptions: { groupName: string; optionName: string; priceDelta: number }[];
  itemTotal: number;
  specialInstructions?: string;
}

export interface OrderInquiry {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryArea: string;
  orderType: 'delivery' | 'takeaway';
  paymentMethod: 'Cash on Delivery' | 'JazzCash / Easypaisa' | 'Card on POS';
  specialNotes?: string;
}

export interface RestaurantSubmission {
  id: string;
  restaurantName: string;
  branchName: string;
  neighborhood: string;
  address: string;
  phone: string;
  cuisine: string;
  menuOrWebsiteUrl?: string;
  submitterName: string;
  submitterContact: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ErrorReport {
  id: string;
  restaurantId: string;
  restaurantName: string;
  issueType: 'wrong_phone' | 'incorrect_hours' | 'wrong_menu_or_price' | 'permanently_closed' | 'wrong_location' | 'other';
  details: string;
  reporterContact?: string;
  reportedAt: string;
  status: 'pending' | 'resolved';
}

export interface FoodGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  heroImage: string;
  readTime: string;
  categoryFilter?: string;
  neighborhoodFilter?: string;
  intro: string;
  recommendedRestaurantIds: string[];
  insiderTips: string[];
}
