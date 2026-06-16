"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Check, CreditCard, Landmark, Truck, ShieldCheck, ShoppingBag, Lock, Percent } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cart, createOrder, promoDiscount, promoDiscountType } = useStore();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  // Form States
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [createdOrder, setCreatedOrder] = useState(null);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = promoDiscountType === "value"
    ? Math.min(subtotal, promoDiscount)
    : subtotal * promoDiscount;
  const tax = subtotal * 0.06;
  const shipping = subtotal >= 2999 ? 0 : 150;
  const total = Math.max(0, subtotal - discountAmount + tax + shipping);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const order = createOrder(shippingForm, paymentForm);
    if (order) {
      setCreatedOrder(order);
      setStep(3);
    }
  };

  // If cart is empty and not on success, redirect
  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#fcfcfb] text-black">
        <ShoppingBag size={48} className="text-[#0a0a0a] mb-4 stroke-[1.2]" />
        <h2 className="font-headline text-2xl mb-2 font-bold">No items to checkout</h2>
        <p className="font-body text-xs text-on-surface-variant mb-6">Your bag is currently empty.</p>
        <Link
          href="/shop"
          className="bg-primary hover:bg-[#1a1a19] text-on-primary px-8 py-4 font-label text-xs tracking-widest uppercase transition-colors rounded font-bold cursor-pointer"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfb] text-black min-h-screen py-16">
      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <header className="mb-14 text-center max-w-xl mx-auto space-y-6">
          <h1 className="font-headline text-[38px] md:text-[52px] text-on-surface font-bold leading-tight">Checkout</h1>
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-label text-[10px] ${
                step >= 1 ? "bg-primary text-on-primary font-bold shadow-md" : "bg-[#f4f4f3] border border-black/5 text-on-surface-variant/40"
              }`}>
                {step > 1 ? <Check size={12} /> : "1"}
              </span>
              <span className={`font-label text-[10px] uppercase tracking-wider font-bold ${
                step >= 1 ? "text-[#0a0a0a]" : "text-on-surface-variant/40"
              }`}>
                Shipping
              </span>
            </div>
            <div className="w-8 h-[1px] bg-black/5" />
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-label text-[10px] ${
                step >= 2 ? "bg-primary text-on-primary font-bold shadow-md" : "bg-[#f4f4f3] border border-black/5 text-on-surface-variant/40"
              }`}>
                {step > 2 ? <Check size={12} /> : "2"}
              </span>
              <span className={`font-label text-[10px] uppercase tracking-wider font-bold ${
                step >= 2 ? "text-[#0a0a0a]" : "text-on-surface-variant/40"
              }`}>
                Payment
              </span>
            </div>
            <div className="w-8 h-[1px] bg-black/5" />
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-label text-[10px] ${
                step === 3 ? "bg-primary text-on-primary font-bold shadow-md" : "bg-[#f4f4f3] border border-black/5 text-on-surface-variant/40"
              }`}>
                3
              </span>
              <span className={`font-label text-[10px] uppercase tracking-wider font-bold ${
                step === 3 ? "text-[#0a0a0a]" : "text-on-surface-variant/40"
              }`}>
                Confirmation
              </span>
            </div>
          </div>
        </header>

        {step !== 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-[#f4f4f3]/60 p-6 md:p-10 border border-black/5 rounded-xl shadow-lg backdrop-blur-md">
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="space-y-8">
                  <h2 className="font-headline text-xl border-b border-black/5 pb-4 flex items-center gap-2 font-bold text-on-surface">
                    <Truck size={18} className="text-[#0a0a0a]" /> Shipping Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. Elena"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. Rostova"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                      placeholder="e.g. 12, Ground Floor, Lodhi Colony Market, Lodhi Estate"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. New Delhi"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. Delhi"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        Postal / ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.zipCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. 110003"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingForm.country}
                        onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. India"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-[#1a1a19] text-on-primary py-4 font-label text-xs tracking-widest uppercase transition-colors rounded font-bold shadow-md hover:-translate-y-0.5 duration-300 cursor-pointer"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <h2 className="font-headline text-xl border-b border-black/5 pb-4 flex items-center gap-2 font-bold text-on-surface">
                    <CreditCard size={18} className="text-[#0a0a0a]" /> Payment Details
                  </h2>

                  <div className="bg-[#fcfcfb]/60 p-4 rounded-xl border border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="text-[#0a0a0a] animate-pulse" size={20} />
                      <div>
                        <p className="font-label text-xs uppercase font-bold text-on-surface">Secure Payment Processing</p>
                        <p className="font-body text-[10px] text-on-surface-variant/80">Encrypted checkout by SSL</p>
                      </div>
                    </div>
                    <ShieldCheck className="text-primary" size={24} />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentForm.cardName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                      className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                      placeholder="e.g. Elena Rostova"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                      className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                      placeholder="e.g. 4321 5678 9012 4580"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentForm.expiry}
                        onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="•••"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 border border-[#0a0a0a]/40 text-[#0a0a0a] py-4 font-label text-xs tracking-widest uppercase hover:bg-black/5 transition-all duration-300 rounded font-bold cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-primary hover:bg-[#1a1a19] text-on-primary py-4 font-label text-xs tracking-widest uppercase transition-colors duration-300 rounded font-bold shadow-md cursor-pointer"
                    >
                      Pay ₹{total.toLocaleString("en-IN")}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Summary */}
            <aside className="lg:col-span-4 bg-[#f4f4f3]/60 p-6 md:p-8 rounded-xl border border-black/5 space-y-6 backdrop-blur-md">
              <h3 className="font-label text-xs uppercase tracking-[0.25em] font-bold border-b border-black/5 pb-3 text-on-surface">
                Order Review
              </h3>

              {/* Items List */}
              <div className="divide-y divide-white/5 max-h-64 overflow-y-auto custom-scrollbar pr-2 space-y-1">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="py-3.5 flex gap-3 text-xs">
                    <div className="w-12 h-15 bg-[#fcfcfb] overflow-hidden rounded border border-black/5 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-headline font-bold text-on-surface truncate">{item.name}</h4>
                      <p className="font-body text-[10px] text-on-surface-variant mt-0.5 uppercase tracking-wider font-semibold">
                        {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-label font-bold text-on-surface">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-black/5 pt-4 space-y-3.5 font-body text-xs text-on-surface-variant font-bold">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-on-surface">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-primary font-bold">
                    <span className="flex items-center gap-1"><Percent size={11} /> Discount</span>
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
                <div className="border-t border-black/5 pt-3 flex justify-between items-center text-on-surface">
                  <span className="font-label text-xs font-bold uppercase tracking-wider">Total</span>
                  <span className="font-headline text-lg font-bold text-[#0a0a0a]">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Step 3: Success Screen */
          <div className="max-w-xl mx-auto bg-[#f4f4f3]/60 border border-black/5 p-8 md:p-12 text-center space-y-6 shadow-2xl rounded-xl backdrop-blur-md">
            <div className="w-16 h-16 bg-[#0a0a0a]/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0a0a0a]/20 shadow-md">
              <Check size={28} className="text-[#0a0a0a]" />
            </div>
            
            <h2 className="font-headline text-3xl font-bold text-on-surface">Order Confirmed</h2>
            <p className="font-label text-xs uppercase tracking-widest text-[#0a0a0a] font-bold">
              Your skincare ritual is on its way
            </p>

            {createdOrder && (
              <div className="bg-[#fcfcfb]/60 p-6 rounded-xl text-xs md:text-sm font-body text-on-surface-variant space-y-3 text-left border border-black/5 font-medium">
                <div className="flex justify-between">
                  <span className="font-bold text-on-surface">Order Reference:</span>
                  <span className="font-mono font-bold text-primary">{createdOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-on-surface">Carrier Estimate:</span>
                  <span className="text-on-surface">{new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-on-surface">Total Charge:</span>
                  <span className="font-bold text-primary">₹{createdOrder.total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-on-surface">Ship To:</span>
                  <span className="text-right text-on-surface">
                    {createdOrder.shippingInfo?.firstName} {createdOrder.shippingInfo?.lastName}<br />
                    {createdOrder.shippingInfo?.address}, {createdOrder.shippingInfo?.city}, {createdOrder.shippingInfo?.state || ""}<br />
                    {createdOrder.shippingInfo?.zipCode || ""}, {createdOrder.shippingInfo?.country || ""}
                  </span>
                </div>
              </div>
            )}

            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              We have sent a receipt confirmation email. A trackable carrier dispatch notification will follow as soon as the items depart our laboratory.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link
                href="/shop"
                className="border border-[#0a0a0a]/40 text-[#0a0a0a] py-3.5 font-label text-xs tracking-widest uppercase hover:bg-black/5 transition-colors rounded font-bold text-center cursor-pointer"
              >
                Continue Shopping
              </Link>
              <Link
                href="/account"
                onClick={() => useStore.getState().setAccountTab("orders")}
                className="bg-primary hover:bg-[#1a1a19] text-on-primary py-3.5 font-label text-xs tracking-widest uppercase transition-all duration-300 rounded font-bold text-center cursor-pointer shadow-md"
              >
                Track Orders
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
