export type AccentColor = 'cyan' | 'emerald' | 'violet' | 'amber' | 'crimson';

export type LayoutMode =
  | 'default'
  | 'starter'
  | 'fixed-footer'
  | 'full-height'
  | 'full-width'
  | 'boxed'
  | 'collapsed-sidebar'
  | 'top-nav'
  | 'mixed-nav'
  | 'mixed-nav-boxed';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  timestamp: string;
}

export interface POSProduct {
  id: string;
  name: string;
  category: 'Cyber Bites' | 'Synth Drinks' | 'Mainframe Meals' | 'Desserts';
  price: number;
  cost: number;
  stock: number;
  sku: string;
  image: string;
  rating: number;
  description: string;
}

export interface POSCartItem {
  product: POSProduct;
  quantity: number;
  notes: string;
}

export interface KitchenTicket {
  id: string;
  ticketNumber: string;
  tableNumber: string;
  customerName: string;
  orderType: 'Dine-In' | 'Takeaway' | 'Delivery';
  status: 'Received' | 'Cooking' | 'Ready' | 'Completed';
  createdAt: string;
  elapsedSeconds: number;
  items: {
    name: string;
    quantity: number;
    notes?: string;
  }[];
  totalAmount: number;
}

export interface DiningTable {
  id: string;
  number: number;
  capacity: number;
  section: 'Main Hall' | 'Neon Balcony' | 'VIP Booth' | 'Cyber Bar';
  status: 'Available' | 'Occupied' | 'Reserved';
  currentBooking?: {
    customerName: string;
    phone: string;
    time: string;
    guests: number;
    specialRequest?: string;
  };
}

export interface ScrumTask {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  tag: string;
  columnId: 'backlog' | 'in-progress' | 'review' | 'done';
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  category: 'Deployment' | 'Client Review' | 'Security Audit' | 'Design Sync';
  description: string;
}

export interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  avatar: string;
  subject: string;
  snippet: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
  hasAttachment?: boolean;
}

export interface DataRecord {
  id: string;
  code: string;
  name: string;
  department: 'Engineering' | 'CyberSec' | 'Operations' | 'Finance' | 'Design';
  role: string;
  status: 'Active' | 'Pending' | 'Suspended';
  budget: number;
  assignedDate: string;
}

export interface ProductItem {
  id: string;
  sku: string;
  title: string;
  category: string;
  price: number;
  salePrice?: number;
  stock: number;
  rating: number;
  salesCount: number;
  image: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  paymentMethod: 'CyberPay' | 'Credit Card' | 'Crypto' | 'Cash';
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled';
  itemsCount: number;
}

export interface PluginInfo {
  name: string;
  version: string;
  purpose: string;
  pageUsed: string;
  license: string;
  dependencies: string;
}
