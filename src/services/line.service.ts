import {
  Client,
  ClientConfig,
  MessageAPIResponseBase,
  Message,
  MessageEvent,
  TextMessage,
  WebhookEvent,
} from '@line/bot-sdk';
import LineRepository from 'repositories/line.repository';
import LineTemplateMessageConst from 'consts/lineTemplateMessage.const';
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
        return LineTemplateMessageConst.buildAttendanceTemplate();
        break;
      default:
        return {
          type: 'text',
          text,
        } as TextMessage;
    }
  }
}
