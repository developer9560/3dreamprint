"use client"
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ProductCard from '@/src/components/products/ProductCard';
import Button from '@/src/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes, faChevronDown, faSortAmountDown, faLightbulb, faKey, faImage, faGift, faSearch, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { productsAPI, categoryAPI } from '@/src/lib/api';
import { Product, ProductFilters } from '@/src/types/product';
import { userCategory } from '@/src/types/category';
import { toast } from 'react-hot-toast';

const CATEGORY_ICONS: Record<string, any> = {
    'Lamps': faLightbulb,
    'Keychains': faKey,
    'Frames': faImage,
    'Gift Sets': faGift,
    'default': faLayerGroup
};

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<userCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter State
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedShape, setSelectedShape] = useState('All Shapes');
    const [selectedPrice, setSelectedPrice] = useState('All Prices');
    const [sortBy, setSortBy] = useState('Featured');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await categoryAPI.getCategories();
                setCategories(response);
            }
            catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, [])

    // Fetch Products
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const filters: ProductFilters = {
                page: currentPage,
                limit: 12,
                sortBy: sortBy.toLowerCase().includes('price')
                    ? (sortBy.includes('Low') ? 'price_asc' : 'price_desc')
                    : (sortBy.includes('New') ? 'newest' : 'popularity') as any
            };

            if (selectedCategory !== 'All') {
                const cat = categories.find(c => c.name === selectedCategory);
                if (cat) filters.categoryId = String(cat.id);
            }

            if (selectedShape !== 'All Shapes') {
                filters.shapes = [selectedShape];
            }

            // Price filtering logic (simplified for now as backend might need min/max)
            if (selectedPrice !== 'All Prices') {
                if (selectedPrice.includes('Under')) filters.maxPrice = 500;
                else if (selectedPrice.includes('Above')) filters.minPrice = 2000;
                else {
                    const parts = selectedPrice.split('-').map(p => parseInt(p.replace(/[^0-9]/g, '')));
                    filters.minPrice = parts[0];
                    filters.maxPrice = parts[1];
                }
            }

            const response = await productsAPI.getAll(filters);
            setProducts(response.content || []);
            setTotalPages(response.totalPages || 1);
            setTotalItems(response.totalElements || 0);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, selectedCategory, selectedShape, selectedPrice, sortBy, categories]);


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const shapes = ['All Shapes', 'Round', 'Square', 'Heart', 'Hexagon'];
    const priceRanges = ['All Prices', 'Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'];

    const FilterSidebar = () => (
        <div className="space-y-8">
            {/* Category Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <FontAwesomeIcon icon={faFilter} className="text-amber-500" />
                    Categories
                </h4>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${selectedCategory === 'All' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                        <span className="flex items-center gap-3 font-medium">
                            <FontAwesomeIcon icon={faFilter} className={selectedCategory === 'All' ? 'text-white' : 'text-gray-400 group-hover:text-amber-500'} />
                            All Collections
                        </span>
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${selectedCategory === cat.name ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                        >
                            <span className="flex items-center gap-3 font-medium text-left">
                                <FontAwesomeIcon
                                    icon={CATEGORY_ICONS[cat.name] || CATEGORY_ICONS.default}
                                    className={selectedCategory === cat.name ? 'text-white' : 'text-gray-400 group-hover:text-amber-500'}
                                />
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Shape Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                    By Shape
                </h4>
                <div className="flex flex-wrap gap-2">
                    {shapes.map((shape) => (
                        <button
                            key={shape}
                            onClick={() => setSelectedShape(shape)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedShape === shape ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {shape}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                    Price Range
                </h4>
                <div className="space-y-2">
                    {priceRanges.map((range) => (
                        <label key={range} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPrice === range ? 'border-amber-500' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                {selectedPrice === range && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                            </div>
                            <span className={`text-sm transition-colors ${selectedPrice === range ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
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
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero Header */}
            <div className="relative pt-20 pb-16 bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight">
                        Turn Memories <br />
                        Into Glowing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">3D Art</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Discover our collection of handcrafted lithophanes. Each piece reveals hidden depth and emotion when illuminated.
                    </p>
                </div>s
            </div>

            <div className="container mx-auto px-4 md:px-8 py-12">
                {/* Mobile Filter Toggle & Sort */}
                <div className="lg:hidden flex flex-col sm:flex-row gap-4 mb-8 sticky top-24 z-30">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-xl text-gray-900 font-bold active:scale-95 transition-all"
                    >
                        <FontAwesomeIcon icon={faFilter} className="text-amber-500" />
                        Filters
                    </button>
                    <div className="flex-1 relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full appearance-none px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-xl text-gray-900 font-bold focus:outline-none focus:border-amber-500"
                        >
                            <option>Sort: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest Arrivals</option>
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-28 bg-white/50 backdrop-blur-sm p-1 rounded-3xl">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {isFilterOpen && (
                        <div className="fixed inset-0 z-[100] lg:hidden">
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn" onClick={() => setIsFilterOpen(false)} />
                            <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl p-6 overflow-y-auto animate-slideRight">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 font-[family-name:var(--font-heading)] uppercase tracking-tighter">Filters</h3>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all"
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
                                        className="!shadow-xl !font-black !rounded-2xl !bg-amber-500"
                                    >
                                        Apply Filters
                                    </Button>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('All');
                                            setSelectedShape('All Shapes');
                                            setSelectedPrice('All Prices');
                                        }}
                                        className="w-full mt-4 py-3 text-xs font-black text-gray-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Count */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                                    Collection
                                </h2>
                                {!isLoading && (
                                    <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                        {totalItems} items
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Product Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="aspect-[4/6] bg-gray-100 rounded-3xl animate-pulse" />
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {products.map((product, index) => (
                                    <div key={product.id} className="animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                                        <ProductCard product={product} priority={index < 3} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FontAwesomeIcon icon={faSearch} className="text-gray-200 text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {!isLoading && totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-20">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:bg-amber-500 hover:text-white hover:border-amber-500 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-all shadow-sm"
                                >
                                    &lt;
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all font-bold text-sm ${currentPage === i + 1 ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-white border-gray-100 text-gray-500 hover:border-amber-500'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:bg-amber-500 hover:text-white hover:border-amber-500 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-400 transition-all shadow-sm"
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
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
