import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Search, Eye, Filter, Download } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, setActivePage, addToast } = useTheme();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Completed', 'Processing', 'Shipped', 'Cancelled'];

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Orders &amp; Invoices Ledger</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              COMMERCE ORDERS
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reconcile client purchases, order delivery statuses, payment gateways, and tax statements.
          </p>
        </div>
      </div>

      <CyberCard title={`Customer Orders (${filtered.length})`}>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded ps-8 pe-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#080d16] text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-2.5 px-3 text-start">Order Number</th>
                <th className="py-2.5 px-3 text-start">Customer Details</th>
                <th className="py-2.5 px-3 text-start">Date</th>
                <th className="py-2.5 px-3 text-center">Items</th>
                <th className="py-2.5 px-3 text-start">Payment Method</th>
                <th className="py-2.5 px-3 text-end">Total Amount</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
              {filtered.map((ord) => {
                const statusBadge = {
                  Completed: 'border-emerald-500/30 bg-emerald-950/60 text-emerald-400',
                  Processing: 'border-amber-500/30 bg-amber-950/60 text-amber-400',
                  Shipped: 'border-cyan-500/30 bg-cyan-950/60 text-cyan-400',
                  Cancelled: 'border-rose-500/30 bg-rose-950/60 text-rose-400',
                }[ord.status];

                return (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-300">
                      {ord.orderNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-200">{ord.customer}</div>
                      <div className="text-[11px] text-slate-500">{ord.email}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                      {ord.date}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                      {ord.itemsCount}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {ord.paymentMethod}
                    </td>
                    <td className="py-2.5 px-3 text-end font-mono font-bold text-slate-100 tabular-nums">
                      ${ord.total.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${statusBadge}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-end">
                      <button
                        onClick={() => setActivePage('order-details')}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/40 transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CyberCard>
    </div>
  );
};
