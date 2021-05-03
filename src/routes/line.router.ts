import { Router } from 'express';
import { middleware, MiddlewareConfig } from '@line/bot-sdk';
import LineWebhookController from 'controllers/linewebhook.controller';

const lineRouter: Router = Router();

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

lineRouter.use(middleware(middlewareConfig));

lineRouter.post('/webhook', LineWebhookController.index);

export default lineRouter;
