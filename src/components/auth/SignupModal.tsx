'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Phone, User, Eye, EyeOff, X, Heart, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Checkbox } from '@/src/components/ui/Input';
import { useAuthStore } from '@/src/store/authStore';
import { ROUTES } from '@/src/lib/constants';
import { getPasswordStrength, cn } from '@/src/lib/utils';
import { Modal } from '@/src/components/ui/Modal';

// Validation Schema
const signupSchema = z.object({
    fullName: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid phone number').optional().or(z.literal('')),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms',
    }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupModal = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { signup, isLoading, error, isSignupOpen, closeSignup, openLogin } = useAuthStore();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            terms: false,
        },
    });

    const password = watch('password', '');
    const passwordStrength = getPasswordStrength(password);

    const onSubmit = async (data: SignupFormData) => {
        try {
            await signup({
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                password: data.password,
            });
            toast.success('Account created successfully! Please login.');
            closeSignup();
            openLogin();
        } catch {
            // Error handled by store
        }
    };

    const handleLoginClick = () => {
        closeSignup();
        openLogin();
    };

    return (
        <Modal
            isOpen={isSignupOpen}
            onClose={closeSignup}
            size="full"
            showClose={false}
            className="p-0 overflow-hidden max-w-[950px] rounded-2xl md:rounded-3xl !bg-[#FAFAFA] border border-white/50 shadow-2xl mx-auto"
        >
            <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px] max-h-[85vh] overflow-y-auto custom-scrollbar">
                {/* Left Panel - Emotional / Visual (Hidden on mobile) */}
                <div className="hidden md:flex w-full md:w-5/12 relative bg-gradient-to-bl from-amber-500 to-orange-600 overflow-hidden flex-col justify-between p-8 md:p-12 text-white">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-overlay" />
                    <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl animate-pulse" />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg border border-white/30 mb-8">
                            <ShieldCheck className="text-white" size={24} />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-4 text-white drop-shadow-sm">
                            Start Turning Memories Into <span className="text-amber-200">Light</span>
                        </h2>
                        <p className="text-amber-100 text-lg leading-relaxed">
                            Create your account today and join a community of storytellers, dreamers, and gift-givers.
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Heart size={18} className="text-amber-100" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Save Favorites</p>
                                <p className="text-xs text-amber-100/80">Keep track of designs you love</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <User size={18} className="text-amber-100" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Track Orders</p>
                                <p className="text-xs text-amber-100/80">Real-time updates on your gifts</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Signup Form */}
                <div className="w-full md:w-7/12 p-6 md:p-10 bg-white relative">
                    {/* Close Button */}
                    <button
                        onClick={closeSignup}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="max-w-md mx-auto">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h3>
                            <p className="text-gray-500 text-sm">We'll never share your details with anyone else.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Full Name */}
                            <Input
                                {...register('fullName')}
                                label="Full Name"
                                placeholder="Enter your full name"
                                leftIcon={<User size={18} className="text-gray-400" />}
                                error={errors.fullName?.message}
                                className="!bg-gray-50/50 !border-gray-200 focus:!bg-white focus:!border-amber-400/50 transition-all"
                            />

                            {/* Email */}
                            <Input
                                {...register('email')}
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                leftIcon={<Mail size={18} className="text-gray-400" />}
                                error={errors.email?.message}
                                className="!bg-gray-50/50 !border-gray-200 focus:!bg-white focus:!border-amber-400/50 transition-all"
                            />

                            {/* Phone */}
                            <Input
                                {...register('phone')}
                                type="tel"
                                label="Phone Number (Optional)"
                                placeholder="Enter your phone"
                                leftIcon={<Phone size={18} className="text-gray-400" />}
                                error={errors.phone?.message}
                                className="!bg-gray-50/50 !border-gray-200 focus:!bg-white focus:!border-amber-400/50 transition-all"
                            />

                            {/* Password */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                                <div className="relative">
                                    <Input
                                        {...register('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a password"
                                        leftIcon={<Lock size={18} className="text-gray-400" />}
                                        error={errors.password?.message}
                                        className="!bg-gray-50/50 !border-gray-200 focus:!bg-white focus:!border-amber-400/50 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {password && (
                                    <div className="flex gap-1 mt-1.5 px-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={cn(
                                                    'h-1 flex-1 rounded-full transition-all duration-500',
                                                    level <= passwordStrength.score
                                                        ? `bg-[${passwordStrength.color}]`
                                                        : 'bg-gray-100'
                                                )}
                                                style={{
                                                    backgroundColor:
                                                        level <= passwordStrength.score
                                                            ? passwordStrength.color
                                                            : undefined,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="pt-2">
                                <Checkbox
                                    {...register('terms')}
                                    id="terms"
                                    className="mt-1"
                                    label={
                                        <span className="text-sm text-gray-500 leading-snug">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-amber-600 hover:underline">Terms of Service</Link>
                                            {' '}and{' '}
                                            <Link href="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>
                                        </span>
                                    }
                                />
                                {errors.terms && (
                                    <p className="mt-1 text-xs text-red-500 ml-8">
                                        {errors.terms.message}
                                    </p>
                                )}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-2">
                                    <X size={16} />
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                isLoading={isLoading}
                                className="!bg-gradient-to-r !from-amber-500 !to-orange-500 !text-white !font-bold !h-12 !rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all mt-4"
                            >
                                Create My Account 💛
                            </Button>
                        </form>

                        <div className="mt-6 text-center pb-4">
                            <p className="text-gray-500 text-sm">
                                Already have an account?{' '}
                                <button
                                    onClick={handleLoginClick}
                                    className="text-amber-600 font-bold hover:text-amber-700 hover:underline transition-colors"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
