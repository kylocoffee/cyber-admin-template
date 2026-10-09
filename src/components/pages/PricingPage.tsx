import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Check, Sparkles, Shield, Zap } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { addToast } = useTheme();
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (planName: string) => {
    addToast({
      type: 'success',
      title: 'Plan Tier Selected',
      message: `Enrolled in ${planName} (${isAnnual ? 'Annual Billing' : 'Monthly Billing'}).`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Enterprise Licensing &amp; Subscription Plans</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              PRICING MATRIX
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Predictable operational licensing with transparent resource quotas, dedicated clusters, and SLA guarantees.
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center gap-2 bg-[#090e17] p-1.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              !isAnnual
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              isAnnual
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1 */}
        <div className="cyber-card p-6 rounded-lg border border-slate-800 bg-[#0c121d] flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-bold">
              Starter Deck
            </span>
            <p className="text-xs text-slate-400 mt-1">For early-stage teams &amp; pilots</p>

            <div className="my-6">
              <span className="text-3xl font-bold font-mono text-slate-100 tabular-nums">
                ${isAnnual ? '24' : '29'}
              </span>
              <span className="text-xs text-slate-400 font-mono"> / month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Up to 2 POS Counter Terminals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Single Kitchen KDS Display</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>10,000 Transactions / Month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Community Security Updates</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Starter Deck')}
            className="w-full mt-6 py-2 px-3 text-xs font-semibold rounded border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 transition-colors cursor-pointer"
          >
            Select Starter Deck
          </button>
        </div>

        {/* Tier 2: Featured Pro */}
        <div className="cyber-card p-6 rounded-lg border border-cyan-400/80 bg-[#0f1726] shadow-xl shadow-cyan-500/10 flex flex-col justify-between relative">
          <div className="absolute -top-3 start-1/2 -translate-x-1/2 bg-cyan-400 text-black text-[10px] font-bold font-mono uppercase px-3 py-0.5 rounded-full shadow-sm">
            Most Popular Architecture
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-cyan-300 tracking-wider font-bold">
              Pro Runner
            </span>
            <p className="text-xs text-slate-400 mt-1">For scaling dining &amp; retail operations</p>

            <div className="my-6">
              <span className="text-3xl font-bold font-mono text-slate-100 tabular-nums">
                ${isAnnual ? '64' : '79'}
              </span>
              <span className="text-xs text-slate-400 font-mono"> / month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Unlimited POS Counter Terminals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Multi-station Kitchen Displays (KDS)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Unlimited Floor Table Booking</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>Automated Real-time Stock Sync</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>CSV &amp; Financial Ledger Exporter</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Pro Runner')}
            className="w-full mt-6 py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
          >
            Upgrade to Pro Runner
          </button>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="cyber-card p-6 rounded-lg border border-slate-800 bg-[#0c121d] flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400 tracking-wider font-bold">
              Enterprise Nexus
            </span>
            <p className="text-xs text-slate-400 mt-1">For mission-critical infrastructure</p>

            <div className="my-6">
              <span className="text-3xl font-bold font-mono text-slate-100 tabular-nums">
                ${isAnnual ? '160' : '199'}
              </span>
              <span className="text-xs text-slate-400 font-mono"> / month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>Dedicated Sovereign Edge Cluster</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>99.99% Guaranteed SLA Uptime</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>Zero-Trust FIDO2 Security Hardening</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-400" />
                <span>24/7 Dedicated Operations Engineer</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Enterprise Nexus')}
            className="w-full mt-6 py-2 px-3 text-xs font-semibold rounded border border-purple-500/40 text-purple-300 hover:bg-purple-500/20 transition-colors cursor-pointer"
          >
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </div>
  );
};
