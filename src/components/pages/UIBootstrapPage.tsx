import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const UIBootstrapPage: React.FC = () => {
  const { addToast } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Extended Bootstrap 5.3 Components</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              BS 5.3.8
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Standard Bootstrap UI primitives customized with cyber tokens, dark mode elevation, and glowing status borders.
          </p>
        </div>
      </div>

      {/* Grid of Bootstrap Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Badges & Tags */}
        <CyberCard title="1. Badges &amp; Status Indicators">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Solid Badges</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-cyan-500 text-black font-mono">Primary</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-500 text-black font-mono">Success</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-500 text-black font-mono">Warning</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-rose-500 text-white font-mono">Danger</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-purple-500 text-white font-mono">Purple</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 text-slate-300 font-mono">Dark</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Subtle Cyber Badges</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono">Cyber Cyan</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">Nominal</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-mono">Attention</span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded bg-rose-950 text-rose-300 border border-rose-500/40 font-mono">Critical</span>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Progress Bars */}
        <CyberCard title="2. Progress Bars &amp; Striped Gauges">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Memory Allocation</span>
                <span className="text-cyan-400">75%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded overflow-hidden">
                <div className="h-full bg-cyan-400 w-3/4 rounded" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Security Encryption Verified</span>
                <span className="text-emerald-400">92%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded overflow-hidden">
                <div className="h-full bg-emerald-400 w-[92%] rounded" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Disk Thermal Threshold</span>
                <span className="text-rose-400">84%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded overflow-hidden">
                <div className="h-full bg-rose-500 w-[84%] rounded" />
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Alert Callouts */}
        <CyberCard title="3. Contextual Alerts">
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-cyan-500/40 bg-cyan-950/20 text-cyan-200 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Info:</strong> Cluster update scheduled for 03:00 UTC. POS sync will continue uninterrupted.</span>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Success:</strong> Daily cash reconciliation completed. All batch ledger hashes matched.</span>
            </div>

            <div className="p-3 rounded-lg border border-amber-500/40 bg-amber-950/20 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Warning:</strong> High kitchen ticket queue volume detected on Table Section 02.</span>
            </div>
          </div>
        </CyberCard>

        {/* Spinners & Pagination */}
        <CyberCard title="4. Spinners &amp; Pagination">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Activity Spinners</span>
              <div className="flex items-center gap-4">
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                <Loader2 className="w-7 h-7 text-purple-400 animate-spin" />
                <span className="text-xs text-slate-400 font-mono">Synchronizing state...</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 block mb-2 font-mono">Pagination Component</span>
              <div className="flex items-center gap-1 font-mono text-xs">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="p-1.5 rounded border border-slate-800 bg-[#090e17] text-slate-400 hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded border transition-colors cursor-pointer ${
                      currentPage === p
                        ? 'border-cyan-400 bg-cyan-950 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-[#090e17] text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                  className="p-1.5 rounded border border-slate-800 bg-[#090e17] text-slate-400 hover:text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
