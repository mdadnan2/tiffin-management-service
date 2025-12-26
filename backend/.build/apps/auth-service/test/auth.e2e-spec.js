"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
describe('Auth Service (e2e)', () => {
    let app;
    let accessToken;
    let refreshToken;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    describe('/auth/register (POST)', () => {
        it('should register a new user', () => {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: `test${Date.now()}@example.com`,
                password: 'test123',
                name: 'Test User',
            })
                .expect(201)
                .expect((res) => {
                expect(res.body).toHaveProperty('user');
                expect(res.body).toHaveProperty('accessToken');
                expect(res.body).toHaveProperty('refreshToken');
            });
        });
        it('should fail with invalid email', () => {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'invalid-email',
                password: 'test123',
                name: 'Test User',
            })
                .expect(400);
        });
    });
    describe('/auth/login (POST)', () => {
        it('should login with valid credentials', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'demo@tiffin.com',
                password: 'demo123',
            })
                .expect(201)
                .expect((res) => {
                expect(res.body).toHaveProperty('accessToken');
                expect(res.body).toHaveProperty('refreshToken');
                accessToken = res.body.accessToken;
                refreshToken = res.body.refreshToken;
            });
        });
        it('should fail with invalid credentials', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'demo@tiffin.com',
                password: 'wrongpassword',
            })
                .expect(401);
        });
    });
    describe('/auth/me (GET)', () => {
        it('should get current user with valid token', () => {
            return request(app.getHttpServer())
                .get('/auth/me')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('email', 'demo@tiffin.com');
            });
        });
        it('should fail without token', () => {
            return request(app.getHttpServer())
                .get('/auth/me')
                .expect(401);
        });
    });
    describe('/auth/refresh (POST)', () => {
        it('should refresh token', () => {
            return request(app.getHttpServer())
                .post('/auth/refresh')
                .send({ refreshToken })
                .expect(201)
                .expect((res) => {
                expect(res.body).toHaveProperty('accessToken');
            });
        });
    });
    describe('/auth/health (GET)', () => {
        it('should return health status', () => {
            return request(app.getHttpServer())
                .get('/auth/health')
                .expect(200)
                .expect({ status: 'ok' });
        });
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map