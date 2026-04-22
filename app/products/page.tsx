import ProductCard from '@/components/ProductCard';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string; search?: string; min?: string; max?: string } }) {
  await connectDB();
  const query: any = {};
  if (searchParams.category) query.category = searchParams.category;
  if (searchParams.search) query.name = { $regex: searchParams.search, $options: 'i' };
  if (searchParams.min || searchParams.max) {
    query.price = {};
    if (searchParams.min) query.price.$gte = Number(searchParams.min);
    if (searchParams.max) query.price.$lte = Number(searchParams.max);
  }

  const products = await Product.find(query).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">All Products</h1>
      <div className="mb-4 rounded-md border bg-white p-4 text-sm">Use navbar search + query params for filters: <code>?category=Electronics&min=10&max=200</code></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p: any) => <ProductCard key={String(p._id)} product={JSON.parse(JSON.stringify(p))} />)}
      </div>
    </div>
  );
}
