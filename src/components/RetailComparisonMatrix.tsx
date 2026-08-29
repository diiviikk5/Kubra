'use client';

import React, { useState } from 'react';
import { ProductItem } from '@/lib/mock-data';
import { ShoppingCart, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, Store, Clock, Tag } from 'lucide-react';
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
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(products[0]);
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  const handleAddToCart = (product: ProductItem) => {
    if (product.stockCount <= 0) return;
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

  const handleExecuteCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedOrderId = `ONDC-ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderConfirmed(generatedOrderId);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.product.ondcPrice * curr.quantity, 0);
  const qCommerceTotal = cart.reduce(
    (acc, curr) => acc + curr.product.quickCommercePrice * curr.quantity,
    0
  ) + (cart.length > 0 ? 55 : 0); // ₹40 surge + ₹15 handling on Quick Commerce

  return (
    <div className="w-full space-y-6">
      {/* Product Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {products.map((item) => {
          const isSelected = selectedProduct.id === item.id;
          const isOutOfStock = item.stockCount <= 0;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.02]'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              } ${isOutOfStock ? 'opacity-60' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.category}
                  </span>
                  {item.stockCount > 0 ? (
                    <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                      {item.stockCount} in stock
                    </span>
                  ) : (
                    <span className="text-[10px] text-rose-400 font-mono font-bold">Sold Out</span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white line-clamp-2 mb-1">
                  {lang === 'hi' ? item.nameHindi : item.name}
                </div>
                <div className="text-[11px] text-slate-400">{item.packSize}</div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-extrabold text-amber-400">₹{item.ondcPrice}</span>
                  <span className="text-[10px] text-slate-500 line-through ml-1.5">₹{item.mrp}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold font-mono">
                  {Math.round(((item.mrp - item.ondcPrice) / item.mrp) * 100)}% OFF
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main 3-Way Comparison Matrix (ONDC vs Quick Commerce vs Traditional e-Commerce) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                Live Price & SLA Benchmark
              </span>
              <span className="text-xs text-slate-400 font-mono">Pin Code: 400072 (Mumbai)</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              {lang === 'hi' ? selectedProduct.nameHindi : selectedProduct.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAddToCart(selectedProduct)}
              disabled={selectedProduct.stockCount <= 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                selectedProduct.stockCount > 0
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{selectedProduct.stockCount > 0 ? (lang === 'hi' ? 'कार्ट में जोड़ें' : 'Add to ONDC Cart') : 'Out of Stock'}</span>
            </button>
          </div>
        </div>

        {/* 3 Columns Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. ONDC Local Store (Winner) */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-blue-950/70 to-slate-950 border-2 border-blue-500/60 shadow-lg relative flex flex-col justify-between">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wide shadow">
              Direct from Local Kirana
            </div>

            <div>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
                <Store className="w-4 h-4 text-amber-400" />
                <span>ONDC BharatOS Network</span>
              </div>
              <p className="text-xs text-slate-300 font-medium mb-3">
                {selectedProduct.storeName} ({selectedProduct.storeDistance})
              </p>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Item Price:</span>
                  <span className="text-white font-extrabold text-base">₹{selectedProduct.ondcPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Fee:</span>
                  <span className="text-emerald-400 font-medium font-mono">₹15 (Local FIFO Rider)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Surge / Handling Fee:</span>
                  <span className="text-emerald-400 font-bold font-mono">₹0.00 (Zero Gouging)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Delivery:</span>
                  <span className="text-slate-200 font-semibold">{selectedProduct.deliveryTimeOndc}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Landed:</span>
              <span className="text-lg font-black text-amber-400">₹{selectedProduct.ondcPrice + 15}</span>
            </div>
          </div>

          {/* 2. Quick-Commerce Dark Store (Blinkit / Zepto / Instamart) */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                <Clock className="w-4 h-4" />
                <span>Quick-Commerce Dark Store</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Monopolistic Algorithmic Dark Store</p>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Item Price:</span>
                  <span className="text-slate-300 font-semibold">₹{selectedProduct.quickCommercePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Handling Fee:</span>
                  <span className="text-rose-400 font-mono">+ ₹15.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">High Demand Surge:</span>
                  <span className="text-rose-400 font-mono">+ ₹40.00 (Hidden)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Speed:</span>
                  <span className="text-slate-400">12-15 mins</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Landed:</span>
              <span className="text-base font-bold text-slate-300">
                ₹{selectedProduct.quickCommercePrice + 55}
                <span className="text-[10px] text-rose-400 font-normal ml-1">
                  (+₹{selectedProduct.quickCommercePrice + 55 - (selectedProduct.ondcPrice + 15)} more)
                </span>
              </span>
            </div>
          </div>

          {/* 3. Traditional e-Commerce (Amazon / Flipkart) */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                <Tag className="w-4 h-4" />
                <span>National Marketplace</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">Centralized Regional Warehouse</p>

              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Item Price:</span>
                  <span className="text-slate-300 font-semibold">₹{selectedProduct.amazonPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Fee:</span>
                  <span className="text-slate-400">₹40 (Free on Prime ₹1499/yr)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Delivery:</span>
                  <span className="text-amber-400 font-medium">Tomorrow / 2 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Local Kirana Impact:</span>
                  <span className="text-rose-400">Zero revenue to local economy</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Landed:</span>
              <span className="text-base font-bold text-slate-300">₹{selectedProduct.amazonPrice + 40}</span>
            </div>
          </div>
        </div>

        {/* Smart Substitution Alert (If Stock hits 0) */}
        {selectedProduct.stockCount <= 0 && (
          <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Smart Substitution Guard:</strong> Walk-in customer bought out this item. ONDC automatically routed demand to adjacent verified Kirana (Sharma Grocery, 700m) with zero price increase.
              </span>
            </div>
            <button className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors">
              Accept Alternative
            </button>
          </div>
        )}
      </div>

      {/* Floating Active Cart Drawer & Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-4xl mx-auto z-30 p-4 rounded-2xl bg-slate-900/95 border border-blue-500/50 shadow-2xl backdrop-blur-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white text-sm">
                {cart.length} Item(s) in ONDC Cart •{' '}
                <span className="text-amber-400">Total: ₹{cartTotal + 15}</span>
              </div>
              <div className="text-xs text-emerald-400 font-medium">
                You saved ₹{qCommerceTotal - (cartTotal + 15)} vs Quick Commerce (Zero surge fees)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCart([])}
              className="px-3 py-2 rounded-lg text-slate-400 hover:text-white text-xs transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={handleExecuteCheckout}
              disabled={isCheckingOut}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              {isCheckingOut ? (
                <span>Broadcasting Beckn /confirm...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>1-Click UPI Order (₹{cartTotal + 15})</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Order Confirmed Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-emerald-500/60 rounded-2xl p-6 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold uppercase">
              Beckn Order Confirmed
            </span>

            <h3 className="text-xl font-bold text-white mt-2">Order Dispatched via ONDC FIFO</h3>
            <p className="text-xs text-slate-400 mt-1">
              Order ID: <span className="font-mono text-amber-400 font-bold">{orderConfirmed}</span>
            </p>

            <div className="my-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Seller NP:</span>
                <span className="text-white">DigiDukaan Kirana #9812</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Logistics NP:</span>
                <span className="text-emerald-400 font-semibold">FleetConnect (Airxy Rider)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Sachet Insurance:</span>
                <span className="text-blue-400">Zurich Kotak (₹1.50 Cover Active)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Arrival:</span>
                <span className="text-amber-400 font-bold">25 Minutes</span>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderConfirmed(null);
                setCart([]);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Continue to BharatOS Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
