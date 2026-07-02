import type { SavedResult } from '../types';

const STORAGE_KEY = 'thoughtlab-results';

export interface GlobalStats {
  totalCompletions: number;
  dimAverages: Record<string, number>;
  topPhilo: Record<string, number>;
  topFigure: Record<string, number>;
  byCountry: Record<string, number>;
  byReligion: Record<string, number>;
  byEducation: Record<string, number>;
}

export function saveResult(result: SavedResult): void {
  const existing = loadResults();
  existing.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function loadResults(): SavedResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function loadMyResults(): SavedResult[] {
  return loadResults();
}

export function computeGlobalStats(results: SavedResult[]): GlobalStats {
  const total = results.length;
  if (total === 0) {
    return {
      totalCompletions: 0,
      dimAverages: {},
      topPhilo: {},
      topFigure: {},
      byCountry: {},
      byReligion: {},
      byEducation: {},
    };
  }

  const dimSums: Record<string, number> = {};
  const dimCounts: Record<string, number> = {};
  const philoCounts: Record<string, number> = {};
  const figureCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};
  const religionCounts: Record<string, number> = {};
  const educationCounts: Record<string, number> = {};

  for (const r of results) {
    for (const [dim, val] of Object.entries(r.result.dimensions)) {
      dimSums[dim] = (dimSums[dim] || 0) + val;
      dimCounts[dim] = (dimCounts[dim] || 0) + 1;
    }
    for (const p of r.result.philosophies) {
      philoCounts[p.name] = (philoCounts[p.name] || 0) + 1;
    }
    for (const f of r.result.similarFigures) {
      figureCounts[f.name] = (figureCounts[f.name] || 0) + 1;
    }
    if (r.profile.country && r.profile.country !== '未填写') {
      countryCounts[r.profile.country] = (countryCounts[r.profile.country] || 0) + 1;
    }
    if (r.profile.religion && r.profile.religion !== '未填写') {
      religionCounts[r.profile.religion] = (religionCounts[r.profile.religion] || 0) + 1;
    }
    if (r.profile.education && r.profile.education !== '未填写') {
      educationCounts[r.profile.education] = (educationCounts[r.profile.education] || 0) + 1;
    }
  }

  const dimAverages: Record<string, number> = {};
  for (const [dim, sum] of Object.entries(dimSums)) {
    dimAverages[dim] = Math.round(sum / dimCounts[dim]);
  }

  return {
    totalCompletions: total,
    dimAverages,
    topPhilo: philoCounts,
    topFigure: figureCounts,
    byCountry: countryCounts,
    byReligion: religionCounts,
    byEducation: educationCounts,
  };
}
