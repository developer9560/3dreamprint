'use client';

import React from 'react';
import ScrollImageSequence from '@/src/components/scroll/ScrollImageSequence';
import Button from '@/src/components/ui/Button';
import Link from 'next/link';
import TestimonialSlider from '@/src/components/home/TestimonialSlider';

export default function Home() {
  return (
    <div className="relative">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/bgvideo.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* Scroll-based Image Sequence Background */}
      {/* <ScrollImageSequence /> */}

      {/* Scrolling Content Overlay */}
      <div className="relative z-10">
        {/* Hero Section - First Screen */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{
                color: '#FFF',
                textShadow: `
                  0 0 10px rgba(255, 193, 7, 1),y
                  0 0 20px rgba(255, 193, 7, 0.8),
                  0 0 30px rgba(255, 193, 7, 0.6),
                  0 0 40px rgba(255, 193, 7, 0.5),
                  0 0 50px rgba(255, 193, 7, 0.4),
                  0 0 75px rgba(255, 193, 7, 0.3),
                  0 0 100px rgba(255, 193, 7, 0.2),
                  0 2px 15px rgba(0, 0, 0, 0.9),
                  0 4px 25px rgba(0, 0, 0, 0.7)
                `
              }}
            >
              Transform Memories<br />Into Light
            </h1>
            <p
              className="text-lg md:text-xl text-white font-semibold mb-8 max-w-2xl mx-auto"
              style={{
                color: '#F5F7FA', // slightly off-white (secondary)
                textShadow: `
    0 0 4px rgba(255, 255, 255, 0.6),
    0 0 8px rgba(220, 235, 245, 0.5),
    0 0 14px rgba(180, 220, 255, 0.4),
    0 0 20px rgba(120, 190, 255, 0.3),
    0 1px 8px rgba(0, 0, 0, 0.8),
    0 2px 14px rgba(0, 0, 0, 0.6)
  `
              }}
            >
              Custom 3D-printed lithophanes that bring your photos to life
            </p>
            <Link href="/users/customize">
              <Button
                variant="primary"
                size="lg"
                className="!bg-gradient-to-r !from-[#FFC107] !via-[#FFB300] !to-[#FF8F00] !text-black !font-extrabold !text-md !tracking-wider !uppercase !px-8 !py-3 !rounded-full !shadow-[0_0_20px_rgba(255,193,7,0.4)] hover:!shadow-[0_0_40px_rgba(255,193,7,0.7)] hover:!scale-105 hover:!from-[#FFCA28] hover:!to-[#FFA000] transition-all duration-300 border-2 border-[#FFE082]/30 backdrop-blur-sm group"
              >
                ✨ Create Your Lithophane
              </Button>
            </Link>
          </div>
        </section>

        {/* Valentine's Day Special Banner */}
        <section className="min-h-screen flex items-center justify-center px-2">
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-pink-900/60 via-red-900/60 to-rose-900/60 p-4 md:p-16 rounded-3xl border-2 border-pink-300/30 shadow-2xl relative overflow-hidden">
              {/* Decorative hearts */}
              <div className="absolute top-4 right-4 text-6xl opacity-20">💕</div>
              <div className="absolute bottom-4 left-4 text-6xl opacity-20">❤️</div>

              <div className="text-center relative z-10">
                <div className="inline-block mb-4">
                  <div
                    className="text-pink-200 text-md md:text-lg font-bold uppercase tracking-widest px-2 py-2 bg-pink-500/30 rounded-md border border-pink-300/50"
                    style={{
                      color: '#F5F7FA', // slightly off-white (secondary)
                      textShadow: `
    0 0 4px rgba(255, 255, 255, 0.6),
    0 0 8px rgba(220, 235, 245, 0.5),
    0 0 14px rgba(180, 220, 255, 0.4),
    0 0 20px rgba(120, 190, 255, 0.3),
    0 1px 8px rgba(0, 0, 0, 0.8),
    0 2px 14px rgba(0, 0, 0, 0.6)
  `
                    }}
                  >
                    ✨ Offer valid until February 14th, 2026 • Limited stock available ✨
                  </div>
                </div>

                <h2
                  className="text-3xl md:text-5xl font-bold text-white mb-6"
                  style={{
                    textShadow: '0 0 30px rgba(236,72,153,0.8), 0 0 60px rgba(236,72,153,0.5), 0 4px 20px rgba(0,0,0,0.9)'
                  }}
                >
                  Valentine's Day<br />Special 💝
                </h2>

                <p
                  className="text-xl md:text-2xl text-pink-100 font-semibold mb-8"
                  style={{
                    textShadow: '0 0 20px rgba(0,0,0,0.9), 0 2px 15px rgba(0,0,0,0.8)'
                  }}
                >
                  Capture Your Love Story in Light
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-pink-200/20">
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">💖</span>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                          20% OFF Couple Lithophanes
                        </h3>
                        <p className="text-pink-100 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                          Perfect for romantic moments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🎁</span>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                          Free Gift Wrapping
                        </h3>
                        <p className="text-pink-100 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                          Elegant packaging included
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🚀</span>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                          Express Delivery
                        </h3>
                        <p className="text-pink-100 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                          Before Feb 14th guaranteed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">💌</span>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                          Personalized Message
                        </h3>
                        <p className="text-pink-100 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                          Add your love note free
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/users/valentines">
                    <Button
                      variant="primary"
                      size="lg"
                      className="!bg-gradient-to-r !from-pink-500 !via-red-500 !to-rose-500 hover:!from-pink-600 hover:!via-red-600 hover:!to-rose-600 hover:scale-105 transition-all shadow-2xl !text-white !font-bold !px-10 !border-2 !border-pink-200/50"
                    >
                      💝 Shop Valentine's Collection
                    </Button>
                  </Link>
                  <Link href="/users/customize">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="!bg-white/20 !text-white !font-bold hover:!bg-white/30 !backdrop-blur-lg !px-10 !border-2 !border-white/40"
                    >
                      Create Custom Gift
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section 1 */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-black/60 p-12 rounded-card border border-white/20 shadow-2xl">
              <h2
                className="text-5xl md:text-6xl font-bold text-white mb-6"
                style={{
                  textShadow: '0 0 30px rgba(255,193,7,0.6), 0 4px 20px rgba(0,0,0,0.9)'
                }}
              >
                Precision Crafted
              </h2>
              <p
                className="text-xl text-white font-medium leading-relaxed mb-6"
                style={{
                  textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
                }}
              >
                Each lithophane is meticulously 3D-printed layer by layer, transforming your cherished photographs into stunning translucent art that reveals hidden depth when backlit.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div
                    className="text-4xl font-bold text-[var(--color-amber)] mb-2"
                    style={{ textShadow: '0 0 20px rgba(255,193,7,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    100%
                  </div>
                  <div
                    className="text-sm text-white font-semibold"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    Handcrafted
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold text-[var(--color-amber)] mb-2"
                    style={{ textShadow: '0 0 20px rgba(255,193,7,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    0.1mm
                  </div>
                  <div
                    className="text-sm text-white font-semibold"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    Layer Precision
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-4xl font-bold text-[var(--color-amber)] mb-2"
                    style={{ textShadow: '0 0 20px rgba(255,193,7,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    5-7
                  </div>
                  <div
                    className="text-sm text-white font-semibold"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    Days Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section 2 */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-black/60 p-12 rounded-card border border-white/20 text-right shadow-2xl">
              <h2
                className="text-5xl md:text-6xl font-bold text-white mb-6 text-center"
                style={{
                  textShadow: '0 0 30px rgba(255,193,7,0.6), 0 4px 20px rgba(0,0,0,0.9)'
                }}
              >
                Your Moment ,Illuminated
              </h2>
              <p
                className="text-xl text-white font-medium leading-relaxed"
                style={{
                  textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
                }}
              >
                From wedding photos to family portraits, from cherished pets to breathtaking landscapes—every lithophane tells a unique story. Watch as light breathes life into your memories, revealing intricate details and emotional depth.
              </p>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-5xl md:text-6xl font-bold text-white mb-12 text-center"
              style={{
                textShadow: '0 0 30px rgba(255,193,7,0.6), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              Choose Your Canvas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Lithophane Lamps', price: '₹1,299', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop' },
                { name: 'Photo Keychains', price: '₹399', image: 'https://images.unsplash.com/photo-1610056494071-0a5a4e1d1dfd?w=400&h=400&fit=crop' },
                { name: 'Photo Frames', price: '₹1,599', image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=400&fit=crop' },
              ].map((product, index) => (
                <div key={index} className="backdrop-blur-xl bg-black/50 p-6 rounded-card border border-white/30 hover:bg-black/60 hover:border-[var(--color-amber)]/50 transition-all group shadow-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-soft mb-4 group-hover:scale-105 transition-transform"
                  />
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-3xl font-bold text-[var(--color-amber)] mb-4"
                    style={{ textShadow: '0 0 20px rgba(255,193,7,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    {product.price}
                  </p>
                  <Link href="/users/shop">
                    <Button variant="secondary" fullWidth className="!bg-white/20 !text-white !font-bold hover:!bg-white/30 !border !border-white/30">
                      Explore
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-5xl md:text-6xl font-bold text-white mb-16 text-center"
              style={{
                textShadow: '0 0 30px rgba(255,193,7,0.6), 0 4px 20px rgba(0,0,0,0.9)'
              }}
            >
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Upload Photo', desc: 'Choose your favorite memory' },
                { step: '02', title: 'Customize', desc: 'Select size, shape & lighting' },
                { step: '03', title: 'We Print', desc: '3D-printed with precision' },
                { step: '04', title: 'Delivered', desc: 'Arrives at your doorstep' },
              ].map((item, index) => (
                <div key={index} className="text-center backdrop-blur-xl bg-black/50 p-8 rounded-card border border-white/20 shadow-xl">
                  <div
                    className="text-6xl font-bold text-[var(--color-amber)] mb-4"
                    style={{ textShadow: '0 0 25px rgba(255,193,7,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-white font-medium"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <div id="testimonials">
          <TestimonialSlider />
        </div>

        {/* Final CTA */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
              style={{
                textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7), 0 4px 25px rgba(0,0,0,0.8)'
              }}
            >
              Ready to Create<br />Your Masterpiece?
            </h2>
            <p
              className="text-2xl text-white font-semibold mb-12"
              style={{
                textShadow: '0 0 20px rgba(0,0,0,0.9), 0 2px 15px rgba(0,0,0,0.8)'
              }}
            >
              Transform your favorite photo into a stunning lithophane today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/users/customize">
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-gradient-to-r !from-[var(--color-amber)] !via-[var(--color-amber)] !to-[var(--color-amber-dark)] hover:scale-105 transition-transform shadow-2xl !px-12 !text-black !font-bold"
                >
                  Start Creating
                </Button>
              </Link>
              <Link href="/users/shop">
                <Button
                  variant="secondary"
                  size="lg"
                  className="!bg-white/20 !text-white !font-bold hover:!bg-white/30 !backdrop-blur-lg !px-12 !border-2 !border-white/40"
                >
                  Browse Gallery
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Add extra spacing at bottom for full scroll range */}
        <div className="h-screen"></div>
      </div>
    </div>
  );
}
