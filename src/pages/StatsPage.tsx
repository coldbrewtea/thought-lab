import { TrendingUp, Globe, BookOpen, GraduationCap } from 'lucide-react';
import type { GlobalStats } from '../utils/storage';
import { DIMENSIONS } from '../mock/data';

interface Props {
  stats: GlobalStats;
}

export function StatsPage({ stats }: Props) {
  if (stats.totalCompletions === 0) {
    return (
      <div className="rounded-2xl bg-white/5 p-12 text-center">
        <TrendingUp className="mx-auto mb-4 h-10 w-10 text-slate-500" />
        <p className="text-slate-400">还没有人完成实验，成为第一个吧！</p>
      </div>
    );
  }

  const topPhilo = Object.entries(stats.topPhilo).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topFigure = Object.entries(stats.topFigure).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxPhiloCount = topPhilo[0]?.[1] || 1;
  const maxFigureCount = topFigure[0]?.[1] || 1;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 p-8 text-center">
        <TrendingUp className="mx-auto mb-4 h-10 w-10 text-indigo-400" />
        <h2 className="text-2xl font-semibold">全局统计</h2>
        <p className="mt-2 text-slate-400">共 {stats.totalCompletions} 次完成</p>
      </div>

      {/* Dimension Averages */}
      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-6 text-lg font-medium">平均思想光谱</h3>
        <div className="space-y-4">
          {DIMENSIONS.map(dim => {
            const value = stats.dimAverages[dim.key] || 50;
            return (
              <div key={dim.key}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{dim.label}</span>
                  <span className="text-slate-500">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Philosophies */}
      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-4 text-lg font-medium flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          最受欢迎的信仰体系
        </h3>
        <div className="space-y-3">
          {topPhilo.map(([name, count]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="w-48 truncate text-sm text-slate-300">{name}</span>
              <div className="flex-1 h-5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500/60"
                  style={{ width: `${(count / maxPhiloCount) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs text-slate-500">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Figures */}
      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-4 text-lg font-medium flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          最相似的名人
        </h3>
        <div className="space-y-3">
          {topFigure.map(([name, count]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="w-48 truncate text-sm text-slate-300">{name}</span>
              <div className="flex-1 h-5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-violet-500/60"
                  style={{ width: `${(count / maxFigureCount) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs text-slate-500">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demographics */}
      {(Object.keys(stats.byCountry).length > 0 || Object.keys(stats.byReligion).length > 0 || Object.keys(stats.byEducation).length > 0) && (
        <div className="rounded-2xl bg-white/5 p-8">
          <h3 className="mb-4 text-lg font-medium flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            参与者画像
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {Object.keys(stats.byCountry).length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-slate-400 flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" /> 国家/地区
                </h4>
                {Object.entries(stats.byCountry).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => (
                  <div key={name} className="flex justify-between text-sm py-0.5">
                    <span className="text-slate-300">{name}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                ))}
              </div>
            )}
            {Object.keys(stats.byReligion).length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-slate-400 flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" /> 信仰
                </h4>
                {Object.entries(stats.byReligion).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => (
                  <div key={name} className="flex justify-between text-sm py-0.5">
                    <span className="text-slate-300">{name}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                ))}
              </div>
            )}
            {Object.keys(stats.byEducation).length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-slate-400 flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5" /> 教育
                </h4>
                {Object.entries(stats.byEducation).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => (
                  <div key={name} className="flex justify-between text-sm py-0.5">
                    <span className="text-slate-300">{name}</span>
                    <span className="text-slate-500">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
