import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Terminal, Code, Cpu, BookOpen } from 'lucide-react';

export const HelperPage: React.FC = () => {
  const { setIsAiGuideOpen, setIsPluginInventoryOpen } = useTheme();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber CSS Helpers &amp; Design Tokens</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              DEV UTILITIES
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reference guide for cyber design tokens, CSS custom properties, utility classes, and logical properties.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAiGuideOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            AI &amp; Dev Architecture Guide
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSS Custom Properties */}
        <CyberCard title="1. CSS Design Tokens (Custom Properties)">
          <div className="space-y-3 text-xs">
            <p className="text-slate-400">
              The template provides dynamic CSS custom properties on <code className="text-cyan-400">:root</code>:
            </p>
            <div className="p-3 rounded bg-[#080c14] border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
              <div>--cyber-primary: #00f0ff;</div>
              <div>--cyber-primary-rgb: 0, 240, 255;</div>
              <div>--cyber-bg: #0a0e17;</div>
              <div>--cyber-bg-card: #131c2d;</div>
              <div>--cyber-border: rgba(56, 189, 248, 0.18);</div>
              <div>--cyber-font-sans: 'Plus Jakarta Sans';</div>
              <div>--cyber-font-mono: 'JetBrains Mono';</div>
            </div>
          </div>
        </CyberCard>

        {/* Cyber CSS Classes */}
        <CyberCard title="2. Cyber Utility Classes">
          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded bg-[#090f19] border border-slate-800 space-y-1">
              <span className="font-bold font-mono text-cyan-400">.cyber-corner</span>
              <p className="text-slate-400">
                Adds authentic futuristic corner notches at top-left and bottom-right (automatically flipped in RTL).
              </p>
            </div>

            <div className="p-2.5 rounded bg-[#090f19] border border-slate-800 space-y-1">
              <span className="font-bold font-mono text-cyan-400">.cyber-card-glow</span>
              <p className="text-slate-400">
                Adds an ambient box shadow matched with the current primary accent color.
              </p>
            </div>

            <div className="p-2.5 rounded bg-[#090f19] border border-slate-800 space-y-1">
              <span className="font-bold font-mono text-cyan-400">.tabular-nums</span>
              <p className="text-slate-400">
                Enforces tabular numerals and JetBrains Mono monospace font for tables, prices, and counters.
              </p>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
