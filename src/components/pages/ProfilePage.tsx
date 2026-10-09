import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  User,
  Shield,
  Key,
  Smartphone,
  Laptop,
  CheckCircle2,
  Clock,
  Edit,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { addToast } = useTheme();

  const [name, setName] = useState('Operator Zero');
  const [email, setEmail] = useState('admin@cyber-template.io');
  const [role, setRole] = useState('Root Administrator (Level 4)');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Profile Saved',
      message: 'Operator credentials and identity vectors updated.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Operator Identity &amp; Profile Security</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              OPERATOR CARD
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cryptographic identity keys, session device bindings, and operator activity ledger.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card (1 col) */}
        <CyberCard className="flex flex-col items-center text-center p-6 bg-[#0a0f19]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-800 border-2 border-cyan-400 flex items-center justify-center font-mono font-bold text-2xl text-black shadow-lg shadow-cyan-500/20 mb-3">
            OP
          </div>
          <h3 className="text-base font-bold text-slate-100">{name}</h3>
          <p className="text-xs text-cyan-400 font-mono mt-0.5">{role}</p>
          <span className="text-[11px] text-slate-500 font-mono mt-1">{email}</span>

          <div className="w-full mt-6 pt-6 border-t border-slate-800 space-y-2 text-xs text-slate-300 text-start">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-mono">FIDO2 Hardware Key:</span>
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Bound
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-mono">Multi-Factor Status:</span>
              <span className="text-cyan-400 font-mono font-bold">Enforced (Strict)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-mono">Session Origin:</span>
              <span className="text-slate-300 font-mono">192.0.2.14 (SG)</span>
            </div>
          </div>
        </CyberCard>

        {/* Right Column: Edit Profile Form & Sessions (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <CyberCard title="Operator Parameters">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Access Role Designation
                </label>
                <input
                  type="text"
                  disabled
                  value={role}
                  className="w-full bg-[#05080f] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </CyberCard>

          {/* Active Sessions */}
          <CyberCard title="Active Signed-in Sessions">
            <div className="space-y-2.5">
              <div className="p-3 rounded bg-[#090f19] border border-cyan-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="font-semibold text-slate-200 block">
                      Chrome 128 on macOS (Current Session)
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      IP: 192.0.2.14 · Singapore · Active now
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Online
                </span>
              </div>

              <div className="p-3 rounded bg-[#090f19] border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-slate-400" />
                  <div>
                    <span className="font-semibold text-slate-200 block">
                      Cyber Terminal Mobile on Android
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      IP: 198.51.100.8 · Tokyo · 4 hours ago
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToast({
                      type: 'info',
                      title: 'Session Revoked',
                      message: 'Remote token terminated.',
                    });
                  }}
                  className="text-xs text-rose-400 hover:underline font-mono cursor-pointer"
                >
                  Revoke
                </button>
              </div>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
