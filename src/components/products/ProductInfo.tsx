'use client';

import React, { useState, useEffect } from 'react';
import { Minus, Plus, Clock, ShieldCheck, Star, Check } from 'lucide-react';
import { cn, formatPrice } from '@/src/lib/utils';
import { useCartStore } from '@/src/store/cartStore';
import { productsAPI } from '@/src/lib/api';
import type { Product, ProductSku, ProductVariants, SkuVariant } from '@/src/types';

interface ProductInfoProps {
    product: Product;
}

import { CheckoutModal } from '@/src/components/product-detail/CheckoutModal';
import Button from '@/src/components/ui/Button';
import { CreditCard } from 'lucide-react';

interface ProductInfoProps {
    product: Product;
    onCustomizeClick?: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onCustomizeClick }) => {
    // const { addItem, updateQuantity, getItemQuantity, isInCart } = useCartStore(); // Cart store not used for direct buy

    const [selectedSku, setSelectedSku] = useState<ProductSku | undefined>(product.skus?.[0]);
    const [selectedAttributes, setSelectedAttributes] = useState<Record<number, number>>({});
    const [variantData, setVariantData] = useState<ProductVariants | null>(null);
    const [isLoadingVariants, setIsLoadingVariants] = useState(false);

    // Checkout Modal State
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [quantity, setQuantity] = useState(1); // Local quantity state for Buy Now

    const price = selectedSku?.price || 0;
    const originalPrice = selectedSku?.mrp || price;

    const discountPercentage = originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    // ... variant fetching logic (keep as is) ...

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleBuyNow = () => {
        setIsCheckoutOpen(true);
    };

    // ... handleAttributeSelect logic (keep as is) ...

    return (
        <div className="flex flex-col gap-6">
            {/* ... Breadcrumb, Title logic (keep as is) ... */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                {/* <p className="text-gray-600">{product.descriptio}</p> */}
            </div>
            {/* Price & Discount */}
            <div className="flex flex-col">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900">
                        {formatPrice(price)}
                    </span>
                    {originalPrice > price && (
                        <>
                            <span className="text-lg text-gray-400 line-through font-medium">
                                {formatPrice(originalPrice)}
                            </span>
                            <span className="px-2.5 py-1 bg-[#3B82F6] text-white text-xs font-bold rounded-md">
                                {discountPercentage}% OFF
                            </span>
                        </>
                    )}
                </div>
                <span className="text-xs text-gray-500 mt-2">(Inclusive of all taxes)</span>
            </div>

            {/* Buy Now Section (Only for Standard Products) */}
            {!product.customizable ? (
                <div className="flex flex-col gap-4 pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                                onClick={handleDecrement}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg"
                                disabled={quantity <= 1}
                            >
                                <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <Button
                        fullWidth
                        variant="primary"
                        size="lg"
                        className="h-14 text-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/20"
                        onClick={handleBuyNow}
                    >
                        <CreditCard className="mr-2" size={20} />
                        Buy Now
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-4 pt-2">
                    <Button
                        fullWidth
                        variant="primary"
                        size="lg"
                        className="h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20"
                        onClick={onCustomizeClick}
                    >
                        <Star className="mr-2" size={20} />
                        Customize & Buy
                    </Button>
                    <p className="text-xs text-center text-gray-500">
                        Click 'Customize & Buy' to upload photos and choose options.
                    </p>
                </div>
            )}

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                totalPrice={price * quantity}
                productName={product.name}
                productSkuId={selectedSku?.id || 0}
                quantity={quantity}
            />


            {/* Trust Signals */}
            {/* <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="p-2.5 bg-white rounded-lg shadow-sm">
                        <Clock size={20} className="text-[#10B981]" />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-0.5">10 MINS</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">Fastest delivery</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="p-2.5 bg-white rounded-lg shadow-sm">
                        <ShieldCheck size={20} className="text-[#10B981]" />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-0.5">GENUINE</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">Quality assured</p>
                    </div>
                </div>
            </div> */}
            {/* Summary */}
            {
                product.summary && (
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                        <p className="text-sm text-blue-800 leading-relaxed">
                            {product.summary}
                        </p>
                    </div>
                )
            }
        </div>
    );

}

