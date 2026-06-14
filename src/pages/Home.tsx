import { Link } from 'react-router-dom';
import { HelpCircle, Clock, Image, BookOpen, Sparkles, Heart, Camera } from 'lucide-react';
import Layout from '@/components/Layout';
import { useStore } from '@/store/useStore';

const features = [
  {
    path: '/questions',
    title: '回忆题库',
    description: '精选主题提问，引导长辈讲述人生故事',
    icon: HelpCircle,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    path: '/timeline',
    title: '时间轴整理',
    description: '按年代梳理记忆，串联人生重要时刻',
    icon: Clock,
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50',
  },
  {
    path: '/photos',
    title: '照片配文',
    description: '为老照片添加故事，让影像不再沉默',
    icon: Image,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50',
  },
  {
    path: '/album',
    title: '回忆册导出',
    description: '一键生成长图，永久保存家庭记忆',
    icon: BookOpen,
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
  },
];

export default function Home() {
  const { answers, timelineEvents, photos } = useStore();

  const stats = [
    { label: '已记录回答', value: answers.length, icon: Sparkles },
    { label: '时间事件', value: timelineEvents.length, icon: Clock },
    { label: '照片故事', value: photos.length, icon: Camera },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brown-50 text-brown-600 text-sm font-medium mb-6">
            <Heart className="w-4 h-4 text-rust-500" />
            <span>用爱记录，让故事流传</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-brown-900 mb-6 leading-tight">
            家庭故事
            <span className="text-rust-500">采集本</span>
          </h1>
          <p className="text-lg md:text-xl text-brown-600 leading-relaxed">
            每一位长辈都是一本活历史。让我们坐下来，
            <br className="hidden md:block" />
            听他们讲那些过去的故事，把爱与记忆珍藏。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 text-center border border-brown-100/50 shadow-soft"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-6 h-6 text-brown-500 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-brown-800 font-serif">
                {stat.value}
              </div>
              <div className="text-sm text-brown-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.path}
              to={feature.path}
              className={`group relative overflow-hidden rounded-3xl p-8 ${feature.bgColor} border border-brown-100/30 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-brown-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-brown-600">{feature.description}</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 filter blur-2xl" />
            </Link>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-brown-500 to-brown-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                开始一段温暖的对话
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                找一个安静的午后，泡一杯热茶，打开回忆题库。
                让那些被时光掩埋的故事，重新被听见。
              </p>
              <Link
                to="/questions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brown-700 rounded-xl font-medium hover:bg-white/90 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                开始探索
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
