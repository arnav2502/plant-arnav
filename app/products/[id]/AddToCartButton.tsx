'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const add = async () => {
    setLoading(true);
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    setLoading(false);
    if (res.ok) toast.success('Added to cart');
    else toast.error('Login first');
  };

  return (
    <button onClick={add} disabled={loading} className="rounded-md bg-brand px-5 py-3 font-semibold text-white">
      {loading ? 'Adding...' : 'Add to cart'}
    </button>
  );
}
