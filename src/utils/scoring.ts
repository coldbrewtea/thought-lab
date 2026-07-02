import type { ThoughtExperiment, Result, PhilosophyMatch, SimilarFigure } from '../types';
import { DIMENSIONS, PHILOSOPHIES, FIGURES } from '../mock/data';

export function calculateResult(answers: Record<string, string>, experiments: ThoughtExperiment[]): Result {
  const scores: Record<string, number> = {};
  DIMENSIONS.forEach(d => { scores[d.key] = 0; });

  // Sum up scores from choices
  for (const exp of experiments) {
    const choiceId = answers[exp.id];
    if (!choiceId) continue;
    const choice = exp.choices.find(c => c.id === choiceId);
    if (!choice) continue;
    for (const [dim, score] of Object.entries(choice.scores)) {
      scores[dim] = (scores[dim] || 0) + score;
    }
  }

  // Normalize to 0-100
  const dimEntries = Object.entries(scores);
  const minScore = Math.min(...dimEntries.map(e => e[1]));
  const maxScore = Math.max(...dimEntries.map(e => e[1]));
  const range = maxScore - minScore || 1;
  const normalized: Record<string, number> = {};
  dimEntries.forEach(([key, val]) => {
    normalized[key] = Math.round(((val - minScore) / range) * 100);
  });

  const maxDimension = Object.entries(normalized).sort((a, b) => b[1] - a[1])[0][0];

  // Match philosophies
  const philosophyScores = matchPhilosophies(normalized);
  const figures = matchFigures(normalized);

  const summary = generateSummary(maxDimension);

  return {
    dimensions: normalized,
    maxDimension,
    philosophies: philosophyScores.slice(0, 3),
    similarFigures: figures.slice(0, 3),
    summary,
  };
}

function matchPhilosophies(dims: Record<string, number>): PhilosophyMatch[] {
  const mapping: Record<string, string[]> = {
    utilitarian: ['功利主义 (Utilitarianism)', '自由主义 (Liberalism)'],
    libertarian: ['存在主义 (Existentialism)', '自由主义 (Liberalism)', '道家思想 (Taoism)'],
    collectivist: ['社会主义 (Socialism)', '儒家思想 (Confucianism)'],
    rationalist: ['斯多葛主义 (Stoicism)', '义务论 (Deontology)'],
    egalitarian: ['社会主义 (Socialism)', '义务论 (Deontology)'],
    humanist: ['义务论 (Deontology)', '儒家思想 (Confucianism)'],
  };

  const scores: Record<string, number> = {};
  PHILOSOPHIES.forEach(p => { scores[p.name] = 0; });

  for (const [dim, value] of Object.entries(dims)) {
    const matches = mapping[dim] || [];
    for (const name of matches) {
      scores[name] = (scores[name] || 0) + value;
    }
  }

  return PHILOSOPHIES.map(p => ({ ...p, score: Math.round(scores[p.name] / 3) }))
    .sort((a, b) => b.score - a.score);
}

function matchFigures(dims: Record<string, number>): SimilarFigure[] {
  const mapping: Record<string, string[]> = {
    utilitarian: ['彼得·辛格 (Peter Singer)', '约翰·斯图尔特·密尔 (John Stuart Mill)'],
    libertarian: ['让-保罗·萨特 (Jean-Paul Sartre)', '弗里德里希·尼采 (Friedrich Nietzsche)'],
    collectivist: ['卡尔·马克思 (Karl Marx)', '孔子 (Confucius)'],
    rationalist: ['伊曼努尔·康德 (Immanuel Kant)', '马可·奥勒留 (Marcus Aurelius)'],
    egalitarian: ['约翰·罗尔斯 (John Rawls)', '汉娜·阿伦特 (Hannah Arendt)'],
    humanist: ['阿尔贝·加缪 (Albert Camus)', '汉娜·阿伦特 (Hannah Arendt)'],
  };

  const scores: Record<string, number> = {};
  FIGURES.forEach(f => { scores[f.name] = 0; });

  for (const [dim, value] of Object.entries(dims)) {
    const matches = mapping[dim] || [];
    for (const name of matches) {
      scores[name] = (scores[name] || 0) + value;
    }
  }

  return FIGURES.map(f => ({ ...f, match: Math.round(scores[f.name] / 3) }))
    .sort((a, b) => b.match - a.match);
}

function generateSummary(maxDim: string): string {
  const summaries: Record<string, string> = {
    utilitarian: '你倾向于用结果来衡量行为的价值。对你来说，道德不是关于规则本身，而是关于规则带来的后果。你可能会认同"最大多数人的最大幸福"这一原则，愿意为了更大的善而接受一些看似残酷的选择。',
    libertarian: '你相信每个人都是自己命运的作者。自由对你来说不是奢侈品，而是必需品——没有它，其他一切价值都无从谈起。你警惕任何形式的强制，哪怕是以"为你好"的名义。',
    collectivist: '你看重人与人之间的联系和责任。你相信个人的意义在群体中才能真正实现，愿意为了共同体的利益做出个人牺牲。对你来说，没有人是一座孤岛。',
    rationalist: '你相信逻辑和理性是指引人生的明灯。情感可能欺骗我们，但理性不会。你在做决定时试图剥离偏见和情绪，追求一种近乎数学的清晰和一致性。',
    egalitarian: '你无法接受不合理的差异。天赋、出身、运气——这些偶然因素不应该决定一个人的命运。你追求一个更公平的世界，在那里每个人都能有尊严地生活。',
    humanist: '你把"人"放在一切的中心。对你来说，抽象的哲学原则如果伤害了具体的人，就失去了意义。你重视共情、尊严和每一个活生生的个体的价值。',
  };
  return summaries[maxDim] || '你的思想光谱多元而独特，无法被简单归类。这正是你的魅力所在。';
}
