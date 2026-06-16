"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, X } from "lucide-react";

const blogPosts = [
  {
    id: "evening-skincare-ritual",
    title: "The Evening Ritual: Setting Up a Restorative Skincare Flow",
    category: "Skin Rituals",
    date: "June 12, 2026",
    author: "Sophie Moreau",
    readTime: "5 min read",
    desc: "How taking time for self-care in the evening prepares both your skin and mind for cellular regeneration during sleep.",
    content: "Your skin regenerates at night. Cellular turnover peaks between 11 PM and 2 AM, meaning the products you apply before bed have the highest potential for impact. A great evening ritual starts with double cleansing: first with an oil-based cleanser to remove makeup and pollution, and second with a purifying gel cleanser. Follow with active serums like peptide oils, and finish with a heavy occlusive balm to lock in moisture. Taking 10 minutes to slow down and massage these products into your skin also lowers cortisol, improving your sleep quality and overall glow.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrF99bccQ4GYsV_tNdxikNCD1ogYTNY1R-oKe0jtsd4XdnaOuvqBY3PURn9D5UiVRITrHkifGMoBdN8WWuQGzO7afACttfiRWzibv12jihPPslXX0HLcAmVcDMAI6YqRKQ0Q41QgMqW8VX2zLIj_w97y6Unx8x_jEF84nKrOmXvcQQK28A37mrxFnfyWJTE6YnLnWIrjfay4p_DqT9QSHSUoPWG0deCBGPbskgIkFsyNLa0yJKLCnf-kGAG4E8mKMzI2BAGZHJyQR5",
  },
  {
    id: "vitamin-c-facts",
    title: "Understanding Vitamin C: L-Ascorbic Acid vs Derivatives",
    category: "Ingredients",
    date: "May 28, 2026",
    author: "Dr. Henri Laurent",
    readTime: "8 min read",
    desc: "Demystifying the gold standard antioxidant. Learn which molecular form suits your specific skin sensitivity level.",
    content: "Vitamin C is a powerhouse antioxidant that neutralizes free radicals, boosts collagen synthesis, and brightens hyperpigmentation. However, not all vitamin C formulations are equal. L-Ascorbic Acid is the pure, biologically active form, but it is highly unstable and can irritate sensitive skin. Derivatives like Ascorbyl Glucoside or Tetrahexyldecyl Ascorbate are much more stable and gentle, turning into active Vitamin C only once absorbed by the skin. For sensitive types, starting with a 5% derivative formula prevents irritation while still offering excellent protective benefits.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1j7PI9afBFnYV0V5gkZVOPd6jOzm8rK6RN6TmjL18zMTgFqno3cgVxIbD64f2UbrVGXqZU2npDDeOjPcGNiuDTOrFmVTekqCUEcCAA3JzkJJOVA5UQTLOn0Q0lj-icMjqW8g3HH92dPbQg9QLFmmbsH156D68GGCdnISNrnK892SBU3YHJ9wD0cCsxqcFzoTdytLhwQkE-A-mokpX4SwCfQdFEkOZuB2CKHatgLITD4SpetMEYxhx7ewFG5Fz4bM6YP-59xQavz1v",
  },
  {
    id: "why-sunscreen-matters",
    title: "The Science of UV Exposure: Why SPF 50 is Non-Negotiable",
    category: "Science",
    date: "May 15, 2026",
    author: "Camille Dubois",
    readTime: "6 min read",
    desc: "Up to 80% of premature skin aging is caused by ultraviolet light. Discover the difference between chemical and physical shields.",
    content: "UV rays are divided into UVA (aging) and UVB (burning). UVA rays penetrate deeply into the dermis, destroying collagen and elastin fibers, which leads to fine lines, sagging, and sunspots. Physical (mineral) sunscreens use Zinc Oxide or Titanium Dioxide to reflect light rays off the skin like a mirror, whereas chemical filters absorb UV rays and convert them to heat. For clean beauty enthusiasts, physical shields are highly recommended because they are inert, do not clog pores, and do not cause systemic absorption.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjwzMgHf3bJ0hQZRJHrePphwEsqYuhtuJx2pUzdgW2lcpKrdXV_4vmJce1tSHo7546cf2-gYNwM2bpkIWV4z8mKStA0-1HpGi16HThhJkOLAA1f9RF7avtRdqsIa_NM8esWJCiWN6dwgKuhRYM27gehFCi19Dv-s4a9TmNi870IMo0GWFaTETmRCvon3DV01AJztIrVOfI8133aN2hywbjcbaEtQ9DQZF5-HjekwovzQrMup_nmYSIoZhDt9BQ0G-guToe3LKb2Kyy",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ["All", "Skin Rituals", "Ingredients", "Science"];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-[#fcfcfb] min-h-screen py-16 text-black">
      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <header className="mb-16 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-label text-xs uppercase tracking-[0.25em] text-[#0a0a0a] font-bold bg-[#0a0a0a]/10 px-4 py-1.5 rounded-full">
              LUMIÈRE JOURNAL
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-headline text-[36px] md:text-[50px] text-on-surface font-bold"
          >
            The Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.25 }}
            className="font-body text-xs md:text-sm text-on-surface-variant max-w-lg mx-auto opacity-90 leading-relaxed"
          >
            Scientific research, skincare wisdom, and mindful beauty rituals curated by our editorial team in Paris.
          </motion.p>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex justify-center gap-2 pt-8 overflow-x-auto pb-2 custom-scrollbar"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 font-label text-[10px] uppercase tracking-wider rounded-full transition-all duration-300 font-bold cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0a0a0a] text-[#fcfcfb] shadow-lg"
                    : "bg-[#f4f4f3]/60 text-on-surface-variant hover:bg-black/5 hover:text-on-surface border border-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </header>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredPosts.map((post, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-[#f4f4f3]/40 border border-black/5 rounded-xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#0a0a0a]/25 transition-all duration-300 backdrop-blur-md"
            >
              <div>
                <div className="aspect-[16/10] bg-[#fcfcfb] overflow-hidden relative border-b border-black/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-80 group-hover:opacity-95"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#fcfcfb]/90 px-3 py-1 text-[8px] font-label uppercase tracking-widest text-[#0a0a0a] font-bold border border-black/5 rounded">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[9px] font-label text-on-surface-variant uppercase font-bold tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-[#0a0a0a]" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-[#0a0a0a]" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="inline-flex items-center gap-1.5 font-label text-[9px] tracking-widest text-[#0a0a0a] group-hover:gap-2.5 transition-all uppercase font-bold">
                  Read Article <ArrowRight size={12} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Article Detail Modal Reader */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#ffffff] max-w-3xl w-full max-h-[85vh] rounded-xl overflow-y-auto custom-scrollbar shadow-2xl relative border border-black/5"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 bg-black/10 p-2 rounded-full hover:bg-white text-on-surface hover:text-[#fcfcfb] transition-all z-10 shadow-md cursor-pointer border border-black/5"
              >
                <X size={16} />
              </button>

              <div className="aspect-video bg-[#fcfcfb] overflow-hidden border-b border-black/5">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover opacity-85"
                />
              </div>

              <div className="p-6 md:p-10 space-y-6">
                <div className="space-y-3">
                  <span className="bg-[#0a0a0a]/10 text-[#0a0a0a] border border-[#0a0a0a]/20 px-3.5 py-1 text-[9px] font-label uppercase tracking-widest rounded-full font-bold shadow-xs w-fit block">
                    {activeArticle.category}
                  </span>
                  <h2 className="font-headline text-2xl md:text-3xl text-on-surface leading-snug pt-2 font-bold">
                    {activeArticle.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-[9px] font-label text-on-surface-variant uppercase pt-2 font-bold tracking-wider">
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-[#0a0a0a]" /> By {activeArticle.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#0a0a0a]" /> {activeArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#0a0a0a]" /> {activeArticle.readTime}
                    </span>
                  </div>
                </div>

                <div className="border-t border-black/5 pt-6">
                  <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                    {activeArticle.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
