"use client";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Groceries", icon: "🥦" },
  { name: "Beverages", icon: "🥤" },
  { name: "Toiletries", icon: "🧻" },
  { name: "Healthcare", icon: "💊" },
  { name: "Cleaning", icon: "🧹" },
];

export default function BuyerHome() {
  const router = useRouter();
  function handleCategoryClick(cat: string) {
    router.push(`/buyer/deals?category=${encodeURIComponent(cat)}`);
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] gap-12">
      <section className="w-full max-w-3xl text-center mt-12">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-800">Quick Use Deals – Near-expiry essentials at heavy discounts</h1>
        <p className="text-lg mb-8 text-black">Save big on groceries, beverages, toiletries, healthcare, and cleaning supplies. All products are quality-checked and ready for quick use by restaurants, vendors, and NGOs.</p>
        <a href="/buyer/deals" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl shadow hover:bg-blue-700 transition">Browse Deals</a>
      </section>
      <section className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-gray-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition cursor-pointer"
            onClick={() => handleCategoryClick(cat.name)}
            aria-label={`Browse ${cat.name}`}
          >
            <span className="text-4xl mb-2">{cat.icon}</span>
            <span className="font-semibold text-lg text-black">{cat.name}</span>
          </button>
        ))}
      </section>
    </main>
  );
} 