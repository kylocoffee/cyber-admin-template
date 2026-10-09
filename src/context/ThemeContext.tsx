import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AccentColor,
  LayoutMode,
  ToastMessage,
  POSProduct,
  POSCartItem,
  KitchenTicket,
  DiningTable,
  ScrumTask,
  CalendarEvent,
  EmailItem,
  DataRecord,
  ProductItem,
  OrderItem,
} from '../types';
import {
  INITIAL_POS_PRODUCTS,
  INITIAL_KITCHEN_TICKETS,
  INITIAL_DINING_TABLES,
  INITIAL_SCRUM_TASKS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_EMAILS,
  INITIAL_DATA_RECORDS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
} from '../data/initialData';

interface ThemeContextType {
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  isRtl: boolean;
  setIsRtl: (rtl: boolean) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  isStarterMode: boolean;
  setIsStarterMode: (starter: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  toasts: ToastMessage[];
  addToast: (toast: { type: 'success' | 'info' | 'warning' | 'danger'; title: string; message: string }) => void;
  removeToast: (id: string) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isPluginInventoryOpen: boolean;
  setIsPluginInventoryOpen: (open: boolean) => void;
  isAiGuideOpen: boolean;
  setIsAiGuideOpen: (open: boolean) => void;
  isDemoResetModalOpen: boolean;
  setIsDemoResetModalOpen: (open: boolean) => void;

  // Persistent Demo Data
  posProducts: POSProduct[];
  setPosProducts: React.Dispatch<React.SetStateAction<POSProduct[]>>;
  kitchenTickets: KitchenTicket[];
  setKitchenTickets: React.Dispatch<React.SetStateAction<KitchenTicket[]>>;
  diningTables: DiningTable[];
  setDiningTables: React.Dispatch<React.SetStateAction<DiningTable[]>>;
  cart: POSCartItem[];
  setCart: React.Dispatch<React.SetStateAction<POSCartItem[]>>;
  scrumTasks: ScrumTask[];
  setScrumTasks: React.Dispatch<React.SetStateAction<ScrumTask[]>>;
  calendarEvents: CalendarEvent[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  emails: EmailItem[];
  setEmails: React.Dispatch<React.SetStateAction<EmailItem[]>>;
  dataRecords: DataRecord[];
  setDataRecords: React.Dispatch<React.SetStateAction<DataRecord[]>>;
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;

  // Helper functions
  resetAllDemoData: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme settings
  const [accent, setAccentState] = useState<AccentColor>(() => {
    return (localStorage.getItem('cyber_accent') as AccentColor) || 'cyan';
  });

  const [isRtl, setIsRtlState] = useState<boolean>(() => {
    return localStorage.getItem('cyber_rtl') === 'true';
  });

  const [layoutMode, setLayoutModeState] = useState<LayoutMode>(() => {
    return (localStorage.getItem('cyber_layout_mode') as LayoutMode) || 'default';
  });

  const [isStarterMode, setIsStarterModeState] = useState<boolean>(() => {
    return localStorage.getItem('cyber_starter_mode') === 'true';
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [activePage, setActivePageState] = useState<string>('dashboard');

  // Modals & Drawers
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isPluginInventoryOpen, setIsPluginInventoryOpen] = useState<boolean>(false);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState<boolean>(false);
  const [isDemoResetModalOpen, setIsDemoResetModalOpen] = useState<boolean>(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([
    {
      id: 'init-toast',
      type: 'info',
      title: 'Cyber System Initialized',
      message: 'Bootstrap 5.3 template ready. LTR/RTL and POS system active.',
      timestamp: 'Just now',
    },
  ]);

  // Persistent Demo Data with fallback to defaults
  const [posProducts, setPosProducts] = useState<POSProduct[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_pos_products');
      return saved ? JSON.parse(saved) : INITIAL_POS_PRODUCTS;
    } catch {
      return INITIAL_POS_PRODUCTS;
    }
  });

  const [kitchenTickets, setKitchenTickets] = useState<KitchenTicket[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_kitchen_tickets');
      return saved ? JSON.parse(saved) : INITIAL_KITCHEN_TICKETS;
    } catch {
      return INITIAL_KITCHEN_TICKETS;
    }
  });

  const [diningTables, setDiningTables] = useState<DiningTable[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_dining_tables');
      return saved ? JSON.parse(saved) : INITIAL_DINING_TABLES;
    } catch {
      return INITIAL_DINING_TABLES;
    }
  });

  const [cart, setCart] = useState<POSCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_pos_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [scrumTasks, setScrumTasks] = useState<ScrumTask[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_scrum_tasks');
      return saved ? JSON.parse(saved) : INITIAL_SCRUM_TASKS;
    } catch {
      return INITIAL_SCRUM_TASKS;
    }
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_calendar_events');
      return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
    } catch {
      return INITIAL_CALENDAR_EVENTS;
    }
  });

  const [emails, setEmails] = useState<EmailItem[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_emails');
      return saved ? JSON.parse(saved) : INITIAL_EMAILS;
    } catch {
      return INITIAL_EMAILS;
    }
  });

  const [dataRecords, setDataRecords] = useState<DataRecord[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_data_records');
      return saved ? JSON.parse(saved) : INITIAL_DATA_RECORDS;
    } catch {
      return INITIAL_DATA_RECORDS;
    }
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Apply Accent & RTL to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('cyber_accent', accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    localStorage.setItem('cyber_rtl', isRtl ? 'true' : 'false');
  }, [isRtl]);

  useEffect(() => {
    localStorage.setItem('cyber_layout_mode', layoutMode);
    if (layoutMode === 'collapsed-sidebar') {
      setIsSidebarCollapsed(true);
    }
  }, [layoutMode]);

  useEffect(() => {
    localStorage.setItem('cyber_starter_mode', isStarterMode ? 'true' : 'false');
  }, [isStarterMode]);

  // Sync data to localStorage
  useEffect(() => {
    localStorage.setItem('cyber_pos_products', JSON.stringify(posProducts));
  }, [posProducts]);

  useEffect(() => {
    localStorage.setItem('cyber_kitchen_tickets', JSON.stringify(kitchenTickets));
  }, [kitchenTickets]);

  useEffect(() => {
    localStorage.setItem('cyber_dining_tables', JSON.stringify(diningTables));
  }, [diningTables]);

  useEffect(() => {
    localStorage.setItem('cyber_pos_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cyber_scrum_tasks', JSON.stringify(scrumTasks));
  }, [scrumTasks]);

  useEffect(() => {
    localStorage.setItem('cyber_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('cyber_emails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('cyber_data_records', JSON.stringify(dataRecords));
  }, [dataRecords]);

  useEffect(() => {
    localStorage.setItem('cyber_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cyber_orders', JSON.stringify(orders));
  }, [orders]);

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
  };

  const setIsRtl = (val: boolean) => {
    setIsRtlState(val);
  };

  const setLayoutMode = (mode: LayoutMode) => {
    setLayoutModeState(mode);
  };

  const setIsStarterMode = (val: boolean) => {
    setIsStarterModeState(val);
    if (val) {
      setActivePageState('starter-layout');
    } else {
      setActivePageState('dashboard');
    }
  };

  const setActivePage = (page: string) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileSidebarOpen(false);
  };

  const addToast = (toast: { type: 'success' | 'info' | 'warning' | 'danger'; title: string; message: string }) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const newToast: ToastMessage = {
      ...toast,
      id,
      timestamp: 'Just now',
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('cyber_pos_products');
    localStorage.removeItem('cyber_kitchen_tickets');
    localStorage.removeItem('cyber_dining_tables');
    localStorage.removeItem('cyber_pos_cart');
    localStorage.removeItem('cyber_scrum_tasks');
    localStorage.removeItem('cyber_calendar_events');
    localStorage.removeItem('cyber_emails');
    localStorage.removeItem('cyber_data_records');
    localStorage.removeItem('cyber_products');
    localStorage.removeItem('cyber_orders');

    setPosProducts(INITIAL_POS_PRODUCTS);
    setKitchenTickets(INITIAL_KITCHEN_TICKETS);
    setDiningTables(INITIAL_DINING_TABLES);
    setCart([]);
    setScrumTasks(INITIAL_SCRUM_TASKS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setEmails(INITIAL_EMAILS);
    setDataRecords(INITIAL_DATA_RECORDS);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);

    addToast({
      type: 'success',
      title: 'Demo Data Reset',
      message: 'All demo datasets restored to initial factory values.',
    });
    setIsDemoResetModalOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        isRtl,
        setIsRtl,
        layoutMode,
        setLayoutMode,
        isStarterMode,
        setIsStarterMode,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        activePage,
        setActivePage,
        toasts,
        addToast,
        removeToast,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isPluginInventoryOpen,
        setIsPluginInventoryOpen,
        isAiGuideOpen,
        setIsAiGuideOpen,
        isDemoResetModalOpen,
        setIsDemoResetModalOpen,
        posProducts,
        setPosProducts,
        kitchenTickets,
        setKitchenTickets,
        diningTables,
        setDiningTables,
        cart,
        setCart,
        scrumTasks,
        setScrumTasks,
        calendarEvents,
        setCalendarEvents,
        emails,
        setEmails,
        dataRecords,
        setDataRecords,
        products,
        setProducts,
        orders,
        setOrders,
        resetAllDemoData,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
