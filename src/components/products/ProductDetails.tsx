'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductDetailsProps {
    productDetails?: Array<{ key: string; value: string; }>;
    features?: string[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
    productDetails = [],
    features = [],
}) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Product Details Section */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Product Details</h3>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-50">
                        {productDetails.map((detail, idx) => (
                            <div key={idx} className="flex items-start p-4 hover:bg-gray-50/50 transition-colors">
                                <span className="w-1/3 text-xs font-bold text-gray-600 uppercase tracking-tight">{detail.key}</span>
                                <span className="flex-1 text-sm font-bold text-gray-400">{detail.value}</span>
                            </div>
                        ))}
                    </div>

                    {productDetails.length === 0 && (
                        <div className="p-8 text-center bg-gray-50/30">
                            <p className="text-sm text-gray-400 italic font-medium">No specific details available for this product.</p>
                        </div>
                    )}

                    {features.length > 0 && (
                        <div className="p-4 bg-emerald-50/30 border-t border-emerald-50">
                            <h4 className="text-xs font-black text-emerald-600 mb-3 uppercase tracking-widest">Key Features</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Important Note / Disclaimer */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="text-sm font-bold text-blue-900 mb-1">Important Note</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                    We endeavor to ensure the accuracy of the information provided. However, actual product packaging and materials may contain more and/or different information. We recommend not to rely solely on the information presented here.
                </p>
            </div>

        </div>
    );
};
