import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../utils/helpers';
import { OrderInquiry } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Truck,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

interface CartDrawerProps {
  onOpenReportError?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = () => {
  const {
    cartItems,
    restaurantName,
    restaurantPhone,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    generateWhatsAppOrderUrl,
    submitDemoOrder,
    lastOrder,
    clearLastOrder
  } = useCart();

  const [checkoutMode, setCheckoutMode] = useState<'cart' | 'checkout'>('cart');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('Gulgasht Colony');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'JazzCash / Easypaisa' | 'Card on POS'>('Cash on Delivery');
  const [specialNotes, setSpecialNotes] = useState('');

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your name, contact phone, and Multan delivery address.');
      return;
    }

    const inquiry: OrderInquiry = {
      customerName,
      customerPhone,
      customerAddress,
      deliveryArea,
      orderType,
      paymentMethod,
      specialNotes
    };

    const url = generateWhatsAppOrderUrl(inquiry);
    window.open(url, '_blank');
  };

  const handleDirectDemoOrder = () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your name, contact phone, and Multan delivery address.');
      return;
    }

    const inquiry: OrderInquiry = {
      customerName,
      customerPhone,
      customerAddress,
      deliveryArea,
      orderType,
      paymentMethod,
      specialNotes
    };

    submitDemoOrder(inquiry);
    setCheckoutMode('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-[#FFF9F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F97316] text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 leading-tight">Your Food Basket</h3>
              {restaurantName && (
                <p className="text-xs text-stone-500 truncate max-w-[200px]">
                  Ordering from: <strong className="text-stone-800">{restaurantName}</strong>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                title="Clear Basket"
                className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                setIsCartOpen(false);
                clearLastOrder();
              }}
              className="p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Active Order Confirmation View if an order was just placed */}
          {lastOrder ? (
            <div className="space-y-4 py-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Order Successfully Placed
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 mt-1">
                  Order ID: {lastOrder.orderId}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Placed at {lastOrder.timestamp} with {lastOrder.restaurantName}
                </p>
              </div>

              {/* Multan Live Order Tracker Timeline */}
              <div className="bg-[#FFF9F2] border border-orange-200 rounded-2xl p-4 text-left space-y-3">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Live Multan Kitchen Tracker
                </div>
                <div className="space-y-3 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-300">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 absolute -left-6 top-1 ring-4 ring-emerald-100"></div>
                    <div className="text-xs font-bold text-stone-900">Order Received by Branch</div>
                    <div className="text-[11px] text-stone-500">Multan branch has verified ticket.</div>
                  </div>
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-[#F97316] absolute -left-6 top-1 ring-4 ring-orange-100 animate-pulse"></div>
                    <div className="text-xs font-bold text-stone-900">In the Kitchen / Wok</div>
                    <div className="text-[11px] text-stone-500">Fresh cooking with desi ingredients.</div>
                  </div>
                  <div className="relative opacity-60">
                    <div className="w-3 h-3 rounded-full bg-stone-300 absolute -left-6 top-1"></div>
                    <div className="text-xs font-bold text-stone-700">Rider Dispatched in Multan</div>
                    <div className="text-[11px] text-stone-500">Estimated delivery: 30-40 mins.</div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 text-left text-xs space-y-1.5 border border-stone-200">
                <div className="font-bold text-stone-900 mb-1">Delivery Destination:</div>
                <div className="text-stone-700">Name: {lastOrder.inquiry.customerName}</div>
                <div className="text-stone-700">Phone: {lastOrder.inquiry.customerPhone}</div>
                <div className="text-stone-700">Address: {lastOrder.inquiry.customerAddress}, {lastOrder.inquiry.deliveryArea}</div>
                <div className="font-bold text-[#EA580C] pt-1">
                  Payment: {lastOrder.inquiry.paymentMethod} • Total: {formatPKR(lastOrder.total)}
                </div>
              </div>

              <button
                onClick={clearLastOrder}
                className="w-full py-3 rounded-xl bg-[#191919] hover:bg-stone-800 text-white font-bold text-xs"
              >
                Back to Food Directory
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-stone-900">Your basket is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore restaurants in Gulgasht, Bosan Road, or Cantt to add delicious Multani dishes and deals.
              </p>
            </div>
          ) : checkoutMode === 'cart' ? (
            /* Standard Items List */
            <div className="space-y-3">
              {cartItems.map(ci => (
                <div
                  key={ci.id}
                  className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 flex justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="font-bold text-sm text-stone-900">{ci.menuItem.name}</div>
                    {ci.selectedOptions && ci.selectedOptions.length > 0 && (
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {ci.selectedOptions.map(o => o.optionName).join(', ')}
                      </div>
                    )}
                    {ci.specialInstructions && (
                      <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                        Note: {ci.specialInstructions}
                      </div>
                    )}
                    <div className="font-bold text-xs text-[#EA580C] mt-1.5">
                      {formatPKR(ci.itemTotal)}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(ci.id)}
                      className="text-stone-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200">
                      <button
                        onClick={() => updateQuantity(ci.id, ci.quantity - 1)}
                        className="text-stone-600 hover:text-stone-900 font-bold px-1 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{ci.quantity}</span>
                      <button
                        onClick={() => updateQuantity(ci.id, ci.quantity + 1)}
                        className="text-stone-600 hover:text-stone-900 font-bold px-1 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Checkout Details Form */
            <div className="space-y-4">
              <button
                onClick={() => setCheckoutMode('cart')}
                className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1 mb-2"
              >
                ← Back to basket items
              </button>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Usman Malik"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Multan Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Multan Neighborhood / Area *</label>
                  <select
                    value={deliveryArea}
                    onChange={e => setDeliveryArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden font-medium"
                  >
                    <option value="Gulgasht Colony">Gulgasht Colony</option>
                    <option value="Bosan Road">Bosan Road</option>
                    <option value="Cantt (Multan Cantt)">Cantt (Multan Cantt)</option>
                    <option value="Shah Rukn-e-Alam Colony">Shah Rukn-e-Alam Colony</option>
                    <option value="Mumtazabad">Mumtazabad</option>
                    <option value="Ghanta Ghar & Old City">Ghanta Ghar & Old City</option>
                    <option value="Hussain Agahi">Hussain Agahi</option>
                    <option value="DHA Multan">DHA Multan</option>
                    <option value="Wapda Town">Wapda Town</option>
                    <option value="Chowk Kumharanwala">Chowk Kumharanwala</option>
                    <option value="Other Multan Area">Other Multan Area</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">House / Flat & Street Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={customerAddress}
                    onChange={e => setCustomerAddress(e.target.value)}
                    placeholder="e.g. House 42, Street 5, Near Jalal Masjid..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#F97316] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Cash on Delivery', 'JazzCash / Easypaisa'].map(pm => (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => setPaymentMethod(pm as any)}
                        className={`p-2 rounded-xl border font-bold text-[11px] text-center transition-colors ${
                          paymentMethod === pm
                            ? 'bg-[#191919] text-white border-[#191919]'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Special Delivery Note</label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={e => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Ring bell twice, deliver at rear gate..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Calculations & Actions */}
        {!lastOrder && cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FFF9F2] space-y-3">
            {/* Breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Food Items Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPKR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Multan Delivery</span>
                <span className="font-semibold text-stone-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE (Orders &gt; ₨ 3,000)</span>
                  ) : (
                    formatPKR(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200/80">
                <span>Estimated Total</span>
                <span className="text-[#EA580C] text-base">{formatPKR(cartTotal)}</span>
              </div>
            </div>

            {checkoutMode === 'cart' ? (
              <button
                onClick={() => setCheckoutMode('checkout')}
                className="w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2 pt-1">
                {/* 1. WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order via WhatsApp to Branch</span>
                </button>

                {/* 2. Direct Demo Order Placement */}
                <button
                  onClick={handleDirectDemoOrder}
                  className="w-full py-2.5 rounded-xl bg-[#191919] hover:bg-stone-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4 text-orange-400" />
                  <span>Place Direct Demo Order (COD)</span>
                </button>

                <p className="text-[10px] text-stone-500 text-center leading-tight">
                  WhatsApp transmits formatted order details directly to the restaurant's phone.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
