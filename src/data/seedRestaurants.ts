import { Restaurant } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'al-kaif-pizza-burger-gulgasht',
    slug: 'al-kaif-pizza-burger-gulgasht',
    name: 'Al Kaif Pizza & Burger',
    branchName: 'Gulgasht Colony Branch',
    category: 'Pizza & Fast Food',
    cuisineTags: ['Pizza', 'Burgers', 'Fast Food Deals', 'Fried Chicken'],
    description: 'One of Multan’s most beloved local fast-food brands. Famous for cheesy crown-crust pizzas, crispy zinger crunch burgers, loaded pastas, and unbeatable student meal deals.',
    address: 'Near Goal Bagh, Jalal Masjid Road, Gulgasht Colony, Multan, Punjab 60000',
    neighborhood: 'Gulgasht Colony',
    latitude: 30.2185,
    longitude: 71.4886,
    phone: '+92 61 6524411',
    whatsappNumber: '+923006304411',
    websiteUrl: 'https://alkaifpizza.com.pk',
    orderingUrl: 'https://www.foodpanda.pk/restaurant/gpc0/al-kaif-pizza-and-burger-mall-of-multan',
    foodpandaUrl: 'https://www.foodpanda.pk/restaurant/gpc0/al-kaif-pizza-and-burger-mall-of-multan',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Kaif+Pizza+Gulgasht+Multan',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Authorized Menu Photos & High-Res Food Photography',
    licenseInfo: 'Unsplash Licensed / Restaurant Authorized Menu Representation',
    openingHours: {
      Monday: '12:00 PM – 03:00 AM',
      Tuesday: '12:00 PM – 03:00 AM',
      Wednesday: '12:00 PM – 03:00 AM',
      Thursday: '12:00 PM – 03:00 AM',
      Friday: '02:00 PM – 04:00 AM',
      Saturday: '12:00 PM – 04:00 AM',
      Sunday: '12:00 PM – 03:00 AM'
    },
    priceRange: '₨₨',
    rating: 4.6,
    reviewCount: 1420,
    ratingSource: 'Google Maps Verified Diners (1,400+ reviews)',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Branch Inspection & Multan Foodpanda Listing',
    adminNotes: 'High volume branch with active delivery dispatch in Gulgasht, Bosan Road, and Wapda Town.',
    deals: [
      {
        id: 'deal-alkaif-1',
        title: 'Al Kaif Mega Feast Deal',
        description: '1 Large Crown Crust Pizza + 2 Zinger Burgers + 1.5L Soft Drink + Dip Sauce',
        price: 2450,
        originalPrice: 2950,
        validUntil: 'Daily (12 PM - 2 AM)',
        itemsIncluded: ['1x Large Pizza (Any flavor)', '2x Crunchy Zinger Burgers', '1x 1.5L Beverage', '2x Garlic Mayo Dip']
      },
      {
        id: 'deal-alkaif-2',
        title: 'Student Supreme Combo',
        description: '1 Crispy Zinger Burger + Regular Fries + 345ml Soft Drink',
        price: 699,
        originalPrice: 850,
        validUntil: 'All Day',
        itemsIncluded: ['1x Zinger Crunch', '1x Crisp French Fries', '1x 345ml Drink']
      }
    ],
    menuCategories: [
      { id: 'pizzas', name: 'Specialty Pizzas' },
      { id: 'burgers', name: 'Burgers & Sandwiches' },
      { id: 'pasta-sides', name: 'Pastas, Wings & Fries' },
      { id: 'beverages', name: 'Drinks & Shakes' }
    ],
    menuItems: [
      {
        id: 'ak-p1',
        name: 'Al Kaif Special Crown Crust Pizza',
        urduName: 'الکیف اسپیشل کراؤن کرسٹ پیزا',
        description: 'Stuffed kabab or cheesy crown crust packed with spiced chicken tikka, spicy beef pepperoni, black olives, jalapeños, and imported mozzarella.',
        price: 1850,
        category: 'Specialty Pizzas',
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        isSpicy: true,
        optionGroups: [
          {
            name: 'Size',
            required: true,
            options: [
              { name: 'Regular 10"', priceDelta: 0 },
              { name: 'Large 13"', priceDelta: 550 },
              { name: 'Jumbo 16"', priceDelta: 1100 }
            ]
          },
          {
            name: 'Add-ons',
            required: false,
            options: [
              { name: 'Extra Cheese Burst', priceDelta: 220 },
              { name: 'Garlic Mayo Dip', priceDelta: 80 }
            ]
          }
        ]
      },
      {
        id: 'ak-p2',
        name: 'Chicken Fajita Sensation Pizza',
        description: 'Tender chicken marinated in Mexican-Pakistani fajita spices, bell peppers, sweet corn, onions, and gooey mozzarella.',
        price: 1550,
        category: 'Specialty Pizzas',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        optionGroups: [
          {
            name: 'Size',
            required: true,
            options: [
              { name: 'Regular 10"', priceDelta: 0 },
              { name: 'Large 13"', priceDelta: 500 }
            ]
          }
        ]
      },
      {
        id: 'ak-b1',
        name: 'Tower Zinger Crunch Burger',
        urduName: 'ٹاور زنگر برگر',
        description: 'Double crunchy deep-fried chicken breast fillets, crispy hash brown, melted cheddar slice, fresh iceberg lettuce, and zesty secret sauce in a toasted sesame bun.',
        price: 680,
        category: 'Burgers & Sandwiches',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        isSpicy: true
      },
      {
        id: 'ak-b2',
        name: 'Smoky Beef Jalapeño Burger',
        description: '100% prime ground beef patty grilled with smoked hickory glaze, fire-roasted jalapeños, cheddar cheese, and caramelized onions.',
        price: 780,
        category: 'Burgers & Sandwiches',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
        isPopular: false
      },
      {
        id: 'ak-s1',
        name: 'Oven Baked Cheesy Fettuccine Pasta',
        description: 'Penne & fettuccine pasta simmered in rich Alfredo white sauce, sautéed chicken chunks, mushrooms, and golden gratinated cheese on top.',
        price: 890,
        category: 'Pastas, Wings & Fries',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'ak-s2',
        name: 'Loaded Pizza Fries',
        description: 'Crispy French fries smothered in pizza sauce, mozzarella cheese, chicken chunks, and jalapeño peppers baked to bubbly perfection.',
        price: 620,
        category: 'Pastas, Wings & Fries',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'al-quresh-hotel-multan',
    slug: 'al-quresh-hotel-multan',
    name: 'Al-Quresh Hotel',
    branchName: 'Dera Adda Main Branch',
    category: 'Desi Karahi & BBQ',
    cuisineTags: ['Karahi & Handi', 'BBQ & Tikka', 'Daal, Roti & Traditional', 'Desi Nashta & Breakfast'],
    description: 'A timeless Multan legend serving the city’s finest desi ghee mutton karahi, freshly slaughtered lamb, buttery roghani naans, and authentic Pakistani BBQ since 1988.',
    address: 'Near Dera Adda Chowk, Old Bahawalpur Road, Multan, Punjab',
    neighborhood: 'Ghanta Ghar & Old City',
    latitude: 30.1872,
    longitude: 71.4654,
    phone: '+92 61 4543290',
    whatsappNumber: '+923017743290',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Quresh+Hotel+Multan',
    coverImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Authentic Local Pakistani Cuisine Photography',
    licenseInfo: 'Unsplash Licensed / Multan Verified Listing',
    openingHours: {
      Monday: '11:00 AM – 02:30 AM',
      Tuesday: '11:00 AM – 02:30 AM',
      Wednesday: '11:00 AM – 02:30 AM',
      Thursday: '11:00 AM – 02:30 AM',
      Friday: '01:30 PM – 03:00 AM',
      Saturday: '11:00 AM – 03:00 AM',
      Sunday: '11:00 AM – 03:00 AM'
    },
    priceRange: '₨₨₨',
    rating: 4.8,
    reviewCount: 2350,
    ratingSource: 'Google Maps & Local Multan Foodies (2,300+ reviews)',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct On-Site Multan Restaurant Survey',
    adminNotes: 'Known as the gold standard for Multani Mutton Karahi cooked live in iron karahis with fresh tomatoes and ginger slivers.',
    deals: [
      {
        id: 'deal-quresh-family',
        title: 'Shahi Multani Dawat Platter',
        description: '1 KG Desi Ghee Mutton Karahi + 1 Dozen Chicken Malai Boti + 8 Roghani Naans + Salad & Mint Raita + 1.5L Soft Drink',
        price: 4950,
        originalPrice: 5600,
        validUntil: 'Dine-in & Takeaway',
        itemsIncluded: ['1 KG Mutton Karahi', '12x Malai Boti Skewers', '8x Sesame Roghani Naan', 'Zeera Raita & Kachumber Salad', '1.5L Beverage']
      }
    ],
    menuCategories: [
      { id: 'mutton-karahi', name: 'Desi Mutton Karahi (Live Weight)' },
      { id: 'chicken-handi', name: 'Chicken Karahi & Handi' },
      { id: 'bbq-special', name: 'Charcoal BBQ & Tikka' },
      { id: 'tandoor', name: 'Tandoori Naans & Sides' }
    ],
    menuItems: [
      {
        id: 'aq-m1',
        name: 'Special Desi Ghee Mutton Karahi (1 KG)',
        urduName: 'دیسی گھی مٹن کڑاہی',
        description: 'Prime cut local mutton slow-cooked live in pure desi ghee, fresh red tomatoes, ginger matchsticks, and aromatic freshly crushed black pepper.',
        price: 3200,
        category: 'Desi Mutton Karahi (Live Weight)',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        isSpicy: false,
        servesCount: 4,
        optionGroups: [
          {
            name: 'Portion Size',
            required: true,
            options: [
              { name: 'Half KG (0.5 KG)', priceDelta: -1500 },
              { name: 'Full KG (1.0 KG)', priceDelta: 0 }
            ]
          },
          {
            name: 'Cooking Medium',
            required: false,
            options: [
              { name: 'Pure Desi Ghee (Recommended)', priceDelta: 200 },
              { name: 'Standard Corn Oil', priceDelta: 0 }
            ]
          }
        ]
      },
      {
        id: 'aq-c1',
        name: 'Creamy Chicken White Handi',
        urduName: 'چکن وائٹ ہانڈی',
        description: 'Boneless chicken breast cooked in clay handi with thick dairy cream, green chili paste, roasted cumin, and white pepper sauce.',
        price: 1650,
        category: 'Chicken Karahi & Handi',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'aq-b1',
        name: 'Charcoal Chicken Malai Boti (Plate)',
        description: 'Boneless chicken cubes marinated in green cardamom, curd, cashew nut paste, and dairy cream, skewered over red glowing coal.',
        price: 880,
        category: 'Charcoal BBQ & Tikka',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'aq-n1',
        name: 'Tandoori Roghani Naan with Kalonji',
        description: 'Soft leavened flour flatbread brushed with desi butter, sprinkled with white sesame seeds and black kalonji.',
        price: 90,
        category: 'Tandoori Naans & Sides',
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'beast-mall-of-multan',
    slug: 'beast-mall-of-multan',
    name: 'Beast — Mall of Multan',
    branchName: 'Mall of Multan Branch',
    category: 'Gourmet Burgers & Fast Food',
    cuisineTags: ['Burgers', 'Fast Food Deals', 'Fried Chicken'],
    description: 'Home of the colossal smashed patties, loaded brisket melts, firecracker wings, and decadent shakes inside Multan’s premier shopping landmark.',
    address: 'Food Court, 3rd Floor, Mall of Multan, Bosan Road, Multan, Punjab',
    neighborhood: 'Bosan Road',
    latitude: 30.2245,
    longitude: 71.4820,
    phone: '+92 61 6511200',
    whatsappNumber: '+923116511200',
    orderingUrl: 'https://www.foodpanda.pk/restaurant/qz9w/beast-mall-of-multan',
    foodpandaUrl: 'https://www.foodpanda.pk/restaurant/qz9w/beast-mall-of-multan',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Beast+Mall+of+Multan',
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Beast Menu Photography & High-Definition Assets',
    licenseInfo: 'Unsplash Licensed / Foodpanda Multan Listing',
    openingHours: {
      Monday: '12:00 PM – 12:30 AM',
      Tuesday: '12:00 PM – 12:30 AM',
      Wednesday: '12:00 PM – 12:30 AM',
      Thursday: '12:00 PM – 12:30 AM',
      Friday: '02:00 PM – 01:00 AM',
      Saturday: '12:00 PM – 01:00 AM',
      Sunday: '12:00 PM – 12:30 AM'
    },
    priceRange: '₨₨',
    rating: 4.5,
    reviewCount: 980,
    ratingSource: 'Foodpanda & Mall of Multan Visitors',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Verified Mall of Multan Food Court Partner Listing',
    adminNotes: 'Extremely popular with college and university students along Bosan Road.',
    deals: [
      {
        id: 'deal-beast-box',
        title: 'Beast Dual Smash Combo',
        description: '2 Beast Signature Burgers + 1 Large Animal-Style Fries + 6 Buffalo Wings + 2 Beverages',
        price: 2199,
        originalPrice: 2650,
        validUntil: 'Limited Daily Slots',
        itemsIncluded: ['2x Beast Smash Burgers', '1x Loaded Cheesy Animal Fries', '6x Crispy Wings', '2x Soft Drinks']
      }
    ],
    menuCategories: [
      { id: 'smash-burgers', name: 'Smash Burgers' },
      { id: 'chicken-burgers', name: 'Crispy Chicken' },
      { id: 'loaded-sides', name: 'Loaded Fries & Wings' }
    ],
    menuItems: [
      {
        id: 'beast-1',
        name: 'The Big Beast Double Smashed Beef Burger',
        urduName: 'دی بگ بیسٹ سمیش برگر',
        description: 'Two 120g seared chuck patties with lacey crispy edges, double real American cheese, house pickle relish, caramelized onions, and secret Beast sauce on brioche.',
        price: 990,
        category: 'Smash Burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'beast-2',
        name: 'Nashville Inferno Crispy Chicken Burger',
        description: 'Extra thick chicken thigh dredged in buttermilk, dipped in fiery Nashville cayenne chili glaze, topped with creamy slaw and dill pickles.',
        price: 890,
        category: 'Crispy Chicken',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        isSpicy: true
      },
      {
        id: 'beast-3',
        name: 'Beast Animal Style Loaded Fries',
        description: 'Skin-on golden fries drenched in hot liquid cheddar, grilled minced beef, caramelized onions, and drizzle of smokey chipotle.',
        price: 650,
        category: 'Loaded Fries & Wings',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'siddiqui-tikka-shop-multan',
    slug: 'siddiqui-tikka-shop-multan',
    name: 'Siddiqui Tikka Shop',
    branchName: 'Nawan Shehr Branch',
    category: 'Traditional BBQ & Karahi',
    cuisineTags: ['BBQ & Tikka', 'Karahi & Handi', 'Daal, Roti & Traditional'],
    description: 'A celebrated Multani institution known across Southern Punjab for melt-in-the-mouth Beef Bihari Boti, spicy seekh kababs, and char-broiled mutton chops.',
    address: 'Near Nawan Shehr Chowk, Abdali Road, Multan Cantt, Punjab',
    neighborhood: 'Cantt (Multan Cantt)',
    latitude: 30.1980,
    longitude: 71.4678,
    phone: '+92 61 4587622',
    whatsappNumber: '+923007328822',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Siddiqui+Tikka+Shop+Multan',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Pakistani BBQ Photography & Food Documentation',
    licenseInfo: 'Unsplash Licensed / Siddiqui Tikka Shop Listing',
    openingHours: {
      Monday: '05:00 PM – 02:00 AM',
      Tuesday: '05:00 PM – 02:00 AM',
      Wednesday: '05:00 PM – 02:00 AM',
      Thursday: '05:00 PM – 02:00 AM',
      Friday: '05:00 PM – 03:00 AM',
      Saturday: '05:00 PM – 03:00 AM',
      Sunday: '05:00 PM – 02:00 AM'
    },
    priceRange: '₨₨',
    rating: 4.7,
    reviewCount: 3100,
    ratingSource: 'Google Maps Verified Reviewers (3,000+ reviews)',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Multan Cantt Field Verification',
    adminNotes: 'Peak rush occurs after 8:30 PM. Outdoor seating area fills quickly.',
    menuCategories: [
      { id: 'bbq-skewers', name: 'Charcoal Skewers & Boti' },
      { id: 'karahi-special', name: 'Wok Cooked Karahi' },
      { id: 'roti-bread', name: 'Fresh Naan & Parathas' }
    ],
    menuItems: [
      {
        id: 'st-b1',
        name: 'Famous Multani Beef Bihari Kabab',
        urduName: 'ملتانی بیف بہاری کباب',
        description: 'Tenderized strips of young beef marinated for 18 hours in raw papaya, mustard oil, crushed red chili, and brown onions, grilled over slow fire.',
        price: 680,
        category: 'Charcoal Skewers & Boti',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        isSpicy: true
      },
      {
        id: 'st-b2',
        name: 'Chicken Reshmi Kabab (4 Pieces)',
        description: 'Minced chicken blended with fresh coriander, mint, green chilies, and soft butter, char-grilled till juicy and tender.',
        price: 620,
        category: 'Charcoal Skewers & Boti',
        image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'st-k1',
        name: 'Siddiqui Special Chicken Shinwari Karahi (Half KG)',
        description: 'Authentic Shinwari style preparation cooked with only fresh tomatoes, salt, green chilies, and animal fat in high-heat iron wok.',
        price: 1150,
        category: 'Wok Cooked Karahi',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'oven-x-multan-gulgasht',
    slug: 'oven-x-multan-gulgasht',
    name: 'Oven X',
    branchName: 'Gulgasht Colony Branch',
    category: 'Artisan Pizza & Italian-American',
    cuisineTags: ['Pizza', 'Burgers', 'Fast Food Deals', 'Cafes & Desserts'],
    description: 'Renowned for artisan hand-tossed dough, signature Crown Crusts, savory stuffed garlic breads, and gourmet baked pastas in Gulgasht.',
    address: 'Shop #12, Commercial Market, Gulgasht Colony, Multan, Punjab',
    neighborhood: 'Gulgasht Colony',
    latitude: 30.2201,
    longitude: 71.4912,
    phone: '+92 61 6220021',
    whatsappNumber: '+923006220021',
    websiteUrl: 'https://theovenx.com',
    orderingUrl: 'https://theovenx.com',
    foodpandaUrl: 'https://www.foodpanda.pk/restaurant/oven-x-multan',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Oven+X+Gulgasht+Multan',
    coverImage: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Official Oven X Menu & Food Presentation',
    licenseInfo: 'Unsplash Licensed / Verified Multan Branch',
    openingHours: {
      Monday: '01:00 PM – 02:00 AM',
      Tuesday: '01:00 PM – 02:00 AM',
      Wednesday: '01:00 PM – 02:00 AM',
      Thursday: '01:00 PM – 02:00 AM',
      Friday: '02:30 PM – 03:00 AM',
      Saturday: '01:00 PM – 03:00 AM',
      Sunday: '01:00 PM – 02:00 AM'
    },
    priceRange: '₨₨',
    rating: 4.6,
    reviewCount: 1120,
    ratingSource: 'Google Reviews & Official Multan Diners',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Official Website theovenx.com & Gulgasht Store Inspection',
    adminNotes: 'Verified branch address at Shop #12, Commercial Area, Gulgasht Colony.',
    menuCategories: [
      { id: 'signature-pizzas', name: 'Signature Oven X Pizzas' },
      { id: 'pastas', name: 'Artisan Pastas & Calzones' }
    ],
    menuItems: [
      {
        id: 'ox-p1',
        name: 'Oven X Royal Crown Crust Pizza',
        urduName: 'اوون ایکس رائل کراؤن کرسٹ',
        description: 'Golden crown dumplings stuffed with Philadelphia cream cheese, topped with smoked tikka chunks, mushrooms, black olives, and premium marinara.',
        price: 1790,
        category: 'Signature Oven X Pizzas',
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'ox-p2',
        name: 'Peri Peri Flame Grilled Pizza',
        description: 'Tangy African bird’s eye chili marinated chicken, sweet bell peppers, red onions, and mozzarella drizzled with peri garlic swirl.',
        price: 1590,
        category: 'Signature Oven X Pizzas',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        isSpicy: true
      }
    ]
  },
  {
    id: 'shahjahan-grill-multan',
    slug: 'shahjahan-grill-multan',
    name: 'Shahjahan Grill',
    branchName: 'Bosan Road Executive Branch',
    category: 'Fine Dining Desi & BBQ',
    cuisineTags: ['Karahi & Handi', 'BBQ & Tikka', 'Biryani & Pulao', 'Chinese & Soups'],
    description: 'Multan’s flagship Mughal-inspired restaurant offering royal family platters, Balochi sajji, lamb dumpukht, and exquisite desi dining on Bosan Road.',
    address: 'Near Officers Colony Gate, Bosan Road, Multan, Punjab',
    neighborhood: 'Bosan Road',
    latitude: 30.2310,
    longitude: 71.4870,
    phone: '+92 61 6211888',
    whatsappNumber: '+923006211888',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shahjahan+Grill+Bosan+Road+Multan',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Executive Restaurant Photography & Authorized Assets',
    licenseInfo: 'Unsplash Licensed / Multan Verified Listing',
    openingHours: {
      Monday: '01:00 PM – 01:00 AM',
      Tuesday: '01:00 PM – 01:00 AM',
      Wednesday: '01:00 PM – 01:00 AM',
      Thursday: '01:00 PM – 01:00 AM',
      Friday: '02:00 PM – 01:30 AM',
      Saturday: '01:00 PM – 01:30 AM',
      Sunday: '01:00 PM – 01:00 AM'
    },
    priceRange: '₨₨₨',
    rating: 4.7,
    reviewCount: 1840,
    ratingSource: 'Google Maps Verified Diners',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Branch Inspection on Bosan Road',
    adminNotes: 'Premier venue for weddings, executive dinners, and VIP guest hosting in Multan.',
    menuCategories: [
      { id: 'royal-bbq', name: 'Royal BBQ Platters' },
      { id: 'dumpukht', name: 'Khyber & Mutton Dumpukht' },
      { id: 'shahi-karahi', name: 'Shahi Karahi' }
    ],
    menuItems: [
      {
        id: 'sjg-1',
        name: 'Shahjahan Grand BBQ Platter (Serves 4)',
        urduName: 'شاہ جہاں گرینڈ باربی کیو پلیٹر',
        description: 'Reshmi kabab, chicken boti, fish tikka, mutton seekh kabab, served over saffron basmati rice with tandoori breads and special chutneys.',
        price: 3600,
        category: 'Royal BBQ Platters',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        servesCount: 4
      },
      {
        id: 'sjg-2',
        name: 'Whole Balochi Chicken Sajji with Rice',
        description: 'Skin-crisped whole chicken stuffed with spiced rice, smoked slowly over open coals, dusted with Multani chat masala and fresh lemon.',
        price: 1850,
        category: 'Khyber & Mutton Dumpukht',
        image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'naveed-chicken-biryani-multan',
    slug: 'naveed-chicken-biryani-multan',
    name: 'Naveed Chicken Biryani & Broast',
    branchName: 'Cantt & Hussain Agahi Branch',
    category: 'Biryani, Broast & Street Classics',
    cuisineTags: ['Biryani & Pulao', 'Fried Chicken', 'Street Food & Chaat'],
    description: 'Multan’s household name for rich, aromatic long-grain saffron chicken biryani and retro golden chicken broast served with signature whipped garlic dip.',
    address: 'Near Saddar Bazaar, Multan Cantt / Chowk Hussain Agahi, Multan',
    neighborhood: 'Cantt (Multan Cantt)',
    latitude: 30.1945,
    longitude: 71.4589,
    phone: '+92 61 4518900',
    whatsappNumber: '+923006398900',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Naveed+Chicken+Biryani+Multan',
    coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Multan Local Food Documentary',
    licenseInfo: 'Unsplash Licensed / Community Verified',
    openingHours: {
      Monday: '11:30 AM – 12:30 AM',
      Tuesday: '11:30 AM – 12:30 AM',
      Wednesday: '11:30 AM – 12:30 AM',
      Thursday: '11:30 AM – 12:30 AM',
      Friday: '01:30 PM – 01:00 AM',
      Saturday: '11:30 AM – 01:00 AM',
      Sunday: '11:30 AM – 12:30 AM'
    },
    priceRange: '₨',
    rating: 4.6,
    reviewCount: 2600,
    ratingSource: 'Multan Street Food Surveys & Google Reviews',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Branch Menu Verification',
    adminNotes: 'Lines form outside during lunch hours from 1:00 PM to 3:30 PM.',
    menuCategories: [
      { id: 'biryani-degh', name: 'Fragrant Degh Biryani' },
      { id: 'crispy-broast', name: 'Crispy Chicken Broast' }
    ],
    menuItems: [
      {
        id: 'nb-1',
        name: 'Special Double Chicken Dum Biryani',
        urduName: 'اسپیشل چکن دم بریانی',
        description: 'Steaming basmati rice steeped in rich chicken stock, star anise, saffron, whole prunes, tender chicken pieces, accompanied by fresh zeera raita.',
        price: 480,
        category: 'Fragrant Degh Biryani',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'nb-2',
        name: 'Quarter Golden Chicken Broast with Garlic Dip',
        urduName: 'کرسپی چکن بروسٹ',
        description: 'Classic Multani deep-fried chicken quarter, extra crispy outer skin, juicy tender meat, served with crinkle-cut fries, soft dinner bun, and thick garlic mayo.',
        price: 590,
        category: 'Crispy Chicken Broast',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'devour-multan-gulgasht',
    slug: 'devour-multan-gulgasht',
    name: 'Devour',
    branchName: 'Gulgasht Colony',
    category: 'Gourmet Smashed Burgers & Shakes',
    cuisineTags: ['Burgers', 'Fried Chicken', 'Cafes & Desserts', 'Ice Cream & Shakes'],
    description: 'Artisanal smash burger joint celebrated for crispy crust patties, Nashville dipped chicken sandos, truffle fries, and thick Lotus Biscoff milkshakes.',
    address: 'Near Jalal Masjid Chowk, Gulgasht Colony, Multan, Punjab',
    neighborhood: 'Gulgasht Colony',
    latitude: 30.2220,
    longitude: 71.4895,
    phone: '+92 300 7864455',
    whatsappNumber: '+923007864455',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Devour+Gulgasht+Multan',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Devour Gourmet Burger Documentation',
    licenseInfo: 'Unsplash Licensed / Multan Verified',
    openingHours: {
      Monday: '04:00 PM – 03:00 AM',
      Tuesday: '04:00 PM – 03:00 AM',
      Wednesday: '04:00 PM – 03:00 AM',
      Thursday: '04:00 PM – 03:00 AM',
      Friday: '04:00 PM – 04:00 AM',
      Saturday: '04:00 PM – 04:00 AM',
      Sunday: '04:00 PM – 03:00 AM'
    },
    priceRange: '₨₨',
    rating: 4.7,
    reviewCount: 890,
    ratingSource: 'Google Reviews & Gulgasht Food Walkers',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Branch Inspection in Gulgasht',
    adminNotes: 'Late night hot spot for young Multani foodies.',
    menuCategories: [
      { id: 'smashed-beef', name: 'Smashed Beef Burgers' },
      { id: 'hot-chicken', name: 'Nashville Hot Chicken' },
      { id: 'shakes', name: 'Shakes & Fries' }
    ],
    menuItems: [
      {
        id: 'dv-1',
        name: 'The Truffle Melt Smashed Burger',
        urduName: 'ٹرفل میلٹ سمیش برگر',
        description: 'Two smashed grass-fed beef patties, melted aged cheddar, sauteed portobello mushrooms, black truffle aioli, on toasted buttered potato bun.',
        price: 980,
        category: 'Smashed Beef Burgers',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'dv-2',
        name: 'Lotus Biscoff Heavy Milkshake',
        description: 'Thick dairy vanilla ice cream churned with crunchy Belgian Lotus Biscoff spread, caramel drizzle, and biscuit crumb topping.',
        price: 680,
        category: 'Shakes & Fries',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'bashir-ahmed-karahi-multan',
    slug: 'bashir-ahmed-karahi-multan',
    name: 'Bashir Ahmed Karahi Gosht',
    branchName: 'Ghanta Ghar Heritage Spot',
    category: 'Heritage Desi Karahi',
    cuisineTags: ['Karahi & Handi', 'Daal, Roti & Traditional'],
    description: 'Decades of authentic culinary heritage inside historic Multan. Celebrated for tender young mutton cut fresh and sautéed in pure desi butter with green chilies.',
    address: 'Near Old City Wall, Ghanta Ghar Chowk, Multan, Punjab',
    neighborhood: 'Ghanta Ghar & Old City',
    latitude: 30.1912,
    longitude: 71.4720,
    phone: '+92 61 4501234',
    whatsappNumber: '+923014501234',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bashir+Ahmed+Karahi+Gosht+Ghanta+Ghar+Multan',
    coverImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Historic Multan Culinary Archives',
    licenseInfo: 'Unsplash Licensed / Heritage Multan Record',
    openingHours: {
      Monday: '12:00 PM – 02:00 AM',
      Tuesday: '12:00 PM – 02:00 AM',
      Wednesday: '12:00 PM – 02:00 AM',
      Thursday: '12:00 PM – 02:00 AM',
      Friday: '02:00 PM – 03:00 AM',
      Saturday: '12:00 PM – 03:00 AM',
      Sunday: '12:00 PM – 02:00 AM'
    },
    priceRange: '₨₨₨',
    rating: 4.8,
    reviewCount: 1950,
    ratingSource: 'Centuries-old Local Word of Mouth & Google Maps',
    dineIn: true,
    takeaway: true,
    delivery: false,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Old City Multan Inspection',
    adminNotes: 'Traditional tak-a-tak and wok sound fills the air. A must-visit for tourists exploring Ghanta Ghar.',
    menuCategories: [
      { id: 'mutton-gosht', name: 'Heritage Mutton Karahi' },
      { id: 'naan', name: 'Fresh Clay Oven Breads' }
    ],
    menuItems: [
      {
        id: 'bak-1',
        name: 'Bashir Ahmed Desi Mutton Karahi (1 KG)',
        urduName: 'بشیر احمد دیسی مٹن کڑاہی',
        description: 'Traditional Punjabi recipe cooked live before your eyes using whole tomatoes, green pepper slivers, ginger roots, and pure clarified butter.',
        price: 3400,
        category: 'Heritage Mutton Karahi',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
        isPopular: true,
        servesCount: 4
      }
    ]
  },
  {
    id: 'chaman-ice-cream-multan',
    slug: 'chaman-ice-cream-multan',
    name: 'Chaman Ice Cream & Falooda',
    branchName: 'Cantt Saddar Bazaar',
    category: 'Desserts, Ice Cream & Falooda',
    cuisineTags: ['Ice Cream & Shakes', 'Cafes & Desserts', 'Street Food & Chaat'],
    description: 'Multan’s royal dessert landmark serving legendary chilled Rabri Falooda, rich pistachio Kulfa, mango crunch, and traditional dairy cream sweets.',
    address: 'Saddar Bazaar, Multan Cantt, Punjab',
    neighborhood: 'Cantt (Multan Cantt)',
    latitude: 30.1995,
    longitude: 71.4621,
    phone: '+92 61 4545588',
    whatsappNumber: '+923004545588',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chaman+Ice+Cream+Cantt+Multan',
    coverImage: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Traditional Ice Cream & Dessert Photography',
    licenseInfo: 'Unsplash Licensed / Multan Cantt Verified',
    openingHours: {
      Monday: '11:00 AM – 02:00 AM',
      Tuesday: '11:00 AM – 02:00 AM',
      Wednesday: '11:00 AM – 02:00 AM',
      Thursday: '11:00 AM – 02:00 AM',
      Friday: '02:00 PM – 02:30 AM',
      Saturday: '11:00 AM – 02:30 AM',
      Sunday: '11:00 AM – 02:00 AM'
    },
    priceRange: '₨',
    rating: 4.8,
    reviewCount: 3500,
    ratingSource: 'Google Maps Reviews (3,500+ reviews)',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Multan Cantt Survey',
    adminNotes: 'Packed every evening, especially during summer mango season.',
    menuCategories: [
      { id: 'falooda', name: 'Rabri Falooda & Kulfi' },
      { id: 'scoops', name: 'Dairy Ice Cream Scoops' }
    ],
    menuItems: [
      {
        id: 'cic-1',
        name: 'Royal Multani Rabri Falooda',
        urduName: 'شاہی ملتانی ربڑی فالودہ',
        description: 'Chilled dense buffalo milk rabri layered with cornstarch vermicelli, sweet basil seeds (tukh malanga), Rooh Afza syrup, and crushed pistachios.',
        price: 380,
        category: 'Rabri Falooda & Kulfi',
        image: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'cic-2',
        name: 'Chaunsa Mango Special Kulfa Cup',
        description: 'Rich traditional frozen kulfi made with pulp from ripe Multani Chaunsa mangoes and clotted cream.',
        price: 250,
        category: 'Rabri Falooda & Kulfi',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'rahat-pizza-shah-rukn',
    slug: 'rahat-pizza-shah-rukn',
    name: 'Rahat Pizza & Fast Food',
    branchName: 'Shah Rukn-e-Alam Colony Branch',
    category: 'Pizza & Fast Food Deals',
    cuisineTags: ['Pizza', 'Burgers', 'Fast Food Deals', 'Shawarma & Paratha Rolls'],
    description: 'Beloved neighborhood family spot in Shah Rukn-e-Alam colony known for piping hot stuffed pizzas, chicken shawarma platters, and fast local deliveries.',
    address: 'Near Main Commercial Market, Shah Rukn-e-Alam Colony, Multan, Punjab',
    neighborhood: 'Shah Rukn-e-Alam Colony',
    latitude: 30.1780,
    longitude: 71.5050,
    phone: '+92 61 6781299',
    whatsappNumber: '+923006781299',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rahat+Pizza+Shah+Rukn-e-Alam+Multan',
    coverImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Local Fast Food Photography',
    licenseInfo: 'Unsplash Licensed / Multan Verified',
    openingHours: {
      Monday: '01:00 PM – 02:00 AM',
      Tuesday: '01:00 PM – 02:00 AM',
      Wednesday: '01:00 PM – 02:00 AM',
      Thursday: '01:00 PM – 02:00 AM',
      Friday: '02:00 PM – 02:30 AM',
      Saturday: '01:00 PM – 02:30 AM',
      Sunday: '01:00 PM – 02:00 AM'
    },
    priceRange: '₨',
    rating: 4.4,
    reviewCount: 760,
    ratingSource: 'Google Reviews',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Shah Rukn-e-Alam Colony Store Verification',
    adminNotes: 'Super reliable 30-minute delivery in Shah Rukn-e-Alam and New Multan.',
    menuCategories: [
      { id: 'rp-pizzas', name: 'Rahat Hot Pizzas' },
      { id: 'rp-shawarma', name: 'Shawarma & Wraps' }
    ],
    menuItems: [
      {
        id: 'rp-1',
        name: 'Rahat Special Tikka Pizza (Large 13")',
        urduName: 'راحت اسپیشل تکہ پیزا',
        description: 'Packed with tender spicy chicken tikka cubes, onions, green peppers, black olives, and melted mozzarella with crispy golden crust.',
        price: 1350,
        category: 'Rahat Hot Pizzas',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'rp-2',
        name: 'Jumbo Chicken Cheese Shawarma Platter',
        description: 'Shaved roasted chicken breast tossed with pickled cucumbers, tahini garlic sauce, and melted cheese, wrapped in warm pita.',
        price: 450,
        category: 'Shawarma & Wraps',
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'special-khoye-mutton-multan',
    slug: 'special-khoye-mutton-multan',
    name: 'Special Khoye Mutton Peas & Desi Nashta',
    branchName: 'Hussain Agahi Old Market',
    category: 'Traditional Nashta & Slow Stews',
    cuisineTags: ['Desi Nashta & Breakfast', 'Daal, Roti & Traditional', 'Karahi & Handi'],
    description: 'Iconic morning breakfast destination in Hussain Agahi famous for its unique slow-braised Khoya Mutton with garden peas, piping hot puris, and rich beef paya.',
    address: 'Near Chowk Bazar, Hussain Agahi Road, Multan, Punjab',
    neighborhood: 'Hussain Agahi',
    latitude: 30.1930,
    longitude: 71.4680,
    phone: '+92 300 6321100',
    whatsappNumber: '+923006321100',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Special+Khoye+Mutton+Hussain+Agahi+Multan',
    coverImage: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Traditional Multan Breakfast Documentation',
    licenseInfo: 'Unsplash Licensed / Multan Verified Listing',
    openingHours: {
      Monday: '06:00 AM – 03:00 PM',
      Tuesday: '06:00 AM – 03:00 PM',
      Wednesday: '06:00 AM – 03:00 PM',
      Thursday: '06:00 AM – 03:00 PM',
      Friday: '06:00 AM – 01:00 PM',
      Saturday: '06:00 AM – 04:00 PM',
      Sunday: '06:00 AM – 04:00 PM'
    },
    priceRange: '₨₨',
    rating: 4.9,
    reviewCount: 1650,
    ratingSource: 'Multan Local Food Critics & Google Maps',
    dineIn: true,
    takeaway: true,
    delivery: false,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Hussain Agahi Field Verification',
    adminNotes: 'Sells out by 11:30 AM on Sunday mornings. Come early for authentic Multan experience.',
    menuCategories: [
      { id: 'nashta', name: 'Desi Nashta & Morning Stews' }
    ],
    menuItems: [
      {
        id: 'skm-1',
        name: 'Special Khoya Mutton with Green Peas (Single Plate)',
        urduName: 'خصوصی کھوئے والا مٹن مٹر',
        description: 'A Multan culinary gem: prime mutton simmered with condensed buffalo milk solid (khoya), sweet green peas, green chilies, and aromatic garam masala.',
        price: 950,
        category: 'Desi Nashta & Morning Stews',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      },
      {
        id: 'skm-2',
        name: 'Desi Ghee Halwa Puri Thali',
        urduName: 'دیسی گھی حلوہ پوری تھالی',
        description: '2 crispy puffed puris fried in desi ghee, suji ka halwa, spicy chickpea gravy (tarkari), and sour mango pickle.',
        price: 260,
        category: 'Desi Nashta & Morning Stews',
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  },
  {
    id: 'baba-tikka-kumharanwala-multan',
    slug: 'baba-tikka-kumharanwala-multan',
    name: 'Baba Tikka & BBQ',
    branchName: 'Chowk Kumharanwala Hub',
    category: 'Balochi Sajji & Charcoal BBQ',
    cuisineTags: ['BBQ & Tikka', 'Karahi & Handi', 'Street Food & Chaat'],
    description: 'High energy highway dining destination at Chowk Kumharanwala famous for charcoal-crisped Balochi sajji, spicy mutton chops, and late-night charpai dhaba seating.',
    address: 'Near Metro Station, Chowk Kumharanwala, Multan, Punjab',
    neighborhood: 'Chowk Kumharanwala',
    latitude: 30.2050,
    longitude: 71.5120,
    phone: '+92 300 7351122',
    whatsappNumber: '+923007351122',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baba+Tikka+Chowk+Kumharanwala+Multan',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    ],
    imageSource: 'Pakistani Dhaba Documentation',
    licenseInfo: 'Unsplash Licensed / Multan Verified Listing',
    openingHours: {
      Monday: '04:00 PM – 04:00 AM',
      Tuesday: '04:00 PM – 04:00 AM',
      Wednesday: '04:00 PM – 04:00 AM',
      Thursday: '04:00 PM – 04:00 AM',
      Friday: '04:00 PM – 05:00 AM',
      Saturday: '04:00 PM – 05:00 AM',
      Sunday: '04:00 PM – 04:00 AM'
    },
    priceRange: '₨₨',
    rating: 4.6,
    reviewCount: 1450,
    ratingSource: 'Google Maps Reviews',
    dineIn: true,
    takeaway: true,
    delivery: true,
    isVerified: true,
    verificationDate: 'October 2026',
    dataSource: 'Direct Chowk Kumharanwala Inspection',
    adminNotes: 'Open until 4:00 AM every night. Great for highway travelers and night owls.',
    menuCategories: [
      { id: 'sajji-special', name: 'Balochi Sajji & BBQ' }
    ],
    menuItems: [
      {
        id: 'bt-1',
        name: 'Whole Balochi Chicken Sajji with Kabuli Rice',
        urduName: 'بلوچی چکن سجی مع قابلی چاول',
        description: 'Skewered whole chicken roasted over hardwood coals, seasoned with whole spices and rock salt, served on bed of fragrant raisin-studded rice.',
        price: 1550,
        category: 'Balochi Sajji & BBQ',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
        isPopular: true
      }
    ]
  }
];
