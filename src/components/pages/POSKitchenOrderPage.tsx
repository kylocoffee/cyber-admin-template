import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { KitchenTicket } from '../../types';
import {
  ChefHat,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const POSKitchenOrderPage: React.FC = () => {
  const { kitchenTickets, setKitchenTickets, setActivePage, addToast } = useTheme();
  const [filter, setFilter] = useState<'all' | 'Received' | 'Cooking' | 'Ready' | 'Completed'>('all');
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Increment simulated ticket seconds every 3 seconds for live HUD feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
      setKitchenTickets((prev) =>
        prev.map((t) =>
          t.status !== 'Completed' ? { ...t, elapsedSeconds: t.elapsedSeconds + 3 } : t
        )
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [setKitchenTickets]);

  const updateTicketStatus = (ticketId: string, newStatus: KitchenTicket['status']) => {
    setKitchenTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );

    addToast({
      type: newStatus === 'Completed' ? 'success' : 'info',
      title: `Order Status: ${newStatus}`,
      message: `Ticket updated to ${newStatus}.`,
    });
  };

  const filteredTickets = kitchenTickets.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const formatElapsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Kitchen Display System (KDS)</span>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
              KITCHEN HUD
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time culinary ticket queue with elapsed preparation timers and live kitchen line status dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status filter tabs */}
          <div className="flex items-center gap-1 bg-[#090e17] p-1 rounded-md border border-slate-800 text-xs overflow-x-auto">
            {(['all', 'Received', 'Cooking', 'Ready', 'Completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded transition-colors cursor-pointer font-mono whitespace-nowrap ${
                  filter === tab
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActivePage('pos-customer')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/40 transition-colors cursor-pointer font-mono whitespace-nowrap"
          >
            + New Order
          </button>
        </div>
      </div>

      {/* Ticket Cards Grid */}
      {filteredTickets.length === 0 ? (
        <div className="cyber-card p-12 text-center rounded-lg border border-slate-800">
          <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-30 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
            No Tickets in this Queue
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Orders dispatched from the Customer Order POS will appear here instantly.
          </p>
          <button
            onClick={() => setActivePage('pos-customer')}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Open POS Terminal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTickets.map((ticket) => {
            const isLate = ticket.elapsedSeconds > 600 && ticket.status !== 'Completed';

            const statusColors = {
              Received: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
              Cooking: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
              Ready: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
              Completed: 'border-slate-800 bg-slate-900/40 text-slate-500',
            }[ticket.status];

            return (
              <div
                key={ticket.id}
                className={`cyber-card rounded-lg border flex flex-col justify-between transition-all ${
                  ticket.status === 'Completed'
                    ? 'border-slate-800/80 opacity-60'
                    : isLate
                    ? 'border-rose-500/60 bg-[#170e13]'
                    : 'border-slate-700 bg-[#0d1421]'
                }`}
              >
                {/* Ticket Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#080d16]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-100">
                        {ticket.ticketNumber}
                      </span>
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                        {ticket.tableNumber}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {ticket.customerName} · {ticket.orderType}
                    </p>
                  </div>

                  <div className="text-end">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${statusColors}`}>
                      {ticket.status}
                    </span>
                    <div
                      className={`flex items-center gap-1 text-[11px] font-mono mt-1 ${
                        isLate ? 'text-rose-400 font-bold animate-pulse' : 'text-slate-400'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{formatElapsed(ticket.elapsedSeconds)}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Items */}
                <div className="p-4 flex-1 space-y-2 text-xs">
                  {ticket.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-[#090f19] border border-slate-800/60 flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 font-mono font-bold flex items-center justify-center text-[11px]">
                            {item.quantity}x
                          </span>
                          <span className="font-semibold text-slate-200">
                            {item.name}
                          </span>
                        </div>
                        {item.notes && (
                          <p className="text-[11px] text-amber-300 ms-7 mt-0.5 italic">
                            ★ Note: {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ticket Footer Action Buttons */}
                <div className="p-3 border-t border-slate-800 bg-[#080d16] flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-400 tabular-nums">
                    Total: <strong className="text-slate-200">${ticket.totalAmount.toFixed(2)}</strong>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {ticket.status === 'Received' && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'Cooking')}
                        className="px-3 py-1.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Play className="w-3 h-3" />
                        Start Cooking
                      </button>
                    )}

                    {ticket.status === 'Cooking' && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'Ready')}
                        className="px-3 py-1.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Mark Ready
                      </button>
                    )}

                    {ticket.status === 'Ready' && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'Completed')}
                        className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Complete Order
                      </button>
                    )}

                    {ticket.status === 'Completed' && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, 'Received')}
                        className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
