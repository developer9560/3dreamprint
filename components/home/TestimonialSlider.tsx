'use client';

import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        location: 'Mumbai, India',
        rating: 5,
        text: 'Absolutely beautiful! I ordered a lithophane lamp with my wedding photo and it exceeded all expectations. The detail is incredible and it looks stunning when lit up.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
        id: 2,
        name: 'Rajesh Patel',
        location: 'Delhi, India',
        rating: 5,
        text: 'Ordered custom lithophane keychains for my entire family. Everyone loved them! Great quality, fast shipping, and excellent customer service.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
        id: 3,
        name: 'Priya Sharma',
        location: 'Bangalore, India',
        rating: 5,
        text: 'Got this as a gift for my parents\' 25th anniversary. They were moved to tears when they saw their photo glowing in the lamp. Such a special and unique gift.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
    {
        id: 4,
        name: 'Amit Kumar',
        location: 'Pune, India',
        rating: 5,
        text: 'The lithophane frame is a work of art! The craftsmanship is top-notch and the customer service team helped me choose the perfect photo.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    },
    {
        id: 5,
        name: 'Sneha Gupta',
        location: 'Hyderabad, India',
        rating: 5,
        text: 'I ordered a memorial lithophane of my late dog. It captures his expression perfectly when the light hits it. A beautiful tribute.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    },
    {
        id: 6,
        name: 'Vikram Singh',
        location: 'Jaipur, India',
        rating: 5,
        text: 'Best birthday gift I ever gave my girlfriend. She was amazed by how the plain white plastic transforms into a photo. Highly recommended!',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    },
    {
        id: 7,
        name: 'Anjali Desai',
        location: 'Ahmedabad, India',
        rating: 5,
        text: 'The quality is unmatched. I\'ve seen other 3D prints, but this is so smooth and detailed. The night light is perfect for my kid\'s room.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    },
    {
        id: 8,
        name: 'Rohan Mehta',
        location: 'Chennai, India',
        rating: 4,
        text: 'Bought the car dashboard accessory. It looks super cool and unique. Delivery took a day longer than expected, but product is 10/10.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
        id: 9,
        name: 'Meera Reddy',
        location: 'Kolkata, India',
        rating: 5,
        text: 'Simply magical. The way it glows is mesmerizing. I\'m definitely ordering more for Diwali gifts this year.',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop',
    },
    {
        id: 10,
        name: 'Arjun Kapoor',
        location: 'Chandigarh, India',
        rating: 5,
        text: 'A unique standout gift for graduation. My brother put it on his desk immediately. The led base is high quality too.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    }
];

export default function TestimonialSlider() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let lastTime = 0;
        const speed = 0.5; // Pixels per frame

        const scroll = (time: number) => {
            if (isPaused) {
                lastTime = time;
                animationFrameId = requestAnimationFrame(scroll);
                return;
            }

            const deltaTime = time - lastTime;
            lastTime = time;

            // Smooth continuous scroll
            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2) {
                // Reset to start (seamless loop logic requires duplicating items, but for simple auto-scroll we can just scroll back or use css animation)
                // For a simple robust solution without duplicating DOM too much:
                // Let's just scroll back to 0 if we hit end, or use loop.
                // Actually, let's implement the "endless" feel by checking if close to end.
                // Ideally we duplicate the array.
            }

            // Simple auto-scroll for now
            scrollContainer.scrollLeft += speed;

            // Loop check
            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth) - 1) {
                scrollContainer.scrollLeft = 0;
            }

            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    // Better approach for seamless loop: Duplicate items
    const displayTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="min-h-screen flex items-center justify-center px-4 overflow-hidden py-20 relative">
            <div className="max-w-7xl mx-auto w-full">
                <h2
                    className="text-5xl md:text-6xl font-bold text-white mb-12 text-center"
                    style={{
                        textShadow: '0 0 30px rgba(255,193,7,0.6), 0 4px 20px rgba(0,0,0,0.9)'
                    }}
                >
                    Customer Stories
                </h2>

                <div
                    className="relative w-full"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {displayTestimonials.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="flex-shrink-0 w-[350px] md:w-[450px] snap-center"
                            >
                                <div className="h-full backdrop-blur-xl bg-black/60 p-8 rounded-2xl border border-white/20 shadow-xl hover:border-[var(--color-amber)]/50 transition-all duration-300 hover:transform hover:scale-[1.02] flex flex-col justify-between">
                                    <div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < item.rating ? 'text-[var(--color-amber)]' : 'text-gray-600'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p
                                            className="text-lg text-white font-medium italic mb-6 leading-relaxed"
                                            style={{ textShadow: '0 1px 5px rgba(0,0,0,0.8)' }}
                                        >
                                            "{item.text}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 mt-auto">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-amber)]"
                                        />
                                        <div>
                                            <p className="font-bold text-white text-base">{item.name}</p>
                                            <p className="text-xs text-gray-300 border-l-2 border-[var(--color-amber)] pl-2">{item.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient Fade Effects */}
                    <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10 hidden md:block"></div>
                    <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10 hidden md:block"></div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-400 text-sm">Scroll to see more reviews</p>
                </div>
            </div>
        </section>
    );
}
