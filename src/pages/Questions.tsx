import { useState, useMemo, useRef, useEffect } from 'react';
import { Shuffle, Filter, Heart, BookOpen, Search, X, ChevronUp, ChevronDown } from 'lucide-react';
import Layout from '@/components/Layout';
import QuestionCard from '@/components/QuestionCard';
import { useStore } from '@/store/useStore';
import { getQuestionsByCategory, getRandomQuestion } from '@/data/questions';
import { categoryLabels, type QuestionCategory } from '@/types';
import { cn } from '@/lib/utils';

const categories: (QuestionCategory | 'all')[] = [
  'all',
  'childhood',
  'work',
  'marriage',
  'migration',
  'festival',
  'life',
];

const categoryNames: Record<string, string> = {
  all: '全部',
  ...categoryLabels,
};

export default function Questions() {
  const { currentCategory, setCategory, answers, addAnswer, toggleFavorite } = useStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState<null | {
    id: string;
    visible: boolean;
  }>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const questions = useMemo(() => {
    return getQuestionsByCategory(currentCategory as QuestionCategory | 'all');
  }, [currentCategory]);

  const answerMap = useMemo(() => {
    const map = new Map<string, typeof answers[0]>();
    answers.forEach((a) => map.set(a.questionId, a));
    return map;
  }, [answers]);

  const displayQuestions = useMemo(() => {
    let result = questions;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((q) => {
        const answer = answerMap.get(q.id);
        const matchQuestion = q.content.toLowerCase().includes(query);
        const matchAnswer = answer?.content?.toLowerCase().includes(query) || false;
        const matchHint = q.hint?.toLowerCase().includes(query) || false;
        return matchQuestion || matchAnswer || matchHint;
      });
    }
    if (showFavorites) {
      result = result.filter((q) => {
        const a = answerMap.get(q.id);
        return a?.favorite;
      });
    }
    return result;
  }, [questions, searchQuery, showFavorites, answerMap]);

  const isSearching = searchQuery.trim().length > 0;

  useEffect(() => {
    if (isSearching && displayQuestions.length > 0) {
      setCurrentMatchIndex(0);
      setHighlightedId(displayQuestions[0].id);
    } else {
      setHighlightedId(null);
      setCurrentMatchIndex(0);
    }
  }, [displayQuestions, isSearching]);

  useEffect(() => {
    if (highlightedId) {
      const timer = setTimeout(() => {
        const el = cardRefs.current.get(highlightedId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [highlightedId]);

  const navigateMatch = (direction: 'prev' | 'next') => {
    if (displayQuestions.length === 0) return;
    const newIndex = direction === 'next'
      ? (currentMatchIndex + 1) % displayQuestions.length
      : (currentMatchIndex - 1 + displayQuestions.length) % displayQuestions.length;
    setCurrentMatchIndex(newIndex);
    setHighlightedId(displayQuestions[newIndex].id);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setHighlightedId(null);
    setCurrentMatchIndex(0);
  };

  const handleRandomQuestion = () => {
    const category = currentCategory === 'all' ? undefined : (currentCategory as QuestionCategory);
    const q = getRandomQuestion(category);
    setRandomQuestion({ id: q.id, visible: true });
  };

  const handleSaveAnswer = (questionId: string, questionContent: string, content: string, favorite: boolean, year?: string) => {
    const existing = answerMap.get(questionId);
    if (existing) {
      useStore.getState().updateAnswer(existing.id, { content, favorite, year });
    } else {
      addAnswer({ questionId, questionContent, content, favorite, year });
    }
  };

  return (
    <Layout title="回忆题库">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-3">
            回忆题库
          </h1>
          <p className="text-brown-500">
            选择一个主题，或随机抽取一个问题，开始今天的故事采集
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索问题或回答内容..."
              className="w-full pl-12 pr-10 py-3 rounded-xl border border-brown-200 bg-white text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-brown-100 text-brown-400 hover:text-brown-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {isSearching && (
            <div className="flex items-center justify-between mt-3 px-1">
              <span className="text-sm text-brown-500">
                {displayQuestions.length > 0
                  ? `找到 ${displayQuestions.length} 个匹配结果`
                  : '没有找到匹配的内容'}
              </span>
              {displayQuestions.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-brown-500">
                    {currentMatchIndex + 1} / {displayQuestions.length}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => navigateMatch('prev')}
                      className="p-1.5 rounded-lg border border-brown-200 text-brown-500 hover:bg-brown-50 hover:text-brown-700 transition-colors"
                      title="上一个"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateMatch('next')}
                      className="p-1.5 rounded-lg border border-brown-200 text-brown-500 hover:bg-brown-50 hover:text-brown-700 transition-colors"
                      title="下一个"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                currentCategory === cat
                  ? 'bg-brown-600 text-white shadow-md'
                  : 'bg-white text-brown-600 border border-brown-200 hover:bg-brown-50'
              )}
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={handleRandomQuestion}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rust-500 to-rust-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700 transition-all"
          >
            <Shuffle className="w-4 h-4" />
            随机抽一题
          </button>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium border transition-all',
              showFavorites
                ? 'bg-rust-50 text-rust-600 border-rust-200'
                : 'bg-white text-brown-600 border-brown-200 hover:bg-brown-50'
            )}
          >
            <Heart className={cn('w-4 h-4', showFavorites && 'fill-rust-500')} />
            我的收藏
          </button>
        </div>

        {randomQuestion?.visible && (
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-white text-xs font-medium rounded-full z-10">
                ✨ 今日推荐
              </div>
              <QuestionCard
                question={
                  questions.find((q) => q.id === randomQuestion.id) || questions[0]
                }
                existingAnswer={answerMap.get(randomQuestion.id)}
                onSaveAnswer={(content, favorite, year) => {
                  const q = questions.find((q) => q.id === randomQuestion.id) || questions[0];
                  handleSaveAnswer(q.id, q.content, content, favorite, year);
                }}
                onToggleFavorite={() => {
                  const a = answerMap.get(randomQuestion.id);
                  if (a) toggleFavorite(a.id);
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-brown-400" />
          <span className="text-brown-500">
            {isSearching
              ? `搜索结果共 ${displayQuestions.length} 个匹配${showFavorites ? '（仅收藏）' : ''}`
              : `共 ${displayQuestions.length} 个问题${showFavorites ? '（仅收藏）' : ''}`}
          </span>
        </div>

        {displayQuestions.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-brown-200 mx-auto mb-4" />
            <p className="text-brown-400">
              {isSearching
                ? '没有找到包含该关键词的问题或回答'
                : showFavorites
                  ? '还没有收藏的问题'
                  : '该分类下暂无问题'}
            </p>
            {isSearching && (
              <button
                onClick={clearSearch}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brown-200 text-brown-600 font-medium hover:bg-brown-50 transition-colors"
              >
                <X className="w-4 h-4" />
                清除搜索
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayQuestions.map((question, index) => (
              <div
                key={question.id}
                ref={(el) => {
                  if (el) {
                    cardRefs.current.set(question.id, el);
                  }
                }}
                className={cn(
                  'animate-slide-up',
                  highlightedId === question.id && 'z-10'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <QuestionCard
                  question={question}
                  existingAnswer={answerMap.get(question.id)}
                  onSaveAnswer={(content, favorite, year) =>
                    handleSaveAnswer(question.id, question.content, content, favorite, year)
                  }
                  onToggleFavorite={() => {
                    const a = answerMap.get(question.id);
                    if (a) toggleFavorite(a.id);
                  }}
                  highlighted={highlightedId === question.id}
                  searchQuery={searchQuery}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
