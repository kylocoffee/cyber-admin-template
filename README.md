# Cyber Admin - Futuristic Bootstrap 5 Admin Template & POS Suite

> A production-grade, futuristic dark-mode admin template and complete Point-of-Sale (POS) suite inspired by *Cyber – Bootstrap 5 Admin Template*. Built with React 19, Vite, Tailwind CSS design tokens, Chart.js, and comprehensive modular components.

---

## 1. Quick Start & Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Development
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 2. Architecture & Design Tokens

### CSS Variables (`src/index.css`)
```css
:root {
  --cyber-font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --cyber-font-mono: 'JetBrains Mono', monospace;

  /* Theme Core */
  --cyber-bg: #0a0e17;
  --cyber-bg-surface: #0f1623;
  --cyber-bg-card: #131c2d;
  --cyber-border: rgba(56, 189, 248, 0.18);

  /* Primary Neon Accent (Dynamic) */
  --cyber-primary: #00f0ff; /* Neon Cyan */
  --cyber-primary-glow: rgba(0, 240, 255, 0.35);

  /* Status Colors */
  --cyber-success: #10b981;
  --cyber-warning: #f59e0b;
  --cyber-danger: #ef4444;
}
```

### Supported Neon Accents:
1. **Neon Cyan** (Default: `#00f0ff`)
2. **Matrix Emerald** (`#10b981`)
3. **Cyber Violet** (`#a855f7`)
4. **Solar Amber** (`#f59e0b`)
5. **Laser Crimson** (`#f43f5e`)

---

## 3. Built-in POS System Suite (5 Modules)

1. **Customer Order POS** (`/pos-customer`):
   - Category filtering (Meals, Bites, Drinks, Desserts)
   - Real-time subtotal, 8% VAT tax calculation, and coupon codes (`CYBER10`, `VIP20`)
   - Item notes and quantity controls
   - Direct dispatch to Kitchen Display System (KDS) with automated stock deduction
2. **Kitchen Order Display (KDS)** (`/pos-kitchen`):
   - Real-time tickets with live elapsed preparation countdown timers
   - Lifecycle workflow: `Received` → `Cooking` → `Ready` → `Completed`
   - Warning highlight for tickets delayed > 10 minutes
3. **Counter Cashier Checkout** (`/pos-checkout`):
   - Multi-gateway payment (CyberPay NFC, Card Reader, Cash, Split Bill)
   - Automatic customer change calculation
   - High-fidelity **Thermal 80mm Receipt Generator** with cryptographic barcode and printable modal
4. **Stock Management** (`/pos-stock`):
   - Real-time inventory tracking synchronized with customer order deductions
   - Minimum threshold alerts (<25 units) and depletion locks
   - Warehouse replenishment restock modal
5. **Table Booking & Floor Plan** (`/pos-tables`):
   - Visual floor plan sections (Main Hall, Neon Balcony, VIP Booth, Cyber Bar)
   - Capacity constraint validator (prevents overbooking table limits)
   - Walk-in seating vs reservation check-in workflow

---

## 4. Full LTR / RTL Bidirectional Engine
- The template includes first-class **RTL support** using CSS logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`).
- Toggling RTL in the Header or Theme Customizer sets `dir="rtl"` on the document root and mirrors the sidebar, breadcrumbs, tables, and corner notch brackets (`.cyber-corner`).
- User preference is preserved in browser `localStorage`.

---

## 5. Dual Template Versions: Full Demo vs Starter
- **Full Demo Version**: Includes all 30+ interactive pages, POS suite, Chart.js visualizations, mock data, and Kanban cards.
- **Starter Template Version**: Provides a pristine minimal skeleton canvas (`StarterLayoutPage.tsx`) for developers bootstrapping new proprietary modules without sample clutter.

---

## 6. 30+ Plugin & Library Inventory (License Compliant)

| Plugin Name | Version | Functionality | Module Used | License |
|---|---|---|---|---|
| Bootstrap 5.3 | 5.3.8 | Core responsive grid & base CSS foundations | Global | MIT |
| Tailwind CSS | 4.3.3 | Design tokens & CSS logical property engine | Global | MIT |
| Chart.js | 4.4.8 | Reactive Canvas line, bar, doughnut charts | Dashboard, Analytics, Charts | MIT |
| ApexCharts Simulator | 3.45.0 | SVG micro-sparklines, radial gauges & heatmaps | ApexCharts, Widgets | Apache 2.0 |
| Lucide Icons Pack | 0.546.0 | 1,400+ vector icons | All Pages | ISC |
| FontAwesome Bridge | 6.5.2 | FontAwesome 6 Free compatible catalog | Icons Page | SIL OFL 1.1 / MIT |
| DataTables Engine | 2.0.1 | Sorting, multi-column search, pagination & CSV export | Tables Plugins, Data CRUD | MIT |
| POS Order Engine | 1.4.0 | Tax, modifiers, and cart calculator | POS Customer Order | MIT |
| Kitchen Display (KDS) | 2.1.0 | Live ticket queue with elapsed countdowns | POS Kitchen Order | MIT |
| Thermal Receipt Gen | 1.2.0 | 80mm printable barcode receipt modal | POS Checkout | MIT |
| Table Allocator | 1.1.0 | Floor plan table status & conflict validation | POS Table Booking | MIT |
| Dropzone Upload | 6.0.0 | Drag & drop file staging uploader | Forms Plugins, File Manager | MIT |
| Tagify Chip Adder | 4.18.0 | Interactive tags with Enter binding | Forms Plugins | MIT |
| Input Mask Plugin | 5.0.8 | Credit card & phone number masks | Forms Plugins | MIT |
| Date Range Picker | 3.1.0 | Preset date range filters (Today, 7D, 30D, QTR) | Analytics, Calendar | MIT |
| Range Slider Plugin | 2.3.2 | Tooltip range sliders | Forms Elements, Widgets | MIT |
| Star Rating Component| 1.5.0 | Interactive star rating with hover preview | Forms Plugins, Products | MIT |
| Form Wizard Stepper | 2.2.0 | 3-step setup form with step validation | Forms Wizards | MIT |
| Cyber Toast Stack | 1.8.0 | Stackable live toast notification system | Global / Modals | MIT |
| Modal Controller | 3.0.0 | Accessible dialogs with Escape key & focus trap | Global / Modals | MIT |
| Kanban Board Engine | 2.0.4 | 4-column drag/move card pipeline | Scrum Board | MIT |
| Cyber Map Node | 1.6.0 | Vector world map with pingable server nodes | Map Page | MIT |
| PhotoSwipe Lightbox | 5.4.2 | Fullscreen image zoom and category filters | Gallery Page | MIT |
| Calendar Engine | 6.1.10 | Monthly schedule grid with event creation | Calendar Page | MIT |
| Virtual Drive Storage| 2.5.0 | File manager with storage quota visualization | File Manager | MIT |
| AI Chat Streamer | 1.0.0 | Streaming conversational terminal | AI Chat Page | MIT |
| AI Image Canvas | 1.0.0 | Prompt studio with style filters & gallery | AI Image Page | MIT |
| RTL Directional Engine| 2.0.0| Dynamic LTR/RTL document switching | Global / Customizer | MIT |
| Theme Accent Switcher| 1.3.0 | Real-time CSS variable accent updates | Global / Customizer | MIT |
| LocalStorage Syncer | 2.1.0 | State serialization and factory reset | Global / Settings | MIT |
| CSV Exporter | 1.1.0 | RFC4180 compliant CSV file builder | Data Management, Tables | MIT |
| Motion Micro-Engine | 12.23.24 | Smooth transitions & GPU animations | Global / Modals | MIT |

---

## 7. Developer & AI Assistant Guide: Adding New Pages

1. **Create component file**: Create `src/components/pages/MyNewPage.tsx` using `<CyberCard>`.
2. **Add to Sidebar**: Register your route in `src/components/layout/Sidebar.tsx` under the relevant group.
3. **Wire in `src/App.tsx`**: Add your page key to the `switch (activePage)` router block.

---

## 8. Simulated vs Production Backend Demarcation
- **Frontend Simulation**:
  - Authentication (`/login`, `/register`): Demonstrates client validation and credentials prefill. Real production requires backend routes (`/api/auth/login`) with session cookies.
  - AI Features (`/ai-chat`, `/ai-image`): Provide full UI and mock streams. Production integration should hook into a server-side proxy route (`/api/chat`, `/api/generate-image`) or the Gemini SDK on the backend.
  - LocalStorage Data: All POS orders, kitchen tickets, table bookings, scrum tasks, and CRUD data persist in browser `localStorage`. One-click factory reset is provided via the Settings panel and Customizer drawer.
