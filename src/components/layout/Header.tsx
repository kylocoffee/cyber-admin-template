import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu,
  Bell,
  Search,
  Globe,
  Palette,
  Terminal,
  Cpu,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Layers,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isRtl,
    setIsRtl,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    setIsCustomizerOpen,
    setIsPluginInventoryOpen,
    activePage,
    setActivePage,
    isStarterMode,
    setIsStarterMode,
    addToast,
  } = useTheme();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('search-results');
      addToast({
        type: 'info',
        title: 'Search Query Executed',
        message: `Showing results for "${searchQuery.trim()}".`,
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 h-[60px] bg-[#0c121d]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Zone 1: Mobile Toggle & Brand / Breadcrumb */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsMobileSidebarOpen(!isMobileSidebarOpen);
            } else {
              setIsSidebarCollapsed((prev) => !prev);
            }
          }}
          className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5 text-cyan-400" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActivePage('dashboard')}>
            <div className="w-7 h-7 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-black text-xs font-mono shadow-sm shadow-cyan-500/50">
              CY
            </div>
            <span className="font-bold text-sm tracking-wider uppercase text-slate-100 hidden sm:inline whitespace-nowrap">
              Cyber <span className="text-cyan-400 font-normal">Admin</span>
            </span>
          </div>

          <span className="text-slate-600 hidden md:inline">/</span>

          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider hidden md:inline whitespace-nowrap">
            {activePage.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Zone 2: Quick Search & Status Telemetry */}
      <div className="flex-1 max-w-md hidden sm:block">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search commands, pages, POS items (Press Enter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#080d15] border border-slate-800 rounded-md ps-9 pe-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all font-mono"
          />
        </form>
      </div>

      {/* Zone 3: Actions & Quick Customizer */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Starter vs Full Demo badge switch */}
        <button
          onClick={() => setIsStarterMode(!isStarterMode)}
          className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
            isStarterMode
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
          }`}
          title="Toggle Starter Template Skeleton vs Full Demo"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isStarterMode ? 'Starter' : 'Full Demo'}</span>
        </button>

        {/* RTL Toggle Quick Button */}
        <button
          onClick={() => setIsRtl(!isRtl)}
          className="p-2 text-slate-400 hover:text-cyan-400 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          title={`Switch to ${isRtl ? 'LTR' : 'RTL'}`}
          aria-label="Toggle text direction"
        >
          <Globe className="w-4 h-4" />
        </button>

        {/* 30+ Plugin Inventory Shortcut */}
        <button
          onClick={() => setIsPluginInventoryOpen(true)}
          className="p-2 text-slate-400 hover:text-cyan-400 rounded-md hover:bg-slate-800 transition-colors cursor-pointer hidden md:flex"
          title="30+ Plugin Inventory Catalog"
          aria-label="Open plugin inventory"
        >
          <Cpu className="w-4 h-4" />
        </button>

        {/* Theme Settings Trigger */}
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-2 text-slate-400 hover:text-cyan-400 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
          title="Theme Customizer"
          aria-label="Open theme customizer"
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-slate-400 hover:text-cyan-400 rounded-md hover:bg-slate-800 transition-colors relative cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#0c121d]" />
          </button>

          {isNotificationsOpen && (
            <div
              className="absolute end-0 mt-2 w-80 cyber-card cyber-corner rounded-md shadow-2xl border border-slate-700 bg-[#0c131f] text-slate-200 z-50 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Cyber Notifications
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded">
                  3 unread
                </span>
              </div>
              <div className="divide-y divide-slate-800/80 max-h-64 overflow-y-auto">
                <div
                  className="p-3 hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => {
                    setActivePage('pos-kitchen');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <p className="text-xs font-semibold text-slate-200">New POS Kitchen Ticket</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Order ORD-102 (Table T-08) received for preparation.</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">2 mins ago</span>
                </div>
                <div
                  className="p-3 hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => {
                    setActivePage('email-inbox');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <p className="text-xs font-semibold text-slate-200">Firmware Verified on Node 04</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Satoshi Nexus Labs completed cluster audit.</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">15 mins ago</span>
                </div>
                <div
                  className="p-3 hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => {
                    setActivePage('pos-tables');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <p className="text-xs font-semibold text-slate-200">VIP Table Reservation</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dr. Aris Thorne booked VIP Booth #12 for 8 guests.</p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">1 hour ago</span>
                </div>
              </div>
              <div className="p-2 border-t border-slate-800 text-center">
                <button
                  onClick={() => {
                    setActivePage('notifications');
                    setIsNotificationsOpen(false);
                  }}
                  className="text-xs text-cyan-400 hover:underline font-mono"
                >
                  View All Notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-slate-700 to-cyan-800 border border-cyan-500/40 flex items-center justify-center font-bold text-xs text-cyan-300 font-mono">
              OP
            </div>
            <div className="hidden lg:block text-start">
              <span className="text-xs font-bold text-slate-200 block leading-tight">Operator Zero</span>
              <span className="text-[10px] text-cyan-400 font-mono block leading-tight">Root Admin</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {isProfileOpen && (
            <div
              className="absolute end-0 mt-2 w-56 cyber-card cyber-corner rounded-md shadow-2xl border border-slate-700 bg-[#0c131f] text-slate-200 z-50 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 border-b border-slate-800">
                <p className="text-xs font-bold text-slate-100">Operator Zero</p>
                <p className="text-[11px] text-slate-400 font-mono">admin@cyber-template.io</p>
              </div>
              <div className="p-1 text-xs">
                <button
                  onClick={() => {
                    setActivePage('profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-start"
                >
                  <User className="w-4 h-4 text-cyan-400" />
                  Operator Profile
                </button>
                <button
                  onClick={() => {
                    setActivePage('settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-start"
                >
                  <Shield className="w-4 h-4 text-cyan-400" />
                  Security &amp; Settings
                </button>
                <button
                  onClick={() => {
                    setActivePage('helper');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-start"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Helper Utilities
                </button>
              </div>
              <div className="p-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setActivePage('login');
                    setIsProfileOpen(false);
                    addToast({
                      type: 'info',
                      title: 'Session Terminated',
                      message: 'Logged out. Switched to frontend simulated login.',
                    });
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer text-start text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Simulate Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
