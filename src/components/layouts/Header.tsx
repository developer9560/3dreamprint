'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEnvelope, faAngleRight, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const navigationLinks = [
        { path: '/', label: 'Home' },
        { path: '/users/shop', label: 'Shop' },
        { path: '/users/customize', label: 'Customize' },
        { path: '/users/about', label: 'About' },
        { path: '/users/faq', label: 'FAQ' },
        { path: '/users/contact', label: 'Contact' }
    ];

    return (
        <nav
            className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
                ${scrolled ? 'bg-white backdrop-blur-md shadow-md h-[80px]' : 'bg-white backdrop-blur-sm h-[80px]'} animate-fadeInDown`}
            aria-label="Main Navigation"
        >
            <div className="container mx-auto h-full px-4 md:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group" aria-label="Lithophane Studio - Home">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-dark)] rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-hover transition-all">
                        <span className="text-white font-bold text-xl">L</span>
                    </div>
                    <span className="text-xl font-bold text-[var(--color-text)] font-[var(--font-heading)] hidden sm:block">
                        Lithophane Studio
                    </span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-[var(--color-text)] text-2xl cursor-pointer z-[200] transform transition-transform duration-300 hover:scale-110 active:scale-90 bg-transparent border-none outline-none focus:ring-2 focus:ring-[var(--color-amber)] rounded-lg p-2"
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                    <FontAwesomeIcon
                        icon={isOpen ? faTimes : faBars}
                        className={`transition-all duration-500 transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                        aria-hidden="true"
                    />
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:items-center">
                    <ul className="flex items-center space-x-8">
                        {navigationLinks.map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    href={path}
                                    aria-current={pathname === path ? 'page' : undefined}
                                    title={`Go to ${label} page`}
                                    className={`text-base font-medium py-1 relative transition-all duration-300
                    ${pathname === path ? 'text-[var(--color-amber)] font-bold' : 'text-[var(--color-text-secondary)]'}
                    hover:text-[var(--color-amber)]
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--color-amber)]
                    after:transform after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                    hover:after:origin-left hover:after:scale-x-100
                    ${pathname === path ? 'after:origin-left after:scale-x-100' : ''}
                  `}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}

                        {/* Desktop Actions */}
                        <li className="ml-4 flex items-center gap-4">
                            {/* <Link href="/cart" className="relative group text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] transition-colors">
                                <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-amber)] text-white text-xs font-bold rounded-full flex items-center justify-center">0</span>
                            </Link> */}

                            <a
                                href="https://wa.me/919718519973"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-dark)] text-white font-bold hover:shadow-lg hover:shadow-[var(--color-amber-light)] hover:-translate-y-0.5 transition-all duration-300 group whitespace-nowrap"
                            >
                                <FontAwesomeIcon
                                    icon={faWhatsapp}
                                    className="mr-2 text-xl transition-transform duration-300 group-hover:rotate-12 text-white"
                                    aria-hidden="true"
                                />
                                +91 97185 19973
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Backdrop overlay for mobile */}
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-all duration-500 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                ></div>

                {/* Mobile Navigation */}
                <div
                    id="mobile-menu"
                    className={`lg:hidden fixed top-0 left-0 w-[85%] max-w-xs h-screen bg-white shadow-2xl z-[150] transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    aria-hidden={!isOpen}
                >
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-dark)] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">L</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--color-text)]">Lithophane Studio</span>
                    </div>

                    <ul className="flex flex-col w-full px-4 pt-4">
                        {navigationLinks.map(({ path, label }, index) => (
                            <li
                                key={path}
                                className="w-full my-1 relative"
                                style={{
                                    transitionDelay: isOpen ? `${index * 80}ms` : '0ms',
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? 'translateX(0)' : 'translateX(-2rem)',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                <Link
                                    href={path}
                                    aria-current={pathname === path ? 'page' : undefined}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-[var(--color-text)] hover:text-[var(--color-amber)] text-lg font-medium py-3.5 px-4 relative transition-all duration-300 flex items-center rounded-lg
                    ${pathname === path ? 'text-[var(--color-amber)] bg-[var(--color-amber-light)]/20' : ''}
                    group/nav-item hover:bg-gray-50
                  `}
                                >
                                    {label}
                                    <span className="ml-auto">
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            className={`text-gray-300 group-hover/nav-item:text-[var(--color-amber)] transition-transform duration-300 group-hover/nav-item:translate-x-1 ${pathname === path ? 'text-[var(--color-amber)] translate-x-1' : ''}`}
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Link>
                                {pathname === path && (
                                    <div className="bg-[var(--color-amber)] w-1 absolute left-0 top-1 bottom-1 rounded-full"></div>
                                )}
                            </li>
                        ))}
                        <li
                            className="mt-8 px-4"
                            style={{
                                transitionDelay: isOpen ? '450ms' : '0ms',
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'translateY(0)' : 'translateY(-2rem)',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <a
                                href="https://wa.me/919718519973"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center px-5 py-4 rounded-xl bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-dark)] text-white font-bold hover:shadow-xl hover:shadow-[var(--color-amber)]/40 hover:-translate-y-1 transition-all duration-300 w-full hover:scale-[1.02] active:scale-95 group shadow-lg"
                            >
                                <FontAwesomeIcon
                                    icon={faWhatsapp}
                                    className="mr-2 text-xl transition-transform duration-300 group-hover:rotate-12"
                                    aria-hidden="true"
                                />
                                +91 97185 19973
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out;
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </nav>
    );
};

export default Header;
