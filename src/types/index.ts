export type QuestionCategory = 'childhood' | 'work' | 'marriage' | 'migration' | 'festival' | 'life' | 'other';

export interface Question {
  id: string;
  category: QuestionCategory;
  content: string;
  hint?: string;
}

export interface Answer {
  id: string;
  questionId: string;
  questionContent: string;
  content: string;
  createdAt: number;
  favorite: boolean;
  year?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  people?: string;
  location?: string;
  photoIds?: string[];
}

export interface Photo {
  id: string;
  dataUrl: string;
  title: string;
  people: string;
  location: string;
  year: string;
  story: string;
  createdAt: number;
}

export const categoryLabels: Record<QuestionCategory, string> = {
  childhood: '童年时光',
  work: '工作岁月',
  marriage: '婚姻家庭',
  migration: '迁徙漂泊',
  festival: '节日习俗',
  life: '人生感悟',
  other: '其他',
};

export const categoryColors: Record<QuestionCategory, string> = {
  childhood: 'bg-amber-100 text-amber-800',
  work: 'bg-blue-100 text-blue-800',
  marriage: 'bg-rose-100 text-rose-800',
  migration: 'bg-emerald-100 text-emerald-800',
  festival: 'bg-red-100 text-red-800',
  life: 'bg-purple-100 text-purple-800',
  other: 'bg-gray-100 text-gray-800',
};
