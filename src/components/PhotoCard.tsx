import { Users, MapPin } from 'lucide-react';
import type { Photo } from '@/types';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export default function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-brown-100/50 hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-brown-50 relative">
        <img
          src={photo.dataUrl}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 sepia-[0.15]"
        />
        {photo.year && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-brown-900/70 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {photo.year}年
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-serif font-semibold text-brown-800 mb-2 line-clamp-1">
          {photo.title || '未命名照片'}
        </h4>
        <div className="flex flex-wrap gap-2 text-xs text-brown-400">
          {photo.people && (
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span className="line-clamp-1 max-w-[100px">{photo.people}</span>
            </span>
          )}
          {photo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{photo.location}</span>
            </span>
          )}
        </div>
        {photo.story && (
          <p className="mt-2 text-sm text-brown-500 line-clamp-2">{photo.story}</p>
        )}
      </div>
    </div>
  );
}
