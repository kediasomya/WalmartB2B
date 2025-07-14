import React, { createContext, useContext, useState, ReactNode } from "react";
import type { CartItem } from "./CartContext";

export type Order = {
  id: string;
  items: CartItem[];
  date: string;
  total: number;
};

type OrderContextType = {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number) => void;
  clearOrders: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartItem[], total: number) => {
    setOrders((prev) => [
      {
        id: Date.now().toString(),
        items,
        date: new Date().toISOString(),
        total,
      },
      ...prev,
    ]);
  };

  const clearOrders = () => setOrders([]);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within an OrderProvider");
  return ctx;
} 