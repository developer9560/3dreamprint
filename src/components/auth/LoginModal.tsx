'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, Check, X, ArrowRight, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuthStore } from '@/src/store/authStore';
import { Modal } from '@/src/components/ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

// Validation Schema
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginModal = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login, isLoading, error, isLoginOpen, closeLogin, openSignup } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login({
                email: data.email,
                password: data.password,
            });

            toast.success('Welcome back!');
            closeLogin();

        } catch {
            // Error is handled by store
        }
    };

    const handleSignupClick = () => {
        closeLogin();
        openSignup();
    };

    return (
        <Modal
            isOpen={isLoginOpen}
            onClose={closeLogin}
            size="full"
            showClose={false}
            className="p-0 overflow-hidden max-w-[900px] rounded-2xl md:rounded-3xl !bg-[#FAFAFA] border border-white/50 shadow-2xl mx-auto"
        >
            <div className="flex flex-col md:flex-row min-h-[450px] md:min-h-[550px] max-h-[85vh] overflow-y-auto custom-scrollbar">
                {/* Left Panel - Emotional / Visual (Hidden on mobile) */}
                <div className="hidden md:flex w-full md:w-5/12 relative bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden flex-col justify-between p-8 md:p-12">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    {/* Floating Particles (CSS Animation) */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/40 rounded-full animate-pulse" />
                        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-orange-400/30 rounded-full animate-bounce duration-[3000ms]" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center shadow-sm mb-8">
                            <Heart className="text-amber-500 fill-amber-500/20" size={24} />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-[family-name:var(--font-heading)] leading-tight mb-4">
                            Welcome Back to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Memories</span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Sign in to continue creating glowing 3D moments that last a lifetime.
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-500 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/50">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }} />
                                ))}
                            </div>
                            <span>Trusted by 5,000+ happy customers</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative">
                    {/* Close Button */}
                    <button
                        onClick={closeLogin}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h3>
                            <p className="text-gray-500">Please enter your details to access your account.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                                <Input
                                    {...register('email')}
                                    type="email"
                                    placeholder="john@example.com"
                                    leftIcon={<Mail size={18} className="text-gray-400" />}
                                    error={errors.email?.message}
                                    className="!bg-gray-50/50 !border-gray-200 focus:!bg-white focus:!border-amber-400/50 transition-all h-12"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                                <div className="relative">
                                    <Input
                                        {...register('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        leftIcon={<Lock size={18} className="text-gray-400" />}
                                        error={errors.password?.message}
                                        className="!bg-gray-50/50 !border-gray-200 focus:!bg-white focus:!border-amber-400/50 transition-all h-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
                                    <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    onClick={closeLogin}
                                    className="text-sm text-amber-600 font-medium hover:text-amber-700 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-start gap-3 animate-fadeIn">
                                    <X size={16} className="mt-0.5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                isLoading={isLoading}
                                className="!bg-gradient-to-r !from-amber-500 !to-orange-500 !text-white !font-bold !h-12 !rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    Sign In ✨
                                </span>
                            </Button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-400 text-xs uppercase tracking-wider">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                                    <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
                                    <span className="text-sm font-medium text-gray-600">Google</span>
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                                    <FontAwesomeIcon icon={faApple} className="text-gray-900" />
                                    <span className="text-sm font-medium text-gray-600">Apple</span>
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                Don't have an account?{' '}
                                <button
                                    onClick={handleSignupClick}
                                    className="text-amber-600 font-bold hover:text-amber-700 hover:underline transition-colors"
                                >
                                    Create one
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Security Badge */}
                    {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-400 opacity-60">
                        <Lock size={12} />
                        <span>256-bit Secure Encryption</span>
                    </div> */}
                </div>
            </div>
        </Modal>
    );
};
