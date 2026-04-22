'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) {
      toast.success('Logged in');
      router.push('/');
    } else toast.error('Invalid credentials');
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-brand py-2 text-white">{loading ? 'Loading...' : 'Login'}</button>
      </form>
      <button onClick={() => signIn('google')} className="mt-3 w-full rounded border py-2">Continue with Google</button>
      <p className="mt-3 text-sm">No account? <Link className="text-brand" href="/auth/signup">Sign up</Link></p>
    </div>
  );
}
