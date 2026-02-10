// Category Grid Section
import React from 'react';
import Link from 'next/link';
import Card from '../ui/Card';

export default function CategoryGrid() {
    const categories = [
        {
            id: 1,
            name: 'Custom Lamps',
            description: 'Illuminate your memories',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop',
            href: '/shop?category=lamps',
        },
        {
            id: 2,
            name: 'Photo Keychains',
            description: 'Carry moments everywhere',
            image: 'https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=600&h=400&fit=crop',
            href: '/shop?category=keychains',
        },
        {
            id: 3,
            name: 'Lithophane Frames',
            description: 'Wall art that glows',
            image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&h=400&fit=crop',
            href: '/shop?category=frames',
        },
        {
            id: 4,
            name: 'Gift Sets',
            description: 'Perfect for any occasion',
            image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=400&fit=crop',
            href: '/shop?category=gifts',
        },
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                        Explore Our Collections
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                        Discover the perfect way to preserve your precious memories
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link key={category.id} href={category.href}>
                            <Card
                                hoverable
                                padding="sm"
                                className="h-full group cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-soft mb-4 aspect-[4/3]">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                                    {category.description}
                                </p>
                                <div className="flex items-center text-[var(--color-amber)] font-medium text-sm group-hover:gap-2 transition-all">
                                    <span>Shop Now</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
