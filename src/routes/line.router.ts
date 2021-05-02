import { Router } from 'express';
import LineWebhookController from 'controllers/linewebhook.controller';

const lineRouter: Router = Router();

lineRouter.post('/webhook', LineWebhookController.index);

export default lineRouter;
