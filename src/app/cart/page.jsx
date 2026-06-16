"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ShoppingBag, X, Plus, Minus, CreditCard, ChevronRight, Tag, Gift, Percent, Truck, Check } from "lucide-react";
import { products } from "@/data/products";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    clearPromoCode,
    promoApplied,
    promoCode,
    promoDiscount,
    promoDiscountType,
    promoError,
  } = useStore();

  const [promoInput, setPromoInput] = useState("");
  
  // Deluxe sample selection states (max 2)
  const [selectedSamples, setSelectedSamples] = useState([]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
    }
  };

  const handleQuickApply = (code) => {
    setPromoInput(code);
    applyPromoCode(code);
  };

  const handleSampleToggle = (sampleId) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleId)) {
        return prev.filter((id) => id !== sampleId);
      }
      if (prev.length >= 2) {
        // limit reached, swap or ignore
        return [prev[1], sampleId];
      }
      return [...prev, sampleId];
    });
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = promoDiscountType === "value"
    ? Math.min(subtotal, promoDiscount)
    : subtotal * promoDiscount;
  const tax = subtotal * 0.06;
  const shippingThreshold = 2999;
  const shipping = subtotal === 0 || subtotal >= shippingThreshold ? 0 : 150;
  const total = Math.max(0, subtotal - discountAmount + tax + shipping);

  const shippingPercentage = Math.min((subtotal / shippingThreshold) * 100, 100);
  const amountToFreeShipping = shippingThreshold - subtotal;

  const samplesList = [
    { id: "sample-balm", name: "Velvet Cleansing Balm (2ml)", desc: "Gentle makeup dissolver" },
    { id: "sample-eye", name: "Hydra-Bright Eye Patch (1 pair)", desc: "Puffiness relief" },
    { id: "sample-squalane", name: "Squalane Moisture Serum (1.5ml)", desc: "Hydration boost" },
  ];

  // Recommendations
  const recommendations = products
    .filter((p) => !cart.some((item) => item.id === p.id))
    .slice(0, 3);

  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="bg-[#fcfcfb] text-black min-h-screen py-16">
      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <header className="mb-14 text-center md:text-left space-y-3">
          <h1 className="font-headline text-[38px] md:text-[52px] text-on-surface font-bold leading-tight">Your Shopping Bag</h1>
          <p className="font-body text-xs text-on-surface-variant tracking-wider uppercase font-semibold">
            Review your selections and personalize your ritual.
          </p>
        </header>

        {cart.length === 0 ? (
          <div className="py-24 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 bg-[#f4f4f3] rounded-full flex items-center justify-center mx-auto border border-black/5">
              <ShoppingBag size={30} className="text-[#0a0a0a] stroke-[1.2]" />
            </div>
            <h2 className="font-headline text-2xl font-bold">Your bag is empty</h2>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Complete your skincare routine by exploring our active serums, oils, and moisturizers.
            </p>
            <Link
              href="/shop"
              className="bg-primary hover:bg-[#1a1a19] text-on-primary px-8 py-4 font-label text-xs tracking-widest uppercase inline-block transition-colors duration-300 font-bold rounded-sm shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Free Shipping Progress Bar */}
              <div className="bg-[#f4f4f3]/60 border border-black/5 p-6 rounded-xl shadow-lg space-y-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0a0a0a]/10 text-primary flex items-center justify-center">
                    <Truck className="text-[#0a0a0a]" size={16} />
                  </div>
                  <div>
                    {subtotal >= shippingThreshold ? (
                      <p className="font-label text-xs font-bold uppercase text-primary">
                        Congratulations! You have earned complimentary shipping.
                      </p>
                    ) : (
                      <p className="font-label text-xs text-on-surface-variant">
                        You are only <span className="font-bold text-[#0a0a0a]">₹{amountToFreeShipping.toLocaleString("en-IN")}</span> away from <span className="font-bold uppercase text-primary">Complimentary Shipping</span>.
                      </p>
                    )}
                  </div>
                </div>

                <div className="h-2 bg-[#fcfcfb] rounded-full overflow-hidden border border-black/5">
                  <div
                    className="h-full bg-gold-gradient transition-all duration-700"
                    style={{ width: `${shippingPercentage}%` }}
                  />
                </div>
              </div>

              {/* 2. Items List */}
              <div className="bg-[#f4f4f3]/60 border border-black/5 rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
                {/* Desktop View: Table */}
                <div className="hidden md:block p-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/5">
                        <th className="pb-4 font-label text-xs uppercase tracking-wider text-[#0a0a0a] font-bold">
                          Product
                        </th>
                        <th className="pb-4 font-label text-xs uppercase tracking-wider text-[#0a0a0a] font-bold text-center">
                          Quantity
                        </th>
                        <th className="pb-4 font-label text-xs uppercase tracking-wider text-[#0a0a0a] font-bold text-right">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {cart.map((item) => (
                        <tr key={`${item.id}-${item.size}`}>
                          {/* Product Details */}
                          <td className="py-6">
                            <div className="flex items-center gap-5">
                              <div className="w-20 h-24 bg-[#fcfcfb] overflow-hidden rounded-md border border-black/5 flex-shrink-0 shadow-sm">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="space-y-1">
                                <Link
                                  href={`/shop/product/${item.id}`}
                                  className="font-headline text-[16px] font-bold text-on-surface hover:text-primary transition-colors block"
                                >
                                  {item.name}
                                </Link>
                                <p className="font-label text-[10px] text-primary/80 uppercase tracking-wider font-semibold">
                                  Size: {item.size} • {item.subtitle || "Premium"}
                                </p>
                                <button
                                  onClick={() => removeFromCart(item.id, item.size)}
                                  className="text-on-surface-variant/80 hover:text-error transition-colors flex items-center gap-1 font-label text-[9px] tracking-widest uppercase pt-1 cursor-pointer font-bold border-none bg-transparent"
                                >
                                  <X size={11} /> Remove
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Quantity control */}
                          <td className="py-6 text-center">
                            <div className="flex items-center justify-center gap-2.5 border border-black/10 rounded-full py-1 px-3 w-max mx-auto bg-[#fcfcfb]/50">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="font-label text-xs w-6 text-center text-on-surface font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          </td>

                          {/* Item Price */}
                          <td className="py-6 text-right font-label text-sm font-bold text-on-surface">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View: Cards */}
                <div className="block md:hidden p-4 space-y-4 divide-y divide-white/5">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}`} className={`flex gap-4 ${index > 0 ? "pt-4" : ""}`}>
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 bg-[#fcfcfb] overflow-hidden rounded-md border border-black/5 flex-shrink-0 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Product Details & Actions */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              href={`/shop/product/${item.id}`}
                              className="font-headline text-sm font-bold text-on-surface hover:text-primary transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer border-none bg-transparent"
                              aria-label="Remove item"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="font-label text-[9px] text-primary/80 uppercase tracking-wider font-semibold">
                            Size: {item.size} • {item.subtitle || "Premium"}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          {/* Quantity control */}
                          <div className="flex items-center gap-2 border border-black/10 rounded-full py-0.5 px-2 bg-[#fcfcfb]/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-label text-[11px] w-4 text-center text-on-surface font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <span className="font-label text-sm font-bold text-on-surface">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Deluxe Samples Selection */}
              <div className="bg-[#f4f4f3]/60 border border-black/5 p-6 rounded-xl shadow-lg space-y-4 backdrop-blur-md">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <div className="w-8 h-8 rounded-full bg-[#0a0a0a]/10 text-primary flex items-center justify-center">
                    <Gift className="text-[#0a0a0a]" size={16} />
                  </div>
                  <h3 className="font-headline text-lg font-bold text-on-surface">Select 2 Free Samples</h3>
                </div>
                <p className="font-body text-xs text-on-surface-variant">
                  We invite you to experience other LUMIÈRE rituals. Choose up to two samples to accompany your order.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {samplesList.map((sample) => {
                    const isChecked = selectedSamples.includes(sample.id);
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => handleSampleToggle(sample.id)}
                        className={`p-4 border rounded-xl text-left transition-all duration-300 flex flex-col justify-between h-28 cursor-pointer ${
                          isChecked
                            ? "bg-[#0a0a0a]/10 border-[#0a0a0a]/30 shadow-md"
                            : "border-black/10 bg-[#fcfcfb]/45 hover:bg-[#ffffff] hover:border-black/20"
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="font-label text-xs font-bold text-on-surface leading-tight">
                            {sample.name}
                          </p>
                          <p className="font-body text-[10px] text-on-surface-variant">
                            {sample.desc}
                          </p>
                        </div>
                        <span className="font-label text-[9px] uppercase tracking-widest font-bold text-[#0a0a0a] flex items-center gap-1 self-end mt-2">
                          {isChecked ? <Check size={11} className="text-[#0a0a0a]" /> : "+ Select"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cross-sells */}
              {recommendations.length > 0 && (
                <section className="bg-[#f4f4f3]/60 border border-black/5 p-6 rounded-xl shadow-lg space-y-6 backdrop-blur-md">
                  <h3 className="font-headline text-lg font-bold border-b border-black/5 pb-3 text-on-surface">
                    Recommended for you
                  </h3>
                  <div className="flex gap-6 overflow-x-auto pb-2 custom-scrollbar">
                    {recommendations.map((p) => (
                      <div
                        key={p.id}
                        className="flex-shrink-0 w-48 bg-[#fcfcfb]/40 p-3 rounded-xl border border-black/5 group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="aspect-[4/5] bg-[#f4f4f3] overflow-hidden rounded-lg relative border border-black/5 shadow-sm">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-80" />
                            <button
                              onClick={() => addToCart(p, p.sizes?.[0] || "30ml")}
                              className="absolute bottom-3 right-3 bg-primary hover:bg-[#1a1a19] text-on-primary p-2 rounded-full shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <div className="py-1">
                            <Link href={`/shop/product/${p.id}`} className="font-headline text-sm font-bold text-on-surface hover:text-primary transition-colors line-clamp-1 block">
                              {p.name}
                            </Link>
                            <span className="font-label text-[11px] text-[#0a0a0a] font-bold">₹{p.price.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Summary Column */}
            <aside className="lg:col-span-4 bg-[#f4f4f3]/60 border border-black/5 p-6 md:p-8 rounded-xl space-y-8 sticky top-28 backdrop-blur-md">
              <h3 className="font-label text-xs uppercase tracking-[0.25em] font-bold border-b border-black/5 pb-4 text-on-surface">
                Order Summary
              </h3>

              <div className="space-y-4 font-body text-xs text-on-surface-variant font-bold">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-on-surface">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex justify-between text-primary">
                    <span className="flex items-center gap-1">
                      <Percent size={12} /> Promo code ({promoCode})
                    </span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  {shipping === 0 ? (
                    <span className="text-primary uppercase tracking-wider text-[10px]">Complimentary</span>
                  ) : (
                    <span className="text-on-surface">₹{shipping.toLocaleString("en-IN")}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span>Tax (6%)</span>
                  <span className="text-on-surface">₹{tax.toLocaleString("en-IN")}</span>
                </div>

                {selectedSamples.length > 0 && (
                  <div className="flex justify-between text-[#0a0a0a] border-t border-black/5 pt-3 text-[10px] uppercase font-label">
                    <span>Deluxe Samples ({selectedSamples.length})</span>
                    <span>Free</span>
                  </div>
                )}

                <div className="border-t border-black/5 pt-4 flex justify-between items-center text-on-surface">
                  <span className="font-headline text-md font-bold">Total Amount</span>
                  <span className="font-headline text-xl font-bold text-[#0a0a0a]">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Promo Code input */}
              <div className="space-y-3">
                <label className="block font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold animate-pulse-glow" htmlFor="promo">
                  Promo Code
                </label>
                {promoApplied ? (
                  <div className="flex items-center justify-between bg-[#0a0a0a]/10 text-[#0a0a0a] px-3 py-2.5 text-[10px] uppercase font-label font-bold rounded border border-[#0a0a0a]/20">
                    <span>
                      Applied: {promoCode} ({
                        promoDiscountType === "value"
                          ? `₹${promoDiscount} Off`
                          : `${Math.round(promoDiscount * 100)}% Off`
                      })
                    </span>
                    <button onClick={clearPromoCode} className="text-on-surface-variant hover:text-error cursor-pointer">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      id="promo"
                      placeholder="e.g. LUMIERE15"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="bg-[#fcfcfb] border border-black/10 focus:border-[#0a0a0a] focus:outline-hidden focus:ring-1 focus:ring-[#0a0a0a] rounded text-xs p-2.5 flex-grow text-on-surface placeholder:text-on-surface/20 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-[#1a1a19] text-on-primary px-4 font-label text-[10px] uppercase tracking-wider rounded font-bold cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && <p className="text-error font-label text-[9px] uppercase mt-1">{promoError}</p>}

                {/* Available Offers Tag Grid */}
                {!promoApplied && (
                  <div className="pt-4 border-t border-black/5 space-y-3">
                    <p className="font-label text-[9px] uppercase tracking-[0.15em] text-on-surface-variant/80 font-extrabold flex items-center gap-1.5">
                      <Tag size={11} className="text-[#0a0a0a]" /> Available Offers
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { code: "FLAT100", label: "FLAT100", desc: "Flat ₹100 Off on all rituals" },
                        { code: "FESTIVE250", label: "FESTIVE250", desc: "Flat ₹250 Off on all rituals" },
                        { code: "LUMIERE15", label: "LUMIERE15", desc: "Save 15% on your total order" },
                        { code: "PRESTIGE30", label: "PRESTIGE30", desc: "Premium 30% Off on your order" },
                      ].map((promo) => (
                        <button
                          key={promo.code}
                          type="button"
                          onClick={() => handleQuickApply(promo.code)}
                          className="w-full text-left p-2.5 border border-black/5 hover:border-black/25 bg-[#fcfcfb]/45 hover:bg-white rounded-md transition-all duration-300 flex items-center justify-between cursor-pointer group"
                        >
                          <div className="space-y-0.5">
                            <span className="font-mono text-[11px] font-bold text-[#0a0a0a] tracking-wider border-b border-dashed border-[#0a0a0a]/30 group-hover:border-[#0a0a0a]">
                              {promo.label}
                            </span>
                            <p className="font-body text-[10px] text-on-surface-variant/85 leading-normal">
                              {promo.desc}
                            </p>
                          </div>
                          <span className="font-label text-[9px] uppercase tracking-wider font-extrabold text-[#0a0a0a] group-hover:underline">
                            Apply
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-black/5">
                <Link
                  href="/checkout"
                  className="w-full bg-[#0a0a0a] hover:bg-[#1a1a19] text-[#fcfcfb] py-4 font-label text-xs tracking-[0.25em] uppercase transition-colors flex items-center justify-center gap-2 rounded font-bold shadow-md hover:-translate-y-0.5 duration-300 text-center cursor-pointer"
                >
                  <CreditCard size={14} /> Proceed to Checkout
                </Link>
                <p className="text-center font-label text-[9px] text-on-surface-variant/60 italic leading-relaxed uppercase tracking-wider font-semibold">
                  Secured 256-bit SSL checkout. Samples included with your ritual.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
