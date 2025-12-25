# Deployment Guide

This guide explains how to deploy the Tiffin Management System to free-tier cloud platforms.

---

## 🎯 Deployment Architecture

```
Vercel (Frontend)  →  Railway/Render (Backend)  →  Railway/Supabase (Database)
   Free Tier              Free Tier                    Free Tier
```

**Total Cost**: $0/month (with limitations)

---

## 📋 Prerequisites

- GitHub account
- Vercel account
- Railway or Render account
- Database provider account (Railway/Supabase)

---

## 🗄️ Step 1: Deploy Database

### Option A: Railway PostgreSQL

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Provision PostgreSQL"
3. Copy the `DATABASE_URL` from the "Connect" tab
4. Format: `postgresql://user:password@host:port/database`

### Option B: Supabase PostgreSQL

1. Go to [Supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy "Connection string" (URI mode)
5. Replace `[YOUR-PASSWORD]` with your actual password

---

## 🔧 Step 2: Deploy Backend

### Option A: Railway

1. **Create New Project**
   - Go to Railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configure Service**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

3. **Add Environment Variables**
   ```
   DATABASE_URL=<your-postgres-url>
   PORT=3001
   NODE_ENV=production
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRATION=15m
   JWT_REFRESH_SECRET=<generate-strong-refresh-secret>
   JWT_REFRESH_EXPIRATION=7d
   ```

4. **Run Migrations**
   - In Railway dashboard, open service terminal
   - Run: `npx prisma migrate deploy`
   - Run: `npx prisma db seed`

5. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this for frontend configuration

### Option B: Render

1. **Create New Web Service**
   - Go to Render.com
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `tiffin-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

3. **Add Environment Variables**
   ```
   DATABASE_URL=<your-postgres-url>
   PORT=3001
   NODE_ENV=production
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRATION=15m
   JWT_REFRESH_SECRET=<generate-strong-refresh-secret>
   JWT_REFRESH_EXPIRATION=7d
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

5. **Run Migrations**
   - In Render dashboard, go to "Shell"
   - Run: `npx prisma migrate deploy`
   - Run: `npx prisma db seed`

6. **Get Backend URL**
   - Render will provide a URL like: `https://your-app.onrender.com`
   - Copy this for frontend configuration

---

## 🎨 Step 3: Deploy Frontend

### Vercel Deployment

1. **Import Project**
   - Go to [Vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Add Environment Variable**
   - Go to "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
     ```
   - Replace with your actual backend URL from Step 2

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Vercel will provide a URL like: `https://your-app.vercel.app`

5. **Test**
   - Visit your Vercel URL
   - Try logging in with demo credentials:
     - Email: `demo@tiffin.com`
     - Password: `demo123`

---

## 🔐 Step 4: Generate Secure Secrets

**For JWT_SECRET and JWT_REFRESH_SECRET**, use strong random strings:

### Using Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Using OpenSSL:
```bash
openssl rand -hex 32
```

### Using Online Tool:
- Visit: https://generate-secret.vercel.app/32

**Important**: Use different secrets for `JWT_SECRET` and `JWT_REFRESH_SECRET`

---

## 🔄 Step 5: Update CORS (Backend)

If you encounter CORS errors, update `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app',
  ],
  credentials: true,
});
```

Redeploy backend after this change.

---

## ✅ Step 6: Verify Deployment

### Backend Health Check
```bash
curl https://your-backend-url.railway.app/auth/health
# Expected: {"status":"ok"}
```

### Frontend Check
1. Visit your Vercel URL
2. Open browser DevTools → Network tab
3. Try logging in
4. Verify API calls go to your backend URL

### Database Check
```bash
# In Railway/Render shell
npx prisma studio
```

---

## 📊 Free Tier Limitations

### Railway
- **Compute**: 500 hours/month
- **Database**: 1GB storage
- **Bandwidth**: 100GB/month
- **Sleeps**: After 30 min inactivity

### Render
- **Compute**: 750 hours/month
- **RAM**: 512MB
- **Sleeps**: After 15 min inactivity
- **Cold Start**: ~30 seconds

### Vercel
- **Bandwidth**: 100GB/month
- **Builds**: 6000 min/month
- **Serverless**: 100GB-hours

### Supabase
- **Database**: 500MB storage
- **Bandwidth**: 2GB/month
- **API Requests**: 50,000/month

---

## 🚀 Performance Optimization

### Backend (Railway/Render)

1. **Keep Service Awake**
   - Use a cron job to ping your backend every 10 minutes
   - Example: https://cron-job.org

2. **Optimize Cold Starts**
   - Minimize dependencies
   - Use `npm ci` instead of `npm install`

3. **Database Connection Pooling**
   - Prisma handles this automatically
   - Default pool size: 10 connections

### Frontend (Vercel)

1. **Enable Edge Caching**
   - Already optimized by Vercel
   - Static assets cached globally

2. **Image Optimization**
   - Use Next.js `<Image>` component
   - Automatic WebP conversion

---

## 🐛 Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Verify DATABASE_URL format
- Check logs in Railway/Render dashboard

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS configuration
- Ensure backend is running

### Database connection errors
- Verify DATABASE_URL is correct
- Check database is running
- Run migrations: `npx prisma migrate deploy`

### 401 Unauthorized errors
- Check JWT_SECRET matches between deployments
- Verify tokens are being sent in headers
- Check token expiration times

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Railway/Render:**
- Automatically deploys on push to `main` branch
- Configure in dashboard settings

**Vercel:**
- Automatically deploys on push to `main` branch
- Preview deployments for pull requests

### Manual Deployments

**Railway:**
```bash
railway up
```

**Render:**
- Click "Manual Deploy" in dashboard

**Vercel:**
```bash
vercel --prod
```

---

## 📈 Monitoring

### Backend Monitoring

**Railway:**
- View logs in dashboard
- Monitor CPU/Memory usage
- Set up alerts

**Render:**
- View logs in dashboard
- Monitor response times
- Set up health checks

### Frontend Monitoring

**Vercel:**
- Analytics dashboard
- Web Vitals tracking
- Error tracking

---

## 💰 Cost Scaling

### When to Upgrade

**Backend:**
- Consistent traffic > 500 hours/month
- Need for always-on service
- Database > 1GB

**Upgrade Options:**
- Railway: $5/month (Hobby)
- Render: $7/month (Starter)

**Database:**
- Supabase: $25/month (Pro)
- Railway: Included in Hobby plan

---

## 🔐 Production Checklist

- [ ] Strong JWT secrets generated
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Seed data loaded
- [ ] CORS configured correctly
- [ ] HTTPS enabled (automatic)
- [ ] Health checks working
- [ ] Demo users accessible
- [ ] API documentation accessible
- [ ] Error logging configured

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

**Deployment Time**: ~30 minutes for first deployment

**Maintenance**: Minimal (automatic updates via GitHub)
