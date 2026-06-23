export type RoleKey = "customer" | "retailer" | "delivery" | "admin";

export type Product = {
  id: string;
  name: string;
  retailer: string;
  price: string;
  eta: string;
  status: string;
};

export type Order = {
  id: string;
  title: string;
  retailer: string;
  status: string;
  time: string;
  items: string;
};

export type Role = {
  key: RoleKey;
  title: string;
  description: string;
  path: "/" | "/customer" | "/retailer" | "/delivery" | "/admin";
};

export const roles: Role[] = [
  {
    key: "customer",
    title: "Customer",
    description: "Search nearby products and track your orders.",
    path: "/customer",
  },
  {
    key: "retailer",
    title: "Retailer",
    description: "Manage incoming orders and stock flow.",
    path: "/retailer",
  },
  {
    key: "delivery",
    title: "Delivery Partner",
    description: "Pick available deliveries and update status.",
    path: "/delivery",
  },
  {
    key: "admin",
    title: "Admin",
    description: "Monitor the marketplace from one clean dashboard.",
    path: "/admin",
  },
];

export const mockProducts: Product[] = [
  { id: "1", name: "Maggi Noodles", retailer: "Sharma Kirana", price: "₹14", eta: "12 min", status: "In Stock" },
  { id: "2", name: "Coca Cola", retailer: "Quick Mart", price: "₹40", eta: "8 min", status: "Fast Delivery" },
  { id: "3", name: "Bread", retailer: "Fresh Basket", price: "₹35", eta: "10 min", status: "Fresh" },
  { id: "4", name: "Milk", retailer: "Sharma Kirana", price: "₹28", eta: "15 min", status: "Morning Rush" },
  { id: "5", name: "Chips", retailer: "Quick Mart", price: "₹20", eta: "7 min", status: "Popular" },
];

export const mockRetailers = ["Sharma Kirana", "Quick Mart", "Fresh Basket"];

export const mockStatuses = ["Placed", "Accepted", "Packed", "Ready For Pickup", "Picked Up", "Delivered"];

export const mockOrders: Order[] = [
  { id: "ORD-241", title: "Maggi + Milk", retailer: "Sharma Kirana", status: "Placed", time: "2 min ago", items: "2 items" },
  { id: "ORD-242", title: "Bread + Chips", retailer: "Quick Mart", status: "Packed", time: "12 min ago", items: "2 items" },
  { id: "ORD-243", title: "Coca Cola", retailer: "Fresh Basket", status: "Ready For Pickup", time: "24 min ago", items: "1 item" },
  { id: "ORD-244", title: "Weekly essentials", retailer: "Sharma Kirana", status: "Picked Up", time: "35 min ago", items: "4 items" },
];
