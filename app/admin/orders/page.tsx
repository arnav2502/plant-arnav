'use client';

import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const load = () => fetch('/api/orders').then((r) => r.json()).then(setOrders);

  useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin · Orders</h1>
      {orders.map((o) => (
        <div key={o._id} className="rounded border bg-white p-4">
          <p className="font-semibold">#{o._id.slice(-6)} — ${o.totalPrice}</p>
          <p className="mb-2 text-sm">Current: {o.status}</p>
          <div className="flex gap-2">
            {['Pending', 'Shipped', 'Delivered'].map((s) => (
              <button key={s} onClick={() => updateStatus(o._id, s)} className="rounded border px-2 py-1 text-sm">{s}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
