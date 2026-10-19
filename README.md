# Best Food in Multan (بہترین کھانا ملتان)

The premier food discovery platform and verified restaurant directory for **Multan, Punjab, Pakistan**.

Inspired by modern food platforms like Foodpanda, but built with original branding, zero-commission direct contacts, verified local PKR prices, Google Maps directions, and deep coverage of both beloved local legends and contemporary chains.

---

## 🌟 Key Features

1. **Verified Multan Restaurant Directory**:
   - Seeded with verified Multan establishments:
     - **Al Kaif Pizza & Burger** (Gulgasht Colony)
     - **Beast — Mall of Multan** (Bosan Road)
     - **Al-Quresh Hotel** (Dera Adda / Old Bahawalpur Rd)
     - **Siddiqui Tikka Shop** (Cantt / Nawan Shehr)
     - **Oven X** (Gulgasht Colony, Shop #12)
     - **Shahjahan Grill** (Bosan Road)
     - **Naveed Chicken Biryani & Broast** (Cantt & Hussain Agahi)
     - **Devour** (Gulgasht Colony)
     - **Bashir Ahmed Karahi Gosht** (Ghanta Ghar / Old City)
     - **Chaman Ice Cream & Falooda** (Cantt Saddar Bazaar)
     - **Rahat Pizza & Fast Food** (Shah Rukn-e-Alam Colony)
     - **Special Khoye Mutton Peas & Desi Nashta** (Hussain Agahi)
     - **Baba Tikka & Balochi Sajji** (Chowk Kumharanwala)

2. **Categorized Menus & PKR Prices**:
   - Accurate prices in Pakistani Rupees (`₨`).
   - Size options (Regular, Large, Jumbo) and custom add-ons (extra cheese, garlic dip, portion sizes).
   - Live opening hours checks.

3. **Direct Contact & Zero-Commission Ordering**:
   - **Click-to-Call** for verified landline and mobile numbers.
   - **WhatsApp Order Inquiry Generator**: Automatically formats customer name, Multan delivery address, selected food items, quantities, and totals into a prefilled message sent to the restaurant's WhatsApp.
   - **Direct Demo Checkout**: Simulates instant order confirmation with a live Multan kitchen tracking timeline.

4. **Location & Google Maps Integration**:
   - One-click Google Maps pinpoint directions for each branch.
   - Built-in Interactive Multan Food Navigator Map with clickable pins.
   - Neighborhood filters covering Gulgasht Colony, Bosan Road, Cantt, Mumtazabad, Shah Rukn-e-Alam, Ghanta Ghar, Hussain Agahi, DHA Multan, Chowk Kumharanwala, Wapda Town, and more.

5. **Local Food Guides & Landings**:
   - Top 7 Best Burgers in Multan
   - Ultimate Guide to Best Pizza in Multan
   - Best BBQ in Multan
   - Iconic Desi Karahi Spots in Multan
   - Food Places in Gulgasht
   - Top Restaurants on Bosan Road

6. **Full Admin Management**:
   - Protected admin portal (Default PIN: `multan2026`).
   - Add/edit restaurants, upload cover photos, update menus and hours.
   - Approve public submissions from Multan restaurant owners.
   - Review reported error corrections (e.g. changed numbers, updated prices).
   - Export and import directory backups via JSON.

---

## 🚀 Netlify Deployment Guide

This project is fully configured for Netlify:

### Method 1: Netlify Git Integration
1. Push this codebase to GitHub, GitLab, or Bitbucket.
2. Log in to [Netlify](https://app.netlify.com).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select your repository.
5. Netlify will automatically detect configuration from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**.

### Method 2: Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 🗄️ Optional Supabase Integration

To connect a persistent remote database in the future:
1. Create a project at [Supabase](https://supabase.com).
2. Create a `restaurants` table matching the JSON schema in `src/types/index.ts`.
3. Set your environment variables in Netlify (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
4. Replace local storage reads in `src/context/DataContext.tsx` with Supabase client queries.

---

## 📝 SEO & AdSense Readiness
- OpenGraph & Twitter Cards configured in `index.html`.
- Schema.org JSON-LD structured data included.
- `public/robots.txt` and `public/sitemap.xml` generated.
- Editorial and copyright disclosures ready.
