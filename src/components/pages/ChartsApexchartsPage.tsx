import React from 'react';
import { CyberCard } from '../common/CyberCard';
import { Activity, Zap, Cpu } from 'lucide-react';

export const ChartsApexchartsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>ApexCharts &amp; Micro-Sparklines</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              APEX SIMULATOR
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Futuristic SVG area sparklines, radial gauge meters, and weekly cluster activity heatmaps.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Radial Gauge 1 */}
        <CyberCard title="Cluster Capacity" subtitle="Target: <80%">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="56" stroke="#1e293b" strokeWidth="10" fill="none" />
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  stroke="#00f0ff"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="351"
                  strokeDashoffset="100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold font-mono text-cyan-400">72%</span>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Optimal</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 mt-2">Nominal Node Equilibrium</span>
          </div>
        </CyberCard>

        {/* Radial Gauge 2 */}
        <CyberCard title="mTLS Encrypted Traffic" subtitle="Cryptographic coverage">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="56" stroke="#1e293b" strokeWidth="10" fill="none" />
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  stroke="#10b981"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="351"
                  strokeDashoffset="28"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold font-mono text-emerald-400">92%</span>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Strict</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 mt-2">Zero-Trust Network Mesh</span>
          </div>
        </CyberCard>

        {/* Radial Gauge 3 */}
        <CyberCard title="Cache Hit Ratio" subtitle="Redis in-memory store">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="56" stroke="#1e293b" strokeWidth="10" fill="none" />
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  stroke="#a855f7"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="351"
                  strokeDashoffset="45"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold font-mono text-purple-400">87%</span>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">L1 Cache</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 mt-2">Zero Latency Ingestion</span>
          </div>
        </CyberCard>
      </div>

      {/* Activity Heatmap Grid */}
      <CyberCard
        title="Weekly Microservice Load Heatmap"
        subtitle="Operational intensity per cluster node over 7 days"
      >
        <div className="space-y-2 pt-2">
          {['Node-01 (AP-SE)', 'Node-02 (AP-NE)', 'Node-03 (EU-W3)', 'Node-04 (US-E4)'].map((node, r) => (
            <div key={r} className="flex items-center gap-2">
              <span className="w-36 text-xs font-mono text-slate-400 truncate">{node}</span>
              <div className="flex-1 grid grid-cols-14 gap-1.5">
                {Array.from({ length: 14 }).map((_, c) => {
                  const intensity = ((r * 3 + c * 5) % 4) + 1;
                  const bg = {
                    1: 'bg-[#101826] border-slate-800',
                    2: 'bg-cyan-950 border-cyan-800',
                    3: 'bg-cyan-800 border-cyan-600',
                    4: 'bg-cyan-400 border-white',
                  }[intensity];
                  return (
                    <div
                      key={c}
                      className={`h-5 rounded-xs border transition-colors ${bg}`}
                      title={`Interval ${c + 1}: Level ${intensity}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-slate-400 pt-3">
            <span>Low Load</span>
            <span className="w-3 h-3 rounded-xs bg-[#101826] border border-slate-800" />
            <span className="w-3 h-3 rounded-xs bg-cyan-950 border border-cyan-800" />
            <span className="w-3 h-3 rounded-xs bg-cyan-800 border border-cyan-600" />
            <span className="w-3 h-3 rounded-xs bg-cyan-400 border border-white" />
            <span>High Peak</span>
          </div>
        </div>
      </CyberCard>
    </div>
  );
};
