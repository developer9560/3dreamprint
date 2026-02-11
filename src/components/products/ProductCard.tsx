import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTag, faFire, faClock } from '@fortawesome/free-solid-svg-icons';
import { Product, ProductMiniResponse } from '@/src/types/product';
import { cn } from '@/src/lib/utils';

export interface ProductCardProps {
    product: Product | ProductMiniResponse;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    // Extract price and MRP
    let price = 0;
    let mrp = 0;

    if ('skus' in product && product.skus.length > 0) {
        const mainSku = product.skus[0];
        price = mainSku.price;
        mrp = mainSku.mrp;
    }

    // Extract primary image
    let primaryImage = 'https://via.placeholder.com/500x600?text=No+Image';
    if ('images' in product && product.images && product.images.length > 0) {
        primaryImage = product.images.find(img => img.isPrimary)?.imageUrl || product.images[0].imageUrl;
    } else if ('imageUrl' in product) {
        primaryImage = product.imageUrl;
    }

    // Calculate discount percentage
    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return (
        <div className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,191,0,0.15)] hover:-translate-y-2 border border-gray-100/50">
            {/* Image Container */}
            <Link href={`/users/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-gray-50">
                <img
                    src={primaryImage}
                    alt={product.name}
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
                        priority ? "opacity-100" : "opacity-90 group-hover:opacity-100"
                    )}
                    loading={priority ? "eager" : "lazy"}
                />

                {/* Overlay Gradient (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {discount > 0 && (
                        <span className="px-3 py-1.5 text-[10px] font-black text-white bg-rose-500 rounded-lg shadow-lg flex items-center gap-1.5 uppercase tracking-tighter">
                            <FontAwesomeIcon icon={faTag} className="text-[10px]" />
                            {discount}% Saved
                        </span>
                    )}
                    {product.id % 3 === 0 && ( // Mocking a "Trending" badge for visual interest
                        <span className="px-3 py-1.5 text-[10px] font-black text-white bg-amber-500 rounded-lg shadow-lg flex items-center gap-1.5 uppercase tracking-tighter">
                            <FontAwesomeIcon icon={faFire} className="text-[10px]" />
                            Trending
                        </span>
                    )}
                </div>

                {/* Quick Action Overlay Selection */}
                <div className="absolute inset-x-4 bottom-4 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 hidden md:block">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-1 shadow-2xl flex gap-1">
                        <Button
                            fullWidth
                            variant="primary"
                            className="!shadow-none !font-bold !py-2.5 !text-[11px] !uppercase !tracking-widest !rounded-lg !bg-amber-500 !text-white hover:!bg-amber-600 border-none"
                        >
                            Quick View
                        </Button>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="flex-1 flex flex-col p-5">
                {/* Category & Shape */}
                <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-md">
                        {('category' in product && product.category?.name) || 'Uncategorized'}
                    </p>
                    {('shape' in product || 'shapeName' in product) && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <FontAwesomeIcon icon={faClock} className="text-[8px]" />
                            {'shape' in product ? product.shape : (product as ProductMiniResponse).shapeName}
                        </span>
                    )}
                </div>

                {/* Title */}
                <Link href={`/users/shop/${product.slug}`} className="mb-3 block">
                    <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-amber-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    {'summary' in product && product.summary && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1 font-medium">
                            {product.summary}
                        </p>
                    )}
                </Link>

                {/* Price & Rating Row */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-gray-900 tracking-tight">
                            ₹{price.toLocaleString()}
                        </span>
                        {mrp > price && (
                            <span className="text-[11px] text-gray-400 line-through decoration-gray-300 font-bold">
                                ₹{mrp.toLocaleString()}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50/50 px-2.5 py-1.5 rounded-xl">
                        <FontAwesomeIcon icon={faStar} className="text-amber-400 text-[10px]" />
                        <span className="text-xs font-black text-amber-700">
                            {('rating' in product ? product.rating : null) || '4.9'}
                        </span>
                    </div>
                </div>

                {/* Mobile Tablet Button (Always Visible) */}
                <div className="mt-5 md:hidden">
                    <Link href={`/users/shop/${product.slug}`}>
                        <Button
                            fullWidth
                            variant="primary"
                            size="sm"
                            className="!font-black !text-[10px] !uppercase !tracking-widest !rounded-xl !bg-amber-500"
                        >
                            Explore Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
