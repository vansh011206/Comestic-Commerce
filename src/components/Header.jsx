"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Search, ShoppingBag, Heart, X, Plus, Minus, Menu, ArrowRight, Home, LayoutGrid, User, Check } from "lucide-react";
import { products } from "@/data/products";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileAlertOpen, setProfileAlertOpen] = useState(false);

  const {
    wishlist,
    searchOpen,
    setSearchOpen,
    cart,
    toastOpen,
    toastProduct,
  } = useStore();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSearchProducts = searchQuery.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const triggerProfileAlert = () => {
    setProfileAlertOpen(true);
    setTimeout(() => {
      setProfileAlertOpen(false);
    }, 3500);
  };

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Glassmorphic Header */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          scrolled
            ? "top-4 max-w-(--spacing-container-max) mx-6 md:mx-auto rounded-full glass-nav shadow-2xl border border-[#0a0a0a]/5 h-16 px-8"
            : "top-0 w-full bg-transparent h-20 px-6 md:px-margin-desktop border-b border-[#0a0a0a]/5"
        }`}
      >
        {/* Symmetrical Grid Container */}
        <div className="h-full grid grid-cols-3 items-center">
          
          {/* Col 1: Logo (Shows on both Mobile and Desktop) */}
          <div className="flex items-center justify-start">
            <Link
              href="/"
              className="font-headline text-[20px] md:text-[26px] font-extrabold tracking-[0.25em] text-[#0a0a0a] hover:opacity-90 transition-opacity"
            >
              LUMIÈRE
            </Link>
          </div>

          {/* Col 2: Desktop Centered Links (Hidden on Mobile) */}
          <div className="flex items-center justify-center">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`font-label text-xs tracking-[0.2em] uppercase py-2 relative transition-colors duration-300 font-medium ${
                      isActive ? "text-[#000000] font-bold" : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#444] to-[#000]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#000000]/30 -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Col 3: Action Icons (Desktop) / Profile Icon (Mobile) */}
          <div className="flex items-center justify-end gap-1.5 md:gap-4">
            {/* Mobile Profile Trigger (Shows on mobile, hidden on desktop) */}
            <button
              onClick={triggerProfileAlert}
              className="md:hidden p-2 text-on-surface hover:text-[#000000] hover:bg-black/5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer border-none bg-transparent"
              aria-label="Profile"
            >
              <User size={20} className="stroke-[1.6]" />
            </button>

            {/* Desktop Action Icons (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-on-surface hover:text-[#000000] hover:bg-[#000000]/5 rounded-full transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <Search size={19} className="stroke-[1.5]" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/account"
                onClick={() => useStore.getState().setAccountTab("wishlist")}
                className="p-2 text-on-surface hover:text-[#000000] hover:bg-[#000000]/5 rounded-full transition-all duration-300 active:scale-95 relative cursor-pointer"
              >
                <Heart size={19} className="stroke-[1.5]" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                    {wishlistItemsCount}
                  </span>
                )}
              </Link>

              {/* Cart Link (Direct Page Nav) */}
              <Link
                href="/cart"
                className="p-2 text-on-surface hover:text-[#000000] hover:bg-[#000000]/5 rounded-full transition-all duration-300 active:scale-95 relative cursor-pointer"
              >
                <ShoppingBag size={19} className="stroke-[1.5]" />
                {cartItemsCount > 0 && (
                  <motion.span
                    key={cartItemsCount}
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-60 bg-[#fcfcfb]/95 backdrop-blur-md border-t border-black/5 h-16 pb-safe block md:hidden shadow-lg">
        <div className="h-full flex justify-around items-center px-2">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${
              pathname === "/" ? "text-black font-bold" : "text-on-surface-variant/70 hover:text-black"
            }`}
          >
            <Home size={18} className="stroke-[1.6]" />
            <span className="font-label text-[9px] uppercase tracking-wider mt-1 scale-90">Home</span>
          </Link>

          {/* Shop */}
          <Link
            href="/shop"
            className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${
              pathname === "/shop" ? "text-black font-bold" : "text-on-surface-variant/70 hover:text-black"
            }`}
          >
            <LayoutGrid size={18} className="stroke-[1.6]" />
            <span className="font-label text-[9px] uppercase tracking-wider mt-1 scale-90">Shop</span>
          </Link>

          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center w-12 h-12 transition-colors text-on-surface-variant/70 hover:text-black cursor-pointer border-none bg-transparent"
          >
            <Search size={18} className="stroke-[1.6]" />
            <span className="font-label text-[9px] uppercase tracking-wider mt-1 scale-90">Search</span>
          </button>

          {/* Wishlist */}
          <Link
            href="/account"
            onClick={() => useStore.getState().setAccountTab("wishlist")}
            className={`flex flex-col items-center justify-center w-12 h-12 relative transition-colors ${
              pathname === "/account" && useStore.getState().accountTab === "wishlist"
                ? "text-black font-bold"
                : "text-on-surface-variant/70 hover:text-black"
            }`}
          >
            <Heart size={18} className="stroke-[1.6]" />
            {wishlistItemsCount > 0 && (
              <span className="absolute top-1.5 right-2 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                {wishlistItemsCount}
              </span>
            )}
            <span className="font-label text-[9px] uppercase tracking-wider mt-1 scale-90">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className={`flex flex-col items-center justify-center w-12 h-12 relative transition-colors ${
              pathname === "/cart" ? "text-black font-bold" : "text-on-surface-variant/70 hover:text-black"
            }`}
          >
            <ShoppingBag size={18} className="stroke-[1.6]" />
            {cartItemsCount > 0 && (
              <span className="absolute top-1.5 right-2 bg-black text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-xs">
                {cartItemsCount}
              </span>
            )}
            <span className="font-label text-[9px] uppercase tracking-wider mt-1 scale-90">Cart</span>
          </Link>
        </div>
      </div>

      {/* Profile Popup Alert Toast (Appears side-screen/bottom without navigation) */}
      <AnimatePresence>
        {profileAlertOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-6 right-6 z-50 p-4 bg-black text-white text-[10px] font-label uppercase tracking-widest text-center rounded-xl shadow-2xl flex items-center justify-between gap-4 border border-white/10"
          >
            <span className="font-bold flex-1 text-center">Profile services will be available soon</span>
            <button
              onClick={() => setProfileAlertOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full text-white cursor-pointer border-none bg-transparent shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Added to Cart Toast Popup */}
      <AnimatePresence>
        {toastOpen && toastProduct && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 right-6 left-6 md:left-auto md:w-96 z-50 p-4 bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border border-black/5 flex flex-col gap-3.5"
          >
            <div className="flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                <Check size={16} className="stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label text-[10px] uppercase tracking-widest text-black font-bold">Added to Bag</p>
                <h4 className="font-headline text-[14px] font-bold text-black truncate mt-0.5">{toastProduct.name}</h4>
              </div>
              <div className="w-10 h-12 rounded overflow-hidden bg-[#f4f4f3] border border-black/5 shrink-0">
                <img src={toastProduct.image} alt={toastProduct.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex gap-2.5 pt-2 border-t border-black/5">
              <Link
                href="/cart"
                className="flex-1 bg-black hover:bg-[#1a1a19] text-white py-2.5 font-label text-[10px] tracking-widest uppercase text-center rounded font-bold transition-colors shadow-xs"
              >
                View Bag
              </Link>
              <Link
                href="/checkout"
                className="flex-1 border border-black/20 hover:border-[#0a0a0a] text-black py-2.5 font-label text-[10px] tracking-widest uppercase text-center rounded font-bold transition-colors"
              >
                Checkout
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Fullscreen Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#fcfcfb]/98 backdrop-blur-2xl flex flex-col p-6 md:p-margin-desktop pb-24 md:pb-margin-desktop"
          >
            <div className="max-w-2xl mx-auto w-full flex flex-col h-full">
              <div className="flex justify-between items-center mb-8 h-20 border-b border-black/5">
                <span className="font-headline text-lg tracking-[0.2em] text-[#0a0a0a] font-extrabold">
                  SEARCH LUMIÈRE
                </span>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer text-on-surface"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="relative border-b border-black/20 pb-3">
                <input
                  type="text"
                  placeholder="Search for serums, creams, cleansers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm md:text-xl font-headline placeholder:text-black/30 placeholder:text-[11px] md:placeholder:text-sm p-0 text-black pr-20"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white hover:bg-black/80 rounded font-label text-[10px] tracking-widest uppercase transition-colors cursor-pointer font-bold"
                >
                  Search
                </button>
              </form>

              {/* Suggestions Grid */}
              <div className="flex-1 overflow-y-auto custom-scrollbar mt-8 pb-4">
                {searchQuery.trim() === "" ? (
                  <div className="space-y-5">
                    <h4 className="font-label text-[10px] tracking-widest uppercase text-black/50 font-bold">
                      Suggested Searches
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {["Serum", "Cream", "Cleanser", "SPF", "Rose", "Hydra"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 py-2 bg-black/5 hover:bg-black/10 text-black/80 hover:text-black text-xs tracking-wider transition-all rounded border border-black/5 cursor-pointer font-semibold uppercase font-label"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredSearchProducts.length === 0 ? (
                  <p className="font-body text-xs text-black/50 italic mt-4">
                    No products found matching "{searchQuery}".
                  </p>
                ) : (
                  <div className="space-y-5">
                    <h4 className="font-label text-[10px] tracking-widest uppercase text-black/50 font-bold">
                      Products Found ({filteredSearchProducts.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredSearchProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/shop/product/${p.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex gap-4 p-3 bg-white hover:bg-black/5 border border-black/5 hover:border-black/10 transition-all rounded-xl group shadow-sm items-center"
                        >
                          <div className="w-12 h-15 bg-[#f4f4f3] overflow-hidden rounded-lg flex-shrink-0 border border-black/5">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-headline text-sm font-bold text-black group-hover:text-black/70 transition-colors truncate">
                              {p.name}
                            </h5>
                            <p className="font-body text-[10px] text-black/50 truncate mt-0.5">{p.subtitle}</p>
                            <p className="font-label text-[11px] text-[#000] font-extrabold mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 w-[300px] z-50 bg-[#fcfcfb]/98 backdrop-blur-3xl p-6 shadow-2xl flex flex-col md:hidden border-r border-[#0a0a0a]/5"
            >
              <div className="flex justify-between items-center mb-10 h-10">
                <span className="font-headline text-lg tracking-[0.2em] text-gold-gradient font-bold">LUMIÈRE</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 hover:bg-black/5 rounded-full text-on-surface-variant cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-label text-sm uppercase tracking-widest text-on-surface hover:text-[#000000] transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>

              <div className="mt-auto border-t border-black/5 pt-6 space-y-4">
                <Link
                  href="/account"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    useStore.getState().setAccountTab("profile");
                  }}
                  className="font-label text-xs uppercase tracking-widest text-on-surface-variant block hover:text-primary"
                >
                  My Profile
                </Link>
                <p className="font-label text-[9px] text-on-surface-variant/40 tracking-wider">
                  © 2026 Lumière Skincare. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
