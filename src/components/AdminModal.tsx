import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Restaurant, RestaurantSubmission, ErrorReport } from '../types';
import {
  X,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  Building,
  FileText
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    restaurants,
    submissions,
    errorReports,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    toggleRestaurantVerification,
    updateSubmissionStatus,
    updateReportStatus,
    resetToDefaults,
    exportDataAsJson,
    importDataFromJson,
    neighborhoods,
    categories
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'restaurants' | 'add' | 'submissions' | 'reports' | 'data'>('restaurants');

  // Form state for adding/editing restaurant
  const [editingRestaurantId, setEditingRestaurantId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formBranch, setFormBranch] = useState('');
  const [formCategory, setFormCategory] = useState('Pizza & Fast Food');
  const [formNeighborhood, setFormNeighborhood] = useState('Gulgasht Colony');
  const [formAddress, setFormAddress] = useState('');
  const [formPhone, setFormPhone] = useState('+92 61 ');
  const [formWhatsApp, setFormWhatsApp] = useState('+92 300 ');
  const [formCoverImage, setFormCoverImage] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80');
  const [formDescription, setFormDescription] = useState('');
  const [formRating, setFormRating] = useState('4.6');
  const [formReviews, setFormReviews] = useState('250');
  const [formPriceRange, setFormPriceRange] = useState<'₨' | '₨₨' | '₨₨₨'>('₨₨');

  // JSON Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'multan2026' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN code. Default PIN is multan2026');
    }
  };

  const handleSaveRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAddress.trim()) {
      alert('Please fill out the restaurant name and street address.');
      return;
    }

    if (editingRestaurantId) {
      const existing = restaurants.find(r => r.id === editingRestaurantId);
      if (existing) {
        const updated: Restaurant = {
          ...existing,
          name: formName,
          branchName: formBranch || 'Main Branch',
          category: formCategory,
          neighborhood: formNeighborhood,
          address: formAddress,
          phone: formPhone,
          whatsappNumber: formWhatsApp,
          coverImage: formCoverImage,
          description: formDescription,
          rating: parseFloat(formRating) || 4.5,
          reviewCount: parseInt(formReviews, 10) || 100,
          priceRange: formPriceRange as any,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${formName} ${formNeighborhood} Multan`
          )}`
        };
        updateRestaurant(updated);
      }
    } else {
      const newRest: Omit<Restaurant, 'id'> = {
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6),
        name: formName,
        branchName: formBranch || 'Main Branch',
        category: formCategory,
        cuisineTags: [formCategory.split('&')[0].trim()],
        description: formDescription || `Authentic food point in ${formNeighborhood}, Multan.`,
        address: formAddress,
        neighborhood: formNeighborhood,
        latitude: 30.2000,
        longitude: 71.4800,
        phone: formPhone,
        whatsappNumber: formWhatsApp,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${formName} ${formNeighborhood} Multan`
        )}`,
        coverImage: formCoverImage,
        galleryImages: [formCoverImage],
        imageSource: 'Direct Multan Restaurant Upload',
        licenseInfo: 'Authorized Food Photography',
        openingHours: {
          Monday: '12:00 PM – 02:00 AM',
          Tuesday: '12:00 PM – 02:00 AM',
          Wednesday: '12:00 PM – 02:00 AM',
          Thursday: '12:00 PM – 02:00 AM',
          Friday: '02:00 PM – 03:00 AM',
          Saturday: '12:00 PM – 03:00 AM',
          Sunday: '12:00 PM – 02:00 AM'
        },
        priceRange: formPriceRange as any,
        rating: parseFloat(formRating) || 4.5,
        reviewCount: parseInt(formReviews, 10) || 50,
        ratingSource: 'Google Maps & Multan Diners',
        dineIn: true,
        takeaway: true,
        delivery: true,
        isVerified: true,
        verificationDate: 'October 2026',
        dataSource: 'Admin Direct Verification',
        menuCategories: [{ id: 'main', name: 'Specialties' }],
        menuItems: [
          {
            id: `item-${Date.now()}-1`,
            name: `${formName} Signature Dish`,
            description: 'Freshly prepared specialty using local Multan spices.',
            price: 750,
            category: 'Specialties',
            image: formCoverImage,
            isPopular: true
          }
        ]
      };
      addRestaurant(newRest);
    }

    // Reset form
    setEditingRestaurantId(null);
    setFormName('');
    setFormBranch('');
    setFormAddress('');
    setFormDescription('');
    setActiveTab('restaurants');
  };

  const handleStartEdit = (r: Restaurant) => {
    setEditingRestaurantId(r.id);
    setFormName(r.name);
    setFormBranch(r.branchName);
    setFormCategory(r.category);
    setFormNeighborhood(r.neighborhood);
    setFormAddress(r.address);
    setFormPhone(r.phone);
    setFormWhatsApp(r.whatsappNumber || '');
    setFormCoverImage(r.coverImage);
    setFormDescription(r.description);
    setFormRating(r.rating.toString());
    setFormReviews(r.reviewCount.toString());
    setFormPriceRange(r.priceRange as any);
    setActiveTab('add');
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `best-food-in-multan-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExecuteImport = () => {
    if (!importJsonText.trim()) return;
    const res = importDataFromJson(importJsonText);
    setImportResult(res);
  };

  const handleApproveSubmission = (sub: RestaurantSubmission) => {
    addRestaurant({
      slug: sub.restaurantName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6),
      name: sub.restaurantName,
      branchName: sub.branchName || 'Main Branch',
      category: sub.cuisine || 'Fast Food & Desi',
      cuisineTags: [sub.cuisine || 'Desi'],
      description: `Newly approved local spot in ${sub.neighborhood}, Multan.`,
      address: sub.address,
      neighborhood: sub.neighborhood,
      latitude: 30.2000,
      longitude: 71.4800,
      phone: sub.phone,
      whatsappNumber: sub.phone,
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${sub.restaurantName} ${sub.neighborhood} Multan`
      )}`,
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [],
      imageSource: 'Community Submitted & Approved',
      licenseInfo: 'Pending Photo Submission',
      openingHours: {
        Monday: '12:00 PM – 02:00 AM',
        Tuesday: '12:00 PM – 02:00 AM',
        Wednesday: '12:00 PM – 02:00 AM',
        Thursday: '12:00 PM – 02:00 AM',
        Friday: '02:00 PM – 03:00 AM',
        Saturday: '12:00 PM – 03:00 AM',
        Sunday: '12:00 PM – 02:00 AM'
      },
      priceRange: '₨₨',
      rating: 4.5,
      reviewCount: 15,
      ratingSource: 'Newly Listed Multan Spot',
      dineIn: true,
      takeaway: true,
      delivery: true,
      isVerified: true,
      verificationDate: 'October 2026',
      dataSource: 'Verified Community Submission',
      menuCategories: [{ id: 'menu-1', name: 'Main Menu' }],
      menuItems: [
        {
          id: `sub-item-${Date.now()}`,
          name: `${sub.restaurantName} Special`,
          description: 'Popular house preparation.',
          price: 650,
          category: 'Main Menu',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          isPopular: true
        }
      ]
    });
    updateSubmissionStatus(sub.id, 'approved');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">Multan Directory Administration</h3>
              <p className="text-xs text-stone-400">
                Manage verified restaurants, menus, user submissions, and error reports
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-stone-900">Protected Admin Area</h4>
              <p className="text-xs text-stone-500 mt-1">
                Enter your administrative PIN to manage Best Food in Multan.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. multan2026)"
                  className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                />
                {pinError && <p className="text-xs text-red-500 mt-1">{pinError}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-md cursor-pointer"
                >
                  Unlock Admin Portal
                </button>
              </div>

              {/* Quick test convenience note */}
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs text-stone-500">
                Demo Admin Code: <strong className="text-stone-800">multan2026</strong>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex border-b border-stone-200 bg-[#FFF9F2] px-6 pt-3 gap-2 overflow-x-auto">
              {[
                { id: 'restaurants', label: `Restaurants (${restaurants.length})`, icon: Building },
                { id: 'add', label: editingRestaurantId ? 'Edit Restaurant' : '+ Add Restaurant', icon: Plus },
                { id: 'submissions', label: `Submissions (${submissions.length})`, icon: FileText },
                { id: 'reports', label: `Error Reports (${errorReports.length})`, icon: AlertTriangle },
                { id: 'data', label: 'Backup & Seed', icon: Download }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-[#F97316] text-[#EA580C]'
                        : 'border-transparent text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* 1. Restaurants List */}
              {activeTab === 'restaurants' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      Click edit to update details, or toggle verified status.
                    </span>
                    <button
                      onClick={() => {
                        setEditingRestaurantId(null);
                        setFormName('');
                        setFormBranch('');
                        setActiveTab('add');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#F97316] text-white text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add New
                    </button>
                  </div>

                  <div className="space-y-2">
                    {restaurants.map(rest => (
                      <div
                        key={rest.id}
                        className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-orange-300 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={rest.coverImage}
                            alt={rest.name}
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-stone-900">{rest.name}</span>
                              <button
                                onClick={() => toggleRestaurantVerification(rest.id)}
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold cursor-pointer ${
                                  rest.isVerified
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-stone-200 text-stone-600'
                                }`}
                              >
                                {rest.isVerified ? '✓ Verified' : 'Unverified'}
                              </button>
                            </div>
                            <div className="text-xs text-stone-500">
                              {rest.neighborhood} • {rest.category} • {rest.menuItems.length} menu items
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(rest)}
                            className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${rest.name}?`)) {
                                deleteRestaurant(rest.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Add / Edit Form */}
              {activeTab === 'add' && (
                <form onSubmit={handleSaveRestaurant} className="space-y-4 max-w-2xl">
                  <h4 className="font-bold text-sm text-stone-900">
                    {editingRestaurantId ? 'Edit Restaurant Listing' : 'Add New Restaurant to Multan Directory'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Restaurant Name *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder="e.g. Al Kaif, Devour, Bashir Karahi..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Branch Name</label>
                      <input
                        type="text"
                        value={formBranch}
                        onChange={e => setFormBranch(e.target.value)}
                        placeholder="e.g. Gulgasht Branch, Cantt Saddar..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Cuisine Category *</label>
                      <select
                        value={formCategory}
                        onChange={e => setFormCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Multan Neighborhood *</label>
                      <select
                        value={formNeighborhood}
                        onChange={e => setFormNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      >
                        {neighborhoods.map(nh => (
                          <option key={nh.id} value={nh.name}>{nh.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-stone-700 block mb-1">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={formAddress}
                        onChange={e => setFormAddress(e.target.value)}
                        placeholder="Shop #, Commercial Market, Road..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-stone-700 block mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={formPhone}
                        onChange={e => setFormPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-stone-700 block mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={formWhatsApp}
                        onChange={e => setFormWhatsApp(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-stone-700 block mb-1">Cover Image URL</label>
                      <input
                        type="url"
                        value={formCoverImage}
                        onChange={e => setFormCoverImage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-stone-700 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={formDescription}
                        onChange={e => setFormDescription(e.target.value)}
                        placeholder="Specialties, history, ambiance..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#F97316] text-white font-bold text-xs hover:bg-[#EA580C] shadow-md cursor-pointer"
                    >
                      {editingRestaurantId ? 'Save Changes' : 'Publish Restaurant to Directory'}
                    </button>
                    {editingRestaurantId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRestaurantId(null);
                          setActiveTab('restaurants');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold text-xs"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* 3. Submissions */}
              {activeTab === 'submissions' && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-500">
                    Review food spot suggestions submitted by Multani restaurant owners and customers.
                  </p>
                  {submissions.length === 0 ? (
                    <div className="p-8 text-center text-xs text-stone-400">No pending submissions.</div>
                  ) : (
                    submissions.map(sub => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-2xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-sm text-stone-900">{sub.restaurantName}</div>
                          <div className="text-stone-500">{sub.neighborhood} • {sub.cuisine}</div>
                          <div className="text-stone-600 mt-1">Address: {sub.address} | Phone: {sub.phone}</div>
                          <div className="text-stone-400 text-[10px] mt-0.5">
                            Submitted by: {sub.submitterName} ({sub.submitterContact})
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {sub.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleApproveSubmission(sub)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                              >
                                Approve & Publish
                              </button>
                              <button
                                onClick={() => updateSubmissionStatus(sub.id, 'rejected')}
                                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] font-bold text-stone-400 uppercase">
                              Status: {sub.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 4. Error Reports */}
              {activeTab === 'reports' && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-500">
                    Reports submitted by diners regarding wrong hours, price updates, or closed spots.
                  </p>
                  {errorReports.length === 0 ? (
                    <div className="p-8 text-center text-xs text-stone-400">No active reports. All verified!</div>
                  ) : (
                    errorReports.map(rep => (
                      <div
                        key={rep.id}
                        className="p-4 rounded-2xl border border-stone-200 bg-white flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-sm text-stone-900">{rep.restaurantName}</div>
                          <div className="text-red-600 font-medium">Issue: {rep.issueType}</div>
                          <p className="text-stone-600 mt-1">{rep.details}</p>
                          {rep.reporterContact && (
                            <div className="text-stone-400 text-[10px]">Contact: {rep.reporterContact}</div>
                          )}
                        </div>
                        <div>
                          <button
                            onClick={() => updateReportStatus(rep.id, 'resolved')}
                            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 font-bold"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 5. Backup & Seed */}
              {activeTab === 'data' && (
                <div className="space-y-5 text-xs max-w-xl">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 mb-1">Export Directory JSON</h4>
                    <p className="text-stone-500 mb-2">
                      Download the complete database of Multan restaurants, menus, and submissions.
                    </p>
                    <button
                      onClick={handleDownloadBackup}
                      className="px-4 py-2 rounded-xl bg-[#191919] text-white font-bold flex items-center gap-2"
                    >
                      <Download className="w-4 h-4 text-orange-400" />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <h4 className="font-bold text-sm text-stone-900 mb-1">Import Directory JSON</h4>
                    <textarea
                      rows={4}
                      value={importJsonText}
                      onChange={e => setImportJsonText(e.target.value)}
                      placeholder="Paste JSON array or backup file content here..."
                      className="w-full p-2.5 rounded-xl border border-stone-300 font-mono text-[11px] focus:outline-hidden"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={handleExecuteImport}
                        className="px-4 py-2 rounded-xl bg-[#F97316] text-white font-bold flex items-center gap-1.5"
                      >
                        <Upload className="w-4 h-4" /> Import Data
                      </button>
                    </div>
                    {importResult && (
                      <p className={`mt-2 font-bold ${importResult.success ? 'text-emerald-600' : 'text-red-500'}`}>
                        {importResult.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-stone-200">
                    <h4 className="font-bold text-sm text-red-600 mb-1">Reset to Verified Seeds</h4>
                    <p className="text-stone-500 mb-2">
                      Restores the verified initial dataset with Al Kaif, Beast, Al-Quresh, Siddiqui Tikka, Oven X, Devour, etc.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Reset directory to initial verified seed restaurants?')) {
                          resetToDefaults();
                          alert('Reset complete!');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset to Verified Defaults</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
