'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes, faChevronDown, faSortAmountDown, faLightbulb, faKey, faImage, faGift, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function ShopPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedShape, setSelectedShape] = useState('All Shapes');
    const [selectedPrice, setSelectedPrice] = useState('All Prices');
    const [sortBy, setSortBy] = useState('Featured');
    const [isScrolled, setIsScrolled] = useState(false);

    // Sticky header effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mock products data with extended details
    const allProducts = [
        {
            id: 1,
            name: 'Personalized Photo Lamp - Round',
            price: 1299,
            mrp: 1999,
            image: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop'],
            category: 'Lamps',
            rating: 4.9,
            reviewCount: 234,
            slug: 'personalized-photo-lamp-round',
            isBestseller: true,
        },
        {
            id: 2,
            name: 'Heart-Shaped Lithophane Keychain',
            price: 399,
            mrp: 699,
            image: ['https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=500&h=500&fit=crop'],
            category: 'Keychains',
            rating: 5.0,
            reviewCount: 189,
            slug: 'heart-shaped-lithophane-keychain',
            isNew: true,
        },
        {
            id: 3,
            name: 'Square Lithophane Photo Frame',
            price: 1599,
            mrp: 2499,
            image: ['https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=500&fit=crop'],
            category: 'Frames',
            rating: 4.8,
            reviewCount: 145,
            slug: 'square-lithophane-photo-frame',
            isBestseller: true,
        },
        {
            id: 4,
            name: 'Couple\'s Lithophane Gift Set',
            price: 2499,
            mrp: 3499,
            image: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop'],
            category: 'Gift Sets',
            rating: 4.9,
            reviewCount: 98,
            slug: 'couples-lithophane-gift-set',
            isNew: true,
        },
        {
            id: 5,
            name: 'Hexagon Lithophane Lamp',
            price: 1499,
            mrp: 2199,
            image: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop'],
            category: 'Lamps',
            rating: 4.7,
            reviewCount: 176,
            slug: 'hexagon-lithophane-lamp',
        },
        {
            id: 6,
            name: 'Rectangular Lithophane Keychain',
            price: 349,
            mrp: 599,
            image: ['https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=500&h=500&fit=crop'],
            category: 'Keychains',
            rating: 4.8,
            reviewCount: 203,
            slug: 'rectangular-lithophane-keychain',
        },
        {
            id: 7,
            name: 'Circle Lithophane Frame with Stand',
            price: 1799,
            mrp: 2599,
            image: ['https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=500&fit=crop'],
            category: 'Frames',
            rating: 4.9,
            reviewCount: 128,
            slug: 'circle-lithophane-frame-stand',
            isBestseller: true,
        },
        {
            id: 8,
            name: 'Family Photo Lamp Collection',
            price: 3499,
            mrp: 4999,
            image: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop'],
            category: 'Gift Sets',
            rating: 5.0,
            reviewCount: 87,
            slug: 'family-photo-lamp-collection',
            isNew: true,
        },
    ];

    const categories = [
        { name: 'All', icon: faFilter },
        { name: 'Lamps', icon: faLightbulb },
        { name: 'Keychains', icon: faKey },
        { name: 'Frames', icon: faImage },
        { name: 'Gift Sets', icon: faGift },
    ];

    const shapes = ['All Shapes', 'Round', 'Square', 'Heart', 'Hexagon'];
    const priceRanges = ['All Prices', 'Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'];

    const FilterSidebar = () => (
        <div className="space-y-8">
            {/* Category Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-bold text-[var(--color-text)] mb-4 uppercase tracking-wider flex items-center gap-2">
                    <FontAwesomeIcon icon={faFilter} className="text-[var(--color-amber)]" />
                    Category
                </h4>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${selectedCategory === cat.name ? 'bg-[var(--color-amber)] text-white shadow-lg shadow-[var(--color-amber)]/30' : 'bg-gray-50 text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-[var(--color-text)]'}`}
                        >
                            <span className="flex items-center gap-3 font-medium">
                                <FontAwesomeIcon icon={cat.icon} className={selectedCategory === cat.name ? 'text-white' : 'text-gray-400 group-hover:text-[var(--color-amber)]'} />
                                {cat.name}
                            </span>
                            {selectedCategory === cat.name && (
                                <FontAwesomeIcon icon={faChevronDown} className="text-sm transform -rotate-90" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Shape Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-bold text-[var(--color-text)] mb-4 uppercase tracking-wider">
                    Shape
                </h4>
                <div className="flex flex-wrap gap-2">
                    {shapes.map((shape) => (
                        <button
                            key={shape}
                            onClick={() => setSelectedShape(shape)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedShape === shape ? 'bg-[var(--color-amber)] text-white shadow-md' : 'bg-gray-100 text-[var(--color-text-secondary)] hover:bg-gray-200'}`}
                        >
                            {shape}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-bold text-[var(--color-text)] mb-4 uppercase tracking-wider">
                    Price Range
                </h4>
                <div className="space-y-2">
                    {priceRanges.map((range) => (
                        <label key={range} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPrice === range ? 'border-[var(--color-amber)]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                {selectedPrice === range && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber)]" />}
                            </div>
                            <span className={`text-sm transition-colors ${selectedPrice === range ? 'text-[var(--color-text)] font-semibold' : 'text-[var(--color-text-secondary)]'}`}>
                                {range}
                            </span>
                            <input
                                type="radio"
                                name="price"
                                checked={selectedPrice === range}
                                onChange={() => setSelectedPrice(range)}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--color-gray-light)]">
            {/* Hero Header */}
            <div className="  relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-8 flex align-center justify-center relative z-10 bg-[var(--color-gray-light)]">
                    {/* <nav className="text-sm font-medium text-[var(--color-text-secondary)] mb-6 flex items-center gap-2">
                        <Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-[var(--color-text)]">Shop</span>
                    </nav> */}
                    <div className="">
                        <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text)] mb-6 font-[family-name:var(--font-heading)] leading-tight">
                            Shop Custom
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-dark)] ml-2">
                                Lithophanes
                            </span>
                        </h1>
                        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl font-medium leading-relaxed">
                            Turn your memories into glowing 3D art. Each piece is meticulously crafted to reveal your photo's hidden depth and emotion.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-12">
                {/* Mobile Filter Toggle & Sort */}
                <div className="lg:hidden flex flex-col sm:flex-row gap-4 mb-8 sticky top-24 z-30">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg text-[var(--color-text)] font-bold active:scale-95 transition-all"
                    >
                        <FontAwesomeIcon icon={faFilter} className="text-[var(--color-amber)]" />
                        Filters
                    </button>
                    <div className="flex-1 relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full appearance-none px-6 py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg text-[var(--color-text)] font-bold focus:outline-none focus:border-[var(--color-amber)]"
                        >
                            <option>Sort: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest Arrivals</option>
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--color-text)] pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-28">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {isFilterOpen && (
                        <div className="fixed inset-0 z-[100] lg:hidden">
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fadeIn" onClick={() => setIsFilterOpen(false)} />
                            <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl p-6 overflow-y-auto animate-slideRight">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">Filters</h3>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100/80 text-gray-500 hover:bg-gray-200 hover:text-black transition-all"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                                <FilterSidebar />
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <Button
                                        fullWidth
                                        onClick={() => setIsFilterOpen(false)}
                                        variant="primary"
                                        className="!shadow-xl !font-bold"
                                    >
                                        Show Results
                                    </Button>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('All');
                                            setSelectedShape('All Shapes');
                                            setSelectedPrice('All Prices');
                                        }}
                                        className="w-full mt-4 py-3 text-sm font-bold text-gray-400 hover:text-[var(--color-text)] transition-colors"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        {/* <div className={`hidden lg:flex justify-between items-center mb-10 transition-all duration-300 ${isScrolled ? 'sticky top-24 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg z-20 border border-white/50' : ''}`}>
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-[var(--color-text)]">
                                    Top Picks
                                </h2>
                                <span className="bg-gray-100 text-[var(--color-text-secondary)] text-sm font-bold px-3 py-1 rounded-full">
                                    {allProducts.length} items
                                </span>
                            </div> */}

                        {/* <div className="flex items-center gap-4">
                                <span className="text-[var(--color-text-secondary)] text-sm font-medium">Sort by:</span>
                                <div className="relative group">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none pl-5 pr-12 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-[var(--color-text)] focus:outline-none focus:border-[var(--color-amber)] cursor-pointer hover:shadow-md transition-all"
                                    >
                                        <option>Featured</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest Arrivals</option>
                                    </select>
                                    <FontAwesomeIcon icon={faChevronDown} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none group-hover:text-[var(--color-amber)] transition-colors" />
                                </div>
                            </div> */}
                        {/* </div> */}

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                            {allProducts.map((product, index) => (
                                <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-3 mt-20">
                            {/* Previous */}
                            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:bg-[var(--color-amber)] hover:text-white hover:border-[var(--color-amber)] transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                                &lt;
                            </button>
                            {/* Numbers */}
                            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-amber)] text-white font-bold shadow-lg shadow-[var(--color-amber)]/30 transform scale-110">
                                1
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 text-[var(--color-text)] font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                2
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 text-[var(--color-text)] font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                3
                            </button>
                            {/* Next */}
                            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:bg-[var(--color-amber)] hover:text-white hover:border-[var(--color-amber)] transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes slideRight {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeIn {
                     from { opacity: 0; transform: translateY(10px); }
                     to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideRight {
                    animation: slideRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
