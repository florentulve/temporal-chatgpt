import {proxyActivities} from '@temporalio/workflow';
import type * as activities from './activities';

const { gptQuery } = proxyActivities<typeof activities>({
  retry: {
    initialInterval: '50 milliseconds',
    maximumAttempts: 2,
  },
  startToCloseTimeout: '5 minutes',
  heartbeatTimeout: '10 seconds',
});

export async function myWorkflow(prompt: string ): Promise<void> {
  console.log("gptWorkflow"); 
  const result = await gptQuery(prompt);
  console.log(result);
}