// Input Component with labels and validation
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

export default function Input({
    label,
    error,
    helperText,
    fullWidth = false,
    className = '',
    id,
    ...props
}: InputProps) {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <div className={`${widthClass}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-semibold text-[var(--color-text)] mb-2"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`
          w-full px-4 py-3 
          bg-white border-2 rounded-soft
          ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-gray-border)]'}
          focus:border-[var(--color-amber)] focus:outline-none
          transition-colors duration-200
          text-[var(--color-text)]
          placeholder:text-[var(--color-text-secondary)]
          shadow-sm
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
            )}
            {helperText && !error && (
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{helperText}</p>
            )}
        </div>
    );
}
