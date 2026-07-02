import { type ThoughtExperiment, type DimensionInfo, type PhilosophyMatch, type SimilarFigure } from '../types';

export const DIMENSIONS: DimensionInfo[] = [
  { key: 'utilitarian', label: '功利主义', description: '以结果/利益最大化来评判行为', lowLabel: '义务论', highLabel: '功利主义' },
  { key: 'libertarian', label: '自由意志', description: '强调个人自由与选择权', lowLabel: '决定论', highLabel: '自由意志' },
  { key: 'collectivist', label: '集体主义', description: '群体利益优先于个人利益', lowLabel: '个人主义', highLabel: '集体主义' },
  { key: 'rationalist', label: '理性主义', description: '依赖逻辑与理性而非情感直觉', lowLabel: '经验主义', highLabel: '理性主义' },
  { key: 'egalitarian', label: '平等主义', description: '追求结果平等而非机会平等', lowLabel: '精英主义', highLabel: '平等主义' },
  { key: 'humanist', label: '人道主义', description: '以人类福祉为最高价值', lowLabel: '超人类主义', highLabel: '人道主义' },
];

export const EXPERIMENTS: ThoughtExperiment[] = [
  {
    id: 'trolley',
    title: '电车难题',
    description: '一辆失控的电车正驶向五个被绑在轨道上的人。你可以拉下控制杆让电车转向另一条轨道，但那边绑着一个人。',
    context: '假设你确信所有信息准确，没有其他选项。',
    choices: [
      { id: 'trolley_pull', text: '拉下控制杆，牺牲一人救五人', scores: { utilitarian: 8, rationalist: 3, collectivist: 3 } },
      { id: 'trolley_stay', text: '不干预，让电车按原路行驶', scores: { utilitarian: -5, libertarian: 2, rationalist: -1 } },
      { id: 'trolley_self', text: '如果可能，我愿意用自己的生命换取这五个人', scores: { utilitarian: 10, collectivist: 8, egalitarian: 5 } },
      { id: 'trolley_uncertain', text: '我无法确定，这个选择太难了', scores: { humanist: 3, rationalist: -3 } },
    ],
  },
  {
    id: 'veil',
    title: '无知之幕',
    description: '你要设计一个全新的社会制度，但你不知道自己在这个社会中的身份——你不知道自己会出生为富人还是穷人、天才还是普通人。',
    context: '你无法选择自己的出生，但你设计的规则会适用于所有人。',
    choices: [
      { id: 'veil_equal', text: '设计一个尽可能平等的社会，缩小贫富差距', scores: { egalitarian: 10, collectivist: 5 } },
      { id: 'veil_opportunity', text: '保障机会平等，但允许结果差异', scores: { libertarian: 4, egalitarian: 2, rationalist: 3 } },
      { id: 'veil_merit', text: '让最有能力的人获得最多资源，以推动社会进步', scores: { utilitarian: 4, egalitarian: -5, rationalist: 4 } },
      { id: 'veil_min', text: '保障每个人的基本生存需求，其余自由竞争', scores: { libertarian: 3, egalitarian: 3, humanist: 4 } },
    ],
  },
  {
    id: 'ship',
    title: '忒修斯之船',
    description: '一艘船的所有木板被逐渐替换，直到没有一块是原来的。它还是原来的船吗？换一种说法：如果你的每一个细胞都被逐渐替换，你还是你吗？',
    context: '这个问题探讨的是同一性的本质。',
    choices: [
      { id: 'ship_continuity', text: '连续性决定同一性——只要替换是渐进的，就还是原来的', scores: { rationalist: 3 } },
      { id: 'ship_pattern', text: '形式/模式决定同一性——只要结构不变，本质就不变', scores: { rationalist: 5, egalitarian: -1 } },
      { id: 'ship_none', text: '没有绝对的同一性，"我"只是一个不断变化的叙事', scores: { libertarian: 3, rationalist: -1 } },
      { id: 'ship_consciousness', text: '自我意识是同一性的唯一标准——只要我还能感知到"我"', scores: { humanist: 4, libertarian: 2 } },
    ],
  },
  {
    id: 'experience',
    title: '体验机器',
    description: '有一台机器可以让你接入一个虚拟世界，在那里你所有的愿望都会实现，你会感受到极致的快乐和满足。一旦接入，你不会知道这是虚拟的。你会选择接入吗？',
    context: '在机器中你的所有体验与真实世界完全一致，你无法区分。',
    choices: [
      { id: 'exp_yes', text: '接入——快乐和满足是人生的终极目标', scores: { utilitarian: 5, humanist: -2 } },
      { id: 'exp_no_real', text: '不接入——真实的痛苦好过虚假的快乐', scores: { rationalist: 3, humanist: 5 } },
      { id: 'exp_no_growth', text: '不接入——没有挑战和成长的人生没有意义', scores: { libertarian: 3, humanist: 3, utilitarian: -3 } },
      { id: 'exp_maybe', text: '可能会试试，但不会永远留在里面', scores: { humanist: 1 } },
    ],
  },
  {
    id: 'fat_man',
    title: '天桥难题（胖男变体）',
    description: '电车冲向五人，你在天桥上，旁边有一个体型足够大的陌生人。推下他能挡住电车救五人，但你会主动杀人。',
    context: '与拉杆不同，这次你需要亲手将人推下。',
    choices: [
      { id: 'fat_push', text: '推下他——五人命大于一人命，手段不影响结果', scores: { utilitarian: 8, rationalist: 2 } },
      { id: 'fat_no', text: '不推——主动杀人和被动选择有本质区别', scores: { utilitarian: -5, humanist: 4, libertarian: 2 } },
      { id: 'fat_jump', text: '我自己跳下去', scores: { collectivist: 5, humanist: 6, egalitarian: 3 } },
      { id: 'fat_universal', text: '如果这条规则普遍化会怎样？所有人都可以推人挡电车？', scores: { rationalist: 5, egalitarian: 3, utilitarian: -2 } },
    ],
  },
  {
    id: 'torture',
    title: '定时炸弹',
    description: '一个恐怖分子在城市中放置了一枚核弹。你抓到了他，但他拒绝透露炸弹位置。是否应该对他用刑以获取信息拯救数百万人的生命？',
    context: '假设用刑一定会得到准确信息，不用刑炸弹一定会爆炸。',
    choices: [
      { id: 'tor_yes', text: '应该用刑——百万人的生命远大于一个人的痛苦', scores: { utilitarian: 10, collectivist: 5, humanist: -5 } },
      { id: 'tor_no', text: '不应该——酷刑在任何情况下都是不道德的', scores: { utilitarian: -8, humanist: 6, egalitarian: 3 } },
      { id: 'tor_no_slippery', text: '不应该——一旦开了先例，后果不堪设想', scores: { rationalist: 4, egalitarian: 2, utilitarian: -4 } },
      { id: 'tor_yes_but', text: '应该用刑，但施刑者也应接受法律审判', scores: { utilitarian: 4, rationalist: 3, egalitarian: 1 } },
    ],
  },
  {
    id: 'chinese_room',
    title: '中文房间',
    description: '一个不懂中文的人在一个房间里，按照一本英文写的中文对话规则手册处理中文纸条。外面的人以为房间里的人懂中文。AI 的"理解"是否也如此？',
    context: '这个问题涉及意识、理解和强 AI 的本质。',
    choices: [
      { id: 'cr_understanding', text: '系统整体确实"理解"中文——意识可以涌现于复杂系统', scores: { rationalist: 3, libertarian: -1 } },
      { id: 'cr_syntax', text: '这只是语法操作，没有真正的语义理解', scores: { rationalist: -2, humanist: 3 } },
      { id: 'cr_pragmatic', text: '如果能通过所有测试，讨论"是否真正理解"没有意义', scores: { utilitarian: 4, rationalist: 2 } },
      { id: 'cr_mystery', text: '意识本身就是一个谜，这个问题可能永远没有答案', scores: { humanist: 2 } },
    ],
  },
  {
    id: 'omelas',
    title: '离开欧梅拉斯',
    description: '有一个完美的城市欧梅拉斯，所有人的幸福与繁荣都建立在一个被囚禁在地下室的孩子无尽的痛苦之上。知道真相后，你会选择留下还是离开？',
    context: '如果你离开，你会失去欧梅拉斯的一切，但不再参与这个不公的系统。孩子的痛苦不会因为你离开而停止。',
    choices: [
      { id: 'om_stay', text: '留下——我的离开不能改变什么，不如享受幸福', scores: { utilitarian: 3, collectivist: -3, humanist: -5 } },
      { id: 'om_leave', text: '离开——我不能成为这种不公的一部分', scores: { egalitarian: 5, humanist: 4, utilitarian: -3 } },
      { id: 'om_fight', text: '留下并试图改变这个体制', scores: { collectivist: 5, egalitarian: 4, humanist: 3 } },
      { id: 'om_reject', text: '这个问题本身是荒谬的——现实中没有纯粹的完美社会', scores: { rationalist: 3, utilitarian: -1 } },
    ],
  },
];

export const PHILOSOPHIES: PhilosophyMatch[] = [
  { name: '功利主义 (Utilitarianism)', description: '以边沁、密尔为代表，追求最大多数人的最大幸福。你倾向于用结果来评判行为的对错。', score: 0 },
  { name: '义务论 (Deontology)', description: '以康德为代表，认为某些行为本身就是对的或错的，与结果无关。你重视道德原则和人的尊严。', score: 0 },
  { name: '存在主义 (Existentialism)', description: '以萨特、加缪为代表，认为人是自由的，必须为自己的选择负责。你相信生命的意义由自己创造。', score: 0 },
  { name: '儒家思想 (Confucianism)', description: '以孔子为代表，强调仁爱、礼制和社会和谐。你重视人际关系和社会责任。', score: 0 },
  { name: '道家思想 (Taoism)', description: '以老子、庄子为代表，主张道法自然、无为而治。你倾向于顺其自然，不强行干预。', score: 0 },
  { name: '自由主义 (Liberalism)', description: '以洛克、罗尔斯为代表，强调个人权利和自由。你认为个人自由不应被随意侵犯。', score: 0 },
  { name: '社会主义 (Socialism)', description: '以马克思为代表，关注社会平等和集体福祉。你认为资源应该更加公平地分配。', score: 0 },
  { name: '斯多葛主义 (Stoicism)', description: '以马可·奥勒留、塞内卡为代表，主张控制自己能控制的，接受不能控制的。你重视内在修养和理性。', score: 0 },
];

export const FIGURES: SimilarFigure[] = [
  { name: '彼得·辛格 (Peter Singer)', description: '当代功利主义哲学家，《动物解放》作者，主张有效利他主义', match: 0 },
  { name: '让-保罗·萨特 (Jean-Paul Sartre)', description: '法国存在主义哲学家，拒绝诺贝尔文学奖的传奇人物', match: 0 },
  { name: '伊曼努尔·康德 (Immanuel Kant)', description: '德国哲学家，义务论伦理学奠基人，一生未曾离开柯尼斯堡', match: 0 },
  { name: '约翰·罗尔斯 (John Rawls)', description: '美国政治哲学家，《正义论》作者，提出"无知之幕"思想实验', match: 0 },
  { name: '孔子 (Confucius)', description: '中国古代思想家，儒家学派创始人，影响东亚文明两千年', match: 0 },
  { name: '庄子 (Zhuangzi)', description: '战国时期道家代表人物，以逍遥游和齐物论闻名', match: 0 },
  { name: '阿尔贝·加缪 (Albert Camus)', description: '法国作家、哲学家，荒诞主义代表人物，《西西弗神话》作者', match: 0 },
  { name: '卡尔·马克思 (Karl Marx)', description: '德国哲学家、经济学家，科学社会主义创始人', match: 0 },
  { name: '约翰·斯图尔特·密尔 (John Stuart Mill)', description: '英国哲学家，古典自由主义与功利主义的集大成者', match: 0 },
  { name: '马可·奥勒留 (Marcus Aurelius)', description: '罗马皇帝，斯多葛派哲学家，《沉思录》作者', match: 0 },
  { name: '汉娜·阿伦特 (Hannah Arendt)', description: '政治理论家，"平庸之恶"概念的提出者', match: 0 },
  { name: '弗里德里希·尼采 (Friedrich Nietzsche)', description: '德国哲学家，"上帝已死"和"超人"哲学的提出者', match: 0 },
];
