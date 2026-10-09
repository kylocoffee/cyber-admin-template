import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  Shield,
  Truck,
  RotateCcw,
  ShoppingCart,
  Edit,
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { setActivePage, addToast } = useTheme();

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button
          onClick={() => setActivePage('products')}
          className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ← Return to Products Catalog
        </button>

        <span className="text-[11px] font-mono text-slate-400">
          SKU: PRD-CYB-001 · Hardware
        </span>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Product Media Card */}
        <CyberCard className="flex flex-col items-center justify-center py-12 text-center bg-[#0a0f19]">
          <span className="text-8xl select-none mb-4 animate-pulse">🖥️</span>
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-100">
            Cyber Deck Terminal X1
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Ruggedized cyber deck workstation equipped with dual neural co-processors and quantum encrypted local storage.
          </p>

          <div className="flex items-center gap-2 mt-4 text-xs font-mono text-amber-400">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold">4.9 / 5.0</span>
            <span className="text-slate-500">(320 verified customer reviews)</span>
          </div>
        </CyberCard>

        {/* Right: Pricing, Specs & Actions */}
        <div className="space-y-4">
          <CyberCard title="Technical Specifications">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-mono">Retail Price</span>
                <div className="text-end font-mono">
                  <span className="text-xl font-bold text-cyan-400 tabular-nums">$1,149.00</span>
                  <span className="text-xs text-slate-500 line-through ms-2">$1,299.00</span>
                </div>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-mono">Inventory Stock</span>
                <span className="text-emerald-400 font-bold font-mono">14 Units (In Stock)</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-mono">Neural Architecture</span>
                <span className="text-slate-200 font-mono">Dual Core NPU 48 TOPS</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-mono">Connectivity</span>
                <span className="text-slate-200 font-mono">Wi-Fi 7 / 10GbE / NFC Terminal</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-mono">Chassis Material</span>
                <span className="text-slate-200 font-mono">Titanium / Carbon Fiber Bezel</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 font-mono">Warranty</span>
                <span className="text-cyan-400 font-mono">3-Year Enterprise Care</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Staged for Purchase Order',
                    message: 'Terminal X1 added to dispatch manifest.',
                  });
                }}
                className="flex-1 py-2.5 px-4 rounded bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to PO Requisition
              </button>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
