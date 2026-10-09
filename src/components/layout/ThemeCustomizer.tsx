import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AccentColor, LayoutMode } from '../../types';
import { X, Check, RotateCcw, Palette, Layers, BookOpen, Cpu, Globe } from 'lucide-react';

export const ThemeCustomizer: React.FC = () => {
  const {
    accent,
    setAccent,
    isRtl,
    setIsRtl,
    layoutMode,
    setLayoutMode,
    isStarterMode,
    setIsStarterMode,
    isCustomizerOpen,
    setIsCustomizerOpen,
    setIsPluginInventoryOpen,
    setIsAiGuideOpen,
    setIsDemoResetModalOpen,
  } = useTheme();

  if (!isCustomizerOpen) return null;

  const accents: { id: AccentColor; name: string; color: string; hex: string }[] = [
    { id: 'cyan', name: 'Neon Cyan', color: 'bg-cyan-400', hex: '#00f0ff' },
    { id: 'emerald', name: 'Matrix Emerald', color: 'bg-emerald-400', hex: '#10b981' },
    { id: 'violet', name: 'Cyber Violet', color: 'bg-purple-500', hex: '#a855f7' },
    { id: 'amber', name: 'Solar Amber', color: 'bg-amber-400', hex: '#f59e0b' },
    { id: 'crimson', name: 'Laser Crimson', color: 'bg-rose-500', hex: '#f43f5e' },
  ];

  const layoutModes: { id: LayoutMode; name: string; desc: string }[] = [
    { id: 'default', name: 'Standard Cyber Layout', desc: 'Full sidebar + top bar + fluid body' },
    { id: 'collapsed-sidebar', name: 'Collapsed Mini Sidebar', desc: 'Compact 72px icon sidebar' },
    { id: 'boxed', name: 'Boxed Container (1280px)', desc: 'Centered boxed container layout' },
    { id: 'fixed-footer', name: 'Fixed HUD Footer', desc: 'Pinned bottom status footer' },
    { id: 'full-height', name: 'Full Viewport Height', desc: '100vh app container with internal scroll' },
    { id: 'top-nav', name: 'Horizontal Top Navigation', desc: 'Top horizontal navigation bar' },
    { id: 'mixed-nav', name: 'Mixed Dual Navigation', desc: 'Top modules + contextual sidebar' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
      onClick={() => setIsCustomizerOpen(false)}
    >
      <div
        className="w-full max-w-sm h-full bg-[#0d1421] border-s border-cyan-500/20 shadow-2xl flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090d15]">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
              Cyber Theme Settings
            </h3>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Accent Color Palette */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Primary Neon Accent
              </span>
              <span className="text-[11px] text-cyan-400 uppercase font-mono">
                {accent}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {accents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAccent(item.id)}
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

          <hr className="border-slate-800" />

          {/* RTL / LTR Direction */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Layout Direction
                </span>
              </div>
              <span className="text-[11px] text-slate-400 uppercase font-mono">
                {isRtl ? 'RTL (Arabic)' : 'LTR (Standard)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-[#090e17] p-1.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setIsRtl(false)}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  !isRtl
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                LTR (Left to Right)
              </button>
              <button
                onClick={() => setIsRtl(true)}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  isRtl
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                RTL (Right to Left)
              </button>
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Starter vs Full Demo Switcher */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Template Version
                </span>
              </div>
              <span className="text-[11px] text-cyan-400 uppercase font-mono">
                {isStarterMode ? 'Starter' : 'Full Demo'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-[#090e17] p-1.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setIsStarterMode(false)}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  !isStarterMode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Demo (30+ Pages)
              </button>
              <button
                onClick={() => setIsStarterMode(true)}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  isStarterMode
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Starter (Clean Skeleton)
              </button>
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Layout Structure Variants */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-3">
              Layout Structure
            </span>
            <div className="space-y-2">
              {layoutModes.map((lm) => (
                <button
                  key={lm.id}
                  onClick={() => setLayoutMode(lm.id)}
                  className={`w-full text-start p-3 rounded-lg border transition-all cursor-pointer ${
                    layoutMode === lm.id
                      ? 'border-cyan-500/60 bg-cyan-950/20 text-white'
                      : 'border-slate-800/80 bg-[#090e17]/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{lm.name}</span>
                    {layoutMode === lm.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{lm.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Documentation & Diagnostics */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              Documentation & Tools
            </span>
            <button
              onClick={() => {
                setIsCustomizerOpen(false);
                setIsPluginInventoryOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#090e17] text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all cursor-pointer text-xs"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                30+ Plugin Inventory Table
              </span>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono">
                32 items
              </span>
            </button>

            <button
              onClick={() => {
                setIsCustomizerOpen(false);
                setIsAiGuideOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-slate-800 bg-[#090e17] text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all cursor-pointer text-xs"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Developer & AI Guide
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                Architecture
              </span>
            </button>
          </div>
        </div>

        {/* Footer with Reset Data */}
        <div className="p-4 border-t border-slate-800 bg-[#090d15] flex gap-2">
          <button
            onClick={() => setIsDemoResetModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-md border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Data (Factory)
          </button>
        </div>
      </div>
    </div>
  );
};
