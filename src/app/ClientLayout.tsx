"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { CartProvider } from '@/components/CartContext';
import { OrderProvider } from '@/components/OrderContext';
import { ToastProvider } from '@/components/ToastContext';
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <CartProvider>
          <OrderProvider>
            <div className="min-h-screen bg-gray-50 font-sans text-black">
              <nav className="sticky top-0 z-40 w-full flex items-center gap-8 px-8 py-4 bg-white shadow-sm border-b border-gray-200 mb-8">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700 tracking-tight hover:no-underline">
                  <span>Walmart B2B</span>
                </Link>
                <Link href="/buyer" className="font-medium text-black hover:text-blue-700 transition">Buyer Portal</Link>
                <Link href="/buyer/deals" className="font-medium text-black hover:text-blue-700 transition">Deals</Link>
                <Link href="/buyer/cart" className="font-medium text-black hover:text-blue-700 transition">Cart</Link>
                <Link href="/buyer/orders" className="font-medium text-black hover:text-blue-700 transition">Orders</Link>
                <Link href="/buyer/profile" className="font-medium text-black hover:text-blue-700 transition">Profile</Link>
                <span className="flex-1" />
                <Link href="/admin" className="font-semibold text-blue-600 hover:text-blue-800 transition">Admin</Link>
              </nav>
              <main className="max-w-6xl mx-auto px-4 pb-12 text-black">
                {children}
              </main>
            </div>
          </OrderProvider>
        </CartProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
} 