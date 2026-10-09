import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  BarChart3,
  Mail,
  Component,
  Sparkles,
  ShoppingBag,
  Grid,
  FileText,
  PieChart,
  Layers,
  FileCode,
  Calendar,
  Kanban,
  HardDrive,
  Users,
  Settings,
  HelpCircle,
  ChevronDown,
  X,
  CreditCard,
  ChefHat,
  Receipt,
  Package,
  CalendarCheck,
  Send,
  Inbox,
  PenTool,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    isSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isStarterMode,
    kitchenTickets,
    emails,
  } = useTheme();

  // Collapsible accordion states
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    dashboards: true,
    pos: true,
    ui: false,
    forms: false,
    charts: false,
    layouts: false,
    pages: false,
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const unreadEmails = emails.filter((e) => !e.isRead).length;
  const activeTickets = kitchenTickets.filter((t) => t.status !== 'Completed').length;

  const groups: NavGroup[] = [
    {
      id: 'dashboards',
      title: 'Dashboard & Apps',
      icon: <LayoutDashboard className="w-4 h-4" />,
      items: [
        { id: 'dashboard', label: 'Dashboard Overview' },
        { id: 'analytics', label: 'Analytics & Funnels' },
        { id: 'email-inbox', label: 'Email - Inbox', badge: `${unreadEmails}` },
        { id: 'email-compose', label: 'Email - Compose' },
        { id: 'email-details', label: 'Email - Details' },
        { id: 'widgets', label: 'Cyber Widgets' },
        { id: 'ai-chat', label: 'AI - Cyber Chat', badge: 'AI' },
        { id: 'ai-image', label: 'AI - Image Generator', badge: 'AI' },
      ],
    },
    {
      id: 'pos',
      title: 'POS Suite (5 Modules)',
      icon: <ShoppingBag className="w-4 h-4 text-cyan-400" />,
      items: [
        { id: 'pos-customer', label: 'Customer Order POS' },
        { id: 'pos-kitchen', label: 'Kitchen Order (KDS)', badge: `${activeTickets}` },
        { id: 'pos-checkout', label: 'Counter Checkout' },
        { id: 'pos-stock', label: 'Stock Management' },
        { id: 'pos-tables', label: 'Table Booking Plan' },
      ],
    },
    {
      id: 'ui',
      title: 'UI Components',
      icon: <Component className="w-4 h-4" />,
      items: [
        { id: 'ui-bootstrap', label: 'Bootstrap 5.3 Ext.' },
        { id: 'ui-buttons', label: 'Cyber Buttons' },
        { id: 'ui-card', label: 'Cards & Panels' },
        { id: 'ui-icons', label: 'Icons Catalog (2k+)' },
        { id: 'ui-modals', label: 'Modals & Toasts' },
        { id: 'ui-typography', label: 'Typography & Code' },
        { id: 'ui-tabs', label: 'Tabs & Accordions' },
      ],
    },
    {
      id: 'forms',
      title: 'Forms & Tables',
      icon: <FileText className="w-4 h-4" />,
      items: [
        { id: 'forms-elements', label: 'Form Elements' },
        { id: 'forms-plugins', label: 'Form Plugins' },
        { id: 'forms-wizards', label: 'Wizards (3-Step)' },
        { id: 'tables-elements', label: 'Table Elements' },
        { id: 'tables-plugins', label: 'Data Tables (CSV Export)' },
      ],
    },
    {
      id: 'charts',
      title: 'Visualizations',
      icon: <PieChart className="w-4 h-4" />,
      items: [
        { id: 'charts-chartjs', label: 'Chart.js Analytics' },
        { id: 'charts-apexcharts', label: 'ApexCharts Spk' },
        { id: 'map-page', label: 'Cyber Node Map' },
      ],
    },
    {
      id: 'layouts',
      title: 'Layout Variations',
      icon: <Layers className="w-4 h-4" />,
      items: [
        { id: 'starter-layout', label: 'Starter Layout' },
        { id: 'layout-fixed-footer', label: 'Fixed Footer' },
        { id: 'layout-full-height', label: 'Full Height' },
        { id: 'layout-full-width', label: 'Full Width (Fluid)' },
        { id: 'layout-boxed', label: 'Boxed Layout' },
        { id: 'layout-collapsed-sidebar', label: 'Collapsed Sidebar' },
        { id: 'layout-top-nav', label: 'Top Nav Bar' },
        { id: 'layout-mixed-nav', label: 'Mixed Nav' },
        { id: 'layout-mixed-nav-boxed', label: 'Mixed Nav Boxed' },
      ],
    },
    {
      id: 'pages',
      title: 'Extended Pages',
      icon: <FileCode className="w-4 h-4" />,
      items: [
        { id: 'data-management', label: 'Data Management (CRUD)' },
        { id: 'scrum-board', label: 'Scrum Kanban Board' },
        { id: 'products', label: 'Products Catalog' },
        { id: 'product-details', label: 'Product Details' },
        { id: 'orders', label: 'Orders List' },
        { id: 'order-details', label: 'Order Details' },
        { id: 'file-manager', label: 'File Manager' },
        { id: 'calendar', label: 'Calendar Planner' },
        { id: 'gallery', label: 'Filterable Gallery' },
        { id: 'search-results', label: 'Search Results' },
        { id: 'pricing', label: 'Pricing Plans' },
        { id: 'profile', label: 'User Profile' },
        { id: 'settings', label: 'System Settings' },
        { id: 'helper', label: 'Helper & Tokens' },
        { id: 'coming-soon', label: 'Coming Soon' },
        { id: 'not-found', label: '404 Error Page' },
        { id: 'login', label: 'Login Screen' },
        { id: 'register', label: 'Register Screen' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 start-0 z-40 bg-[#090e17] border-e border-slate-800/80 transition-all duration-300 flex flex-col ${
          isMobileSidebarOpen
            ? 'translate-x-0 w-64'
            : isSidebarCollapsed
            ? '-translate-x-full lg:translate-x-0 lg:w-[72px]'
            : '-translate-x-full lg:translate-x-0 lg:w-64'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-[60px] border-b border-slate-800/80 px-4 flex items-center justify-between shrink-0">
          <div
            className="flex items-center gap-2 cursor-pointer overflow-hidden"
            onClick={() => setActivePage('dashboard')}
          >
            <div className="w-7 h-7 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-black text-xs font-mono shrink-0 shadow-sm shadow-cyan-500/50">
              CY
            </div>
            {(!isSidebarCollapsed || isMobileSidebarOpen) && (
              <span className="font-bold text-sm tracking-wider uppercase text-slate-100 whitespace-nowrap">
                Cyber <span className="text-cyan-400 font-normal">Admin</span>
              </span>
            )}
          </div>

          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-md lg:hidden cursor-pointer"
            aria-label="Close mobile sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {groups.map((group) => {
            const isGroupOpen = openGroups[group.id] || false;
            const hasActiveChild = group.items.some((i) => i.id === activePage);

            if (isSidebarCollapsed && !isMobileSidebarOpen) {
              return (
                <div key={group.id} className="relative group/mini py-1 text-center">
                  <button
                    onClick={() => {
                      // navigate to first child
                      setActivePage(group.items[0].id);
                    }}
                    className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                      hasActiveChild
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                    title={group.title}
                  >
                    {group.icon}
                  </button>
                </div>
              );
            }

            return (
              <div key={group.id} className="mb-2">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                    hasActiveChild
                      ? 'text-cyan-300 bg-slate-900/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {group.icon}
                    <span className="truncate">{group.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                      isGroupOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isGroupOpen && (
                  <div className="mt-1 ps-4 pe-1 space-y-0.5 border-s border-slate-800 ms-4">
                    {group.items.map((item) => {
                      const isActive = activePage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActivePage(item.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded transition-all text-start cursor-pointer ${
                            isActive
                              ? 'bg-cyan-500/15 text-cyan-300 font-semibold border-s-2 border-cyan-400 shadow-xs'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                item.badge === 'AI'
                                  ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                                  : 'bg-cyan-950 text-cyan-400'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Mini Footer Indicator */}
        {(!isSidebarCollapsed || isMobileSidebarOpen) && (
          <div className="p-3 border-t border-slate-800/80 bg-[#070b12] text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-[10px] uppercase">Bootstrap 5.3.8</span>
              <span className="font-mono text-[10px] text-cyan-400">v2.4.0 PRO</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
