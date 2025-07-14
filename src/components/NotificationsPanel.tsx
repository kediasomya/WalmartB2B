import React, { useState } from "react";
import { useToast } from './ToastContext';

type Product = {
  id: string;
  product_name: string;
  expiry_date: string;
};

const segments = ["NGO", "Restaurant", "Vendor"];

const defaultMessage = (product: Product, segment: string) =>
  `Deal Alert for ${segment}s: ${product.product_name} expiring on ${product.expiry_date} now at heavy discount! Claim now.`;

type Props = {
  products: Product[];
};

export default function NotificationsPanel({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [segment, setSegment] = useState<string>(segments[0]);
  const [message, setMessage] = useState<string>("");
  const { showToast } = useToast();

  function handleProductChange(id: string) {
    const prod = products.find((p) => p.id === id) || null;
    setSelectedProduct(prod);
    if (prod) setMessage(defaultMessage(prod, segment));
  }

  function handleSegmentChange(seg: string) {
    setSegment(seg);
    if (selectedProduct) setMessage(defaultMessage(selectedProduct, seg));
  }

  function handleSend() {
    showToast(`Notification sent to ${segment}s!`);
    setSelectedProduct(null);
    setMessage("");
  }

  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-2">Send Notifications</h3>
      <div className="mb-2">
        <label className="mr-2">Product:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedProduct?.id || ""}
          onChange={(e) => handleProductChange(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.product_name} (exp: {p.expiry_date})</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="mr-2">Segment:</label>
        <select
          className="border rounded px-2 py-1"
          value={segment}
          onChange={(e) => handleSegmentChange(e.target.value)}
        >
          {segments.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Message Preview:</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={!selectedProduct || !message}
        onClick={handleSend}
      >
        Send Notification
      </button>
    </div>
  );
} 