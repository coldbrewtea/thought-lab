import { RotateCcw, TrendingUp, User, Users, BookOpen } from 'lucide-react';
import type { Result, UserProfile } from '../types';
import { DIMENSIONS } from '../mock/data';

interface Props {
  result: Result;
  profile: UserProfile;
  onRestart: () => void;
}

export function ResultPage({ result, profile, onRestart }: Props) {
  const maxDim = DIMENSIONS.find(d => d.key === result.maxDimension);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-white/5 p-8 text-center">
        <TrendingUp className="mx-auto mb-4 h-10 w-10 text-indigo-400" />
        <h2 className="text-2xl font-semibold">{profile.name}，这是你的思想光谱</h2>
        <p className="mt-2 text-slate-400">
          你的核心倾向是 <span className="text-indigo-300 font-medium">{maxDim?.label}</span>
        </p>
        <p className="mt-4 max-w-lg mx-auto text-slate-300 text-sm leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Dimension Chart */}
      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-6 text-lg font-medium flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-400" />
          维度分析
        </h3>
        <div className="space-y-5">
          {DIMENSIONS.map(dim => {
            const value = result.dimensions[dim.key] || 50;
            return (
              <div key={dim.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{dim.label}</span>
                  <span className="text-slate-500">{value}</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-1000"
                    style={{ width: `${value}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>{dim.lowLabel}</span>
                  <span>{dim.highLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Philosophy Matches */}
      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-6 text-lg font-medium flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          最接近的信仰体系
        </h3>
        <div className="space-y-4">
          {result.philosophies.map((p, i) => (
            <div key={p.name} className="flex items-start gap-4 rounded-xl bg-white/5 p-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-bold text-indigo-300">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-white">{p.name}</span>
                  <span className="text-xs text-indigo-400">{p.score}% 匹配</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Figures */}
      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-6 text-lg font-medium flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-400" />
          与你相似的名人
        </h3>
        <div className="space-y-4">
          {result.similarFigures.map((f, i) => (
            <div key={f.name} className="flex items-start gap-4 rounded-xl bg-white/5 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-white">{f.name}</span>
                  <span className="text-xs text-violet-400">{f.match}% 相似</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Summary */}
      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-4 text-lg font-medium flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-400" />
          你的信息
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-500">昵称</span>
            <p className="text-white">{profile.name}</p>
          </div>
          <div>
            <span className="text-slate-500">国家</span>
            <p className="text-white">{profile.country}</p>
          </div>
          <div>
            <span className="text-slate-500">信仰背景</span>
            <p className="text-white">{profile.religion}</p>
          </div>
          <div>
            <span className="text-slate-500">教育背景</span>
            <p className="text-white">{profile.education}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 font-medium text-slate-300 transition-colors hover:bg-white/20"
      >
        <RotateCcw className="h-4 w-4" />
        再做一次
      </button>
    </div>
  );
}
