"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Star, ShoppingBag, Heart, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { products } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search");

  // Zustand Store
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  // States
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [getCategoryLabel(initialCategory)] : []
  );
  const [selectedSkinType, setSelectedSkinType] = useState("All Skin Types");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minRating, setMinRating] = useState(null);
  const [sortBy, setSortBy] = useState("Newest Arrivals");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Map category slug to display label
  function getCategoryLabel(slug) {
    if (slug === "serums") return "Serums & Oils";
    if (slug === "cleansers") return "Cleansers";
    if (slug === "moisturizers") return "Moisturizers";
    if (slug === "masks") return "Masks";
    return slug;
  }

  // Toggle category filters
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search Filter
        if (initialSearch) {
          const matchName = product.name.toLowerCase().includes(initialSearch.toLowerCase());
          const matchSub = product.subtitle.toLowerCase().includes(initialSearch.toLowerCase());
          if (!matchName && !matchSub) return false;
        }

        // Category Filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
          return false;
        }

        // Skin Type Filter
        if (selectedSkinType !== "All Skin Types" && product.skinType !== selectedSkinType && product.skinType !== "All Skin Types") {
          return false;
        }

        // Price Filter
        if (product.price > maxPrice) {
          return false;
        }

        // Rating Filter
        if (minRating && product.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting Logic
        if (sortBy === "Price: Low to High") return a.price - b.price;
        if (sortBy === "Price: High to Low") return b.price - a.price;
        if (sortBy === "Top Rated") return b.rating - a.rating;
        // Default
        return a.id.localeCompare(b.id);
      });
  }, [initialSearch, selectedCategories, selectedSkinType, maxPrice, minRating, sortBy]);

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-black">
      {/* Editorial Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#fcfcfb] to-[#f4f4f3]/40 py-10 text-center border-b border-black/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0a0a0a]/2 filter blur-[80px] -z-10" />

        <div className="max-w-3xl mx-auto px-6 space-y-2">
          <span className="font-label text-xs uppercase tracking-[0.25em] text-[#0a0a0a] font-bold">
            Mindful Formulations
          </span>
          <h1 className="font-headline text-2xl md:text-3xl text-on-surface tracking-tight font-bold">
            {initialSearch ? `Search: "${initialSearch}"` : "The Collection"}
          </h1>
          <p className="font-body text-on-surface-variant text-[11px] max-w-xl mx-auto leading-relaxed">
            Discover meticulously crafted formulas designed to harmonize with your skin’s natural pathways.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-20 flex flex-col md:flex-row gap-gutter items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0 space-y-8 sticky top-28 pr-4">
          {/* Categories */}
          <div className="bg-[#f4f4f3]/60 border border-black/5 p-6 rounded-xl shadow-lg space-y-4 backdrop-blur-md">
            <h3 className="font-label text-xs uppercase font-bold tracking-widest text-on-surface border-b border-black/5 pb-2">
              Category
            </h3>
            <ul className="space-y-3">
              {["Cleansers", "Serums & Oils", "Moisturizers", "Sun Protection"].map((cat) => (
                <li key={cat}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="rounded border-black/10 bg-[#fcfcfb] text-[#0a0a0a] focus:ring-[#0a0a0a] cursor-pointer"
                    />
                    <span className="font-body text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {cat}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Skin Type */}
          <div className="bg-[#f4f4f3]/60 border border-black/5 p-6 rounded-xl shadow-lg space-y-4 backdrop-blur-md">
            <h3 className="font-label text-xs uppercase font-bold tracking-widest text-on-surface border-b border-black/5 pb-2">
              Skin Type
            </h3>
            <ul className="space-y-3">
              {["All Skin Types", "Oily", "Dry", "Sensitive"].map((type) => (
                <li key={type}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="skinType"
                      checked={selectedSkinType === type}
                      onChange={() => {
                        setSelectedSkinType(type);
                        setCurrentPage(1);
                      }}
                      className="border-black/10 bg-[#fcfcfb] text-[#0a0a0a] focus:ring-[#0a0a0a] cursor-pointer"
                    />
                    <span className="font-body text-xs text-on-surface-variant group-hover:text-on-surface transition-colors">
                      {type}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="bg-[#f4f4f3]/60 border border-black/5 p-6 rounded-xl shadow-lg space-y-4 backdrop-blur-md">
            <h3 className="font-label text-xs uppercase font-bold tracking-widest text-on-surface border-b border-black/5 pb-2">
              Price Range
            </h3>
            <div className="space-y-3 pt-1">
              <input
                type="range"
                min="1000"
                max="6000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full h-1 bg-[#fcfcfb] rounded appearance-none cursor-pointer accent-[#0a0a0a] border border-black/5"
              />
              <div className="flex justify-between font-label text-[10px] text-on-surface-variant">
                <span>Min: ₹1,000</span>
                <span className="font-bold text-[#0a0a0a]">Max: ₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="bg-[#f4f4f3]/60 border border-black/5 p-6 rounded-xl shadow-lg space-y-4 backdrop-blur-md">
            <h3 className="font-label text-xs uppercase font-bold tracking-widest text-on-surface border-b border-black/5 pb-2">
              Ratings
            </h3>
            <ul className="space-y-3">
              <li>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={minRating === 4.5}
                    onChange={(e) => {
                      setMinRating(e.target.checked ? 4.5 : null);
                      setCurrentPage(1);
                    }}
                    className="rounded border-black/10 bg-[#fcfcfb] text-[#0a0a0a] focus:ring-[#0a0a0a] cursor-pointer"
                  />
                  <div className="flex text-[#0a0a0a] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-current" />
                    ))}
                  </div>
                  <span className="font-label text-[10px] text-on-surface-variant font-bold">(4.5+)</span>
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Product Listing */}
        <section className="flex-grow w-full">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/5">
            <p className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}{" "}
              products
            </p>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 font-label text-xs uppercase border border-black/10 px-4 py-2 bg-[#f4f4f3] hover:bg-black/5 transition-colors rounded-sm cursor-pointer"
              >
                <SlidersHorizontal size={12} /> Filters
              </button>

              <div className="flex items-center gap-2">
                <ArrowUpDown size={12} className="text-[#0a0a0a]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none font-label text-xs text-on-surface focus:ring-0 cursor-pointer pr-8 py-1 font-bold bg-[#fcfcfb] rounded border border-black/5 focus:outline-hidden"
                >
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-body text-xs md:text-sm text-on-surface-variant italic">
                No products match your selected filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSkinType("All Skin Types");
                  setMaxPrice(6000);
                  setMinRating(null);
                }}
                className="bg-primary hover:bg-[#1a1a19] text-on-primary px-8 py-3.5 font-label text-xs tracking-widest uppercase transition-colors rounded-sm font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {paginatedProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex"
                  >
                    <Link
                      href={`/shop/product/${product.id}`}
                      className="bg-[#f4f4f3]/60 p-3 md:p-4 rounded-xl border border-black/5 hover:border-[#0a0a0a]/30 transition-all duration-500 flex flex-col justify-between w-full group shadow-md cursor-pointer text-left"
                    >
                      {/* Image Panel */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#fcfcfb] rounded-lg border border-black/5 mb-3 md:mb-4 shadow-inner">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[0.8s] ease-out opacity-85"
                        />

                        {/* Overlays */}
                        <div className="absolute top-2 inset-x-2 flex justify-between items-start z-10">
                          <div className="flex flex-col gap-1">
                            {product.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-[#0a0a0a] text-[#fcfcfb] font-label text-[7px] md:text-[8px] tracking-widest px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-sm uppercase font-bold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(product);
                            }}
                            className={`p-1.5 md:p-2 rounded-full border transition-all duration-300 backdrop-blur-xs cursor-pointer ${
                              isProductInWishlist(product.id)
                                ? "bg-primary border-primary text-on-primary shadow-sm"
                                : "bg-[#fcfcfb]/80 border-black/10 text-on-surface hover:text-[#0a0a0a] hover:bg-[#fcfcfb]"
                            }`}
                          >
                            <Heart size={12} className={isProductInWishlist(product.id) ? "fill-current" : ""} />
                          </button>
                        </div>
                      </div>

                      {/* Metadata Details */}
                      <div className="text-center space-y-1.5 px-2 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="font-headline text-[14px] md:text-[17px] font-bold text-on-surface hover:text-[#0a0a0a] transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="font-body text-[10px] md:text-xs text-on-surface-variant line-clamp-1">
                            {product.subtitle}
                          </p>
                        </div>
                        
                        <div className="space-y-2.5 md:space-y-3 pt-1">
                          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3 text-[#0a0a0a]">
                            <span className="font-label text-xs md:text-sm font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                            <span className="hidden sm:inline w-1 h-1 bg-black/10 rounded-full" />
                            <div className="flex items-center gap-1">
                              <Star size={9} className="fill-current text-black" />
                              <span className="font-label text-[9px] font-bold">{product.rating}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product, product.sizes?.[0] || "30ml");
                              }}
                              className="bg-black hover:bg-[#1a1a19] text-white py-2 rounded-sm font-label text-[8px] md:text-[10px] tracking-wider uppercase font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
                            >
                              <ShoppingBag size={10} /> Add
                            </button>
                            <div className="border border-black/20 hover:border-[#0a0a0a] text-black py-2 rounded-sm font-label text-[8px] md:text-[10px] tracking-wider uppercase font-bold flex items-center justify-center transition-colors">
                              View
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination Row */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 text-on-surface-variant hover:border-[#0a0a0a] disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer bg-[#f4f4f3]/40"
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-label text-xs tracking-wider transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#0a0a0a] text-on-primary font-bold shadow-md"
                        : "hover:bg-black/5 text-on-surface-variant hover:text-on-surface border border-black/5 bg-[#f4f4f3]/30"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-black/10 text-on-surface-variant hover:border-[#0a0a0a] disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer bg-[#f4f4f3]/40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Drawer Filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 bottom-0 w-[300px] z-50 bg-[#ffffff] p-6 shadow-2xl flex flex-col md:hidden overflow-y-auto border-r border-[#0a0a0a]/10"
            >
              <div className="flex justify-between items-center mb-6 border-b border-black/5 pb-3">
                <span className="font-headline text-lg font-bold text-on-surface">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 hover:bg-black/5 rounded-full text-on-surface-variant cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-8 flex-grow">
                <div>
                  <h4 className="font-label text-xs uppercase font-bold tracking-widest text-[#0a0a0a] mb-3 border-b border-black/5 pb-1.5">
                    Category
                  </h4>
                  <ul className="space-y-2">
                    {["Cleansers", "Serums & Oils", "Moisturizers", "Sun Protection"].map((cat) => (
                      <li key={cat}>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                            className="rounded border-black/10 bg-[#fcfcfb] text-[#0a0a0a] focus:ring-[#0a0a0a] cursor-pointer"
                          />
                          <span className="font-body text-xs text-on-surface-variant">{cat}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-label text-xs uppercase font-bold tracking-widest text-[#0a0a0a] mb-3 border-b border-black/5 pb-1.5">
                    Skin Type
                  </h4>
                  <ul className="space-y-2">
                    {["All Skin Types", "Oily", "Dry", "Sensitive"].map((type) => (
                      <li key={type}>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="skinTypeMobile"
                            checked={selectedSkinType === type}
                            onChange={() => {
                              setSelectedSkinType(type);
                              setCurrentPage(1);
                            }}
                            className="border-black/10 bg-[#fcfcfb] text-[#0a0a0a] focus:ring-[#0a0a0a] cursor-pointer"
                          />
                          <span className="font-body text-xs text-on-surface-variant">{type}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-label text-xs uppercase font-bold tracking-widest text-[#0a0a0a] mb-3 border-b border-black/5 pb-1.5">
                    Price Range
                  </h4>
                  <input
                    type="range"
                    min="1000"
                    max="6000"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full h-1 bg-[#fcfcfb] rounded accent-[#0a0a0a] mt-2 cursor-pointer border border-black/5"
                  />
                  <div className="flex justify-between font-label text-[10px] text-on-surface-variant mt-1">
                    <span>Min: ₹1,000</span>
                    <span className="font-bold text-[#0a0a0a]">Max: ₹{maxPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/5">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-primary hover:bg-[#1a1a19] text-on-primary py-3.5 font-label text-xs tracking-widest uppercase transition-colors rounded-sm font-bold cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfb]">
        <div className="font-headline text-lg animate-pulse tracking-widest text-[#0a0a0a]">LOADING COLLECTION...</div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
