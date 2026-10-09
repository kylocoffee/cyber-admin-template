import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Sparkles,
  Zap,
  Check,
  Send,
  Download,
  Trash2,
  Loader2,
  Power,
  Shield,
} from 'lucide-react';

export const UIButtonsPage: React.FC = () => {
  const { addToast } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = () => {
    setIsLoading(true);
    addToast({
      type: 'info',
      title: 'Action Triggered',
      message: 'Simulating 2-second asynchronous processing state...',
    });
    setTimeout(() => {
      setIsLoading(false);
      addToast({
        type: 'success',
        title: 'Action Completed',
        message: 'Asynchronous task concluded successfully.',
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber UI Buttons &amp; Interactive Triggers</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              BUTTON MATRIX
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Futuristic neon glow CTAs, outline tech buttons, segmented groups, and reactive loading states.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Glowing Cyber Primary Buttons */}
        <CyberCard title="1. Neon Cyber Buttons (Solid &amp; Glow)">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2.5">
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-all cursor-pointer shadow-md shadow-cyan-500/30">
                Primary Neon Cyan
              </button>
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-emerald-500 text-black hover:bg-emerald-400 transition-all cursor-pointer shadow-md shadow-emerald-500/30">
                Success Emerald
              </button>
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-purple-500 text-white hover:bg-purple-400 transition-all cursor-pointer shadow-md shadow-purple-500/30">
                Violet Cyber
              </button>
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-rose-500 text-white hover:bg-rose-400 transition-all cursor-pointer shadow-md shadow-rose-500/30">
                Laser Crimson
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              High-contrast primary triggers featuring subtle ambient box-shadow glow.
            </p>
          </div>
        </CyberCard>

        {/* Outline Tech Buttons */}
        <CyberCard title="2. Cyber Outline Tech Buttons">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2.5">
              <button className="px-4 py-2 text-xs font-semibold rounded border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer">
                Outline Cyan
              </button>
              <button className="px-4 py-2 text-xs font-semibold rounded border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer">
                Outline Emerald
              </button>
              <button className="px-4 py-2 text-xs font-semibold rounded border border-amber-500/50 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer">
                Outline Amber
              </button>
              <button className="px-4 py-2 text-xs font-semibold rounded border border-rose-500/50 text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer">
                Outline Crimson
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Secondary actions utilizing translucent 1px borders with hover fill transitions.
            </p>
          </div>
        </CyberCard>

        {/* Button Groups & Icon Combinations */}
        <CyberCard title="3. Segmented Button Groups">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Horizontal Segment Group</span>
              <div className="inline-flex rounded-md border border-slate-800 bg-[#080d15] p-1 gap-1">
                <button className="px-3 py-1.5 text-xs font-medium rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Day View
                </button>
                <button className="px-3 py-1.5 text-xs font-medium rounded text-slate-400 hover:text-white">
                  Week View
                </button>
                <button className="px-3 py-1.5 text-xs font-medium rounded text-slate-400 hover:text-white">
                  Month View
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Icon Action Buttons</span>
              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded bg-[#090f19] border border-slate-800 text-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded bg-[#090f19] border border-slate-800 text-emerald-400 hover:border-emerald-400 transition-colors cursor-pointer">
                  <Shield className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded bg-[#090f19] border border-slate-800 text-rose-400 hover:border-rose-400 transition-colors cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Dynamic Loading States */}
        <CyberCard title="4. Interactive Loading &amp; Disabled States">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Asynchronous Trigger</span>
              <button
                onClick={triggerLoading}
                disabled={isLoading}
                className="px-5 py-2.5 rounded bg-cyan-500 text-black font-bold uppercase text-xs tracking-wider hover:bg-cyan-400 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Executing Directive...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Simulate Async Operation
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 block mb-2 font-mono">Disabled State</span>
              <button
                disabled
                className="px-4 py-2 rounded border border-slate-800 bg-slate-900/40 text-slate-600 text-xs font-semibold cursor-not-allowed opacity-50"
              >
                Operation Locked (Insufficient Privileges)
              </button>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
