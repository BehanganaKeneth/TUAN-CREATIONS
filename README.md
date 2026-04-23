# TUAN Creations Platform

TUAN Creations Platform is the current full-stack implementation of the TUAN Digital Platform. It combines the public company site, authenticated workspace modules, admin oversight, and backend-seeded content into one React + Node.js system.

## Current System Architecture

### Frontend

The frontend is a React 18 + TypeScript application built with Vite and routed through React Router.

- `src/main.tsx` mounts the app and wraps it with the auth provider.
- `src/App.tsx` defines the route map.
- `src/layouts/PublicLayout.tsx` wraps the public marketing pages.
- `src/layouts/DashboardLayout.tsx` wraps the workspace pages and shows role-aware navigation.
- `src/store/auth.tsx` keeps the current user and backend token in localStorage under `tuan_os_auth_session`.
- `src/services/api.ts` is the shared API client for auth, dashboard data, academy, marketplace, media, collaboration, innovation, admin, and live sessions.
- `src/services/mockApi.ts` remains the fallback data source when the backend cannot be reached.

### Frontend Route Map

Public routes:

- `/` Home
- `/about` About
- `/divisions` Divisions
- `/blog` Blog
- `/contact` Contact
- `/auth` Member login
- `/admin/login` Dedicated admin login

Dashboard routes:

- `/dashboard` Platform overview
- `/academy` Learning and course discovery
- `/live-session` Live session room
- `/marketplace` Listings and transactions
- `/media` TUAN TV and broadcaster pages
- `/collaboration` Shared project workspace
- `/iot` TUAN Innovations programs
- `/admin` Admin operations dashboard

Unknown routes redirect back to `/`.

### Backend

The backend is an Express + Mongoose service in `backend/src/server.js`.

- `backend/src/config.js` resolves the MongoDB connection, JWT secret, client origin, and admin credentials.
- `backend/src/models.js` defines the MongoDB collections.
- `backend/src/data.js` contains the seed data.
- `backend/src/seed.js` bootstraps the database and creates the configured admin account.

Current backend collections:

- Users
- Metrics
- Courses
- Listings
- Live sessions
- Actions
- Enrollments
- Media channels
- Collaboration projects
- Innovation programs

## User Flow

### 1. Public Discovery

Visitors enter through the public site, read about the company, and move into the platform through the auth page or one of the call-to-action paths.

### 2. Member Authentication

Member users sign in through `/auth`.

- The frontend sends the request to `POST /api/auth/login`.
- The backend creates or updates the user session and returns a JWT.
- The frontend stores the session in `tuan_os_auth_session`.
- A refresh restores the session through `GET /api/auth/me`.

### 3. Admin Authentication

Admin users sign in through `/admin/login`.

- The admin login uses the configured `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- The backend verifies the password hash and returns an admin session token.
- The dashboard navigation expands to include the Admin page when the session role is `admin`.

### 4. Dashboard Entry

After login, the user lands in the dashboard shell.

- Guests see the workspace but cannot complete protected actions.
- Signed-in members see role-aware navigation and account-specific actions.
- Admins see platform monitoring links and admin status messaging.

### 5. Academy Flow

The academy is the main learning path and now works for both member users and admin oversight.

- `GET /api/courses` returns the course catalog.
- `POST /api/academy/enroll/:courseId` enrolls the signed-in user.
- `POST /api/academy/live/:courseId/join` records live room access.
- `GET /api/academy/enrollments/me` returns the current user’s enrollments.
- `GET /api/admin/academy/enrollments` lets admins monitor enrollments and live join counts.
- `src/modules/academy/AcademyPage.tsx` enforces enroll-before-join behavior.
- `src/pages/LiveSessionPage.tsx` resolves `courseId` and loads the live session room.

### 6. Marketplace Flow

The marketplace supports service and product discovery.

- `GET /api/listings` returns current offers.
- Action buttons on the page record orders, tracking requests, and reviews through `POST /api/actions`.
- The page remains backed by seeded listings if the backend is unavailable.

### 7. Media Flow

TUAN TV is modeled as broadcaster channels with archived recordings.

- `GET /api/media/channels` returns channel cards.
- `POST /api/media/channels/:channelId/follow` increments followers and records the action.
- The media page shows featured broadcasts, archive counts, and broadcaster links.

### 8. Collaboration Flow

The collaboration workspace supports shared delivery and project coordination.

- `GET /api/collaboration/projects` returns the active projects.
- `POST /api/collaboration/projects` creates a new shared project.
- `POST /api/collaboration/projects/:projectId/action` logs chat and task-trail updates.
- The page shows owner, team size, task updates, and workspace channel.

### 9. Innovation Flow

The innovation hub tracks practical build programs and seat usage.

- `GET /api/iot/programs` returns innovation programs.
- `POST /api/iot/programs/:programId/enroll` enrolls a signed-in user and updates seat usage.
- The page shows program mode, seats, and current enrollments.

### 10. Admin Oversight Flow

Admins can monitor the platform from `/admin`.

- `GET /api/admin/overview` returns platform totals, role counts, and recent activity.
- `GET /api/admin/users` returns the user list.
- `GET /api/admin/actions` returns the latest logged actions.
- `GET /api/admin/academy/enrollments` exposes academy enrollment monitoring.

## Backend API Summary

- `GET /api/health` health check
- `POST /api/auth/login` member or admin login
- `GET /api/auth/me` current session lookup
- `POST /api/auth/logout` session logout
- `GET /api/dashboard/metrics` dashboard metrics
- `GET /api/courses` course catalog
- `GET /api/courses/:id` single course lookup
- `GET /api/listings` marketplace listings
- `GET /api/media/channels` media channels
- `POST /api/media/channels/:channelId/follow` follow channel action
- `GET /api/collaboration/projects` collaboration projects
- `POST /api/collaboration/projects` create project
- `POST /api/collaboration/projects/:projectId/action` collaboration action logging
- `GET /api/iot/programs` innovation programs
- `POST /api/iot/programs/:programId/enroll` innovation enrollment
- `GET /api/live-sessions/:courseId` live session lookup
- `POST /api/academy/enroll/:courseId` academy enrollment
- `POST /api/academy/live/:courseId/join` live room join tracking
- `GET /api/academy/enrollments/me` current user enrollments
- `GET /api/admin/overview` admin summary
- `GET /api/admin/users` admin user list
- `GET /api/admin/actions` admin activity feed
- `GET /api/admin/academy/enrollments` admin academy monitoring
- `POST /api/actions` generic action logger

## Local Environment Snapshot

The current backend environment in `backend/.env` and `backend/.env.example` is aligned to the same local values so the next setup starts from the same state.

- `PORT=4000`
- `MONGODB_URI=mongodb://tuancreationsafrica_db_user:787BKen%40mongo@ac-lewhs6k-shard-00-00.xhk6biz.mongodb.net:27017,ac-lewhs6k-shard-00-01.xhk6biz.mongodb.net:27017,ac-lewhs6k-shard-00-02.xhk6biz.mongodb.net:27017/tuan_creations?ssl=true&authSource=admin&replicaSet=atlas-228ysk-shard-0&retryWrites=true&w=majority&appName=tuan-creations-backend`
- `ATLAS_USER=tuancreationsafrica_db_user`
- `ATLAS_PASSWORD=787BKen@mongo`
- `ATLAS_CLUSTER=cluster0.xhk6biz`
- `ATLAS_DB=tuan_creations`
- `ATLAS_APP_NAME=tuan-creations-backend`
- `JWT_SECRET=P)r(erwQ@wX_WwIMtVK!Z8!AZkcT%2R!0r+j=LsH1(kBjw(nxlvCnBuBFEHW-OO5`
- `CLIENT_ORIGIN=http://localhost:5173`
- `ADMIN_EMAIL=tuancreations.africa@gmail.com`
- `ADMIN_PASSWORD=787TUAN@digital`

## Local Run Order

1. Start the backend from `backend` with `npm run dev`.
2. Start the frontend from the project root with `npm run dev`.
3. Open the public site, then sign in through `/auth` or `/admin/login`.
4. Use the dashboard modules to confirm academy, marketplace, media, collaboration, innovation, and admin flows.

## Notes

- Netlify SPA routing is configured through `netlify.toml` and `public/_redirects`.
- The frontend still falls back to seeded mock data if the backend is unreachable during local development.
- The admin account is bootstrapped from the backend env values on startup.

## Architecture Diagram

```mermaid
flowchart TD
	A[Public Visitor] --> B[PublicLayout]
	B --> C[Home / About / Divisions / Blog / Contact]
	B --> D[AuthPage]
	B --> E[AdminLoginPage]

	D --> F[Auth Context Session]
	E --> G[Admin JWT Session]
	F --> H[DashboardLayout]
	G --> H

	H --> I[Dashboard Overview]
	H --> J[Academy]
	H --> K[Live Session]
	H --> L[Marketplace]
	H --> M[Media]
	H --> N[Collaboration]
	H --> O[TUAN Innovations]
	H --> P[Admin Dashboard]

	J --> Q[Enroll in Course]
	J --> R[Join Live Room]
	K --> S[Resolve courseId and load session]
	L --> T[Order / Track / Review]
	M --> U[Follow Channel / Open Broadcaster Page]
	N --> V[Create Project / Open Chat / Manage Tasks]
	O --> W[Enroll in Program]
	P --> X[Overview / Users / Actions / Academy Monitoring]

	Q --> Y[POST /api/academy/enroll/:courseId]
	R --> Z[POST /api/academy/live/:courseId/join]
	T --> AA[POST /api/actions]
	U --> AB[POST /api/media/channels/:channelId/follow]
	V --> AC[POST /api/collaboration/projects and /action]
	W --> AD[POST /api/iot/programs/:programId/enroll]
	X --> AE[GET /api/admin/*]

	Y --> AF[(MongoDB)]
	Z --> AF
	AA --> AF
	AB --> AF
	AC --> AF
	AD --> AF
	AE --> AF
```