import { router } from "expo-router";
import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function RetailerProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <RoleScreenShell
      role="retailer"
      activeTab="profile"
      roleHomeLabel="Home"
      title="Profile"
      subtitle="Your account"
      showBack
    >
      <View style={{ gap: SPACING.lg }}>
        <View style={{ backgroundColor: COLORS.card, borderRadius: RADIUS.card, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.lg, gap: SPACING.md }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: COLORS.text }}>{user?.name ?? "Retailer"}</Text>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary, fontWeight: "400" }}>{user?.email ?? "retailer@nearfind.com"}</Text>
          <Text style={{ fontSize: 13, color: COLORS.text, fontWeight: "500" }}>Role: {user?.role ?? "retailer"}</Text>
        </View>

        <View style={{ backgroundColor: COLORS.surface, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.md }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text }}>Store</Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: "400" }}>UID: {user?.uid ?? "retailer-uid"}</Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: "400" }}>Status: Open</Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: "400" }}>Queue: 2 orders</Text>
        </View>

        <Button
          label="Sign out"
          onPress={async () => {
            await signOut();
            router.replace("/");
          }}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>
    </RoleScreenShell>
  );
}