'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck, ShoppingBag, RefreshCw } from 'lucide-react';
import { orderAPI } from '@/src/lib/api';
import { ROUTES, ORDER_STATUS } from '@/src/lib/constants';
import { formatPrice, formatDate } from '@/src/lib/utils';
import Badge from '@/src/components/ui/Badge';
import Button from '@/src/components/ui/Button';

interface MappedOrder {
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
    items: Array<{
        id: string;
        quantity: number;
        price: number;
        product: {
            name: string;
            images: Array<{ url?: string; imageUrl?: string }>;
        };
    }>;
}

const statusIcons: Record<string, React.ReactNode> = {
    DELIVERED: <CheckCircle size={14} />,
    CANCELLED: <XCircle size={14} />,
    PAYMENT_PENDING: <Clock size={14} />,
    CREATED: <Clock size={14} />,
    SHIPPED: <Truck size={14} />,
    PAID: <Package size={14} />,
};

const statusColors: Record<string, string> = {
    DELIVERED: 'success',
    CANCELLED: 'error',
    PAYMENT_PENDING: 'warning',
    CREATED: 'warning',
    SHIPPED: 'primary',
    PAID: 'primary',
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<MappedOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = async (pageNum: number) => {
        setIsLoading(true);
        try {
            const response = await orderAPI.getMyOrders(pageNum - 1, 10);
            const data = response;
            setOrders((data?.content || data?.orders || []) as unknown as MappedOrder[]);
            setTotalPages(data?.totalPages || 1);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(page);
    }, [page]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-28" />
                            </div>
                            <div className="h-6 bg-gray-200 rounded-full w-24" />
                        </div>
                        <div className="flex gap-3">
                            {[1, 2].map((j) => (
                                <div key={j} className="w-16 h-16 rounded-xl bg-gray-100" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-[var(--color-amber-light)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag size={36} className="text-[var(--color-amber)]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    You haven't placed any orders yet. Explore our collection and find something you love!
                </p>
                <Link href="/users/shop">
                    <Button variant="primary" size="lg">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
                <button
                    onClick={() => fetchOrders(page)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-amber-dark)] transition-colors"
                >
                    <RefreshCw size={14} />
                    Refresh
                </button>
            </div>

            {/* Order Cards */}
            {orders.map((order) => {
                const statusKey = order.status as keyof typeof ORDER_STATUS;
                const statusConfig = ORDER_STATUS[statusKey];
                const displayedItems = order.items.slice(0, 3);
                const remainingItems = order.items.length - 3;

                return (
                    <Link
                        key={order.id}
                        href={ROUTES.ORDER_DETAIL(order.id)}
                        className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[var(--color-amber-light)] transition-all duration-300 group"
                    >
                        {/* Order Header */}
                        <div className="p-4 sm:p-5 border-b border-gray-50 flex flex-wrap gap-3 justify-between items-center bg-gray-50/50">
                            <div className="flex gap-3 items-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 text-gray-400 group-hover:border-[var(--color-amber-light)] group-hover:text-[var(--color-amber)] transition-colors">
                                    <Package size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Order <span className="font-mono text-gray-500">#{order.orderNumber}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Placed on {formatDate(order.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant={(statusColors[order.status] as any) || 'default'}
                                size="sm"
                            >
                                <span className="flex items-center gap-1.5">
                                    {statusIcons[order.status]}
                                    {statusConfig?.label || order.status}
                                </span>
                            </Badge>
                        </div>

                        {/* Order Content */}
                        <div className="p-4 sm:p-5">
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                {/* Item Thumbnails */}
                                <div className="flex items-center gap-2">
                                    {displayedItems.map((item, idx) => {
                                        const imageUrl = item.product?.images?.[0]?.imageUrl || item.product?.images?.[0]?.url;
                                        return (
                                            <div key={idx} className="relative w-14 h-14 rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
                                                {imageUrl ? (
                                                    <Image
                                                        src={imageUrl}
                                                        alt={item.product?.name || 'Product'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Package size={18} />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {remainingItems > 0 && (
                                        <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-semibold">
                                            +{remainingItems}
                                        </div>
                                    )}
                                    <div className="ml-2">
                                        <p className="text-xs text-gray-400">{order.items.length} item(s)</p>
                                    </div>
                                </div>

                                {/* Total & Arrow */}
                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">Total</p>
                                        <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--color-amber-light)] group-hover:text-[var(--color-amber-dark)] transition-all">
                                        <ChevronRight size={16} className="text-gray-400 group-hover:text-[var(--color-amber-dark)] transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-500 px-4">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
