// Benefits Section - Why Choose Us
import React from 'react';
import Card from '../ui/Card';

export default function BenefitsSection() {
    const benefits = [
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
            ),
            title: 'Unique & Personalized',
            description: 'Every lithophane is custom-made with your photo, creating a truly one-of-a-kind gift that captures your special moments.',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            title: 'Handcrafted Quality',
            description: 'Each piece is carefully 3D-printed and inspected by our artisans to ensure the highest quality and attention to detail.',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Fast Turnaround',
            description: 'Most orders are printed and shipped within 3-5 business days, so you can enjoy your lithophane sooner.',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: '100% Satisfaction',
            description: 'We stand behind our work. If you\'re not completely satisfied, we\'ll make it right with our happiness guarantee.',
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[var(--color-cream)]">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                        Why Choose Lithophane Studio?
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                        We're passionate about turning photos into timeless keepsakes
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="text-center group">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-large bg-gradient-to-br from-[var(--color-amber-light)] to-[var(--color-amber)] text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-card">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-[var(--color-text-secondary)]">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
