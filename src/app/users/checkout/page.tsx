// Checkout Page
import React from 'react';
import Card from '@/src/components/ui/Card';
import Input from '@/src/components/ui/Input';
import Button from '@/src/components/ui/Button';

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-[var(--color-cream)] py-12">
            <div className="container max-w-6xl">
                <h1 className="text-4xl font-bold text-[var(--color-text)] mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Information */}
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Shipping Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input label="First Name" placeholder="John" required />
                                <Input label="Last Name" placeholder="Doe" required />
                                <Input label="Email" type="email" placeholder="john@example.com" required className="md:col-span-2" />
                                <Input label="Phone" type="tel" placeholder="+91 98765 43210" required className="md:col-span-2" />
                                <Input label="Address Line 1" placeholder="Street address" required className="md:col-span-2" />
                                <Input label="Address Line 2" placeholder="Apartment, suite, etc. (optional)" className="md:col-span-2" />
                                <Input label="City" placeholder="Mumbai" required />
                                <Input label="State" placeholder="Maharashtra" required />
                                <Input label="Postal Code" placeholder="400001" required />
                            </div>
                        </Card>

                        {/* Payment Method */}
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                {['UPI', 'Credit/Debit Card', 'Net Banking', 'PayPal'].map((method) => (
                                    <label key={method} className="flex items-center gap-3 p-4 border-2 border-[var(--color-gray-border)] rounded-card hover:border-[var(--color-amber)] cursor-pointer transition-all">
                                        <input type="radio" name="payment" className="w-5 h-5 text-[var(--color-amber)]" />
                                        <span className="font-medium text-[var(--color-text)]">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card padding="lg" className="sticky top-24">
                            <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-4">
                                    <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=80&h=80&fit=crop" alt="Product" className="w-20 h-20 rounded-soft object-cover" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-[var(--color-text)] text-sm mb-1">Personalized Photo Lamp</p>
                                        <p className="text-xs text-[var(--color-text-secondary)]">Round, Medium</p>
                                        <p className="text-sm font-bold text-[var(--color-amber)] mt-2">₹1,299</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                                        <span className="font-semibold">₹1,299</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-secondary)]">Shipping</span>
                                        <span className="font-semibold text-green-600">FREE</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-[var(--color-amber)]">₹1,299</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="primary" fullWidth size="lg">Place Order</Button>
                            <p className="text-xs text-center text-[var(--color-text-secondary)] mt-4">
                                By placing your order, you agree to our <a href="/terms" className="text-[var(--color-amber)] hover:underline">Terms & Conditions</a>
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
