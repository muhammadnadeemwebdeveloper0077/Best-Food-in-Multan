import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Mail, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onSelectArea: (area: string) => void;
  onSelectCategory: (cat: string) => void;
  onOpenAddRestaurant: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectArea,
  onSelectCategory,
  onOpenAddRestaurant,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-[#191919] text-white pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Multan Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" className="[&_span]:text-white [&_span.text-stone-500]:text-stone-400" />
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier independent food discovery guide and restaurant directory for Multan, Pakistan.
              Helping families, students, and travelers discover authentic desi karahi, fast food, artisan pizza, BBQ, and street food gems with verified PKR menus and direct contacts.
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> Multan, Punjab, PK
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Listings
              </span>
            </div>
          </div>

          {/* Col 2: Multan Neighborhoods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Popular Areas
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {['Gulgasht Colony', 'Bosan Road', 'Cantt (Multan Cantt)', 'Mumtazabad', 'Shah Rukn-e-Alam Colony', 'Ghanta Ghar & Old City', 'Hussain Agahi', 'DHA Multan'].map(area => (
                <li key={area}>
                  <button
                    onClick={() => {
                      onSelectArea(area);
                      window.scrollTo({ top: 750, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F97316] transition-colors text-left"
                  >
                    {area} Food
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cuisines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Top Cuisines
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {['Karahi & Handi', 'BBQ & Tikka', 'Pizza', 'Burgers', 'Biryani & Pulao', 'Fried Chicken & Broast', 'Desi Nashta & Breakfast', 'Ice Cream & Falooda'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 750, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F97316] transition-colors text-left"
                  >
                    {cat} in Multan
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform & Owner Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              For Restaurants & Users
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenAddRestaurant}
                  className="text-[#F97316] hover:underline font-semibold text-left"
                >
                  + Add Your Multan Restaurant
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-stone-200 transition-colors text-left"
                >
                  Admin Portal (PIN: multan2026)
                </button>
              </li>
              <li>
                <span className="text-stone-500">Contact: muhammadnadeemwebdeveloper@gmail.com</span>
              </li>
              <li className="pt-2">
                <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 text-[11px] text-stone-300">
                  <strong className="text-white block mb-0.5">Zero-Commission Direct Orders</strong>
                  We connect Multan foodies directly to restaurants via verified phone & WhatsApp links.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense & Editorial Disclosure Box */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 leading-relaxed space-y-2">
          <div className="font-bold text-stone-300 uppercase tracking-wider text-[10px]">
            Editorial, Copyright & Advertising Disclosure
          </div>
          <p>
            <strong>Best Food in Multan</strong> is an independent food discovery platform. All brand names, restaurant names, and trademarks belong to their respective proprietors. Food imagery is sourced from authorized listings, local food photography, and open-source licenses. Menus, operating hours, and prices in PKR are regularly verified through direct branch visits and publicly available ordering portals.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Best Food in Multan. All rights reserved. Made for the historic City of Saints.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Use</span>
            <span>•</span>
            <span>Corrections Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
