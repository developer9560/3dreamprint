// Cart Page
import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CartPage() {
    // Mock cart items
    const cartItems = [
        {
            id: 1,
            name: 'Personalized Photo Lamp - Round',
            price: 1299,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=150&h=150&fit=crop',
            customization: {
                shape: 'Round',
                size: 'Medium',
                lighting: 'Warm White',
            },
        },
        {
            id: 2,
            name: 'Heart-Shaped Lithophane Keychain',
            price: 399,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=150&h=150&fit=crop',
            customization: {
                shape: 'Heart',
                size: 'Standard',
            },
        },
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 1000 ? 0 : 99;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[var(--color-cream)] py-12">
            <div className="container max-w-6xl">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id} padding="md">
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-soft flex-shrink-0"
                                    />

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                                            {item.name}
                                        </h3>
                                        <div className="text-sm text-[var(--color-text-secondary)] space-y-1 mb-4">
                                            {Object.entries(item.customization).map(([key, value]) => (
                                                <p key={key}>
                                                    <span className="capitalize">{key}:</span> {value}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Control */}
                                            <div className="flex items-center gap-3">
                                                <button className="w-8 h-8 rounded-soft border-2 border-[var(--color-gray-border)] hover:border-[var(--color-amber)] transition-colors flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="font-semibold text-[var(--color-text)] w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button className="w-8 h-8 rounded-soft border-2 border-[var(--color-gray-border)] hover:border-[var(--color-amber)] transition-colors flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Price & Remove */}
                                            <div className="flex items-center gap-6">
                                                <span className="text-xl font-bold text-[var(--color-amber)]">
                                                    ₹{item.price.toLocaleString()}
                                                </span>
                                                <button className="text-[var(--color-error)] hover:underline text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {/* Continue Shopping */}
                        <Link href="/shop">
                            <Button variant="outline" className="!w-auto">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card padding="lg" className="sticky top-24">
                            <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-[var(--color-text-secondary)]">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-[var(--color-text)]">
                                        ₹{subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[var(--color-text-secondary)]">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-[var(--color-text)]">
                                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                    </span>
                                </div>
                                {subtotal < 1000 && (
                                    <p className="text-xs text-green-600 bg-green-50 p-2 rounded">
                                        Add ₹{1000 - subtotal} more for free shipping!
                                    </p>
                                )}
                                <hr className="border-[var(--color-gray-border)]" />
                                <div className="flex justify-between text-lg">
                                    <span className="font-bold text-[var(--color-text)]">Total</span>
                                    <span className="font-bold text-[var(--color-amber)]">
                                        ₹{total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button variant="primary" fullWidth size="lg" className="mb-3">
                                    Proceed to Checkout
                                </Button>
                            </Link>

                            <div className="text-center">
                                <button className="text-sm text-[var(--color-amber)] hover:underline">
                                    Apply Coupon Code
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-[var(--color-gray-border)] space-y-3 text-sm text-[var(--color-text-secondary)]">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure Checkout</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Easy Returns</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>5-7 Day Delivery</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
