import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Layers, Plus, Code, Terminal, CheckCircle2 } from 'lucide-react';

export const StarterLayoutPage: React.FC = () => {
  const { setIsStarterMode, addToast } = useTheme();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Starter Template Skeleton</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              STARTER SKELETON
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Clean boilerplate canvas ready for new application modules without demo mockup clutter.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsStarterMode(false);
              addToast({
                type: 'info',
                title: 'Switched to Full Demo',
                message: 'All 30+ pages, POS workflows, and datasets activated.',
              });
            }}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            ← Return to Full Demo (30+ Pages)
          </button>
        </div>
      </div>

      {/* Clean Slate Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CyberCard
          title="Blank Module Container"
          subtitle="Ready for custom developer code"
          className="md:col-span-2"
        >
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-lg space-y-3">
            <Terminal className="w-10 h-10 mx-auto text-cyan-400 opacity-60" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
              Your Application Content Goes Here
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Use <code className="text-cyan-400">&lt;CyberCard&gt;</code> components, Tailwind classes, and Bootstrap 5.3 design tokens to build your proprietary dashboard modules.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Starter Action Invoked',
                    message: 'Event handler triggered in starter environment.',
                  });
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Trigger Custom Action
              </button>
            </div>
          </div>
        </CyberCard>

        {/* Quick Reference */}
        <CyberCard title="Architecture Fast Track">
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full LTR / RTL bidirectional rendering ready.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Dynamic CSS accent variables synced with DOM.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero external build lock-in (Vite + React 19).</span>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
