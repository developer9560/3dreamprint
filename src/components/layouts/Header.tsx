'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEnvelope, faAngleRight, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import Logo from '@/src/assets/logo.png';
import Logo from "@/public/3dreamlogo.png";
import { useAuthStore } from '@/src/store/authStore';
import { ROUTES } from '@/src/lib/constants';
import Button from '../ui/Button';
import { User, ChevronDown, Package, Heart, LogOut } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const pathname = usePathname();
    const { isAuthenticated, user, logout, openLogin } = useAuthStore();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
    };

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
        // { path: '/users/customize', label: 'Customize' },
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
                    <div className="rounded-lg flex items-center justify-center md:ml-20">
                        <Image src={Logo} alt="Logo" width={100} height={100} />
                    </div>
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
                                className="flex items-center justify-center px-6 py-2.5 rounded-full text-white bg-green-500 font-bold hover:shadow-lg hover:shadow-[var(--color-amber-light)] hover:-translate-y-0.5 transition-all duration-300 group whitespace-nowrap"
                            >
                                <FontAwesomeIcon
                                    icon={faWhatsapp}
                                    className="mr-2 text-xl transition-transform duration-300 group-hover:rotate-12 text-white"
                                    aria-hidden="true"
                                />
                                Chat on WhatsApp
                            </a>
                        </li>

                        {/* Profile / Login Section */}
                        <li className="ml-4">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="hidden sm:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                                    >
                                        <div className="w-8 h-8 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                                            <User size={18} className="text-[#10B981]" />
                                        </div>
                                        <span className="hidden lg:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                                            {user?.fullName?.split(' ')[0] || 'Account'}
                                        </span>
                                        <ChevronDown size={16} className="hidden lg:block text-gray-400" />
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsProfileOpen(false)}
                                            />
                                            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-scaleIn">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="font-medium text-gray-900">
                                                        {user?.fullName || 'User'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={ROUTES.ACCOUNT}
                                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                                >
                                                    <User size={18} className="text-gray-400" />
                                                    <span className="text-sm text-gray-700">
                                                        My Profile
                                                    </span>
                                                </Link>
                                                <Link
                                                    href={ROUTES.MY_ORDERS}
                                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Package size={18} className="text-gray-400" />
                                                    <span className="text-sm text-gray-700">
                                                        My Orders
                                                    </span>
                                                </Link>
                                                <Link
                                                    href={ROUTES.WISHLIST}
                                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                                                >
                                                    <Heart size={18} className="text-gray-400" />
                                                    <span className="text-sm text-gray-700">
                                                        Wishlist
                                                    </span>
                                                </Link>
                                                <div className="border-t border-gray-100 mt-2 pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-gray-50 transition-colors text-red-600"
                                                    >
                                                        <LogOut size={18} />
                                                        <span className="text-sm">Logout</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center gap-3">
                                    <Button
                                        onClick={openLogin}
                                        variant="outline"
                                        size="md"
                                        className="zimpy-btn-outline btn-visible px-5"
                                    >
                                        Login
                                    </Button>
                                </div>
                            )}
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
                    <div className="p-6 border-b border-gray-100">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center border-2 border-amber-100 overflow-hidden shrink-0">
                                    <User size={32} className="text-[var(--color-amber)]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 text-lg truncate">{user?.fullName || 'User'}</h3>
                                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Image src={Logo} alt="Logo" width={100} height={100} />
                                {/* <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-dark)] rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">L</span>
                                    </div>
                                    <span className="text-lg font-bold text-[var(--color-text)]">Lithophane Studio</span>
                                </div> */}
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        openLogin();
                                    }}
                                    variant="outline"
                                    className="w-full !border-[var(--color-amber)] !text-[var(--color-amber)] h-11"
                                >
                                    Login / Sign Up
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col w-full px-4 pt-4 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pb-20">


                        <div>
                            <ul className="space-y-1">
                                {navigationLinks.map(({ path, label }, index) => (
                                    <li
                                        key={path}
                                        className="w-full relative"
                                        style={{
                                            transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                                            opacity: isOpen ? 1 : 0,
                                            transform: isOpen ? 'translateX(0)' : 'translateX(-2rem)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <Link
                                            href={path}
                                            aria-current={pathname === path ? 'page' : undefined}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-[var(--color-text)] hover:text-[var(--color-amber)] text-lg font-medium py-3 px-4 relative transition-all duration-300 flex items-center rounded-xl
                            ${pathname === path ? 'text-[var(--color-amber)] bg-[var(--color-amber-light)]/10' : ''}
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
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {isAuthenticated && (
                            <div className="mb-4">
                                <button
                                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                            <User size={18} className="text-amber-600" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Settings</span>
                                    </div>
                                    <ChevronDown
                                        size={18}
                                        className={`text-gray-400 transition-transform duration-300 ${isAccountOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAccountOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                    <ul className="space-y-1 mt-1 px-4 border-l-2 border-amber-50 ml-8">
                                        {[
                                            { path: ROUTES.ACCOUNT, label: 'My Profile', icon: User },
                                            { path: ROUTES.MY_ORDERS, label: 'My Orders', icon: Package },
                                            { path: ROUTES.WISHLIST, label: 'Wishlist', icon: Heart },
                                        ].map((item) => (
                                            <li key={item.path}>
                                                <Link
                                                    href={item.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-3 text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-colors group/item"
                                                >
                                                    <item.icon size={18} className="text-gray-400 group-hover/item:text-amber-500 transition-colors" />
                                                    <span className="font-medium text-sm">{item.label}</span>
                                                    <FontAwesomeIcon icon={faAngleRight} className="ml-auto text-gray-300 text-[10px] group-hover/item:translate-x-1 transition-transform" />
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full group/logout"
                                            >
                                                <LogOut size={18} className="text-red-400 group-hover/logout:text-red-600 transition-colors" />
                                                <span className="font-bold text-sm">Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div
                            className="mt-8 px-4"
                            style={{
                                transitionDelay: isOpen ? '400ms' : '0ms',
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? 'translateY(0)' : 'translateY(-1rem)',
                                transition: 'all 0.4s ease-out'
                            }}
                        >
                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                <p className="text-xs font-bold text-green-600 uppercase tracking-tighter mb-3 px-1">Customer Support</p>
                                <a
                                    href="https://wa.me/919718519973"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-green-500 text-white font-bold hover:shadow-lg transition-all w-full active:scale-95 group shadow-md"
                                >
                                    <FontAwesomeIcon
                                        icon={faWhatsapp}
                                        className="text-xl transition-transform duration-300 group-hover:rotate-12"
                                        aria-hidden="true"
                                    />
                                    <span>WhatsApp Support</span>
                                </a>
                            </div>
                        </div>
                    </div>
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
