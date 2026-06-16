"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Star, ShoppingBag, Heart, Check, ChevronRight, Sparkles, ArrowLeft, Image as ImageIcon, X, ChevronDown } from "lucide-react";
import { products } from "@/data/products";

export default function ProductDetailPage({ params }) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  // Find product
  const product = useMemo(() => {
    return products.find((p) => p.id === id) || products[0];
  }, [id]);

  // States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "30ml");
  const [activeAccordion, setActiveAccordion] = useState("ingredients");
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" });
  const [reviewPhotoModal, setReviewPhotoModal] = useState(null);

  // Zustand Store
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  const isProductInWishlist = wishlist.some((item) => item.id === product.id);

  // Recommended Products
  const recommendations = useMemo(() => {
    return products.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  // Hover Zoom Effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.18)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  const toggleAccordion = (section) => {
    setActiveAccordion((prev) => (prev === section ? null : section));
  };

  const currentProductImage = product.images?.[activeImageIndex] || product.image;

  return (
    <div className="bg-[#fcfcfb] text-black min-h-screen py-16">
      {/* Breadcrumbs */}
      <nav className="max-w-container-max mx-auto px-6 md:px-margin-desktop mb-10">
        <ol className="flex items-center gap-2 font-label text-[10px] text-on-surface-variant/80 uppercase tracking-[0.2em] font-semibold">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight size={10} className="text-on-surface/20" />
          <li>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
          </li>
          <ChevronRight size={10} className="text-on-surface/20" />
          <li className="text-primary font-bold truncate max-w-[150px]">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Grid */}
      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Gallery Column */}
        <div className="lg:col-span-7 space-y-6">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative aspect-[4/5] bg-[#f4f4f3] overflow-hidden rounded-xl border border-black/5 shadow-2xl cursor-zoom-in group"
          >
            <img
              src={currentProductImage}
              alt={product.name}
              style={zoomStyle}
              className="w-full h-full object-cover transition-transform duration-300 ease-out opacity-85"
            />
            {product.tags.includes("Best Seller") && (
              <span className="absolute top-4 left-4 bg-primary text-on-primary font-label text-[10px] tracking-widest px-3.5 py-1.5 uppercase rounded-sm font-bold shadow-md">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 bg-[#f4f4f3] overflow-hidden rounded-md border transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    activeImageIndex === idx
                      ? "border-[#0a0a0a] scale-98 shadow-md"
                      : "border-black/5 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details info column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h1 className="font-headline text-3xl md:text-5xl text-on-surface leading-tight tracking-tight font-bold">
              {product.name}
            </h1>
            <p className="font-body text-[#0a0a0a] font-semibold text-xs tracking-wider uppercase">
              {product.subtitle}
            </p>
            
            {/* Reviews Summary */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-[#0a0a0a]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={`fill-current ${i < Math.floor(product.rating) ? "" : "opacity-25"}`}
                  />
                ))}
              </div>
              <span className="font-label text-xs text-on-surface-variant hover:text-on-surface underline decoration-white/20 cursor-pointer font-bold transition-colors">
                {product.rating}/5 ({product.reviewsCount} verified reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-black/5">
            <span className="font-headline text-3xl text-on-surface font-bold">₹{product.price.toLocaleString("en-IN")}</span>
            {product.tags.includes("Organic") && (
              <span className="bg-[#0a0a0a]/10 text-[#0a0a0a] border border-[#0a0a0a]/20 font-label text-[10px] tracking-widest px-3.5 py-1 uppercase rounded-full flex items-center gap-1 font-bold shadow-xs">
                <Sparkles size={11} /> Organic
              </span>
            )}
          </div>

          <p className="font-body text-sm text-on-surface-variant/90 leading-relaxed">
            {product.desc}
          </p>

          {/* Size Selector pills with premium overlays */}
          {product.sizes && (
            <div className="space-y-3 pt-2">
              <span className="font-label text-xs uppercase tracking-wider text-[#0a0a0a] font-bold block">
                Select Size
              </span>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3.5 rounded border font-label text-xs uppercase tracking-widest transition-all duration-300 font-bold cursor-pointer ${
                      selectedSize === size
                        ? "bg-primary border-primary text-on-primary shadow-lg scale-102"
                        : "border-black/10 text-on-surface-variant hover:border-[#0a0a0a]/50 bg-[#f4f4f3]/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Checkout/Basket Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="bg-primary hover:bg-[#1a1a19] text-on-primary py-4 font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow-lg font-bold cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`border py-4 font-label text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm font-bold cursor-pointer ${
                isProductInWishlist
                  ? "bg-[#0a0a0a]/15 border-[#0a0a0a]/30 text-[#0a0a0a] shadow-xs"
                  : "border-black/10 text-on-surface hover:bg-black/5 hover:border-white/30"
              }`}
            >
              <Heart size={14} className={isProductInWishlist ? "fill-current" : ""} />
              {isProductInWishlist ? "In Wishlist" : "Wishlist"}
            </button>
          </div>

          {/* Info Accordions */}
          <div className="border-t border-black/5 pt-6 space-y-3">
            {[
              { id: "ingredients", label: "Ingredients", content: product.ingredients },
              { id: "usage", label: "How to Use", content: product.usage },
              { id: "shipping", label: "Shipping & Returns", content: product.shipping },
            ].map((section) => (
              <div key={section.id} className="border-b border-black/5 pb-3">
                <button
                  onClick={() => toggleAccordion(section.id)}
                  className="w-full py-3 flex justify-between items-center text-left group cursor-pointer"
                >
                  <span className="font-label text-xs uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors font-bold">
                    {section.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-on-surface-variant transition-transform duration-400 ease-out ${
                      activeAccordion === section.id ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeAccordion === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 font-body text-xs md:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Recommended Section */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop mt-28">
        <div className="flex justify-between items-end border-b border-black/5 pb-4 mb-10">
          <h2 className="font-headline text-2xl md:text-3xl text-on-surface">You May Also Like</h2>
          <Link
            href="/shop"
            className="font-label text-xs tracking-wider uppercase text-primary hover:text-on-surface transition-colors border-b border-primary pb-1 font-bold"
          >
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <Link
              key={rec.id}
              href={`/shop/product/${rec.id}`}
              className="group flex flex-col justify-between bg-[#f4f4f3]/40 p-3 rounded-xl border border-black/5 hover:border-[#0a0a0a]/25 transition-all duration-300 text-left"
            >
              <div>
                <div className="aspect-[4/5] bg-[#fcfcfb] overflow-hidden rounded-lg relative border border-black/5 mb-3">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-full object-cover transition-transform duration-[0.8s] group-hover:scale-102 opacity-85"
                  />
                </div>
                <h4 className="font-headline text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1 font-bold">
                  {rec.name}
                </h4>
                <p className="font-body text-[10px] text-on-surface-variant line-clamp-1 mt-0.5">
                  {rec.subtitle || "Lumière Premium"}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/5">
                <span className="font-label text-xs font-bold text-[#0a0a0a]">₹{rec.price.toLocaleString("en-IN")}</span>
                <div className="flex items-center gap-0.5 text-[#0a0a0a]">
                  <Star size={9} className="fill-current text-black" />
                  <span className="font-label text-[9px] font-bold">{rec.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Review details */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop mt-28 pt-20 border-t border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Summary Panel */}
          <div className="lg:col-span-4 space-y-6 bg-[#f4f4f3]/60 p-6 md:p-8 rounded-xl border border-black/5 h-fit backdrop-blur-md">
            <h2 className="font-headline text-2xl md:text-3xl text-on-surface font-bold">Real Results</h2>
            <div className="flex items-center gap-3">
              <span className="font-headline text-5xl font-bold text-on-surface">{product.rating}</span>
              <div>
                <div className="flex text-[#0a0a0a]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-current" />
                  ))}
                </div>
                <p className="font-label text-[10px] text-on-surface-variant mt-1.5 uppercase font-bold tracking-wider">
                  {product.reviewsCount} verified reviews
                </p>
              </div>
            </div>

            {/* Linear stats breakdown */}
            <div className="space-y-3 pt-2">
              {[
                { label: "5 Stars", percentage: "84%" },
                { label: "4 Stars", percentage: "12%" },
                { label: "3 Stars", percentage: "3%" },
                { label: "2 Stars", percentage: "1%" },
                { label: "1 Star", percentage: "0%" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 text-xs font-label font-bold text-on-surface-variant">
                  <span className="w-14">{row.label}</span>
                  <div className="flex-grow h-1.5 bg-[#fcfcfb] rounded-full overflow-hidden border border-black/5">
                    <div className="h-full bg-gold-gradient" style={{ width: row.percentage }} />
                  </div>
                  <span className="w-8 text-right">{row.percentage}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-black hover:bg-[#0a0a0a] text-[#fcfcfb] font-label text-xs tracking-widest uppercase py-4 rounded transition-colors duration-300 font-bold cursor-pointer">
              Write a Review
            </button>
          </div>

          {/* Individual Reviews list */}
          <div className="lg:col-span-8 divide-y divide-white/5 space-y-8">
            {/* Review 1 */}
            <div className="pb-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-label text-xs uppercase font-bold tracking-wider text-on-surface">
                    Elena R.
                  </h4>
                  <div className="flex text-[#0a0a0a] text-xs mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                  </div>
                </div>
                <span className="font-label text-[11px] text-on-surface-variant">2 weeks ago</span>
              </div>
              <h5 className="font-headline text-lg italic text-on-surface font-bold">"My new holy grail serum!"</h5>
              <p className="font-body text-xs md:text-sm leading-relaxed text-on-surface-variant/90">
                I've tried so many vitamin C serums and most irritated my skin. This one is so gentle yet effective. My dark spots have noticeably faded and my skin just looks... happier.
              </p>

              {/* Uploaded user photo */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() =>
                    setReviewPhotoModal(
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcC3J-jcad6ZswQdAVm9s3FU8G2oNhtrmVgX_Rm1Dp2I_Gp-Z0A5RVcirh3uuCUZAncDwjkxEHtMEfZIVzCvM9hTFMmRYKcdUl8ylgiDnSdtOulBzDDmJy9WW3K4ug95oISgWYHDRh2cf0VoU_mSt_-3S1_3wfXsrmHxrpouHxw8gkHFk1jOXFI2a6OxbMkewyMHtZH4MnlRmh629VDDf3cCfTjj1KdaViS85hnQSw7SfTZ57njKVZiHHTZQ2KQy7hoZOJpBxRe6Mx"
                    )
                  }
                  className="w-16 h-16 bg-[#f4f4f3] overflow-hidden border border-black/5 rounded-md hover:scale-98 transition-transform cursor-zoom-in relative group"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcC3J-jcad6ZswQdAVm9s3FU8G2oNhtrmVgX_Rm1Dp2I_Gp-Z0A5RVcirh3uuCUZAncDwjkxEHtMEfZIVzCvM9hTFMmRYKcdUl8ylgiDnSdtOulBzDDmJy9WW3K4ug95oISgWYHDRh2cf0VoU_mSt_-3S1_3wfXsrmHxrpouHxw8gkHFk1jOXFI2a6OxbMkewyMHtZH4MnlRmh629VDDf3cCfTjj1KdaViS85hnQSw7SfTZ57njKVZiHHTZQ2KQy7hoZOJpBxRe6Mx"
                    alt="User Upload"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon size={14} className="text-on-surface" />
                  </div>
                </button>
              </div>
            </div>

            {/* Review 2 */}
            <div className="py-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-label text-xs uppercase font-bold tracking-wider text-on-surface">
                    Julian S.
                  </h4>
                  <div className="flex text-[#0a0a0a] text-xs mt-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                    <Star size={12} className="opacity-25" />
                  </div>
                </div>
                <span className="font-label text-[11px] text-on-surface-variant">1 month ago</span>
              </div>
              <h5 className="font-headline text-lg italic text-on-surface font-bold">"Luxury in a bottle."</h5>
              <p className="font-body text-xs md:text-sm leading-relaxed text-on-surface-variant/90">
                The texture is amazing. It sinks in immediately and doesn't leave any sticky residue. Great under makeup or on its own for a natural glow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Modal Overlay */}
      <AnimatePresence>
        {reviewPhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReviewPhotoModal(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-2xl max-h-[85vh] overflow-hidden bg-[#ffffff] rounded-xl border border-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={reviewPhotoModal} alt="Zoomed Review attachment" className="w-full h-full object-contain max-h-[85vh] p-2" />
              <button
                onClick={() => setReviewPhotoModal(null)}
                className="absolute top-4 right-4 bg-black/10 hover:bg-white text-on-surface hover:text-[#fcfcfb] p-2 rounded-full transition-all shadow-md cursor-pointer border border-black/5"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
