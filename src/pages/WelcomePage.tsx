import { useState } from 'react';
import { Brain, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

const RELIGIONS = ['无神论/不可知论', '基督教', '伊斯兰教', '佛教', '印度教', '犹太教', '道教', '其他'];
const EDUCATIONS = ['高中及以下', '本科在读', '本科', '硕士在读', '硕士', '博士在读', '博士'];
const COUNTRIES = ['中国', '美国', '英国', '日本', '韩国', '印度', '德国', '法国', '加拿大', '澳大利亚', '其他'];

export function WelcomePage({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [religion, setReligion] = useState('');
  const [education, setEducation] = useState('');
  const [country, setCountry] = useState('');

  const canSubmit = name.trim().length > 0;

  const buildProfile = (): UserProfile => ({
    name: name.trim() || '匿名',
    religion: religion || '未填写',
    education: education || '未填写',
    country: country || '未填写',
  });

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 p-8 text-center">
        <Brain className="mx-auto mb-4 h-12 w-12 text-indigo-400" />
        <h2 className="text-2xl font-semibold">欢迎来到 ThoughtLab</h2>
        <p className="mt-3 text-slate-300">
          你将经历 {8} 个经典思想实验。没有标准答案，只有你的选择。
        </p>
        <p className="mt-2 text-sm text-slate-400">
          完成后，我们将分析你的思想光谱，告诉你最接近的信仰体系和与你相似的名人。
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 p-8">
        <h3 className="mb-2 text-lg font-medium">基本信息 <span className="text-sm font-normal text-slate-500">（可选）</span></h3>
        <p className="mb-6 text-sm text-slate-400">填写后可以查看与你背景相似的人的统计数据，也可以跳过。</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-400">昵称</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="你想被怎么称呼？"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">国家/地区</label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="" className="bg-slate-800">请选择</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c} className="bg-slate-800">{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">信仰/宗教背景</label>
            <select
              value={religion}
              onChange={e => setReligion(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="" className="bg-slate-800">请选择</option>
              {RELIGIONS.map(r => (
                <option key={r} value={r} className="bg-slate-800">{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">教育背景</label>
            <select
              value={education}
              onChange={e => setEducation(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="" className="bg-slate-800">请选择</option>
              {EDUCATIONS.map(e => (
                <option key={e} value={e} className="bg-slate-800">{e}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          disabled={!canSubmit}
          onClick={() => onSubmit(buildProfile())}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-medium transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          开始思想之旅
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
