// Card Component for products, testimonials, etc.
import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
    padding?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export default function Card({
    children,
    className = '',
    hoverable = false,
    padding = 'md',
    onClick,
}: CardProps) {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverClass = hoverable ? 'hover:shadow-elevated hover:-translate-y-1 cursor-pointer' : '';

    return (
        <div
            className={`bg-white rounded-card shadow-card transition-all duration-300 ${paddingClasses[padding]} ${hoverClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
