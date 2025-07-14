"use client";
import { useCart } from "@/components/CartContext";
import { useOrders } from "@/components/OrderContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const router = useRouter();
  const total = cart.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.price) * item.quantity,
    0
  );

  function handleCheckout() {
    if (cart.length === 0) return;
    placeOrder(cart, total);
    clearCart();
    alert("Order placed successfully!");
    router.push("/buyer/orders");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Cart & Checkout</h1>
      {cart.length === 0 ? (
        <div className="text-lg text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <ul className="mb-8 space-y-6">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-6 bg-white rounded-xl shadow p-5 border border-gray-200">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                  <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-gray-900">{item.product_name}</div>
                  <div className="text-base">₹{item.discountedPrice ?? item.price} × {item.quantity}</div>
                  <div className="text-xs text-gray-500">Expiry: {item.expiry_date}</div>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="font-bold text-xl mb-6">Total: ₹{total}</div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow" onClick={handleCheckout}>Checkout</button>
          <button className="ml-6 text-base underline text-gray-600 hover:text-blue-700" onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </main>
  );
} 