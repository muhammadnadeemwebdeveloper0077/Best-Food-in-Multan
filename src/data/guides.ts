import { FoodGuide } from '../types';

export const MULTAN_FOOD_GUIDES: FoodGuide[] = [
  {
    id: 'guide-burgers',
    slug: 'best-burgers-in-multan',
    title: 'Top 7 Best Burgers in Multan: From Smashed Patties to Zinger Crushes',
    subtitle: 'Where to find juicy beef patties, fiery Nashville crunch, and iconic student zingers.',
    badge: 'Burger Enthusiasts',
    heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    categoryFilter: 'Burgers',
    intro: 'Multan’s burger landscape has evolved beyond classic canteen buns into a competitive gourmet playground. Whether you are craving the crispy lacy edges of a smash burger at Beast (Mall of Multan) or Devour (Gulgasht), or looking for the legendary towering Zinger at Al Kaif, here is your definitive city guide.',
    recommendedRestaurantIds: ['beast-mall-of-multan', 'devour-multan-gulgasht', 'al-kaif-pizza-burger-gulgasht'],
    insiderTips: [
      'For authentic smashed patties with melted American cheese, visit Devour or Beast after 7:00 PM.',
      'Al Kaif’s Tower Zinger is famous for holding crunch even after delivery across Gulgasht and Bosan Road.',
      'Always ask for extra chipotle mayo on the side.'
    ]
  },
  {
    id: 'guide-pizza',
    slug: 'best-pizza-in-multan',
    title: 'The Ultimate Guide to Best Pizza in Multan: Crown Crusts & Deep Dish',
    subtitle: 'Crispy edges, generous cheese pulls, and spicy Pakistani-Italian fusions.',
    badge: 'Pizza Crawl',
    heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    categoryFilter: 'Pizza',
    intro: 'Multanis take their pizza seriously — especially stuffed crown crusts and fiery chicken tikka toppings. From the artisan stone-baked crusts of Oven X on Commercial Market to Al Kaif’s legendary student deals, here is where to order your next pie.',
    recommendedRestaurantIds: ['al-kaif-pizza-burger-gulgasht', 'oven-x-multan-gulgasht', 'rahat-pizza-shah-rukn'],
    insiderTips: [
      'Oven X’s Royal Crown Crust fills the outer crust with garlic herb cream cheese dumplings.',
      'Al Kaif’s family deals give the best value-to-taste ratio in the entire city.',
      'Pair your pizza with loaded curly fries from Oven X or cheesy garlic bread.'
    ]
  },
  {
    id: 'guide-bbq',
    slug: 'best-bbq-in-multan',
    title: 'Best BBQ in Multan: Smoky Bihari Boti, Tender Sajji & Seekh Kababs',
    subtitle: 'From Cantt’s historic charcoal pits to lively open-air dhabas at Chowk Kumharanwala.',
    badge: 'Meat Lovers',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    categoryFilter: 'BBQ & Tikka',
    intro: 'There is nothing quite like the scent of burning coal and sizzling spiced meat along Abdali Road in Multan Cantt. Siddiqui Tikka Shop has stood as an unshakeable monument for over three decades, while Shahjahan Grill elevates BBQ into an opulent Mughal feast.',
    recommendedRestaurantIds: ['siddiqui-tikka-shop-multan', 'shahjahan-grill-multan', 'baba-tikka-kumharanwala-multan'],
    insiderTips: [
      'Siddiqui Tikka Shop’s Beef Bihari Boti melts like butter — order it with their tandoori paratha.',
      'For family gatherings with elderly guests, Shahjahan Grill on Bosan Road provides the most comfortable indoor setting.',
      'Balochi Sajji at Baba Tikka Kumharanwala is cooked fresh on order; expect a 25-minute wait that is well worth it.'
    ]
  },
  {
    id: 'guide-karahi',
    slug: 'desi-karahi-spots-multan',
    title: 'Iconic Desi Karahi Spots in Multan: Cooked Live in Pure Desi Ghee',
    subtitle: 'Centuries-old iron wok recipes that define Southern Punjab hospitality.',
    badge: 'Desi Heritage',
    heroImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    categoryFilter: 'Karahi & Handi',
    intro: 'In Multan, karahi is an art form. It begins by choosing your fresh cut of local sheep or goat, weighed live before you, and prepared in seasoned cast iron woks using only fresh tomatoes, hand-pounded black pepper, ginger, and desi butter.',
    recommendedRestaurantIds: ['al-quresh-hotel-multan', 'bashir-ahmed-karahi-multan'],
    insiderTips: [
      'Always request "Kam Mirch, Ziada Tamatar" (mild chili, extra tomato gravy) if dining with children.',
      'Al-Quresh Hotel’s Dera Adda branch serves the freshest cuts between 1:00 PM and 11:00 PM.',
      'Dip hot Roghani Naan sprinkled with Kalonji straight into the sizzling wok oil.'
    ]
  },
  {
    id: 'guide-gulgasht',
    slug: 'food-places-in-gulgasht',
    title: 'Food Places in Gulgasht: Multan’s Vibrant Midnight Food Hub',
    subtitle: 'From Goal Bagh cafes to Jalal Masjid food streets, explore the city’s busiest food strip.',
    badge: 'Area Spotlight',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    neighborhoodFilter: 'Gulgasht Colony',
    intro: 'Gulgasht Colony never sleeps. By sunset, students from nearby campuses, families, and evening strollers flock to the restaurants lining Jalal Masjid Road, Goal Bagh, and the commercial avenues. Whether you crave pizza, smash burgers, or wraps, Gulgasht has it all.',
    recommendedRestaurantIds: ['al-kaif-pizza-burger-gulgasht', 'devour-multan-gulgasht', 'oven-x-multan-gulgasht'],
    insiderTips: [
      'Parking near Goal Bagh can be tight between 8 PM and 10 PM on weekends; opt for motorbike or ride-hailing.',
      'Late-night cravings: Most kitchens stay open until 3:00 AM on Friday and Saturday.'
    ]
  },
  {
    id: 'guide-bosan-road',
    slug: 'restaurants-on-bosan-road',
    title: 'Top Restaurants on Bosan Road: Mall Dining, Cafes & Family Halls',
    subtitle: 'The grand thoroughfare connecting BZU, Mall of Multan, and Officers Colony.',
    badge: 'Corridor Guide',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    neighborhoodFilter: 'Bosan Road',
    intro: 'Bosan Road represents modern Multan. Home to Mall of Multan, upscale gated communities, and major university crowds, this stretch hosts the biggest franchise outlets and the most lavish family banquet restaurants in the city.',
    recommendedRestaurantIds: ['beast-mall-of-multan', 'shahjahan-grill-multan'],
    insiderTips: [
      'Mall of Multan’s 3rd floor food court is the ideal refuge on hot summer afternoons.',
      'Shahjahan Grill offers valet parking and dedicated family halls for privacy.'
    ]
  }
];
