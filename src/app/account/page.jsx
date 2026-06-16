"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { User, Heart, Package, LogOut, Check, ShoppingBag, X, Calendar, Settings, ArrowRight } from "lucide-react";

export default function AccountPage() {
  const {
    user,
    orders,
    wishlist,
    accountTab,
    setAccountTab,
    updateUserProfile,
    addToCart,
    toggleWishlist,
  } = useStore();

  const [editForm, setEditForm] = useState({ ...user });
  const [successMsg, setSuccessMsg] = useState("");

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(editForm);
    setSuccessMsg("Your profile details have been saved.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleAddAllWishlistToBag = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => addToCart(item, item.sizes?.[0] || "30ml"));
  };

  return (
    <div className="bg-[#fcfcfb] text-black min-h-screen py-16">
      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Page Header */}
        <header className="mb-14 border-b border-black/5 pb-6">
          <h1 className="font-headline text-[38px] md:text-[52px] text-on-surface font-bold leading-tight">My Account</h1>
          <p className="font-body text-xs text-on-surface-variant/80 mt-1 uppercase tracking-wider font-semibold">
            Welcome back, <span className="text-[#0a0a0a] font-bold">{user.name}</span>. Review your orders and wishlist.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Tabs Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-[#f4f4f3]/60 border border-black/5 rounded-xl p-4 shadow-lg space-y-1 backdrop-blur-md">
            {[
              { id: "profile", label: "Personal Profile", icon: User },
              { id: "wishlist", label: "My Wishlist", icon: Heart, badge: wishlist.length },
              { id: "orders", label: "Order History", icon: Package, badge: orders.length },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAccountTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3.5 font-label text-xs uppercase tracking-widest rounded-lg transition-all duration-300 font-bold cursor-pointer ${
                    accountTab === tab.id
                      ? "bg-primary text-on-primary shadow-md"
                      : "hover:bg-black/5 text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-xs ${
                      accountTab === tab.id ? "bg-[#fcfcfb] text-[#0a0a0a]" : "bg-[#0a0a0a] text-[#fcfcfb]"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
            
            <button className="w-full flex items-center gap-3 p-3.5 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors mt-4 border-t border-black/5 pt-4 font-bold cursor-pointer">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </aside>

          {/* Active Panel Content */}
          <div className="lg:col-span-9 bg-[#f4f4f3]/60 border border-black/5 p-6 md:p-10 rounded-xl shadow-lg backdrop-blur-md">
            
            {/* 1. Profile */}
            {accountTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <h2 className="font-headline text-xl border-b border-black/5 pb-4 flex items-center gap-2 font-bold text-on-surface">
                  <Settings size={18} className="text-[#0a0a0a]" /> Profile Settings
                </h2>

                {successMsg && (
                  <div className="bg-[#0a0a0a]/10 text-[#0a0a0a] p-4 rounded border border-[#0a0a0a]/20 text-xs font-label uppercase flex items-center gap-2 animate-fade-in-up font-bold">
                    <Check size={14} /> {successMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-[#fcfcfb] border border-black/10 focus:border-[#0a0a0a] focus:outline-hidden focus:ring-1 focus:ring-[#0a0a0a] rounded p-3.5 font-body text-xs md:text-sm text-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full bg-[#fcfcfb] border border-black/10 focus:border-[#0a0a0a] focus:outline-hidden focus:ring-1 focus:ring-[#0a0a0a] rounded p-3.5 font-body text-xs md:text-sm text-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full bg-[#fcfcfb] border border-black/10 focus:border-[#0a0a0a] focus:outline-hidden focus:ring-1 focus:ring-[#0a0a0a] rounded p-3.5 font-body text-xs md:text-sm text-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                      Address
                    </label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full bg-[#fcfcfb] border border-black/10 focus:border-[#0a0a0a] focus:outline-hidden focus:ring-1 focus:ring-[#0a0a0a] rounded p-3.5 font-body text-xs md:text-sm text-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                      City
                    </label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full bg-[#fcfcfb] border border-black/10 focus:border-[#0a0a0a] focus:outline-hidden focus:ring-1 focus:ring-[#0a0a0a] rounded p-3.5 font-body text-xs md:text-sm text-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={editForm.zipCode}
                      onChange={(e) => setEditForm({ ...editForm, zipCode: e.target.value })}
                      className="w-full bg-[#fcfcfb] border border-black/10 focus:border-[#0a0a0a] focus:outline-hidden focus:ring-1 focus:ring-[#0a0a0a] rounded p-3.5 font-body text-xs md:text-sm text-on-surface"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-[#1a1a19] text-on-primary px-8 py-3.5 font-label text-xs tracking-widest uppercase transition-colors duration-300 rounded font-bold shadow-md cursor-pointer hover:-translate-y-0.5 duration-300"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* 2. Wishlist */}
            {accountTab === "wishlist" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-black/5 pb-4 gap-4">
                  <h2 className="font-headline text-xl flex items-center gap-2 font-bold text-on-surface">
                    <Heart size={18} className="text-[#0a0a0a]" /> Wishlist Items
                  </h2>
                  {wishlist.length > 0 && (
                    <button
                      onClick={handleAddAllWishlistToBag}
                      className="text-primary hover:text-on-surface font-label text-[10px] tracking-widest uppercase flex items-center gap-1.5 border border-[#0a0a0a]/40 hover:border-[#0a0a0a] px-4 py-2 rounded-full hover:bg-[#0a0a0a]/10 font-bold transition-all duration-300 cursor-pointer"
                    >
                      <ShoppingBag size={11} /> Add All to Bag
                    </button>
                  )}
                </div>

                {wishlist.length === 0 ? (
                  <div className="py-16 text-center space-y-4 max-w-sm mx-auto">
                    <Heart size={36} className="text-on-surface-variant/40 mx-auto stroke-[1.2]" />
                    <p className="font-body text-xs text-on-surface-variant">Your wishlist is currently empty.</p>
                    <Link
                      href="/shop"
                      className="inline-block bg-primary hover:bg-[#1a1a19] text-on-primary px-8 py-3.5 font-label text-xs uppercase tracking-wider font-bold rounded cursor-pointer"
                    >
                      Browse Skincare
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="border border-black/5 p-3 rounded-xl bg-[#fcfcfb]/40 flex flex-col justify-between hover:border-[#0a0a0a]/25 transition-all group relative"
                      >
                        <div>
                          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#f4f4f3] relative border border-black/5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                            <button
                              onClick={() => toggleWishlist(item)}
                              className="absolute top-2.5 right-2.5 bg-[#fcfcfb]/80 p-1.5 rounded-full text-on-surface hover:text-error hover:bg-[#fcfcfb] shadow-md transition-colors z-10 cursor-pointer border border-black/5"
                            >
                              <X size={12} />
                            </button>
                          </div>
                          
                          <div className="mt-3 space-y-0.5 px-1">
                            <Link
                              href={`/shop/product/${item.id}`}
                              className="font-headline text-[15px] font-bold text-on-surface hover:text-primary transition-colors line-clamp-1 block"
                            >
                              {item.name}
                            </Link>
                            <p className="font-label text-xs text-[#0a0a0a] font-bold">${item.price.toFixed(2)}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(item, item.sizes?.[0] || "30ml")}
                          className="w-full bg-black hover:bg-[#0a0a0a] text-[#fcfcfb] py-2.5 font-label text-[10px] tracking-widest uppercase transition-colors duration-300 mt-4 rounded font-bold cursor-pointer"
                        >
                          Add to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Orders */}
            {accountTab === "orders" && (
              <div className="space-y-6">
                <h2 className="font-headline text-xl border-b border-black/5 pb-4 flex items-center gap-2 font-bold text-on-surface">
                  <Package size={18} className="text-[#0a0a0a]" /> Purchase History
                </h2>

                {orders.length === 0 ? (
                  <div className="py-16 text-center space-y-4 max-w-sm mx-auto">
                    <Package size={36} className="text-on-surface-variant/40 mx-auto stroke-[1.2]" />
                    <p className="font-body text-xs text-on-surface-variant">No orders placed yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-black/5 rounded-xl bg-[#fcfcfb]/40 overflow-hidden shadow-md"
                      >
                        {/* Header Details */}
                        <div className="bg-[#f4f4f3]/90 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-black/5">
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-label text-on-surface-variant font-bold">
                            <div>
                              <p className="uppercase text-[8px] tracking-widest text-on-surface-variant/60">Ordered On</p>
                              <p className="text-on-surface flex items-center gap-1 mt-0.5">
                                <Calendar size={11} className="text-[#0a0a0a]" /> {order.date}
                              </p>
                            </div>
                            <div>
                              <p className="uppercase text-[8px] tracking-widest text-on-surface-variant/60">Order Reference</p>
                              <p className="text-on-surface mt-0.5">{order.id}</p>
                            </div>
                            <div>
                              <p className="uppercase text-[8px] tracking-widest text-on-surface-variant/60">Total Cost</p>
                              <p className="text-[#0a0a0a] mt-0.5">${order.total.toFixed(2)}</p>
                            </div>
                          </div>

                          <span className={`px-3 py-1 font-label text-[9px] uppercase tracking-wider rounded-full font-bold shadow-xs ${
                            order.status === "Delivered"
                              ? "bg-[#0a0a0a]/10 text-[#0a0a0a] border border-[#0a0a0a]/20"
                              : "bg-black/10 text-on-surface border border-black/10"
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="p-4 divide-y divide-white/5">
                          {order.items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="py-3.5 flex justify-between items-center gap-4 text-xs font-body">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-14 bg-[#f4f4f3] overflow-hidden rounded border border-black/5 flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div>
                                  <h4 className="font-headline font-bold text-on-surface">{item.name}</h4>
                                  <p className="font-label text-[9px] text-on-surface-variant mt-0.5 uppercase tracking-widest font-semibold">
                                    Size: {item.size} • Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="font-label font-bold text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
