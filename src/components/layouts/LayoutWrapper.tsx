"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header"
import { AuthGuard } from "@/src/components/auth/AuthGuard";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/suraj-kumar-3dream-print-admin");
    const isAuthPage = pathname?.startsWith("/auth");

    // Don't show navbar/footer on auth pages or admin pages
    // Note: BottomNav has its own logic, but hiding the wrapper's navbar/footer here is cleaner for those routes.
    const hiddenRoutes = ["/auth/login", "/auth/signup", "/suraj-kumar-3dream-print-admin", "/user/search"];
    const shouldHide = hiddenRoutes.some((route) => pathname?.startsWith(route));

    if (isAdminPage) {
        return <div className="min-h-screen flex flex-col">{children}</div>;
    }

    return (
        <>
            <AuthGuard />
            {!shouldHide && <Header />}
            <main className="flex-grow">{children}</main>
            {!shouldHide && <Footer />}

        </>
    );
}
