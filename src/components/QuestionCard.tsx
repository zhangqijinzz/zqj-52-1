import { useState } from 'react';
import { Heart, RotateCcw, Edit3, ChevronDown } from 'lucide-react';
import type { Question, Answer } from '@/types';
import { categoryLabels, categoryColors } from '@/types';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  existingAnswer?: Answer;
  onSaveAnswer: (content: string, favorite: boolean, year?: string) => void;
  onToggleFavorite?: () => void;
  onDeleteAnswer?: () => void;
  highlighted?: boolean;
  searchQuery?: string;
}

export default function QuestionCard({
  question,
  existingAnswer,
  onSaveAnswer,
  onToggleFavorite,
  highlighted = false,
  searchQuery = '',
}: QuestionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answerContent, setAnswerContent] = useState(existingAnswer?.content || '');
  const [year, setYear] = useState(existingAnswer?.year || '');
  const [isFavorite, setIsFavorite] = useState(existingAnswer?.favorite || false);

  const highlightText = (text: string, query: string): (string | JSX.Element)[] => {
    if (!query.trim()) return [text];
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let index = lowerText.indexOf(lowerQuery);
    let key = 0;
    while (index !== -1) {
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }
      parts.push(
        <mark key={key++} className="bg-amber-200 text-amber-900 rounded px-0.5">
          {text.slice(index, index + query.length)}
        </mark>
      );
      lastIndex = index + query.length;
      index = lowerText.indexOf(lowerQuery, lastIndex);
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [text];
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSave = () => {
    onSaveAnswer(answerContent, isFavorite, year || undefined);
    setIsFlipped(false);
  };

  const categoryColor = categoryColors[question.category];

  return (
    <div className={cn('perspective h-80 scroll-mt-32', highlighted && 'animate-pulse-ring')}>
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer',
          isFlipped && 'rotate-y-180'
        )}
        onClick={handleFlip}
      >
        <div className="absolute inset-0 backface-hidden">
          <div className={cn(
            'h-full bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all border flex flex-col',
            highlighted ? 'border-amber-400 ring-4 ring-amber-200/60' : 'border-brown-100/50'
          )}>
            <div className="flex items-start justify-between mb-4">
              <span className={cn('px-3 py-1 rounded-full text-xs font-medium', categoryColor)}>
                {categoryLabels[question.category]}
              </span>
              {existingAnswer && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.();
                  }}
                  className="p-1.5 rounded-lg hover:bg-brown-50 transition-colors"
                >
                  <Heart
                    className={cn(
                      'w-5 h-5',
                      existingAnswer.favorite ? 'fill-rust-500 text-rust-500' : 'text-brown-300'
                    )}
                  />
                </button>
              )}
            </div>

            <div className="flex-1 flex items-center">
              <h3 className="font-serif text-xl md:text-2xl text-brown-800 leading-relaxed">
                {highlightText(question.content, searchQuery)}
              </h3>
            </div>

            {question.hint && (
              <p className="text-sm text-brown-400 mt-4 flex items-center gap-1.5">
                <Edit3 className="w-4 h-4" />
                {question.hint}
              </p>
            )}

            {searchQuery && existingAnswer?.content && existingAnswer.content.toLowerCase().includes(searchQuery.toLowerCase()) && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-xs text-amber-600 font-medium mb-1">回答中也有匹配：</p>
                <p className="text-sm text-amber-800 line-clamp-2">
                  {highlightText(existingAnswer.content, searchQuery)}
                </p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-brown-100 flex items-center justify-between">
              <span className="text-sm text-brown-400">
                {existingAnswer ? '点击查看回答' : '点击开始记录'}
              </span>
              <ChevronDown className="w-5 h-5 text-brown-300 animate-bounce" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className="h-full bg-gradient-to-br from-cream-50 to-paper rounded-2xl p-6 shadow-card border border-brown-100/50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-serif font-semibold text-brown-700">写下回答</h4>
              <button
                onClick={handleFlip}
                className="p-1.5 rounded-lg hover:bg-brown-100 text-brown-500 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="发生年份（可选）"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-32 px-3 py-2 rounded-lg border border-brown-200 text-sm text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                />
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    'px-3 py-2 rounded-lg border text-sm flex items-center gap-1.5 transition-colors',
                    isFavorite
                      ? 'bg-rust-50 border-rust-200 text-rust-600'
                      : 'bg-white border-brown-200 text-brown-500 hover:bg-brown-50'
                  )}
                >
                  <Heart className={cn('w-4 h-4', isFavorite && 'fill-rust-500')} />
                  收藏
                </button>
              </div>

              <textarea
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="在这里记录长辈的回答..."
                className="flex-1 w-full px-4 py-3 rounded-xl border border-brown-200 text-brown-700 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent leading-relaxed"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleFlip}
                className="flex-1 px-4 py-2.5 rounded-xl border border-brown-200 text-brown-600 font-medium hover:bg-brown-50 transition-colors"
              >
                返回
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 rounded-xl bg-brown-500 text-white font-medium hover:bg-brown-600 transition-colors"
              >
                保存回答
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
