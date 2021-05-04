import { Router } from 'express';
import LineWebhookController from 'controllers/linewebhook.controller';

const lineRouter: Router = Router();

lineRouter.use(LineWebhookController.verifyRequest);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
lineRouter.post('/webhook', LineWebhookController.index);

export default lineRouter;
