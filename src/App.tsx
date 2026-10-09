import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ThemeCustomizer } from './components/layout/ThemeCustomizer';
import { PluginInventoryModal } from './components/layout/PluginInventoryModal';
import { AiGuideModal } from './components/layout/AiGuideModal';
import { DemoResetModal } from './components/layout/DemoResetModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { DashboardPage } from './components/pages/DashboardPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { EmailPage } from './components/pages/EmailPage';
import { WidgetsPage } from './components/pages/WidgetsPage';
import { AiChatPage } from './components/pages/AiChatPage';
import { AiImagePage } from './components/pages/AiImagePage';
import { POSCustomerOrderPage } from './components/pages/POSCustomerOrderPage';
import { POSKitchenOrderPage } from './components/pages/POSKitchenOrderPage';
import { POSCounterCheckoutPage } from './components/pages/POSCounterCheckoutPage';
import { POSStockManagementPage } from './components/pages/POSStockManagementPage';
import { POSTableBookingPage } from './components/pages/POSTableBookingPage';
import { UIBootstrapPage } from './components/pages/UIBootstrapPage';
import { UIButtonsPage } from './components/pages/UIButtonsPage';
import { UICardPage } from './components/pages/UICardPage';
import { UIIconsPage } from './components/pages/UIIconsPage';
import { UIModalNotificationsPage } from './components/pages/UIModalNotificationsPage';
import { UITypographyPage } from './components/pages/UITypographyPage';
import { UITabsAccordionsPage } from './components/pages/UITabsAccordionsPage';
import { FormsElementsPage } from './components/pages/FormsElementsPage';
import { FormsPluginsPage } from './components/pages/FormsPluginsPage';
import { FormsWizardsPage } from './components/pages/FormsWizardsPage';
import { TablesElementsPage } from './components/pages/TablesElementsPage';
import { TablesPluginsPage } from './components/pages/TablesPluginsPage';
import { ChartsChartjsPage } from './components/pages/ChartsChartjsPage';
import { ChartsApexchartsPage } from './components/pages/ChartsApexchartsPage';
import { MapPage } from './components/pages/MapPage';
import { ScrumBoardPage } from './components/pages/ScrumBoardPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { OrdersPage } from './components/pages/OrdersPage';
import { OrderDetailsPage } from './components/pages/OrderDetailsPage';
import { DataManagementPage } from './components/pages/DataManagementPage';
import { FileManagerPage } from './components/pages/FileManagerPage';
import { PricingPage } from './components/pages/PricingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { CalendarPage } from './components/pages/CalendarPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { HelperPage } from './components/pages/HelperPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { SearchResultsPage } from './components/pages/SearchResultsPage';
import { ComingSoonPage } from './components/pages/ComingSoonPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { StarterLayoutPage } from './components/pages/StarterLayoutPage';

const MainLayout: React.FC = () => {
  const {
    activePage,
    setActivePage,
    isSidebarCollapsed,
    layoutMode,
    setLayoutMode,
    isStarterMode,
  } = useTheme();

  // Route to component mapping
  const renderContent = () => {
    switch (activePage) {
      // Dashboards & Apps
      case 'dashboard':
        return <DashboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'email-inbox':
      case 'email-compose':
      case 'email-details':
        return <EmailPage />;
      case 'widgets':
        return <WidgetsPage />;
      case 'ai-chat':
        return <AiChatPage />;
      case 'ai-image':
        return <AiImagePage />;

      // POS Suite (5 Pages)
      case 'pos-customer':
        return <POSCustomerOrderPage />;
      case 'pos-kitchen':
        return <POSKitchenOrderPage />;
      case 'pos-checkout':
        return <POSCounterCheckoutPage />;
      case 'pos-stock':
        return <POSStockManagementPage />;
      case 'pos-tables':
        return <POSTableBookingPage />;

      // UI Components
      case 'ui-bootstrap':
        return <UIBootstrapPage />;
      case 'ui-buttons':
        return <UIButtonsPage />;
      case 'ui-card':
        return <UICardPage />;
      case 'ui-icons':
        return <UIIconsPage />;
      case 'ui-modals':
      case 'notifications':
        return <UIModalNotificationsPage />;
      case 'ui-typography':
        return <UITypographyPage />;
      case 'ui-tabs':
        return <UITabsAccordionsPage />;

      // Forms & Tables
      case 'forms-elements':
        return <FormsElementsPage />;
      case 'forms-plugins':
        return <FormsPluginsPage />;
      case 'forms-wizards':
        return <FormsWizardsPage />;
      case 'tables-elements':
        return <TablesElementsPage />;
      case 'tables-plugins':
        return <TablesPluginsPage />;

      // Visualizations
      case 'charts-chartjs':
        return <ChartsChartjsPage />;
      case 'charts-apexcharts':
        return <ChartsApexchartsPage />;
      case 'map-page':
        return <MapPage />;

      // Layout Variations
      case 'starter-layout':
        return <StarterLayoutPage />;
      case 'layout-fixed-footer':
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#090f19] border border-cyan-500/30 text-xs">
              <span className="font-bold text-cyan-300">Layout Variation: Fixed HUD Footer.</span>
              <p className="text-slate-400 mt-1">The bottom footer is pinned to the lower edge of the screen.</p>
            </div>
            <DashboardPage />
          </div>
        );
      case 'layout-full-height':
      case 'layout-full-width':
      case 'layout-boxed':
      case 'layout-collapsed-sidebar':
      case 'layout-top-nav':
      case 'layout-mixed-nav':
      case 'layout-mixed-nav-boxed':
        return <DashboardPage />;

      // Additional Pages
      case 'scrum-board':
        return <ScrumBoardPage />;
      case 'products':
        return <ProductsPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'order-details':
        return <OrderDetailsPage />;
      case 'data-management':
        return <DataManagementPage />;
      case 'file-manager':
        return <FileManagerPage />;
      case 'pricing':
        return <PricingPage />;
      case 'profile':
        return <ProfilePage />;
      case 'calendar':
        return <CalendarPage />;
      case 'settings':
        return <SettingsPage />;
      case 'helper':
        return <HelperPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'search-results':
        return <SearchResultsPage />;
      case 'coming-soon':
        return <ComingSoonPage />;
      case 'not-found':
        return <NotFoundPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;

      default:
        return <DashboardPage />;
    }
  };

  const isBoxed = layoutMode === 'boxed' || layoutMode === 'mixed-nav-boxed';
  const isTopNav = layoutMode === 'top-nav';
  const isFullScreen = activePage === 'login' || activePage === 'register';

  if (isFullScreen) {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-slate-200 flex flex-col justify-center">
        {renderContent()}
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#0a0e17] text-slate-200 flex flex-col ${layoutMode === 'full-height' ? 'h-screen overflow-hidden' : ''}`}>
      {/* Top Nav mode Bar if applicable */}
      {isTopNav && (
        <div className="bg-[#090e18] border-b border-slate-800 px-6 py-2.5 flex items-center justify-between overflow-x-auto text-xs z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActivePage('dashboard')}
              className={`hover:text-cyan-400 font-semibold cursor-pointer ${activePage === 'dashboard' ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActivePage('pos-customer')}
              className={`hover:text-cyan-400 font-semibold cursor-pointer ${activePage.startsWith('pos') ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              POS Suite (5)
            </button>
            <button
              onClick={() => setActivePage('data-management')}
              className={`hover:text-cyan-400 font-semibold cursor-pointer ${activePage === 'data-management' ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              Data CRUD
            </button>
            <button
              onClick={() => setActivePage('charts-chartjs')}
              className={`hover:text-cyan-400 font-semibold cursor-pointer ${activePage.startsWith('charts') ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              Visualizations
            </button>
            <button
              onClick={() => setActivePage('scrum-board')}
              className={`hover:text-cyan-400 font-semibold cursor-pointer ${activePage === 'scrum-board' ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              Scrum Board
            </button>
          </div>
          <button
            onClick={() => setLayoutMode('default')}
            className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
          >
            Reset to Standard Sidebar →
          </button>
        </div>
      )}

      {/* Main Sidebar (unless top-nav mode) */}
      {!isTopNav && <Sidebar />}

      {/* Content wrapper with sidebar margin */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isTopNav
            ? 'ms-0'
            : isSidebarCollapsed
            ? 'lg:ms-[72px]'
            : 'lg:ms-64'
        }`}
      >
        <Header />

        <main className={`flex-1 p-4 sm:p-6 pb-16 ${isBoxed ? 'max-w-7xl mx-auto w-full' : ''}`}>
          {renderContent()}
        </main>

        <Footer />
      </div>

      {/* Theme Drawers and Modals */}
      <ThemeCustomizer />
      <PluginInventoryModal />
      <AiGuideModal />
      <DemoResetModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
