'use client';

// FAQ Page with accordion
import React, { useState } from 'react';
import Card from '@/components/ui/Card';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: 'Orders & Customization',
            questions: [
                {
                    q: 'How do I upload my photo for a lithophane?',
                    a: 'Simply click on "Customize" in the menu, choose your product type, and follow the step-by-step wizard. You can upload your photo directly from your device. We accept JPG and PNG formats, and recommend high-resolution images for the best results.',
                },
                {
                    q: 'What photo quality do I need?',
                    a: 'For best results, use a high-resolution image (at least 1000x1000 pixels). Photos with good contrast between light and dark areas work best. Avoid overly bright or dark photos, and images that are too blurry.',
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
                },
                {
                    q: 'Is the lithophane fragile?',
                    a: 'Lithophanes are made from durable PLA plastic, but like all 3D prints, they should be handled with care. Avoid dropping or applying excessive pressure.',
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
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-cream)] py-12">
            <div className="container max-w-4xl">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                        Find answers to common questions about our lithophane products
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                                {category.category}
                            </h2>

                            <div className="space-y-3">
                                {category.questions.map((faq, qIndex) => {
                                    const uniqueIndex = catIndex * 100 + qIndex;
                                    const isOpen = openIndex === uniqueIndex;

                                    return (
                                        <Card
                                            key={qIndex}
                                            padding="md"
                                            className="cursor-pointer transition-all"
                                            onClick={() => setOpenIndex(isOpen ? null : uniqueIndex)}
                                        >
                                            <div className="flex justify-between items-start gap-4">
                                                <h3 className="text-lg font-semibold text-[var(--color-text)] flex-1">
                                                    {faq.q}
                                                </h3>
                                                <svg
                                                    className={`w-6 h-6 text-[var(--color-amber)] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                                                        }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>

                                            {isOpen && (
                                                <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed animate-fade-in">
                                                    {faq.a}
                                                </p>
                                            )}
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <Card padding="lg" className="mt-12 bg-gradient-to-br from-[var(--color-amber-light)] to-[var(--color-amber)]/30 text-center">
                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                        Still have questions?
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        Can't find the answer you're looking for? We'd love to help!
                    </p>
                    <a href="/contact" className="btn btn-primary">
                        Contact Us
                    </a>
                </Card>
            </div>
        </div>
    );
}
