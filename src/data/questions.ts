import type { Question, QuestionCategory } from '@/types';

export const questions: Question[] = [
  // 童年时光
  {
    id: 'c1',
    category: 'childhood',
    content: '您小时候住的房子是什么样子的？有什么特别的记忆吗？',
    hint: '可以聊聊房子的结构、周围的邻居、院子里种的树等',
  },
  {
    id: 'c2',
    category: 'childhood',
    content: '童年最开心的一件事是什么？',
    hint: '过年、生日、和小伙伴玩耍、收到礼物等',
  },
  {
    id: 'c3',
    category: 'childhood',
    content: '您小时候最喜欢玩什么游戏？',
    hint: '跳房子、滚铁环、捉迷藏、弹玻璃球等',
  },
  {
    id: 'c4',
    category: 'childhood',
    content: '上学时印象最深的老师是谁？为什么？',
    hint: '可以聊老师的性格、教过的课程、发生过的故事',
  },
  {
    id: 'c5',
    category: 'childhood',
    content: '小时候最爱吃的食物是什么？',
    hint: '妈妈做的菜、街边的小吃、过年才能吃到的美味',
  },
  {
    id: 'c6',
    category: 'childhood',
    content: '您和兄弟姐妹之间有什么有趣的故事？',
    hint: '一起做过的调皮事、互相帮助的经历',
  },
  {
    id: 'c7',
    category: 'childhood',
    content: '小时候的梦想是什么？现在实现了吗？',
    hint: '科学家、老师、医生、飞行员等',
  },
  {
    id: 'c8',
    category: 'childhood',
    content: '您小时候最怕什么？',
    hint: '动物、黑暗、打雷、某个人等',
  },

  // 工作岁月
  {
    id: 'w1',
    category: 'work',
    content: '您的第一份工作是什么？',
    hint: '什么时候、在哪里、做什么工作、怎么找到的',
  },
  {
    id: 'w2',
    category: 'work',
    content: '工作中最有成就感的一件事是什么？',
    hint: '完成了一个大项目、培养了优秀的徒弟、获得了什么荣誉',
  },
  {
    id: 'w3',
    category: 'work',
    content: '工作中遇到过最大的困难是什么？怎么克服的？',
    hint: '技术难题、人际关系、事业低谷等',
  },
  {
    id: 'w4',
    category: 'work',
    content: '您有哪些难忘的同事或师傅？',
    hint: '和他们的故事、从他们身上学到了什么',
  },
  {
    id: 'w5',
    category: 'work',
    content: '如果可以重新选择，您还会从事这份工作吗？',
    hint: '为什么喜欢/不喜欢这份工作',
  },
  {
    id: 'w6',
    category: 'work',
    content: '您退休/离开工作岗位时是什么心情？',
    hint: '解脱、不舍、对未来的规划',
  },

  // 婚姻家庭
  {
    id: 'm1',
    category: 'marriage',
    content: '您和老伴是怎么认识的？',
    hint: '自由恋爱、相亲、介绍人、浪漫的邂逅',
  },
  {
    id: 'm2',
    category: 'marriage',
    content: '第一次约会是什么样子的？',
    hint: '去了哪里、做了什么、当时的心情',
  },
  {
    id: 'm3',
    category: 'marriage',
    content: '你们结婚时的情景是怎样的？',
    hint: '婚礼形式、参加的人、印象最深的瞬间',
  },
  {
    id: 'm4',
    category: 'marriage',
    content: '您觉得婚姻幸福的秘诀是什么？',
    hint: '互相理解、包容、共同的兴趣爱好',
  },
  {
    id: 'm5',
    category: 'marriage',
    content: '孩子出生时是什么感觉？',
    hint: '第一个孩子、当时的情景、孩子的名字来历',
  },
  {
    id: 'm6',
    category: 'marriage',
    content: '您最骄傲的孩子是什么样的？',
    hint: '孩子的优点、让您感到欣慰的时刻',
  },
  {
    id: 'm7',
    category: 'marriage',
    content: '和老伴一起经历过最难忘的事是什么？',
    hint: '一起旅行、一起度过的难关、浪漫的事',
  },

  // 迁徙漂泊
  {
    id: 'g1',
    category: 'migration',
    content: '您出生在哪里？后来去过哪些地方生活？',
    hint: '家乡、工作调动、搬迁的原因',
  },
  {
    id: 'g2',
    category: 'migration',
    content: '第一次离开家去远方是什么感受？',
    hint: '上学、工作、当兵等',
  },
  {
    id: 'g3',
    category: 'migration',
    content: '您去过印象最深的地方是哪里？',
    hint: '旅行、出差、生活过的城市',
  },
  {
    id: 'g4',
    category: 'migration',
    content: '您想念家乡的什么？',
    hint: '美食、亲人、家乡的风景、乡音',
  },
  {
    id: 'g5',
    category: 'migration',
    content: '搬家时最舍不得的是什么东西？',
    hint: '老家具、老照片、某种有纪念意义的物品',
  },

  // 节日习俗
  {
    id: 'f1',
    category: 'festival',
    content: '您小时候过年是什么样子的？',
    hint: '准备年货、贴春联、放鞭炮、年夜饭、拜年',
  },
  {
    id: 'f2',
    category: 'festival',
    content: '过年时最期待的是什么？',
    hint: '新衣服、压岁钱、好吃的、和家人团聚',
  },
  {
    id: 'f3',
    category: 'festival',
    content: '您家有什么特别的节日传统？',
    hint: '某个节日的特殊食物、特殊的仪式、代代相传的习俗',
  },
  {
    id: 'f4',
    category: 'festival',
    content: '您最喜欢哪个节日？为什么？',
    hint: '春节、中秋节、端午节、清明等',
  },
  {
    id: 'f5',
    category: 'festival',
    content: '您会做什么特别的节日美食？',
    hint: '饺子、粽子、月饼、年糕等的做法和故事',
  },
  {
    id: 'f6',
    category: 'festival',
    content: '有哪些节日习俗现在已经看不到了？',
    hint: '老传统、老规矩、旧时的庆祝方式',
  },

  // 人生感悟
  {
    id: 'l1',
    category: 'life',
    content: '您觉得人生中最宝贵的是什么？',
    hint: '健康、亲情、友情、财富、经历等',
  },
  {
    id: 'l2',
    category: 'life',
    content: '如果可以回到过去，您想回到哪一年？',
    hint: '为什么想回到那一年、会做什么不同的选择',
  },
  {
    id: 'l3',
    category: 'life',
    content: '您最感激的人是谁？为什么？',
    hint: '父母、老师、朋友、生命中的贵人',
  },
  {
    id: 'l4',
    category: 'life',
    content: '您有什么遗憾的事吗？',
    hint: '没说出口的话、没做的事、错过的机会',
  },
  {
    id: 'l5',
    category: 'life',
    content: '您对年轻一代有什么建议？',
    hint: '工作、生活、爱情、人生选择等',
  },
  {
    id: 'l6',
    category: 'life',
    content: '您希望后人记住您什么？',
    hint: '某种品质、某件事、某句话',
  },
  {
    id: 'l7',
    category: 'life',
    content: '您觉得自己这辈子过得怎么样？',
    hint: '满意吗？有什么值得骄傲的？',
  },
  {
    id: 'l8',
    category: 'life',
    content: '您最想对晚辈说的一句话是什么？',
    hint: '人生经验、祝福、期望',
  },
];

export const getQuestionsByCategory = (category: QuestionCategory | 'all'): Question[] => {
  if (category === 'all') return questions;
  return questions.filter((q) => q.category === category);
};

export const getRandomQuestion = (category?: QuestionCategory): Question => {
  const pool = category ? questions.filter((q) => q.category === category) : questions;
  return pool[Math.floor(Math.random() * pool.length)];
};
