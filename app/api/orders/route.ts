import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Cart } from '@/models/Cart';
import { Order } from '@/models/Order';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();

  const query = session.user.role === 'admin' ? {} : { userId: session.user.id };
  const orders = await Order.find(query).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { address, paymentMethod } = await req.json();

  await connectDB();
  const cart = await Cart.findOne({ userId: session.user.id }).populate('items.productId');
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: 'Cart empty' }, { status: 400 });

  const products = cart.items.map((x: any) => ({
    productId: x.productId._id,
    name: x.productId.name,
    price: x.productId.price,
    quantity: x.quantity
  }));
  const totalPrice = products.reduce((s: number, p: any) => s + p.price * p.quantity, 0);

  const order = await Order.create({
    userId: session.user.id,
    products,
    totalPrice,
    status: 'Pending',
    address,
    paymentMethod
  });

  cart.items = [];
  await cart.save();

  return NextResponse.json(order);
}
