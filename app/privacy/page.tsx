// Privacy Policy Page
import React from 'react';
import Card from '@/components/ui/Card';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--color-cream)] py-12">
            <div className="container max-w-4xl">
                <h1 className="text-4xl font-bold text-[var(--color-text)] mb-8">Privacy Policy</h1>
                <Card padding="lg">
                    <div className="prose max-w-none text-[var(--color-text-secondary)] space-y-6">
                        <p>Last updated: February 2024</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Information We Collect</h2>
                        <p>We collect information you provide directly to us, including name, email, phone, shipping address, and payment information. We also collect photos you upload for lithophane creation.</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Process and fulfill your orders</li>
                            <li>Communicate with you about orders and products</li>
                            <li>Improve our products and services</li>
                            <li>Send marketing communications (with your consent)</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Data Security</h2>
                        <p>We use industry-standard encryption and security measures to protect your personal information. Your payment information is processed through secure payment gateways and never stored on our servers.</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Your Photos</h2>
                        <p>Photos you upload are used solely for creating your lithophane product. We do not share, sell, or use your photos for any other purpose without your explicit consent.</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Contact Us</h2>
                        <p>For privacy concerns, contact us at hello@lithophane.studio</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
