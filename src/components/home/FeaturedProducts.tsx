// Featured Products Section for Home Page
import React from 'react';
import Link from 'next/link';
import { Product } from '@/src/types/product';
import ProductCard from '../products/ProductCard';
import Button from '../ui/Button';

export default function FeaturedProducts() {
    const featuredProducts: Product[] = [
        {
            id: 1,
            name: 'Personalized Photo Lamp - Round',
            slug: 'personalized-photo-lamp-round',
            summary: 'A beautiful round lithophane lamp that brings your memories to life.',
            productDetails: [],
            isActive: true,
            category: { id: 1, name: 'Lamps', slug: 'lamps', isActive: true },
            rating: 4.9,
            reviewCount: 234,
            images: [
                { id: 1, imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop', isPrimary: true, sortOrder: 0 }
            ],
            skus: [
                { id: 1, skuCode: 'LAMP-RND-001', price: 1299, mrp: 1999, productId: 1 }
            ],
        },
        {
            id: 2,
            name: 'Heart-Shaped Lithophane Keychain',
            slug: 'heart-shaped-lithophane-keychain',
            summary: 'Carry your loved ones with you wherever you go.',
            productDetails: [],
            isActive: true,
            category: { id: 2, name: 'Keychains', slug: 'keychains', isActive: true },
            rating: 5.0,
            reviewCount: 189,
            images: [
                { id: 2, imageUrl: 'https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=500&h=500&fit=crop', isPrimary: true, sortOrder: 0 }
            ],
            skus: [
                { id: 2, skuCode: 'KC-HRT-001', price: 399, mrp: 699, productId: 2 }
            ],
        },
        {
            id: 3,
            name: 'Square Lithophane Photo Frame',
            slug: 'square-lithophane-photo-frame',
            summary: 'Elegant square frame for a classic lithophane look.',
            productDetails: [],
            isActive: true,
            category: { id: 3, name: 'Frames', slug: 'frames', isActive: true },
            rating: 4.8,
            reviewCount: 145,
            images: [
                { id: 3, imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=500&fit=crop', isPrimary: true, sortOrder: 0 }
            ],
            skus: [
                { id: 3, skuCode: 'FRM-SQR-001', price: 1599, mrp: 2499, productId: 3 }
            ],
        },
        {
            id: 4,
            name: 'Couple\'s Lithophane Gift Set',
            slug: 'couples-lithophane-gift-set',
            summary: 'The perfect gift set for anniversaries and special moments.',
            productDetails: [],
            isActive: true,
            category: { id: 4, name: 'Gift Sets', slug: 'gift-sets', isActive: true },
            rating: 4.9,
            reviewCount: 98,
            images: [
                { id: 4, imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop', isPrimary: true, sortOrder: 0 }
            ],
            skus: [
                { id: 4, skuCode: 'SET-CPL-001', price: 2499, mrp: 3499, productId: 4 }
            ],
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
