import Image from 'next/image';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import AddToCartButton from './AddToCartButton';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();
  if (!product) return notFound();

  const p = JSON.parse(JSON.stringify(product));

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl border bg-white">
        <Image src={p.image} alt={p.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <p className="text-sm uppercase text-slate-500">{p.category}</p>
        <h1 className="text-3xl font-bold">{p.name}</h1>
        <p className="text-2xl font-bold text-brand">${p.price}</p>
        <p className="text-slate-700">{p.description}</p>
        <AddToCartButton productId={p._id} />
      </div>
    </div>
  );
}
