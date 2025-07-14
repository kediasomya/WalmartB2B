import React, { useState } from "react";
import { useToast } from './ToastContext';

type DiscountRule = {
  id: string;
  expiryDays: number;
  discount: number;
};

const initialRules: DiscountRule[] = [
  { id: "1", expiryDays: 3, discount: 40 },
  { id: "2", expiryDays: 5, discount: 25 },
];

const mockMLRecommendation = {
  discount: 37,
  reason: "Product expires in 4 days. Regression model suggests 37% discount based on past sell rates."
};

type Product = {
  id: string;
  product_name: string;
  expiry_date: string;
};

type Props = {
  products: Product[];
};

export default function DiscountEngine({ products }: Props) {
  const [rules, setRules] = useState<DiscountRule[]>(initialRules);
  const [editing, setEditing] = useState<DiscountRule | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { showToast } = useToast();

  function handleAddRule() {
    setEditing({ id: Date.now().toString(), expiryDays: 1, discount: 10 });
  }
  function handleEditRule(rule: DiscountRule) {
    setEditing(rule);
  }
  function handleSaveRule(rule: DiscountRule) {
    setRules((prev) => {
      const exists = prev.find((r) => r.id === rule.id);
      if (exists) {
        return prev.map((r) => (r.id === rule.id ? rule : r));
      }
      return [...prev, rule];
    });
    setEditing(null);
    showToast('Rule saved!');
  }
  function handleDeleteRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
    showToast('Rule deleted!');
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-2">Dynamic Discount Engine</h3>
      <table className="min-w-full bg-white rounded shadow text-sm mb-4">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Expiry ≤ (days)</th>
            <th className="px-2 py-1 text-left">Discount (%)</th>
            <th className="px-2 py-1 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td className="px-2 py-1">{rule.expiryDays}</td>
              <td className="px-2 py-1">{rule.discount}</td>
              <td className="px-2 py-1">
                <button className="text-blue-600 mr-2" onClick={() => handleEditRule(rule)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDeleteRule(rule.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4" onClick={handleAddRule}>Add Rule</button>
      {editing && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <div className="mb-2">Edit Rule</div>
          <label className="block mb-1">
            Expiry ≤ (days):
            <input
              type="number"
              className="ml-2 border rounded px-2 py-1 w-20"
              value={editing.expiryDays}
              onChange={e => setEditing({ ...editing, expiryDays: Number(e.target.value) })}
            />
          </label>
          <label className="block mb-2">
            Discount (%):
            <input
              type="number"
              className="ml-2 border rounded px-2 py-1 w-20"
              value={editing.discount}
              onChange={e => setEditing({ ...editing, discount: Number(e.target.value) })}
            />
          </label>
          <button className="bg-green-600 text-white px-3 py-1 rounded mr-2" onClick={() => handleSaveRule(editing)}>Save</button>
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">ML-powered Discount Recommendation</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedProduct?.id || ""}
          onChange={e => {
            const prod = products.find(p => p.id === e.target.value) || null;
            setSelectedProduct(prod);
          }}
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.product_name} (exp: {p.expiry_date})</option>
          ))}
        </select>
        {selectedProduct && (
          <div className="mt-2 p-3 bg-green-50 rounded">
            <div className="font-bold text-green-700">Recommended Discount: {mockMLRecommendation.discount}%</div>
            <div className="text-xs text-gray-700">{mockMLRecommendation.reason}</div>
          </div>
        )}
      </div>
    </div>
  );
} 