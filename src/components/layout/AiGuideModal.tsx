import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Modal } from '../common/Modal';
import { Terminal, FolderTree, Code2, PlusCircle, CheckCircle2 } from 'lucide-react';

export const AiGuideModal: React.FC = () => {
  const { isAiGuideOpen, setIsAiGuideOpen } = useTheme();

  return (
    <Modal
      isOpen={isAiGuideOpen}
      onClose={() => setIsAiGuideOpen(false)}
      title="Developer & AI Assistant Project Architecture Guide"
      size="xl"
    >
      <div className="space-y-6 text-xs text-slate-300">
        {/* Intro */}
        <div className="bg-[#090e18] p-4 rounded-lg border border-cyan-500/20">
          <h4 className="text-sm font-semibold text-cyan-300 uppercase tracking-wide flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            Cyber Admin Project Guide
          </h4>
          <p className="text-slate-300 leading-relaxed">
            This guide provides human developers and AI coding assistants with an overview of project conventions, folder layout, state management, design tokens, and instructions for adding new pages.
          </p>
        </div>

        {/* Folder Structure */}
        <div>
          <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 mb-2">
            <FolderTree className="w-4 h-4 text-cyan-400" />
            1. Folder &amp; Architecture Structure
          </h5>
          <pre className="bg-[#080c14] p-3 rounded-md border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`/src
  ├── context/
  │    └── ThemeContext.tsx     # Global settings, RTL, layouts, POS data persistence
  ├── types/
  │    └── index.ts             # TypeScript definitions for POS, tasks, tables, events
  ├── data/
  │    └── initialData.ts       # 30+ plugin inventory, dummy data seeds
  ├── components/
  │    ├── common/              # CyberCard, Modal, ToastContainer, Breadcrumb
  │    ├── layout/              # Header, Sidebar, Footer, ThemeCustomizer, Modals
  │    └── pages/               # 30+ full pages (POS, UI, Forms, Tables, Charts, AI)
  ├── index.css                 # Cyber design tokens (--cyber-primary, logical props)
  ├── App.tsx                   # Main layout container & page router
  └── main.tsx                  # React 19 bootstrap entry`}
          </pre>
        </div>

        {/* Conventions */}
        <div>
          <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            2. Coding Conventions &amp; Design Tokens
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#090e18] p-3 rounded border border-slate-800">
              <span className="font-semibold text-slate-200 block mb-1">CSS Design Tokens</span>
              <ul className="space-y-1 text-slate-400">
                <li>• <code className="text-cyan-400">var(--cyber-primary)</code>: Dynamic neon accent (Cyan, Emerald, etc.)</li>
                <li>• <code className="text-cyan-400">.cyber-corner</code>: Cyberpunk tech corner notches</li>
                <li>• <code className="text-cyan-400">.tabular-nums</code>: Monospace numeric figures for all tables/KPIs</li>
                <li>• CSS logical properties: <code className="text-cyan-400">ps-*, pe-*, ms-*, me-*</code> for RTL support</li>
              </ul>
            </div>
            <div className="bg-[#090e18] p-3 rounded border border-slate-800">
              <span className="font-semibold text-slate-200 block mb-1">Data &amp; Persistence</span>
              <ul className="space-y-1 text-slate-400">
                <li>• LocalStorage keys prefix: <code className="text-cyan-400">cyber_*</code></li>
                <li>• Synchronized states: POS stock, orders, tables, tasks, records</li>
                <li>• Zero-latency client-side filters &amp; validation</li>
                <li>• Clear simulated vs production backend demarcation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Add New Page */}
        <div>
          <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2 mb-2">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            3. How to Add a New Page / Module
          </h5>
          <div className="space-y-2 bg-[#090e18] p-3.5 rounded border border-slate-800">
            <div className="flex items-start gap-2">
              <span className="bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-[10px]">Step 1</span>
              <p>Create your component in <code className="text-slate-200">src/components/pages/YourNewPage.tsx</code> using <code className="text-slate-200">&lt;CyberCard&gt;</code>.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-[10px]">Step 2</span>
              <p>Add the page key to the sidebar menu in <code className="text-slate-200">src/components/layout/Sidebar.tsx</code> under the relevant navigation group.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-[10px]">Step 3</span>
              <p>Register the page renderer in <code className="text-slate-200">src/App.tsx</code> in the switch statement for <code className="text-slate-200">activePage</code>.</p>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="bg-[#0a141c] p-3 rounded-lg border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200 font-medium">Ready for AI Coding Assistant &amp; Human Collaboration</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">100% Modular</span>
        </div>
      </div>
    </Modal>
  );
};
