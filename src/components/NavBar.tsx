import { NavLink, useNavigate } from 'react-router-dom';
import { Home, HelpCircle, Clock, Image, BookOpen, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/questions', label: '回忆题库', icon: HelpCircle },
  { path: '/timeline', label: '时间轴', icon: Clock },
  { path: '/photos', label: '照片配文', icon: Image },
  { path: '/album', label: '回忆册', icon: BookOpen },
];

interface NavBarProps {
  showBack?: boolean;
  title?: string;
}

export default function NavBar({ showBack = false, title }: NavBarProps) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-brown-100/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-lg hover:bg-brown-50 text-brown-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brown-400 to-brown-600 flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-paper" />
            </div>
            <span className="font-serif text-lg font-semibold text-brown-800 hidden sm:block">
              {title || '家庭故事采集本'}
            </span>
          </NavLink>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-brown-100 text-brown-700'
                    : 'text-brown-500 hover:bg-brown-50 hover:text-brown-700'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
