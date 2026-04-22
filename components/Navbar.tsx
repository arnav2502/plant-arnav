'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data } = useSession();
  const [q, setQ] = useState('');
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(q)}`);
  };

  return (
    <header className="border-b bg-white">
      <div className="container-page flex items-center gap-4 py-4">
        <Link href="/" className="text-xl font-bold text-brand">ModernShop</Link>
        <form onSubmit={submit} className="flex-1">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="w-full rounded-md border px-3 py-2" />
        </form>
        <Link href="/cart">Cart</Link>
        {data?.user ? (
          <div className="flex items-center gap-3 text-sm">
            <Link href="/orders">Orders</Link>
            {data.user.role === 'admin' && <Link href="/admin/products">Admin</Link>}
            <button onClick={() => signOut()} className="rounded bg-slate-800 px-3 py-1 text-white">Logout</button>
          </div>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </div>
    </header>
  );
}
