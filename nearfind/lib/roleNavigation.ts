import type { AuthRole } from "./auth/mockAuth";

export type RoleTabKey = "home" | "orders" | "profile";

export type RoleNavigationConfig = {
  home: string;
  orders: string;
  profile: string;
  homeTitle: string;
  ordersTitle: string;
  profileTitle: string;
};

export const roleNavigation: Record<AuthRole, RoleNavigationConfig> = {
  customer: {
    home: "/customer",
    orders: "/customer/orders",
    profile: "/customer/profile",
    homeTitle: "Customer Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },
  retailer: {
    home: "/retailer",
    orders: "/retailer/orders",
    profile: "/retailer/profile",
    homeTitle: "Retailer Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },
  delivery: {
    home: "/delivery",
    orders: "/delivery/orders",
    profile: "/delivery/profile",
    homeTitle: "Delivery Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },
  admin: {
    home: "/admin",
    orders: "/admin/orders",
    profile: "/admin/profile",
    homeTitle: "Admin Dashboard",
    ordersTitle: "Orders",
    profileTitle: "Profile",
  },
};