import {
  Client,
  ClientConfig,
  MessageAPIResponseBase,
  Message,
  MessageEvent,
  TemplateMessage,
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
    const text: string =
      event.message.type === 'text' ? event.message.text : '';
    const response: Message = LineService.createResponse(text);

    return await LineService.client.replyMessage(replyToken, response);
  }

  protected static createResponse(text: string): Message {
    switch (text) {
      case '出欠':
        return {
          type: 'template',
          altText: '出欠確認',
          template: {
            type: 'buttons',
            title: '出欠確認',
            text: '回答をタップしてください',
            actions: [
              {
                type: 'postback',
                data: 'attend',
                label: '出席',
              },
              {
                type: 'postback',
                data: 'absent',
                label: '欠席',
              },
            ],
          },
        } as TemplateMessage;
        break;
      default:
        return {
          type: 'text',
          text,
        } as TextMessage;
    }
  }
}
