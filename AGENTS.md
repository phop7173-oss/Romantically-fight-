# AI Development Instructions

## Project
This is an existing full-stack application called Romantically-fight-.
Do not recreate the project from scratch.

## Stack
- Frontend: React 18, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, TypeScript, Express
- Database: Prisma + SQLite

## Repository
- frontend/ — React frontend
- backend/ — Express backend
- backend/prisma/ — Prisma schema, database and migrations

## Core Rules
1. Inspect existing code before making changes.
2. Preserve existing functionality.
3. Do not recreate or rewrite the application.
4. Do not make unrelated changes.
5. Prefer small, focused changes.
6. Do not delete files or features unless explicitly requested.
7. Do not make destructive database changes.
8. Never modify or expose secrets.
9. Never commit API keys, passwords or tokens.
10. Do not push to GitHub unless explicitly instructed.

## Before Changes
Inspect relevant source files, package.json, database schema, migrations, API routes, services, frontend API clients and tests before editing.

For substantial changes, explain the implementation plan first.

## Database Safety
The project uses Prisma with SQLite.
Inspect the existing schema and migrations before changing the database.
Never reset or delete database data without explicit approval.

## Testing
After changes, run relevant checks.

Frontend build:
npm run build --workspace frontend

Backend build:
npm run build --workspace backend

Backend tests:
npm test --workspace backend

## Git Safety
Before commits, inspect git status and git diff.
Do not automatically commit or push.
Never use destructive commands such as git reset --hard or git clean -fd unless explicitly requested.

## Completion Report
Report what changed, files changed, tests/builds run, remaining problems, and database/migration considerations.
