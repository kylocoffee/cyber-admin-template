import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Printer,
  Download,
} from 'lucide-react';

export const OrderDetailsPage: React.FC = () => {
  const { setActivePage, addToast } = useTheme();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button
          onClick={() => setActivePage('orders')}
          className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ← Back to Orders List
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              addToast({
                type: 'info',
                title: 'Print Invoice',
                message: 'Customer PDF invoice sent to print spooler.',
              });
              window.print();
            }}
            className="px-3 py-1 text-xs font-mono rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer flex items-center gap-1"
          >
            <Printer className="w-3 h-3" />
            Print Invoice
          </button>
        </div>
      </div>

      {/* Order Status Timeline */}
      <CyberCard title="Fulfillment Lifecycle Timeline: Order #CYB-8801">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-3">
          {[
            { step: '1. Order Placed', date: 'Oct 09, 10:14 AM', done: true, icon: <Package className="w-4 h-4" /> },
            { step: '2. Payment Verified', date: 'Oct 09, 10:15 AM', done: true, icon: <CheckCircle2 className="w-4 h-4" /> },
            { step: '3. Warehouse Staged', date: 'Oct 09, 11:30 AM', done: true, icon: <Package className="w-4 h-4" /> },
            { step: '4. Courier Dispatched', date: 'Oct 09, 02:00 PM', done: true, icon: <Truck className="w-4 h-4" /> },
            { step: '5. Final Delivery', date: 'Est. Oct 10', done: false, icon: <Clock className="w-4 h-4" /> },
          ].map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                s.done
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                  : 'border-slate-800 bg-[#080d15] text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{s.step}</span>
                {s.icon}
              </div>
              <p className="text-[10px] font-mono text-slate-400">{s.date}</p>
            </div>
          ))}
        </div>
      </CyberCard>

      {/* Invoice Items & Shipping Destination */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Itemized Breakdown (2 columns) */}
        <CyberCard
          title="Itemized Commercial Invoice"
          className="lg:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-[#080d16] text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-2.5 px-3 text-start">SKU / Item</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-end">Price</th>
                  <th className="py-2.5 px-3 text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
                <tr>
                  <td className="py-2.5 px-3 text-slate-200">
                    <div className="font-semibold">Cyber Deck Terminal X1</div>
                    <span className="text-[10px] font-mono text-slate-400">PRD-CYB-001</span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono">2</td>
                  <td className="py-2.5 px-3 text-end font-mono">$1,149.00</td>
                  <td className="py-2.5 px-3 text-end font-mono font-bold text-slate-100">$2,298.00</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-200">
                    <div className="font-semibold">Bioluminescent Keypad 60%</div>
                    <span className="text-[10px] font-mono text-slate-400">PRD-CYB-005</span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono">1</td>
                  <td className="py-2.5 px-3 text-end font-mono">$150.00</td>
                  <td className="py-2.5 px-3 text-end font-mono font-bold text-slate-100">$150.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 font-mono">
                <span>Subtotal</span>
                <span>$2,448.00</span>
              </div>
              <div className="flex justify-between text-slate-400 font-mono">
                <span>Tax (8%)</span>
                <span>$195.84</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-100 font-mono pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-cyan-400 tabular-nums">$2,643.84</span>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Customer & Shipping Destination (1 column) */}
        <div className="space-y-4">
          <CyberCard title="Shipping &amp; Client Address">
            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Recipient</span>
                <p className="font-bold text-slate-200">Kaelen Royce</p>
                <p className="text-slate-400 font-mono text-[11px]">kaelen@cybercore.net</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Destination</span>
                <p className="text-slate-300">Level 42, Neon Tower Alpha</p>
                <p className="text-slate-300">Sector 7 Commercial Complex</p>
                <p className="text-slate-400 font-mono text-[11px]">Singapore 018956</p>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Payment Method</span>
                <p className="font-mono text-cyan-300">CyberPay Protocol (NFC)</p>
                <p className="text-[10px] font-mono text-slate-500">TX: 0x8a92f038bc1149e2</p>
              </div>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
