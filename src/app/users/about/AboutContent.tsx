// About Us Page
"use client"
import React from 'react';
import Card from '@/src/components/ui/Card';

export default function AboutPage() {
    const values = [
        {
            icon: '✨',
            title: 'Craftsmanship',
            description: 'Every lithophane is meticulously 3D-printed layer by layer, turning your cherished photographs into stunning translucent art.',
        },
        {
            icon: '💖',
            title: 'Care',
            description: 'We treat your memories with the respect they deserve, ensuring every detail glows with the same emotion you felt in the moment.',
        },
        {
            icon: '🚀',
            title: 'Quality Speed',
            description: 'We prioritize both precision and pace, so your custom masterpiece arrives at your doorstep without delay.',
        },
    ];

    const trustCards = [
        {
            icon: '🏆',
            title: 'Handcrafted Quality',
            description: 'Individually printed and hand-inspected for flawless detail.',
        },
        {
            icon: '📦',
            title: 'Express Delivery',
            description: 'Fast turnaround times to ensure your gift arrives on time.',
        },
        {
            icon: '🤝',
            title: 'Customer-First',
            description: 'Dedicated support to help you create the perfect memory.',
        },
        {
            icon: '🌿',
            title: 'Sustainable Passion',
            description: 'Created with high-quality, eco-friendly materials.',
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-cream)] overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
                {/* Cinematic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF0] via-[#FFECB3]/30 to-[#FFD54F]/10 -z-10"></div>
                {/* Glow Particles (CSS Only) */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

                <div className="container px-4 text-center relative z-10 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[var(--color-slate-dark)] font-[var(--font-elegant)]">
                        3DreamPrint: We Turn<br />
                        <span className="text-[var(--color-amber)] drop-shadow-sm">Memories Into Light</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-medium max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up delay-300 fill-mode-forwards">
                        Every lithophane we create carries a story, a moment, and a feeling.
                    </p>
                    <div className="mt-10 opacity-0 animate-fade-in-up delay-500 fill-mode-forwards">
                        <div className="w-16 h-1 bg-[var(--color-amber)] mx-auto rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Our Story / Narrative Section */}
            <section className="py-20 md:py-32 bg-white/50 backdrop-blur-sm">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-8">
                            <div className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-bold tracking-widest uppercase">
                                Our Origin
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-slate-dark)] font-[var(--font-elegant)] leading-tight">
                                A Simple Idea<br />
                                <span className="text-[var(--color-amber)]">Grew Into a Passion</span>
                            </h2>
                            <div className="space-y-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                                <p>
                                    It all started with a simple question: How can we make a memory feel as vivid as the day it was captured? We discovered the answer in the delicate art of 3D-etched light.
                                </p>
                                <p>
                                    As a small team of artists and dreamers, we were captivated by how a flat image could transform into a breathing, glowing masterpiece when held to the light. It wasn't just tech—it was magic.
                                </p>
                                <p>
                                    Today, we bring that same wonder to every gift we craft. We don't just print panels; we preserve the warmth of a smile and the brilliance of a sunset.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            {/* Visual Placeholder with Glassmorphism */}
                            <div className="aspect-square bg-gradient-to-tr from-amber-50 to-orange-100 rounded-2xl overflow-hidden shadow-2xl relative group">
                                <div className="absolute inset-0 bg-white/10 opacity-50 backdrop-blur-3xl group-hover:opacity-30 transition-opacity"></div>
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <div className="text-8xl filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">💡</div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 text-4xl opacity-20">✨</div>
                                <div className="absolute bottom-8 left-8 text-4xl opacity-20">🌟</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-[var(--color-cream)]">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <div className="bg-white p-12 md:p-16 rounded-[var(--radius-xl)] shadow-lg border border-amber-100/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-amber-500/10 text-9xl font-bold select-none group-hover:scale-110 transition-transform duration-700 font-[var(--font-elegant)]">Mission</div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mb-8">🎯</div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-slate-dark)] mb-6 font-[var(--font-elegant)]">Our Mission</h2>
                            <p className="text-2xl md:text-3xl text-[var(--color-amber-dark)] font-bold italic mb-6 leading-tight">
                                “To preserve life’s most meaningful moments in light.”
                            </p>
                            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
                                We believe every memory is a bridge. Our mission is to build that bridge with light, making your stories touchable, visible, and eternal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Trust Cards */}
            <section className="py-24 bg-white">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[var(--color-slate-dark)] font-[var(--font-elegant)] mb-4">Why Trust Us?</h2>
                        <p className="text-lg text-[var(--color-text-secondary)]">The care we put into every detail defines who we are.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trustCards.map((card, index) => (
                            <div key={index} className="p-8 rounded-[var(--radius-lg)] border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                                <div className="text-4xl mb-6 bg-amber-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-amber-100 transition-colors">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[var(--color-slate-dark)] mb-3">{card.title}</h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section - Visual Blocks */}
            <section className="py-24 bg-gradient-to-b from-white to-[var(--color-cream)]">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-[var(--color-slate-dark)] font-[var(--font-elegant)] mb-4">Our Values</h2>
                        <div className="w-24 h-1 bg-[var(--color-amber)] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((value, index) => (
                            <div key={index} className="relative group p-10 bg-white rounded-[var(--radius-xl)] shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-amber-50">
                                <div className="absolute top-0 left-0 w-2 h-0 bg-[var(--color-amber)] group-hover:h-full transition-all duration-500"></div>
                                <div className="text-5xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-slate-dark)] mb-4">{value.title}</h3>
                                <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA / Community Section */}
            <section className="py-24 bg-[var(--color-cream)]">
                <div className="container px-4 max-w-5xl mx-auto">
                    <div className="relative p-12 md:p-20 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-slate-dark)] to-[#1a1a1a] text-center overflow-hidden shadow-2xl">
                        {/* Decorative background glow */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px]"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px]"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[var(--font-elegant)]">Thousands of Memories.</h2>
                            <p className="text-xl md:text-2xl text-amber-100/80 mb-12 font-medium">One glowing tradition.</p>
                            <a
                                href="/customize"
                                className="inline-flex items-center px-10 py-4 bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] text-[var(--color-slate-dark)] font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,193,7,0.4)] group overflow-hidden relative"
                            >
                                <span className="relative z-10">Create Your Lithophane</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Animation Keyframes */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-500 {
                    animation-delay: 0.5s;
                }
                .fill-mode-forwards {
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
}
