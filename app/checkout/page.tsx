'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [form, setForm] = useState({ fullName: '', line1: '', city: '', state: '', zip: '', country: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: form, paymentMethod })
    });
    setLoading(false);
    if (res.ok) {
      toast.success(paymentMethod === 'ONLINE' ? 'Dummy payment successful' : 'Order placed');
      router.push('/orders');
    } else toast.error('Checkout failed');
  };

  return (
    <form onSubmit={placeOrder} className="mx-auto max-w-2xl space-y-4 rounded border bg-white p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            className="rounded border p-2"
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
          />
        ))}
      </div>
      <div className="space-y-1">
        <p className="font-medium">Payment Method</p>
        <label className="mr-4"><input type="radio" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} /> COD</label>
        <label><input type="radio" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} /> Dummy Online Payment</label>
      </div>
      <button disabled={loading} className="rounded bg-brand px-5 py-2 text-white">{loading ? 'Placing...' : 'Place order'}</button>
    </form>
  );
}
