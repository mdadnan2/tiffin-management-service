"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const filters_1 = require("./common/filters");
const serverless_express_1 = require("@vendia/serverless-express");
let cachedServer;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new filters_1.AllExceptionsFilter());
    app.enableCors({
        origin: process.env.FRONTEND_URL || '*',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Tiffin Management API')
        .setDescription('Unified API for meal management system')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    if (process.env.AWS_EXECUTION_ENV) {
        await app.init();
        const expressApp = app.getHttpAdapter().getInstance();
        return (0, serverless_express_1.default)({ app: expressApp });
    }
    const port = process.env.PORT || 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Tiffin Management API running on http://0.0.0.0:${port}`);
    console.log(`📚 Swagger docs available at http://0.0.0.0:${port}/api/docs`);
}
const handler = async (event, context, callback) => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return cachedServer(event, context, callback);
};
exports.handler = handler;
if (!process.env.AWS_EXECUTION_ENV) {
    bootstrap();
}
//# sourceMappingURL=main.js.map