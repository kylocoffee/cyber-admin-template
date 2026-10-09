import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { POSProduct } from '../../types';
import {
  Package,
  Search,
  Plus,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  CheckCircle2,
} from 'lucide-react';

export const POSStockManagementPage: React.FC = () => {
  const { posProducts, setPosProducts, addToast, setActivePage } = useTheme();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<POSProduct | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(20);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);

  const categories = ['All', 'Mainframe Meals', 'Cyber Bites', 'Synth Drinks', 'Desserts'];

  const filtered = posProducts.filter((p) => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenRestock = (product: POSProduct) => {
    setSelectedProduct(product);
    setRestockAmount(25);
    setIsRestockModalOpen(true);
  };

  const confirmRestock = () => {
    if (!selectedProduct) return;

    setPosProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id ? { ...p, stock: p.stock + restockAmount } : p
      )
    );

    addToast({
      type: 'success',
      title: 'Inventory Restocked',
      message: `Added ${restockAmount} units to ${selectedProduct.name}. Total stock: ${selectedProduct.stock + restockAmount}.`,
    });

    setIsRestockModalOpen(false);
  };

  const totalInventoryValue = posProducts.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStockCount = posProducts.filter((p) => p.stock < 25 && p.stock > 0).length;
  const outOfStockCount = posProducts.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>POS Stock &amp; Inventory Management</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              WAREHOUSE SYNC
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track ingredients, food portions, minimum safety thresholds, and replenishment pipelines synchronized with POS terminals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('pos-customer')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Open POS Terminal
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Total Inventory Value
          </span>
          <div className="text-2xl font-bold text-slate-100 tabular-nums">
            ${totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across {posProducts.length} tracked catalog items
          </span>
        </CyberCard>

        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Low Stock Alerts
          </span>
          <div className="text-2xl font-bold text-amber-400 tabular-nums">
            {lowStockCount} <span className="text-sm font-normal text-slate-400">Items below threshold</span>
          </div>
          <span className="text-[11px] text-amber-500/80 mt-1 block">
            Threshold set to &lt;25 units
          </span>
        </CyberCard>

        <CyberCard corner className="p-0">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            Depleted / Out of Stock
          </span>
          <div className="text-2xl font-bold text-rose-400 tabular-nums">
            {outOfStockCount} <span className="text-sm font-normal text-slate-400">Depleted items</span>
          </div>
          <span className="text-[11px] text-rose-400/80 mt-1 block">
            Blocked from POS ordering
          </span>
        </CyberCard>
      </div>

      {/* Table Card */}
      <CyberCard title="Stock Catalog &amp; Restock Terminal">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === c
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by SKU or item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded-md ps-9 pe-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Stock Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#090f18] text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3 text-start">SKU</th>
                <th className="py-2.5 px-3 text-start">Product Item</th>
                <th className="py-2.5 px-3 text-start">Category</th>
                <th className="py-2.5 px-3 text-end">Cost</th>
                <th className="py-2.5 px-3 text-end">Price</th>
                <th className="py-2.5 px-3 text-center">Remaining Stock</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#0c121d]">
              {filtered.map((item) => {
                const margin = (((item.price - item.cost) / item.price) * 100).toFixed(0);

                let statusBadge = (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/30 bg-emerald-950/60 text-emerald-400">
                    In Stock
                  </span>
                );

                if (item.stock === 0) {
                  statusBadge = (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-rose-500/30 bg-rose-950/60 text-rose-400">
                      Depleted
                    </span>
                  );
                } else if (item.stock < 25) {
                  statusBadge = (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-amber-500/30 bg-amber-950/60 text-amber-400">
                      Low Stock
                    </span>
                  );
                }

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-cyan-300 font-semibold">
                      {item.sku}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-200 flex items-center gap-2">
                        <span>{item.image}</span>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                      {item.category}
                    </td>
                    <td className="py-2.5 px-3 text-end font-mono text-slate-400 tabular-nums">
                      ${item.cost.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-end font-mono text-slate-200 font-semibold tabular-nums">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-200 tabular-nums">
                      {item.stock} units
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {statusBadge}
                    </td>
                    <td className="py-2.5 px-3 text-end">
                      <button
                        onClick={() => handleOpenRestock(item)}
                        className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/50 transition-colors cursor-pointer"
                      >
                        + Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CyberCard>

      {/* Restock Modal */}
      {selectedProduct && (
        <Modal
          isOpen={isRestockModalOpen}
          onClose={() => setIsRestockModalOpen(false)}
          title={`Restock Warehouse: ${selectedProduct.name}`}
          size="sm"
          footer={
            <>
              <button
                onClick={() => setIsRestockModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmRestock}
                className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Confirm Stock Addition
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded bg-[#090f19] border border-slate-800">
              <span className="text-3xl">{selectedProduct.image}</span>
              <div>
                <p className="font-semibold text-slate-200">{selectedProduct.name}</p>
                <p className="text-[11px] text-slate-400 font-mono">Current Stock: {selectedProduct.stock} units</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5">
                Replenishment Quantity (Units)
              </label>
              <input
                type="number"
                min="1"
                value={restockAmount}
                onChange={(e) => setRestockAmount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-2 text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>New Stock Level After Update:</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {selectedProduct.stock + restockAmount} units
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
