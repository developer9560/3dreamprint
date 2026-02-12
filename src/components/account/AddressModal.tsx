'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    X, MapPin, Phone, Home, Briefcase, Building2,
    Navigation, Map, ChevronDown, Sparkles, Star,
    CheckCircle
} from 'lucide-react';
import { userAPI } from '@/src/lib/api';
import { Address } from '@/src/types';
import Button from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep"
];

// Schema aligned to backend AddressRequest DTO
const addressSchema = z.object({
    contactNumber: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
    addressLine1: z
        .string()
        .min(5, 'Address must be at least 5 characters')
        .max(255, 'Address is too long'),
    addressLine2: z.string().optional(),
    city: z
        .string()
        .min(2, 'City is required'),
    state: z
        .string()
        .min(2, 'Please select a state'),
    country: z
        .string()
        .default('India'),
    postalCode: z
        .string()
        .regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
    type: z.enum(['HOME', 'WORK'] as const),
    isDefault: z.boolean().default(false),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editAddress?: Address | null;
}

// Floating label input component
const FloatingInput = ({
    label,
    icon: Icon,
    error,
    className,
    ...props
}: {
    label: string;
    icon?: React.ElementType;
    error?: string;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    return (
        <div className={cn("relative group", className)}>
            <div className={cn(
                "relative flex items-center rounded-2xl border-2 transition-all duration-300",
                error
                    ? "border-red-300 bg-red-50/30"
                    : isFocused
                        ? "border-[var(--color-amber)] bg-white shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
                        : "border-gray-200 bg-white hover:border-gray-300"
            )}>
                {Icon && (
                    <div className={cn(
                        "pl-4 transition-colors duration-300",
                        error ? "text-red-400" : isFocused ? "text-[var(--color-amber)]" : "text-gray-400"
                    )}>
                        <Icon size={18} />
                    </div>
                )}
                <input
                    {...props}
                    onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
                    className={cn(
                        "w-full px-4 py-4 text-sm text-gray-900 bg-transparent outline-none placeholder-transparent peer",
                        Icon ? "pl-3" : "pl-4"
                    )}
                    placeholder={label}
                />
                <label className={cn(
                    "absolute left-0 transition-all duration-200 pointer-events-none text-gray-400",
                    Icon ? "left-11" : "left-4",
                    (isFocused || hasValue)
                        ? "-top-2.5 text-xs font-semibold bg-white px-2 rounded-full"
                        : "top-4 text-sm",
                    (isFocused || hasValue) && !error && "text-[var(--color-amber-dark)]",
                    error && (isFocused || hasValue) && "text-red-500"
                )}>
                    {label}
                </label>
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                    {error}
                </p>
            )}
        </div>
    );
};

// Floating label textarea
const FloatingTextarea = ({
    label,
    icon: Icon,
    error,
    className,
    ...props
}: {
    label: string;
    icon?: React.ElementType;
    error?: string;
    className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    return (
        <div className={cn("relative group", className)}>
            <div className={cn(
                "relative flex rounded-2xl border-2 transition-all duration-300",
                error
                    ? "border-red-300 bg-red-50/30"
                    : isFocused
                        ? "border-[var(--color-amber)] bg-white shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
                        : "border-gray-200 bg-white hover:border-gray-300"
            )}>
                {Icon && (
                    <div className={cn(
                        "pl-4 pt-4 transition-colors duration-300",
                        error ? "text-red-400" : isFocused ? "text-[var(--color-amber)]" : "text-gray-400"
                    )}>
                        <Icon size={18} />
                    </div>
                )}
                <textarea
                    {...props}
                    onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
                    onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
                    className={cn(
                        "w-full px-4 py-4 text-sm text-gray-900 bg-transparent outline-none resize-none placeholder-transparent",
                        Icon ? "pl-3" : "pl-4"
                    )}
                    rows={3}
                    placeholder={label}
                />
                <label className={cn(
                    "absolute left-0 transition-all duration-200 pointer-events-none text-gray-400",
                    Icon ? "left-11" : "left-4",
                    (isFocused || hasValue)
                        ? "-top-2.5 text-xs font-semibold bg-white px-2 rounded-full"
                        : "top-4 text-sm",
                    (isFocused || hasValue) && !error && "text-[var(--color-amber-dark)]",
                    error && (isFocused || hasValue) && "text-red-500"
                )}>
                    {label}
                </label>
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                    {error}
                </p>
            )}
        </div>
    );
};

export const AddressModal = ({ isOpen, onClose, onSuccess, editAddress }: AddressModalProps) => {
    const [successAnimation, setSuccessAnimation] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema) as any,
        defaultValues: {
            type: 'HOME',
            isDefault: false,
            country: 'India',
        },
    });

    const selectedType = watch('type');
    const isDefault = watch('isDefault');

    useEffect(() => {
        if (isOpen) {
            if (editAddress) {
                setValue('contactNumber', editAddress.contactNumber || '');
                setValue('postalCode', editAddress.postalCode || editAddress.pincode || '');
                setValue('city', editAddress.city || '');
                setValue('state', editAddress.state || '');
                setValue('addressLine1', editAddress.addressLine1 || '');
                setValue('addressLine2', editAddress.addressLine2 || '');
                setValue('country', editAddress.country || 'India');
                // Map frontend type ('home'/'office') to backend enum ('HOME'/'WORK')
                const backendType = editAddress.type === 'office' ? 'WORK' : 'HOME';
                setValue('type', backendType);
                setValue('isDefault', editAddress.isDefault || false);
            } else {
                reset({ type: 'HOME', isDefault: false, country: 'India' });
            }
        }
    }, [isOpen, editAddress, setValue, reset]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const onSubmit = async (data: AddressFormData) => {
        try {
            const payload: any = {
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2 || '',
                city: data.city,
                state: data.state,
                country: data.country || 'India',
                postalCode: data.postalCode,
                contactNumber: data.contactNumber,
                type: data.type, // Already 'HOME' or 'WORK' — matches backend enum
                isDefault: data.isDefault || false,
            };

            if (editAddress) {
                await userAPI.updateAddress(editAddress.id, payload);
            } else {
                await userAPI.addAddress(payload);
            }

            setSuccessAnimation(true);
            setTimeout(() => {
                setSuccessAnimation(false);
                onSuccess();
                onClose();
            }, 1200);
        } catch (error) {
            console.error('Failed to save address:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
                style={{ animation: 'fadeIn 0.2s ease-out' }}
            />

            {/* Modal Container */}
            <div
                className={cn(
                    "relative w-full sm:w-[95%] sm:max-w-xl bg-white z-10",
                    "rounded-t-3xl sm:rounded-3xl",
                    "max-h-[92vh] sm:max-h-[90vh]",
                    "flex flex-col",
                    "shadow-2xl",
                    successAnimation && "scale-95 opacity-90"
                )}
                style={{ animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}
            >
                {/* Header — Fixed */}
                <div className="shrink-0 relative overflow-hidden">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-[var(--color-amber)] via-[var(--color-amber-dark)] to-[var(--color-amber)] px-6 py-5 sm:rounded-t-3xl rounded-t-3xl">
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />

                        <div className="flex items-center justify-between relative">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <MapPin size={20} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">
                                        {editAddress ? 'Edit Address' : 'Add New Address'}
                                    </h2>
                                    <p className="text-white/70 text-xs mt-0.5">
                                        {editAddress ? 'Update your delivery address' : 'Save a new delivery location'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <X size={18} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Decorative wave */}
                    <div className="h-3 bg-gradient-to-b from-[var(--color-amber-light)]/30 to-transparent" />
                </div>

                {/* Success Overlay */}
                {successAnimation && (
                    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl"
                        style={{ animation: 'fadeIn 0.3s ease-out' }}>
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
                            style={{ animation: 'bounceIn 0.5s cubic-bezier(0.68,-0.55,0.27,1.55)' }}>
                            <CheckCircle size={40} className="text-green-500" />
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                            {editAddress ? 'Address Updated!' : 'Address Saved!'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Your delivery address is ready</p>
                    </div>
                )}

                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5">
                    <form id="address-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* --- Section 1: Contact --- */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-[var(--color-amber-light)] flex items-center justify-center">
                                    <span className="text-xs font-bold text-[var(--color-amber-dark)]">1</span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Contact</h3>
                            </div>
                            <FloatingInput
                                label="Mobile Number"
                                icon={Phone}
                                type="tel"
                                maxLength={10}
                                error={errors.contactNumber?.message}
                                value={watch('contactNumber') || ''}
                                {...register('contactNumber')}
                            />
                        </div>

                        {/* --- Section 2: Address --- */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-[var(--color-amber-light)] flex items-center justify-center">
                                    <span className="text-xs font-bold text-[var(--color-amber-dark)]">2</span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Address</h3>
                            </div>
                            <div className="space-y-3">
                                <FloatingTextarea
                                    label="Flat, House No., Building, Street"
                                    icon={Building2}
                                    error={errors.addressLine1?.message}
                                    value={watch('addressLine1') || ''}
                                    {...register('addressLine1')}
                                />
                                <FloatingInput
                                    label="Landmark (Optional)"
                                    icon={Navigation}
                                    error={errors.addressLine2?.message}
                                    value={watch('addressLine2') || ''}
                                    {...register('addressLine2')}
                                />
                            </div>
                        </div>

                        {/* --- Section 3: Location --- */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-[var(--color-amber-light)] flex items-center justify-center">
                                    <span className="text-xs font-bold text-[var(--color-amber-dark)]">3</span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Location</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <FloatingInput
                                    label="Pincode"
                                    icon={Map}
                                    maxLength={6}
                                    error={errors.postalCode?.message}
                                    value={watch('postalCode') || ''}
                                    {...register('postalCode')}
                                />
                                <FloatingInput
                                    label="City / District"
                                    error={errors.city?.message}
                                    value={watch('city') || ''}
                                    {...register('city')}
                                />
                            </div>
                            <div className="mt-3">
                                {/* Styled select for State */}
                                <div className="relative">
                                    <select
                                        {...register('state')}
                                        className={cn(
                                            "w-full appearance-none rounded-2xl border-2 px-4 py-4 pr-10 text-sm bg-white outline-none transition-all duration-300",
                                            "focus:border-[var(--color-amber)] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]",
                                            errors.state
                                                ? "border-red-300 bg-red-50/30"
                                                : "border-gray-200 hover:border-gray-300",
                                            !watch('state') && "text-gray-400"
                                        )}
                                    >
                                        <option value="">Select State</option>
                                        {INDIAN_STATES.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.state && (
                                    <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                                        {errors.state.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* --- Section 4: Address Type --- */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-[var(--color-amber-light)] flex items-center justify-center">
                                    <span className="text-xs font-bold text-[var(--color-amber-dark)]">4</span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Type</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {([
                                    { value: 'HOME' as const, label: 'Home', icon: Home, desc: 'Residential address' },
                                    { value: 'WORK' as const, label: 'Work', icon: Briefcase, desc: 'Office / workplace' },
                                ]).map(({ value, label, icon: TypeIcon, desc }) => (
                                    <label
                                        key={value}
                                        className={cn(
                                            "relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 group",
                                            selectedType === value
                                                ? "border-[var(--color-amber)] bg-[var(--color-amber-light)]/50 shadow-sm"
                                                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            value={value}
                                            {...register('type')}
                                            className="sr-only"
                                        />
                                        {selectedType === value && (
                                            <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-[var(--color-amber)] rounded-full flex items-center justify-center"
                                                style={{ animation: 'bounceIn 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)' }}>
                                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors",
                                            selectedType === value
                                                ? "bg-[var(--color-amber)] text-white"
                                                : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                        )}>
                                            <TypeIcon size={20} />
                                        </div>
                                        <p className={cn(
                                            "text-sm font-bold transition-colors",
                                            selectedType === value ? "text-[var(--color-amber-dark)]" : "text-gray-700"
                                        )}>
                                            {label}
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* --- Default Address Toggle --- */}
                        <label
                            className={cn(
                                "flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                                isDefault
                                    ? "border-[var(--color-amber)] bg-[var(--color-amber-light)]/30"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                isDefault
                                    ? "bg-[var(--color-amber)] text-white"
                                    : "bg-gray-100 text-gray-400"
                            )}>
                                <Star size={18} className={isDefault ? "fill-white" : ""} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800">Default Address</p>
                                <p className="text-xs text-gray-400">Use this address for all orders</p>
                            </div>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    {...register('isDefault')}
                                    className="sr-only peer"
                                />
                                <div className={cn(
                                    "w-11 h-6 rounded-full transition-colors duration-300",
                                    isDefault ? "bg-[var(--color-amber)]" : "bg-gray-200"
                                )} />
                                <div className={cn(
                                    "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300",
                                    isDefault && "translate-x-5"
                                )} />
                            </div>
                        </label>
                    </form>
                </div>

                {/* Footer — Fixed at bottom */}
                <div className="shrink-0 border-t border-gray-100 px-5 sm:px-6 py-4 bg-white sm:rounded-b-3xl">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="address-form"
                            disabled={isSubmitting}
                            className={cn(
                                "flex-[2] py-3.5 px-4 rounded-2xl text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2",
                                "bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-dark)]",
                                "hover:shadow-lg hover:shadow-[var(--color-amber)]/25 hover:-translate-y-0.5",
                                "active:translate-y-0 active:shadow-md",
                                "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={16} />
                                    {editAddress ? 'Update Address' : 'Save Address'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(100px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounceIn {
                    0% { transform: scale(0); }
                    60% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
                @media (min-width: 640px) {
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(40px) scale(0.97); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                }
            `}</style>
        </div>
    );
};

export default AddressModal;
