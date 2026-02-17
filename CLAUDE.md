# CLAUDE.md - Miel Bio E-commerce

## Project Overview

**Type:** E-commerce SPA for artisanal organic honey
**Stack:** React 19 + Vite 6 + TypeScript 5 + Tailwind CSS 3 + Convex 1.31 + Stripe
**Routing:** React Router DOM (BrowserRouter)

---

## Commands

```bash
npm run dev      # Vite + Convex dev servers (parallel)
npm run build    # Vite production build
npm run lint     # TypeScript check + Convex check + build
```

---

## Architecture

```
src/
├── pages/              # Route-level page components
│   ├── Home.tsx        # / — Landing page
│   ├── Products.tsx    # /products — Catalog with category filters
│   ├── ProductDetail.tsx # /products/:slug — Single product
│   ├── CartPage.tsx    # /cart — Full cart page (auth required)
│   ├── Checkout.tsx    # /checkout — Shipping form + order summary
│   └── Success.tsx     # /checkout/success — Order confirmation
├── components/
│   ├── Header.tsx      # Nav bar with React Router Links
│   ├── Cart.tsx        # Mini cart modal (opened from header)
│   ├── CheckoutForm.tsx # Shipping address form
│   ├── ProductList.tsx # Product grid (reused in Home + Products)
│   └── SuccessPage.tsx # Success card (reused in Success page)
├── lib/
│   └── utils.ts        # cn() helper (clsx + tailwind-merge)
├── App.tsx             # Router setup + layout
├── main.tsx            # Entry point (ConvexAuthProvider)
└── index.css           # Tailwind + custom styles

convex/                 # Backend (Convex) — DO NOT MODIFY
├── auth.ts             # loggedInUser query
├── products.ts         # list, getBySlug, create, update
├── categories.ts       # list, seedData
├── cart.ts             # get, add, updateQuantity, remove, clear
├── orders.ts           # list, getById, create, updateStatus, adminList
├── stripe.ts           # createCheckoutSession, handleWebhook
└── schema.ts           # DB schema
```

---

## Routing

| Path | Component | Auth |
|------|-----------|------|
| `/` | Home | No |
| `/products` | Products | No |
| `/products/:slug` | ProductDetail | No |
| `/cart` | CartPage | Yes |
| `/checkout` | Checkout | Yes |
| `/checkout/success` | Success | Yes |
| `/admin` | AdminDashboard | Yes (admin) |

---

## Convex Conventions

- Queries: `useQuery(api.module.functionName, args)`
- Mutations: `useMutation(api.module.functionName)` then call the returned function
- Actions: `useAction(api.module.functionName)` for server-side actions (Stripe)
- Auth: `getAuthUserId(ctx)` server-side, `useConvexAuth()` client-side
- Admin check: `user.email?.includes("admin")`
- IDs: Use `v.id("tableName")` type, cast with `as any` when passing string IDs

---

## Styling

- **Primary color:** `#d97706` (amber-600) — used as `bg-primary`, `text-primary`
- **Hover:** `#b45309` (amber-700) — `bg-primary-hover`
- **Tailwind v3** with custom config in `tailwind.config.js`
- Use `cn()` from `@/lib/utils` for conditional classes
- Amber palette throughout for honey theme

---

## Environment Variables

```env
# .env.local (Vite client)
VITE_CONVEX_URL=https://xxx.convex.cloud

# Convex dashboard (server-side)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
HOSTING_URL=https://your-domain.com   # Used for Stripe redirect URLs
```

---

## Constraints

- No `any` types (except Convex ID casts where unavoidable)
- No `console.log` in production
- No heavy dependencies (lodash, moment, etc.)
- Functional components only
- Mobile-first responsive design
- Convex backend is complete — no modifications needed
