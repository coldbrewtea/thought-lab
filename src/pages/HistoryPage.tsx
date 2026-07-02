import { Clock, RotateCcw, TrendingUp } from 'lucide-react';
import type { SavedResult } from '../types';

interface Props {
  results: SavedResult[];
  onRestart: () => void;
}

export function HistoryPage({ results, onRestart }: Props) {
  if (results.length === 0) {
    return (
      <div className="rounded-2xl bg-white/5 p-12 text-center">
        <Clock className="mx-auto mb-4 h-10 w-10 text-slate-500" />
        <p className="text-slate-400">还没有历史记录，做一次实验吧！</p>
        <button
          onClick={onRestart}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          开始实验
        </button>
      </div>
    );
  }

  const sorted = [...results].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white/5 p-8">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-400" />
          历史记录
          <span className="text-sm font-normal text-slate-500">（{results.length} 次）</span>
        </h2>
      </div>

      {sorted.map((item, i) => {
        const maxDim = item.result.maxDimension;
        const dimInfo = {
          utilitarian: '功利主义',
          libertarian: '自由意志',
          collectivist: '集体主义',
          rationalist: '理性主义',
          egalitarian: '平等主义',
          humanist: '人道主义',
        };
        return (
          <div key={item.id} className="rounded-2xl bg-white/5 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-slate-500">#{sorted.length - i}</span>
                <span className="font-medium text-white">{item.profile.name}</span>
              </div>
              <span className="text-xs text-slate-500">
                {new Date(item.timestamp).toLocaleString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
                <TrendingUp className="h-3 w-3" />
                {dimInfo[maxDim as keyof typeof dimInfo] || maxDim}
              </span>
              {item.profile.country !== '未填写' && (
                <span className="text-slate-400">{item.profile.country}</span>
              )}
              {item.profile.religion !== '未填写' && (
                <span className="text-slate-400">{item.profile.religion}</span>
              )}
            </div>
          </div>
        );
      })}

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
