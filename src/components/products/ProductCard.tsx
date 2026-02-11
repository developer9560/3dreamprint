'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons';

export interface Product {
    id: number;
    name: string;
    price: number;
    mrp: number;
    image: string[];
    category: string;
    rating: number;
    reviewCount: number;
    slug: string;
    isNew?: boolean;
    isBestseller?: boolean;
}

export interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Calculate discount percentage
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

    return (
        <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100/50 litho-glow">
            {/* Image Container */}
            <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay Gradient (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">

                    {discount > 0 && (
                        <span className="px-3 py-1 text-xs font-bold text-white bg-rose-500/90 rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                            {discount}% OFF
                        </span>
                    )}
                </div>

                {/* Quick Action Overlay Button - Appears on Hover */}
                <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 hidden md:block">
                    <Button
                        fullWidth
                        variant="primary"
                        className="shadow-xl !font-bold !py-3 !text-sm !uppercase !tracking-wider flex items-center justify-center gap-2 !bg-white !text-rose-600 hover:!bg-rose-50 border-none"
                    >
                        Customize Now
                    </Button>
                </div>
            </Link>

            {/* Content */}
            <div className="flex-1 flex flex-col p-5">
                {/* Category */}
                <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    {product.category}
                </p>

                {/* Title */}
                <Link href={`/shop/${product.slug}`} className="mb-2 block">
                    <h3 className="text-lg font-heading font-semibold text-[var(--color-text)] leading-tight group-hover:text-[var(--color-amber)] transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex text-amber-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={`${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                        ({product.reviewCount} reviews)
                    </span>
                </div>

                {/* Price */}
                <div className="mt-auto flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[var(--color-text)]">
                        ₹{product.price.toLocaleString()}
                    </span>
                    {product.mrp > product.price && (
                        <span className="text-sm text-gray-400 line-through decoration-gray-400/50">
                            ₹{product.mrp.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Mobile Button (Always Visible) */}
                <div className="mt-4 md:hidden">
                    <Link href={`/shop/${product.slug}`}>
                        <Button
                            fullWidth
                            variant="primary"
                            size="sm"
                            className="!font-bold"
                        >
                            Customize
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
