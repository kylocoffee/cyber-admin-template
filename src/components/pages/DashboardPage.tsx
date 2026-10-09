import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw,
  ExternalLink,
  ChefHat,
  Receipt,
  Users,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { setActivePage, orders, kitchenTickets, addToast } = useTheme();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const pendingTickets = kitchenTickets.filter((t) => t.status !== 'Completed').length;

  const handleRefresh = () => {
    addToast({
      type: 'info',
      title: 'Metrics Synchronized',
      message: 'Dashboard stats updated from real-time POS and orders data.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Command Dashboard</span>
            <span className="text-[11px] font-mono font-normal text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              LIVE SYSTEM
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise telemetric overview, active POS counters, and operational ledger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="flex items-center gap-1 bg-[#090e17] p-1 rounded-md border border-slate-800 text-xs">
            {(['7d', '30d', '90d'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-mono ${
                  period === p
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-md border border-slate-800 bg-[#090e17] text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors cursor-pointer"
            title="Refresh metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Revenue */}
        <CyberCard corner className="p-0">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Monthly Revenue
            </span>
            <div className="p-2 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            $128,430<span className="text-sm text-slate-400">.50</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-emerald-400 flex items-center font-mono font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.8%
            </span>
            <span className="text-slate-500">vs previous month</span>
          </div>
        </CyberCard>

        {/* KPI 2: POS Kitchen Orders */}
        <CyberCard corner className="p-0">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Active KDS Tickets
            </span>
            <div className="p-2 rounded bg-amber-950/60 border border-amber-500/30 text-amber-400">
              <ChefHat className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            {pendingTickets} <span className="text-sm text-slate-400">In Prep</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-cyan-400 font-mono">Kitchen queue active</span>
            <button
              onClick={() => setActivePage('pos-kitchen')}
              className="ms-auto text-cyan-400 hover:underline cursor-pointer font-mono text-[11px]"
            >
              Open KDS →
            </button>
          </div>
        </CyberCard>

        {/* KPI 3: Avg Order Value */}
        <CyberCard corner className="p-0">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Average Order Value
            </span>
            <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            $44<span className="text-sm text-slate-400">.20</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-emerald-400 flex items-center font-mono font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +5.3%
            </span>
            <span className="text-slate-500">ticket basket average</span>
          </div>
        </CyberCard>

        {/* KPI 4: Node Health */}
        <CyberCard corner className="p-0">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              System Availability
            </span>
            <div className="p-2 rounded bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            99.98<span className="text-sm text-slate-400">%</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-slate-400 font-mono">6 cluster nodes operational</span>
          </div>
        </CyberCard>
      </div>

      {/* POS Quick Shortcuts Banner */}
      <div className="bg-[#0e1625] border border-cyan-500/20 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
              Integrated Cyber POS Suite Ready
            </h4>
            <p className="text-xs text-slate-400">
              Complete restaurant &amp; retail point-of-sale workflow connected to live inventory and kitchen displays.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActivePage('pos-customer')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Customer Order
          </button>
          <button
            onClick={() => setActivePage('pos-kitchen')}
            className="px-3 py-1.5 text-xs font-semibold rounded border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 transition-colors cursor-pointer"
          >
            Kitchen Display
          </button>
          <button
            onClick={() => setActivePage('pos-tables')}
            className="px-3 py-1.5 text-xs font-semibold rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            Table Layout
          </button>
        </div>
      </div>

      {/* Main Grid: Chart & System Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Section (2 columns) */}
        <CyberCard
          title="Revenue & Transaction Flow"
          subtitle="Real-time financial telemetry aggregated across terminals"
          className="lg:col-span-2"
          action={
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
              USD Currency
            </span>
          }
        >
          {/* Custom Cyber Visual SVG Graph */}
          <div className="h-64 w-full relative flex flex-col justify-end pt-4">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-700 w-full" />
              <div className="border-b border-slate-700 w-full" />
              <div className="border-b border-slate-700 w-full" />
              <div className="border-b border-slate-700 w-full" />
            </div>

            {/* SVG Chart Line */}
            <svg className="w-full h-48 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="cyberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill area */}
              <polygon
                points="0,120 40,95 80,105 130,70 180,85 230,45 280,60 330,30 380,50 430,20 500,35 500,150 0,150"
                fill="url(#cyberGrad)"
              />
              {/* Line */}
              <polyline
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,120 40,95 80,105 130,70 180,85 230,45 280,60 330,30 380,50 430,20 500,35"
              />
              {/* Nodes */}
              {[
                { cx: 40, cy: 95 },
                { cx: 130, cy: 70 },
                { cx: 230, cy: 45 },
                { cx: 330, cy: 30 },
                { cx: 430, cy: 20 },
                { cx: 500, cy: 35 },
              ].map((p, i) => (
                <circle
                  key={i}
                  cx={p.cx}
                  cy={p.cy}
                  r="4"
                  fill="#00f0ff"
                  stroke="#0a0e17"
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Bottom X-Axis labels */}
            <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
              <span>Oct 01</span>
              <span>Oct 03</span>
              <span>Oct 05</span>
              <span>Oct 07</span>
              <span>Oct 09</span>
              <span>Oct 11</span>
              <span>Oct 13</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-slate-800 text-center">
            <div>
              <span className="text-[11px] text-slate-500 uppercase block">Total Net Volume</span>
              <span className="text-sm font-bold text-slate-200 tabular-nums font-mono">$84,120</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase block">Daily Peak</span>
              <span className="text-sm font-bold text-cyan-400 tabular-nums font-mono">$6,480</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase block">Conversion Rate</span>
              <span className="text-sm font-bold text-emerald-400 tabular-nums font-mono">4.82%</span>
            </div>
          </div>
        </CyberCard>

        {/* System Activity Stream (1 column) */}
        <CyberCard
          title="Telemetry Stream"
          subtitle="Real-time operational events"
          action={
            <button
              onClick={() => setActivePage('analytics')}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              All →
            </button>
          }
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200">Table T-04 Ordered</p>
                <p className="text-[11px] text-slate-400">Order #ORD-101 sent to Kitchen Display System.</p>
                <span className="text-[10px] text-slate-500 font-mono">4 mins ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200">Counter Checkout Cleared</p>
                <p className="text-[11px] text-slate-400">Payment of $35.30 processed via CyberPay.</p>
                <span className="text-[10px] text-slate-500 font-mono">18 mins ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200">Stock Threshold Low</p>
                <p className="text-[11px] text-slate-400">Holographic Visor Elite reached 5 units limit.</p>
                <span className="text-[10px] text-slate-500 font-mono">45 mins ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200">System Backup Synced</p>
                <p className="text-[11px] text-slate-400">Automated snapshot persisted to edge replica.</p>
                <span className="text-[10px] text-slate-500 font-mono">2 hours ago</span>
              </div>
            </div>
          </div>
        </CyberCard>
      </div>

      {/* Recent Transactions Table */}
      <CyberCard
        title="Recent Order Transactions"
        subtitle="Latest customer purchases and payment status"
        action={
          <button
            onClick={() => setActivePage('orders')}
            className="text-xs text-cyan-400 hover:underline font-mono"
          >
            Manage All Orders →
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#090f18] text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3 text-start">Order ID</th>
                <th className="py-2.5 px-3 text-start">Customer</th>
                <th className="py-2.5 px-3 text-start">Date</th>
                <th className="py-2.5 px-3 text-start">Total</th>
                <th className="py-2.5 px-3 text-start">Payment</th>
                <th className="py-2.5 px-3 text-start">Status</th>
                <th className="py-2.5 px-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
              {orders.map((ord) => {
                const statusStyles = {
                  Completed: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
                  Processing: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
                  Shipped: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
                  Cancelled: 'text-rose-400 bg-rose-950/60 border-rose-500/30',
                }[ord.status];

                return (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-semibold text-cyan-300">
                      {ord.orderNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-200">{ord.customer}</div>
                      <div className="text-[11px] text-slate-500">{ord.email}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                      {ord.date}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-200 tabular-nums">
                      ${ord.total.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {ord.paymentMethod}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${statusStyles}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-end">
                      <button
                        onClick={() => setActivePage('order-details')}
                        className="px-2 py-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-colors cursor-pointer"
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
