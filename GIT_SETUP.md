# Git Setup Guide

## ✅ Quick Setup (5 Minutes)

### 1. Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Tiffin Management System"
```

### 2. Create GitHub Repository
- Go to https://github.com/new
- Name: `tiffin-management-system`
- Visibility: Public/Private
- **Don't** initialize with README
- Click "Create repository"

### 3. Connect & Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/tiffin-management-system.git
git branch -M main
git push -u origin main
```

---

## 🔐 Authentication

### Option 1: Personal Access Token (Recommended)
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scope: `repo`
4. Copy token
5. Use as password when pushing

### Option 2: GitHub CLI (Easiest)
```bash
gh auth login
gh repo create tiffin-management-system --public --source=. --push
```

---

## 📋 Daily Git Commands

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull latest
git pull

# Create branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# View history
git log --oneline
```

---

## 🌿 Branching Strategy

```
main (production)
  ├── develop (development)
  │   ├── feature/user-auth
  │   ├── feature/meal-dashboard
  │   └── bugfix/login-issue
```

### Workflow:
```bash
# Create feature branch
git checkout -b feature/new-dashboard

# Work on feature
git add .
git commit -m "Add new dashboard"

# Push feature
git push -u origin feature/new-dashboard

# Merge to main (via GitHub PR)
```

---

## 🚀 Deployment Integration

### Automatic Deployment on Push

**Railway/Render:**
- Connects to GitHub
- Auto-deploys on push to `main`

**Vercel:**
- Connects to GitHub
- Auto-deploys on push to `main`
- Preview deployments for PRs

---

## 📝 Commit Message Convention

```bash
# Format: <type>: <description>

feat: Add meal analytics dashboard
fix: Resolve login authentication bug
docs: Update README with deployment guide
style: Format code with Prettier
refactor: Restructure meal service
test: Add unit tests for auth module
chore: Update dependencies
```

---

## 🔄 Useful Git Commands

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- .

# View remote URL
git remote -v

# Update remote URL
git remote set-url origin NEW_URL

# Delete branch
git branch -d feature/old-feature

# Stash changes
git stash
git stash pop

# View diff
git diff
```

---

## 🛡️ .gitignore Highlights

Already configured to ignore:
- `node_modules/`
- `.env` files
- `dist/` and `build/`
- `.next/` (Next.js build)
- IDE files (`.vscode/`, `.idea/`)
- Logs and cache

---

## 📦 What's Tracked in Git

✅ **Included:**
- Source code (`src/`)
- Configuration files
- Documentation (`.md` files)
- Prisma schema
- Package.json files
- Docker files

❌ **Excluded:**
- Dependencies (`node_modules/`)
- Environment variables (`.env`)
- Build outputs (`dist/`, `.next/`)
- Logs and cache

---

## 🎯 First Push Checklist

- [ ] Git initialized (`git init`)
- [ ] All files added (`git add .`)
- [ ] Initial commit created
- [ ] GitHub repository created
- [ ] Remote added (`git remote add origin`)
- [ ] Pushed to GitHub (`git push -u origin main`)
- [ ] Repository visible on GitHub
- [ ] README.md displays correctly

---

## 🔗 Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [GitHub CLI](https://cli.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Ready to push!** 🚀
