import { Request, Response, NextFunction } from 'express';
import {
  LINE_SIGNATURE_HTTP_HEADER_NAME,
  WebhookEvent,
  WebhookRequestBody,
} from '@line/bot-sdk';
import logger from 'libs/winston';

import LineService from 'services/line.service';

export default class LineWebhookController {
  public static index = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const {
      events,
    }: { events: WebhookEvent[] } = req.body as WebhookRequestBody;
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await LineService.handleEvent(event);
        } catch (err: unknown) {
          if (err instanceof Error) logger.error(err);
          return res.status(500).json({ error: err });
        }
      })
    );

    return res.status(200).json({
      error: false,
      data: { results },
    });
  };
  public static verifyRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const signature = req.headers[LINE_SIGNATURE_HTTP_HEADER_NAME] as string;
    if (!signature) {
      logger.error('no signeture.');
      next(new Error('no signature'));
      return;
    }

    const signedBody = LineService.createSignature(req.body);
    if (signature !== signedBody) {
      logger.error('signature validation failed.', { signature });
      next(new Error('signature validation failed'));
      return;
    }
    next();
  };
}
