'use client';

import React, { useState } from 'react';
import { ProductItem } from '@/lib/mock-data';
import { ShoppingCart, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Store, Clock, Tag, Plus, Minus, Trash2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface RetailComparisonMatrixProps {
  products: ProductItem[];
  lang: 'en' | 'hi';
  onInspectPayload: (payload: any) => void;
}

export const RetailComparisonMatrix: React.FC<RetailComparisonMatrixProps> = ({
  products,
  lang,
  onInspectPayload
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([
    { product: products[0], quantity: 1 },
    { product: products[1], quantity: 1 }
  ]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);
  const [showUpiModal, setShowUpiModal] = useState(false);

  const categories = ['ALL', 'Groceries', 'Dairy', 'Household', 'Personal Care', 'Snacks'];

  const filteredProducts = products.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const handleExecuteCheckout = () => {
    setShowUpiModal(true);
  };

  const handleConfirmUPIPayment = () => {
    setShowUpiModal(false);
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedOrderId = `ONDC-ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderConfirmed(generatedOrderId);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  const ondcTotal = cart.reduce((acc, curr) => acc + curr.product.ondcPrice * curr.quantity, 0);
  const mrpTotal = cart.reduce((acc, curr) => acc + curr.product.mrp * curr.quantity, 0);
  const qCommerceTotal = cart.reduce((acc, curr) => acc + curr.product.quickCommercePrice * curr.quantity, 0) + (cart.length > 0 ? 55 : 0);
  const totalSavings = qCommerceTotal - ondcTotal;

  const upiIntentUri = `upi://pay?pa=ondc.bharat@icici&pn=Kubra+Retail&am=${ondcTotal}.00&cu=INR&tn=ONDC-CART-CHECKOUT`;

  return (
    <div className="w-full space-y-6">
      {/* Category Filter & Search Bar */}
      <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-black text-white font-semibold'
                  : isDark ? 'bg-zinc-900 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:text-black'
              }`}
            >
              {cat === 'ALL' ? 'All Items' : cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter catalog (e.g. Atta, Oil, Milk, Blade)..."
          className={`px-3 py-1.5 rounded-lg border text-xs focus:outline-none w-full sm:w-64 ${
            isDark ? 'bg-zinc-950 border-zinc-800 focus:border-zinc-500' : 'bg-zinc-50 border-zinc-300 focus:border-zinc-600'
          }`}
        />
      </div>

      {/* Catalog & Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Cards Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredProducts.map((item) => {
              const inCart = cart.find((c) => c.product.id === item.id);
              const discountPct = Math.round(((item.mrp - item.ondcPrice) / item.mrp) * 100);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  } flex flex-col justify-between space-y-3`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500 font-semibold">
                        {discountPct}% OFF
                      </span>
                    </div>

                    <div className="font-bold text-xs line-clamp-2">{item.name}</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.packSize} • {item.brand}</div>

                    <div className={`mt-2 p-2 rounded-lg border text-[10px] font-mono space-y-1 ${
                      isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                    }`}>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>ONDC Kirana</span>
                        <span className="font-bold">₹{item.ondcPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Dark Stores</span>
                        <span className="line-through text-zinc-500">₹{item.quickCommercePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>MRP</span>
                        <span className="text-zinc-500">₹{item.mrp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-extrabold">₹{item.ondcPrice}</span>

                    {inCart ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className={`p-1 rounded-md border ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300 border-zinc-300'}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1.5">{inCart.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className={`p-1 rounded-md border ${isDark ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300 border-zinc-300'}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
                        }`}
                      >
                        + Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Multi-Seller Cart */}
        <div className="lg:col-span-4 flex flex-col">
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          } flex flex-col justify-between space-y-4`}>
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-3 border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-bold text-sm">Multi-Seller Cart</span>
                </div>
                <span className="text-xs font-mono font-semibold">{cart.length} SKUs</span>
              </div>

              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className={`text-center py-10 text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  Your multi-seller cart is empty. Add items from the catalog.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className={`p-2.5 rounded-xl border ${
                        isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      } flex items-center justify-between text-xs`}
                    >
                      <div className="pr-2">
                        <div className="font-medium line-clamp-1">{product.name}</div>
                        <div className={`text-[10px] font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {product.storeName} • ₹{product.ondcPrice} x {quantity}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, -1)}
                          className={`p-1 rounded-md border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-300'}`}
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-xs font-bold px-1">{quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(product.id, 1)}
                          className={`p-1 rounded-md border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-300'}`}
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              {cart.length > 0 && (
                <div className={`mt-4 pt-3 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'} space-y-1.5 text-xs font-mono`}>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>ONDC Item Total</span>
                    <span>₹{ondcTotal}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Delivery (1 Consolidated Run)</span>
                    <span className="text-emerald-500">₹25.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Surge &amp; Handling Fees</span>
                    <span className="text-emerald-500">₹0.00 (Free)</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm pt-2 border-t border-zinc-800">
                    <span>Net Payable</span>
                    <span className="text-emerald-500">₹{ondcTotal + 25}.00</span>
                  </div>
                  <div className="text-[11px] text-emerald-500 pt-1">
                    You save ₹{totalSavings} vs Quick Commerce dark stores!
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <button
                onClick={handleExecuteCheckout}
                disabled={isCheckingOut}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
                } cursor-pointer`}
              >
                1-Click UPI Checkout (₹{ondcTotal + 25})
              </button>
            )}

            {orderConfirmed && (
              <div className={`p-3 rounded-xl border text-xs font-mono ${
                isDark ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
              }`}>
                ✓ Order Confirmed! Reference: <strong>{orderConfirmed}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* UPI QR Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 ${
            isDark ? 'bg-[#121214] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
          }`}>
            <div className={`flex items-center justify-between border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} pb-3`}>
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                <span className="font-bold text-base">Authorize Cart Payment</span>
              </div>
              <button
                onClick={() => setShowUpiModal(false)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-1">
              <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Total Amount</span>
              <div className="text-3xl font-black">₹{ondcTotal + 25}.00</div>
              <span className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {cart.length} items from nearby ONDC Kiranas
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <div className="p-3 bg-white rounded-xl border border-zinc-300 shadow-md">
                <QRCodeSVG
                  value={upiIntentUri}
                  size={160}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <span className={`text-[10px] font-mono mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                VPA: ondc.bharat@icici
              </span>
            </div>

            <button
              onClick={handleConfirmUPIPayment}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
              } cursor-pointer`}
            >
              1-Tap Authorize (₹{ondcTotal + 25}.00)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
