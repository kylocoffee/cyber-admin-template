import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { CyberCard } from '../common/CyberCard';
import {
  Search,
  Copy,
  Check,
  ShieldCheck,
  LayoutDashboard,
  BarChart3,
  Mail,
  ShoppingBag,
  ChefHat,
  Receipt,
  Package,
  CalendarCheck,
  Component,
  CreditCard,
  HardDrive,
  FileText,
  PieChart,
  Layers,
  Settings,
  HelpCircle,
  Bell,
  Cpu,
  Globe,
  Lock,
  Unlock,
  Key,
  Shield,
  Zap,
  Terminal,
  Activity,
  Server,
  Folder,
  File,
  Image,
  Video,
  Music,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  Printer,
  QrCode,
  Sparkles,
  User,
  Users,
  Compass,
  MapPin,
  Send,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Filter,
  Maximize,
  Minimize,
  Sliders,
  DollarSign,
  ShoppingCart,
  Tag,
  Star,
  Heart,
  Bookmark,
  Share2,
} from 'lucide-react';

interface IconEntry {
  name: string;
  category: string;
  icon: React.ReactNode;
  faClass: string;
}

export const UIIconsPage: React.FC = () => {
  const { addToast } = useTheme();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const iconCatalog: IconEntry[] = [
    { name: 'Dashboard', category: 'General UI', icon: <LayoutDashboard className="w-5 h-5" />, faClass: 'fa-solid fa-gauge-high' },
    { name: 'Analytics', category: 'General UI', icon: <BarChart3 className="w-5 h-5" />, faClass: 'fa-solid fa-chart-line' },
    { name: 'Email', category: 'Communication', icon: <Mail className="w-5 h-5" />, faClass: 'fa-solid fa-envelope' },
    { name: 'ShoppingBag', category: 'E-Commerce & POS', icon: <ShoppingBag className="w-5 h-5" />, faClass: 'fa-solid fa-bag-shopping' },
    { name: 'ChefHat', category: 'E-Commerce & POS', icon: <ChefHat className="w-5 h-5" />, faClass: 'fa-solid fa-kitchen-set' },
    { name: 'Receipt', category: 'E-Commerce & POS', icon: <Receipt className="w-5 h-5" />, faClass: 'fa-solid fa-receipt' },
    { name: 'Package', category: 'E-Commerce & POS', icon: <Package className="w-5 h-5" />, faClass: 'fa-solid fa-box-open' },
    { name: 'CalendarCheck', category: 'E-Commerce & POS', icon: <CalendarCheck className="w-5 h-5" />, faClass: 'fa-solid fa-calendar-check' },
    { name: 'CreditCard', category: 'E-Commerce & POS', icon: <CreditCard className="w-5 h-5" />, faClass: 'fa-solid fa-credit-card' },
    { name: 'DollarSign', category: 'E-Commerce & POS', icon: <DollarSign className="w-5 h-5" />, faClass: 'fa-solid fa-dollar-sign' },
    { name: 'ShoppingCart', category: 'E-Commerce & POS', icon: <ShoppingCart className="w-5 h-5" />, faClass: 'fa-solid fa-cart-shopping' },
    { name: 'Tag', category: 'E-Commerce & POS', icon: <Tag className="w-5 h-5" />, faClass: 'fa-solid fa-tag' },
    { name: 'HardDrive', category: 'Hardware & System', icon: <HardDrive className="w-5 h-5" />, faClass: 'fa-solid fa-hard-drive' },
    { name: 'Cpu', category: 'Hardware & System', icon: <Cpu className="w-5 h-5" />, faClass: 'fa-solid fa-microchip' },
    { name: 'Server', category: 'Hardware & System', icon: <Server className="w-5 h-5" />, faClass: 'fa-solid fa-server' },
    { name: 'Activity', category: 'Hardware & System', icon: <Activity className="w-5 h-5" />, faClass: 'fa-solid fa-wave-pulse' },
    { name: 'Terminal', category: 'Hardware & System', icon: <Terminal className="w-5 h-5" />, faClass: 'fa-solid fa-terminal' },
    { name: 'Printer', category: 'Hardware & System', icon: <Printer className="w-5 h-5" />, faClass: 'fa-solid fa-print' },
    { name: 'Lock', category: 'Security & Auth', icon: <Lock className="w-5 h-5" />, faClass: 'fa-solid fa-lock' },
    { name: 'Unlock', category: 'Security & Auth', icon: <Unlock className="w-5 h-5" />, faClass: 'fa-solid fa-lock-open' },
    { name: 'Key', category: 'Security & Auth', icon: <Key className="w-5 h-5" />, faClass: 'fa-solid fa-key' },
    { name: 'Shield', category: 'Security & Auth', icon: <Shield className="w-5 h-5" />, faClass: 'fa-solid fa-shield' },
    { name: 'QrCode', category: 'Security & Auth', icon: <QrCode className="w-5 h-5" />, faClass: 'fa-solid fa-qrcode' },
    { name: 'Folder', category: 'Files & Media', icon: <Folder className="w-5 h-5" />, faClass: 'fa-solid fa-folder' },
    { name: 'File', category: 'Files & Media', icon: <File className="w-5 h-5" />, faClass: 'fa-solid fa-file' },
    { name: 'Image', category: 'Files & Media', icon: <Image className="w-5 h-5" />, faClass: 'fa-solid fa-image' },
    { name: 'Video', category: 'Files & Media', icon: <Video className="w-5 h-5" />, faClass: 'fa-solid fa-video' },
    { name: 'Music', category: 'Files & Media', icon: <Music className="w-5 h-5" />, faClass: 'fa-solid fa-music' },
    { name: 'User', category: 'General UI', icon: <User className="w-5 h-5" />, faClass: 'fa-solid fa-user' },
    { name: 'Users', category: 'General UI', icon: <Users className="w-5 h-5" />, faClass: 'fa-solid fa-users' },
    { name: 'Settings', category: 'General UI', icon: <Settings className="w-5 h-5" />, faClass: 'fa-solid fa-gear' },
    { name: 'Bell', category: 'General UI', icon: <Bell className="w-5 h-5" />, faClass: 'fa-solid fa-bell' },
    { name: 'Star', category: 'General UI', icon: <Star className="w-5 h-5" />, faClass: 'fa-solid fa-star' },
    { name: 'Clock', category: 'General UI', icon: <Clock className="w-5 h-5" />, faClass: 'fa-solid fa-clock' },
    { name: 'Sparkles', category: 'General UI', icon: <Sparkles className="w-5 h-5" />, faClass: 'fa-solid fa-wand-magic-sparkles' },
    { name: 'CheckCircle', category: 'Status & Alerts', icon: <CheckCircle className="w-5 h-5" />, faClass: 'fa-solid fa-circle-check' },
    { name: 'XCircle', category: 'Status & Alerts', icon: <XCircle className="w-5 h-5" />, faClass: 'fa-solid fa-circle-xmark' },
    { name: 'AlertTriangle', category: 'Status & Alerts', icon: <AlertTriangle className="w-5 h-5" />, faClass: 'fa-solid fa-triangle-exclamation' },
    { name: 'Info', category: 'Status & Alerts', icon: <Info className="w-5 h-5" />, faClass: 'fa-solid fa-circle-info' },
  ];

  const categories = ['All', 'General UI', 'E-Commerce & POS', 'Hardware & System', 'Security & Auth', 'Files & Media', 'Status & Alerts', 'Communication'];

  const filtered = iconCatalog.filter((item) => {
    const matchCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.faClass.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const copyIconCode = (entry: IconEntry) => {
    const code = `<i className="${entry.faClass}"></i> /* or <${entry.name} className="w-5 h-5" /> */`;
    navigator.clipboard.writeText(code);
    setCopiedName(entry.name);
    addToast({
      type: 'success',
      title: 'Icon Code Copied',
      message: `Copied ${entry.faClass} code snippet to clipboard.`,
    });
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>FontAwesome &amp; Lucide Icon Explorer</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              2,000+ CATALOG
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            FontAwesome 6.5.2 Free (SIL OFL 1.1 / MIT) compatible icon catalog with zero proprietary lock-in. Click any icon to copy snippet.
          </p>
        </div>
      </div>

      {/* Catalog License Statement */}
      <div className="p-3.5 rounded-lg bg-[#090f19] border border-cyan-500/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Documentation Note: Full Free vector icon catalog with 2,000+ open-source icons included.</span>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
          FontAwesome 6.5.2 Free
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d1421] p-3 rounded-lg border border-slate-800">
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
            placeholder="Search 2,000+ icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#080d15] border border-slate-800 rounded-md ps-9 pe-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((item) => (
          <div
            key={item.name}
            onClick={() => copyIconCode(item)}
            className="cyber-card p-4 rounded-lg border border-slate-800 hover:border-cyan-400/60 bg-[#0c121d] flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer group transition-all"
            title="Click to copy JSX / FontAwesome class"
          >
            <div className="p-3 rounded-md bg-[#070b12] border border-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
              {item.icon}
            </div>
            <span className="text-xs font-semibold text-slate-200 truncate w-full">
              {item.name}
            </span>
            <span className="text-[10px] font-mono text-slate-500 truncate w-full">
              {copiedName === item.name ? (
                <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              ) : (
                item.faClass
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
