'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, Edit2 } from 'lucide-react';
import { useAuthStore } from '@/src/store/authStore';
import { userAPI } from '@/src/lib/api';
import Button from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';

export default function ProfilePage() {
    const { user, setUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            await userAPI.updateProfile({
                fullName: formData.fullName,
                phone: formData.phone,
            });
            // Update local user state
            if (user) {
                setUser({ ...user, fullName: formData.fullName, phone: formData.phone });
            }
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
        setIsEditing(false);
        setMessage(null);
    };

    return (
        <div className="space-y-6">
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[var(--color-amber)] via-[var(--color-amber-dark)] to-[var(--color-amber)] h-32 relative">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                </div>
                <div className="px-6 pb-6 relative">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                            <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-dark)] rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">
                                    {user?.fullName?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 pt-2">
                            <h2 className="text-2xl font-bold text-gray-900">{user?.fullName || 'User'}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                        </div>
                        <div className="sm:self-center">
                            {!isEditing ? (
                                <Button
                                    variant="outline"
                                    size="md"
                                    onClick={() => setIsEditing(true)}
                                    leftIcon={<Edit2 size={16} />}
                                >
                                    Edit Profile
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    {isEditing && (
                        <span className="text-xs text-[var(--color-amber-dark)] bg-[var(--color-amber-light)] px-3 py-1 rounded-full font-medium">
                            Editing
                        </span>
                    )}
                </div>

                <div className="space-y-5">
                    {/* Full Name */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500 pt-3">
                            <User size={16} />
                            Full Name
                        </label>
                        <div className="md:col-span-2">
                            {isEditing ? (
                                <Input
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Enter your full name"
                                />
                            ) : (
                                <p className="text-gray-900 font-medium py-3 px-4 bg-gray-50 rounded-lg">
                                    {user?.fullName || '—'}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500 pt-3">
                            <Mail size={16} />
                            Email Address
                        </label>
                        <div className="md:col-span-2">
                            <p className="text-gray-900 font-medium py-3 px-4 bg-gray-50 rounded-lg flex items-center justify-between">
                                {user?.email || '—'}
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                    {user?.isEmailVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500 pt-3">
                            <Phone size={16} />
                            Phone Number
                        </label>
                        <div className="md:col-span-2">
                            {isEditing ? (
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Enter your phone number"
                                    type="tel"
                                />
                            ) : (
                                <p className="text-gray-900 font-medium py-3 px-4 bg-gray-50 rounded-lg">
                                    {user?.phone ? `+91 ${user.phone}` : '—'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            isLoading={isSaving}
                            leftIcon={<Save size={16} />}
                        >
                            Save Changes
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>

            {/* Account Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Account Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Account Type</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{user?.role?.toLowerCase() || 'User'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Member Since</p>
                        <p className="text-sm font-semibold text-gray-900">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '—'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
