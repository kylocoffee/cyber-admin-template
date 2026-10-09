import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Maximize2,
  Trash2,
} from 'lucide-react';

export const UIModalNotificationsPage: React.FC = () => {
  const { addToast } = useTheme();

  const [activeModalSize, setActiveModalSize] = useState<'sm' | 'md' | 'lg' | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Modals &amp; Live Toast Notifications</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              DIALOG ENGINE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Accessible dialog overlays with Escape key support, background scrims, and real-time stackable cyber toast alerts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Modal Dialog Triggers */}
        <CyberCard title="1. Accessible Cyber Modals">
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            All modals support ESC keyboard dismissal, background backdrop clicks, focus trapping, and cyber corner notch styling.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveModalSize('sm')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
            >
              Small Modal (480px)
            </button>
            <button
              onClick={() => setActiveModalSize('md')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
            >
              Medium Modal (640px)
            </button>
            <button
              onClick={() => setActiveModalSize('lg')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
            >
              Large Modal (800px)
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors cursor-pointer"
            >
              Destructive Confirm
            </button>
          </div>
        </CyberCard>

        {/* Live Toast Notifications Dispatcher */}
        <CyberCard title="2. Real-time Toast Notifications">
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Stackable corner alerts that auto-dismiss after 4 seconds with manual dismiss X button.
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() =>
                addToast({
                  type: 'success',
                  title: 'Order Completed',
                  message: 'Kitchen ticket ORD-104 has been marked as served.',
                })
              }
              className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/50 transition-colors cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Trigger Success Toast
            </button>

            <button
              onClick={() =>
                addToast({
                  type: 'info',
                  title: 'Database Synced',
                  message: 'Edge nodes replicated latest ledger entries.',
                })
              }
              className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-900/50 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              Trigger Info Toast
            </button>

            <button
              onClick={() =>
                addToast({
                  type: 'warning',
                  title: 'Low Stock Threshold',
                  message: 'Mainframe Meals inventory is under 20% quota.',
                })
              }
              className="p-2.5 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-900/50 transition-colors cursor-pointer flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Trigger Warning Toast
            </button>

            <button
              onClick={() =>
                addToast({
                  type: 'danger',
                  title: 'Payment Gateway Timeout',
                  message: 'Terminal 02 failed handshake with acquirer.',
                })
              }
              className="p-2.5 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-semibold hover:bg-rose-900/50 transition-colors cursor-pointer flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Trigger Danger Toast
            </button>
          </div>
        </CyberCard>
      </div>

      {/* Sized Modal Demo */}
      {activeModalSize && (
        <Modal
          isOpen={!!activeModalSize}
          onClose={() => setActiveModalSize(null)}
          title={`Cyber Modal (${activeModalSize.toUpperCase()} View)`}
          size={activeModalSize}
          footer={
            <>
              <button
                onClick={() => setActiveModalSize(null)}
                className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Changes Applied',
                    message: 'Modal directive saved.',
                  });
                  setActiveModalSize(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer"
              >
                Save Changes
              </button>
            </>
          }
        >
          <div className="space-y-3">
            <p className="text-slate-200">
              This modal dynamically sizes to container constraints with responsive padding and overflow scrolling.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Keyboard navigation via Escape key is permanently active. Clicking the surrounding backdrop scrim immediately dismisses this window.
            </p>
          </div>
        </Modal>
      )}

      {/* Destructive Confirm Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Destructive Action"
        size="sm"
        footer={
          <>
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                addToast({
                  type: 'danger',
                  title: 'Record Purged',
                  message: 'Simulated record was deleted permanently.',
                });
                setIsConfirmOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold rounded bg-rose-600 text-white font-bold hover:bg-rose-500 cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Yes, Purge Record
            </button>
          </>
        }
      >
        <p className="text-xs text-slate-300">
          Are you sure you want to proceed with this destructive operation? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
};
