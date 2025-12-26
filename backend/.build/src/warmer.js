"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const lambda = new aws_sdk_1.Lambda();
const handler = async () => {
    const functionName = process.env.FUNCTION_NAME;
    if (!functionName) {
        console.log('No function name provided');
        return;
    }
    try {
        await lambda.invoke({
            FunctionName: functionName,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({
                source: 'warmer',
                path: '/health',
            }),
        }).promise();
        console.log(`Warmed function: ${functionName}`);
    }
    catch (error) {
        console.error('Warming failed:', error);
    }
};
exports.handler = handler;
//# sourceMappingURL=warmer.js.map