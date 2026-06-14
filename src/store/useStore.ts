import { create } from 'zustand';
import type { Answer, TimelineEvent, Photo, QuestionCategory } from '@/types';
import { storage, generateId } from '@/utils/storage';
import { questions } from '@/data/questions';

interface AppState {
  answers: Answer[];
  timelineEvents: TimelineEvent[];
  photos: Photo[];
  currentCategory: QuestionCategory | 'all';

  setCategory: (category: QuestionCategory | 'all') => void;

  addAnswer: (answer: Omit<Answer, 'id' | 'createdAt'>) => void;
  updateAnswer: (id: string, updates: Partial<Answer>) => void;
  deleteAnswer: (id: string) => void;
  toggleFavorite: (id: string) => void;

  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;

  addPhoto: (photo: Omit<Photo, 'id' | 'createdAt'>) => void;
  updatePhoto: (id: string, updates: Partial<Photo>) => void;
  deletePhoto: (id: string) => void;

  getQuestions: () => typeof questions;
}

export const useStore = create<AppState>((set) => ({
  answers: storage.get<Answer[]>('answers', []),
  timelineEvents: storage.get<TimelineEvent[]>('timelineEvents', []),
  photos: storage.get<Photo[]>('photos', []),
  currentCategory: 'all',

  setCategory: (category) => set({ currentCategory: category }),

  addAnswer: (answer) => {
    const newAnswer: Answer = {
      ...answer,
      id: generateId(),
      createdAt: Date.now(),
    };
    set((state) => {
      const answers = [...state.answers, newAnswer];
      storage.set('answers', answers);
      return { answers };
    });
  },

  updateAnswer: (id, updates) => {
    set((state) => {
      const answers = state.answers.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      );
      storage.set('answers', answers);
      return { answers };
    });
  },

  deleteAnswer: (id) => {
    set((state) => {
      const answers = state.answers.filter((a) => a.id !== id);
      storage.set('answers', answers);
      return { answers };
    });
  },

  toggleFavorite: (id) => {
    set((state) => {
      const answers = state.answers.map((a) =>
        a.id === id ? { ...a, favorite: !a.favorite } : a
      );
      storage.set('answers', answers);
      return { answers };
    });
  },

  addTimelineEvent: (event) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: generateId(),
    };
    set((state) => {
      const timelineEvents = [...state.timelineEvents, newEvent].sort((a, b) =>
        a.year.localeCompare(b.year)
      );
      storage.set('timelineEvents', timelineEvents);
      return { timelineEvents };
    });
  },

  updateTimelineEvent: (id, updates) => {
    set((state) => {
      const timelineEvents = state.timelineEvents
        .map((e) => (e.id === id ? { ...e, ...updates } : e))
        .sort((a, b) => a.year.localeCompare(b.year));
      storage.set('timelineEvents', timelineEvents);
      return { timelineEvents };
    });
  },

  deleteTimelineEvent: (id) => {
    set((state) => {
      const timelineEvents = state.timelineEvents.filter((e) => e.id !== id);
      storage.set('timelineEvents', timelineEvents);
      return { timelineEvents };
    });
  },

  addPhoto: (photo) => {
    const newPhoto: Photo = {
      ...photo,
      id: generateId(),
      createdAt: Date.now(),
    };
    set((state) => {
      const photos = [newPhoto, ...state.photos];
      storage.set('photos', photos);
      return { photos };
    });
  },

  updatePhoto: (id, updates) => {
    set((state) => {
      const photos = state.photos.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      storage.set('photos', photos);
      return { photos };
    });
  },

  deletePhoto: (id) => {
    set((state) => {
      const photos = state.photos.filter((p) => p.id !== id);
      storage.set('photos', photos);
      return { photos };
    });
  },

  getQuestions: () => questions,
}));
