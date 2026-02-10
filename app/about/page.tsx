// About Us Page
import React from 'react';
import Card from '@/components/ui/Card';

export default function AboutPage() {
    const values = [
        {
            icon: '💎',
            title: 'Handcrafted Quality',
            description: 'Every lithophane is carefully 3D-printed and inspected to ensure perfection.',
        },
        {
            icon: '❤️',
            title: 'Customer Care',
            description: 'Your satisfaction is our priority. We\'re here to help at every step.',
        },
        {
            icon: '⚡',
            title: 'Fast Delivery',
            description: 'We print and ship quickly so you can enjoy your memories sooner.',
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-cream)]">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[var(--color-amber-light)] via-[var(--color-amber)] to-[var(--color-amber-dark)] text-white py-20">
                <div className="container max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Our Story
                    </h1>
                    <p className="text-xl opacity-90">
                        Illuminating memories, one lithophane at a time
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="container max-w-4xl">
                    <Card padding="lg">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-[var(--color-text)] leading-relaxed mb-6">
                                Welcome to <strong>Lithophane Studio</strong> – where your cherished memories come to life through light.
                            </p>

                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                It all started with a simple idea: what if we could transform everyday photos into something truly magical?
                                As a small team of artists, engineers, and 3D printing enthusiasts, we discovered the beauty of lithophanes
                                – intricate 3D-printed panels that reveal hidden images when backlit.
                            </p>

                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                We were captivated by how a flat piece of material could hold such depth and emotion. Seeing a wedding photo
                                glow softly on a lamp, or a family portrait etched perfectly on a keychain – these moments inspired us to
                                share this art form with the world.
                            </p>

                            <h2 className="text-2xl font-bold text-[var(--color-text)] mt-10 mb-4">Our Mission</h2>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                Our mission is simple: to help you preserve and celebrate life's most precious moments in a unique and
                                meaningful way. Whether it's a gift for a loved one or a personal keepsake, every lithophane we create
                                is crafted with care, precision, and heart.
                            </p>

                            <h2 className="text-2xl font-bold text-[var(--color-text)] mt-10 mb-4">Why Choose Us?</h2>
                            <ul className="text-[var(--color-text-secondary)] space-y-2 mb-8">
                                <li>✓ <strong>100% Handcrafted:</strong> Each lithophane is individually printed and quality-checked</li>
                                <li>✓ <strong>Fast Turnaround:</strong> Most orders ship within 3-5 business days</li>
                                <li>✓ <strong>Customer First:</strong> We're here to help you create the perfect gift</li>
                                <li>✓ <strong>Eco-Friendly Materials:</strong> We use sustainable, high-quality PLA filament</li>
                            </ul>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="container max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-[var(--color-text-secondary)]">
                            What drives us to create the best lithophanes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="text-center" hoverable>
                                <div className="text-6xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-[var(--color-text-secondary)]">
                                    {value.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
                <div className="container max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">
                        Join Our Community
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                        Over 5,000 customers have transformed their memories with us.
                        Ready to create your own?
                    </p>
                    <a
                        href="/customize"
                        className="btn btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
                    >
                        Start Creating
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    );
}
