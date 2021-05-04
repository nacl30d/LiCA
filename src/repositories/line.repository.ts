import crypto from 'crypto';

export default class LineRepository {
  private static _channelSecret: string | undefined =
    process.env.LINE_CHANNEL_SECRET;
  private static _channelAccessToken: string | undefined =
    process.env.LINE_CHANNEL_ACCESS_TOKEN;

  static get channelSecret(): string {
    return LineRepository._channelSecret || '';
  }

  static get channelAccessToken(): string {
    return LineRepository._channelAccessToken || '';
  }

  public static signWithSecret = (target: string): string => {
    return crypto
      .createHmac('SHA256', LineRepository.channelSecret)
      .update(target)
      .digest('base64');
  };
}
