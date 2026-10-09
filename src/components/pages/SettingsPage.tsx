import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { AccentColor } from '../../types';
import {
  Settings,
  Palette,
  Globe,
  Shield,
  Bell,
  RotateCcw,
  Check,
  CheckCircle2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    accent,
    setAccent,
    isRtl,
    setIsRtl,
    setIsDemoResetModalOpen,
    addToast,
  } = useTheme();

  const [language, setLanguage] = useState('en');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  const accents: { id: AccentColor; name: string; color: string }[] = [
    { id: 'cyan', name: 'Neon Cyan', color: 'bg-cyan-400' },
    { id: 'emerald', name: 'Matrix Emerald', color: 'bg-emerald-400' },
    { id: 'violet', name: 'Cyber Violet', color: 'bg-purple-500' },
    { id: 'amber', name: 'Solar Amber', color: 'bg-amber-400' },
    { id: 'crimson', name: 'Laser Crimson', color: 'bg-rose-500' },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Preferences Applied',
      message: 'System settings saved to local device profile.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>System Settings &amp; Configuration</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              SYS CONFIG
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global color themes, bidirectional text layout (LTR/RTL), security protocols, and demo data resets.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance & Accent Settings */}
        <CyberCard title="1. Visual Appearance &amp; Neon Accent">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Primary Neon Theme Accent
              </label>
              <div className="grid grid-cols-5 gap-2">
                {accents.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setAccent(item.id);
                      addToast({
                        type: 'info',
                        title: 'Theme Accent Changed',
                        message: `Switched primary accent to ${item.name}.`,
                      });
                    }}
                    className={`h-11 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                      accent === item.id
                        ? 'border-white ring-2 ring-cyan-400/50 scale-105'
                        : 'border-slate-800 hover:border-slate-600'
                    } ${item.color}`}
                    title={item.name}
                  >
                    {accent === item.id && <Check className="w-4 h-4 text-black stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <label className="text-xs font-mono uppercase text-slate-400 block mb-2">
                Layout Direction (Bidirectional RTL Engine)
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#090e17] p-1.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRtl(false)}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    !isRtl
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  LTR (Standard English)
                </button>
                <button
                  type="button"
                  onClick={() => setIsRtl(true)}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    isRtl
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  RTL (Arabic / Hebrew)
                </button>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Security & Notifications */}
        <CyberCard title="2. Security, Sound &amp; Locale">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Display Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="en">English (US) - Default</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="ar">العربية (Arabic - RTL)</option>
                <option value="ja">日本語 (Japanese)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="rounded border-slate-800 accent-cyan-400 w-4 h-4 cursor-pointer"
                />
                <span>Enforce FIDO2 WebAuthn authentication for admin privileges</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundAlerts}
                  onChange={(e) => setSoundAlerts(e.target.checked)}
                  className="rounded border-slate-800 accent-cyan-400 w-4 h-4 cursor-pointer"
                />
                <span>Play audio chime for new POS kitchen order tickets</span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Apply System Preferences
              </button>
            </div>
          </div>
        </CyberCard>
      </form>

      {/* Danger Zone: Factory Reset */}
      <CyberCard title="Danger Zone: Demo State Factory Reset">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-100">
              Reset All Demo State &amp; LocalStorage
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Restores initial POS inventory stocks, order tickets, dining tables, scrum cards, and calendar records back to clean defaults.
            </p>
          </div>

          <button
            onClick={() => setIsDemoResetModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold rounded border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Data
          </button>
        </div>
      </CyberCard>
    </div>
  );
};
