import { TemplateMessage } from '@line/bot-sdk';

type Event = {
  id: number;
  name: string;
  place: string;
  start: string;
  end: string;
  description?: string;
};

type Choice = {
  label: string;
  value: string;
};

export default class LineTemplateMessageConst {
  public static buildAttendanceTemplate(): TemplateMessage {
    const event = {
      id: 1,
      name: 'イベント名',
      place: '開催場所',
      start: new Date().toLocaleString('ja-JP'),
      end: new Date().toLocaleString('ja-JP'),
    } as Event;

    const choices: Choise[] = [
      { label: '出席', value: 'attend' },
      { label: '欠席', value: 'attend' },
    ];
    return {
      type: 'template',
      altText: '出欠確認',
      template: {
        type: 'buttons',
        title: `[出欠確認] ${event.name}`,
        text: `日時: ${event.start} - ${event.end}\n
場所: ${event.place}
${event.description ? '\n概要: ${event.description}' : ''}`,
        actions: choices.map((choice: Choice) => ({
          type: 'postback',
          data: JSON.stringify({ choice, event }),
          label: choice.label,
        })),
      },
    };
  }
}
