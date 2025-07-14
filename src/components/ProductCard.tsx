import React, { useState } from "react";
import Image from "next/image";

type ProductCardProps = {
  product_name: string;
  image: string;
  price: number;
  discountedPrice?: number;
  expiry_date: string;
  quantity: number;
  min_quantity?: number;
  onClaim?: (quantity: number) => void;
};

export default function ProductCard({
  product_name,
  image,
  price,
  discountedPrice,
  expiry_date,
  quantity,
  min_quantity = 1,
  onClaim,
}: ProductCardProps) {
  const expiryInDays = Math.ceil((new Date(expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const [selectedQty, setSelectedQty] = useState(min_quantity);
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col w-80 gap-2 hover:shadow-lg transition">
      <div className="relative h-36 w-full mb-2 rounded-lg overflow-hidden">
        <Image src={image} alt={product_name} fill className="object-cover" />
      </div>
      <h2 className="text-xl font-bold mb-1 text-black">{product_name}</h2>
      <div className="flex items-center gap-2 mb-1">
        {discountedPrice ? (
          <>
            <span className="text-2xl font-bold text-green-600">₹{discountedPrice}</span>
            <span className="line-through text-gray-400 text-lg">₹{price}</span>
          </>
        ) : (
          <span className="text-2xl font-bold">₹{price}</span>
        )}
      </div>
      <div className="text-sm text-black mb-1">Expiry in <span className="font-semibold">{expiryInDays} days</span></div>
      <div className="text-sm text-black mb-2">Quantity left: <span className="font-semibold">{quantity}</span></div>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-black font-medium">Qty:</label>
        <input
          type="number"
          min={min_quantity}
          max={quantity}
          value={selectedQty}
          onChange={e => setSelectedQty(Math.max(min_quantity, Math.min(quantity, Number(e.target.value))))}
          className="w-20 border rounded px-2 py-1 text-black"
          disabled={quantity === 0}
        />
      </div>
      <div className="text-xs text-gray-500 mb-2">Min. buy: {min_quantity}</div>
      <button
        className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-base hover:bg-blue-700 transition shadow"
        onClick={() => onClaim && onClaim(selectedQty)}
        disabled={quantity === 0}
      >
        {quantity === 0 ? "Out of Stock" : "Claim Now"}
      </button>
    </div>
  );
} 