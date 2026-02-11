'use client';

// FAQ Page with accordion
import React, { useState } from 'react';
import Card from '@/src/components/ui/Card';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const categories = [
        { name: 'All', icon: '✨' },
        { name: 'Orders & Customization', icon: '🎨' },
        { name: 'Shipping & Delivery', icon: '📦' },
        { name: 'Product Care', icon: '✨' },
        { name: 'Returns & Refunds', icon: '🔄' },
        { name: 'Payment & Security', icon: '🛡️' },
    ];

    const faqs = [
        {
            category: 'Orders & Customization',
            questions: [
                {
                    q: 'How do I upload my photo for a lithophane?',
                    a: 'Simply click on "Customize" in the menu, choose your product type, and follow the step-by-step wizard. You can upload your photo directly from your device. We accept JPG and PNG formats, and recommend high-resolution images for the best results.',
                    tip: 'Don’t worry — we guide you step by step through the customization process.'
                },
                {
                    q: 'What photo quality do I need?',
                    a: 'For best results, use a high-resolution image (at least 1000x1000 pixels). Photos with good contrast between light and dark areas work best. Avoid overly bright or dark photos, and images that are too blurry.',
                    tip: 'High contrast photos create the most stunning depth!'
                },
                {
                    q: 'Can I see a preview before ordering?',
                    a: 'Yes! Our customization wizard includes a preview feature that shows you how your lithophane will look. You can make adjustments before finalizing your order.',
                },
                {
                    q: 'Can I order multiple lithophanes with different photos?',
                    a: 'Absolutely! You can add multiple items to your cart, each with a different photo and customization.',
                },
            ],
        },
        {
            category: 'Shipping & Delivery',
            questions: [
                {
                    q: 'How long does shipping take?',
                    a: "Most orders are printed and shipped within 3-5 business days. Delivery typically takes an additional 3-5 business days depending on your location within India. You'll receive a tracking number once your order ships.",
                    tip: 'Need it sooner? Contact us for express options.'
                },
                {
                    q: 'Do you ship internationally?',
                    a: "Currently, we only ship within India. We're working on expanding our shipping options to serve international customers soon!",
                },
                {
                    q: 'What are the shipping costs?',
                    a: 'Shipping is FREE on all orders above ₹1,000. For orders below ₹1,000, shipping costs ₹99.',
                },
            ],
        },
        {
            category: 'Product Care',
            questions: [
                {
                    q: 'How do I clean my lithophane?',
                    a: 'Gently wipe with a soft, dry cloth. Avoid using water or cleaning chemicals as they may damage the finish. Keep away from direct sunlight to prevent fading.',
                    tip: 'A simple microfiber cloth works wonders.'
                },
                {
                    q: 'Is the lithophane fragile?',
                    a: 'Lithophanes are made from durable PLA plastic, but like all 3D prints, they should be handled with care. Avoid dropping or applying excessive pressure.',
                    tip: 'They are more durable than glass, but still appreciate gentle handling.'
                },
            ],
        },
        {
            category: 'Returns & Refunds',
            questions: [
                {
                    q: 'What is your return policy?',
                    a: 'Since each lithophane is custom-made with your photo, we cannot accept returns unless the product is damaged or defective. If you receive a damaged item, please contact us within 48 hours with photos, and we\'ll send a replacement free of charge.',
                },
                {
                    q: 'What if I\'m not satisfied with the print quality?',
                    a: 'Your satisfaction is our priority! If you\'re not happy with the print quality, contact us within 7 days and we\'ll work with you to find a solution, including a reprint if necessary.',
                    tip: 'We aren’t happy until you are glowing with joy!'
                },
            ],
        },
        {
            category: 'Payment & Security',
            questions: [
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept UPI, Credit/Debit Cards, Net Banking, and popular digital wallets. All payments are processed securely through our payment gateway.',
                },
                {
                    q: 'Is my payment information secure?',
                    a: 'Yes! We use industry-standard encryption and secure payment gateways to ensure your payment information is always protected.',
                    tip: 'Your security is as important to us as your memories.'
                },
            ],
        },
    ];

    const filteredFaqs = activeCategory === 'All'
        ? faqs
        : faqs.filter(cat => cat.category === activeCategory);

    return (
        <div className="min-h-screen bg-[var(--color-cream)] overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-100/30 to-transparent -z-10"></div>
                <div className="container max-w-4xl mx-auto relative z-10 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-slate-dark)] mb-6 font-[var(--font-elegant)]">
                        We’re Here to <span className="text-[var(--color-amber)]">Help</span>
                    </h1>
                    <p className="text-xl text-[var(--color-text-secondary)] font-medium max-w-2xl mx-auto mb-8">
                        Everything you need to know about creating your unique lithophane gift.
                    </p>
                    <div className="w-20 h-1 bg-[var(--color-amber)] mx-auto rounded-full opacity-60"></div>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="pb-12 px-4 sticky top-20 z-40 bg-[var(--color-cream)]/80 backdrop-blur-md">
                <div className="container max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 py-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => {
                                    setActiveCategory(cat.name);
                                    setOpenIndex(null);
                                }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm border ${activeCategory === cat.name
                                    ? 'bg-[var(--color-amber)] text-[var(--color-slate-dark)] border-[var(--color-amber)] shadow-amber-200/50'
                                    : 'bg-white text-[var(--color-text-secondary)] border-gray-100 hover:border-amber-200 hover:bg-amber-50/50'
                                    }`}
                            >
                                <span className="text-lg">{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Accordions */}
            <section className="py-12 px-4 min-h-[60vh]">
                <div className="container max-w-4xl mx-auto space-y-16">
                    {filteredFaqs.map((cat, catIndex) => (
                        <div key={catIndex} className="animate-fade-in-up" style={{ animationDelay: `${catIndex * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-[var(--color-slate-dark)] font-[var(--font-elegant)]">
                                    {cat.category}
                                </h2>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            <div className="space-y-4">
                                {cat.questions.map((faq, qIndex) => {
                                    const uniqueIndex = catIndex * 100 + qIndex;
                                    const isOpen = openIndex === uniqueIndex;

                                    return (
                                        <div
                                            key={qIndex}
                                            className={`rounded-[var(--radius-lg)] border transition-all duration-300 overflow-hidden ${isOpen
                                                ? 'bg-white shadow-xl border-amber-200 ring-1 ring-amber-50'
                                                : 'bg-white/60 hover:bg-white border-transparent hover:border-gray-100 hover:shadow-md'
                                                }`}
                                        >
                                            <button
                                                className="w-full text-left px-8 py-6 flex justify-between items-center gap-4"
                                                onClick={() => setOpenIndex(isOpen ? null : uniqueIndex)}
                                            >
                                                <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-[var(--color-slate-dark)]' : 'text-[var(--color-text)]'}`}>
                                                    {faq.q}
                                                </h3>
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[var(--color-amber)] border-[var(--color-amber)] rotate-180' : 'bg-gray-50 border-gray-100'}`}>
                                                    <svg
                                                        className={`w-4 h-4 transition-colors ${isOpen ? 'text-[var(--color-slate-dark)]' : 'text-gray-400'}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>

                                            <div
                                                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0 overflow-hidden'
                                                    }`}
                                            >
                                                <div className="px-8 pb-8 pt-6">
                                                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg mb-6">
                                                        {faq.a}
                                                    </p>

                                                    {faq.tip && (
                                                        <div className="flex gap-4 p-4 bg-amber-50 rounded-[var(--radius-md)] border border-amber-100/50">
                                                            <span className="text-xl">💡</span>
                                                            <p className="text-sm text-amber-900 font-medium">
                                                                {faq.tip}
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-50 text-sm">
                                                        <span className="text-gray-400">Was this helpful?</span>
                                                        <div className="flex gap-4">
                                                            <button className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-amber-600 transition-colors uppercase tracking-widest font-bold text-[10px]">
                                                                <span>👍</span> Yes
                                                            </button>
                                                            <button className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-gray-600 transition-colors uppercase tracking-widest font-bold text-[10px]">
                                                                <span>👎</span> No
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Support CTA Block */}
            <section className="py-24 px-4 bg-gradient-to-b from-transparent to-white/50">
                <div className="container max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-[var(--color-slate-dark)] to-[#1a1a1a] rounded-[var(--radius-xl)] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden group">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-[var(--font-elegant)]">Still have questions?</h2>
                            <p className="text-lg text-amber-100/70 mb-10 max-w-xl mx-auto">
                                Can’t find the answer you’re looking for? We’d love to help you create your perfect gift.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="px-8 py-4 bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] text-[var(--color-slate-dark)] font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
                                >
                                    Contact Support
                                </a>
                                <a
                                    href="https://wa.me/91xxxxxxxxxx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md transition-all border border-white/10 hover:border-white/20 active:scale-95"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Animation Keyframes */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
