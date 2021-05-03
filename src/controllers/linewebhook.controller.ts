import { Request, Response } from 'express';
import { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
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
}
