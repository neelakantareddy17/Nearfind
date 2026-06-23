import { useRouter, usePathname } from "expo-router";
import { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { roleNavigation, type RoleTabKey } from "../lib/roleNavigation";
import { COLORS, RADIUS, SHADOW, SPACING } from "../lib/theme";

type RoleScreenShellProps = {
  title: string;
  subtitle?: string;
  roleHomeLabel: string;
  role: keyof typeof roleNavigation;
  activeTab: RoleTabKey;
  showBack?: boolean;
  children: ReactNode;
};

const tabIcons: Record<RoleTabKey, string> = {
  home: "⌂",
  orders: "≣",
  profile: "◉",
};

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

  const activeKey =
    pathname === navigation.home
      ? "home"
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
    orders: navigation.orders,
    profile: navigation.profile,
  };

  const tabLabels: Record<RoleTabKey, string> = {
    home: roleHomeLabel,
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
                <Text style={styles.backGlyph}>‹</Text>
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
            <Pressable onPress={() => router.push(navigation.profile)} hitSlop={10} style={styles.profileShortcut}>
              <Text style={styles.profileGlyph}>◉</Text>
            </Pressable>
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
                <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{tabIcons[key]}</Text>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tabLabels[key]}</Text>
                {isActive ? <View style={styles.activeDot} /> : <View style={styles.inactiveDot} />}
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
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backGlyph: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "700",
    marginTop: -2,
  },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
  },
  brandMarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  headerTextWrap: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 16,
  },
  profileShortcut: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  profileGlyph: {
    color: COLORS.accent,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "900",
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
    paddingTop: 10,
    paddingBottom: 12,
    ...SHADOW,
  },
  tabButton: {
    minWidth: 72,
    minHeight: 56,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabIcon: {
    color: COLORS.muted,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "900",
  },
  tabIconActive: {
    color: COLORS.accent,
  },
  tabPressed: {
    opacity: 0.82,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.muted,
  },
  tabLabelActive: {
    color: COLORS.accent,
  },
  activeDot: {
    width: 18,
    height: 3,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  inactiveDot: {
    width: 18,
    height: 3,
    borderRadius: 999,
    backgroundColor: "transparent",
  },
});