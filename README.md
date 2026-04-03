# Finance Data Processing and Access Control System

A full-stack finance platform built to demonstrate backend architecture, API design, RBAC, data modeling, validation, analytics aggregation, and a polished dashboard experience.

## Overview

This project models a finance operations workspace where different users interact with financial data based on role:

- `VIEWER` can access the dashboard and see summary information
- `ANALYST` can access dashboard insights, analytics, and record listings
- `ADMIN` can manage users and perform full financial record CRUD

The backend is the primary focus of the assignment, with a structured NestJS API, Prisma/PostgreSQL persistence, JWT authentication, and strict role-based authorization. The frontend is a premium dashboard client built with Next.js and Tailwind.

## Tech Stack

### Backend

- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- JWT authentication
- class-validator / class-transformer
- Swagger
- Jest
- `@nestjs/throttler`

### Frontend

- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- Recharts
- Axios
- `next-themes`

## Architecture

### Monorepo layout

```text
.
├── backend
│   ├── prisma
│   ├── src/common
│   ├── src/modules/auth
│   ├── src/modules/users
│   ├── src/modules/records
│   ├── src/modules/dashboard
│   └── test
├── frontend
│   ├── src/app
│   ├── src/components
│   └── src/lib
├── docker-compose.yml
└── .github/workflows/ci.yml
```

### Backend design notes

- Domain modules are separated into `auth`, `users`, `records`, `dashboard`, and `health`.
- Prisma models use enums and indexes to support filtering and aggregation efficiently.
- Financial records use soft delete through `deletedAt`.
- RBAC is enforced server-side with JWT auth, active-user checks, and role guards.
- Dashboard summaries use aggregate queries instead of loading records one by one.
- Validation and error handling are centralized for predictable API behavior.

### Frontend design notes

- The UI uses a dark fintech palette with layered glass surfaces and restrained motion.
- Auth state is handled by a client-side provider that stores a JWT and hydrates the current user with `/auth/me`.
- Navigation is role-aware, so users only see the sections they are allowed to access.
- The product is split into focused views: login, dashboard, transactions, analytics, and admin.

## Core Features

### Authentication and access control

- JWT-based login
- Active/inactive user enforcement
- Role-based route protection in the backend
- Role-aware rendering in the frontend

### User management

- Create users
- List users
- Retrieve a user by ID
- Update user profile fields
- Change user role
- Activate or deactivate a user
- Delete a user if they have no linked financial records

### Financial records

- Create income and expense records
- List records with:
  - pagination
  - date range filters
  - category filter
  - type filter
  - search on category and description
- Update records
- Soft delete records

### Dashboard summary APIs

- Total income
- Total expenses
- Net balance
- Category-wise totals
- Monthly trends
- Weekly trends
- Recent transactions

## Role Behavior

### Viewer

- Can access the dashboard
- Can view summary cards, charts, and recent activity
- Cannot access transactions, analytics, or admin management

### Analyst

- Can access the dashboard
- Can view transactions
- Can access analytics
- Cannot create, update, or delete records
- Cannot manage users

### Admin

- Full dashboard access
- Full financial record CRUD
- Full user management

## API Overview

Base URL: `http://localhost:4000/api`

Swagger docs: `http://localhost:4000/docs`

### Auth

- `POST /auth/login`
- `GET /auth/me`

### Users

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `PATCH /users/:id/status`
- `DELETE /users/:id`

### Records

- `POST /records`
- `GET /records`
- `GET /records/:id`
- `PATCH /records/:id`
- `DELETE /records/:id`

### Dashboard

- `GET /dashboard/summary`

### Health

- `GET /health`

## Data Model

### User

- `id`
- `name`
- `email`
- `passwordHash`
- `role`
- `status`
- `createdAt`
- `updatedAt`

### FinancialRecord

- `id`
- `amount`
- `type`
- `category`
- `date`
- `description`
- `createdById`
- `deletedAt`
- `createdAt`
- `updatedAt`

## Validation and Error Handling

The API uses DTO validation and structured HTTP errors.

Common status codes:

- `400 Bad Request` for invalid input
- `401 Unauthorized` for invalid credentials or missing auth
- `403 Forbidden` for inactive users or blocked actions
- `404 Not Found` for missing resources
- `409 Conflict` for duplicate-user and similar conflict cases
- `500 Internal Server Error` for unexpected failures

Validation failures return a clear `message` and, where relevant, a `details` array.

## Local Setup

### 1. Install dependencies

From the repo root:

```bash
npm install
```

### 2. Configure environment variables

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env.local
```

### 3. Start PostgreSQL

Using Docker:

```bash
docker compose up -d postgres
```

Or point `backend/.env` to any existing PostgreSQL instance.

### 4. Generate Prisma client, run migrations, and seed data

Option A: from the repo root

```bash
npm run db:seed
```

Option B: from the backend workspace

```bash
cd backend
npx prisma generate
npx prisma migrate deploy
npm run db:seed
```

If you use the root seed command, make sure migrations have already been applied once.

### 5. Start the applications

Backend:

```bash
npm run dev:backend
```

Frontend:

```bash
npm run dev:frontend
```

Default local URLs:

- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`

If port `3000` is already in use, Next.js will automatically move to the next available port.

## Seeded Accounts

- Admin: `admin@finance.local` / `Password123!` (`Aryan Admin`)
- Analyst: `analyst@finance.local` / `Password123!` (`Ahaan Analyst`)
- Viewer: `viewer@finance.local` / `Password123!` (`Varun Viewer`)

## Docker

Start the application services:

```bash
docker compose up --build
```

This starts:

- PostgreSQL
- NestJS backend
- Next.js frontend

Important:

- the Docker backend runs migrations on startup
- the sample users and sample financial records are **not** seeded automatically by Docker
- after the containers are running, seed from the host if you want demo data:

```bash
npm run db:seed
```

## Testing

Backend tests currently cover:

- user creation flow
- dashboard totals aggregation mapping

Run:

```bash
npm run test --workspace backend
```

## Build Verification

The project has been verified with:

```bash
npm run build --workspace backend
npm run build --workspace frontend
```

## Assumptions

- JWT access tokens are sufficient for this evaluation, so refresh-token flows were intentionally omitted.
- PostgreSQL is the primary persistence target.
- Financial records are entered manually by admins as finance operations data.
- Viewer access is limited to dashboard-level visibility rather than record-level operations.

## Trade-offs

- Auth tokens are stored client-side for implementation speed; production systems should prefer HTTP-only cookies.
- The admin UI focuses on the main evaluation paths rather than bulk administration tooling.
- Dashboard and analytics reuse shared summary data instead of introducing many specialized endpoints.

## Deployment Notes

### Backend

- Deploy to Railway, Render, Fly.io, ECS, or another Node-compatible runtime
- Set `DATABASE_URL`, `JWT_SECRET`, `PORT`, and `FRONTEND_URL`
- Run `prisma migrate deploy` during release

### Frontend

- Deploy to Vercel or another Node-compatible host
- Set `NEXT_PUBLIC_API_URL` to the deployed backend `/api` base URL

## CI/CD

GitHub Actions is included at `.github/workflows/ci.yml` and runs:

- dependency installation
- Prisma generate
- Prisma migrations
- backend tests
- backend build
- frontend build

## Useful Project Files

- `backend/src/main.ts`
- `backend/prisma/schema.prisma`
- `backend/src/modules/auth/auth.module.ts`
- `backend/src/modules/records/records.module.ts`
- `backend/src/modules/dashboard/dashboard.service.ts`
- `frontend/src/app/layout.tsx`
- `frontend/src/app/(dashboard)/dashboard/page.tsx`
- `frontend/src/app/(dashboard)/admin/page.tsx`
