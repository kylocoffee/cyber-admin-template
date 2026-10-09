import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { KitchenTicket } from '../../types';
import {
  CreditCard,
  DollarSign,
  Receipt,
  CheckCircle2,
  Printer,
  QrCode,
  ArrowRight,
  ShieldCheck,
  Split,
  Percent,
} from 'lucide-react';

export const POSCounterCheckoutPage: React.FC = () => {
  const { kitchenTickets, setKitchenTickets, addToast, setActivePage } = useTheme();

  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    kitchenTickets[0]?.id || ''
  );
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Credit Card' | 'CyberPay' | 'Split'>(
    'CyberPay'
  );
  const [cashTendered, setCashTendered] = useState<string>('50');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [lastCompletedTicket, setLastCompletedTicket] = useState<KitchenTicket | null>(null);

  const selectedTicket = kitchenTickets.find((t) => t.id === selectedTicketId) || kitchenTickets[0];

  const totalDue = selectedTicket ? selectedTicket.totalAmount : 0;
  const cashGivenNumber = parseFloat(cashTendered) || 0;
  const changeDue = Math.max(0, cashGivenNumber - totalDue);

  const handleProcessPayment = () => {
    if (!selectedTicket) return;

    if (paymentMethod === 'Cash' && cashGivenNumber < totalDue) {
      addToast({
        type: 'danger',
        title: 'Insufficient Cash Tendered',
        message: `Tendered amount ($${cashGivenNumber}) is less than total due ($${totalDue.toFixed(2)}).`,
      });
      return;
    }

    // Mark ticket completed
    setKitchenTickets((prev) =>
      prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: 'Completed' } : t))
    );

    setLastCompletedTicket(selectedTicket);
    setIsReceiptModalOpen(true);

    addToast({
      type: 'success',
      title: 'Payment Successful',
      message: `Transaction cleared for ${selectedTicket.ticketNumber}. Change: $${changeDue.toFixed(2)}.`,
    });
  };

  const printReceipt = () => {
    addToast({
      type: 'info',
      title: 'Receipt Sent to Thermal Printer',
      message: 'Printed 80mm thermal customer copy with cryptographic validation barcode.',
    });
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Counter Cashier Checkout</span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              CASHIER DESK 01
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reconcile dining tickets, accept multiple payment gateways, calculate customer change, and print tax receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('pos-customer')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/40 transition-colors cursor-pointer"
          >
            ← Back to Order POS
          </button>
        </div>
      </div>

      {/* Main Split: Ticket selector + Payment calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Ticket Selection & Line Items (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <CyberCard title="1. Select Active Table / Ticket">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {kitchenTickets.map((ticket) => {
                const isSelected = selectedTicket?.id === ticket.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400/40'
                        : 'border-slate-800 bg-[#090f18] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-slate-200">
                        {ticket.ticketNumber}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                        {ticket.tableNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 truncate">{ticket.customerName}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] text-slate-400">{ticket.status}</span>
                      <span className="font-mono font-bold text-cyan-400 text-xs">
                        ${ticket.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CyberCard>

          {/* Ticket Details & Breakdown */}
          {selectedTicket && (
            <CyberCard
              title={`2. Order Summary: ${selectedTicket.ticketNumber} (${selectedTicket.tableNumber})`}
              subtitle={`Created at ${selectedTicket.createdAt} for ${selectedTicket.customerName}`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#090f18] text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3 text-start">Item Description</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-end">Item Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
                    {selectedTicket.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 text-slate-200">
                          <div>{item.name}</div>
                          {item.notes && (
                            <span className="text-[10px] text-amber-300 italic">{item.notes}</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-end font-mono text-cyan-400">
                          ${(item.quantity * (selectedTicket.totalAmount / selectedTicket.items.reduce((s, i) => s + i.quantity, 0))).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CyberCard>
          )}
        </div>

        {/* Right Column: Payment Methods & Tendering */}
        <div className="space-y-4">
          <CyberCard title="3. Payment Method & Tendering">
            {/* Payment Method Switcher */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { id: 'CyberPay', label: 'CyberPay (NFC)', icon: <QrCode className="w-4 h-4" /> },
                { id: 'Credit Card', label: 'Card Reader', icon: <CreditCard className="w-4 h-4" /> },
                { id: 'Cash', label: 'Cash Currency', icon: <DollarSign className="w-4 h-4" /> },
                { id: 'Split', label: 'Split Bill', icon: <Split className="w-4 h-4" /> },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 ring-1 ring-cyan-400/40'
                      : 'border-slate-800 bg-[#080d15] text-slate-400 hover:text-white'
                  }`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Cash Calculator if cash selected */}
            {paymentMethod === 'Cash' && (
              <div className="p-3 rounded-lg bg-[#080d15] border border-slate-800 mb-4 space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Cash Tendered ($)
                </span>
                <input
                  type="number"
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                  className="w-full bg-[#05080f] border border-slate-800 rounded px-3 py-2 text-base font-mono font-bold text-slate-100 focus:outline-none focus:border-cyan-400"
                />

                {/* Quick denomination pills */}
                <div className="flex items-center gap-2">
                  {[20, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setCashTendered(amt.toString())}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                    >
                      ${amt}
                    </button>
                  ))}
                  <button
                    onClick={() => setCashTendered(totalDue.toFixed(2))}
                    className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900 cursor-pointer"
                  >
                    Exact
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Change Due to Customer</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm tabular-nums">
                    ${changeDue.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Total Due Summary */}
            <div className="p-4 rounded-lg bg-[#080d15] border border-slate-800 space-y-2 mb-4">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal Net</span>
                <span className="font-mono">${(totalDue / 1.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Tax (8% Included)</span>
                <span className="font-mono">${(totalDue - totalDue / 1.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-100 pt-2 border-t border-slate-800">
                <span className="uppercase tracking-wider">Total Charge</span>
                <span className="text-xl font-mono text-cyan-400 tabular-nums">
                  ${totalDue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProcessPayment}
              disabled={!selectedTicket}
              className="w-full py-3 px-4 rounded-md bg-emerald-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-emerald-400 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:pointer-events-none"
            >
              <CheckCircle2 className="w-4 h-4" />
              Complete Transaction &amp; Print Receipt
            </button>
          </CyberCard>
        </div>
      </div>

      {/* Thermal Receipt Modal Preview */}
      {lastCompletedTicket && (
        <Modal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          title="Customer Tax Receipt (Thermal 80mm)"
          size="sm"
          footer={
            <>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
              <button
                onClick={printReceipt}
                className="px-4 py-2 text-xs font-semibold rounded-md bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Physical Receipt
              </button>
            </>
          }
        >
          {/* Authentic Thermal Receipt Simulator */}
          <div className="bg-white text-black p-6 font-mono text-xs shadow-inner rounded space-y-3 leading-relaxed">
            <div className="text-center border-b border-dashed border-gray-400 pb-3">
              <h4 className="text-sm font-bold tracking-widest uppercase">CYBER BISTRO 2026</h4>
              <p className="text-[10px] text-gray-600">STATION #01 · SECTOR 7 COMMERCIAL HUB</p>
              <p className="text-[10px] text-gray-600">TEL: +1 (555) CYBER-POS · VAT ID: CY-901824</p>
            </div>

            <div className="flex justify-between text-[11px] border-b border-dashed border-gray-400 pb-2">
              <div>
                <p>REC: {lastCompletedTicket.ticketNumber}</p>
                <p>TBL: {lastCompletedTicket.tableNumber}</p>
              </div>
              <div className="text-end">
                <p>{new Date().toLocaleDateString()}</p>
                <p>{lastCompletedTicket.createdAt}</p>
              </div>
            </div>

            <div className="space-y-1.5 py-1">
              {lastCompletedTicket.items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.quantity}x {it.name}</span>
                  <span>${(it.quantity * 12.5).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-gray-400 pt-2 space-y-1">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span>${(lastCompletedTicket.totalAmount / 1.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>TAX (8%):</span>
                <span>${(lastCompletedTicket.totalAmount - lastCompletedTicket.totalAmount / 1.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1 border-t border-gray-300">
                <span>TOTAL PAID:</span>
                <span>${lastCompletedTicket.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-700">
                <span>METHOD:</span>
                <span>{paymentMethod.toUpperCase()}</span>
              </div>
              {paymentMethod === 'Cash' && (
                <div className="flex justify-between text-[10px] text-gray-700">
                  <span>CHANGE RETURNED:</span>
                  <span>${changeDue.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="text-center pt-3 border-t border-dashed border-gray-400 space-y-1">
              <div className="tracking-widest font-bold text-lg select-none">
                ||| | |||| | || | ||| |||| |
              </div>
              <p className="text-[10px] text-gray-500">HASH: SHA256:7B8F..A902</p>
              <p className="text-[10px] font-bold">THANK YOU FOR VISITING CYBER ADMIN!</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
