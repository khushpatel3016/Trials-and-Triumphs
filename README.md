# Trials and Triumph

Site URL: (Updated daily) [URL](https://trials-and-triumphs.vercel.app/)

Figma:
https://www.figma.com/design/Q21OYF40ZGowiiioWJGUjQ/trials-and-triumps?node-id=0-1&t=CBdDV4Ik7DN004oJ-1

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Source Code Structure (`/src`)

This section outlines the purpose and significance of the files within the `src` directory to help collaborators understand the project architecture.

### `/app` (Next.js App Router)
- `layout.tsx`: The root layout for the entire application, defining the shared UI (HTML/Body tags) and global providers.
- `globals.css`: Global Tailwind CSS styles and custom fantasy-themed variables.
- `page.tsx`: The landing page of the application (Public).

#### Routes
- `/login/page.tsx`: Entry point for authentication.
- `/register/page.tsx`: Team registration form where users define their team and player names.
- `/select-characters/page.tsx`: Interactive character selection screen.
- `/status/page.tsx`: The final team overview page displaying assigned characters and stats.
- `/auth/callback`: Specialized route to handle Supabase's PKCE auth flow redirects.

### `/components`
- `CharacterCard.tsx`: A reusable UI component used in character selection and team status to display hero information.

### `/lib` (Client-Side Logic)
- `/supabase/client.ts`: Singleton Supabase client for browser-side database and auth operations.
- `characters.ts`: Hardcoded character data and stats.

### `/types`
- `index.ts`: Centralized TypeScript interfaces for Teams, Players, Characters, and Classes to ensure type safety across the app.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
