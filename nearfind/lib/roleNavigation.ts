import type { AuthRole } from "./auth/mockAuth";

export type RoleTabKey =
  | "home"
  | "search"
  | "orders"
  | "profile";

export type RoleNavigationConfig = {
  home: string;
  search: string;
  orders: string;
  profile: string;
  homeTitle: string;
  ordersTitle: string;
  profileTitle: string;
};

export const roleNavigation: Record<
  AuthRole,
  RoleNavigationConfig
> = {
  customer: {
    home: "/customer",
    search: "/customer/search",
    orders: "/customer/orders",
    profile: "/customer/profile",
    homeTitle: "Customer Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },

  retailer: {
    home: "/retailer",
    search: "/retailer",
    orders: "/retailer/orders",
    profile: "/retailer/profile",
    homeTitle: "Retailer Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },

  delivery: {
    home: "/delivery",
    search: "/delivery",
    orders: "/delivery/orders",
    profile: "/delivery/profile",
    homeTitle: "Delivery Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },

  admin: {
    home: "/admin",
    search: "/admin",
    orders: "/admin/orders",
    profile: "/admin/profile",
    homeTitle: "Admin Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },
};