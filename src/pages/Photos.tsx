import { useState, useRef } from 'react';
import { Upload, X, Users, MapPin, Calendar, BookOpen, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';
import PhotoCard from '@/components/PhotoCard';
import { useStore } from '@/store/useStore';
import type { Photo } from '@/types';

interface PhotoFormData {
  title: string;
  people: string;
  location: string;
  year: string;
  story: string;
  dataUrl: string;
}

const initialForm: PhotoFormData = {
  title: '',
  people: '',
  location: '',
  year: '',
  story: '',
  dataUrl: '',
};

export default function Photos() {
  const { photos, addPhoto, updatePhoto, deletePhoto } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [formData, setFormData] = useState<PhotoFormData>(initialForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormData((prev) => ({ ...prev, dataUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingPhoto(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (photo: Photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      people: photo.people,
      location: photo.location,
      year: photo.year,
      story: photo.story,
      dataUrl: photo.dataUrl,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dataUrl) return;

    if (editingPhoto) {
      updatePhoto(editingPhoto.id, {
        ...formData,
      });
    } else {
      addPhoto({
        ...formData,
      });
    }

    setShowModal(false);
    setFormData(initialForm);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这张照片吗？')) {
      deletePhoto(id);
      setShowModal(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout title="照片配文">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown-900 mb-3">
            照片配文
          </h1>
          <p className="text-brown-500">为老照片添加故事，让影像不再沉默</p>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            <Upload className="w-5 h-5" />
            上传照片
          </button>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-brown-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-brown-300" />
            </div>
            <p className="text-brown-400 mb-2">还没有上传照片</p>
            <p className="text-brown-300 text-sm">点击上方按钮，上传第一张有故事的老照片</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => openEditModal(photo)}
              />
            ))}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-paper rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-semibold text-brown-800">
                  {editingPhoto ? '编辑照片信息' : '添加照片故事'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 -mr-2 rounded-lg hover:bg-brown-100 text-brown-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!formData.dataUrl ? (
                  <div
                    onClick={handleUploadClick}
                    className="w-full aspect-video bg-brown-50 rounded-2xl border-2 border-dashed border-brown-200 flex flex-col items-center justify-center cursor-pointer hover:bg-brown-100 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-brown-300 mb-3" />
                    <p className="text-brown-500 font-medium">点击上传照片</p>
                    <p className="text-brown-300 text-sm mt-1">支持 JPG、PNG 格式</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={formData.dataUrl}
                      alt="预览"
                      className="w-full max-h-64 object-contain rounded-xl bg-brown-50"
                    />
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className="absolute top-3 right-3 px-3 py-1.5 bg-brown-900/70 backdrop-blur-sm text-white text-xs font-medium rounded-full hover:bg-brown-900 transition-colors"
                    >
                      重新上传
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1.5">
                    照片标题
                  </label>
                  <input
                    type="text"
                    placeholder="给这张照片起个名字"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">
                      <Users className="w-4 h-4 inline mr-1" />
                      人物
                    </label>
                    <input
                      type="text"
                      placeholder="照片中的人"
                      value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      年份
                    </label>
                    <input
                      type="text"
                      placeholder="如：1990"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1.5">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    地点
                  </label>
                  <input
                    type="text"
                    placeholder="拍摄地点"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brown-200 text-brown-700 bg-white focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1.5">
                    照片背后的故事
                  </label>
                  <textarea
                    rows={4}
                    placeholder="记录这张照片背后的故事..."
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brown-200 text-brown-700 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brown-300 focus:border-transparent leading-relaxed"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  {editingPhoto && (
                    <button
                      type="button"
                      onClick={() => handleDelete(editingPhoto.id)}
                      className="px-4 py-3 rounded-xl border border-red-200 text-red-500 font-medium hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-brown-200 text-brown-600 font-medium hover:bg-brown-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.dataUrl}
                    className="flex-1 px-4 py-3 rounded-xl bg-brown-500 text-white font-medium hover:bg-brown-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingPhoto ? '保存修改' : '保存照片'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
