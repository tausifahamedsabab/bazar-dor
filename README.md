# 🛒 বাজার দর (BazarDor)

BazarDor is a Bangla market-price tracking web app where users can browse daily essential product prices, compare market-wise rates, explore category-based price changes, and sign in to view protected product details.

## Technologies Used

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Better Auth** (email/password + Google + GitHub)
- **react-hot-toast**

## Key Features

1. **Responsive market dashboard** - Home page shows top price risers, top price fallers, and all products in a responsive grid with loading skeletons.
2. **Category browsing with sorting** - Category pages include sort options (ডিফল্ট, দাম: কম থেকে বেশি, দাম: বেশি থেকে কম), loading state, and empty/invalid-state CTA.
3. **Protected product details** - `/product/[slug]` requires login and shows summary, min/max/average price, and market-wise price table.
4. **Authentication** - Sign in/sign up with email-password and social login (Google/GitHub), toast feedback, session-aware navbar, and sign out.
5. **Profile update** - Logged-in users can view profile and update their name via Better Auth `updateUser`.

## Environment Variables

Create `.env.local`:

```bash
API_BASE_URL=your_api_base_url
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- Auth currently uses Better Auth **memory adapter** for local development. For production/Vercel, switch to a persistent database adapter (Prisma/Drizzle/Kysely/MongoDB).
- Make sure OAuth callback URLs are configured in Google/GitHub consoles for your `BETTER_AUTH_URL`.
