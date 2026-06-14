import { MapPin, Users, Pencil, Trash2 } from 'lucide-react';
import type { TimelineEvent } from '@/types';
import { cn } from '@/lib/utils';

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  onEdit: (event: TimelineEvent) => void;
  onDelete: (id: string) => void;
}

export default function TimelineNode({ event, index, onEdit, onDelete }: TimelineNodeProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-center mb-8">
      <div className="timeline-dot top-8" />

      <div
        className={cn(
          'w-5/12',
          isLeft ? 'pr-8 text-right' : 'pl-8 ml-auto'
        )}
      >
        <div className="bg-white rounded-2xl p-5 shadow-card border border-brown-100/50 hover:shadow-card-hover transition-shadow group">
          <div
            className={cn(
              'flex items-center gap-2 mb-2',
              isLeft ? 'justify-end' : 'justify-start'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold font-serif',
                'bg-brown-100 text-brown-700'
              )}
            >
              {event.year}年
            </span>
          </div>

          <h4 className="font-serif text-lg font-semibold text-brown-800 mb-2">
            {event.title}
          </h4>

          <p className="text-brown-600 text-sm leading-relaxed mb-3">
            {event.description}
          </p>

          <div
            className={cn(
              'flex flex-wrap gap-3 text-xs text-brown-400',
              isLeft ? 'justify-end' : 'justify-start'
            )}
          >
            {event.people && (
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {event.people}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {event.location}
              </span>
            )}
          </div>

          <div
            className={cn(
              'flex gap-1 mt-3 pt-3 border-t border-brown-100 opacity-0 group-hover:opacity-100 transition-opacity',
              isLeft ? 'justify-end' : 'justify-start'
            )}
          >
            <button
              onClick={() => onEdit(event)}
              className="p-1.5 rounded-lg hover:bg-brown-50 text-brown-400 hover:text-brown-600 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-brown-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
