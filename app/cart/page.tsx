'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/cart');
    const json = await res.json();
    setItems(json.items || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const total = useMemo(() => items.reduce((s, x) => s + x.productId.price * x.quantity, 0), [items]);

  const updateQty = async (productId: string, quantity: number) => {
    await fetch('/api/cart', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId, quantity }) });
    load();
  };

  const remove = async (productId: string) => {
    await fetch('/api/cart', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) });
    load();
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {items.length === 0 ? <p>Your cart is empty.</p> : items.map((x) => (
        <div key={x.productId._id} className="flex items-center justify-between rounded border bg-white p-4">
          <div>
            <h3 className="font-semibold">{x.productId.name}</h3>
            <p>${x.productId.price} × {x.quantity}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => updateQty(x.productId._id, x.quantity - 1)} className="rounded border px-2">-</button>
            <button onClick={() => updateQty(x.productId._id, x.quantity + 1)} className="rounded border px-2">+</button>
            <button onClick={() => remove(x.productId._id)} className="rounded border px-2 text-red-500">Remove</button>
          </div>
        </div>
      ))}
      <div className="rounded border bg-white p-4 font-semibold">Total: ${total.toFixed(2)}</div>
      {items.length > 0 && <Link href="/checkout" className="inline-block rounded bg-brand px-4 py-2 text-white">Proceed to checkout</Link>}
    </div>
  );
}
