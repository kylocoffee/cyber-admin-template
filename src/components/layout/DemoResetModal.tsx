import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from '../common/Modal';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export const DemoResetModal: React.FC = () => {
  const { isDemoResetModalOpen, setIsDemoResetModalOpen, resetAllDemoData } = useTheme();

  return (
    <Modal
      isOpen={isDemoResetModalOpen}
      onClose={() => setIsDemoResetModalOpen(false)}
      title="Confirm Factory Demo Data Reset"
      size="sm"
      footer={
        <>
          <button
            onClick={() => setIsDemoResetModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={resetAllDemoData}
            className="px-4 py-2 text-xs font-semibold rounded-md bg-rose-600 text-white hover:bg-rose-500 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Demo Data
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3 py-2">
        <div className="p-2.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <p className="text-slate-200 text-sm font-semibold">
            Are you sure you want to restore factory demo data?
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            This will reset all modified POS orders, stock balances, table reservations, Kanban tasks, calendar events, and CRUD records in your browser's localStorage back to default values.
          </p>
        </div>
      </div>
    </Modal>
  );
};
