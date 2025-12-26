# Tiffin Management System

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/mdadnan2/tiffin-management-service)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

A full-stack meal management application built with **NestJS**, **Prisma**, **PostgreSQL**, and **Next.js**. This project demonstrates production-ready backend engineering with clean architecture, authentication, role-based access control, and RESTful API design.


---

## 🌐 Live Demo

**Frontend**: https://your-app.vercel.app  
**Backend API**: https://your-backend.railway.app  
**API Docs**: https://your-backend.railway.app/api/docs

**Demo Credentials**:
- User: `demo@tiffin.com` / `demo123`
- Admin: `admin@tiffin.com` / `demo123`

**Note**: First load may take 5-10 seconds due to Railway's free tier cold start.

---

## 📖 Overview

The Tiffin Management System allows users to schedule and manage daily meals (breakfast, lunch, dinner) with automatic pricing, bulk scheduling, and analytics dashboards. Admins can monitor user activity and meal statistics.

**Key Features:**
- User authentication with JWT (access + refresh tokens)
- Role-based access control (USER, ADMIN)
- Meal CRUD operations with bulk scheduling
- Dynamic pricing per user with price locking
- Dashboard analytics with totals and breakdowns
- Clean modular architecture ready for microservices evolution

---

## 🛠️ Tech Stack

### Backend (Primary Focus)
- **Framework**: NestJS (TypeScript)
- **ORM**: Prisma
- **Database**: PostgreSQL 15
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: class-validator, class-transformer
- **HTTP Client**: Axios
- **Testing**: Jest

### Frontend
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

### Infrastructure
- **Database**: PostgreSQL (Railway/Render/Supabase)
- **Backend Hosting**: Railway/Render/AWS Lambda
- **Frontend Hosting**: Vercel
- **Database Management**: Prisma Migrate

---

## 🏗️ Architecture

### Current Deployment Architecture (Monolithic)

This project uses a **modular monolithic architecture** optimized for deployment on free-tier cloud platforms. All business logic runs in a single NestJS application with clear module boundaries.

```
┌─────────────────────────────────────────────────────────┐
│              Client (Next.js on Vercel)                  │
│                   Port: 3000                             │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST
                     ▼
┌─────────────────────────────────────────────────────────┐
│         NestJS API (Railway/Render)                      │
│                   Port: 3001                             │
│  ┌──────────────────────────────────────────────────┐   │
│  │  AuthModule    │  UsersModule  │  MealsModule    │   │
│  │  AdminModule   │  PrismaModule │  Guards/Pipes   │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │ Prisma ORM
                     ▼
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL Database                         │
│         (Railway/Render/Supabase)                        │
└─────────────────────────────────────────────────────────┘
```

### Request Flow

```
Client Request
  → NestJS Controller (validation, auth guards)
    → Service Layer (business logic)
      → Prisma Client (ORM)
        → PostgreSQL Database
          → Response back through layers
```

### Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| **AuthModule** | Registration, login, JWT token management |
| **UsersModule** | User profiles, meal price settings |
| **MealsModule** | Meal CRUD, bulk operations, dashboard analytics |
| **AdminModule** | Admin monitoring, user statistics |
| **PrismaModule** | Database access layer (global) |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   │
│   ├── modules/                   # Feature modules
│   │   ├── auth/                  # Authentication
│   │   │   ├── dto/
│   │   │   ├── strategies/        # JWT, Local, Refresh strategies
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── users/                 # User management
│   │   │   ├── dto/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   │
│   │   ├── meals/                 # Meal management + Dashboard
│   │   │   ├── dto/
│   │   │   ├── meals.controller.ts
│   │   │   ├── meals.service.ts
│   │   │   └── meals.module.ts
│   │   │
│   │   └── admin/                 # Admin operations
│   │       ├── admin.controller.ts
│   │       ├── admin.service.ts
│   │       └── admin.module.ts
│   │
│   ├── prisma/                    # Database layer
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   │
│   └── common/                    # Shared utilities
│       ├── decorators/            # @CurrentUser, @Roles
│       ├── guards/                # RolesGuard
│       └── filters/               # Exception filters
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── migrations/                # Migration history
│   └── seed.ts                    # Seed script
│
├── .env                           # Environment variables
├── package.json
└── tsconfig.json

frontend/
├── src/
│   ├── app/                       # Next.js pages
│   ├── components/                # React components
│   ├── lib/
│   │   └── api.ts                 # API client (single backend URL)
│   └── types/
├── .env.local                     # Frontend environment
└── package.json
```

---

## 🎯 Why This Architecture?

### Current: Modular Monolith

**Chosen for:**
- ✅ **Free-tier deployment** (Railway/Render free tier)
- ✅ **Single database connection** (no connection pool exhaustion)
- ✅ **Zero network latency** (in-process function calls)
- ✅ **Simplified deployment** (one service to deploy)
- ✅ **Lower operational cost** ($0/month possible)
- ✅ **Faster development** (no inter-service communication)

**Trade-offs:**
- ⚠️ Scales vertically (single instance)
- ⚠️ All modules share same resources
- ⚠️ Deployment affects entire application

### Future: Microservices Architecture

**When to evolve:**
- High traffic requiring horizontal scaling
- Team size > 5 developers
- Need for independent deployment cycles
- Different scaling requirements per module
- Budget for infrastructure ($100+/month)

**How each module becomes a service:**

```
Current Module          →  Future Microservice
─────────────────────────────────────────────────
AuthModule              →  Auth Service (3001)
UsersModule             →  User Service (3002)
MealsModule             →  Meal Service (3003)
AdminModule             →  Admin Service (3004)
```

**Additional infrastructure needed:**
- API Gateway (Kong/NGINX)
- Service Discovery (Consul/Eureka)
- Message Queue (RabbitMQ/Kafka)
- Distributed Tracing (Jaeger)
- Centralized Logging (ELK Stack)
- Container Orchestration (Kubernetes)

---

## ⚙️ Environment Setup

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **npm** or **yarn**
- **PostgreSQL**: 15+ (local or cloud)

### Environment Variables

**Backend** (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/tiffin_db"
PORT=3001
NODE_ENV=development

JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRATION="15m"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
JWT_REFRESH_EXPIRATION="7d"
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

## 🚀 Running the Project

### Local Development

```bash
# 1. Start PostgreSQL (Docker or local)
cd backend
npm run start:db

# 2. Run migrations and seed data
npm run setup

# 3. Start backend (in backend/)
npm run start:dev

# 4. Start frontend (in frontend/)
cd ../frontend
npm run dev
```

**Access:**
- Backend API: http://localhost:3001
- Swagger Docs: http://0.0.0.0:3001/api/docs
- Frontend: http://localhost:3000

**Demo Users:**
- User: `demo@tiffin.com` / `demo123`
- Admin: `admin@tiffin.com` / `demo123`

---

## 🗄️ Database & Prisma

### Schema Overview

- **User**: Authentication, roles, profile
- **PriceSetting**: Per-user meal pricing
- **MealRecord**: Meal records with date, type, count, price snapshot

### Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run migrate

# Apply migrations (production)
npm run migrate:deploy

# Seed database
npm run seed

# Open Prisma Studio
npm run prisma:studio
```

---

## 🔌 API Documentation

### Authentication

```bash
POST /auth/register    # Register new user
POST /auth/login       # Login user
POST /auth/refresh     # Refresh access token
GET  /auth/me          # Get current user
```

### Users

```bash
GET    /users/profile       # Get own profile
PATCH  /users/profile       # Update own profile
GET    /users               # List all users (admin)
GET    /users/me/price      # Get own meal prices
PATCH  /users/me/price      # Update own meal prices
```

### Meals

```bash
POST   /meals               # Create/update meal
POST   /meals/bulk          # Create bulk meals
GET    /meals               # List meals
GET    /meals/calendar      # Get calendar view
PATCH  /meals/bulk          # Bulk update meals
DELETE /meals/bulk          # Bulk cancel meals
PATCH  /meals/:id           # Update meal
DELETE /meals/:id           # Cancel meal
```

### Dashboard

```bash
GET /dashboard              # Get user dashboard
GET /dashboard/monthly      # Get monthly dashboard
GET /dashboard/weekly       # Get weekly dashboard
```

### Admin

```bash
GET /admin/users                    # Get all users with stats
GET /admin/users/:id/summary        # Get user summary
```

---

## 🚢 Deployment Guide

### Backend Deployment Options

#### Option 1: Railway/Render (Recommended)

**Railway:**
1. Connect GitHub repository
2. Set environment variables
3. Railway auto-detects NestJS
4. Deploy from `backend/` directory

**Render:**
1. Create new Web Service
2. Build Command: `cd backend && npm install && npm run build`
3. Start Command: `cd backend && npm run start:prod`
4. Add environment variables

**Environment Variables:**
```
DATABASE_URL=<your-postgres-url>
PORT=3001
NODE_ENV=production
JWT_SECRET=<strong-secret>
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=<strong-refresh-secret>
JWT_REFRESH_EXPIRATION=7d
```

#### Option 2: AWS Lambda (Experimental)

**⚠️ Educational Deployment - See Limitations Below**

For a complete AWS Lambda deployment guide, see [AWS_LAMBDA_DEPLOYMENT.md](./AWS_LAMBDA_DEPLOYMENT.md)

**Quick Overview:**
```bash
cd backend
npm install -g serverless
serverless deploy --stage prod
```

**Known Limitations:**
- ❌ Cold start latency (2-5 seconds first request)
- ❌ Prisma connection pooling challenges
- ❌ Higher complexity vs traditional hosting
- ❌ Debugging more difficult (CloudWatch logs)
- ⚠️ Not recommended for production with this stack

**When Lambda Makes Sense:**
- ✅ Sporadic traffic (not constant)
- ✅ Stateless operations
- ✅ Cost optimization at scale
- ✅ Learning serverless architecture

**Why Railway/Render is Better for This Project:**
- ✅ No cold starts
- ✅ Persistent connections
- ✅ Simpler debugging
- ✅ Better Prisma compatibility
- ✅ Free tier sufficient for demos

### Frontend Deployment (Vercel)

1. Import GitHub repository
2. Framework: Next.js
3. Root Directory: `frontend`
4. Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
5. Deploy

### Database (Railway/Supabase)

**Railway PostgreSQL:**
- Automatic provisioning
- Copy DATABASE_URL to backend env

**Supabase:**
- Create project
- Get connection string
- Use in DATABASE_URL

---

## 📜 NPM Scripts

### Backend

```bash
npm run start:dev         # Start in watch mode
npm run build             # Build for production
npm run start:prod        # Start production build
npm run migrate           # Create and apply migration
npm run seed              # Seed demo users
npm run prisma:generate   # Generate Prisma Client
npm run prisma:studio     # Open Prisma Studio GUI
```

### Frontend

```bash
npm run dev               # Start development server
npm run build             # Build for production
npm run start             # Start production server
```

---

## 🔒 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with short expiration (15 min access, 7 days refresh)
- Role-based access control enforced at route level
- Input validation on all endpoints
- SQL injection prevention via Prisma parameterized queries

**Production Recommendations:**
- Use environment-specific secrets
- Enable HTTPS only
- Implement rate limiting
- Add CORS whitelist
- Use RS256 (asymmetric) for JWT
- Store secrets in secret managers (AWS Secrets Manager, etc.)

---

## 🎓 Learning Outcomes

This project demonstrates:

1. **Clean Architecture**: Separation of concerns with modules
2. **Authentication & Authorization**: JWT + RBAC implementation
3. **Database Design**: Normalized schema with Prisma
4. **API Design**: RESTful endpoints with proper HTTP methods
5. **Validation**: DTO-based request validation
6. **Error Handling**: Global exception filters
7. **Deployment**: Cloud-ready configuration
8. **Scalability**: Module boundaries ready for microservices

---

## 🔄 Evolution Path: Monolith → Microservices

### Phase 1: Current (Monolith)
- Single NestJS application
- Shared database connection
- In-process function calls
- **Cost**: $0-10/month

### Phase 2: Modular Monolith (Current)
- Clear module boundaries
- Dependency injection
- Interface-based contracts
- **Cost**: $0-10/month

### Phase 3: Microservices (Future)
- Extract modules to services
- Add API Gateway
- Implement service discovery
- Add message queues
- **Cost**: $100+/month

### Phase 4: Cloud-Native (Production)
- Kubernetes orchestration
- Auto-scaling
- Distributed tracing
- Centralized logging
- **Cost**: $500+/month

---

## 🤝 Best Practices Implemented

### Module Boundaries
- Each module is self-contained
- Clear interfaces between modules
- No circular dependencies
- Ready for extraction to microservices

### Dependency Injection
- Constructor-based injection
- Interface-driven design
- Easy to mock for testing

### Configuration Management
- Environment-based configuration
- No hardcoded values
- Validation at startup

### Error Handling
- Global exception filter
- Consistent error responses
- Proper HTTP status codes

---

## 📚 Additional Documentation

- [Prisma Schema](backend/prisma/schema.prisma)
- [API Documentation](http://0.0.0.0:3001/api/docs) (Swagger)

---

## 📄 License

This project is licensed under the **MIT License**.

**Disclaimer**: This is a portfolio/demo project created for educational and showcase purposes. It is not intended for production use without proper security hardening, testing, and infrastructure setup.

---

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using NestJS, TypeScript, Prisma, and PostgreSQL**

**Architecture Philosophy**: "Start simple, scale smart. Build for today, design for tomorrow."
