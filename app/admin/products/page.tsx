'use client';

import { useEffect, useState } from 'react';

const initial = { name: '', price: 0, description: '', image: '', category: '', stock: 0, featured: false };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState<any>(initial);

  const load = () => fetch('/api/products').then((r) => r.json()).then(setProducts);
  useEffect(load, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setForm(initial);
    load();
  };

  const del = async (id: string) => {
    await fetch('/api/admin/products', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin · Products</h1>
      <form onSubmit={save} className="grid gap-3 rounded border bg-white p-4 md:grid-cols-2">
        {Object.keys(initial).map((k) => (
          <input key={k} className="rounded border p-2" placeholder={k} value={String(form[k])} onChange={(e) => setForm((p: any) => ({ ...p, [k]: k === 'price' || k === 'stock' ? Number(e.target.value) : e.target.value }))} />
        ))}
        <button className="rounded bg-brand px-4 py-2 text-white">Add product</button>
      </form>
      <div className="space-y-2">
        {products.map((p) => (
          <div key={p._id} className="flex items-center justify-between rounded border bg-white p-3">
            <p>{p.name} (${p.price})</p>
            <button onClick={() => del(p._id)} className="rounded border px-2 text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
