import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Cpu,
  HardDrive,
  Activity,
  ShieldCheck,
  Zap,
  Server,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export const WidgetsPage: React.FC = () => {
  const { addToast } = useTheme();

  const [toggles, setToggles] = useState({
    autoPrintReceipts: true,
    zeroTrustAuth: true,
    maintenanceMode: false,
    debugTelemetry: false,
  });

  const toggleSwitch = (key: keyof typeof toggles) => {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      addToast({
        type: 'info',
        title: 'System Flag Toggled',
        message: `${key} set to ${next[key] ? 'ENABLED' : 'DISABLED'}.`,
      });
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Modular Widgets</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              HUD PACK
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Stand-alone telemetric components and interactive operational control blocks for custom dashboard compositions.
          </p>
        </div>
      </div>

      {/* Grid Row 1: System Hardware Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU Load Widget */}
        <CyberCard title="CPU Core Frequency" subtitle="Cluster 01 - AMD EPYC 9654">
          <div className="flex items-center justify-between my-2">
            <div>
              <span className="text-3xl font-bold font-mono text-cyan-400 tabular-nums">
                42<span className="text-lg text-slate-400">%</span>
              </span>
              <p className="text-[11px] text-slate-400 mt-1">128 Cores · 3.70 GHz Turbo</p>
            </div>
            {/* Circular Progress Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="#1e293b" strokeWidth="5" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#00f0ff"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="163"
                  strokeDashoffset="94"
                  strokeLinecap="round"
                />
              </svg>
              <Cpu className="w-5 h-5 absolute text-cyan-400" />
            </div>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-cyan-400 h-full w-[42%]" />
          </div>
        </CyberCard>

        {/* Memory Load Widget */}
        <CyberCard title="DDR5 ECC Memory" subtitle="Cluster 01 - 512 GB Total">
          <div className="flex items-center justify-between my-2">
            <div>
              <span className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                68<span className="text-lg text-slate-400">%</span>
              </span>
              <p className="text-[11px] text-slate-400 mt-1">348 GB Used · 164 GB Free</p>
            </div>
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="#1e293b" strokeWidth="5" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#10b981"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="163"
                  strokeDashoffset="52"
                  strokeLinecap="round"
                />
              </svg>
              <Activity className="w-5 h-5 absolute text-emerald-400" />
            </div>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-emerald-400 h-full w-[68%]" />
          </div>
        </CyberCard>

        {/* NVMe Storage Widget */}
        <CyberCard title="NVMe RAID 10 Array" subtitle="Ultra PCIe Gen5 · 14.4 GB/s">
          <div className="flex items-center justify-between my-2">
            <div>
              <span className="text-3xl font-bold font-mono text-purple-400 tabular-nums">
                54<span className="text-lg text-slate-400">%</span>
              </span>
              <p className="text-[11px] text-slate-400 mt-1">8.6 TB of 16.0 TB Used</p>
            </div>
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="#1e293b" strokeWidth="5" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#a855f7"
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray="163"
                  strokeDashoffset="75"
                  strokeLinecap="round"
                />
              </svg>
              <HardDrive className="w-5 h-5 absolute text-purple-400" />
            </div>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-purple-400 h-full w-[54%]" />
          </div>
        </CyberCard>
      </div>

      {/* Grid Row 2: Operational Toggles & Status Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CyberCard title="System Feature Flags &amp; Triggers">
          <div className="space-y-3">
            {[
              { key: 'autoPrintReceipts' as const, label: 'POS Auto-Print Customer Receipt', desc: 'Dispatches thermal print job upon checkout approval.' },
              { key: 'zeroTrustAuth' as const, label: 'Enforce Zero-Trust Biometrics', desc: 'Requires FIDO2 WebAuthn keys for administrator sessions.' },
              { key: 'maintenanceMode' as const, label: 'Activate Read-Only Maintenance', desc: 'Halts write operations on POS queues for database compaction.' },
              { key: 'debugTelemetry' as const, label: 'Verbose Cyber Telemetry Logging', desc: 'Streams detailed microservice logs to central collector.' },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded bg-[#090f18] border border-slate-800"
              >
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">{item.label}</span>
                  <span className="text-[11px] text-slate-400">{item.desc}</span>
                </div>
                <button
                  onClick={() => toggleSwitch(item.key)}
                  className="cursor-pointer text-slate-400 hover:text-white transition-colors"
                >
                  {toggles[item.key] ? (
                    <ToggleRight className="w-7 h-7 text-cyan-400" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-slate-600" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </CyberCard>

        <CyberCard title="Network Edge Nodes &amp; Latency">
          <div className="space-y-3">
            {[
              { region: 'Singapore (Asia-SE1)', ip: '192.0.2.14', ping: '12ms', status: 'Nominal' },
              { region: 'Tokyo (Asia-NE1)', ip: '198.51.100.8', ping: '28ms', status: 'Nominal' },
              { region: 'Frankfurt (Europe-West3)', ip: '203.0.113.91', ping: '114ms', status: 'Nominal' },
              { region: 'N. Virginia (US-East4)', ip: '198.18.0.4', ping: '182ms', status: 'Nominal' },
            ].map((node, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded bg-[#090f18] border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div>
                    <span className="font-semibold text-slate-200 block">{node.region}</span>
                    <span className="font-mono text-[11px] text-slate-500">{node.ip}</span>
                  </div>
                </div>
                <div className="text-end font-mono">
                  <span className="text-cyan-400 font-bold block">{node.ping}</span>
                  <span className="text-[10px] text-emerald-400">{node.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CyberCard>
      </div>
    </div>
  );
};
