import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { Modal } from '../common/Modal';
import { ProductItem } from '../../types';
import {
  Package,
  Search,
  Plus,
  Star,
  ExternalLink,
  Edit,
  Trash2,
  Filter,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, setProducts, setActivePage, addToast } = useTheme();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product inputs
  const [sku, setSku] = useState('PRD-CYB-007');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [price, setPrice] = useState(499);
  const [stock, setStock] = useState(25);
  const [iconEmoji, setIconEmoji] = useState('⚡');

  const categories = ['All', 'Hardware', 'Wearables', 'Storage', 'Peripherals', 'POS Hardware'];

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProd: ProductItem = {
      id: 'p-' + Date.now(),
      sku: sku.trim(),
      title: title.trim(),
      category,
      price,
      stock,
      rating: 5.0,
      salesCount: 0,
      image: iconEmoji,
      status: stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock',
    };

    setProducts((prev) => [newProd, ...prev]);

    addToast({
      type: 'success',
      title: 'Product Created',
      message: `${title} added to catalog.`,
    });

    setTitle('');
    setIsAddModalOpen(false);
  };

  const deleteProduct = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Product Removed',
      message: `Deleted ${name} from inventory.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Cyber Commerce Products Catalog</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              STORE SKU
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse hardware modules, biometric accessories, cyber gear, and thermal POS peripherals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            + Add Product
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1421] p-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#080d15] border border-slate-800 rounded-md ps-9 pe-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prod) => {
          const statusBadge = {
            'In Stock': 'border-emerald-500/30 bg-emerald-950/60 text-emerald-400',
            'Low Stock': 'border-amber-500/30 bg-amber-950/60 text-amber-400',
            'Out of Stock': 'border-rose-500/30 bg-rose-950/60 text-rose-400',
          }[prod.status];

          return (
            <div
              key={prod.id}
              className="cyber-card p-4 rounded-lg border border-slate-800 hover:border-slate-700 bg-[#0c121d] flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{prod.image}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusBadge}`}>
                    {prod.status} ({prod.stock})
                  </span>
                </div>

                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  {prod.sku} · {prod.category}
                </div>

                <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mt-1">
                  {prod.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400 font-mono">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{prod.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal">({prod.salesCount} sold)</span>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-slate-100 font-mono tabular-nums">
                    ${prod.price}
                  </span>
                  {prod.salePrice && (
                    <span className="text-xs text-slate-500 line-through ms-2 font-mono tabular-nums">
                      ${prod.salePrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActivePage('product-details')}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id, prod.title)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 cursor-pointer"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Catalog Product"
        size="md"
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                SKU Identifier *
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="Hardware">Hardware</option>
                <option value="Wearables">Wearables</option>
                <option value="Storage">Storage</option>
                <option value="Peripherals">Peripherals</option>
                <option value="POS Hardware">POS Hardware</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Quantum Storage Capsule 16TB"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Price ($)
              </label>
              <input
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Stock Count
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                Emoji Icon
              </label>
              <input
                type="text"
                value={iconEmoji}
                onChange={(e) => setIconEmoji(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 text-center focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer"
            >
              Save Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
