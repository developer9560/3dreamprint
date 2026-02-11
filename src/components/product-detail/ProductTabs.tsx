'use client';

import React from 'react';

export default function ProductTabs() {
    return (
        <div className="py-8">
            <div className="flex border-b">
                <button className="px-6 py-3 border-b-2 border-amber-500 font-bold text-amber-600">Description</button>
                <button className="px-6 py-3 text-gray-500">Specifications</button>
            </div>
            <div className="py-6 text-gray-600">
                Detailed product description content...
            </div>
        </div>
    );
}
