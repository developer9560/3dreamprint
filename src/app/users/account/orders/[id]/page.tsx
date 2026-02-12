'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft, Package, MapPin, CreditCard,
    Clock, CheckCircle, XCircle, Truck, Phone
} from 'lucide-react';
import { orderAPI } from '@/src/lib/api';
import { ROUTES, ORDER_STATUS } from '@/src/lib/constants';
import { formatPrice, formatDate } from '@/src/lib/utils';
import Badge from '@/src/components/ui/Badge';
import Button from '@/src/components/ui/Button';

interface OrderDetail {
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    subtotal: number;
    discount: number;
    deliveryCharges: number;
    createdAt: string;
    updatedAt: string;
    paymentMethod: string;
    paymentStatus: string;
    shippingAddress: {
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        contactNumber?: string;
        type?: string;
    };
    items: Array<{
        id: string;
        productId?: string;
        quantity: number;
        price: number;
        total: number;
        product: {
            id?: number;
            name: string;
            images: Array<{ imageUrl?: string; url?: string }>;
        };
    }>;
    timeline: Array<{
        status: string;
        message: string;
        timestamp: string;
    }>;
}

const statusIcons: Record<string, React.ReactNode> = {
    DELIVERED: <CheckCircle size={16} />,
    CANCELLED: <XCircle size={16} />,
    PAYMENT_PENDING: <Clock size={16} />,
    CREATED: <Clock size={16} />,
    SHIPPED: <Truck size={16} />,
    PAID: <Package size={16} />,
};

const statusColors: Record<string, string> = {
    DELIVERED: 'success',
    CANCELLED: 'error',
    PAYMENT_PENDING: 'warning',
    CREATED: 'warning',
    SHIPPED: 'primary',
    PAID: 'primary',
};

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params?.id as string;

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    const fetchOrder = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await orderAPI.getOrder(Number(orderId));
            setOrder(data as unknown as OrderDetail);
        } catch (err) {
            setError('Failed to load order details. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
                <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-64 mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-xl" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
                                    <div className="h-3 bg-gray-100 rounded w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle size={32} className="text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Order Not Found</h3>
                <p className="text-gray-500 mb-6">{error || 'We couldn\'t find this order.'}</p>
                <Link href={ROUTES.MY_ORDERS}>
                    <Button variant="outline">Back to Orders</Button>
                </Link>
            </div>
        );
    }

    const statusKey = order.status as keyof typeof ORDER_STATUS;
    const statusConfig = ORDER_STATUS[statusKey];

    return (
        <div className="space-y-6">
            {/* Back Button & Order ID */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push(ROUTES.MY_ORDERS)}
                        className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={18} className="text-gray-600" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Order #{order.orderNumber}
                        </h2>
                        <p className="text-xs text-gray-400">Placed on {formatDate(order.createdAt)}</p>
                    </div>
                </div>
                <Badge
                    variant={(statusColors[order.status] as any) || 'default'}
                >
                    <span className="flex items-center gap-1.5">
                        {statusIcons[order.status]}
                        {statusConfig?.label || order.status}
                    </span>
                </Badge>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Package size={18} className="text-[var(--color-amber)]" />
                        Items ({order.items.length})
                    </h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {order.items.map((item, idx) => {
                        const imageUrl = item.product?.images?.[0]?.imageUrl || item.product?.images?.[0]?.url;
                        return (
                            <div key={idx} className="p-5 flex gap-4 items-center hover:bg-gray-50/50 transition-colors">
                                <div className="relative w-20 h-20 rounded-xl border border-gray-100 overflow-hidden bg-gray-50 shrink-0">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={item.product?.name || 'Product'}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Package size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{item.product?.name || 'Product'}</p>
                                    <p className="text-sm text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                    {item.quantity > 1 && (
                                        <p className="text-xs text-gray-400">{formatPrice(item.price)} each</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping Address */}
                {order.shippingAddress && order.shippingAddress.addressLine1 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <MapPin size={18} className="text-[var(--color-amber)]" />
                            Delivery Address
                        </h3>
                        <div className="space-y-2 text-sm">
                            {order.shippingAddress.type && (
                                <span className="inline-block text-xs font-semibold text-[var(--color-amber-dark)] bg-[var(--color-amber-light)] px-2 py-0.5 rounded-full uppercase mb-1">
                                    {order.shippingAddress.type}
                                </span>
                            )}
                            <p className="text-gray-700">{order.shippingAddress.addressLine1}</p>
                            {order.shippingAddress.addressLine2 && (
                                <p className="text-gray-500">{order.shippingAddress.addressLine2}</p>
                            )}
                            <p className="text-gray-500">
                                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                            </p>
                            {order.shippingAddress.contactNumber && (
                                <p className="text-gray-500 flex items-center gap-1.5 pt-1">
                                    <Phone size={14} />
                                    {order.shippingAddress.contactNumber}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <CreditCard size={18} className="text-[var(--color-amber)]" />
                        Order Summary
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="text-gray-700 font-medium">{formatPrice(order.subtotal)}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Discount</span>
                                <span className="text-green-600 font-medium">-{formatPrice(order.discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Delivery</span>
                            <span className="text-gray-700 font-medium">
                                {order.deliveryCharges > 0 ? formatPrice(order.deliveryCharges) : 'Free'}
                            </span>
                        </div>
                        <div className="border-t border-gray-100 pt-3 flex justify-between">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-lg text-gray-900">{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
