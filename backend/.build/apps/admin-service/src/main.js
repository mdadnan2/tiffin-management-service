"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const consul_client_1 = require("@app/common/consul-client");
const common_2 = require("@app/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new common_2.AllExceptionsFilter());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Admin Service API')
        .setDescription('Admin monitoring and user statistics')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = 3004;
    await app.listen(port, '0.0.0.0');
    console.log(`Admin Service running on http://0.0.0.0:${port}`);
    console.log(`Swagger docs available at http://0.0.0.0:${port}/api/docs`);
    const consul = new consul_client_1.ConsulClient();
    await consul.register();
    process.on('SIGTERM', async () => {
        await consul.deregister();
        await app.close();
    });
}
bootstrap();
//# sourceMappingURL=main.js.map