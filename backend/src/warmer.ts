import { Handler } from 'aws-lambda';
import { Lambda } from 'aws-sdk';

const lambda = new Lambda();

export const handler: Handler = async () => {
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
  } catch (error) {
    console.error('Warming failed:', error);
  }
};
