import { Request, Response } from 'express';
import crypto from 'crypto';
import logger from 'libs/winston';

export default class LineWebhookController {
  protected static CHANNEL_SECRET: string =
    process.env.LINE_CHANNEL_SECRET || '';

  protected static verifySignature(req: Request): boolean {
    const signature: string = crypto
      .createHmac('SHA256', LineWebhookController.CHANNEL_SECRET)
      .update(JSON.stringify(req.body))
      .digest('base64');
    const xLineSignature: string = req.header('x-line-signature') || '';

    return signature === xLineSignature;
  }

  public static index(req: Request, res: Response): Response {
    if (!LineWebhookController.verifySignature(req)) {
      logger.error('Signature validation failuer.', {
        header: req.headers,
        body: req.body,
      });
      return res.status(400).json({
        error: true,
        message: 'Failed to validate signature.',
      });
    }

    logger.debug('Webhook works!', {
      header: req.headers,
      body: req.body,
    });
    return res.status(200).json({
      error: false,
      data: {},
    });
  }
}
