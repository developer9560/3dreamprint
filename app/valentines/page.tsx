// Valentine's Day Special Page
'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGift, faTruckFast, faEnvelope, faQuoteLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function ValentinesPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const valentineProducts = [
        {
            id: 1,
            name: "3D Printed Unique Heart Shaped Phone Holder",
            mrp: 500,
            price: 399,
            images: ["https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/Phone%20Holders/szives-telefontarto-asztali.png.webp?lastmod=0.1762876642", "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w1000h1000wt1/product/Phone%20Holders/personalised-heart-phone-holder-3.png.webp?lastmod=0.1762876642"
                , "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w1000h1000wt1/product/Phone%20Holders/personalised-heart-phone-holder-3.png.webp?lastmod=0.1762876642"
            ],
            rating: 5.0,
            reviewCount: 89,
            slug: 'heart-shape-phone-holder',
            discription: "3D Printed Unique Heart Shaped Phone Holder for the tech lovers - 3D printed gift. A custom 3D printed phone holder is always a kind and friendly gift to anyone. In case you would like an other model, please"
        },
        {
            id: 2,
            name: "3D Photo (Lithophane) Keychain, circle",
            mrp: 499,
            price: 299,
            images: ["https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/3D-photo-lithophane/3d-printed-lithophane-keychain-circle.jpg.webp?lastmod=0.1762876642", "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/3D-photo-lithophane/litofan-kulcstarto-3d-nyomtatott-kor.jpg.webp?lastmod=0.1762876642",
                "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/3D-photo-lithophane/3d-fenykep-kulcstarto-litofan-kor.jpg.webp?lastmod=0.1762876642"
            ],
            rating: 5.0,
            reviewCount: 89,
            slug: '3d-photo-lithophane-keychain-circle',
            discription: "This custom photo keychain (lithophane) is a truly rare and unique gift. The 3D image only looks like a white embossing, but when we turn it towards the light – i.e., illuminate it from behind, for example, by placing it in front of a lamp – the grayscale photo will immediately appear. A great gift for your loved one on Valentine's Day!"

        },
        {
            id: 3,
            name: 'Cut Heart-Shaped Keychains with Names - 3D printed gift, plastic',
            mrp: 1599,
            price: 1279, // 20% off from 1599
            images: ['https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/Key_Rings/Love/cut-heart-shaped-keychain-with-custom-text-3d-printed.jpg.webp?lastmod=0.1762876642', "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/Key_Rings/Love/sziv-alaku-kulcstarto-paroknak-egyedi-nevvel-3d-nyomtatott-termek.jpg.webp?lastmod=0.1762876642"],
            category: 'Frames',
            rating: 4.9,
            reviewCount: 124,
            slug: 'love-story-photo-frame-heart',
            discription: "2 pcs of Cut Heart Shaped Keychain with custom text for lovers.Custom 3D printed gift.The text can be anything and depends only on your creativity.Eg.: your names, nicknames, quotes, etc."

        },
        {
            id: 4,
            name: 'Heart Shaped Keychain with Custom Text - 3D printed gift, plastic',
            mrp: 399,
            price: 249, // 20% off from 799
            images: ["https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/Key_Rings/Love/heart-shaped-keychain-with-custom-text-3d-printed.jpg.webp?lastmod=0.1762876642", "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w1000h1000wt1/product/Key_Rings/Love/sziv-alaku-kulcstarto-egyedi-szoveggel-3d-nyomtatott.jpg.webp?lastmod=0.1762876642"],
            category: 'Keychains',
            rating: 4.8,
            reviewCount: 203,
            slug: 'Heart-Shaped-Keychain-with-Custom-Text-3D-printed-gift-plastic',
            discription: "Heart-Shaped Keychain with custom text option. Custom 3D printed gift. The text can be anything, it depends only on your creativity. Eg.: your love name, nickname, company name, quote, etc."
        },
        {
            id: 5,
            name: "3D Photo (Lithophane) Keychain, rect",
            mrp: 499,
            price: 299,
            images: ["https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/3D-photo-lithophane/3d-printed-lithophane-keychain-rect.jpg.webp?lastmod=0.1762876642", "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/3D-photo-lithophane/litofan-kulcstarto-3d-nyomtatott-negyzetes.jpg.webp?lastmod=0.1762876642", "https://manubim.cdn.shoprenter.hu/custom/manubim/image/cache/w500h500wt1/product/3D-photo-lithophane/3d-fenykep-kulcstarto-litofan-negyzetes.jpg.webp?lastmod=0.1762876642"],

            rating: 4.5,
            reviewCount: 300,
            slug: "3D-Photo-(Lithophane)-Keychain-rect",
            discription: "his custom photo keychain (lithophane) is a truly rare and unique gift. The 3D image only looks like a white embossing, but when we turn it towards the light – i.e., illuminate it from behind, for example, by placing it in front of a lamp – the grayscale photo will immediately appear. A great gift for your loved one on Valentine's Day!"

        }, {
            id: 6,
            name: "Phone holder Heart",
            mrp: 999,
            price: 432,
            images: ["https://media.printables.com/media/prints/b1861f4d-49eb-4ed3-97c1-2c7844a57b4b/images/11852857_4a37f090-f1b2-44ea-8b0f-4812bf61ce90_d0225394-fe94-4fd6-afd9-4d6601ca6003/thumbs/inside/1600x1200/png/2026-01-27-15_19_07-handyhalter-herz-v1_-zuhause-autodesk-fusion-lizenz-fur-bildungseinrichtung.webp", "https://media.printables.com/media/prints/b1861f4d-49eb-4ed3-97c1-2c7844a57b4b/images/11852857_4a37f090-f1b2-44ea-8b0f-4812bf61ce90_d0225394-fe94-4fd6-afd9-4d6601ca6003/thumbs/inside/1600x1200/png/2026-01-27-15_19_07-handyhalter-herz-v1_-zuhause-autodesk-fusion-lizenz-fur-bildungseinrichtung.webp"],
            rating: 4.5,
            reviewCount: 300,
            slug: "Phone-holder-Heart",
            discription: "A cute mobile phone holder to give as a gift."

        }
    ];

    return (
        <div className="min-h-screen bg-[var(--v-ivory)] selection:bg-rose-100 selection:text-rose-600">
            {/* Cinematic Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#881337] via-[#E11D48] to-[var(--v-ivory)]">
                {/* Background Bokeh Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-rose-400 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-40 right-20 w-64 h-64 bg-rose-500 rounded-full blur-[120px] opacity-30 animate-pulse delay-700"></div>

                    {/* Floating Hearts Bokeh */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-rose-200/20 text-4xl animate-heart-fade"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 8}s`,
                                fontSize: `${20 + Math.random() * 30}px`
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                <div className="container relative z-10 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2 mb-10 rounded-full glass-card border-rose-200/20 animate-fadeInUp">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em]">Limited Edition Collection</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-[var(--font-elegant)] text-white mb-8 leading-[1.1] animate-fadeInUp delay-100 italic">
                        Illuminate Your <br className="hidden md:block" />
                        <span className="text-rose-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Love Story</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-rose-50 font-medium mb-12 max-w-2xl mx-auto opacity-90 animate-fadeInUp delay-200">
                        Turn your most precious moments into <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-transparent">glowing 3D memories</span> that last forever.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp delay-300">
                        <Link href="/customize">
                            <Button
                                variant="primary"
                                size="lg"
                                className="!bg-white !text-rose-600 hover:!bg-rose-50 !font-bold !px-10 !py-6 !text-lg rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300"
                            >
                                Create Your Valentine Gift ❤️
                            </Button>
                        </Link>
                        <Link href="#collection">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="!bg-black/10 backdrop-blur-md !text-white !border-white/30 hover:!bg-white/10 !px-10 !py-6 !text-lg rounded-2xl"
                            >
                                Explore Collection
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Bottom Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--v-ivory)] to-transparent opacity-100"></div>
            </section>

            {/* Offer Highlights Section */}
            <section className="py-20 -mt-10 relative z-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { icon: faHeart, title: '20% OFF', subtitle: 'On All Couple Gifts', color: 'rose' },
                            { icon: faGift, title: 'Free Wrapping', subtitle: 'Premium Box Included', color: 'pink' },
                            { icon: faTruckFast, title: 'Express Ship', subtitle: 'Arrival by Feb 14th', color: 'amber' },
                            { icon: faEnvelope, title: 'Free Love Note', subtitle: 'Personalized Message', color: 'rose' },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group glass-card p-6 md:p-8 rounded-[var(--radius-xl)] bg-white/40 border border-white/50 shadow-romantic hover:shadow-lg transition-all duration-500 hover:-translate-y-2 text-center"
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500 rotate-3 group-hover:rotate-0`}>
                                    <FontAwesomeIcon icon={item.icon} className="text-xl md:text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                                <p className="text-xs md:text-sm text-slate-500 font-medium">{item.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emotional "Perfect Romantic Gift" Section */}
            <section className="py-24 relative mx-auto overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-100/50 rounded-full blur-[120px] -z-10"></div>
                <div className="container mx-auto max-w-6xl px-4 text-center">
                    <span className="text-rose-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Crafted with Pure Emotion</span>
                    <h2 className="text-4xl md:text-6xl font-[var(--font-elegant)] text-slate-900 mb-8 italic">"This isn’t just a gift. It’s a memory <br className="hidden md:block" /> that <span className="text-rose-600 underline decoration-rose-200 decoration-8 underline-offset-4">glows every night.</span>"</h2>

                    <div className="grid md:grid-cols-3 gap-12 mt-20">
                        {[
                            { image: 'https://images.unsplash.com/photo-1516589174184-c6848b63e44a?w=400&h=400&fit=crop', title: 'Unique & Personal', desc: 'Every lithophane is made with your photo, making it a one-of-a-kind art piece.' },
                            { image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop', title: 'Romantic Ambiance', desc: 'Transforms any room with a warm, intimate glow that feels like a hug in light.' },
                            { image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=400&fit=crop', title: 'Handcrafted Art', desc: 'Precision 3D printed with love and care to ensure every detail shines through.' },
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-default">
                                <div className="relative mb-6 mx-auto w-48 h-48 md:w-64 md:h-64">
                                    <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-amber-100 rounded-[var(--radius-xl)] rotate-6 group-hover:rotate-0 transition-all duration-500 -z-10"></div>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-[var(--radius-xl)] shadow-lg group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-rose-500">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Valentine's Collection Redesign */}
            <section id="collection" className="py-24 bg-white/50 backdrop-blur-sm relative">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-amber-600 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Curyated for Romance</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-elegant)] text-slate-900 italic">The Valentine’s <span className="text-rose-600">Special</span> Collection</h2>
                        </div>
                        <Link href="/shop" className="group flex items-center gap-3 text-rose-600 font-bold hover:gap-5 transition-all duration-300">
                            View All Masterpieces
                            <span className="w-10 h-[2px] bg-rose-600"></span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {valentineProducts.map((product) => (
                            <div key={product.id} className="relative group p-4 rounded-[var(--radius-xl)] bg-white shadow-romantic border border-rose-50 hover:shadow-2xl transition-all duration-500">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="bg-rose-600 text-white text-xs font-black px-4 py-2 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] animate-pulse">
                                            20% OFF
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                        <Link href="/customize">
                                            <Button variant="primary" className="!w-full !rounded-xl !py-4 shadow-xl !bg-white !text-rose-600 hover:!bg-rose-50 outline-none border-none animate-fadeInUp">
                                                Customize This Love Memoir
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1">{product.name}</h3>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <FontAwesomeIcon icon={faHeart} className="text-xs" />
                                            <span className="text-xs font-bold">{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-black text-rose-600">₹{product.price.toLocaleString()}</span>
                                        <span className="text-sm text-slate-400 line-through font-medium">₹{product.mrp.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ordering Journey Timeline */}
            <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-dark.png')]"></div>
                <div className="container mx-auto max-w-5xl relative z-10 px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-[var(--font-elegant)] italic mb-4">Your Gift’s <span className="text-rose-500">Journey</span></h2>
                        <p className="text-slate-400 font-medium">From a heart-melting photo to a glowing masterpiece</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-[50px] right-[50px] h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500 to-rose-500/0"></div>

                        <div className="grid md:grid-cols-3 gap-12 relative z-10">
                            {[
                                { step: '01', title: 'Share Your Memory', desc: 'Upload your favorite photo of you and your partner.', icon: faHeart },
                                { step: '02', title: 'We Craft It in Light', desc: 'Our artisans 3D print your moment with microscopic precision.', icon: faCircleCheck },
                                { step: '03', title: 'Surprise Them with Love', desc: 'Delivered in premium gift wrap to their doorstep.', icon: faGift },
                            ].map((item, idx) => (
                                <div key={idx} className="text-center group">
                                    <div className="relative inline-flex items-center justify-center w-[120px] h-[120px] mb-8">
                                        <div className="absolute inset-0 bg-rose-500/10 rounded-full border border-rose-500/30 group-hover:scale-110 transition-transform duration-500"></div>
                                        <div className="absolute inset-4 bg-gradient-to-br from-rose-600 to-rose-700 rounded-full shadow-[0_0_30px_rgba(225,29,72,0.4)] flex items-center justify-center text-3xl">
                                            <FontAwesomeIcon icon={item.icon} />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-white text-rose-600 rounded-full flex items-center justify-center font-black text-xs shadow-lg">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Testimonials Section */}
            <section className="py-24 bg-[var(--v-ivory)]">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-[var(--font-elegant)] italic mb-4">Customer <span className="text-rose-600">Love Stories</span></h2>
                        <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Join 50,000+ Couples making memories glow</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                quote: "Got this for our anniversary and my wife cried happy tears! The way our wedding photo glows is absolutely magical. Best gift I've ever given her.",
                                name: 'Arjun & Kavya',
                                location: 'Bangalore',
                                image: 'https://images.unsplash.com/photo-1511285560929-86b16001f531?w=100&h=100&fit=crop'
                            },
                            {
                                quote: "Ordered for Valentine's Day and it arrived beautifully wrapped. The quality blew us away—you can see every little detail when it lights up!",
                                name: 'Rahul & Priya',
                                location: 'Mumbai',
                                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
                            },
                        ].map((review, idx) => (
                            <div key={idx} className="glass-card p-10 rounded-[var(--radius-xl)] bg-white shadow-romantic border-rose-100 flex flex-col relative">
                                <FontAwesomeIcon icon={faQuoteLeft} className="text-rose-100 text-6xl absolute top-8 left-8 -z-10" />
                                <div className="flex items-center gap-4 mb-8">
                                    <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-rose-500 p-0.5" />
                                    <div>
                                        <p className="font-black text-slate-900">{review.name}</p>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">{review.location}</p>
                                    </div>
                                    <div className="ml-auto flex text-amber-500 text-xs">
                                        {[...Array(5)].map((_, i) => <FontAwesomeIcon key={i} icon={faHeart} className="mx-0.5" />)}
                                    </div>
                                </div>
                                <p className="text-lg text-slate-700 italic font-medium leading-[1.8]">"{review.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cinematic Finale Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto relative z-10 max-w-5xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-rose-700 via-rose-600 to-rose-700 rounded-[var(--radius-xl)] md:rounded-[48px] overflow-hidden relative p-12 md:p-24 text-center group shadow-[0_40px_100px_-20px_rgba(225,29,72,0.4)]">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-400 rounded-full blur-[100px] opacity-20 -mr-40 -mt-40"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500 rounded-full blur-[100px] opacity-20 -ml-40 -mb-40"></div>

                        <div className="relative z-10">
                            <span className="text-rose-200 font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Guaranteed Delivery by Feb 14th</span>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-[var(--font-elegant)] text-white mb-10 italic">Make This Valentine’s <br /> <span className="text-rose-100">Unforgettable</span></h2>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Link href="/customize">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="!bg-white !text-rose-600 hover:!bg-rose-50 !font-black !px-12 !py-6 !text-xl rounded-2xl shadow-2xl group-hover:scale-110 transition-transform duration-500"
                                    >
                                        Create Your Gift Now ❤️
                                    </Button>
                                </Link>
                                <Link href="/shop" className="text-white font-bold border-b-2 border-white/30 hover:border-white transition-all py-2">
                                    Browse the Collection
                                </Link>
                            </div>

                            <p className="mt-12 text-rose-200/80 font-medium text-sm">
                                🎁 Free wrapping • 🚀 Express shipping • 💌 Free love message
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
