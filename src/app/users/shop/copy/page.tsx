'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductGallery from '@/src/components/product-detail/ProductGallery';
import ProductInfo from '@/src/components/product-detail/ProductInfo';
import CustomizationPanel from '@/src/components/product-detail/CustomizationPanel';
import StorySection from '@/src/components/product-detail/StorySection';
import ReviewsSection from '@/src/components/product-detail/ReviewsSection';
import ProductTabs from '@/src/components/product-detail/ProductTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShieldAlt, faTruck, faHandHoldingHeart, faLeaf } from '@fortawesome/free-solid-svg-icons';

export default function ProductDetailPage() {
    const params = useParams();
    const { slug } = params;

    return (
        <div className="min-h-screen  container mx-auto px-4 py-4 bg-[#FAFAFA]">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="text-sm text-gray-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-amber-600">Home</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                    <Link href="/users/shop" className="hover:text-amber-600">Shop</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                    <span className="text-gray-800 font-medium capitalize">{String(slug).replace(/-/g, ' ')}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Gallery */}
                    <div>
                        <ProductGallery />
                    </div>

                    {/* Right: Info & Customization */}
                    <div>
                        <ProductInfo />

                        <div className="h-px bg-gray-200 my-6" />

                        <CustomizationPanel />

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faShieldAlt} className="text-amber-500 text-lg" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faTruck} className="text-amber-500 text-lg" />
                                <span>Fast Shipping</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faHandHoldingHeart} className="text-amber-500 text-lg" />
                                <span>Handcrafted</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <FontAwesomeIcon icon={faLeaf} className="text-amber-500 text-lg" />
                                <span>Eco-Friendly</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Spacing */}
                <div className="my-16" />

                {/* Emotional Story */}
                <StorySection />

                {/* Tabs: Details, Specs, etc. */}
                <div className="container mx-auto px-4 max-w-4xl">
                    <ProductTabs />
                </div>

                {/* Reviews */}
                <ReviewsSection />

            </main>
        </div>
    );
}
