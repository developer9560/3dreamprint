// Terms & Conditions Page
import React from 'react';
import Card from '@/src/components/ui/Card';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-white)] py-12">
            <div className="container max-w-4xl">
                <h1 className="text-4xl font-bold text-[var(--color-text)] mb-8">Terms & Conditions</h1>
                <Card padding="lg">
                    <div className="prose max-w-none text-[var(--color-text-secondary)] space-y-6">
                        <p>Last updated: February 2024</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Acceptance of Terms</h2>
                        <p>By accessing and using Lithophane Studio, you accept and agree to be bound by these Terms and Conditions.</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Product Descriptions</h2>
                        <p>We strive to provide accurate product descriptions and images. However, slight variations may occur due to the custom nature of 3D printing and photo quality.</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Pricing</h2>
                        <p>All prices are in Indian Rupees (INR). We reserve the right to change prices at any time. Orders are charged at the price displayed at the time of purchase.</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Intellectual Property</h2>
                        <p>You retain all rights to photos you upload. We only use them to create your ordered products. All website content and designs are property of Lithophane Studio.</p>

                        <h2 className="text-2xl font-bold text-[var(--color-text)]">Limitation of Liability</h2>
                        <p>We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
