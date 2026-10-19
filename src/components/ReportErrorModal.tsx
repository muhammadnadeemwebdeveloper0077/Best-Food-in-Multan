import React, { useState } from 'react';
import { Restaurant, ErrorReport } from '../types';
import { useData } from '../context/DataContext';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ReportErrorModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportErrorModal: React.FC<ReportErrorModalProps> = ({
  restaurant,
  isOpen,
  onClose
}) => {
  const { reportError } = useData();
  const [issueType, setIssueType] = useState<ErrorReport['issueType']>('wrong_menu_or_price');
  const [details, setDetails] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !restaurant) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      alert('Please explain the issue or correction.');
      return;
    }

    reportError({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      issueType,
      details,
      reporterContact
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setDetails('');
    setReporterContact('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-stone-900">Correction Report Submitted</h4>
            <p className="text-xs text-stone-600">
              Thank you for helping keep Best Food in Multan 100% accurate. We will review and update this listing promptly.
            </p>
            <button
              onClick={handleClose}
              className="px-5 py-2 rounded-xl bg-[#F97316] text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="font-bold text-base text-stone-900">Report Inaccuracy</h4>
                <p className="text-xs text-stone-500">{restaurant.name} ({restaurant.branchName})</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Issue Type</label>
                <select
                  value={issueType}
                  onChange={e => setIssueType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                >
                  <option value="wrong_menu_or_price">Outdated or incorrect menu / price</option>
                  <option value="incorrect_hours">Incorrect opening hours</option>
                  <option value="wrong_phone">Wrong phone or WhatsApp number</option>
                  <option value="wrong_location">Incorrect address or Google Maps pin</option>
                  <option value="permanently_closed">Branch permanently or temporarily closed</option>
                  <option value="other">Other issue</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Details & Correct Information *</label>
                <textarea
                  rows={3}
                  required
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  placeholder="Please describe what changed (e.g. price increased to PKR 1950, new phone number is 0300...)"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Your Email / Phone (Optional)</label>
                <input
                  type="text"
                  value={reporterContact}
                  onChange={e => setReporterContact(e.target.value)}
                  placeholder="In case we need clarification"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#191919] hover:bg-stone-800 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Submit Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
