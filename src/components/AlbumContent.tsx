import { forwardRef } from 'react';
import { Heart, Calendar, MapPin, Users, Clock, BookOpen } from 'lucide-react';
import type { Answer, TimelineEvent, Photo } from '@/types';

interface AlbumContentProps {
  title: string;
  subtitle?: string;
  selectedAnswers: Answer[];
  selectedEvents: TimelineEvent[];
  selectedPhotos: Photo[];
}

const AlbumContent = forwardRef<HTMLDivElement, AlbumContentProps>(
  ({ title, subtitle, selectedAnswers, selectedEvents, selectedPhotos }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[800px] bg-gradient-to-b from-cream-50 via-paper to-cream-100 p-12"
        style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}
      >
        <div className="text-center mb-12 pb-8 border-b-2 border-brown-200">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-rust-500 fill-rust-500" />
          </div>
          <h1 className="text-4xl font-bold text-brown-800 mb-3">{title}</h1>
          {subtitle && (
            <p className="text-brown-500 text-lg">{subtitle}</p>
          )}
          <p className="text-brown-400 text-sm mt-4">
            用心记录 · 用爱珍藏
          </p>
        </div>

        {selectedEvents.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-brown-600" />
              <h2 className="text-2xl font-bold text-brown-700">时间轴</h2>
            </div>
            <div className="space-y-6">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/60 rounded-2xl p-6 border border-brown-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-brown-100 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-brown-500">年份</span>
                      <span className="text-lg font-bold text-brown-700">{event.year}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-brown-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-brown-600 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-brown-400">
                        {event.people && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.people}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedAnswers.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-brown-600" />
              <h2 className="text-2xl font-bold text-brown-700">问答记录</h2>
            </div>
            <div className="space-y-6">
              {selectedAnswers.map((answer, index) => (
                <div
                  key={answer.id}
                  className="bg-white/60 rounded-2xl p-6 border border-brown-100"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-rust-100 text-rust-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-brown-800 pt-1">
                      {answer.questionContent}
                    </h3>
                  </div>
                  <p className="text-brown-600 leading-relaxed pl-11">
                    {answer.content}
                  </p>
                  {answer.year && (
                    <div className="flex items-center gap-1 mt-3 pl-11 text-sm text-brown-400">
                      <Calendar className="w-4 h-4" />
                      {answer.year}年
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedPhotos.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-brown-600" />
              <h2 className="text-2xl font-bold text-brown-700">照片故事</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {selectedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white/60 rounded-2xl overflow-hidden border border-brown-100"
                >
                  <div className="aspect-square bg-brown-50">
                    <img
                      src={photo.dataUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover sepia-[0.1]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-brown-800 mb-2">
                      {photo.title || '未命名照片'}
                    </h3>
                    {photo.story && (
                      <p className="text-brown-600 text-sm leading-relaxed mb-3">
                        {photo.story}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-brown-400">
                      {photo.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {photo.year}年
                        </span>
                      )}
                      {photo.people && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {photo.people}
                        </span>
                      )}
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {photo.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 pt-8 border-t-2 border-brown-200 text-center">
          <p className="text-brown-400 text-sm">
            家庭故事采集本 · 让爱与记忆永恒
          </p>
          <p className="text-brown-300 text-xs mt-2">
            {new Date().toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    );
  }
);

AlbumContent.displayName = 'AlbumContent';

export default AlbumContent;
