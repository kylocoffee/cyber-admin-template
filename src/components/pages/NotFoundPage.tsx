import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setActivePage } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6 space-y-5">
      <div className="relative">
        <span className="text-7xl sm:text-9xl font-black font-mono text-cyan-400/20 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl font-black font-mono text-cyan-400 tracking-widest drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            ERR_404
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-100">
          Neural Route Not Found in Memory Bank
        </h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          The requested operational resource or microservice identifier does not exist or has been relocated to another availability sector.
        </p>
      </div>

      <button
        onClick={() => setActivePage('dashboard')}
        className="px-5 py-2.5 rounded bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Command Dashboard
      </button>
    </div>
  );
};
