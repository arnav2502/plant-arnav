import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Cart } from '@/models/Cart';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const cart = await Cart.findOne({ userId: session.user.id }).populate('items.productId');
  return NextResponse.json(cart || { items: [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, quantity } = await req.json();
  await connectDB();

  let cart = await Cart.findOne({ userId: session.user.id });
  if (!cart) cart = await Cart.create({ userId: session.user.id, items: [] });

  const existing = cart.items.find((x: any) => x.productId.toString() === productId);
  if (existing) existing.quantity += quantity;
  else cart.items.push({ productId, quantity });

  await cart.save();
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { productId, quantity } = await req.json();

  await connectDB();
  const cart = await Cart.findOne({ userId: session.user.id });
  if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 });

  const item = cart.items.find((x: any) => x.productId.toString() === productId);
  if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  item.quantity = Math.max(1, quantity);
  await cart.save();
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { productId } = await req.json();

  await connectDB();
  const cart = await Cart.findOne({ userId: session.user.id });
  if (!cart) return NextResponse.json({ ok: true });
  cart.items = cart.items.filter((x: any) => x.productId.toString() !== productId);
  await cart.save();

  return NextResponse.json({ ok: true });
}
