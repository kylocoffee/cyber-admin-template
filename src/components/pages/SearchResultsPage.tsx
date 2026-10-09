import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Search, ExternalLink, FileText, ShoppingBag, Terminal } from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const { setActivePage } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'pos' | 'pages'>('all');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Unified Cyber Search Results</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              RESULTS
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global search index spanning POS catalog, kitchen orders, system pages, and telemetry records.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded ${
            activeTab === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Results (6)
        </button>
        <button
          onClick={() => setActiveTab('pos')}
          className={`px-3 py-1.5 text-xs font-semibold rounded ${
            activeTab === 'pos'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          POS Modules &amp; Items (3)
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-3 py-1.5 text-xs font-semibold rounded ${
            activeTab === 'pages'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Admin Pages (3)
        </button>
      </div>

      <div className="space-y-3">
        {/* Result 1 */}
        <CyberCard noPadding>
          <div
            onClick={() => setActivePage('pos-customer')}
            className="p-4 hover:bg-slate-800/40 transition-colors cursor-pointer flex items-start gap-3"
          >
            <div className="p-2.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-200 hover:text-cyan-300">
                  Customer Order Terminal (POS Suite)
                </h4>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded">
                  POS Module
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Order management terminal for burgers, ramen, drinks, kitchen modifiers, and live tax calculation.
              </p>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                Route: /pos-customer · Priority: High
              </span>
            </div>
          </div>
        </CyberCard>

        {/* Result 2 */}
        <CyberCard noPadding>
          <div
            onClick={() => setActivePage('pos-kitchen')}
            className="p-4 hover:bg-slate-800/40 transition-colors cursor-pointer flex items-start gap-3"
          >
            <div className="p-2.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-200 hover:text-cyan-300">
                  Kitchen Display System (KDS)
                </h4>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-1.5 py-0.2 rounded">
                  Queue
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Culinary line display with elapsed timer counters and order ticket workflow (Received, Cooking, Ready).
              </p>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                Route: /pos-kitchen · Priority: High
              </span>
            </div>
          </div>
        </CyberCard>

        {/* Result 3 */}
        <CyberCard noPadding>
          <div
            onClick={() => setActivePage('analytics')}
            className="p-4 hover:bg-slate-800/40 transition-colors cursor-pointer flex items-start gap-3"
          >
            <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-200 hover:text-cyan-300">
                  Analytics &amp; Conversion Funnels
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded">
                  Analytics
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Checkout drop-off funnel analytics, geographic traffic distribution, and audience dwell telemetry.
              </p>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                Route: /analytics · Priority: Medium
              </span>
            </div>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
