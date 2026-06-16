"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Leaf, Heart } from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden bg-surface-container border-b border-outline-variant/15">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.75 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrF99bccQ4GYsV_tNdxikNCD1ogYTNY1R-oKe0jtsd4XdnaOuvqBY3PURn9D5UiVRITrHkifGMoBdN8WWuQGzO7afACttfiRWzibv12jihPPslXX0HLcAmVcDMAI6YqRKQ0Q41QgMqW8VX2zLIj_w97y6Unx8x_jEF84nKrOmXvcQQK28A37mrxFnfyWJTE6YnLnWIrjfay4p_DqT9QSHSUoPWG0deCBGPbskgIkFsyNLa0yJKLCnf-kGAG4E8mKMzI2BAGZHJyQR5"
            alt="About Lumiere"
            className="w-full h-full object-cover mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        <div className="relative z-10 text-center px-6 space-y-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="font-label text-xs uppercase tracking-[0.25em] text-primary font-bold bg-[#0a0a0a]/10 px-4 py-1.5 rounded-full">
              The Philosophy
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-headline text-[46px] md:text-[64px] text-on-surface leading-tight font-bold"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="font-body text-on-surface-variant text-xs md:text-sm max-w-xl mx-auto opacity-90 leading-relaxed"
          >
            Discovering clean beauty rituals that honor your skin’s biological pathways. Pure ingredients, backed by biotechnology.
          </motion.p>
        </div>
      </section>

      {/* Editorial Content */}
      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-24 space-y-36">
        
        {/* Section 1 - Genesis */}
        <section className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <span className="font-label text-xs text-primary tracking-widest uppercase font-bold">
              THE GENESIS
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-on-surface leading-snug font-bold">
              Consciously formulated in Paris, inspired by marine botany.
            </h2>
            <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed">
              Founded in 2024 by a collective of French skin health researchers and biological chemists, LUMIÈRE was born from a simple realization: the skincare industry was overcomplicating formulations at the expense of skin health.
            </p>
            <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed">
              By returning to active botanical distillates and clinical-grade clean elements, we formulated essential products that work in harmony with the skin, leaving a glowing, natural radiance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 shadow-md gold-glow group"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoXhnL-0dZNQveLk6nPrLlX-bCFdEHq_lb56JD_BWOIlnE_Ji1x6R7oPom9Y00kIS9h6PVrBOrxtVDmnptZawDySrIhzTTMBFzH9h2IW15t7UJOBpxK3u_2z1KguNCG9Ob6QlcqttdkMLtTqFEk8BosVKEB-YKD4fyEitbfauj8F21epIaqjQQxnfhpJaXjhUYfbQX_bxfTAOLCBE1fwfQDSghlACChZ1__UZOcVUyhRaf_5MXnLaEmE-OUoWie5vvhfYbflzJcUAB"
              alt="Lab Formulation"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
            />
          </motion.div>
        </section>

        {/* Brand Values */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-surface-container/40 backdrop-blur-md p-8 md:p-14 rounded-lg border border-outline-variant/20 grid grid-cols-1 md:grid-cols-3 gap-12 shadow-sm"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0a0a0a]/10 text-primary flex items-center justify-center border border-[#0a0a0a]/20 shadow-3xs">
              <Compass size={20} className="text-[#0a0a0a]" />
            </div>
            <h4 className="font-headline text-xl font-bold text-on-surface">Scientific Integrity</h4>
            <p className="font-body text-xs md:text-sm text-on-surface-variant/95 leading-relaxed">
              All active complexes are clinically researched in Paris to ensure maximum bio-compatibility and cellular recovery.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0a0a0a]/10 text-primary flex items-center justify-center border border-[#0a0a0a]/20 shadow-3xs">
              <Leaf size={20} className="text-[#0a0a0a]" />
            </div>
            <h4 className="font-headline text-xl font-bold text-on-surface">Organic Harvesting</h4>
            <p className="font-body text-xs md:text-sm text-on-surface-variant/95 leading-relaxed">
              We source raw botanicals from certified organic farms, ensuring zero synthetic pesticides and chemical trace elements.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0a0a0a]/10 text-primary flex items-center justify-center border border-[#0a0a0a]/20 shadow-3xs">
              <Heart size={20} className="text-[#0a0a0a]" />
            </div>
            <h4 className="font-headline text-xl font-bold text-on-surface">Conscious Formulation</h4>
            <p className="font-body text-xs md:text-sm text-on-surface-variant/95 leading-relaxed">
              100% vegan, cruelty-free, and formulated without sulfates, silicones, denatured alcohols, or synthetic fragrances.
            </p>
          </motion.div>
        </motion.section>

        {/* Section 2 - Ingredients */}
        <section className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <span className="font-label text-xs text-primary tracking-widest uppercase font-bold">
              OUR INGREDIENTS
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-on-surface leading-snug font-bold">
              Clean ingredients, zero compromises.
            </h2>
            <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed">
              We source our raw components globally, choosing only certified organic farmers. From wild-harvested sea kelp off the Brittany coastline to cold-pressed rosehip seed oil from high-altitude Andes farms, we preserve botanical purity.
            </p>
            <p className="font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed">
              We completely reject parabens, synthetic fragrances, silicones, and sulfates. Everything is bottled in eco-friendly violet glass jars that naturally filter light and protect active formulations without artificial preservatives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 shadow-md gold-glow group"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGk4W0IiHyfKlu519Z3Xrr4Fl7aMu8rnYTczpqwCUr-HBvGM4HLyoVWBtrHporDwJoayU31MG-M97hfLiBBRGyegwQ3Flye3dagdpeOMTbI0MKN8YM0rweD70oRULiuu72qaFNnLecMsSrLyEVtxaBa_htz9AGFZUC5FYBRYtYiN3CrxkaPEvseqG8CsqOgIs3dEC1Jx3VWmBQBEn9KDcNB-CkmL5V5CyHXHqS7-qzJ6xmvVwnJuTRDuVzH9YoxXAEZoE8Fqh6ogiR"
              alt="Ingredients showcase"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
            />
          </motion.div>
        </section>
      </main>
    </div>
  );
}
