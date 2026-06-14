import { useState } from 'react';
import { Plus, X, Clock, MapPin, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import TimelineNode from '@/components/TimelineNode';
import { useStore } from '@/store/useStore';
import type { TimelineEvent } from '@/types';

interface EventFormData {
  year: string;
  title: string;
  description: string;
  people: string;
  location: string;
}

const initialForm: EventFormData = {
  year: '',
  title: '',
  description: '',
  people: '',
  location: '',
};

export default function Timeline() {
  const { timelineEvents, addTimelineEvent, updateTimelineEvent, deleteTimelineEvent } =
    useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [formData, setFormData] = useState<EventFormData>(initialForm);

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (event: TimelineEvent) => {
    setEditingEvent(event);
    setFormData({
      year: event.year,
      title: event.title,
      description: event.description,
      people: event.people || '',
      location: event.location || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.year || !formData.title) return;

    if (editingEvent) {
      updateTimelineEvent(editingEvent.id, {
        ...formData,
        people: formData.people || undefined,
        location: formData.location || undefined,
      });
    } else {
      addTimelineEvent({
        ...formData,
        people: formData.people || undefined,
        location: formData.location || undefined,
      });
    }

    setShowModal(false);
    setFormData(initialForm);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个事件吗？')) {
      deleteTimelineEvent(id);
    }
  };

  const sortedEvents = [...timelineEvents].sort((a, b) => a.year.localeCompare(b.year));

  const decades = sortedEvents.reduce((acc, event) => {
    const decade = Math.floor(parseInt(event.year) / 10) * 10;
    if (!acc.includes(decade)) acc.push(decade);
    return acc;
  }, [] as number[]);

  return (
    <Layout title="时间轴">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-3">
            家庭时间轴
          </h1>
          <p className="text-brown-500">按年代整理记忆，串联人生重要时刻</p>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brown-500 to-brown-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:from-brown-600 hover:to-brown-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            添加事件
          </button>
        </div>

        {sortedEvents.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-16 h-16 text-brown-200 mx-auto mb-4" />
            <p className="text-brown-400 mb-2">还没有时间轴事件</p>
            <p className="text-brown-300 text-sm">点击上方按钮，记录第一个重要时刻</p>
          </div>
        ) : (
          <div className="relative">
            <div className="timeline-line" />
            {decades.length > 1 && (
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1.5 bg-brown-100 text-brown-700 rounded-full text-sm font-medium">
                  {decades[0]}s - {decades[decades.length - 1]}s
                </span>
              </div>
            )}
            {sortedEvents.map((event, index) => (
              <TimelineNode
                key={event.id}
                event={event}
                index={index}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-paper rounded-3xl w-full max-w-md p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-semibold text-brown-800">
                {editingEvent ? '编辑事件' : '添加事件'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 -mr-2 rounded-lg hover:bg-brown-100 text-brown-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1.5">
                    年份
                  </label>
                  <input
                    type="text"
                    placeholder="如：1985"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1.5">
                    <Users className="w-4 h-4 inline mr-1" />
                    人物
                  </label>
                  <input
                    type="text"
                    placeholder="相关人物"
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1.5">
                  事件标题
                </label>
                <input
                  type="text"
                  placeholder="给这个事件起个名字"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1.5">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  地点
                </label>
                <input
                  type="text"
                  placeholder="发生在哪里"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1.5">
                  详细描述
                </label>
                <textarea
                  rows={4}
                  placeholder="记录这个故事的详细内容..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-brown-200 text-brown-700 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent leading-relaxed"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-brown-200 text-brown-600 font-medium hover:bg-brown-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-brown-500 text-white font-medium hover:bg-brown-600 transition-colors"
                >
                  {editingEvent ? '保存修改' : '添加事件'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
