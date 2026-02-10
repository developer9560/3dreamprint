'use client';

// Hero Section for Home Page
import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-[var(--color-cream)] via-[var(--color-amber-light)] to-[var(--color-cream)] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--color-amber)] rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--color-amber)] rounded-full blur-3xl"></div>
            </div>

            <div className="container relative py-20 md:py-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-center md:text-left animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                            Transform Your
                            <span className="block text-[var(--color-amber)] mt-2">
                                Memories Into Light
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 max-w-xl">
                            Create stunning personalized lithophane gifts. Turn your favorite photos
                            into beautiful 3D-printed lamps, keychains, and frames that glow with emotion.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/customize">
                                <Button variant="primary" size="lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Customize Your Lithophane
                                </Button>
                            </Link>
                            <Link href="/shop">
                                <Button variant="secondary" size="lg">
                                    Shop All Products
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-8 justify-center md:justify-start mt-12 text-sm text-[var(--color-text-secondary)]">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--color-amber)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Handcrafted Quality</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--color-amber)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                </svg>
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--color-amber)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span>5000+ Happy Customers</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative animate-slide-in">
                        <div className="relative rounded-large overflow-hidden shadow-elevated">
                            <img
                                src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop"
                                alt="Beautiful glowing lithophane lamp with family photo"
                                className="w-full h-auto object-cover"
                            />
                            {/* Glowing overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-amber)]/20 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Floating Cards */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-card shadow-elevated hidden md:block animate-pulse-soft">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-dark)] border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-[var(--color-text)]">2,500+</p>
                                    <p className="text-[var(--color-text-secondary)] text-xs">Orders this month</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-6 -right-6 bg-white p-4 rounded-card shadow-elevated hidden md:block">
                            <div className="flex items-center gap-2">
                                <div className="flex text-[var(--color-amber)]">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-[var(--color-text)]">4.9/5</p>
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">from 850+ reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
