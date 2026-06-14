import { useState, useRef, useMemo } from 'react';
import { Download, Check, BookOpen, Image, Clock, MessageSquare, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import Layout from '@/components/Layout';
import AlbumContent from '@/components/AlbumContent';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

type TabType = 'answers' | 'events' | 'photos';

export default function Album() {
  const { answers, timelineEvents, photos } = useStore();
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<Set<string>>(new Set());
  const [selectedEventIds, setSelectedEventIds] = useState<Set<string>>(new Set());
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<TabType>('answers');
  const [albumTitle, setAlbumTitle] = useState('我的家庭故事集');
  const [albumSubtitle, setAlbumSubtitle] = useState('记录那些温暖的时光');
  const [isExporting, setIsExporting] = useState(false);
  const albumRef = useRef<HTMLDivElement>(null);

  const selectedAnswers = useMemo(
    () => answers.filter((a) => selectedAnswerIds.has(a.id)),
    [answers, selectedAnswerIds]
  );
  const selectedEvents = useMemo(
    () => timelineEvents.filter((e) => selectedEventIds.has(e.id)),
    [timelineEvents, selectedEventIds]
  );
  const selectedPhotos = useMemo(
    () => photos.filter((p) => selectedPhotoIds.has(p.id)),
    [photos, selectedPhotoIds]
  );

  const totalSelected =
    selectedAnswers.length + selectedEvents.length + selectedPhotos.length;

  const toggleAnswer = (id: string) => {
    setSelectedAnswerIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleEvent = (id: string) => {
    setSelectedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const togglePhoto = (id: string) => {
    setSelectedPhotoIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllAnswers = () => {
    if (selectedAnswerIds.size === answers.length) {
      setSelectedAnswerIds(new Set());
    } else {
      setSelectedAnswerIds(new Set(answers.map((a) => a.id)));
    }
  };

  const selectAllEvents = () => {
    if (selectedEventIds.size === timelineEvents.length) {
      setSelectedEventIds(new Set());
    } else {
      setSelectedEventIds(new Set(timelineEvents.map((e) => e.id)));
    }
  };

  const selectAllPhotos = () => {
    if (selectedPhotoIds.size === photos.length) {
      setSelectedPhotoIds(new Set());
    } else {
      setSelectedPhotoIds(new Set(photos.map((p) => p.id)));
    }
  };

  const handleExport = async () => {
    if (!albumRef.current || totalSelected === 0) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(albumRef.current, {
        scale: 2,
        backgroundColor: '#FDF8F0',
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${albumTitle || '家庭故事集'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { key: 'answers', label: '问答记录', icon: MessageSquare, count: answers.length },
    { key: 'events', label: '时间事件', icon: Clock, count: timelineEvents.length },
    { key: 'photos', label: '照片故事', icon: Image, count: photos.length },
  ];

  return (
    <Layout title="回忆册导出">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-3">
            回忆册导出
          </h1>
          <p className="text-brown-500">选择内容，生成属于你的家庭故事长图</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-card border border-brown-100/50">
              <h3 className="font-serif font-semibold text-brown-800 mb-4">
                回忆册信息
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-brown-500 mb-1.5">标题</label>
                  <input
                    type="text"
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-paper focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-brown-500 mb-1.5">副标题</label>
                  <input
                    type="text"
                    value={albumSubtitle}
                    onChange={(e) => setAlbumSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-paper focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-brown-100/50 overflow-hidden">
              <div className="flex border-b border-brown-100">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as TabType)}
                    className={cn(
                      'flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors',
                      activeTab === tab.key
                        ? 'bg-brown-50 text-brown-700 border-b-2 border-brown-500'
                        : 'text-brown-400 hover:text-brown-600 hover:bg-brown-50/50'
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    <span className="px-1.5 py-0.5 text-xs bg-brown-100 rounded-full">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeTab === 'answers' && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-brown-500">
                        已选 {selectedAnswers.length} 条
                      </span>
                      {answers.length > 0 && (
                        <button
                          onClick={selectAllAnswers}
                          className="text-sm text-brown-600 hover:text-brown-800"
                        >
                          {selectedAnswerIds.size === answers.length ? '取消全选' : '全选'}
                        </button>
                      )}
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                      {answers.length === 0 ? (
                        <div className="text-center py-10 text-brown-300">
                          <MessageSquare className="w-10 h-10 mx-auto mb-2" />
                          <p className="text-sm">还没有回答记录</p>
                        </div>
                      ) : (
                        answers.map((answer) => (
                          <div
                            key={answer.id}
                            onClick={() => toggleAnswer(answer.id)}
                            className={cn(
                              'p-3 rounded-xl border cursor-pointer transition-all',
                              selectedAnswerIds.has(answer.id)
                                ? 'bg-brown-50 border-brown-300'
                                : 'bg-paper border-brown-100 hover:border-brown-200'
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  'w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors',
                                  selectedAnswerIds.has(answer.id)
                                    ? 'bg-brown-500 border-brown-500'
                                    : 'border-brown-300'
                                )}
                              >
                                {selectedAnswerIds.has(answer.id) && (
                                  <Check className="w-3.5 h-3.5 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-brown-700 line-clamp-1">
                                  {answer.questionContent}
                                </p>
                                <p className="text-xs text-brown-400 line-clamp-2 mt-1">
                                  {answer.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'events' && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-brown-500">
                        已选 {selectedEvents.length} 条
                      </span>
                      {timelineEvents.length > 0 && (
                        <button
                          onClick={selectAllEvents}
                          className="text-sm text-brown-600 hover:text-brown-800"
                        >
                          {selectedEventIds.size === timelineEvents.length
                            ? '取消全选'
                            : '全选'}
                        </button>
                      )}
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                      {timelineEvents.length === 0 ? (
                        <div className="text-center py-10 text-brown-300">
                          <Clock className="w-10 h-10 mx-auto mb-2" />
                          <p className="text-sm">还没有时间事件</p>
                        </div>
                      ) : (
                        timelineEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => toggleEvent(event.id)}
                            className={cn(
                              'p-3 rounded-xl border cursor-pointer transition-all',
                              selectedEventIds.has(event.id)
                                ? 'bg-brown-50 border-brown-300'
                                : 'bg-paper border-brown-100 hover:border-brown-200'
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  'w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors',
                                  selectedEventIds.has(event.id)
                                    ? 'bg-brown-500 border-brown-500'
                                    : 'border-brown-300'
                                )}
                              >
                                {selectedEventIds.has(event.id) && (
                                  <Check className="w-3.5 h-3.5 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-brown-500 bg-brown-100 px-2 py-0.5 rounded">
                                    {event.year}
                                  </span>
                                  <p className="text-sm font-medium text-brown-700 truncate">
                                    {event.title}
                                  </p>
                                </div>
                                <p className="text-xs text-brown-400 line-clamp-2 mt-1">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'photos' && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-brown-500">
                        已选 {selectedPhotos.length} 张
                      </span>
                      {photos.length > 0 && (
                        <button
                          onClick={selectAllPhotos}
                          className="text-sm text-brown-600 hover:text-brown-800"
                        >
                          {selectedPhotoIds.size === photos.length ? '取消全选' : '全选'}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto pr-2">
                      {photos.length === 0 ? (
                        <div className="col-span-3 text-center py-10 text-brown-300">
                          <Image className="w-10 h-10 mx-auto mb-2" />
                          <p className="text-sm">还没有照片</p>
                        </div>
                      ) : (
                        photos.map((photo) => (
                          <div
                            key={photo.id}
                            onClick={() => togglePhoto(photo.id)}
                            className={cn(
                              'aspect-square rounded-lg overflow-hidden cursor-pointer relative border-2 transition-all',
                              selectedPhotoIds.has(photo.id)
                                ? 'border-brown-500'
                                : 'border-transparent hover:border-brown-200'
                            )}
                          >
                            <img
                              src={photo.dataUrl}
                              alt={photo.title}
                              className="w-full h-full object-cover"
                            />
                            {selectedPhotoIds.has(photo.id) && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-brown-500 rounded-full flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-white" />
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={totalSelected === 0 || isExporting}
              className={cn(
                'w-full py-4 rounded-2xl font-medium text-white flex items-center justify-center gap-2 transition-all',
                totalSelected === 0 || isExporting
                  ? 'bg-brown-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl'
              )}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  导出回忆长图 ({totalSelected}项)
                </>
              )}
            </button>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-brown-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              预览
            </h3>
            <div className="bg-brown-100 rounded-2xl p-3 overflow-hidden">
              <div className="bg-white rounded-xl p-2 overflow-auto max-h-[600px]">
                <div className="scale-[0.4] origin-top-left w-[250%]">
                  <AlbumContent
                    ref={albumRef}
                    title={albumTitle || '我的家庭故事集'}
                    subtitle={albumSubtitle}
                    selectedAnswers={
                      selectedAnswers.length > 0
                        ? selectedAnswers
                        : answers.slice(0, 2)
                    }
                    selectedEvents={
                      selectedEvents.length > 0
                        ? selectedEvents
                        : timelineEvents.slice(0, 2)
                    }
                    selectedPhotos={
                      selectedPhotos.length > 0
                        ? selectedPhotos
                        : photos.slice(0, 4)
                    }
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-brown-400 text-center mt-3">
              预览为缩小效果，导出为高清长图
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
