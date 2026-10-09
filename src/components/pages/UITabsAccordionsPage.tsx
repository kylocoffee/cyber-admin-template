import React, { useState } from 'react';
import { CyberCard } from '../common/CyberCard';
import { ChevronDown, Terminal, Shield, Cpu } from 'lucide-react';

export const UITabsAccordionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activePill, setActivePill] = useState('day');
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Tabs &amp; Animated Accordions</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              ACCORDION V2
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Segmented tabs with glowing active borders, vertical navigation rails, and collapsible accordion groups.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Glowing Cyber Tabs */}
        <CyberCard title="1. Horizontal Glowing Cyber Tabs">
          <div className="space-y-4">
            <div className="flex border-b border-slate-800 gap-4">
              {[
                { id: 'overview', label: 'Cluster Overview', icon: <Cpu className="w-4 h-4" /> },
                { id: 'security', label: 'Zero-Trust Security', icon: <Shield className="w-4 h-4" /> },
                { id: 'terminal', label: 'Console Logs', icon: <Terminal className="w-4 h-4" /> },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === t.id
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <div className="p-4 rounded bg-[#090f19] border border-slate-800 text-xs text-slate-300 leading-relaxed min-h-24">
              {activeTab === 'overview' && (
                <p>Telemetry nodes reporting nominal load across all 12 edge points of presence.</p>
              )}
              {activeTab === 'security' && (
                <p>Zero-trust mTLS tunnel operational. All packets authenticated with Ed25519 signatures.</p>
              )}
              {activeTab === 'terminal' && (
                <p className="font-mono text-cyan-300">[INFO] Cluster 04 heartbeat received at 09:41:22 UTC.</p>
              )}
            </div>
          </div>
        </CyberCard>

        {/* Animated Accordions */}
        <CyberCard title="2. Cyber Animated Accordions">
          <div className="space-y-2">
            {[
              {
                title: 'How does POS stock synchronization prevent race conditions?',
                content:
                  'Transactions execute an atomic state update in localStorage upon kitchen dispatch and checkout clearing, ensuring inventory decreases exactly once per order ticket.',
              },
              {
                title: 'Can table bookings detect time-slot scheduling conflicts?',
                content:
                  'Yes. The table allocation algorithm validates both passenger capacity constraints and existing reservations prior to confirming bookings.',
              },
              {
                title: 'Is the RTL layout completely bidirectional?',
                content:
                  'Yes. Directional styles leverage CSS logical properties (ps, pe, start, end) and dynamically set dir="rtl" to mirror the sidebar, breadcrumbs, and tables.',
              },
            ].map((acc, idx) => (
              <div
                key={idx}
                className="rounded border border-slate-800 bg-[#090f19] overflow-hidden"
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  className="w-full p-3.5 text-xs font-semibold text-start text-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-800/40"
                >
                  <span>{acc.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 transition-transform ${
                      openAccordion === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === idx && (
                  <div className="p-3.5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 bg-[#070b13]">
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
