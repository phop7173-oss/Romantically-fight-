# Romantically-fight-

A production-ready foundation for a romantic couples application built with React, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query, Zustand, React Hook Form, Zod, Framer Motion, Express, Prisma, and SQLite.

## Architecture overview

- Frontend: feature-based folders under src/features with reusable UI primitives in src/components/ui.
- State: Zustand stores for auth and couple-related UI state, with TanStack Query for server data.
- Forms: React Hook Form + Zod for validation and a consistent auth experience.
- Backend: Express app entry points, route modules, and Prisma-backed services ready for future PostgreSQL migration.
- Data layer: Prisma schema is structured for relational growth while keeping SQLite as the default local database.

## Getting started

1. Install dependencies from the workspace root:
   - npm install
2. Copy the backend environment example:
   - cp backend/.env.example backend/.env
3. Run the app:
   - npm run dev

## Notes

- The backend is prepared for a future database swap by centralizing config and keeping Prisma schema changes isolated.
- The frontend is organized so new features can be added without mixing presentation, state, and API logic together.

