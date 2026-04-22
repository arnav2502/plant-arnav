import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/Order';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { status } = await req.json();
  await connectDB();
  const order = await Order.findByIdAndUpdate(params.id, { status }, { new: true });
  return NextResponse.json(order);
}
