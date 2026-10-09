import React from 'react';
import { CyberCard } from '../common/CyberCard';

export const TablesElementsPage: React.FC = () => {
  const sampleRows = [
    { id: '101', name: 'Astra Protocol Gateway', status: 'Active', latency: '12ms', load: '32%' },
    { id: '102', name: 'Zero-Trust Bastion Node', status: 'Active', latency: '18ms', load: '45%' },
    { id: '103', name: 'Redis Cache Replicator', status: 'Idle', latency: '4ms', load: '14%' },
    { id: '104', name: 'Edge Telemetry Collector', status: 'Suspended', latency: '190ms', load: '89%' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Table Styles &amp; Data Grids</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              TABLE CORE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compact high-density tabular layouts with striped alternating rows, hover highlights, and cyber borders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Striped Table */}
        <CyberCard title="1. Striped Alternating Table">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-[#080d16] text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-2.5 text-start">ID</th>
                  <th className="p-2.5 text-start">Microservice</th>
                  <th className="p-2.5 text-center">Status</th>
                  <th className="p-2.5 text-end">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {sampleRows.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? 'bg-[#0b111c]' : 'bg-[#0f1724]'}>
                    <td className="p-2.5 font-mono text-cyan-300">{r.id}</td>
                    <td className="p-2.5 font-medium text-slate-200">{r.name}</td>
                    <td className="p-2.5 text-center font-mono text-[10px] text-emerald-400">{r.status}</td>
                    <td className="p-2.5 text-end font-mono tabular-nums text-slate-400">{r.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CyberCard>

        {/* Hoverable Dark Table */}
        <CyberCard title="2. Hoverable Dark Grid (High Density)">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-[#080d16] text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-2.5 text-start">ID</th>
                  <th className="p-2.5 text-start">Cluster Unit</th>
                  <th className="p-2.5 text-center">Load Quota</th>
                  <th className="p-2.5 text-end">Ping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
                {sampleRows.map((r) => (
                  <tr key={r.id} className="hover:bg-cyan-950/30 transition-colors cursor-pointer">
                    <td className="p-2.5 font-mono text-cyan-300">{r.id}</td>
                    <td className="p-2.5 font-medium text-slate-200">{r.name}</td>
                    <td className="p-2.5 text-center font-mono text-slate-300">{r.load}</td>
                    <td className="p-2.5 text-end font-mono tabular-nums text-slate-400">{r.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
