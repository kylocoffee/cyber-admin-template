import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';

export const FormsElementsPage: React.FC = () => {
  const { addToast } = useTheme();

  const [sliderVal, setSliderVal] = useState(65);
  const [switchVal, setSwitchVal] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Form Submitted',
      message: 'Form inputs validated and processed.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Form Controls &amp; Input Elements</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              FORM CORE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cyberpunk styled standard inputs, floating labels, custom selects, toggles, and range sliders.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Inputs */}
        <CyberCard title="1. Text Inputs &amp; Selects">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Cluster Hostname
              </label>
              <input
                type="text"
                defaultValue="node-04.ap-southeast-1.internal"
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Access Authorization Role
              </label>
              <select className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400">
                <option>Root Administrator (L4)</option>
                <option>Security Officer (L3)</option>
                <option>POS Operations Lead (L2)</option>
                <option>Terminal Cashier (L1)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Telemetry Log Output
              </label>
              <textarea
                rows={3}
                defaultValue="SSL Handshake: verified&#10;Cipher suite: TLS_AES_256_GCM_SHA384"
                className="w-full bg-[#080d15] border border-slate-800 rounded p-2.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </CyberCard>

        {/* Toggles, Checkboxes & Sliders */}
        <CyberCard title="2. Range Sliders &amp; Switches">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 font-mono mb-1">
                <span>Bandwidth Throttle Quota</span>
                <span className="text-cyan-400 font-bold">{sliderVal}% (650 Mbps)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-800 accent-cyan-400 w-4 h-4 cursor-pointer"
                />
                <span>Enable automatic failover replication to backup availability zone</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-800 accent-cyan-400 w-4 h-4 cursor-pointer"
                />
                <span>Send SMS alert for kitchen tickets waiting longer than 15 minutes</span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                Save Form Directive
              </button>
            </div>
          </div>
        </CyberCard>
      </form>
    </div>
  );
};
