'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuthStore } from '@/src/store/authStore';
import { Modal } from '@/src/components/ui/Modal';

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

            toast.success('Login successful!');
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
            title="Welcome Back!"
            description="Sign in to continue shopping"
            size="md"
        >
            <div className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        {...register('email')}
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        leftIcon={<Mail size={18} />}
                        error={errors.email?.message}
                        autoComplete="email"
                    />

                    <div className="relative">
                        <Input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            placeholder="Enter your password"
                            leftIcon={<Lock size={18} />}
                            error={errors.password?.message}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div></div>
                        <Link
                            href="/auth/forgot-password"
                            onClick={closeLogin}
                            className="text-sm text-[#10B981] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <button
                        onClick={handleSignupClick}
                        className="text-[#10B981] font-semibold hover:underline"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </Modal>
    );
};
