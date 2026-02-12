'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Home, Briefcase, Star, Edit2, Trash2, Phone, MoreVertical } from 'lucide-react';
import { userAPI } from '@/src/lib/api';
import { Address } from '@/src/types';
import Button from '@/src/components/ui/Button';
import { AddressModal } from '@/src/components/account/AddressModal';
import { ConfirmModal } from '@/src/components/ui/Modal';

const typeIcons: Record<string, React.ReactNode> = {
    home: <Home size={16} />,
    office: <Briefcase size={16} />,
    other: <MapPin size={16} />,
};

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editAddress, setEditAddress] = useState<Address | null>(null);
    const [deleteAddress, setDeleteAddress] = useState<Address | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchAddresses = async () => {
        setIsLoading(true);
        try {
            const data = await userAPI.getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleEdit = (address: Address) => {
        setEditAddress(address);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditAddress(null);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteAddress) return;
        setIsDeleting(true);
        try {
            await userAPI.deleteAddress(deleteAddress.id);
            setDeleteAddress(null);
            fetchAddresses();
        } catch (error) {
            console.error('Failed to delete address:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSuccess = () => {
        fetchAddresses();
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="h-7 bg-gray-200 rounded w-44 animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded-lg w-36 animate-pulse" />
                </div>
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
                                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-3/4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">Manage Addresses</h2>
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleAdd}
                    leftIcon={<Plus size={18} />}
                >
                    Add Address
                </Button>
            </div>

            {/* Address Cards */}
            {addresses.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-[var(--color-amber-light)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin size={36} className="text-[var(--color-amber)]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Addresses Saved</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Add a delivery address to make checkout faster and easier.
                    </p>
                    <Button variant="primary" onClick={handleAdd} leftIcon={<Plus size={16} />}>
                        Add Your First Address
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            className={`bg-white rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-md relative group ${address.isDefault
                                ? 'border-[var(--color-amber)] shadow-sm'
                                : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {/* Default Badge */}
                            {address.isDefault && (
                                <div className="absolute -top-3 left-4">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[var(--color-amber)] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        <Star size={10} className="fill-white" />
                                        Default
                                    </span>
                                </div>
                            )}

                            <div className="flex items-start gap-4">
                                {/* Type Icon */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${address.isDefault
                                    ? 'bg-[var(--color-amber-light)] text-[var(--color-amber-dark)]'
                                    : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    {typeIcons[address.type] || <MapPin size={16} />}
                                </div>

                                {/* Address Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-bold text-gray-900 uppercase">
                                            {address.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {address.addressLine1}
                                    </p>
                                    {address.addressLine2 && (
                                        <p className="text-sm text-gray-500">{address.addressLine2}</p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {address.city}, {address.state} - {address.postalCode}
                                    </p>
                                    {address.contactNumber && (
                                        <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                                            <Phone size={13} className="text-gray-400" />
                                            {address.contactNumber}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => handleEdit(address)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-amber-dark)] hover:text-[var(--color-amber)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--color-amber-light)]"
                                >
                                    <Edit2 size={14} />
                                    Edit
                                </button>
                                {!address.isDefault && (
                                    <button
                                        onClick={() => setDeleteAddress(address)}
                                        className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Add New Card */}
                    <button
                        onClick={handleAdd}
                        className="rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center gap-3 hover:border-[var(--color-amber)] hover:bg-[var(--color-amber-light)]/20 transition-all duration-200 group min-h-[200px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[var(--color-amber-light)] transition-colors">
                            <Plus size={24} className="text-gray-400 group-hover:text-[var(--color-amber-dark)] transition-colors" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-[var(--color-amber-dark)] transition-colors">
                            Add New Address
                        </p>
                    </button>
                </div>
            )}

            {/* Address Modal */}
            <AddressModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditAddress(null);
                }}
                onSuccess={handleSuccess}
                editAddress={editAddress}
            />

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={!!deleteAddress}
                onClose={() => setDeleteAddress(null)}
                onConfirm={handleDelete}
                title="Delete Address"
                message="Are you sure you want to delete this address? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                isLoading={isDeleting}
            />
        </div>
    );
}
