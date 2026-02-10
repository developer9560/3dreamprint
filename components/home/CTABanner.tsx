// CTA Banner Section
import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

export default function CTABanner() {
    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="relative bg-gradient-to-br from-[var(--color-amber)] via-[var(--color-amber-dark)] to-[var(--color-amber)] rounded-large overflow-hidden shadow-elevated">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative py-16 px-8 md:py-24 md:px-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to Create Your Own?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Turn your favorite photo into a stunning lithophane in just minutes.
                            Our easy customization tool guides you every step of the way.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/customize">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="!bg-white !text-[var(--color-text)] hover:!bg-gray-100"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Start Customizing Now
                                </Button>
                            </Link>
                            <Link href="/shop">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="!border-white !text-white hover:!bg-white/10"
                                >
                                    Browse All Products
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
                            <div>
                                <p className="text-3xl md:text-4xl font-bold text-white mb-2">5000+</p>
                                <p className="text-white/80 text-sm md:text-base">Happy Customers</p>
                            </div>
                            <div>
                                <p className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</p>
                                <p className="text-white/80 text-sm md:text-base">Average Rating</p>
                            </div>
                            <div>
                                <p className="text-3xl md:text-4xl font-bold text-white mb-2">3-5 Days</p>
                                <p className="text-white/80 text-sm md:text-base">Fast Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
