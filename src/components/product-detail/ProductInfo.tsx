'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShareAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function ProductInfo() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-heading)] leading-tight mb-2">
                        Personalized Lithophane Lamp
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <FontAwesomeIcon key={s} icon={faStar} />
                            ))}
                        </div>
                        <span className="font-medium text-gray-600 underline cursor-pointer hover:text-amber-600">
                            (234 Reviews)
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                        <FontAwesomeIcon icon={faShareAlt} />
                    </button>
                </div>
            </div>

            {/* Price Block */}
            <div className="flex items-end gap-3 flex-wrap">
                <h2 className="text-4xl font-bold text-gray-900">₹1,299</h2>
                <span className="text-lg text-gray-400 line-through mb-1">₹2,499</span>
                <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded inline-block mb-2">
                    50% OFF
                </span>
            </div>

            {/* Emotional Description */}
            <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100">
                <p className="text-gray-700 italic leading-relaxed">
                    "Turn your favorite memory into a glowing masterpiece. Perfect for anniversaries, birthdays, or just to say 'I love you'."
                </p>
            </div>
        </div>
    );
}
