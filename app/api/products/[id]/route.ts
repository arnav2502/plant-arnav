import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}
