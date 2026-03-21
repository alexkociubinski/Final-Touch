# Final Touch Storefront

A premium, high-performance e-commerce storefront for sports decals, built with Next.js 14+ (App Router), Tailwind CSS v4, Stripe, and Resend.

## Features

- **Decal Engine**: Dynamic shop with category filtering (Flags, Crosses, Numbers, Symbols).
- **Cart System**: Persistence via LocalStorage, slide-out drawer, and full-page cart view.
- **Stripe Integration**: Secure checkout with shipping address collection and success/cancel redirects.
- **Resend Notifications**: Automated order confirmations and server-action powered contact/athlete forms.
- **Premium UI**: Minimalist sports aesthetic with Geist/Space Grotesk typography and slate blue accents.
- **Responsive Design**: Optimized for mobile performance and accessibility.

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Email**: [Resend](https://resend.com/)
- **State Management**: React Context (Cart)

## Getting Started

1. **Clone and Install**:
```bash
npm install
```

2. **Environment Variables**:
Create a `.env.local` file based on `.env.local.example`:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Run Dev Server**:
```bash
npm run dev
```

4. **Stripe Webhooks (Local)**:
Use the Stripe CLI to forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Deployment

Optimized for **Vercel**. 
- Connect your GitHub repository.
- Add environment variables in Vercel project settings.
- Updates to `main` will trigger automatic deployments.

## Project Structure

- `src/app`: App Router pages and API routes.
- `src/components`: Shared UI components (Navbar, Footer, CartDrawer, etc.).
- `src/lib`: Logic for Stripe, Resend, and utility functions.
- `src/data`: Seeded product data and TypeScript interfaces.
- `src/context`: Cart state management.

---
Built with Detail. Built for Performance. **Final Touch.**
