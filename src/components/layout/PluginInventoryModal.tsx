import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from '../common/Modal';
import { PLUGIN_INVENTORY } from '../../data/initialData';
import { Search, Download, CheckCircle, ShieldCheck } from 'lucide-react';

export const PluginInventoryModal: React.FC = () => {
  const { isPluginInventoryOpen, setIsPluginInventoryOpen, addToast } = useTheme();
  const [search, setSearch] = useState('');

  const filtered = PLUGIN_INVENTORY.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.purpose.toLowerCase().includes(search.toLowerCase()) ||
      p.pageUsed.toLowerCase().includes(search.toLowerCase())
  );

  const exportInventoryCSV = () => {
    const header = ['Plugin Name', 'Version', 'Purpose / Functionality', 'Page / Module', 'License', 'Dependencies'];
    const rows = filtered.map((p) => [
      `"${p.name}"`,
      `"${p.version}"`,
      `"${p.purpose}"`,
      `"${p.pageUsed}"`,
      `"${p.license}"`,
      `"${p.dependencies}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cyber_admin_plugin_inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Plugin Inventory Exported',
      message: `${filtered.length} plugins catalog exported to CSV.`,
    });
  };

  return (
    <Modal
      isOpen={isPluginInventoryOpen}
      onClose={() => setIsPluginInventoryOpen(false)}
      title="30+ Plugin & Library Inventory Architecture"
      size="full"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All 32 plugins verified with zero telemetry tracking &amp; open-source licensing.</span>
          </div>
          <button
            onClick={exportInventoryCSV}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Inventory CSV
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            Official specification inventory for Cyber Bootstrap 5 Admin Template (32 verified plugins).
          </p>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter plugins, pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded-md ps-9 pe-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-lg">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#090f18] text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3 text-start">#</th>
                <th className="py-2.5 px-3 text-start">Plugin &amp; Version</th>
                <th className="py-2.5 px-3 text-start">Core Function / Purpose</th>
                <th className="py-2.5 px-3 text-start">Page / Module Used</th>
                <th className="py-2.5 px-3 text-start">License</th>
                <th className="py-2.5 px-3 text-start">Dependencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
              {filtered.map((item, idx) => (
                <tr key={item.name} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-2.5 px-3 text-slate-500 font-mono tabular-nums">
                    {(idx + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-200 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1 py-0.2 rounded">
                        v{item.version}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 max-w-xs">{item.purpose}</td>
                  <td className="py-2.5 px-3 text-cyan-400 font-mono text-[11px] whitespace-nowrap">
                    {item.pageUsed}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-400 whitespace-nowrap">
                    {item.license}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {item.dependencies}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};
