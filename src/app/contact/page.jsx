"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Check, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Skincare Advice",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Reset form fields
      setFormData({ name: "", email: "", subject: "Skincare Advice", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-[#fcfcfb] min-h-screen py-16 md:py-24 relative overflow-hidden text-black">
      
      {/* Premium Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Decorative vectors */}
      <div className="absolute top-10 left-10 text-[8px] md:text-[9px] tracking-[0.25em] font-label text-black/[0.12] select-none pointer-events-none hidden sm:block">
        [ 28.5912° N, 77.2285° E ] · LODHI ESTATE, ND
      </div>
      <div className="absolute top-10 right-10 text-[8px] md:text-[9px] tracking-[0.25em] font-label text-black/[0.12] select-none pointer-events-none hidden sm:block">
        LUMIÈRE CONCIERGE · EST. 2026
      </div>

      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative z-10">
        
        {/* Header */}
        <header className="mb-16 md:mb-20 text-center max-w-2xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 backdrop-blur-md"
          >
            <Sparkles size={11} className="text-black shrink-0" />
            <span className="font-label text-[9px] tracking-[0.2em] text-black uppercase font-bold">
              Skincare Concierge
            </span>
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-headline text-[38px] sm:text-[48px] md:text-[64px] leading-tight text-[#0a0a0a] tracking-tight font-bold"
            >
              Get in Touch with <br />
              <span className="text-black italic font-normal font-headline">Lumière India</span>
            </motion.h1>
            {/* Accent Separator Line */}
            <div className="w-16 h-[1.5px] bg-[#0a0a0a] mx-auto" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.25 }}
            className="font-body text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed"
          >
            Our dedicated team in New Delhi is available to assist you with customized skincare rituals, order inquiries, press partnerships, and botanical formulation details.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Info Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#f4f4f3]/50 border border-black/5 p-8 md:p-10 rounded-2xl shadow-xs backdrop-blur-md space-y-8">
              <h3 className="font-headline text-2xl text-on-surface font-bold border-b border-black/5 pb-4">
                Corporate Headquarters
              </h3>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-black/5 text-[#0a0a0a] flex items-center justify-center shrink-0 border border-black/10">
                    <MapPin size={15} />
                  </div>
                  <div className="text-xs md:text-sm font-body text-on-surface-variant space-y-1 pt-0.5">
                    <p className="font-bold text-on-surface uppercase tracking-wider font-label text-[10px] mb-1">Boutique & Office</p>
                    <p className="font-bold text-[#0a0a0a]">Lumière India Private Limited</p>
                    <p>12, Ground Floor, Lodhi Colony Market</p>
                    <p>Lodhi Estate, New Delhi - 110003</p>
                    <p className="text-black/50 text-[11px] italic">Delhi, India</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-black/5 text-[#0a0a0a] flex items-center justify-center shrink-0 border border-black/10">
                    <Mail size={15} />
                  </div>
                  <div className="text-xs md:text-sm font-body text-on-surface-variant space-y-1 pt-0.5">
                    <p className="font-bold text-on-surface uppercase tracking-wider font-label text-[10px] mb-1">Email Enquiries</p>
                    <p className="font-semibold text-black hover:text-black/60 transition-colors">
                      <a href="mailto:support@lumiere.in">support@lumiere.in</a>
                    </p>
                    <p className="font-semibold text-black hover:text-black/60 transition-colors">
                      <a href="mailto:press@lumiere.in">press@lumiere.in</a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-black/5 text-[#0a0a0a] flex items-center justify-center shrink-0 border border-black/10">
                    <Phone size={15} />
                  </div>
                  <div className="text-xs md:text-sm font-body text-on-surface-variant space-y-1 pt-0.5">
                    <p className="font-bold text-on-surface uppercase tracking-wider font-label text-[10px] mb-1">Phone Consultation</p>
                    <p className="font-bold text-black text-sm tracking-wide">+91 (0) 11 4268 5300</p>
                    <p className="text-[10px] text-on-surface-variant/70">Mon–Sat: 10:00 AM – 7:00 PM IST</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-black/5 text-[#0a0a0a] flex items-center justify-center shrink-0 border border-black/10">
                    <Clock size={15} />
                  </div>
                  <div className="text-xs md:text-sm font-body text-on-surface-variant space-y-1 pt-0.5">
                    <p className="font-bold text-on-surface uppercase tracking-wider font-label text-[10px] mb-1">Operating Hours</p>
                    <p className="font-medium">Monday – Friday: 10:00 AM – 7:00 PM IST</p>
                    <p className="font-medium">Saturday: 10:00 AM – 4:00 PM IST</p>
                    <p className="text-[10px] text-on-surface-variant/60">Closed on Sundays & Indian Public Holidays</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-7 bg-[#ffffff] p-8 md:p-10 border border-black/5 rounded-2xl shadow-xl hover:border-black/15 transition-all duration-500 text-left"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="py-16 text-center space-y-4 max-w-sm mx-auto"
                >
                  <div className="w-14 h-14 bg-black/5 text-black rounded-full flex items-center justify-center mx-auto mb-2 border border-black/10">
                    <Check size={26} className="text-black" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold">Message Submitted</h3>
                  <p className="font-label text-[9px] uppercase tracking-widest text-black font-extrabold">
                    DHANYAVAAD · THANK YOU
                  </p>
                  <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    Our skincare concierge will review your message and reply via email within 24 business hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <h3 className="font-headline text-xl border-b border-black/5 pb-3 flex items-center gap-2 font-bold text-[#0a0a0a]">
                    Send an Inquiry
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. Vanshaj Sharma"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface transition-all placeholder:text-black/20"
                        placeholder="e.g. vanshaj@forgeweb.in"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                      Subject / Skincare Concern
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface cursor-pointer transition-all"
                    >
                      <option value="Skincare Advice">Customized Skincare Advice</option>
                      <option value="Order Shipping Status">Order & Shipping Inquiry</option>
                      <option value="Returns & Exchanges">Returns & Exchanges (India)</option>
                      <option value="Ingredients & Safety">Ingredients, Actives & Safety</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-label text-[9px] uppercase tracking-widest text-[#0a0a0a] font-bold">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-black/15 focus:border-black focus:outline-hidden py-3 px-1 font-body text-xs md:text-sm text-on-surface placeholder:text-black/20 resize-none transition-all"
                      placeholder="Share details of your skin concern or shipping inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-[#1a1a19] text-white py-4 font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-sm font-bold flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Send size={11} /> SEND MESSAGE
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
