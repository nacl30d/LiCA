import {
  Client,
  ClientConfig,
  MessageAPIResponseBase,
  MessageEvent,
  TextMessage,
  WebhookEvent,
} from '@line/bot-sdk';
import LineRepository from 'repositories/line.repository';
import logger from 'libs/winston';

export default class LineService {
  protected static config: ClientConfig = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET,
  };
  protected static client: Client = new Client(LineService.config);

  public static createSignature(
    target: string | Record<string, unknown>
  ): string {
    if (typeof target === 'object') {
      target = JSON.stringify(target);
    }
    return LineRepository.signWithSecret(target);
  }

  public static async handleEvent(
    event: WebhookEvent
  ): Promise<MessageAPIResponseBase | undefined> {
    switch (event.type) {
      case 'message':
        return await LineService.handleMessageEvent(event);
        break;
      default:
        logger.warn('Unknown event type was sent.', { event });
        return;
    }
  }

  protected static async handleMessageEvent(
    event: MessageEvent
  ): Promise<MessageAPIResponseBase | undefined> {
    const { replyToken } = event;
    const text = event.message.type === 'text' ? event.message.text : '';

    const response: TextMessage = {
      type: 'text',
      text,
    };

    return await LineService.client.replyMessage(replyToken, response);
  }
}
