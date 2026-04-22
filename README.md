# ModernShop - Full E-commerce Website (Next.js + MongoDB)

A complete beginner-friendly e-commerce starter with:
- Next.js App Router
- Tailwind CSS
- MongoDB + Mongoose
- NextAuth (Google + Email/Password)
- User flows (browse, cart, checkout, order history)
- Admin flows (manage products, update order status)

## 1) Features Included

### User Side
- Homepage with hero, categories, and featured products
- Product listing with search and category/price query filters
- Product detail page with Add to Cart
- Cart page: update quantity / remove item / total calculation
- Checkout page with address + COD / dummy online payment
- Login/Signup + Google Sign-in
- Order history page

### Admin Side
- Admin-only routes (`/admin/products`, `/admin/orders`)
- Add/Delete products
- View all orders
- Update order status: Pending / Shipped / Delivered

### UX & Technical Extras
- Responsive design
- Loading states
- Basic error handling + toast notifications
- Next.js SEO metadata in layout
- Optimized images with `next/image`
- Deployment-ready for Vercel

## 2) Folder Structure

```bash
app/
  api/
    auth/[...nextauth]/route.ts
    register/route.ts
    products/route.ts
    products/[id]/route.ts
    cart/route.ts
    orders/route.ts
    admin/products/route.ts
    admin/orders/[id]/route.ts
  admin/products/page.tsx
  admin/orders/page.tsx
  auth/login/page.tsx
  auth/signup/page.tsx
  cart/page.tsx
  checkout/page.tsx
  orders/page.tsx
  products/page.tsx
  products/[id]/page.tsx
components/
lib/
models/
middleware.ts
```

## 3) Database Collections & Schemas

Collections used:
- `users` (`models/User.ts`)
- `products` (`models/Product.ts`)
- `orders` (`models/Order.ts`)
- `carts` (`models/Cart.ts`)

Key fields:
- Products: `name`, `price`, `description`, `image`, `category`, `stock`, `featured`
- Orders: `userId`, `products[]`, `totalPrice`, `status`, `address`, `paymentMethod`

## 4) Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Fill values:

```env
MONGODB_URI=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## 5) Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 6) Admin Login Setup

By default, new users are created with role `user`.
To promote admin in MongoDB:

```js
// in MongoDB shell / Compass
// users collection
{ email: "your@email.com" }
// set role to "admin"
```

## 7) Dummy Payment

Checkout has:
- COD
- Dummy ONLINE mode (no real gateway charge)

If you want Stripe/Razorpay test mode later, integrate in `app/checkout/page.tsx` + `app/api/orders/route.ts`.

## 8) Deploy on Vercel

1. Push this project to GitHub.
2. Import repo in Vercel.
3. Add all env vars in Vercel Project Settings.
4. Deploy.

## 9) Notes

- Product image upload is URL-based in this starter.
- For real upload storage, add Cloudinary/S3.
- Add server-side validation & rate limiting before production launch.
