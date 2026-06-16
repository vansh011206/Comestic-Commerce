"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqData = [
  {
    id: "shipping-cost",
    category: "Orders & Shipping",
    q: "How much does shipping cost and how long does it take?",
    a: "We offer complimentary standard shipping on all orders over ₹2,999. For orders below ₹2,999, shipping is a flat rate of ₹150. Orders are prepared and shipped within 1-2 business days from our laboratory in Paris. Delivery times generally range from 3 to 7 business days depending on your destination.",
  },
  {
    id: "return-policy",
    category: "Orders & Shipping",
    q: "What is your return policy?",
    a: "We want you to love your skincare ritual. If you are not completely satisfied, you may return any unused products in their original packaging within 30 days of purchase for a full refund. Please contact our support team at support@lumiere.com to request a pre-paid return shipping label.",
  },
  {
    id: "ingredients-safe",
    category: "Ingredient Safety",
    q: "Are Lumière products safe for sensitive skin?",
    a: "Yes, all our formulas are dermatologist-tested and specifically created to prioritize skin barrier integrity. We avoid common irritants such as synthetic fragrances, essential oils at sensitizing levels, denatured alcohols, parabens, and sulfates. For highly reactive skin, we recommend the 'Eternal Rose' line and suggests performing a patch test on your wrist before full application.",
  },
  {
    id: "preservatives-use",
    category: "Ingredient Safety",
    q: "How do you preserve your formulas if you don't use parabens?",
    a: "We utilize natural antimicrobial extracts, glycols, and strictly clean food-grade preservatives that prevent bacterial growth without disrupting your skin's microbiome. Additionally, our violet glass packaging naturally blocks visible light, preventing ingredient oxidation and prolonging efficacy.",
  },
  {
    id: "account-delete",
    category: "Account Security",
    q: "How do I delete my personal account and data?",
    a: "LUMIÈRE respects your data privacy. You may request account deletion at any time by navigating to your Profile dashboard or emailing us at privacy@lumiere.com. All stored payment information, order history, and personal address details will be completely wiped from our records within 48 hours.",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  const tabs = ["All", "Orders & Shipping", "Ingredient Safety", "Account Security"];

  const filteredFaqs = useMemo(() => {
    if (activeTab === "All") return faqData;
    return faqData.filter((faq) => faq.category === activeTab);
  }, [activeTab]);

  const toggleFaq = (id) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <main className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        
        {/* Header */}
        <header className="mb-16 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-label text-xs uppercase tracking-[0.25em] text-primary font-bold bg-[#0a0a0a]/10 px-4 py-1.5 rounded-full">
              Support Center
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-headline text-[36px] md:text-[50px] text-on-surface font-bold"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.25 }}
            className="font-body text-xs md:text-sm text-on-surface-variant max-w-lg mx-auto opacity-80 leading-relaxed"
          >
            Need help with your orders, ingredient safety, or account details? Find quick answers below.
          </motion.p>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex justify-center gap-2 pt-8 overflow-x-auto pb-2 custom-scrollbar"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setExpandedFaqId(null);
                }}
                className={`px-5 py-2.5 font-label text-[10px] uppercase tracking-wider rounded-full transition-all duration-300 font-bold ${
                  activeTab === tab
                    ? "bg-[#0a0a0a] text-on-surface shadow-xs"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </header>

        {/* Accordions */}
        <motion.div
          layout
          className="max-w-3xl mx-auto space-y-4 mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                key={faq.id}
                className="border border-outline-variant/30 rounded-lg bg-surface overflow-hidden shadow-3xs hover:border-[#0a0a0a]/30 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <div className="w-8 h-8 rounded-full bg-[#0a0a0a]/10 text-primary flex items-center justify-center shrink-0">
                      <HelpCircle size={15} className="text-[#0a0a0a]" />
                    </div>
                    <span className="font-headline text-md md:text-[17px] text-on-surface group-hover:text-primary transition-colors font-bold">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-outline-variant transition-transform duration-400 ease-out shrink-0 ${
                      expandedFaqId === faq.id ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedFaqId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-surface-container/30 border-t border-outline-variant/15"
                    >
                      <p className="px-6 py-5 pl-[72px] font-body text-xs md:text-sm text-on-surface-variant/90 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
