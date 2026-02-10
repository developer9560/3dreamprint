// Featured Products Section for Home Page
import React from 'react';
import Link from 'next/link';
import ProductCard from '../products/ProductCard';
import Button from '../ui/Button';

export default function FeaturedProducts() {
    const featuredProducts = [
        {
            id: 1,
            name: 'Personalized Photo Lamp - Round',
            price: 1299,
            mrp: 1999,
            image: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop'],
            category: 'Lamps',
            rating: 4.9,
            reviewCount: 234,
            slug: 'personalized-photo-lamp-round',
            isBestseller: true,
        },
        {
            id: 2,
            name: 'Heart-Shaped Lithophane Keychain',
            price: 399,
            mrp: 699,
            image: ['https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=500&h=500&fit=crop'],
            category: 'Keychains',
            rating: 5.0,
            reviewCount: 189,
            slug: 'heart-shaped-lithophane-keychain',
            isNew: true,
        },
        {
            id: 3,
            name: 'Square Lithophane Photo Frame',
            price: 1599,
            mrp: 2499,
            image: ['https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=500&fit=crop'],
            category: 'Frames',
            rating: 4.8,
            reviewCount: 145,
            slug: 'square-lithophane-photo-frame',
            isBestseller: true,
        },
        {
            id: 4,
            name: 'Couple\'s Lithophane Gift Set',
            price: 2499,
            mrp: 3499,
            image: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop'],
            category: 'Gift Sets',
            rating: 4.9,
            reviewCount: 98,
            slug: 'couples-lithophane-gift-set',
            isNew: true,
        },
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2">
                            Featured Products
                        </h2>
                        <p className="text-lg text-[var(--color-text-secondary)]">
                            Our most popular lithophane creations
                        </p>
                    </div>
                    <Link href="/shop" className="hidden md:block">
                        <Button variant="outline">View All Products</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="md:hidden text-center">
                    <Link href="/shop">
                        <Button variant="outline" fullWidth>View All Products</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
