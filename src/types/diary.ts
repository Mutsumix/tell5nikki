export interface DiaryEntry {
  id: string;
  date: string;
  answers: {
    mood?: string;
    event?: string;
    praise?: string;
    tomorrow?: string;
    gratitude?: string;
  };
  createdAt: string;
}

export const QUESTIONS = [
  {
    id: "mood",
    text: "今日の気分を一言で表すと？",
    required: true,
  },
  {
    id: "event",
    text: "今日一番印象に残った出来事は？",
    required: false,
  },
  {
    id: "praise",
    text: "今日の自分を褒めるとしたら？",
    required: false,
  },
  {
    id: "tomorrow",
    text: "明日やりたいことは？",
    required: false,
  },
  {
    id: "gratitude",
    text: "今日の感謝したいことは？",
    required: false,
  },
];
