// Refund & Return Policy Page
import React from 'react';
import Card from '@/components/ui/Card';

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-[var(--color-cream)] py-12">
            <div className="container max-w-4xl">
                <h1 className="text-4xl font-bold text-[var(--color-text)] mb-8">Refund & Return Policy</h1>

                <Card padding="lg">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                            Last updated: February 2024
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)] mt-6 mb-4">Custom Products</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            Since each lithophane is custom-made with your personal photo, we cannot accept returns or exchanges
                            on personalized items unless they are damaged, defective, or significantly different from what was ordered.
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)] mt-8 mb-4">Damaged or Defective Items</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            If you receive a damaged or defective lithophane, please contact us within <strong>48 hours</strong> of delivery with:
                        </p>
                        <ul className="list-disc pl-6 text-[var(--color-text-secondary)] space-y-2 mb-6">
                            <li>Your order number</li>
                            <li>Clear photos of the damaged item</li>
                            <li>A brief description of the issue</li>
                        </ul>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            We will review your case and provide a free replacement at no additional cost.
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)] mt-8 mb-4">Quality Guarantee</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            If you're not satisfied with the print quality of your lithophane, please contact us within <strong>7 days</strong> of receiving your order.
                            We'll review your concern and work with you to find a solution, which may include a reprint.
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)] mt-8 mb-4">Refund Process</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            Approved refunds will be processed within 7-10 business days and returned to your original payment method.
                        </p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)] mt-8 mb-4">Non-Refundable Cases</h2>
                        <ul className="list-disc pl-6 text-[var(--color-text-secondary)] space-y-2 mb-6">
                            <li>Changes of mind after order placement</li>
                            <li>Incorrect photo uploaded by customer</li>
                            <li>Items damaged due to mishandling after delivery</li>
                            <li>Delayed delivery claims without evidence</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[var(--color-text)] mt-8 mb-4">Contact Us</h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            For any questions about returns or refunds, please contact us at:
                        </p>
                        <div className="bg-[var(--color-amber-light)]/30 p-4 rounded-card mb-6">
                            <p className="text-[var(--color-text)]">Email: <a href="mailto:hello@lithophane.studio" className="text-[var(--color-amber)] hover:underline">hello@lithophane.studio</a></p>
                            <p className="text-[var(--color-text)]">Phone: <span className="text-[var(--color-amber)]">+91 98765 43210</span></p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
