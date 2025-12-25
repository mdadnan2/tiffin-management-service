# Quick Start Guide

Get the Tiffin Management System running in 5 minutes.

---

## 🚀 Prerequisites

- Node.js 18+ installed
- PostgreSQL 15+ installed (or Docker)
- Git installed

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd Tiffin-Management-Prod
```

### 2. Install Dependencies

```bash
npm run install:all
```

This installs dependencies for both backend and frontend.

---

## 🗄️ Database Setup

### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL in Docker
npm run start:db

# Wait 10 seconds for database to be ready
```

### Option B: Using Local PostgreSQL

1. Create database:
```sql
CREATE DATABASE tiffin_db;
```

2. Update `backend/.env`:
```env
DATABASE_URL="postgresql://your-user:your-password@localhost:5432/tiffin_db"
```

---

## 🔧 Backend Setup

```bash
cd backend

# Run migrations
npm run migrate

# Seed demo data
npm run seed

# Start backend
npm run start:dev
```

**Backend running at**: http://localhost:3001  
**Swagger docs at**: http://localhost:3001/api/docs

---

## 🎨 Frontend Setup

```bash
cd frontend

# Start frontend
npm run dev
```

**Frontend running at**: http://localhost:3000

---

## 🎉 Test the Application

### 1. Open Browser

Navigate to: http://localhost:3000

### 2. Login with Demo Account

**User Account:**
- Email: `demo@tiffin.com`
- Password: `demo123`

**Admin Account:**
- Email: `admin@tiffin.com`
- Password: `demo123`

### 3. Try Features

- Create a meal
- View dashboard
- Update meal prices
- (Admin) View all users

---

## 🛠️ Development Workflow

### Backend Development

```bash
cd backend
npm run start:dev    # Auto-reload on changes
```

### Frontend Development

```bash
cd frontend
npm run dev          # Auto-reload on changes
```

### Database Changes

```bash
cd backend

# 1. Edit prisma/schema.prisma
# 2. Create migration
npm run migrate

# 3. Regenerate Prisma Client
npm run prisma:generate
```

---

## 📚 API Documentation

Visit: http://localhost:3001/api/docs

Interactive Swagger documentation with:
- All endpoints
- Request/response schemas
- Try-it-out functionality

---

## 🐛 Troubleshooting

### Port Already in Use

**Windows:**
```bash
netstat -ano | findstr :3001
taskkill /F /PID <PID>
```

**Mac/Linux:**
```bash
lsof -ti:3001 | xargs kill
```

### Database Connection Error

1. Check PostgreSQL is running:
```bash
docker ps    # If using Docker
```

2. Verify DATABASE_URL in `backend/.env`

3. Test connection:
```bash
cd backend
npx prisma studio
```

### Frontend Can't Connect to Backend

1. Check backend is running on port 3001
2. Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
3. Check browser console for errors

---

## 🔄 Reset Database

```bash
cd backend

# Drop and recreate database
npx prisma migrate reset

# This will:
# 1. Drop database
# 2. Create database
# 3. Run all migrations
# 4. Run seed script
```

---

## 📖 Next Steps

- Read [README.md](README.md) for full documentation
- Read [ARCHITECTURE.md](ARCHITECTURE.md) for design decisions
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- Explore API at http://localhost:3001/api/docs

---

## 🆘 Need Help?

- Check [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Check logs:
  - Backend: Terminal where `npm run start:dev` is running
  - Frontend: Browser console (F12)

---

**Total Setup Time**: ~5 minutes

**Happy Coding! 🎉**
