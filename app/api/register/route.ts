import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectDB();
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });

    const hashed = await hash(password, 10);
    await User.create({ name, email, password: hashed, role: 'user' });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
