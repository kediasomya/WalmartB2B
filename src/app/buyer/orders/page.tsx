"use client";
import { useOrders } from "@/components/OrderContext";
import Image from "next/image";

export default function OrdersPage() {
  const { orders, clearOrders } = useOrders();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Order History</h1>
      {orders.length === 0 ? (
        <div className="text-lg text-gray-600">You have no past orders.</div>
      ) : (
        <>
          <ul className="space-y-8 mb-8">
            {orders.map((order) => (
              <li key={order.id} className="bg-white rounded-2xl shadow p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-semibold text-lg text-gray-900">Order #{order.id}</div>
                  <div className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</div>
                </div>
                <div className="mb-2 text-base">Total: <span className="font-bold">₹{order.total}</span></div>
                <ul className="pl-4 list-disc space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 text-base">
                      {item.image && (
                        <div className="relative h-10 w-10 rounded overflow-hidden">
                          <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                        </div>
                      )}
                      <span className="font-medium">{item.product_name}</span> × {item.quantity} @ ₹{item.discountedPrice ?? item.price} each
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button className="text-base underline text-gray-600 hover:text-blue-700" onClick={clearOrders}>Clear Order History</button>
        </>
      )}
    </main>
  );
} 