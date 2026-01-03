# UrbanTitan – Development Context (Backend + Frontend)

This document is the **canonical context** for UrbanTitan feature development.

- Repo has two apps:
  - `backend/`: Spring Boot REST API
  - `frontend/`: Next.js App Router UI

> Note: There is an older backend-only doc at `backend/src/main/resources/context.md`. This file supersedes it (and avoids secrets).

---

## 1) High-level Architecture

**Architecture style:** classic 2-tier web app

- **Frontend (Next.js)** renders UI, manages client state (cart, filters), and calls backend REST APIs.
- **Backend (Spring Boot)** exposes REST endpoints, performs validation + business logic, persists to PostgreSQL via JPA/Hibernate.

**Data flow (typical):**

1. UI calls `GET /api/v1/*` for catalog data (categories, brands, products).
2. Auth uses Google ID token or email/password; backend returns a JWT.
3. UI sends JWT in `Authorization: Bearer <token>` header.
4. Backend validates JWT in a filter and sets `Authentication`.

---

## 2) Repo Layout

```
UrbanTitan/
  backend/
    src/main/java/urbantitan/code/
      controllers/
      services/
      repositories/
      entities/
      dto/
      configs/
      enums/
      exceptions/
    src/main/resources/
      application.properties
      application-local.yaml
      application-remote.yaml
  frontend/
    app/                 # Next.js App Router pages
    components/          # UI + feature components
    components/ui/       # shadcn-style primitives (Radix)
    lib/                 # shared types, constants, utilities
    store/               # Zustand stores
```

---

## 3) Tech Stack (Current, from source)

### Backend

- **Language/Runtime:** Java 25 (Gradle toolchain)
- **Framework:** Spring Boot 3.5.x
- **Web:** spring-boot-starter-web
- **Data:** Spring Data JPA (Hibernate) + JDBC dependencies present
- **DB:** PostgreSQL (`org.postgresql:postgresql`)
- **Migrations:** Flyway enabled (dependency present; migration folders currently not in repo)
- **Security:** Spring Security + OAuth2 Client (Google login) + JWT (jjwt)
- **Mapping:** ModelMapper (plus custom ModelMapper bean for Product)
- **DX:** Lombok, Spring DevTools
- **Testing:** JUnit Platform configured, but tests are disabled in Gradle currently

### Frontend

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript (strict)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`) + CSS variables (shadcn “New York” style)
- **UI primitives:** Radix UI (Dropdown Menu, Select, Slot)
- **Icons:** lucide-react
- **State:** Zustand (persist + devtools)
- **URL/query state:** `nuqs` (App Router adapter)
- **Carousel:** Swiper
- **Images:** `next/image` + `remotePatterns` allowlist (cdn-media.buildersmart.in)

---

## 4) Backend Architecture & Conventions

### 4.1 Layers (current code)

- **Controllers** (`urbantitan.code.controllers`) – thin HTTP layer
- **Services** (`urbantitan.code.services`) – business logic + orchestration
- **Repositories** (`urbantitan.code.repositories`) – Spring Data JPA repositories
- **Entities** (`urbantitan.code.entities`) – database mapping
- **DTOs** (`urbantitan.code.dto.*`) – API contracts
- **Configs** (`urbantitan.code.configs`) – Security config, JWT filter, ModelMapper config

### 4.2 Public API base paths (current)

- Auth: `/api/auth/*`
  - `/api/auth/google` (Google ID token -> backend JWT)
  - `/api/auth/register` (email/password)
  - `/api/auth/login` (email/password)
- Catalog:
  - Categories: `/api/v1/categories/*`
  - Brands: `/api/v1/brands/*`
  - Products: `/api/v1/products/*`
- Seller onboarding:
  - `/api/seller/onboarding` and `/api/seller/onboarding/me` (requires JWT)

### 4.3 Security model (current)

- Stateless API: `SessionCreationPolicy.STATELESS`
- JWT is parsed by `JwtAuthenticationFilter` from `Authorization: Bearer …`
  - Current filter sets an auth principal of **email** and does not attach authorities.
- Permit-all endpoints:
  - `/api/auth/**`
  - `/api/v1/categories/**`
  - `/api/v1/brands/**`
  - `/api/v1/products/**`
- All other endpoints are authenticated.

**CORS allowlist (hard-coded in backend):**
- `http://localhost:3000`
- `https://urbantitan.in`
- `https://urbantitan.vercel.in`

If you add a new frontend domain, update the allowlist.

### 4.4 Data model notes (current)

- IDs are UUIDs in most entities.
- `User.role` uses enum `urbantitan.code.enums.ROLES`.
- Categories support a parent/child tree (self-referential).
- Seller onboarding uses `SellerOnboardingRequest` with fields:
  - `user`, `requestedRole`, `businessModel`, `status`, `adminRemark`, timestamps.

### 4.5 Mapping strategy

- Most services use a default `ModelMapper` bean.
- Products use a dedicated bean: `@Bean("productModelMapper")` to avoid ambiguous mapping and to explicitly map brand/category IDs.

### 4.6 Exception handling (current behavior)

- There is a `GlobalExceptionHandler`, but it only handles `IllegalStateException`.
- Many services throw `IllegalArgumentException` (e.g., “not found”, “already exists”). Unless handled, these can become 500 responses.

**Recommended convention for new code:**
- Throw `IllegalArgumentException` for client errors and make sure it is mapped to `400` consistently.
- For missing resources, prefer a dedicated exception mapped to `404`.

---

## 5) Frontend Architecture & Conventions

### 5.1 App Router structure

- Routes live under `frontend/app/`:
  - `/` home page
  - `/products` list with filters
  - `/products/[productId]` product details
  - `/cart` cart page
  - `/login` login page

### 5.2 Client vs Server Components

- Default in App Router is server components.
- Components that use hooks/state must start with `"use client"`.
- Examples of client usage:
  - filtering and query state in `/products`
  - cart state in `/cart`
  - navbar interactions

### 5.3 State management

- Cart state is in Zustand store (`frontend/store/store.ts`):
  - `addToCart`, `updateQuantity`, `clearCart`
  - persisted in `sessionStorage` under key `cart-storage`

### 5.4 URL query state

- Filters on `/products` use `nuqs` (`useQueryState`) for:
  - `categories` (array)
  - `brands` (array)
  - `price` (array of ints)
  - `discount` (int)

This keeps filters shareable via URL.

### 5.5 UI system

- Tailwind v4 is configured via CSS imports in `app/globals.css`.
- shadcn-style components exist in `components/ui/*` and use:
  - `class-variance-authority` for variants
  - `cn()` helper from `lib/utils.ts`
- Prefer these primitives (Button, Badge, Select, DropdownMenu) over raw HTML for consistency.

### 5.6 Data sources (current state)

- Many UI pages use local mock data from `frontend/lib/data.ts`.
- Some components fetch from backend directly (example in navbar fetches categories from `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/`).

**Recommended convention for new code:**
- Centralize API calls behind a small client (e.g., one module in `lib/`), and use an env var for the API base URL (e.g., `NEXT_PUBLIC_API_BASE_URL`) instead of hard-coding URLs.

---

## 6) Coding Practices (What to follow when adding features)

### Backend

- **DTO-first API**
  - Controllers accept request DTOs and return response DTOs.
  - Never expose entities directly over HTTP.
  - Put validation annotations on DTOs (e.g., `@NotNull`, `@NotBlank`).

- **Thin controllers**
  - Controllers should delegate to services.
  - Keep controller logic limited to request/response orchestration.

- **Service responsibilities**
  - Business rules, validation beyond bean validation, entity lookups, state transitions.
  - Transactions when needed.

- **Repositories**
  - Use Spring Data repositories, avoid DAO/DAOImpl patterns.

- **Enums**
  - Use one canonical enum type per concept (roles, statuses, etc.).
  - Store enums with `@Enumerated(EnumType.STRING)`.

- **Errors**
  - Standardize error response shape (`{ "error": "..." }`) and HTTP codes.

### Frontend

- **TypeScript strict**
  - Keep types in `lib/types.ts` (or close to the domain).

- **Keep UI composable**
  - Use `components/` for feature sections and `components/ui/` for primitives.
  - Use `cn()` and variant-based components instead of custom ad-hoc class strings.

- **State boundaries**
  - Use Zustand for shared cross-page state (e.g., cart).
  - Prefer URL query state (nuqs) for filter/search state.

- **API integration**
  - Avoid hard-coded hosts/ports in components.
  - Centralize fetch logic and attach auth tokens in one place.

---

## 7) Configuration & Environment (Important)

### Backend profiles

- `spring.profiles.active` defaults to `${SPRING_PROFILE:remote}` (from `application.properties`).
- Two YAML configs exist:
  - `application-local.yaml`
  - `application-remote.yaml`

### Secrets

Some config files currently contain **credentials and OAuth client IDs**.

**Policy for future changes:**
- Do not commit secrets.
- Use environment variables (and/or a secrets manager) and provide `.example` config files.

---

## 8) Local Dev Commands

### Backend

From `backend/`:

- Run app (custom task that disables tests):
  - macOS/Linux: `./gradlew runApplication`
  - Windows: `gradlew.bat runApplication`
- Standard bootRun:
  - macOS/Linux: `./gradlew bootRun`
  - Windows: `gradlew.bat bootRun`

### Frontend

From `frontend/`:

- Dev server: `pnpm dev` (or `npm run dev`)
- Build: `pnpm build`
- Start: `pnpm start`

---

## 9) Known Gaps / Things to be aware of (as of Dec 2025)

- Flyway is enabled, but the repository does not currently contain `db/migration` scripts.
- Gradle tests are disabled (build will not run tests by default).
- Global exception handling is partial (client-facing errors may not always map to correct status codes).
- Frontend uses a mix of mock data and real API calls.

