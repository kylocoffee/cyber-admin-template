import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import { POSProduct } from '../../types';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ChefHat,
  Receipt,
  Search,
  Sparkles,
  CheckCircle2,
  Tag,
} from 'lucide-react';

export const POSCustomerOrderPage: React.FC = () => {
  const {
    posProducts,
    setPosProducts,
    cart,
    setCart,
    kitchenTickets,
    setKitchenTickets,
    setActivePage,
    addToast,
  } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [selectedTable, setSelectedTable] = useState<string>('T-04');
  const [customerName, setCustomerName] = useState<string>('Guest Patron');

  const categories = ['All', 'Mainframe Meals', 'Cyber Bites', 'Synth Drinks', 'Desserts'];

  const filteredProducts = posProducts.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: POSProduct) => {
    if (product.stock <= 0) {
      addToast({
        type: 'danger',
        title: 'Out of Stock',
        message: `${product.name} is currently sold out.`,
      });
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          addToast({
            type: 'warning',
            title: 'Max Stock Reached',
            message: `Cannot order more than available stock (${product.stock}).`,
          });
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1, notes: '' }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty > item.product.stock) {
              addToast({
                type: 'warning',
                title: 'Stock Limit',
                message: `Only ${item.product.stock} units available in stock.`,
              });
              return item;
            }
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof prev;
    });
  };

  const updateNotes = (productId: string, notes: string) => {
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, notes } : item))
    );
  };

  const removeCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'CYBER10') {
      setDiscountPercent(10);
      addToast({
        type: 'success',
        title: 'Coupon Applied',
        message: '10% promotional discount applied.',
      });
    } else if (discountCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
      addToast({
        type: 'success',
        title: 'VIP Discount Applied',
        message: '20% VIP discount applied.',
      });
    } else {
      addToast({
        type: 'warning',
        title: 'Invalid Coupon',
        message: 'Try code "CYBER10" or "VIP20".',
      });
    }
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;

  const handleSendToKitchen = () => {
    if (cart.length === 0) {
      addToast({
        type: 'warning',
        title: 'Empty Basket',
        message: 'Please add items to cart before dispatching to kitchen.',
      });
      return;
    }

    const newTicketId = 't-' + (100 + kitchenTickets.length + 1);
    const orderNum = 'ORD-' + (100 + kitchenTickets.length + 1);

    const newTicket = {
      id: newTicketId,
      ticketNumber: orderNum,
      tableNumber: selectedTable,
      customerName: customerName || 'Patron',
      orderType: 'Dine-In' as const,
      status: 'Received' as const,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      elapsedSeconds: 0,
      items: cart.map((c) => ({
        name: c.product.name,
        quantity: c.quantity,
        notes: c.notes || undefined,
      })),
      totalAmount: total,
    };

    setKitchenTickets((prev) => [newTicket, ...prev]);

    // Deduct stock once from catalog
    setPosProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((c) => c.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      })
    );

    addToast({
      type: 'success',
      title: 'Sent to Kitchen Display',
      message: `Ticket ${orderNum} created for ${selectedTable}. Stock inventory updated.`,
    });

    clearCart();
    setActivePage('pos-kitchen');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>POS Customer Order Terminal</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              TERMINAL #01
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tap items to build table orders, configure modifiers, and dispatch to the Kitchen Display System (KDS).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('pos-kitchen')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/40 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ChefHat className="w-3.5 h-3.5" />
            Kitchen Display
          </button>
          <button
            onClick={() => setActivePage('pos-checkout')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/40 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Receipt className="w-3.5 h-3.5" />
            Counter Checkout
          </button>
        </div>
      </div>

      {/* Main Layout Split: Catalog (left 2/3) vs Cart (right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product Catalog */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1421] p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#080d15] border border-slate-800 rounded-md ps-8 pe-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredProducts.map((prod) => {
              const inCart = cart.find((c) => c.product.id === prod.id);

              return (
                <div
                  key={prod.id}
                  onClick={() => addToCart(prod)}
                  className={`cyber-card p-4 rounded-lg border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    inCart
                      ? 'border-cyan-500/50 bg-[#121c2e]'
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-3xl">{prod.image}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {prod.stock > 0 ? `${prod.stock} in stock` : 'SOLD OUT'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                    <span className="text-sm font-bold text-cyan-400 font-mono tabular-nums">
                      ${prod.price.toFixed(2)}
                    </span>
                    <button
                      disabled={prod.stock <= 0}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Order Cart Panel */}
        <div className="space-y-4">
          <CyberCard
            title="Current Table Ticket"
            subtitle="Order modifiers and price breakdown"
            action={
              cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-400 hover:underline font-mono flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )
            }
          >
            {/* Table & Patron selector */}
            <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-slate-800">
              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Table / Zone
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="T-01">T-01 (Main Hall)</option>
                  <option value="T-02">T-02 (Main Hall)</option>
                  <option value="T-04">T-04 (Main Hall)</option>
                  <option value="T-08">T-08 (VIP Booth)</option>
                  <option value="BAR-02">BAR-02 (Cyber Bar)</option>
                  <option value="BALC-06">BALC-06 (Neon Balcony)</option>
                  <option value="TAKEAWAY">Takeaway Counter</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Patron Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#080d15] border border-slate-800 rounded p-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-30 text-cyan-400" />
                <p className="text-xs font-semibold text-slate-400">Order ticket is currently empty</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Click any food or beverage item to add.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pe-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-2.5 rounded bg-[#090f18] border border-slate-800/80 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span>{item.product.image}</span>
                        <span>{item.product.name}</span>
                      </div>
                      <span className="font-mono text-cyan-400 font-bold tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      {/* Modifier notes input */}
                      <input
                        type="text"
                        placeholder="Kitchen notes (e.g. less ice, no onions)..."
                        value={item.notes}
                        onChange={(e) => updateNotes(item.product.id, e.target.value)}
                        className="flex-1 bg-[#060a10] border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                      />

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1 bg-[#060a10] border border-slate-800 rounded px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 font-mono text-xs text-slate-200 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeCartItem(item.product.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discount Code Input */}
            {cart.length > 0 && (
              <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (CYBER10)..."
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 bg-[#080d15] border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 uppercase font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Subtotals & Taxes */}
                <div className="space-y-1.5 text-xs pt-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountPercent}%)</span>
                      <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (8% VAT)</span>
                    <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-100 pt-2 border-t border-slate-800">
                    <span className="uppercase tracking-wider">Total Due</span>
                    <span className="font-mono text-cyan-400 text-base tabular-nums">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Dispatch Buttons */}
                <div className="space-y-2 pt-3">
                  <button
                    onClick={handleSendToKitchen}
                    className="w-full py-2.5 px-3 rounded-md bg-cyan-500 text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-400 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
                  >
                    <ChefHat className="w-4 h-4" />
                    Dispatch to Kitchen Display (KDS)
                  </button>
                  <button
                    onClick={() => setActivePage('pos-checkout')}
                    className="w-full py-2 px-3 rounded-md border border-slate-700 bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Receipt className="w-4 h-4" />
                    Proceed to Cashier Checkout
                  </button>
                </div>
              </div>
            )}
          </CyberCard>
        </div>
      </div>
    </div>
  );
};
