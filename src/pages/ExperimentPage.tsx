import { ChevronLeft } from 'lucide-react';
import type { ThoughtExperiment } from '../types';

interface Props {
  experiment: ThoughtExperiment;
  currentIndex: number;
  totalCount: number;
  selectedChoice: string | undefined;
  onAnswer: (experimentId: string, choiceId: string) => void;
  onPrev: () => void;
}

export function ExperimentPage({ experiment, currentIndex, totalCount, selectedChoice, onAnswer, onPrev }: Props) {
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        {currentIndex > 0 && (
          <button onClick={onPrev} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div className="h-1.5 flex-1 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>
        <span className="text-sm text-slate-400">{currentIndex + 1}/{totalCount}</span>
      </div>

      {/* Experiment */}
      <div className="rounded-2xl bg-white/5 p-8">
        <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
          思想实验 #{currentIndex + 1}
        </span>
        <h2 className="mt-4 text-2xl font-semibold">{experiment.title}</h2>
        <div className="mt-6 space-y-4 text-slate-300 leading-relaxed">
          <p>{experiment.description}</p>
          <p className="rounded-xl bg-white/5 p-4 text-sm text-slate-400 italic">
            {experiment.context}
          </p>
        </div>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        {experiment.choices.map(choice => (
          <button
            key={choice.id}
            onClick={() => onAnswer(experiment.id, choice.id)}
            className={`w-full rounded-xl border p-5 text-left transition-all ${
              selectedChoice === choice.id
                ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                selectedChoice === choice.id
                  ? 'border-indigo-400 bg-indigo-400'
                  : 'border-slate-500'
              }`}>
                {selectedChoice === choice.id && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-slate-200">{choice.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
