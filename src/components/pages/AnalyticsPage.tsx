import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  Download,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { addToast } = useTheme();
  const [range, setRange] = useState<'today' | '7d' | '30d' | 'quarter'>('30d');

  const handleExportReport = () => {
    addToast({
      type: 'success',
      title: 'Report Generated',
      message: `Analytics report for ${range.toUpperCase()} exported to PDF/CSV format.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Analytics &amp; Conversion Funnel</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              TELEMETRY V2
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audience acquisition channels, conversion drop-off rates, and global geographic traffic routing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Preset range buttons */}
          <div className="flex items-center gap-1 bg-[#090e17] p-1 rounded-md border border-slate-800 text-xs">
            {(['today', '7d', '30d', 'quarter'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded transition-colors cursor-pointer font-mono ${
                  range === r
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportReport}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/40 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Unique Visitors
          </span>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            48,920
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs last period
          </div>
        </CyberCard>

        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Page Impressions
          </span>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            184,310
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.9% engagement
          </div>
        </CyberCard>

        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Avg Session Dwell
          </span>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            4m 32s
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400 font-mono">
            Steady duration
          </div>
        </CyberCard>

        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Checkout Conversion
          </span>
          <div className="text-2xl font-bold text-cyan-400 tabular-nums">
            3.84%
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" /> +0.6% vs benchmark
          </div>
        </CyberCard>
      </div>

      {/* Conversion Funnel + Traffic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel (2 columns) */}
        <CyberCard
          title="Checkout Funnel Drop-off"
          subtitle="User conversion rates through order completion stages"
          className="lg:col-span-2"
        >
          <div className="space-y-4 pt-2">
            {[
              { stage: '1. Storefront Visit', count: 48920, pct: 100, color: 'bg-cyan-500' },
              { stage: '2. Product / Menu Viewed', count: 28410, pct: 58.0, color: 'bg-blue-500' },
              { stage: '3. Cart Item Added', count: 9140, pct: 18.7, color: 'bg-purple-500' },
              { stage: '4. Checkout Started', count: 3200, pct: 6.5, color: 'bg-amber-500' },
              { stage: '5. Payment Completed', count: 1878, pct: 3.84, color: 'bg-emerald-500' },
            ].map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{step.stage}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-400 tabular-nums">{step.count.toLocaleString()} sessions</span>
                    <span className="text-cyan-400 font-bold tabular-nums">{step.pct}%</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-900 rounded-xs overflow-hidden border border-slate-800">
                  <div
                    className={`h-full ${step.color} transition-all duration-500 rounded-xs`}
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CyberCard>

        {/* Geographic Origin (1 column) */}
        <CyberCard
          title="Geographic Traffic Distribution"
          subtitle="Top requests by territory"
        >
          <div className="space-y-3">
            {[
              { country: 'United States', flag: '🇺🇸', visits: 18450, share: 37.7 },
              { country: 'Japan (Tokyo)', flag: '🇯🇵', visits: 10210, share: 20.8 },
              { country: 'Germany (Frankfurt)', flag: '🇩🇪', visits: 7420, share: 15.1 },
              { country: 'Singapore', flag: '🇸🇬', visits: 5120, share: 10.4 },
              { country: 'United Kingdom', flag: '🇬🇧', visits: 4180, share: 8.5 },
              { country: 'Other Global Nodes', flag: '🌐', visits: 3540, share: 7.5 },
            ].map((geo, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded bg-[#090f19] border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span>{geo.flag}</span>
                  <span className="text-slate-200 font-medium">{geo.country}</span>
                </div>
                <div className="text-end font-mono">
                  <span className="text-slate-300 tabular-nums">{geo.visits.toLocaleString()}</span>
                  <span className="text-slate-500 text-[10px] ms-1">({geo.share}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
