'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/store/authStore';
import { AccountSidebar } from '@/src/components/account/AccountSidebar';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-[var(--color-amber)] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-cream)]">
            <div className="container max-w-7xl mx-auto px-4 py-8 lg:py-12">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
                        My Account
                    </h1>
                    <p className="text-[var(--color-text-secondary)] mt-1">
                        Manage your profile, orders, and addresses
                    </p>
                </div>

                {/* Layout: Sidebar + Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - hidden on mobile, shown on desktop */}
                    <div className="hidden lg:block">
                        <div className="sticky top-[100px]">
                            <AccountSidebar />
                        </div>
                    </div>

                    {/* Mobile Sidebar - horizontal scroll on mobile */}
                    <div className="lg:hidden">
                        <AccountSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
