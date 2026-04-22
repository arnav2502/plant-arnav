import { compare } from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from './db';
import { User } from '@/models/User';

export const authOptions: AuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;
        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        } as any;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      if (account?.provider === 'google' && user.email) {
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({
            name: user.name || 'Google User',
            email: user.email,
            image: user.image,
            role: 'user'
          });
        }
      }
      return true;
    },
    async jwt({ token }) {
      if (token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: { signIn: '/auth/login' },
  secret: process.env.NEXTAUTH_SECRET
};
