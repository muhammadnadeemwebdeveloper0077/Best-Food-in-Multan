import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, PlusCircle, CheckCircle2 } from 'lucide-react';

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({ isOpen, onClose }) => {
  const { submitRestaurant, neighborhoods, categories } = useData();

  const [restaurantName, setRestaurantName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [neighborhood, setNeighborhood] = useState('Gulgasht Colony');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cuisine, setCuisine] = useState('Pizza & Fast Food');
  const [menuOrWebsiteUrl, setMenuOrWebsiteUrl] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterContact, setSubmitterContact] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName || !address || !phone || !submitterName) {
      alert('Please fill in the required fields.');
      return;
    }

    submitRestaurant({
      restaurantName,
      branchName: branchName || 'Main Branch',
      neighborhood,
      address,
      phone,
      cuisine,
      menuOrWebsiteUrl,
      submitterName,
      submitterContact
    });

    setSubmittedSuccess(true);
  };

  const handleResetAndClose = () => {
    setSubmittedSuccess(false);
    setRestaurantName('');
    setBranchName('');
    setAddress('');
    setPhone('');
    setMenuOrWebsiteUrl('');
    setSubmitterName('');
    setSubmitterContact('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-auto animate-in fade-in zoom-in-95">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Restaurant Submitted!</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Thank you for contributing to <strong>Best Food in Multan</strong>. Our local directory team will verify the phone number, branch address, and menu before publishing.
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-[#F97316] text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#EA580C] flex items-center justify-center">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-stone-900">Submit a Multan Restaurant</h3>
                <p className="text-xs text-stone-500">
                  Are you a restaurant owner or passionate diner? Add your favorite food spot.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Restaurant Name *</label>
                <input
                  type="text"
                  required
                  value={restaurantName}
                  onChange={e => setRestaurantName(e.target.value)}
                  placeholder="e.g. Al Kaif, Siddiqui Tikka, Baba G Karahi..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Branch Name</label>
                <input
                  type="text"
                  value={branchName}
                  onChange={e => setBranchName(e.target.value)}
                  placeholder="e.g. Gulgasht, Cantt, Bosan Rd..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Multan Area *</label>
                <select
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                >
                  {neighborhoods.map(nh => (
                    <option key={nh.id} value={nh.name}>{nh.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Full Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Shop number, plaza, street, landmark in Multan..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Cuisine / Food Category</label>
                <select
                  value={cuisine}
                  onChange={e => setCuisine(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Website or Menu Link (Optional)</label>
                <input
                  type="url"
                  value={menuOrWebsiteUrl}
                  onChange={e => setMenuOrWebsiteUrl(e.target.value)}
                  placeholder="https://facebook.com/..., foodpanda link, or website"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={submitterName}
                  onChange={e => setSubmitterName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Your Email or Phone *</label>
                <input
                  type="text"
                  required
                  value={submitterContact}
                  onChange={e => setSubmitterContact(e.target.value)}
                  placeholder="For verification queries"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Submit Listing for Verification
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
