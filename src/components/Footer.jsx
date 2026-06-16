"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, Instagram, Youtube, ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#fcfcfb] text-[#0c0c0b] border-t border-black/5 mt-auto">
      {/* Upper Newsletter Panel */}
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-20 text-center border-b border-black/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-black/2 filter blur-[100px] -z-10" />

        <span className="font-label text-xs uppercase tracking-[0.25em] text-[#0a0a0a] font-bold">
          LUMIÈRE INSIDER
        </span>
        <h3 className="font-headline text-[30px] md:text-[42px] mt-3 mb-4 text-[#0c0c0b] tracking-tight font-bold">
          Join the Inner Circle
        </h3>
        <p className="font-body text-on-surface-variant text-xs md:text-sm mb-10 max-w-lg mx-auto leading-relaxed">
          Receive exclusive invitations to new collection launches, skincare masterclasses, and 15% off your first order.
        </p>

        {subscribed ? (
          <div className="text-primary font-label text-xs tracking-widest uppercase py-3.5 px-6 bg-black/5 rounded border border-black/10 max-w-md mx-auto animate-pulse flex items-center justify-center gap-2">
            <Check size={14} className="text-[#0a0a0a]" /> Subscription confirmed. Welcome to Lumière.
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center bg-black/5 p-1.5 rounded-lg border border-black/5 focus-within:border-black/30 transition-colors"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border-none focus:outline-none focus:ring-0 w-full font-body text-xs text-[#0c0c0b] placeholder:text-black/30 px-3 py-2.5 focus:outline-hidden"
            />
            <button
              type="submit"
              className="w-full sm:w-auto font-label text-[10px] tracking-[0.2em] font-bold text-on-primary bg-primary hover:bg-black/80 transition-all uppercase py-3 px-6 shrink-0 rounded flex items-center justify-center gap-1.5 cursor-pointer"
            >
              SUBSCRIBE <ArrowRight size={11} />
            </button>
          </form>
        )}
      </div>

      {/* Main Links Footer Grid */}
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-gutter">
        {/* Brand narrative */}
        <div className="space-y-6">
          <Link
            href="/"
            className="font-headline text-2xl tracking-[0.2em] text-gold-gradient font-bold"
          >
            LUMIÈRE
          </Link>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            Consciously formulated in France. Inspired by nature, perfected by science. High-efficacy skincare for the modern minimalist.
          </p>
        </div>

        {/* Shop Category Links */}
        <div>
          <h5 className="font-label text-xs tracking-[0.2em] font-bold mb-6 uppercase text-[#0a0a0a]">
            Explore
          </h5>
          <ul className="space-y-4 font-body text-xs text-on-surface-variant/80">
            <li>
              <Link href="/shop" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                Shop All Collection
              </Link>
            </li>
            <li>
              <Link href="/shop?category=serums" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                Serums & Oils
              </Link>
            </li>
            <li>
              <Link href="/shop?category=moisturizers" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                Moisturizers
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                Our Story
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Links */}
        <div>
          <h5 className="font-label text-xs tracking-[0.2em] font-bold mb-6 uppercase text-[#0a0a0a]">
            Support
          </h5>
          <ul className="space-y-4 font-body text-xs text-on-surface-variant/80">
            <li>
              <Link href="/faq" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                FAQ & Help Center
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-black hover:underline hover:underline-offset-4 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h5 className="font-label text-xs tracking-[0.2em] font-bold mb-6 uppercase text-[#0a0a0a]">
            Follow Us
          </h5>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-on-surface-variant hover:text-black hover:border-black/20 hover:bg-black/5 transition-all duration-300 cursor-pointer"
            >
              <Globe size={15} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-on-surface-variant hover:text-black hover:border-black/20 hover:bg-black/5 transition-all duration-300 cursor-pointer"
            >
              <Instagram size={15} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-on-surface-variant hover:text-black hover:border-black/20 hover:bg-black/5 transition-all duration-300 cursor-pointer"
            >
              <Youtube size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-black/5 py-8 px-6 md:px-margin-desktop text-center text-on-surface-variant/40 font-label text-[9px] tracking-wider uppercase font-semibold">
        © {new Date().getFullYear()} Lumière Skincare. All rights reserved. Formulated in Paris.
      </div>
    </footer>
  );
}
