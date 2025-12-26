"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.headers['x-user-id']) {
        return {
            id: parseInt(request.headers['x-user-id']),
            role: request.headers['x-user-role'],
        };
    }
    return request.user;
});
//# sourceMappingURL=current-user.decorator.js.map