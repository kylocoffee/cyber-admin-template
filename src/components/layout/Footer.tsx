import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsPluginInventoryOpen, setIsAiGuideOpen, layoutMode } = useTheme();

  const isFixed = layoutMode === 'fixed-footer';

  return (
    <footer
      className={`h-[48px] border-t border-slate-800/80 bg-[#090e17] px-4 lg:px-6 flex items-center justify-between text-xs text-slate-400 ${
        isFixed ? 'fixed bottom-0 start-0 end-0 z-30' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-slate-300 font-semibold">Cyber Admin</span>
        <span>© 2026</span>
        <span className="hidden sm:inline">· Responsive Bootstrap 5.3 Framework</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPluginInventoryOpen(true)}
          className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>30+ Plugins</span>
        </button>

        <button
          onClick={() => setIsAiGuideOpen(true)}
          className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dev Docs</span>
        </button>
      </div>
    </footer>
  );
};
