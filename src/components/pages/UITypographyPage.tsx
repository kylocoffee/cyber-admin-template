import React from 'react';
import { CyberCard } from '../common/CyberCard';

export const UITypographyPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Typography &amp; Monospace Figures</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              TYPE SCALE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Typographic pairing system: Plus Jakarta Sans for high-density display and JetBrains Mono for tabular metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Headings */}
        <CyberCard title="1. Headings &amp; Display Hierarchy">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-slate-500 font-mono">H1 / 24px Bold</span>
              <h1 className="text-2xl font-bold text-slate-100 uppercase tracking-wide">
                H1. Mainframe Command Core
              </h1>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono">H2 / 20px SemiBold</span>
              <h2 className="text-xl font-semibold text-slate-200 uppercase tracking-wide">
                H2. Edge Cluster Distribution
              </h2>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono">H3 / 18px SemiBold</span>
              <h3 className="text-lg font-semibold text-slate-200">
                H3. Point-of-Sale Terminal Network
              </h3>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono">H4 / 16px Medium</span>
              <h4 className="text-base font-medium text-slate-300">
                H4. Cryptographic Ledger Records
              </h4>
            </div>
          </div>
        </CyberCard>

        {/* Tabular Figures & Monospace */}
        <CyberCard title="2. Tabular Monospace (.tabular-nums)">
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              In accordance with SaaS data grid rules, all financial amounts and counters enforce tabular numerals to prevent layout jitter:
            </p>
            <div className="p-3 rounded bg-[#090f19] border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Transaction ID 901</span>
                <span className="text-cyan-400 font-bold tabular-nums">$14,290.45</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Transaction ID 902</span>
                <span className="text-cyan-400 font-bold tabular-nums">   $849.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID 903</span>
                <span className="text-cyan-400 font-bold tabular-nums"> $1,719.12</span>
              </div>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
