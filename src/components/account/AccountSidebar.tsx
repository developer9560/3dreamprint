'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    User,
    MapPin,
    Package,
    Heart,
    LogOut,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuthStore } from '@/src/store/authStore';
import { ROUTES } from '@/src/lib/constants';

const MENU_ITEMS = [
    {
        section: 'Account Settings',
        items: [
            { label: 'Profile Information', href: ROUTES.ACCOUNT, icon: User },
            { label: 'Manage Addresses', href: ROUTES.ADDRESSES, icon: MapPin },
        ]
    },
    {
        section: 'My Orders',
        items: [
            { label: 'My Orders', href: ROUTES.MY_ORDERS, icon: Package },
        ]
    },
    {
        section: 'My Stuff',
        items: [
            { label: 'My Wishlist', href: ROUTES.WISHLIST, icon: Heart },
        ]
    },
];

export const AccountSidebar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="w-full lg:w-[280px] shrink-0 space-y-4">
            {/* User Info Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-dark)] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg">
                        {getInitials(user?.fullName || 'U')}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hello,</p>
                    <p className="font-bold text-gray-900 truncate text-lg">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {MENU_ITEMS.map((section, idx) => (
                    <div key={idx} className="border-b border-gray-50 last:border-0">
                        <div className="px-3 pt-4 pb-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
                                {section.section}
                            </p>
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center justify-between p-3 rounded-xl transition-all duration-200 mb-1 last:mb-0 group',
                                            isActive
                                                ? 'bg-[var(--color-amber-light)] text-[var(--color-amber-dark)] font-semibold shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--color-amber-dark)]'
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                                                isActive
                                                    ? 'bg-[var(--color-amber)] text-white'
                                                    : 'bg-gray-100 text-gray-400 group-hover:bg-[var(--color-amber-light)] group-hover:text-[var(--color-amber-dark)]'
                                            )}>
                                                <item.icon size={16} />
                                            </div>
                                            <span className="text-sm">{item.label}</span>
                                        </div>
                                        <ChevronRight
                                            size={16}
                                            className={cn(
                                                'transition-transform duration-200',
                                                isActive ? 'text-[var(--color-amber-dark)]' : 'text-gray-300 group-hover:translate-x-0.5'
                                            )}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Logout Button */}
                <div className="p-3">
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full p-3 rounded-xl transition-all duration-200 group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <LogOut size={16} />
                        </div>
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountSidebar;
