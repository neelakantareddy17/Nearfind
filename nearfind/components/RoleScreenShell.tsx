import { useRouter, usePathname } from "expo-router";
import { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { roleNavigation, type RoleTabKey } from "../lib/roleNavigation";
import { COLORS, RADIUS, SHADOW, SPACING } from "../lib/theme";
import { useCart } from "../context/CartContext";
type RoleScreenShellProps = {
  title: string;
  subtitle?: string;
  roleHomeLabel: string;
  role: keyof typeof roleNavigation;
  activeTab: RoleTabKey;
  showBack?: boolean;
  children: ReactNode;
};

const tabIcons = {
  home: "home",
  search: "magnify",
  orders: "receipt",
  profile: "account",
} as const;

export function RoleScreenShell({
  title,
  subtitle,
  roleHomeLabel,
  role,
  activeTab,
  showBack = false,
  children,
}: RoleScreenShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navigation = roleNavigation[role];
const { items } = useCart();
 const activeKey =
  pathname === navigation.home
    ? "home"
    : pathname === navigation.search
      ? "search"
      : pathname === navigation.orders
        ? "orders"
        : pathname === navigation.profile
          ? "profile"
          : activeTab;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(navigation.home);
  };

  const tabRoutes: Record<RoleTabKey, string> = {
  home: navigation.home,
  search: navigation.search,
  orders: navigation.orders,
  profile: navigation.profile,
};

 const tabLabels: Record<RoleTabKey, string> = {
  home: roleHomeLabel,
  search: "Search",
  orders: navigation.ordersTitle,
  profile: navigation.profileTitle,
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {showBack ? (
              <Pressable onPress={goBack} style={styles.backButton} hitSlop={10}>
                <MaterialCommunityIcons name="chevron-left" size={24} color={COLORS.text} />
              </Pressable>
            ) : (
              <View style={styles.brandMark}>
                <Text style={styles.brandMarkText}>N</Text>
              </View>
            )}

            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle}>{title}</Text>
              {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
            </View>
          </View>

          {!showBack ? (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    }}
  >
    {role === "customer" && (
      <Pressable
        onPress={() =>
          router.push("/customer/cart")
        }
      >
        <MaterialCommunityIcons
          name="cart-outline"
          size={28}
          color={COLORS.text}
        />

        {items.length > 0 && (
          <View
            style={{
              position: "absolute",
              right: -6,
              top: -4,
              backgroundColor: "#000",
              borderRadius: 10,
              minWidth: 18,
              height: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 10,
                fontWeight: "700",
              }}
            >
              {items.length}
            </Text>
          </View>
        )}
      </Pressable>
    )}

    <Pressable
      onPress={() =>
        router.push(navigation.profile)
      }
      hitSlop={10}
      style={styles.profileShortcut}
    >
      <MaterialCommunityIcons
        name="account-circle"
        size={28}
        color={COLORS.text}
      />
    </Pressable>
  </View>
) : null}
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        <View style={styles.bottomNav}>
          {(Object.keys(tabRoutes) as RoleTabKey[]).map((key) => {
            const isActive = key === activeKey;

            return (
              <Pressable
                key={key}
                onPress={() => router.push(tabRoutes[key])}
                style={({ pressed }) => [styles.tabButton, pressed && styles.tabPressed]}
              >
                <MaterialCommunityIcons 
                  name={tabIcons[key]} 
                  size={24} 
                  color={isActive ? COLORS.text : COLORS.textSecondary}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tabLabels[key]}</Text>
                {isActive ? <View style={styles.activeDot} /> : null}
              </Pressable>
            );
          })}
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.button,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.button,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.text,
  },
  brandMarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  headerTextWrap: {
    flex: 1,
    gap: SPACING.xs,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  profileShortcut: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.button,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.lg,
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.card,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    ...SHADOW,
  },
  tabButton: {
    minWidth: 72,
    minHeight: 56,
    paddingHorizontal: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
  },
  tabPressed: {
    opacity: 0.8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  tabLabelActive: {
    color: COLORS.text,
    fontWeight: "600",
  },
  activeDot: {
    width: 20,
    height: 3,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.text,
    marginTop: SPACING.xs,
  },
});