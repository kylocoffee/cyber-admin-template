import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTheme();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const borderStyles = {
          success: 'border-emerald-500/50 bg-[#0d1e1c]',
          info: 'border-cyan-500/50 bg-[#0d1824]',
          warning: 'border-amber-500/50 bg-[#1f180d]',
          danger: 'border-rose-500/50 bg-[#210f13]',
        }[toast.type];

        const iconComponent = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          danger: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto cyber-corner p-4 rounded-md border shadow-xl flex items-start gap-3 transition-all transform translate-y-0 opacity-100 ${borderStyles}`}
          >
            {iconComponent}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-100">
                  {toast.title}
                </span>
                <span className="text-[10px] text-slate-400 tabular-nums">
                  {toast.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
