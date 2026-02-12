'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, MapPin, Plus, CreditCard, Package, Loader2, CheckCircle2 } from 'lucide-react';
import { formatPrice, cn } from '@/src/lib/utils';
import { userAPI, customOrderAPI, orderAPI, paymentAPI } from '@/src/lib/api';
import type { Address } from '@/src/types';
import Button from '@/src/components/ui/Button';
import { AddressModal } from '@/src/components/account/AddressModal';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    customizationData?: {
        uploadedImages: File[];
        imagePreviews: string[];
        shape: string;
        size: string;
        lighting: string;
        specialInstructions: string;
    };
    totalPrice: number;
    productName: string;
    productSkuId: number;
    quantity: number;
}

export function CheckoutModal({
    isOpen,
    onClose,
    customizationData,
    totalPrice,
    productName,
    productSkuId,
    quantity,
}: CheckoutModalProps) {
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Fetch user addresses
    useEffect(() => {
        if (isOpen) {
            fetchAddresses();
        }
    }, [isOpen]);

    const fetchAddresses = async () => {
        setIsLoadingAddresses(true);
        try {
            const data = await userAPI.getAddresses();
            setAddresses(data);

            // Auto-select default address
            const defaultAddr = data.find(addr => addr.isDefault);
            if (defaultAddr) {
                setSelectedAddressId(defaultAddr.id);
            } else if (data.length > 0) {
                setSelectedAddressId(data[0].id);
            }
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        } finally {
            setIsLoadingAddresses(false);
        }
    };

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            alert('Please select a delivery address');
            return;
        }

        setIsPlacingOrder(true);

        try {
            let uploadedImageUrls: string[] = [];

            // Step 1: Upload images to Cloudinary (ONLY if customization data exists)
            if (customizationData && customizationData.uploadedImages.length > 0) {
                uploadedImageUrls = await customOrderAPI.uploadCustomizationImages(
                    customizationData.uploadedImages
                );
                console.log('✅ Images uploaded:', uploadedImageUrls);
            }

            // Step 2: Create order payload matching CreateCustomOrderRequest
            const orderPayload = {
                addressId: parseInt(selectedAddressId),
                productSkuId: productSkuId,
                quantity: quantity,
                // Send customization data ONLY if it exists
                customizationData: customizationData ? {
                    uploadedImageUrls: uploadedImageUrls,
                    selectedShape: customizationData.shape,
                    selectedSize: customizationData.size,
                    selectedLighting: customizationData.lighting,
                    specialInstructions: customizationData.specialInstructions || '',
                } : null,
                paymentMethod: 'razorpay',
            };

            console.log('📦 Creating order:', orderPayload);

            // Step 3: Call POST /api/orders/custom
            const orderResponse = await customOrderAPI.createCustomOrder(orderPayload);
            console.log('✅ Order initiated:', orderResponse);

            const { orderId, razorpayOrderId, totalAmount } = orderResponse;

            // Step 4: Initiate Razorpay Payment
            const options = {
                key: "rzp_live_S9fDinBw9EX5IM",
                amount: totalAmount * 100, // in paise
                currency: "INR",
                name: "3DreamPrint",
                description: `Payment for ${productName}`,
                order_id: razorpayOrderId,
                handler: async (response: any) => {
                    try {
                        const verifyRes = await paymentAPI.verify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyRes.success) {
                            alert('Payment successful! Your order has been placed.');
                            router.push(`/users/account/orders/${orderId}`);
                            onClose();
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        alert('An error occurred during payment verification.');
                    }
                },
                modal: {
                    ondismiss: async () => {
                        console.log('❌ Payment modal dismissed');
                        try {
                            await orderAPI.cancelPayment(String(orderId));
                        } catch (err) {
                            console.error('Failed to cancel order after dismissal:', err);
                        }
                        setIsPlacingOrder(false);
                    }
                },
                prefill: {
                    name: "", // Will be filled by Razorpay if user logged in
                    email: "",
                    contact: "",
                },
                theme: {
                    color: "#f59e0b",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', async (response: any) => {
                console.error('❌ Payment failed:', response.error);
                alert('Payment failed. Your order initiation has been cancelled.');
                try {
                    await orderAPI.cancelPayment(String(orderId));
                } catch (err) {
                    console.error('Failed to cancel order after failure:', err);
                }
                setIsPlacingOrder(false);
            });
            rzp.open();

        } catch (error: any) {
            console.error('❌ Failed to place order:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to place order';
            alert(`Error: ${errorMessage}\n\nPlease try again.`);
            setIsPlacingOrder(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 p-6">
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }} />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Complete Your Order</h2>
                                <p className="text-amber-100 text-sm">Review and confirm details</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Body */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)] space-y-6">
                        {/* Customization Summary - Show ONLY if customizationData exists */}
                        {customizationData && (
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Package size={18} className="text-amber-600" />
                                    Your Customization
                                </h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        {customizationData.imagePreviews.slice(0, 2).map((preview, idx) => (
                                            <div key={idx} className="aspect-square rounded-xl overflow-hidden border-2 border-amber-200">
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                        <div className="bg-white rounded-lg p-2 border border-gray-200">
                                            <p className="text-xs text-gray-500">Shape</p>
                                            <p className="font-semibold text-gray-900 capitalize">{customizationData.shape}</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-2 border border-gray-200">
                                            <p className="text-xs text-gray-500">Size</p>
                                            <p className="font-semibold text-gray-900 capitalize">{customizationData.size}</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-2 border border-gray-200">
                                            <p className="text-xs text-gray-500">Lighting</p>
                                            <p className="font-semibold text-gray-900 capitalize">{customizationData.lighting}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Address Selection */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin size={18} className="text-amber-600" />
                                    Delivery Address
                                </h3>
                                <button
                                    onClick={() => setIsAddressModalOpen(true)}
                                    className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-semibold"
                                >
                                    <Plus size={16} />
                                    Add New
                                </button>
                            </div>

                            {isLoadingAddresses ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                                </div>
                            ) : addresses.length === 0 ? (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                                    <p className="text-sm text-amber-800 mb-3">No saved addresses found</p>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => setIsAddressModalOpen(true)}
                                    >
                                        Add Delivery Address
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {addresses.map((address) => (
                                        <button
                                            key={address.id}
                                            onClick={() => setSelectedAddressId(address.id)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-xl border-2 transition-all",
                                                selectedAddressId === address.id
                                                    ? "border-amber-500 bg-amber-50"
                                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                            )}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="font-bold text-gray-900 capitalize">{address.type}</p>
                                                        {address.isDefault && (
                                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                                                        {address.city}, {address.state} - {address.postalCode}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">Phone: {address.contactNumber}</p>
                                                </div>
                                                {selectedAddressId === address.id && (
                                                    <CheckCircle2 size={20} className="text-amber-600 shrink-0" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Summary */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-200">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <CreditCard size={18} className="text-amber-600" />
                                Payment Summary
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-700">
                                    <span>{productName}</span>
                                    <span className="font-semibold">{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Delivery Charges</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="border-t-2 border-amber-300 pt-2 flex justify-between items-center">
                                    <span className="font-bold text-gray-900 text-base">Total Amount</span>
                                    <span className="text-2xl font-bold text-amber-700">{formatPrice(totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                        <button
                            onClick={handlePlaceOrder}
                            disabled={!selectedAddressId || isPlacingOrder}
                            className={cn(
                                "w-full h-14 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2",
                                "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
                                "hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5",
                                (!selectedAddressId || isPlacingOrder) && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            {isPlacingOrder ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard size={18} />
                                    <span>Proceed to Payment</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSuccess={() => {
                    setIsAddressModalOpen(false);
                    fetchAddresses();
                }}
            />
        </>
    );
}
