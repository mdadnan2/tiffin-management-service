# Architecture Decision Record

This document explains the architectural decisions made for the Tiffin Management System and the rationale behind choosing a modular monolithic architecture over microservices.

---

## 🎯 Architecture Overview

**Current**: Modular Monolithic Architecture  
**Future**: Microservices-Ready Design

---

## 🤔 Why Not Microservices?

### The Honest Answer

This project **could** be built as microservices, but it **shouldn't** be—at least not initially. Here's why:

### 1. **Deployment Cost**

**Microservices (4 services):**
```
Auth Service:    $7/month  (Render)
User Service:    $7/month  (Render)
Meal Service:    $7/month  (Render)
Admin Service:   $7/month  (Render)
API Gateway:     $7/month  (Render)
Database:       $25/month  (Supabase Pro)
─────────────────────────────────────
Total:          $60/month
```

**Monolith:**
```
Backend:         $0-7/month  (Railway/Render)
Database:        $0-25/month (Railway/Supabase)
─────────────────────────────────────
Total:           $0-32/month
```

**Savings**: $28-60/month

### 2. **Operational Complexity**

**Microservices require:**
- Service discovery (Consul/Eureka)
- API Gateway (Kong/NGINX)
- Inter-service communication
- Distributed tracing
- Centralized logging
- Container orchestration
- Multiple deployment pipelines

**Monolith requires:**
- Single deployment
- Single database connection
- Simple logging
- Standard monitoring

### 3. **Development Speed**

**Microservices:**
- Setup time: 2-3 days
- Feature development: Slower (cross-service changes)
- Debugging: Complex (distributed tracing needed)
- Testing: Requires service mocking

**Monolith:**
- Setup time: 1-2 hours
- Feature development: Faster (in-process calls)
- Debugging: Simple (single codebase)
- Testing: Straightforward (unit + integration)

### 4. **Database Connections**

**Free-tier limitations:**
- Railway: 10 connections
- Supabase: 15 connections
- Render: 10 connections

**Microservices (4 services):**
- Each service needs 2-5 connections
- Total: 8-20 connections
- **Problem**: Exceeds free-tier limits

**Monolith:**
- Single connection pool
- Total: 2-5 connections
- **Solution**: Fits within free-tier

### 5. **Network Latency**

**Microservices:**
```
Client → API Gateway → Auth Service → Database
                    → User Service → Database
                    → Meal Service → Database
```
- 3-4 network hops
- 50-200ms latency per hop
- Total: 150-800ms

**Monolith:**
```
Client → Backend → Database
```
- 1 network hop
- 50-200ms total latency
- **3-4x faster**

---

## ✅ When Microservices Make Sense

### Traffic Thresholds

**Monolith is sufficient when:**
- < 1000 requests/minute
- < 100 concurrent users
- < 1GB database
- Single region deployment

**Microservices become necessary when:**
- > 10,000 requests/minute
- > 1000 concurrent users
- > 10GB database
- Multi-region deployment
- Different scaling needs per service

### Team Size

**Monolith works well with:**
- 1-5 developers
- Single team
- Shared codebase
- Coordinated releases

**Microservices work better with:**
- 10+ developers
- Multiple teams
- Independent codebases
- Independent releases

### Business Requirements

**Monolith is appropriate when:**
- Rapid prototyping needed
- MVP/Portfolio project
- Limited budget
- Simple deployment

**Microservices are appropriate when:**
- High availability required (99.99%+)
- Independent scaling needed
- Different tech stacks per service
- Large enterprise with multiple teams

---

## 🏗️ Current Architecture: Modular Monolith

### Design Principles

1. **Clear Module Boundaries**
   - Each module is self-contained
   - Minimal dependencies between modules
   - Interface-based contracts

2. **Dependency Injection**
   - Constructor-based injection
   - Easy to mock for testing
   - Ready for service extraction

3. **Single Responsibility**
   - AuthModule: Authentication only
   - UsersModule: User management only
   - MealsModule: Meal operations only
   - AdminModule: Admin operations only

4. **Shared Infrastructure**
   - PrismaModule: Global database access
   - Common utilities: Guards, decorators, filters

### Module Structure

```typescript
// Each module follows this pattern:

@Module({
  imports: [],           // Dependencies
  controllers: [],       // HTTP layer
  providers: [],         // Business logic
  exports: [],          // Public API
})
export class FeatureModule {}
```

### Communication Pattern

**Current (In-Process):**
```typescript
// Direct service injection
constructor(
  private usersService: UsersService,
  private mealsService: MealsService,
) {}

// In-process function call
const user = await this.usersService.getProfile(userId);
```

**Future (HTTP/gRPC):**
```typescript
// HTTP client injection
constructor(
  private httpService: HttpService,
) {}

// Network call
const user = await this.httpService.get(
  'http://user-service/users/profile'
);
```

---

## 🔄 Evolution Path

### Phase 1: Modular Monolith (Current)

**Characteristics:**
- Single NestJS application
- Clear module boundaries
- Shared database
- In-process calls

**Benefits:**
- Fast development
- Simple deployment
- Low cost
- Easy debugging

**Limitations:**
- Vertical scaling only
- Shared resources
- Single point of failure

### Phase 2: Modular Monolith + Caching

**Add:**
- Redis for caching
- Rate limiting
- Session management

**When:**
- > 100 concurrent users
- Repeated database queries
- Need for session storage

### Phase 3: Microservices

**Extract services:**
1. Auth Service (most critical)
2. Meal Service (highest load)
3. User Service
4. Admin Service

**Add infrastructure:**
- API Gateway (Kong/NGINX)
- Service Discovery (Consul)
- Message Queue (RabbitMQ)
- Distributed Tracing (Jaeger)

**When:**
- > 1000 concurrent users
- Need independent scaling
- Multiple teams
- Budget > $100/month

### Phase 4: Cloud-Native

**Add:**
- Kubernetes orchestration
- Auto-scaling
- Multi-region deployment
- CDN integration
- Advanced monitoring

**When:**
- > 10,000 concurrent users
- Global user base
- High availability requirements
- Budget > $500/month

---

## 📊 Performance Comparison

### Response Time

| Architecture | Avg Response Time | P95 Response Time |
|--------------|-------------------|-------------------|
| Monolith     | 50-100ms          | 150-200ms         |
| Microservices| 150-300ms         | 400-600ms         |

### Throughput

| Architecture | Requests/Second | Max Concurrent Users |
|--------------|-----------------|----------------------|
| Monolith     | 100-500         | 100-500              |
| Microservices| 1000-5000       | 1000-10000           |

### Resource Usage

| Architecture | CPU Usage | Memory Usage | Database Connections |
|--------------|-----------|--------------|----------------------|
| Monolith     | 20-40%    | 256-512MB    | 2-5                  |
| Microservices| 40-80%    | 1-2GB        | 8-20                 |

---

## 🎓 Key Takeaways

### For Interviews

**Question**: "Why didn't you use microservices?"

**Answer**: 
> "I chose a modular monolithic architecture because it's the right tool for this scale. Microservices would add unnecessary complexity, cost, and latency without providing benefits at this traffic level. However, I designed the modules with clear boundaries and interfaces, making it straightforward to extract them into microservices when the business requirements justify it. This demonstrates understanding of both architectures and knowing when to apply each."

### For Portfolio

This project demonstrates:

1. **Architectural Maturity**
   - Understanding trade-offs
   - Choosing appropriate solutions
   - Planning for future growth

2. **Practical Engineering**
   - Cost-conscious decisions
   - Deployment-ready code
   - Production best practices

3. **Scalability Awareness**
   - Clear evolution path
   - Module boundaries
   - Interface-based design

---

## 📚 References

### Books
- "Building Microservices" by Sam Newman
- "Monolith to Microservices" by Sam Newman
- "Clean Architecture" by Robert C. Martin

### Articles
- [Monolith First](https://martinfowler.com/bliki/MonolithFirst.html) - Martin Fowler
- [Don't Start with Microservices](https://martinfowler.com/articles/dont-start-monolith.html)
- [The Majestic Monolith](https://m.signalvnoise.com/the-majestic-monolith/) - DHH

### Real-World Examples
- **Amazon**: Started as monolith, evolved to microservices
- **Netflix**: Migrated from monolith over 7 years
- **Shopify**: Still uses modular monolith for core
- **GitHub**: Monolith with 1000+ developers

---

## 🎯 Conclusion

**The best architecture is the one that:**
1. Solves the current problem
2. Fits the budget
3. Matches team capabilities
4. Allows for future growth

For this project, a modular monolith checks all boxes.

**Remember**: "Premature optimization is the root of all evil" - Donald Knuth

Start simple. Scale when needed. Design for change.
