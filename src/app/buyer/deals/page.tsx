"use client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";
import { useSearchParams, useRouter } from "next/navigation";

async function fetchInventory() {
  const res = await fetch("/api/inventory");
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

export default function DealsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");

  function handleClaim(product: any, qty: number) {
    addToCart({ ...product, quantity: qty });
    alert(`Added ${qty} × ${product.product_name} to cart!`);
  }

  const filtered = category && data ? data.filter((p: any) => p.category === category) : data;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Deals</h1>
      <p className="mb-6 text-black">Browse and claim near-expiry products at exclusive discounts.</p>
      {category && (
        <div className="mb-4 flex items-center gap-4">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">Category: {category}</span>
          <button
            className="text-sm underline text-blue-700 hover:text-blue-900"
            onClick={() => router.push("/buyer/deals")}
          >
            Clear Filter
          </button>
        </div>
      )}
      {isLoading && <div>Loading deals...</div>}
      {error && <div className="text-red-600">Error loading deals.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered && filtered.map((product: any) => (
          <ProductCard
            key={product.id}
            {...product}
            discountedPrice={Math.round(product.price * 0.7)}
            min_quantity={product.min_quantity}
            onClaim={(qty) => handleClaim(product, qty)}
          />
        ))}
        {filtered && filtered.length === 0 && (
          <div className="col-span-full text-black text-lg">No deals found for this category.</div>
        )}
      </div>
    </main>
  );
} 