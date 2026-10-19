import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Restaurant, OrderInquiry } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  restaurantPhone: string | null;
  restaurantWhatsApp: string | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    restaurant: Restaurant,
    item: MenuItem,
    selectedOptions?: { groupName: string; optionName: string; priceDelta: number }[],
    specialInstructions?: string,
    quantity?: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  cartItemCount: number;
  generateWhatsAppOrderUrl: (inquiry: OrderInquiry) => string;
  submitDemoOrder: (inquiry: OrderInquiry) => { orderId: string; timestamp: string };
  lastOrder: {
    orderId: string;
    inquiry: OrderInquiry;
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    restaurantName: string;
    timestamp: string;
  } | null;
  clearLastOrder: () => void;
}

const STORAGE_KEY = 'bfm_cart_v2';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [restaurantId, setRestaurantId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('bfm_cart_rest_id');
      return saved || null;
    } catch {
      return null;
    }
  });

  const [restaurantName, setRestaurantName] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bfm_cart_rest_name') || null;
    } catch {
      return null;
    }
  });

  const [restaurantPhone, setRestaurantPhone] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bfm_cart_rest_phone') || null;
    } catch {
      return null;
    }
  });

  const [restaurantWhatsApp, setRestaurantWhatsApp] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bfm_cart_rest_wa') || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      if (restaurantId) localStorage.setItem('bfm_cart_rest_id', restaurantId);
      else localStorage.removeItem('bfm_cart_rest_id');

      if (restaurantName) localStorage.setItem('bfm_cart_rest_name', restaurantName);
      else localStorage.removeItem('bfm_cart_rest_name');

      if (restaurantPhone) localStorage.setItem('bfm_cart_rest_phone', restaurantPhone);
      else localStorage.removeItem('bfm_cart_rest_phone');

      if (restaurantWhatsApp) localStorage.setItem('bfm_cart_rest_wa', restaurantWhatsApp);
      else localStorage.removeItem('bfm_cart_rest_wa');
    } catch {
      // ignore
    }
  }, [cartItems, restaurantId, restaurantName, restaurantPhone, restaurantWhatsApp]);

  const addToCart = (
    restaurant: Restaurant,
    item: MenuItem,
    selectedOptions: { groupName: string; optionName: string; priceDelta: number }[] = [],
    specialInstructions?: string,
    quantity = 1
  ) => {
    // If cart has items from another restaurant, ask or reset
    if (restaurantId && restaurantId !== restaurant.id && cartItems.length > 0) {
      const confirmSwitch = window.confirm(
        `Your cart currently has items from "${restaurantName}". Would you like to clear your cart and start a new order from "${restaurant.name}"?`
      );
      if (!confirmSwitch) return;
      setCartItems([]);
    }

    setRestaurantId(restaurant.id);
    setRestaurantName(restaurant.name);
    setRestaurantPhone(restaurant.phone);
    setRestaurantWhatsApp(restaurant.whatsappNumber || restaurant.phone.replace(/[^0-9]/g, ''));

    const optionsDelta = selectedOptions.reduce((acc, opt) => acc + opt.priceDelta, 0);
    const unitPrice = item.price + optionsDelta;
    const itemTotal = unitPrice * quantity;

    // Check if duplicate item with same options exists
    const optionsSignature = selectedOptions.map(o => `${o.groupName}:${o.optionName}`).sort().join('|');

    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => {
        const ciSig = ci.selectedOptions.map(o => `${o.groupName}:${o.optionName}`).sort().join('|');
        return ci.menuItem.id === item.id && ciSig === optionsSignature && (ci.specialInstructions || '') === (specialInstructions || '');
      });

      if (existingIndex > -1) {
        const copy = [...prev];
        const existing = copy[existingIndex];
        const newQty = existing.quantity + quantity;
        copy[existingIndex] = {
          ...existing,
          quantity: newQty,
          itemTotal: unitPrice * newQty
        };
        return copy;
      }

      const newItem: CartItem = {
        id: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        menuItem: item,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantPhone: restaurant.phone,
        restaurantWhatsApp: restaurant.whatsappNumber,
        quantity,
        selectedOptions,
        itemTotal,
        specialInstructions
      };

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => {
      const filtered = prev.filter(ci => ci.id !== cartItemId);
      if (filtered.length === 0) {
        setRestaurantId(null);
        setRestaurantName(null);
        setRestaurantPhone(null);
        setRestaurantWhatsApp(null);
      }
      return filtered;
    });
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(ci => {
        if (ci.id === cartItemId) {
          const optionsDelta = ci.selectedOptions.reduce((acc, opt) => acc + opt.priceDelta, 0);
          const unitPrice = ci.menuItem.price + optionsDelta;
          return {
            ...ci,
            quantity: newQty,
            itemTotal: unitPrice * newQty
          };
        }
        return ci;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
    setRestaurantPhone(null);
    setRestaurantWhatsApp(null);
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const deliveryFee = cartSubtotal === 0 ? 0 : cartSubtotal > 3000 ? 0 : 150; // PKR 150 standard delivery or Free over ₨ 3,000
  const cartTotal = cartSubtotal + deliveryFee;
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppOrderUrl = (inquiry: OrderInquiry): string => {
    const rawNumber = (restaurantWhatsApp || '923006304411').replace(/[^0-9]/g, '');
    let cleanNumber = rawNumber;
    if (cleanNumber.startsWith('03')) {
      cleanNumber = '92' + cleanNumber.substring(1);
    } else if (!cleanNumber.startsWith('92')) {
      cleanNumber = '92' + cleanNumber;
    }

    const itemsText = cartItems
      .map((ci, idx) => {
        const opts = ci.selectedOptions.length > 0 ? ` (${ci.selectedOptions.map(o => o.optionName).join(', ')})` : '';
        const notes = ci.specialInstructions ? ` [Note: ${ci.specialInstructions}]` : '';
        return `${idx + 1}. *${ci.quantity}x ${ci.menuItem.name}*${opts}${notes} - ₨ ${ci.itemTotal}`;
      })
      .join('\n');

    const message = `*NEW ORDER INQUIRY - BEST FOOD IN MULTAN*
---------------------------------------
*Restaurant:* ${restaurantName || 'Multan Partner'}
*Order Type:* ${inquiry.orderType.toUpperCase()}
*Payment:* ${inquiry.paymentMethod}

*Customer Details:*
• Name: ${inquiry.customerName}
• Phone: ${inquiry.customerPhone}
• Area: ${inquiry.deliveryArea}
• Street Address: ${inquiry.customerAddress}

*Order Items:*
${itemsText}

---------------------------------------
• Food Subtotal: ₨ ${cartSubtotal.toLocaleString()}
• Est. Delivery: ${deliveryFee === 0 ? 'FREE' : `₨ ${deliveryFee}`}
• *Estimated Total: ₨ ${cartTotal.toLocaleString()}*

${inquiry.specialNotes ? `*Special Request:* ${inquiry.specialNotes}\n` : ''}
_Note: Placed via Best Food in Multan Directory. Please confirm availability, preparation time & dispatch._`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  const submitDemoOrder = (inquiry: OrderInquiry) => {
    const orderId = `BFM-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const orderRecord = {
      orderId,
      inquiry,
      items: [...cartItems],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      restaurantName: restaurantName || 'Multan Restaurant',
      timestamp
    };

    setLastOrder(orderRecord);
    clearCart();
    setIsCartOpen(false);

    return { orderId, timestamp };
  };

  const clearLastOrder = () => setLastOrder(null);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurantId,
        restaurantName,
        restaurantPhone,
        restaurantWhatsApp,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        cartItemCount,
        generateWhatsAppOrderUrl,
        submitDemoOrder,
        lastOrder,
        clearLastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
