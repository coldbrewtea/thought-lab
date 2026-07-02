import { useState, useCallback } from 'react';
import type { UserProfile, Result, SavedResult } from './types';
import { EXPERIMENTS } from './mock/data';
import { WelcomePage } from './pages/WelcomePage';
import { ExperimentPage } from './pages/ExperimentPage';
import { ResultPage } from './pages/ResultPage';
import { StatsPage } from './pages/StatsPage';
import { HistoryPage } from './pages/HistoryPage';
import { calculateResult } from './utils/scoring';
import { saveResult, loadResults, computeGlobalStats } from './utils/storage';

type Step = 'welcome' | 'experiment' | 'result' | 'stats' | 'history';

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentExp, setCurrentExp] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);

  const handleProfileSubmit = useCallback((p: UserProfile) => {
    setProfile(p);
    setStep('experiment');
  }, []);

  const handleAnswer = useCallback((experimentId: string, choiceId: string) => {
    setAnswers(prev => ({ ...prev, [experimentId]: choiceId }));
    if (currentExp < EXPERIMENTS.length - 1) {
      setCurrentExp(prev => prev + 1);
    } else {
      const finalAnswers = { ...answers, [experimentId]: choiceId };
      const r = calculateResult(finalAnswers, EXPERIMENTS);
      setResult(r);

      const sr: SavedResult = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        profile: profile!,
        result: r,
        answers: finalAnswers,
      };
      saveResult(sr);
      setStep('result');
    }
  }, [currentExp, answers, profile]);

  const handlePrev = useCallback(() => {
    if (currentExp > 0) setCurrentExp(prev => prev - 1);
  }, [currentExp]);

  const handleRestart = useCallback(() => {
    setStep('welcome');
    setProfile(null);
    setCurrentExp(0);
    setAnswers({});
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-indigo-400">Thought</span>Lab
          </h1>
          <p className="mt-2 text-sm text-slate-400">思想实验 · 光谱分析 · 发现自己</p>
          {(step === 'result' || step === 'stats' || step === 'history') && (
            <nav className="mt-4 flex justify-center gap-4 text-sm">
              <button
                onClick={() => setStep('result')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${step === 'result' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
              >
                结果
              </button>
              <button
                onClick={() => setStep('stats')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${step === 'stats' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
              >
                统计
              </button>
              <button
                onClick={() => setStep('history')}
                className={`rounded-lg px-3 py-1.5 transition-colors ${step === 'history' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
              >
                历史
              </button>
            </nav>
          )}
        </header>

        {step === 'welcome' && (
          <WelcomePage onSubmit={handleProfileSubmit} />
        )}
        {step === 'experiment' && (
          <ExperimentPage
            experiment={EXPERIMENTS[currentExp]}
            currentIndex={currentExp}
            totalCount={EXPERIMENTS.length}
            selectedChoice={answers[EXPERIMENTS[currentExp].id]}
            onAnswer={handleAnswer}
            onPrev={handlePrev}
          />
        )}
        {step === 'result' && result && profile && (
          <ResultPage
            result={result}
            profile={profile}
            onRestart={handleRestart}
          />
        )}
        {step === 'stats' && (
          <StatsPage stats={computeGlobalStats(loadResults())} />
        )}
        {step === 'history' && (
          <HistoryPage results={loadResults()} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
