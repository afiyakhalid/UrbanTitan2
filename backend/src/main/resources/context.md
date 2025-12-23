context.md
# UrbanTitan Backend – Context & Architectural Guidelines

## 1. Project Overview
UrbanTitan is a B2B/B2C construction-material marketplace backend built using:

- Java 25
- Spring Boot
- Spring Data JPA (Hibernate)
- Gradle (Java 25 compatible)
- PostgreSQL
- Lombok
- ModelMapper

The project follows a layered architecture:
- Controller (HTTP layer)
- Service (business logic)
- Repository (data access)
- Entity (database mapping)
- DTO (API contracts)

---

## 2. Current Modules / Domains

### Core Domains
- User
- Brand
- Category
- Product
- Product Variants
- Attributes & Attribute Values
- Cart & Orders

### New Domain (WIP)
- Seller / Manufacturer Onboarding

---

## 3. Non-Negotiable Architectural Rules

### 3.1 DTO Usage (MANDATORY)
- Controllers must ONLY accept **Request DTOs**
- Controllers must ONLY return **Response DTOs**
- Entities must NEVER be exposed via APIs
- Validation annotations (`@NotBlank`, `@NotNull`, etc.) go ONLY on DTOs

✅ Correct:
```java
@PostMapping
public ResponseEntity<UserResponseDTO> create(@RequestBody @Valid UserRequestDTO dto)


❌ Incorrect:

@PostMapping
public User create(@RequestBody User user)

3.2 Entity Rules

Entities represent database schema ONLY

No business logic inside entities

All fields must have proper getters/setters

Enums stored using @Enumerated(EnumType.STRING)

Avoid String fields where enums are appropriate (status, role, type)

3.3 Role Handling (VERY IMPORTANT)

There must be ONE single Role enum used everywhere.

✅ Single source of truth:

public enum Role {
    ADMIN,
    USER,
    MANUFACTURER,
    DEALER,
    DISTRIBUTOR,
    AUTHORISED_DISTRIBUTOR
}


Usage:

User.role

OnboardingRequest.requestedRole

Security (future)

❌ Do NOT create multiple role enums.

3.4 Repository Layer

Use Spring Data JPA repositories ONLY

No DAO / DAOImpl pattern

No custom EntityManager unless absolutely required

Repositories extend:

JpaRepository<Entity, UUID>

3.5 Service Layer Responsibilities

Validation

Business rules

State transitions

Entity ↔ DTO mapping

Transactions (if needed)

Controllers must remain THIN.

4. Seller / Manufacturer Onboarding Design (REQUIRED)
Problem Being Solved

Users can request to become:

Manufacturer

Dealer

Distributor

Authorised Distributor

This must be an approval-based workflow, NOT automatic role escalation.

4.1 Onboarding Flow

User clicks "Become a Seller"

Selects seller type (role)

Selects material type (cement, tiles, etc.)

Fills onboarding form

Request is saved with status = PENDING

Admin gets notified (future)

Admin approves/rejects

On approval → user role is updated

4.2 Required Onboarding Entity

A new table must exist:
onboarding_requests

Suggested fields:

id (UUID)

user (FK)

requestedRole (ENUM)

businessType (ENUM or STRING)

companyName

gstin

officeAddress

serviceableLocations (TEXT / JSON)

description

businessModel (ENUM: COMMISSION, SUBSCRIPTION, BOTH)

status (ENUM: PENDING, APPROVED, REJECTED)

adminComment

createdAt

updatedAt

4.3 Onboarding Rules

Status defaults to PENDING

User role MUST NOT change until approved

User can see their onboarding status

Admin can approve or reject

Rejection must allow a comment

5. DTO Rules for Onboarding
OnboardingRequestDTO

No status

No adminComment

No userId (derived from auth later)

OnboardingResponseDTO

Includes status

Includes timestamps

Read-only

6. Database Migration Rules

PostgreSQL is used

Hibernate auto-DDL is enabled for now

Type changes (e.g., String → Boolean) may require:

Manual migration

OR column recreation in dev

Do NOT silently ignore schema mismatch errors.

7. Known Issues That MUST Be Fixed
Critical

Duplicate role enums

Boolean/String mismatch (Category.isActive)

Missing getters/setters causing access issues

Enum misuse as String

Medium

Inconsistent ID naming (id, productId, cartId)

Missing validation in DTOs

8. What NOT To Do

❌ Do NOT:

Introduce DAOImpl pattern

Expose entities directly

Auto-upgrade user roles

Use request params for complex objects

Overengineer security at this stage

9. What IS Expected From Agentic Mode

Agentic Mode is expected to:

Refactor role handling cleanly

Create onboarding entity, DTOs, service, controller

Fix schema issues safely

Maintain existing functionality

Follow Spring Boot best practices

Produce compilable, clean code

No speculative features. No unnecessary abstractions.

10. Overall Goal

Deliver a:

Secure

Scalable

Approval-based onboarding system

Clean REST API

Production-ready backend foundation