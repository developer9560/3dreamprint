// My Account Page
import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function AccountPage() {
    const orders = [
        { id: 'ORD-2024-001', date: '2024-02-05', total: 1299, status: 'Delivered', items: 1 },
        { id: 'ORD-2024-002', date: '2024-01-28', total: 798, status: 'In Transit', items: 2 },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-cream)] py-12">
            <div className="container max-w-6xl">
                <h1 className="text-4xl font-bold text-[var(--color-text)] mb-8">My Account</h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card padding="md">
                            <nav className="space-y-2">
                                {['Profile', 'Orders', 'Addresses', 'Settings'].map((item) => (
                                    <button
                                        key={item}
                                        className={`w-full text-left px-4 py-3 rounded-soft transition-colors ${item === 'Orders'
                                                ? 'bg-[var(--color-amber)] text-white font-semibold'
                                                : 'hover:bg-[var(--color-amber-light)]/30 text-[var(--color-text-secondary)]'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </nav>
                        </Card>
                    </div>

                    {/* Main Content - Orders */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card padding="lg">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Recent Orders</h2>
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="border-2 border-[var(--color-gray-border)] rounded-card p-6 hover:border-[var(--color-amber)] transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="font-bold text-[var(--color-text)] mb-1">{order.id}</p>
                                                <p className="text-sm text-[var(--color-text-secondary)]">Placed on {order.date}</p>
                                            </div>
                                            <Badge variant={order.status === 'Delivered' ? 'success' : 'primary'}>
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-[var(--color-text-secondary)]">{order.items} item(s)</p>
                                                <p className="text-lg font-bold text-[var(--color-amber)]">₹{order.total.toLocaleString()}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button variant="outline" size="sm">View Details</Button>
                                                {order.status === 'Delivered' && (
                                                    <Button variant="primary" size="sm">Reorder</Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
