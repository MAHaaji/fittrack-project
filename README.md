![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)

---

# FitTrack

> A full-stack fitness tracking application. Log workouts, monitor your history, and visualise progress through a personal dashboard secured with JWT authentication and backed by PostgreSQL.

---

## Table of Contents

- [TL;DR](#tldr)
- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [API Setup](#api-setup)
  - [Client Setup](#client-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Quality & Security](#quality--security)
- [Screenshots](#screenshots)
- [Legacy Code](#legacy-code)
- [License](#license)

---

## TL;DR

FitTrack is a full-stack fitness logger. Users register, log workout sessions with activity type, date, duration and notes, and view a personal dashboard summarising their stats. All data is scoped to the authenticated user via JWT.

| Layer | Technology | Purpose |
|---|---|---|
| API | Node.js + Express 5 | REST backend, auth, data |
| Auth | bcrypt + JWT | Secure login, 7-day tokens |
| Database | PostgreSQL | Persistent workout storage |
| Frontend | React 19 + Vite | SPA client, routing |
| Tests | Jest + Supertest | API integration test suite |
| CI | GitHub Actions | Runs tests on every push & PR |

---

## Overview

FitTrack is split into two independently runnable services:

- **`fittrack-api`** — an Express REST API that handles registration, login, and all workout CRUD. Passwords are hashed with bcrypt; sessions are stateless JWT tokens (7-day expiry). The API validates all inputs and returns structured JSON errors.
- **`fittrack-client`** — a React SPA built with Vite, using React Router for client-side navigation. It consumes the API at `http://localhost:5000`.

A legacy codebase (`fittrack-legacy`) is preserved in the repository for reference.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                  fittrack-client (Vite)                 │
│              React 19  ·  React Router 7                │
│                   http://localhost:5173                  │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/JSON  (CORS: localhost:5173)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   fittrack-api                          │
│              Express 5  ·  Node.js 20                   │
│                   http://localhost:5000                  │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  /auth   │  │  /users  │  │  /workouts           │  │
│  │ register │  │    /me   │  │  GET  POST  DELETE   │  │
│  │  login   │  └──────────┘  └──────────────────────┘  │
│  └──────────┘                                           │
│                                                         │
│  ┌──────────────────┐   ┌────────────────────────────┐  │
│  │  /activities     │   │  /dashboard                │  │
│  │  GET (public)    │   │  stats + recent workouts   │  │
│  └──────────────────┘   └────────────────────────────┘  │
│                                                         │
│   Auth Middleware: JWT verify on all protected routes   │
└────────────────────────┬────────────────────────────────┘
                         │ pg Pool
                         ▼
┌─────────────────────────────────────────────────────────┐
│                     PostgreSQL                          │
│         users · activities · workout_logs               │
└─────────────────────────────────────────────────────────┘
```

**Request lifecycle for a protected route:**

```
Client  ──►  Authorization: Bearer <token>
         ──►  requireAuth middleware  ──►  jwt.verify()
                    │                          │
              invalid/missing            decoded { id, email }
                    │                    attached to req.user
                    ▼                          │
              401 Unauthorized                 ▼
                                       Route handler runs
                                       pg query scoped to
                                       req.user.id
```

---

## Tech Stack

### Backend — `fittrack-api`

| Package | Version | Role |
|---|---|---|
| express | ^5.2.1 | HTTP framework & routing |
| pg | ^8.20.0 | PostgreSQL client (connection pool) |
| bcrypt | ^6.0.0 | Password hashing (10 salt rounds) |
| jsonwebtoken | ^9.0.3 | JWT sign & verify (7d expiry) |
| dotenv | ^17.3.1 | Environment variable loading |
| cors | ^2.8.5 | CORS policy (origin: localhost:5173) |
| jest | ^29.7.0 | Test runner |
| supertest | ^7.2.2 | HTTP integration assertions |

### Frontend — `fittrack-client`

| Package | Version | Role |
|---|---|---|
| react | ^19.2.4 | UI component framework |
| react-dom | ^19.2.4 | DOM renderer |
| react-router-dom | ^7.14.1 | Client-side routing |
| vite | ^8.0.1 | Dev server & production bundler |
| eslint | ^9.39.4 | Code linting |

---

## Project Structure

```
fittrack-project/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions — runs on every push & PR
│
├── fittrack-api/               # Express REST API
│   ├── app.js                  # App config, all routes, auth middleware
│   ├── server.js               # HTTP server entry point
│   ├── jest.config.js          # Jest configuration
│   ├── tests/
│   │   ├── setup.js            # Jest global test setup
│   │   ├── health.test.js      # Health endpoint tests
│   │   ├── auth.test.js        # Register & login tests
│   │   └── workouts.test.js    # Workout CRUD & auth guard tests
│   └── package.json
│
├── fittrack-client/            # React + Vite SPA
│   ├── src/
│   │   ├── components/         # Navbar, ProtectedRoute, WeatherWidget, ...
│   │   ├── pages/              # Login, Register, Dashboard, WorkoutLog, ...
│   │   ├── context/           # AuthContext (login state)
│   │   ├── layouts/           # Page layout(s)
│   │   └── utils/             # API helper
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── fittrack-legacy/            # Legacy codebase (reference only, not active)
│
└── README.md
```

---

## Database Schema

Three tables. All workout data is user-scoped via `user_id` foreign key.

```
┌──────────────────────────────────────┐
│               users                  │
├──────────────┬───────────────────────┤
│ id           │ SERIAL  PK            │
│ name         │ TEXT    NOT NULL      │
│ email        │ TEXT    UNIQUE NOT NULL│
│ password_hash│ TEXT    NOT NULL      │
└──────────────┴──────────┬────────────┘
                          │ 1
                          │
                          │ N
┌──────────────────────────────────────┐
│            workout_logs              │
├──────────────┬───────────────────────┤
│ id           │ SERIAL  PK            │
│ user_id      │ INTEGER FK → users.id │
│ activity     │ TEXT    NOT NULL      │
│ date_completed│ DATE   NOT NULL      │
│ duration     │ INTEGER (minutes)     │
│ notes        │ TEXT                  │
└──────────────┴───────────────────────┘

┌──────────────────────────────────────┐
│            activities                │
├──────────────┬───────────────────────┤
│ id           │ SERIAL  PK            │
│ name         │ TEXT    NOT NULL      │
│ category     │ TEXT                  │
└──────────────┴───────────────────────┘
```

Run this to create the schema:

```sql
CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL
);

CREATE TABLE activities (
  id        SERIAL PRIMARY KEY,
  name      TEXT NOT NULL,
  category  TEXT
);

CREATE TABLE workout_logs (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
  activity        TEXT NOT NULL,
  date_completed  DATE NOT NULL,
  duration        INTEGER,
  notes           TEXT
);
```

---

## Getting Started

### Prerequisites

- **Node.js** v20+
- **npm** v9+
- **PostgreSQL** running locally (or a connection string to a hosted instance)

### Database Setup

Connect to your PostgreSQL instance and run the SQL above to create the three tables, then note your credentials for the `.env` file below.

### API Setup

```bash
cd fittrack-api
npm install
```

Create `fittrack-api/.env` — see [Environment Variables](#environment-variables).

```bash
npm start        # → http://localhost:5000
```

### Client Setup

```bash
cd fittrack-client
npm install
npm run dev      # → http://localhost:5173
```

The client expects the API at `http://localhost:5000`. Both services must be running for the app to function.

---

## Environment Variables

Create `fittrack-api/.env`:

```env
# PostgreSQL connection
DB_USER=your_pg_username
DB_HOST=localhost
DB_NAME=fittrack
DB_PASSWORD=your_pg_password
DB_PORT=5432

# API port (optional — defaults to 5000)
PORT=5000

# JWT signing secret — use a long random string in production
JWT_SECRET=replace_this_with_a_strong_secret
```

> `.env` is excluded from version control via `.gitignore`. Never commit credentials.

---

## API Reference

Base URL: `http://localhost:5000`

Protected routes require: `Authorization: Bearer <token>`

---

### Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Service health check |

**Response**
```json
{ "status": "ok" }
```

---

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Create a new account |
| `POST` | `/api/auth/login` | None | Login and receive JWT |

**POST `/api/auth/register`**

```json
// Request
{ "name": "Jane Doe", "email": "jane@example.com", "password": "securepass123" }

// 201 Created
{ "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com" } }
```

Validation rules: name required · email must be valid format · password min 8 characters · duplicate email returns `409`.

**POST `/api/auth/login`**

```json
// Request
{ "email": "jane@example.com", "password": "securepass123" }

// 200 OK
{
  "token": "<jwt — valid 7 days>",
  "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com" }
}
```

---

### User

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/users/me` | Required | Get authenticated user's profile |

```json
// 200 OK
{ "id": 1, "name": "Jane Doe", "email": "jane@example.com" }
```

---

### Activities

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/activities` | None | List all activity types |

```json
// 200 OK
[
  { "id": 1, "name": "Running", "category": "Cardio" },
  { "id": 2, "name": "Cycling", "category": "Cardio" }
]
```

---

### Workouts

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/workouts` | Required | Get all workouts for authenticated user |
| `POST` | `/api/workouts` | Required | Log a new workout |
| `DELETE` | `/api/workouts/:id` | Required | Delete a workout by ID |

**POST `/api/workouts`**

```json
// Request
{
  "activity": "Running",
  "date_completed": "2025-06-10",
  "duration": 45,
  "notes": "Felt great today"
}

// 201 Created
{
  "id": 12,
  "user_id": 1,
  "activity": "Running",
  "date_completed": "2025-06-10",
  "duration": 45,
  "notes": "Felt great today"
}
```

**DELETE `/api/workouts/:id`**

Returns `204 No Content` on success. Returns `404` if the workout doesn't exist or belongs to a different user.

---

### Dashboard

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/dashboard` | Required | Aggregate stats + 5 most recent workouts |

```json
// 200 OK
{
  "total_workouts": 24,
  "total_duration": 1080,
  "avg_duration": 45,
  "recent_workouts": [
    { "activity": "Running", "date_completed": "2025-06-10", "duration": 45 },
    { "activity": "Cycling", "date_completed": "2025-06-08", "duration": 60 }
  ]
}
```

---

### Error Responses

All errors follow this shape:

```json
{ "message": "A human-readable error description" }
```

| Status | Meaning |
|---|---|
| 400 | Validation error — missing or invalid field |
| 401 | No token, invalid token, or wrong credentials |
| 404 | Resource not found (or not owned by this user) |
| 409 | Conflict — email already registered |
| 500 | Unexpected server error |

---

## Running Tests

Tests use **Jest** and **Supertest** to make HTTP assertions directly against the Express app — no live server or real database required (the database is mocked).

```bash
cd fittrack-api
npm test
```

Test coverage:

| File | What it tests |
|---|---|
| `tests/health.test.js` | `GET /api/health` smoke test |
| `tests/auth.test.js` | Register (valid, invalid, duplicate), Login (valid, wrong password, missing fields) |
| `tests/workouts.test.js` | GET/POST/DELETE workouts, auth guard enforcement, input validation |

---

## CI/CD Pipeline

A GitHub Actions workflow runs automatically on every **push** and **pull request** to any branch.

```
Push / Pull Request
       │
       ▼
  Checkout code
       │
       ▼
  Setup Node.js 20
       │
       ▼
  npm install (fittrack-api)
       │
       ▼
  npm test (Jest)
       │
    ┌──┴──┐
         
  Pass   Fail
```

> Client-side tests (Vitest) will be added to the pipeline once the suite is configured — see the comment in `ci.yml`.

A green check on a pull request means all API tests pass and the branch is safe to merge.

---

## Quality & Security

**Lighthouse audit** (production build, home page):

| Metric | Score |
|---|---|
| Performance | 89 |
| Accessibility | 86 |
| Best Practices | 100 |
| SEO | 100 |

**Security:** passwords are hashed with bcrypt (salted, 10 rounds); sessions use signed JWTs verified on every protected route; and all database access uses parameterised queries to prevent SQL injection. A full security appraisal (OWASP Top 10 / STRIDE) is maintained alongside the project. Known hardening items recorded as future work include rate limiting on authentication routes, a Content-Security-Policy, and HSTS.

---

## Legacy Code

The `fittrack-legacy/` directory contains an earlier version of the codebase. It is preserved for reference and comparison but is **not actively maintained or run**. All development happens in `fittrack-api/` and `fittrack-client/`.

---

## License

ISC
