import { useState, useCallback } from 'react';
import type { UserProfile, Result } from './types';
import { EXPERIMENTS } from './mock/data';
import { WelcomePage } from './pages/WelcomePage';
import { ExperimentPage } from './pages/ExperimentPage';
import { ResultPage } from './pages/ResultPage';
import { calculateResult } from './utils/scoring';

type Step = 'welcome' | 'experiment' | 'result';

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
      setStep('result');
    }
  }, [currentExp, answers]);

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
      </div>
    </div>
  );
}
