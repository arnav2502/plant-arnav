'use client';

import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/orders').then((r) => r.json()).then(setOrders);
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Order History</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="rounded border bg-white p-4">
            <p className="font-semibold">Order #{o._id.slice(-6)} · {o.status}</p>
            <p>Total: ${o.totalPrice}</p>
            <p>Payment: {o.paymentMethod}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
