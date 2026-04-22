import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/products/${product._id}`} className="overflow-hidden rounded-lg border bg-white">
      <div className="relative h-52 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs uppercase text-slate-500">{product.category}</p>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="font-bold text-brand">${product.price}</p>
      </div>
    </Link>
  );
}
