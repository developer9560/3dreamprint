'use client';

import React, { useState, useEffect, use } from 'react';
import { ProductImageGallery } from '@/src/components/products/ProductImageGallery';
import { ProductInfo } from '@/src/components/products/ProductInfo';
import { ProductDetails } from '@/src/components/products/ProductDetails';
// import { ProductSlider } from '@/src/components/products/ProductSlider';
import { notFound } from 'next/navigation';
import api from '@/src/lib/api';
import type { Product } from '@/src/types';
import { Loader2 } from 'lucide-react';
import CustomizationPanel from '@/src/components/product-detail/CustomizationPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShieldAlt, faTruck, faHandHoldingHeart, faLeaf } from '@fortawesome/free-solid-svg-icons';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailContent({ params }: PageProps) {
    const { slug } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [isCustomizing, setIsCustomizing] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/public/products/${slug}`);
                setProduct(response.data);

                // Fetch similar products
                if (response.data.slug) {
                    const similarRes = await api.get(`/public/products/${response.data.slug}/similar`);
                    setSimilarProducts(similarRes.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-[#10B981] animate-spin" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return notFound();
    }

    return (
        <div className="bg-[#F9FAFB] min-h-screen py-3">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 max-w-7xl">

                {/* Main Grid: Sticky Gallery + Scrollable Info */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left: Image Gallery - Sticky on desktop */}
                        <div className="w-full p-4 md:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                            <ProductImageGallery
                                images={product.images && product.images.length > 0 ? product.images : [{ id: 0, imageUrl: '/placeholder.png', isPrimary: true, sortOrder: 0 }]}
                                productName={product.name}
                            />
                        </div>

                        {/* Right: Product Info - Scrollable */}
                        <div className="w-full p-4 md:p-6 lg:p-8 overflow-y-auto max-h-screen">
                            <ProductInfo
                                product={product}
                                onCustomizeClick={() => setIsCustomizing(true)}
                            />

                            <div className="my-8 h-px bg-gray-100" />

                            <ProductDetails
                                productDetails={product.productDetails || []}
                                features={[
                                    'Premium Quality Guarantee',
                                    'Sourced directly from certified suppliers',
                                    'Safe and Hygienic Packaging',
                                    '100% Genuine Product'
                                ]}
                            />
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
                            <div className="h-px bg-gray-200 my-6" />

                            {/* Customization Modal */}
                            {product.customizable && isCustomizing && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <div
                                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                                        onClick={() => setIsCustomizing(false)}
                                    />
                                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] flex flex-col z-10 animate-scaleIn">
                                        <CustomizationPanel
                                            product={product}
                                            onClose={() => setIsCustomizing(false)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Similar Products Slider */}
                {similarProducts.length > 0 && (
                    <div className="mt-12">
                        {/* <ProductSlider
                            title="You Might Also Like"
                            products={similarProducts}
                        /> */}
                    </div>
                )}
            </div>
        </div>
    );
}
