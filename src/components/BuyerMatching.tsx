import React, { useState } from "react";
import { useToast } from './ToastContext';

type Product = {
  id: string;
  product_name: string;
  sku: string;
  expiry_date: string;
  quantity: number;
  price: number;
  category: string;
};

type BuyerMatch = {
  id: string;
  business_name: string;
  confidence: number;
  reason: string;
};

const mockMatches: BuyerMatch[] = [
  {
    id: "r1",
    business_name: "Sunrise Restaurant",
    confidence: 92,
    reason: "Buys 20L cooking oil every 2 weeks",
  },
  {
    id: "n1",
    business_name: "Helping Hands NGO",
    confidence: 78,
    reason: "Frequently orders bread, high consumption",
  },
  {
    id: "v1",
    business_name: "FreshMart Vendor",
    confidence: 65,
    reason: "Buys beverages in bulk monthly",
  },
];

type Props = {
  products: Product[];
};

export default function BuyerMatching({ products }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, BuyerMatch[]>>({});
  const { showToast } = useToast();

  function handleOverride(productId: string, newMatches: BuyerMatch[]) {
    setOverrides((prev) => ({ ...prev, [productId]: newMatches }));
    setOpenId(null);
    showToast('Suggestions overridden!');
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-2">AI Buyer Matching</h3>
      <table className="min-w-full bg-white rounded shadow text-sm mb-4">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Product</th>
            <th className="px-2 py-1 text-left">SKU</th>
            <th className="px-2 py-1 text-left">Expiry</th>
            <th className="px-2 py-1 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="px-2 py-1">{p.product_name}</td>
              <td className="px-2 py-1">{p.sku}</td>
              <td className="px-2 py-1">{p.expiry_date}</td>
              <td className="px-2 py-1">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => setOpenId(p.id)}
                >
                  View Matches
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setOpenId(null)}
            >
              ×
            </button>
            <h4 className="text-lg font-bold mb-2">Suggested Buyers</h4>
            <ul className="mb-4">
              {(overrides[openId] || mockMatches).map((b) => (
                <li key={b.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{b.business_name}</span>
                    <span className="text-xs text-gray-500">Confidence: {b.confidence}%</span>
                  </div>
                  <div className="text-xs text-gray-600">{b.reason}</div>
                </li>
              ))}
            </ul>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
              onClick={() => handleOverride(openId, mockMatches.slice().reverse())}
            >
              Override Suggestions
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setOpenId(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 