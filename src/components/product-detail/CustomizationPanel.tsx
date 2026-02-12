'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Upload, CheckCircle, X, ChevronRight, Sparkles,
    Image as ImageIcon, AlertCircle, Loader2
} from 'lucide-react';
import { cn, formatPrice } from '@/src/lib/utils';
import type { Product } from '@/src/types';
import Button from '@/src/components/ui/Button';
import { CheckoutModal } from './CheckoutModal';

interface CustomizationPanelProps {
    product: Product;
    onClose?: () => void;
}

interface CustomizationState {
    uploadedImages: File[];
    imagePreviews: string[];
    shape: string;
    size: string;
    lighting: string;
    specialInstructions: string;
}

// Shape, Size, and Lighting options
const SHAPE_OPTIONS = [
    { value: 'round', label: 'Round', icon: '⭕' },
    { value: 'square', label: 'Square', icon: '⬜' },
    { value: 'heart', label: 'Heart', icon: '❤️' },
    { value: 'hexagon', label: 'Hexagon', icon: '⬡' },
];

const SIZE_OPTIONS = [
    { value: 'small', label: 'Small', dimensions: '4"×4"', priceMultiplier: 1.0 },
    { value: 'medium', label: 'Medium', dimensions: '6"×6"', priceMultiplier: 1.5 },
    { value: 'large', label: 'Large', dimensions: '8"×8"', priceMultiplier: 2.0 },
];

const LIGHTING_OPTIONS = [
    { value: 'warm', label: 'Warm White', addon: 0 },
    { value: 'white', label: 'Cool White', addon: 100 },
    { value: 'multi', label: 'Multi-Color RGB', addon: 300 },
];

export default function CustomizationPanel({ product, onClose }: CustomizationPanelProps) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const [customization, setCustomization] = useState<CustomizationState>({
        uploadedImages: [],
        imagePreviews: [],
        shape: 'round',
        size: 'medium',
        lighting: 'warm',
        specialInstructions: '',
    });

    const basePrice = product.skus?.[0]?.price || 1299;

    // Calculate total price
    const calculateTotalPrice = () => {
        const sizeOption = SIZE_OPTIONS.find(s => s.value === customization.size);
        const lightingOption = LIGHTING_OPTIONS.find(l => l.value === customization.lighting);

        const unitSizePrice = basePrice * (sizeOption?.priceMultiplier || 1);
        const lightingAddon = lightingOption?.addon || 0;

        return (unitSizePrice + lightingAddon) * quantity;
    };

    const totalPrice = calculateTotalPrice();

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);

        // Create previews
        const previews = files.map(file => URL.createObjectURL(file));

        setCustomization(prev => ({
            ...prev,
            uploadedImages: [...prev.uploadedImages, ...files],
            imagePreviews: [...prev.imagePreviews, ...previews],
        }));

        // Simulate upload delay
        setTimeout(() => {
            setIsUploading(false);
        }, 500);
    };

    // Remove image
    const removeImage = (index: number) => {
        setCustomization(prev => ({
            ...prev,
            uploadedImages: prev.uploadedImages.filter((_, i) => i !== index),
            imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
        }));
    };

    const handleProceedToCheckout = () => {
        if (customization.uploadedImages.length === 0) {
            return;
        }
        setIsCheckoutOpen(true);
    };

    const canProceed = customization.uploadedImages.length > 0;

    return (
        <>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-full flex flex-col">
                {/* Header with gradient */}
                <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-6 flex-shrink-0">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }} />
                    <div className="relative flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">✨ Customize Your Lithophane</h3>
                            <p className="text-amber-100 text-sm">Create your masterpiece in seconds</p>
                        </div>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-8 overflow-y-auto flex-1">
                    {/* Section 1: Upload Image */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">Upload Your Photo</h4>
                        </div>

                        {customization.imagePreviews.length === 0 ? (
                            <label className={cn(
                                "block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
                                isUploading ? "border-amber-400 bg-amber-50" : "border-gray-300 hover:border-amber-400 hover:bg-amber-50/50"
                            )}>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                                {isUploading ? (
                                    <div className="text-amber-600">
                                        <Loader2 className="w-10 h-10 mx-auto mb-3 animate-spin" />
                                        <p className="font-bold">Uploading...</p>
                                    </div>
                                ) : (
                                    <div className="text-gray-400">
                                        <Upload className="w-10 h-10 mx-auto mb-3" />
                                        <p className="font-medium text-gray-700 mb-1">Click to Upload Image</p>
                                        <p className="text-xs">Supports JPG, PNG • Max 10MB</p>
                                    </div>
                                )}
                            </label>
                        ) : (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    {customization.imagePreviews.map((preview, idx) => (
                                        <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-green-300 bg-green-50">
                                            <img src={preview} alt="Preview" className="w-full aspect-square object-cover" />
                                            <button
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={16} />
                                            </button>
                                            <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                <CheckCircle size={12} />
                                                <span className="font-semibold">Uploaded</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <label className="block border-2 border-dashed border-gray-200 hover:border-amber-400 rounded-xl p-4 text-center cursor-pointer transition-all">
                                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-amber-600">
                                        <ImageIcon size={18} />
                                        <span>Add more images</span>
                                    </div>
                                </label>
                            </div>
                        )}
                        {!canProceed && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-red-500">
                                <AlertCircle size={14} />
                                <span>Please upload an image to proceed</span>
                            </div>
                        )}
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Section 2: Shape & Size */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">Choose Shape & Size</h4>
                        </div>

                        {/* Shape */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Shape</p>
                            <div className="grid grid-cols-4 gap-2">
                                {SHAPE_OPTIONS.map(shape => (
                                    <button
                                        key={shape.value}
                                        onClick={() => setCustomization(prev => ({ ...prev, shape: shape.value }))}
                                        className={cn(
                                            "aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all text-2xl",
                                            customization.shape === shape.value
                                                ? "border-amber-500 bg-amber-50 shadow-md"
                                                : "border-gray-200 hover:border-gray-300"
                                        )}
                                    >
                                        <span>{shape.icon}</span>
                                        <span className="text-[10px] font-semibold text-gray-600">{shape.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Size</p>
                            <div className="grid grid-cols-3 gap-2">
                                {SIZE_OPTIONS.map(size => (
                                    <button
                                        key={size.value}
                                        onClick={() => setCustomization(prev => ({ ...prev, size: size.value }))}
                                        className={cn(
                                            "py-3 px-2 rounded-xl border-2 transition-all",
                                            customization.size === size.value
                                                ? "border-amber-500 bg-amber-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        )}
                                    >
                                        <p className="text-sm font-bold text-gray-800">{size.label}</p>
                                        <p className="text-[10px] text-gray-500">{size.dimensions}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Section 3: Lighting & Notes */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">Lighting & Notes</h4>
                        </div>

                        {/* Lighting */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">LED Lighting</p>
                            <div className="space-y-2">
                                {LIGHTING_OPTIONS.map(light => (
                                    <button
                                        key={light.value}
                                        onClick={() => setCustomization(prev => ({ ...prev, lighting: light.value }))}
                                        className={cn(
                                            "w-full py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-between",
                                            customization.lighting === light.value
                                                ? "border-amber-500 bg-amber-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        )}
                                    >
                                        <span className="text-sm font-semibold text-gray-700">{light.label}</span>
                                        <span className="text-xs text-gray-500">
                                            {light.addon > 0 ? `+${formatPrice(light.addon)}` : 'Free'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Special Instructions */}
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Special Instructions (Optional)</p>
                            <textarea
                                value={customization.specialInstructions}
                                onChange={(e) => setCustomization(prev => ({ ...prev, specialInstructions: e.target.value }))}
                                placeholder="Any special requests or notes for us..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 outline-none text-sm resize-none"
                            />
                        </div>

                        <div className="h-px bg-gray-100 my-6" />

                        {/* Section 4: Quantity */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">
                                    4
                                </div>
                                <h4 className="font-bold text-gray-800 text-lg">Quantity</h4>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold transition-colors"
                                    >
                                        -
                                    </button>
                                    <div className="w-12 h-12 flex items-center justify-center bg-white font-bold text-gray-900 border-x-2 border-gray-200">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 text-gray-600 font-bold transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 italic">Buying more? {quantity > 1 ? `Get ${quantity} units!` : 'Choose quantity'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer with Price and Action */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-600 text-sm">Total Price</span>
                            <span className="text-xl font-bold text-amber-600">{formatPrice(totalPrice)}</span>
                        </div>
                        <p className="text-xs text-gray-400 text-right">Includes {customization.size} size {LIGHTING_OPTIONS.find(l => l.value === customization.lighting)?.addon! > 0 ? `+ ${LIGHTING_OPTIONS.find(l => l.value === customization.lighting)?.label}` : ''}</p>
                    </div>

                    <button
                        onClick={handleProceedToCheckout}
                        disabled={!canProceed}
                        className={cn(
                            "w-full h-14 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2",
                            "bg-gradient-to-r from-amber-500 to-orange-600 text-white",
                            "hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5",
                            canProceed ? "opacity-100" : "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <span>Proceed to Checkout</span>
                        <Sparkles size={20} />
                    </button>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                customizationData={customization}
                totalPrice={totalPrice}
                productName={product.name}
                productSkuId={product.skus?.[0]?.id || 0}
                quantity={quantity}
            />
        </>
    );
}
