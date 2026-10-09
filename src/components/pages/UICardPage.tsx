import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  ChevronDown,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Shield,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export const UICardPage: React.FC = () => {
  const { addToast } = useTheme();
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Cards &amp; Panels Architecture</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              PANEL MATRIX
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Modular cyber panels featuring sci-fi corner notches, ambient neon glows, action headers, and collapsible bodies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Cyber Card with Corner Accents */}
        <CyberCard
          title="Cyber Panel with Corner Notches"
          subtitle="Default cyber-corner pseudo borders"
          action={
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
              .cyber-corner
            </span>
          }
        >
          <p className="text-xs text-slate-300 leading-relaxed">
            This panel uses pure CSS pseudo-elements (<code className="text-cyan-400">::before</code> and <code className="text-cyan-400">::after</code>) to render authentic sci-fi corner notches that flip automatically in RTL mode.
          </p>
          <div className="mt-3 p-3 rounded bg-[#090f19] border border-slate-800 text-[11px] font-mono text-slate-400">
            border: 1px solid var(--cyber-border-muted);
          </div>
        </CyberCard>

        {/* Card with Active Glowing Neon Border */}
        <CyberCard
          title="Ambient Glowing Panel"
          subtitle="Active cyber-card-glow treatment"
          glow
          action={
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Glow Active
            </span>
          }
        >
          <p className="text-xs text-slate-300 leading-relaxed">
            Utilizes subtle dynamic color-matched box-shadows synchronized with the active primary neon accent token (Cyan, Emerald, Violet, etc.).
          </p>
          <div className="mt-3 p-3 rounded bg-[#090f19] border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
            box-shadow: 0 0 15px rgba(var(--cyber-primary-rgb), 0.15);
          </div>
        </CyberCard>

        {/* Interactive Collapsible Panel */}
        <CyberCard
          title="Collapsible Header Card"
          subtitle="Click chevron to toggle body expansion"
          action={
            <button
              onClick={() => setIsCardCollapsed(!isCardCollapsed)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCardCollapsed ? '-rotate-90' : ''
                }`}
              />
            </button>
          }
        >
          {!isCardCollapsed && (
            <div className="space-y-2 animate-fade-in text-xs text-slate-300 leading-relaxed">
              <p>
                Interactive collapsible panel suitable for secondary telemetry metrics or optional configurations. State is handled cleanly via React component state.
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Panel state: EXPANDED</span>
              </div>
            </div>
          )}
        </CyberCard>

        {/* Stat KPI Card with Trend */}
        <CyberCard corner className="p-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Daily Transaction Velocity
              </span>
              <div className="text-2xl font-bold text-slate-100 tabular-nums mt-1">
                $18,940<span className="text-sm text-slate-400">.00</span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
            <span className="text-emerald-400 flex items-center font-mono font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +22.4%
            </span>
            <span className="text-slate-500 font-mono">compared to yesterday peak</span>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
