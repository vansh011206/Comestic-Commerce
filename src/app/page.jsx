"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ChevronLeft, ChevronRight, Star, ShoppingBag, ArrowRight, Sparkles, Heart, Check, Droplet, Leaf, Wind } from "lucide-react";
import { products } from "@/data/products";

export default function HomePage() {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const carouselRef = useRef(null);

  // Routine Finder State
  const [selectedConcern, setSelectedConcern] = useState("glow");
  const [addedRoutineId, setAddedRoutineId] = useState(null);

  // Mouse spotlight coordinates state for Bento Grid
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Best sellers
  const bestSellers = products.filter((p) => p.tags.includes("Best Seller") || p.rating >= 4.8);

  // Featured Products (6 items for direct shopping)
  const featuredProductIds = [
    "radiance-glow-serum",
    "velvet-hydra-cream",
    "deep-purifying-cleanser",
    "eternal-rose-serum",
    "mineral-spf-50",
    "prestige-face-oil",
  ];
  const featuredProducts = products.filter((p) => featuredProductIds.includes(p.id));

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 360 : scrollLeft + 360;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Routine recommendations data
  const routineData = {
    glow: {
      title: "Radiance & Glow Routine",
      desc: "Target dullness, hyperpigmentation, and lack of skin vitality. Formulated with stable Vitamin C and organic squalane to reveal a lit-from-within complexion.",
      items: ["radiance-glow-serum", "lumiere-vital-serum"],
    },
    hydration: {
      title: "Intense Moisture Infusion",
      desc: "Perfect for dry skin barriers and dehydrated cells. Re-plumps tissues using multi-weight hyaluronic acid and cold-pressed botanical oils.",
      items: ["velvet-hydra-cream", "hyaluronic-dew-drop"],
    },
    sensitive: {
      title: "Barrier Calming & Repair",
      desc: "Created for highly reactive skin prone to redness, eczema, or tightness. Gently soothes irritation using rosewater extracts and panthenol.",
      items: ["eternal-rose-serum", "botanical-mist"],
    },
    detox: {
      title: "Detox & Oil Balancing",
      desc: "For congested pores, excessive sebum, and acne. Cleanses and renews skin texture with activated clay, charcoal, and organic tea tree extracts.",
      items: ["deep-purifying-cleanser", "glow-renewal-peel"],
    },
  };

  const handleAddRoutineToCart = (itemIds) => {
    itemIds.forEach((id) => {
      const prod = products.find((p) => p.id === id);
      if (prod) {
        addToCart(prod, prod.sizes?.[0] || "30ml");
      }
    });
    setAddedRoutineId(selectedConcern);
    setTimeout(() => setAddedRoutineId(null), 3000);
  };

  return (
    <div className="overflow-hidden bg-[#fcfcfb] text-black">
      
      {/* 1. Immersive Luxury Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-20 bg-gradient-to-b from-[#fcfcfb] via-[#f7f7f6]/80 to-[#fcfcfb] border-b border-black/5 overflow-hidden">
        
        {/* Subtle Premium Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none z-0" />

        {/* Scientific Laboratory Grid Crosshairs (+) */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-15 select-none hidden md:block">
          <span className="absolute top-[15%] left-[10%] text-[10px] font-body text-black/60">+</span>
          <span className="absolute top-[15%] right-[10%] text-[10px] font-body text-black/60">+</span>
          <span className="absolute bottom-[20%] left-[15%] text-[10px] font-body text-black/60">+</span>
          <span className="absolute bottom-[20%] right-[15%] text-[10px] font-body text-black/60">+</span>
          <span className="absolute top-[50%] left-[48%] text-[10px] font-body text-black/60">+</span>
        </div>

        {/* Abstract Thin Circular & Dial Vectors in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 opacity-[0.5]">
          <div className="absolute w-[450px] h-[450px] rounded-full border border-black/[0.03]" />
          <div className="absolute w-[650px] h-[650px] rounded-full border border-dashed border-black/[0.02]" />
          <div className="absolute w-[900px] h-[900px] rounded-full border border-black/[0.01]" />
          {/* Subtle crosshair highlights */}
          <div className="absolute w-[1px] h-full bg-black/[0.01]" />
          <div className="absolute h-[1px] w-full bg-black/[0.01]" />
        </div>



        {/* Premium Scientific Skincare Coordinate Labels */}
        <div className="absolute top-6 left-8 text-[8px] md:text-[9px] tracking-[0.3em] font-label text-black/[0.15] select-none pointer-events-none hidden sm:block">
          [ 48.8566° N, 2.3522° E ] · ST. GERMAIN, PARIS
        </div>
        <div className="absolute top-6 right-8 text-[8px] md:text-[9px] tracking-[0.3em] font-label text-black/[0.15] select-none pointer-events-none hidden sm:block">
          ECOLOGICAL FORMULATION · LMR-09
        </div>
        <div className="absolute bottom-6 left-8 text-[8px] md:text-[9px] tracking-[0.3em] font-label text-black/[0.15] select-none pointer-events-none hidden sm:block">
          BATCH: 26/09 · ACTIVE BOTANICAL EXTRACTS
        </div>
        <div className="absolute bottom-6 right-8 text-[8px] md:text-[9px] tracking-[0.3em] font-label text-black/[0.15] select-none pointer-events-none hidden sm:block">
          PRESTIGE DERM-LABS
        </div>

        {/* Floating Organic Botanical SVGs */}
        {/* Leaf 1: Elegant twig branch */}
        <div className="absolute top-12 right-[18%] pointer-events-none z-0 animate-floating-1 opacity-60 hidden lg:block">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-black/[0.035] w-64 h-64 md:w-72 md:h-72">
            <path d="M20,180 Q80,140 180,20" />
            <path d="M70,147 C60,135 65,115 85,120 C95,123 90,138 70,147 Z" />
            <path d="M100,120 C90,105 98,90 115,95 C125,98 120,112 100,120 Z" />
            <path d="M130,92 C120,77 128,62 145,67 C155,70 150,84 130,92 Z" />
            <path d="M160,65 C150,50 158,35 175,40 C185,43 180,57 160,65 Z" />
            <path d="M70,147 C85,155 105,150 100,130 C97,120 82,125 70,147 Z" />
            <path d="M100,120 C115,128 135,123 130,103 C127,93 112,98 100,120 Z" />
            <path d="M130,92 C145,100 165,95 160,75 C157,65 142,70 130,92 Z" />
          </svg>
        </div>

        {/* Leaf 2: Simple luxury leaf outline */}
        <div className="absolute bottom-16 left-[15%] pointer-events-none z-0 animate-floating-2 opacity-50 hidden lg:block">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.9" className="text-black/[0.03] w-64 h-64 md:w-80 md:h-80">
            <path d="M100,20 C160,70 150,150 100,180 C50,150 40,70 100,20 Z" />
            <path d="M100,20 L100,180" />
            <path d="M100,50 Q130,60 142,75" />
            <path d="M100,50 Q70,60 58,75" />
            <path d="M100,80 Q135,95 148,115" />
            <path d="M100,80 Q70,95 52,115" />
            <path d="M100,110 Q130,130 138,150" />
            <path d="M100,110 Q70,130 62,150" />
            <path d="M100,140 Q120,155 125,168" />
            <path d="M100,140 Q80,155 75,168" />
          </svg>
        </div>

        {/* Fluid Serum Wave Paths (animated linear flow) */}
        <svg viewBox="0 0 1440 600" fill="none" stroke="currentColor" className="absolute inset-0 w-full h-full text-black/[0.015] pointer-events-none z-0">
          <path
            d="M -100,250 C 300,150 500,450 900,300 C 1200,200 1300,400 1600,250"
            strokeWidth="1"
            strokeDasharray="6 10"
            className="animate-line-flow"
            style={{ animationDuration: "35s" }}
          />
          <path
            d="M -100,380 C 200,480 600,180 1000,380 C 1300,480 1400,220 1600,380"
            strokeWidth="0.8"
            strokeDasharray="4 8"
            className="animate-line-flow"
            style={{ animationDuration: "45s", animationDirection: "reverse" }}
          />
        </svg>

        {/* Large Luxury Text Watermark in Background */}
        <div className="absolute inset-0 flex items-center justify-center font-headline text-[13vw] text-black/[0.01] select-none pointer-events-none tracking-[0.25em] z-0">
          LUMIÈRE
        </div>

        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 backdrop-blur-md">
              <Sparkles size={11} className="text-[#0a0a0a]" />
              <span className="font-label text-[9px] tracking-[0.25em] text-black/95 uppercase font-bold">
                Luxury Organic Skincare
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-headline text-[38px] sm:text-[48px] md:text-[76px] leading-[1.05] text-[#0a0a0a] tracking-tight font-bold">
                The Science of <br />
                <span className="text-black italic font-normal font-headline">Prestige Radiance</span>
              </h1>
              {/* Accent Separator Line */}
              <div className="w-24 h-[1.5px] bg-[#0a0a0a]" />
            </div>

            <p className="font-body text-on-surface-variant text-xs md:text-sm leading-relaxed max-w-xl">
              Botanical active formulas synthesized in Paris to harmonize with your skin’s biological pathways. Experience a luminous, cellular-level transformation.
            </p>

            {/* Premium Badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-on-surface-variant font-label text-[10px] uppercase tracking-wider font-bold">
              <span className="flex items-center gap-1.5"><Check size={12} className="text-[#0a0a0a]" /> Formulated in France</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-[#0a0a0a]" /> Clinical-Grade Clean</span>
              <span className="flex items-center gap-1.5"><Check size={12} className="text-[#0a0a0a]" /> 100% Vegan Actives</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/shop"
                className="bg-primary hover:bg-[#1a1a19] text-on-primary px-8 py-4 font-label text-xs tracking-[0.25em] uppercase transition-all duration-300 rounded font-bold shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                SHOP COLLECTION
              </Link>
              <Link
                href="/about"
                className="border border-[#0a0a0a]/40 text-[#0a0a0a] hover:bg-black/5 px-8 py-4 font-label text-xs tracking-[0.25em] uppercase transition-all duration-300 rounded hover:-translate-y-0.5 active:translate-y-0 font-bold cursor-pointer"
              >
                OUR PHILOSOPHY
              </Link>
            </div>
          </motion.div>

          {/* Hero Right Visual with floating product & discount offer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Very faint backing glow */}
            <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-black/[0.02] filter blur-[100px] -z-10 pointer-events-none" />
            
            {/* Floating Container Frame */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-[370px] aspect-[4/5] bg-[#f4f4f3]/95 rounded-2xl overflow-hidden border border-black/10 shadow-2xl group"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjtSopn26PVyBBO1703kL-Ms-ob2ENqpExWZxdk8Sv6MhGIBDXBk8E8woLgVzTL8JdZYz5CDopvZmqs7DJXYUgNMl8Tf_oiQKrayrFkdkxkZxpqoad2CNctwhbMdlQH9YamgAZI_cHhhNDphxmzWKrHkg-LrRQsmXF0ti3TNpQtv-GxwDXDA6QwpoJoQyKaY0xw-JfF6RagP-BSUTCxn4eqngipuc4k9EUdohnWMY5h5YerxpTTz7PQF7_ICK_Kr09mvDQiHxJKHpO"
                alt="Lumiere Luxury Oil Bottle"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfb]/60 via-transparent to-transparent" />
            </motion.div>

            {/* Premium Floating Discount Offer Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 border border-black/10 backdrop-blur-md p-4 rounded-xl shadow-xl z-20 max-w-[180px] text-left"
            >
              <div className="flex items-center gap-1.5 text-black">
                <Sparkles size={11} className="text-black shrink-0 animate-pulse" />
                <span className="font-label text-[8px] tracking-[0.15em] uppercase font-bold text-black/80">Exclusive Offer</span>
              </div>
              <div className="mt-1">
                <h4 className="font-headline text-2xl font-black text-[#0a0a0a] leading-none">15% OFF</h4>
                <p className="font-body text-[9px] text-black/60 leading-tight mt-1">On your first organic luxury ritual</p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between gap-2">
                <span className="font-label text-[8px] tracking-widest text-black/40 uppercase font-bold">Code</span>
                <span className="font-label text-[10px] tracking-widest text-[#0a0a0a] font-extrabold bg-black/5 px-2 py-0.5 rounded border border-black/10 select-all">LUMIERE15</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand Partners Infinite Marquee Banner */}
      <section className="bg-black text-[#fcfcfb] py-5 md:py-6 overflow-hidden relative z-20">
        <div className="flex w-max animate-marquee-scroll">
          {/* Marquee Group 1 */}
          <div className="flex items-center justify-start gap-8 md:gap-16 px-4 min-w-full shrink-0 font-label text-[10px] md:text-xs tracking-[0.25em] font-extrabold uppercase text-[#fcfcfb]/80">
            <span>Forest Essentials</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Kama Ayurveda</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Minimalist</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Just Herbs</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Dot & Key</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Plum Goodness</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Biotique</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>mCaffeine</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Lotus Organics</span>
          </div>
          {/* Marquee Group 2 (Identical duplicate for seamless transition) */}
          <div className="flex items-center justify-start gap-8 md:gap-16 px-4 min-w-full shrink-0 font-label text-[10px] md:text-xs tracking-[0.25em] font-extrabold uppercase text-[#fcfcfb]/80" aria-hidden="true">
            <span>Forest Essentials</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Kama Ayurveda</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Minimalist</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Just Herbs</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Dot & Key</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Plum Goodness</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Biotique</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>mCaffeine</span>
            <span className="w-1 h-1 bg-[#fcfcfb]/20 rounded-full" />
            <span>Lotus Organics</span>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid Categories */}
      <section className="py-24 max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="text-center mb-16 space-y-3">
          <span className="font-label text-xs text-[#0a0a0a] tracking-[0.2em] uppercase font-bold">Curated Rituals</span>
          <h2 className="font-headline text-2xl md:text-4xl text-on-surface">Explore by Category</h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#0a0a0a] to-transparent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Serums Card */}
          <Link
            href="/shop?category=serums"
            onMouseMove={handleMouseMove}
            style={{
              "--mouse-x": `${mouseCoords.x}px`,
              "--mouse-y": `${mouseCoords.y}px`,
            }}
            className="spotlight-card group relative md:col-span-8 overflow-hidden rounded-xl bg-[#f4f4f3]/60 border border-black/5 aspect-video md:aspect-auto md:h-[450px] flex flex-col justify-end"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrF99bccQ4GYsV_tNdxikNCD1ogYTNY1R-oKe0jtsd4XdnaOuvqBY3PURn9D5UiVRITrHkifGMoBdN8WWuQGzO7afACttfiRWzibv12jihPPslXX0HLcAmVcDMAI6YqRKQ0Q41QgMqW8VX2zLIj_w97y6Unx8x_jEF84nKrOmXvcQQK28A37mrxFnfyWJTE6YnLnWIrjfay4p_DqT9QSHSUoPWG0deCBGPbskgIkFsyNLa0yJKLCnf-kGAG4E8mKMzI2BAGZHJyQR5"
              alt="Serums"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-102 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfb]/90 via-[#fcfcfb]/20 to-transparent" />
            <div className="relative p-6 md:p-10 z-10 space-y-2">
              <span className="font-label text-[9px] tracking-widest text-[#0a0a0a] uppercase font-bold bg-[#0a0a0a]/10 px-2.5 py-0.5 rounded-full border border-[#0a0a0a]/20 w-fit">Active Complexes</span>
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">Botanical Serums</h3>
              <span className="inline-flex items-center gap-1 font-label text-[10px] tracking-widest font-bold text-[#0a0a0a] border-b border-[#0a0a0a] pb-1 group-hover:gap-3 transition-all duration-300">
                DISCOVER THE COLLECTION <ArrowRight size={11} />
              </span>
            </div>
          </Link>

          {/* Right Bento Column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6 md:h-[450px]">
            {/* Cleansers */}
            <Link
              href="/shop?category=cleansers"
              onMouseMove={handleMouseMove}
              style={{
                "--mouse-x": `${mouseCoords.x}px`,
                "--mouse-y": `${mouseCoords.y}px`,
              }}
              className="spotlight-card group relative overflow-hidden rounded-xl bg-[#f4f4f3]/60 border border-black/5 flex flex-col justify-end"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWd6in4bwzyhHPDR05x5e0-QU-p6UDUusJBhZchN2zy4hZuVtx98NL9vEGIK9RWAS0jBIrhQUMnFlu0rAM68LpQTPedHJlVIwXlxsNNRSA4WGGIIKjO5l2BiYRYqicO87wQZtOM76EKhdT50vk58Hx95lhPd-yYN9aUOL2znj1CJXBCgjmm23jM_ko0E1AAab6YBY7nLqAOQPc6cI5QgDI_78Xejk-29zPYf5TENs6xmdG7ianOspiePngiPB1KsxfYDPx6EC7Bgsy"
                alt="Cleansers"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-102 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfb]/90 via-[#fcfcfb]/20 to-transparent" />
              <div className="relative p-6 z-10 space-y-1">
                <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface">Deep Cleansers</h3>
                <span className="inline-flex items-center gap-1 font-label text-[9px] tracking-widest font-bold text-[#0a0a0a] border-b border-[#0a0a0a]/40 pb-0.5 group-hover:gap-2 transition-all duration-300">
                  EXPLORE <ArrowRight size={10} />
                </span>
              </div>
            </Link>

            {/* Masks */}
            <Link
              href="/shop?category=masks"
              onMouseMove={handleMouseMove}
              style={{
                "--mouse-x": `${mouseCoords.x}px`,
                "--mouse-y": `${mouseCoords.y}px`,
              }}
              className="spotlight-card group relative overflow-hidden rounded-xl bg-[#f4f4f3]/60 border border-black/5 flex flex-col justify-end"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0TQmhgE2dEtq83VGBh7TwYKf7CUahYJfHpP-GovAr9BzwkJynqO-dtVlzj0kYBaJsBGaYprRPXKNu5Nt6Bcp_VWs9of_jSqHvSKiiJ6QljFPYBqu2FDDnOvF3bGW0IVhr-4aDq5AI5STQI9DPfZxkruYQlsanpPV5c2IZXopl6kg2Kdey9t6zcdCFF4Yh4c6TjTOJCJITTWH6xd-pLAORBwvApgl_y3Q3y2hupYcowD_7OSTpICPHS9TAzPCW69u1X_ZTikQH4hKr"
                alt="Masks"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-102 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfb]/90 via-[#fcfcfb]/20 to-transparent" />
              <div className="relative p-6 z-10 space-y-1">
                <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface">Treatment Masks</h3>
                <span className="inline-flex items-center gap-1 font-label text-[9px] tracking-widest font-bold text-[#0a0a0a] border-b border-[#0a0a0a]/40 pb-0.5 group-hover:gap-2 transition-all duration-300">
                  DISCOVER <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Skincare Routine Finder Quiz (UX Overhaul Widget) */}
      <section className="py-24 bg-gradient-to-b from-[#fcfcfb] via-[#ffffff] to-[#fcfcfb] border-y border-black/5 relative">
        <div className="absolute inset-0 bg-[#0a0a0a]/1 pointer-events-none filter blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="font-label text-xs text-[#0a0a0a] tracking-[0.25em] uppercase font-bold">
              SKINCARE CONCIERGE
            </span>
            <h2 className="font-headline text-2xl md:text-4xl font-bold text-on-surface">Find Your Dynamic Ritual</h2>
            <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              Select your skin's primary focus area below, and our French laboratory will recommend an essential two-step daily routine.
            </p>
          </div>

          {/* Interactive Quiz Tabs */}
          <div className="bg-[#f4f4f3]/60 p-6 md:p-8 rounded-2xl border border-black/5 shadow-xl space-y-8 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center border-b border-black/5 pb-6">
              {[
                { id: "glow", label: "Glow & Brighten", icon: Sparkles },
                { id: "hydration", label: "Deep Hydration", icon: Droplet },
                { id: "sensitive", label: "Calming & Repair", icon: Leaf },
                { id: "detox", label: "Pore Control", icon: Wind },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedConcern(tab.id)}
                    className={`px-4 py-3 font-label text-[9px] md:text-xs uppercase tracking-wider rounded-full transition-all duration-300 font-bold cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedConcern === tab.id
                        ? "bg-primary text-on-primary shadow-lg scale-102"
                        : "bg-[#fcfcfb] text-on-surface-variant hover:bg-black/5 hover:text-on-surface border border-black/5"
                    }`}
                  >
                    <TabIcon size={14} className="shrink-0" /> {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Recommended Products Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedConcern}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Ritual Description */}
                <div className="md:col-span-5 space-y-4">
                  <h4 className="font-headline text-xl md:text-2xl font-bold text-on-surface">
                    {routineData[selectedConcern].title}
                  </h4>
                  <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {routineData[selectedConcern].desc}
                  </p>
                  <button
                    onClick={() => handleAddRoutineToCart(routineData[selectedConcern].items)}
                    className="w-full md:w-auto bg-black hover:bg-[#0a0a0a] text-[#fcfcfb] hover:text-[#fcfcfb] font-label text-[10px] tracking-widest uppercase font-bold py-3.5 px-6 rounded transition-colors duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    {addedRoutineId === selectedConcern ? (
                      <>
                        <Check size={13} /> ADDED TO BAG
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={13} /> ADD 2-STEP RITUAL
                      </>
                    )}
                  </button>
                </div>

                {/* Ritual Products Mini Cards */}
                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {routineData[selectedConcern].items.map((prodId) => {
                    const productObj = products.find((p) => p.id === prodId);
                    if (!productObj) return null;
                    return (
                      <div
                        key={productObj.id}
                        className="bg-[#fcfcfb] p-4 rounded-xl border border-black/5 hover:border-[#0a0a0a]/30 transition-colors flex flex-col justify-between h-56"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="w-14 h-16 rounded overflow-hidden bg-[#f4f4f3] border border-black/5 flex-shrink-0">
                            <img src={productObj.image} alt={productObj.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-headline text-sm font-bold text-on-surface line-clamp-1">{productObj.name}</h5>
                            <p className="font-body text-[9px] text-on-surface-variant line-clamp-1">{productObj.subtitle}</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-black/5 flex justify-between items-center">
                          <span className="font-label text-sm text-[#0a0a0a] font-bold">₹{productObj.price.toLocaleString("en-IN")}</span>
                          <button
                            onClick={() => addToCart(productObj, productObj.sizes?.[0] || "30ml")}
                            className="bg-black/5 hover:bg-[#0a0a0a] hover:text-[#fcfcfb] p-2 rounded-full border border-black/10 hover:border-transparent transition-all duration-300 cursor-pointer"
                          >
                            <ShoppingBag size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. New Section: Featured Collection Grid (Shop Direct) */}
      <section className="py-28 max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="text-center mb-16 space-y-3">
          <span className="font-label text-xs text-[#0a0a0a] tracking-[0.25em] uppercase font-bold">
            HAUTE FORMULATIONS
          </span>
          <h2 className="font-headline text-2xl md:text-4xl text-on-surface font-bold">Featured Collection</h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#0a0a0a] to-transparent mx-auto mt-4 rounded-full" />
          <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed pt-2">
            Meticulously crafted active complexes formulated to nourish your cellular barrier. Shop our signature essentials directly.
          </p>
        </div>

        {/* Responsive Grid of 6 items (shows 2 columns on mobile side by side) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.id}`}
              className="bg-[#f4f4f3]/60 p-3 md:p-4 rounded-xl border border-black/5 hover:border-[#0a0a0a]/30 transition-all duration-500 flex flex-col justify-between group shadow-lg cursor-pointer text-left"
            >
              {/* Product Image and Overlay triggers */}
              <div className="relative aspect-[4/5] bg-[#fcfcfb] overflow-hidden rounded-lg mb-3 md:mb-4 border border-black/5 shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-102 opacity-85"
                />

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#0a0a0a] text-[#fcfcfb] font-label text-[7px] md:text-[8px] tracking-[0.15em] px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-sm uppercase font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Wishlist Icon */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-2 right-2 p-1.5 md:p-2 rounded-full border transition-all duration-300 z-10 cursor-pointer ${
                    isProductInWishlist(product.id)
                      ? "bg-primary border-primary text-on-primary shadow-md"
                      : "bg-[#fcfcfb]/80 border-black/5 text-black hover:text-[#0a0a0a] hover:bg-[#fcfcfb]"
                  }`}
                >
                  <Heart size={12} className={isProductInWishlist(product.id) ? "fill-current" : ""} />
                </button>
              </div>

              {/* Product Metadata Info */}
              <div className="space-y-1.5 md:space-y-2 px-1 text-center flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-headline text-[14px] md:text-[17px] font-bold text-on-surface hover:text-[#0a0a0a] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-body text-[10px] md:text-xs text-on-surface-variant line-clamp-1">
                    {product.subtitle}
                  </p>
                </div>

                <div className="space-y-2.5 md:space-y-3 pt-1">
                  {/* Price and Rating */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3 text-[#0a0a0a]">
                    <span className="font-label text-xs md:text-sm font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                    <span className="hidden sm:inline w-1 h-1 bg-black/10 rounded-full" />
                    <div className="flex items-center gap-1">
                      <div className="flex text-black">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            className={`fill-current ${i < Math.floor(product.rating) ? "" : "opacity-25"}`}
                          />
                        ))}
                      </div>
                      <span className="font-label text-[9px] font-bold">{product.rating}</span>
                    </div>
                  </div>

                  {/* Actions Row */}
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
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-[#0a0a0a]/40 text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#fcfcfb] px-8 py-4.5 font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded font-bold cursor-pointer"
          >
            VIEW ALL COLLECTION <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 5. Best Sellers Slider */}
      <section className="py-28 max-w-container-max mx-auto px-6 md:px-margin-desktop relative border-t border-black/5">
        <div className="flex justify-between items-end mb-14">
          <div>
            <span className="font-label text-xs text-[#0a0a0a] tracking-[0.25em] uppercase font-bold block mb-1">
              HAUTE FAVORITES
            </span>
            <h2 className="font-headline text-2xl md:text-4xl text-on-surface font-bold">The Best Sellers</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 border border-black/10 hover:border-[#0a0a0a] flex items-center justify-center hover:bg-[#0a0a0a]/10 text-on-surface transition-all duration-300 rounded-full bg-[#f4f4f3]/60 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 border border-black/10 hover:border-[#0a0a0a] flex items-center justify-center hover:bg-[#0a0a0a]/10 text-on-surface transition-all duration-300 rounded-full bg-[#f4f4f3]/60 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 hide-scrollbar"
        >
          {bestSellers.map((product) => (
            <Link
              key={product.id}
              href={`/shop/product/${product.id}`}
              className="min-w-[220px] sm:min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start bg-[#f4f4f3]/60 p-3 md:p-4 rounded-xl border border-black/5 group hover:border-[#0a0a0a]/30 transition-all duration-500 relative flex flex-col justify-between text-left cursor-pointer"
            >
              {/* Product Image Panel */}
              <div className="relative aspect-[4/5] bg-[#fcfcfb] overflow-hidden rounded-lg mb-3 md:mb-4 border border-black/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-102 opacity-85"
                />
                
                {/* Tags Overlay */}
                {product.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#0a0a0a] text-[#fcfcfb] font-label text-[7px] md:text-[8px] tracking-[0.15em] px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-sm uppercase font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Wishlist Button Overlay */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-2 right-2 p-1.5 md:p-2 rounded-full border transition-all duration-300 z-10 cursor-pointer ${
                    isProductInWishlist(product.id)
                      ? "bg-primary border-primary text-on-primary shadow"
                      : "bg-[#fcfcfb]/80 border-black/5 text-black hover:text-[#0a0a0a] hover:bg-[#fcfcfb]"
                  }`}
                >
                  <Heart size={12} className={isProductInWishlist(product.id) ? "fill-current" : ""} />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-2 px-1 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-headline text-[14px] md:text-[17px] font-bold text-on-surface line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="font-label text-xs md:text-sm font-bold text-[#0a0a0a] shrink-0">₹{product.price.toLocaleString("en-IN")}</span>
                  </div>
                  
                  <p className="font-body text-[10px] md:text-xs text-on-surface-variant line-clamp-1 leading-relaxed mt-0.5">
                    {product.subtitle}
                  </p>
                </div>
                
                <div className="space-y-2.5 md:space-y-3 pt-1">
                  {/* Star Rating metrics */}
                  <div className="flex items-center gap-1 text-[#0a0a0a]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={`fill-current ${i < Math.floor(product.rating) ? "" : "opacity-25"}`}
                        />
                      ))}
                    </div>
                    <span className="font-label text-[9px] font-bold">{product.rating}</span>
                    <span className="text-on-surface-variant/40 text-[9px] font-medium">•</span>
                    <span className="font-label text-[9px] text-on-surface-variant/80">
                      {product.reviewsCount} reviews
                    </span>
                  </div>

                  {/* Actions Row */}
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
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-28 bg-[#ffffff] text-center relative border-y border-black/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0a0a0a]/2 filter blur-[80px] -z-10" />
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <span className="font-label text-xs text-[#0a0a0a] tracking-[0.25em] font-bold uppercase block">
            THE LUMIÈRE GLOW
          </span>
          <div className="flex justify-center gap-1 text-[#0a0a0a]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-current" />
            ))}
          </div>
          <p className="font-headline text-xl md:text-3xl text-on-surface italic leading-relaxed font-bold">
            "Lumière has completely transformed my evening ritual. The Radiance Elixir is unlike any oil I've used—it sinks in immediately and leaves my skin feeling supple, not greasy. It's pure luxury in a bottle."
          </p>
          <div className="font-label text-xs text-on-surface-variant font-bold tracking-[0.2em] uppercase pt-2">
            — SOPHIE M., VOGUE CONTRIBUTOR
          </div>
        </div>
      </section>

      {/* 7. Editorial Philosophy with Gold quote frame */}
      <section className="py-28 max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-label text-xs text-[#0a0a0a] tracking-[0.2em] uppercase font-bold block">
            Meticulously Crafted
          </span>
          <h2 className="font-headline text-2xl md:text-[45px] leading-tight text-on-surface font-bold">
            Consciously formulated in Paris, inspired by marine botany.
          </h2>
          <p className="font-body text-on-surface-variant text-xs md:text-sm leading-relaxed">
            Our lab in Paris collaborates with marine biologists and organic horticulturists to harvest clean actives. Every ingredient is selected for maximum bio-compatibility and efficacy, packaged sustainably in violet glass jars that protect chemical integrity.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 font-label text-xs tracking-widest uppercase text-[#0a0a0a] hover:text-on-surface transition-colors border-b border-[#0a0a0a] pb-1 font-bold cursor-pointer"
          >
            DISCOVER THE STORY <ArrowRight size={13} />
          </Link>
        </div>

        <div className="lg:col-span-5 border-l-2 border-[#0a0a0a] p-8 md:p-10 bg-[#f4f4f3]/40 rounded-r-xl border border-black/5 border-l-0 shadow-xl space-y-4">
          <h4 className="font-headline text-lg italic font-bold text-on-surface">
            "We believe that clean skincare should not compromise on luxury."
          </h4>
          <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
            By rejecting synthetic fragrances, denatured alcohols, silicones, and sulfates, we establish skincare rituals that align with your skin's natural pH and microbiome. It is beauty consciously refined.
          </p>
        </div>
      </section>
    </div>
  );
}
