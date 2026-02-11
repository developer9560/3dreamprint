'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faExpand } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface ProductGalleryProps {
    images?: string[];
}

export default function ProductGallery({ images = [] }: ProductGalleryProps) {
    // Mock images if none provided
    const displayImages = images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=800&fit=crop',
    ];

    const [mainImage, setMainImage] = useState(displayImages[0]);
    const [isLightOn, setIsLightOn] = useState(true);

    return (
        <div className="space-y-4">
            {/* Main Image View */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 group">
                <div className={`w-full h-full transition-all duration-700 ${isLightOn ? 'brightness-110 contrast-125 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'brightness-90 grayscale-[30%]'}`}>
                    <img
                        src={mainImage}
                        alt="Product View"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Light Toggle */}
                <button
                    onClick={() => setIsLightOn(!isLightOn)}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${isLightOn ? 'bg-amber-500 text-white shadow-amber-500/50' : 'bg-black/50 text-gray-300 hover:bg-black/70'}`}
                    title={isLightOn ? "Turn Light OFF" : "Turn Light ON"}
                >
                    <FontAwesomeIcon icon={faLightbulb} className={isLightOn ? "animate-pulse" : ""} />
                </button>

                {/* Glow Overlay when Light is ON */}
                {isLightOn && (
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-amber-500/10 to-transparent mix-blend-overlay" />
                )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto py-2">
                {displayImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img
                            ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105'
                            : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faLightbulb} className="text-amber-500" />
                Toggle light to see the lithophane effect
            </p>
        </div>
    );
}
