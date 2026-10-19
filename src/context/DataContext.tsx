import React, { createContext, useContext, useState, useEffect } from 'react';
import { Restaurant, Neighborhood, FoodCategory, RestaurantSubmission, ErrorReport, FoodGuide } from '../types';
import { INITIAL_RESTAURANTS } from '../data/seedRestaurants';
import { MULTAN_NEIGHBORHOODS } from '../data/neighborhoods';
import { MULTAN_CATEGORIES } from '../data/categories';
import { MULTAN_FOOD_GUIDES } from '../data/guides';

interface DataContextType {
  restaurants: Restaurant[];
  neighborhoods: Neighborhood[];
  categories: FoodCategory[];
  guides: FoodGuide[];
  submissions: RestaurantSubmission[];
  errorReports: ErrorReport[];
  addRestaurant: (newRestaurant: Omit<Restaurant, 'id'>) => Restaurant;
  updateRestaurant: (updated: Restaurant) => void;
  deleteRestaurant: (id: string) => void;
  toggleRestaurantVerification: (id: string) => void;
  submitRestaurant: (data: Omit<RestaurantSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  reportError: (report: Omit<ErrorReport, 'id' | 'reportedAt' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: 'approved' | 'rejected') => void;
  updateReportStatus: (id: string, status: 'resolved' | 'pending') => void;
  resetToDefaults: () => void;
  exportDataAsJson: () => string;
  importDataFromJson: (jsonStr: string) => { success: boolean; message: string };
  getRestaurantBySlug: (slug: string) => Restaurant | undefined;
  getRestaurantsByArea: (areaName: string) => Restaurant[];
  getRestaurantsByCategory: (categoryName: string) => Restaurant[];
}

const STORAGE_KEYS = {
  RESTAURANTS: 'bfm_restaurants_v2',
  SUBMISSIONS: 'bfm_submissions_v2',
  REPORTS: 'bfm_reports_v2',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESTAURANTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_RESTAURANTS;
  });

  const [submissions, setSubmissions] = useState<RestaurantSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'sub-sample-1',
        restaurantName: 'Baba G Biryani & Pulao',
        branchName: 'Bosan Road Branch',
        neighborhood: 'Bosan Road',
        address: 'Opposite Mall of Multan, Bosan Road',
        phone: '0300-7389100',
        cuisine: 'Biryani & Pulao',
        menuOrWebsiteUrl: 'https://facebook.com/babagbiryanimultan',
        submitterName: 'Muhammad Nadeem',
        submitterContact: 'muhammadnadeemwebdeveloper@gmail.com',
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'pending'
      }
    ];
  });

  const [errorReports, setErrorReports] = useState<ErrorReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(restaurants));
    } catch (e) {
      console.warn('Could not save restaurants to localStorage', e);
    }
  }, [restaurants]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch (e) {
      console.warn('Could not save submissions to localStorage', e);
    }
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(errorReports));
    } catch (e) {
      console.warn('Could not save reports to localStorage', e);
    }
  }, [errorReports]);

  const addRestaurant = (newRestaurant: Omit<Restaurant, 'id'>): Restaurant => {
    const id = `rest-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const created: Restaurant = { ...newRestaurant, id };
    setRestaurants(prev => [created, ...prev]);
    return created;
  };

  const updateRestaurant = (updated: Restaurant) => {
    setRestaurants(prev => prev.map(r => (r.id === updated.id ? updated : r)));
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
  };

  const toggleRestaurantVerification = (id: string) => {
    setRestaurants(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              isVerified: !r.isVerified,
              verificationDate: !r.isVerified ? 'October 2026' : r.verificationDate
            }
          : r
      )
    );
  };

  const submitRestaurant = (data: Omit<RestaurantSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSubmission: RestaurantSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const reportError = (report: Omit<ErrorReport, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: ErrorReport = {
      ...report,
      id: `err-${Date.now()}`,
      reportedAt: new Date().toISOString(),
      status: 'pending'
    };
    setErrorReports(prev => [newReport, ...prev]);
  };

  const updateSubmissionStatus = (id: string, status: 'approved' | 'rejected') => {
    setSubmissions(prev =>
      prev.map(s => (s.id === id ? { ...s, status } : s))
    );
  };

  const updateReportStatus = (id: string, status: 'resolved' | 'pending') => {
    setErrorReports(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  const resetToDefaults = () => {
    setRestaurants(INITIAL_RESTAURANTS);
    try {
      localStorage.setItem(STORAGE_KEYS.RESTAURANTS, JSON.stringify(INITIAL_RESTAURANTS));
    } catch {
      // ignore
    }
  };

  const exportDataAsJson = (): string => {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        totalRestaurants: restaurants.length,
        restaurants,
        submissions,
        errorReports
      },
      null,
      2
    );
  };

  const importDataFromJson = (jsonStr: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(jsonStr);
      if (Array.isArray(data.restaurants) && data.restaurants.length > 0) {
        setRestaurants(data.restaurants);
        if (Array.isArray(data.submissions)) setSubmissions(data.submissions);
        if (Array.isArray(data.errorReports)) setErrorReports(data.errorReports);
        return { success: true, message: `Successfully imported ${data.restaurants.length} restaurants!` };
      } else if (Array.isArray(data) && data.length > 0 && data[0].name) {
        setRestaurants(data);
        return { success: true, message: `Successfully imported ${data.length} restaurants!` };
      }
      return { success: false, message: 'Invalid JSON format: missing restaurants array.' };
    } catch (err: any) {
      return { success: false, message: `JSON parsing error: ${err.message}` };
    }
  };

  const getRestaurantBySlug = (slug: string): Restaurant | undefined => {
    return restaurants.find(r => r.slug === slug || r.id === slug);
  };

  const getRestaurantsByArea = (areaName: string): Restaurant[] => {
    if (!areaName || areaName === 'All Areas') return restaurants;
    return restaurants.filter(
      r => r.neighborhood.toLowerCase().includes(areaName.toLowerCase())
    );
  };

  const getRestaurantsByCategory = (categoryName: string): Restaurant[] => {
    if (!categoryName || categoryName === 'All') return restaurants;
    const catLower = categoryName.toLowerCase();
    return restaurants.filter(
      r =>
        r.category.toLowerCase().includes(catLower) ||
        r.cuisineTags.some(tag => tag.toLowerCase().includes(catLower))
    );
  };

  return (
    <DataContext.Provider
      value={{
        restaurants,
        neighborhoods: MULTAN_NEIGHBORHOODS,
        categories: MULTAN_CATEGORIES,
        guides: MULTAN_FOOD_GUIDES,
        submissions,
        errorReports,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
        toggleRestaurantVerification,
        submitRestaurant,
        reportError,
        updateSubmissionStatus,
        updateReportStatus,
        resetToDefaults,
        exportDataAsJson,
        importDataFromJson,
        getRestaurantBySlug,
        getRestaurantsByArea,
        getRestaurantsByCategory
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
