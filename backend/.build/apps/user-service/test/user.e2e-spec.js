"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
describe('User Service (e2e)', () => {
    let app;
    let accessToken;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe());
        await app.init();
        const authResponse = await request('http://localhost:3001')
            .post('/auth/login')
            .send({ email: 'demo@tiffin.com', password: 'demo123' });
        accessToken = authResponse.body.accessToken;
    });
    afterAll(async () => {
        await app.close();
    });
    describe('/users/profile (GET)', () => {
        it('should get user profile', () => {
            return request(app.getHttpServer())
                .get('/users/profile')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('email');
                expect(res.body).toHaveProperty('name');
            });
        });
    });
    describe('/users/profile (PATCH)', () => {
        it('should update user profile', () => {
            return request(app.getHttpServer())
                .patch('/users/profile')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ name: 'Updated Name' })
                .expect(200);
        });
    });
    describe('/users/me/price (GET)', () => {
        it('should get user price settings', () => {
            return request(app.getHttpServer())
                .get('/users/me/price')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('breakfast');
                expect(res.body).toHaveProperty('lunch');
            });
        });
    });
    describe('/users/me/price (PATCH)', () => {
        it('should update price settings', () => {
            return request(app.getHttpServer())
                .patch('/users/me/price')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ breakfast: 50, lunch: 80 })
                .expect(200);
        });
    });
    describe('/users/health (GET)', () => {
        it('should return health status', () => {
            return request(app.getHttpServer())
                .get('/users/health')
                .expect(200)
                .expect({ status: 'ok' });
        });
    });
});
//# sourceMappingURL=user.e2e-spec.js.map