'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faPaperPlane,
    faQuestionCircle,
    faCheckCircle,
    faSpinner,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSend = new URLSearchParams();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('message', formData.message);

        // FormSubmit Configuration
        formDataToSend.append('_subject', `New Contact Message from ${formData.name}`);
        formDataToSend.append('_template', 'table');
        formDataToSend.append('_captcha', 'false');

        try {
            await fetch('https://formsubmit.co/23ac29d3baf4f2cd48111ed7b360c3c0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formDataToSend
            });
            setIsSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error('Contact form error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl translate-y-1/3" />

            <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">

                {/* Hero Section */}
                <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-bold tracking-wide mb-2 uppercase">
                        We're Here For You
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                        We’re Here to Help You <br className="hidden md:block" />
                        <span className="text-amber-500 relative inline-block">
                            Create Something Beautiful
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-200 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Questions, ideas, or custom requests — our team is just a message away.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Contact Info Cards */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* WhatsApp - Highlighted */}
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                            className="group flex items-center gap-4 p-5 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden">
                            <div className="absolute right-0 top-0 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">
                                Fastest Response
                            </div>
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">WhatsApp Us</h3>
                                <p className="text-sm text-gray-500">Chat for instant replies</p>
                            </div>
                        </a>

                        {/* Phone */}
                        <div className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                <FontAwesomeIcon icon={faPhone} className="text-lg" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Call Us</h3>
                                <p className="text-sm text-gray-500">+91 9718519973</p>
                                <p className="text-xs text-gray-400 mt-0.5">Mon-Sat, 10AM - 7PM</p>
                            </div>
                        </div>

                        {/* Email */}
                        <a href="mailto:hello@lithophane.studio" className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Email Us</h3>
                                <p className="text-sm text-gray-500">3dreamprintindia@gmail.com</p>
                                <p className="text-xs text-gray-400 mt-0.5">Replies within 24 hours</p>
                            </div>
                        </a>

                        {/* Location */}
                        <div className="group flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 shrink-0">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lg" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Visit Studio</h3>
                                <address className="text-sm text-gray-500 not-italic leading-relaxed">
                                    Delhi NCR<br />
                                    India - 121002
                                </address>
                            </div>
                        </div>

                        {/* Quick Help Card */}
                        <div className="mt-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:translate-x-0 transition-transform duration-700" />

                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                Need Quick Answers?
                            </h3>
                            <p className="text-white/90 text-sm mb-4">
                                Check our FAQ section for instant help on shipping, returns, and customization.
                            </p>
                            <a href="/faq" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all text-sm group-hover:pl-5">
                                Find Answers <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                        </div>

                    </div>

                    {/* Right Column: Premium Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden">
                            {isSuccess && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4 animate-bounce-short">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-4xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent! ✨</h3>
                                    <p className="text-gray-500">We'll get back to you shortly.</p>
                                </div>
                            )}

                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h2>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Name */}
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="peer w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-700 placeholder-transparent"
                                            placeholder="John Doe"
                                        />
                                        <label className="absolute left-4 -top-6 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-600">
                                            Your Name <span className="text-red-400">*</span>
                                        </label>
                                        <p className="text-xs text-gray-400 mt-1.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity flex items-center gap-1">
                                            So we know what to call you 🙂
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="peer w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-700 placeholder-transparent"
                                            placeholder="email@example.com"
                                        />
                                        <label className="absolute left-4 -top-6 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-600">
                                            Email Address <span className="text-red-400">*</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Phone */}
                                    <div className="relative group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="peer w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-700 placeholder-transparent"
                                            placeholder="+91"
                                        />
                                        <label className="absolute left-4 -top-6 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-600">
                                            Phone Number (Optional)
                                        </label>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="relative group">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="peer w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-700 placeholder-transparent resize-y min-h-[120px]"
                                        placeholder="Message"
                                    ></textarea>
                                    <label className="absolute left-4 -top-6 text-sm font-semibold text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-amber-600">
                                        Your Message <span className="text-red-400">*</span>
                                    </label>
                                    <p className="text-xs text-gray-400 mt-1.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
                                        Tell us about your photo, idea, or concern...
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                            Send My Message ✨
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
