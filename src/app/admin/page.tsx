"use client";
import { useQuery } from "@tanstack/react-query";
import InventoryUpload from '@/components/InventoryUpload';
import BuyerMatching from '@/components/BuyerMatching';
import DiscountEngine from '@/components/DiscountEngine';
import NotificationsPanel from '@/components/NotificationsPanel';
import { useState } from "react";
import { useToast } from '@/components/ToastContext';

async function fetchInventory() {
  const res = await fetch("/api/inventory");
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

async function fetchBuyers() {
  const res = await fetch("/api/buyers");
  if (!res.ok) throw new Error("Failed to fetch buyers");
  return res.json();
}

type Product = {
  id: string;
  product_name: string;
  sku: string;
  expiry_date: string;
  quantity: number;
  price: number;
  category: string;
};

type Buyer = {
  id: string;
  business_name: string;
  type: string;
  location: string;
  gst_id: string;
};

export default function AdminDashboard() {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  // Always call hooks
  const { data: inventory, isLoading: loadingInventory, error: errorInventory } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });
  const { data: buyers, isLoading: loadingBuyers, error: errorBuyers } = useQuery({
    queryKey: ["buyers"],
    queryFn: fetchBuyers,
  });

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pass === "pass" && key === "key") {
      setIsAuthenticated(true);
      setError("");
      showToast("Admin login successful!");
    } else {
      setError("Invalid password or key");
      showToast("Login failed");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh]">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow p-8 w-full max-w-sm border border-gray-200 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">Admin Login</h1>
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            className="border rounded px-3 py-2 w-full text-black"
            required
          />
          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={e => setKey(e.target.value)}
            className="border rounded px-3 py-2 w-full text-black"
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
        </form>
      </main>
    );
  }

  const totalQuantity = inventory?.reduce((sum: number, p: Product) => sum + p.quantity, 0) ?? 0;

  return (
    <main className="space-y-10">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-gray-500 text-lg mb-1">Near-Expiry Products</div>
          <div className="text-4xl font-extrabold text-blue-700">{inventory ? inventory.length : "-"}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-gray-500 text-lg mb-1">Registered Buyers</div>
          <div className="text-4xl font-extrabold text-blue-700">{buyers ? buyers.length : "-"}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-gray-500 text-lg mb-1">Total Quantity</div>
          <div className="text-4xl font-extrabold text-blue-700">{totalQuantity}</div>
        </div>
      </div>
      <section className="bg-white rounded-2xl shadow p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Inventory</h2>
        {loadingInventory && <div>Loading inventory...</div>}
        {errorInventory && <div className="text-red-600">Error loading inventory.</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Product</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">SKU</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Expiry</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Quantity</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Price</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Category</th>
              </tr>
            </thead>
            <tbody>
              {inventory && inventory.map((p: Product) => (
                <tr key={p.id} className="hover:bg-blue-50">
                  <td className="px-4 py-2">{p.product_name}</td>
                  <td className="px-4 py-2">{p.sku}</td>
                  <td className="px-4 py-2">{p.expiry_date}</td>
                  <td className="px-4 py-2">{p.quantity}</td>
                  <td className="px-4 py-2">₹{p.price}</td>
                  <td className="px-4 py-2">{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-white rounded-2xl shadow p-8 mb-8">
        {inventory && <InventoryUpload />}
      </section>
      <section className="bg-white rounded-2xl shadow p-8 mb-8">
        {inventory && <BuyerMatching products={inventory} />}
      </section>
      <section className="bg-white rounded-2xl shadow p-8 mb-8">
        {inventory && <DiscountEngine products={inventory} />}
      </section>
      <section className="bg-white rounded-2xl shadow p-8 mb-8">
        {inventory && <NotificationsPanel products={inventory} />}
      </section>
      <section className="bg-white rounded-2xl shadow p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Buyers</h2>
        {loadingBuyers && <div>Loading buyers...</div>}
        {errorBuyers && <div className="text-red-600">Error loading buyers.</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Business Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Type</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Location</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">GST ID</th>
              </tr>
            </thead>
            <tbody>
              {buyers && buyers.map((b: Buyer) => (
                <tr key={b.id} className="hover:bg-blue-50">
                  <td className="px-4 py-2">{b.business_name}</td>
                  <td className="px-4 py-2">{b.type}</td>
                  <td className="px-4 py-2">{b.location}</td>
                  <td className="px-4 py-2">{b.gst_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
} 