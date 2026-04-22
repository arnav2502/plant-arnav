import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';

export default async function HomePage() {
  await connectDB();
  const featured = await Product.find({ featured: true }).limit(8).lean();

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-brand to-emerald-700 p-10 text-white">
        <h1 className="text-4xl font-bold">Everything you need, delivered.</h1>
        <p className="mt-3 max-w-xl">Discover curated products with fast checkout and a smooth shopping experience.</p>
        <Link href="/products" className="mt-6 inline-block rounded-md bg-white px-5 py-2 text-brand">Shop Now</Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Categories</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {['Electronics', 'Clothing', 'Home', 'Beauty'].map((cat) => (
            <Link key={cat} href={`/products?category=${cat}`} className="rounded-lg border bg-white p-6 text-center font-semibold">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Featured Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p: any) => <ProductCard key={String(p._id)} product={JSON.parse(JSON.stringify(p))} />)}
        </div>
      </section>
    </div>
  );
}
