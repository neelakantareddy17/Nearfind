import { router } from "expo-router";
import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function CustomerProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <RoleScreenShell
      role="customer"
      activeTab="profile"
      roleHomeLabel="Home"
      title="Profile"
      subtitle="Your account"
      showBack
    >
      <View style={{ gap: SPACING.lg }}>
        {/* User Info Card */}
        <View style={{ backgroundColor: COLORS.card, borderRadius: RADIUS.card, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.lg, gap: SPACING.md }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: COLORS.text }}>{user?.name ?? "Customer"}</Text>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary, fontWeight: "400" }}>{user?.email ?? "customer@nearfind.com"}</Text>
          <Text style={{ fontSize: 13, color: COLORS.text, fontWeight: "500" }}>Role: {user?.role ?? "customer"}</Text>
        </View>

        {/* Account Info Card */}
        <View style={{ backgroundColor: COLORS.surface, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.md }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text }}>Account</Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: "400" }}>UID: {user?.uid ?? "customer-uid"}</Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: "400" }}>Addresses: 1</Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 13, fontWeight: "400" }}>Payment methods: None</Text>
        </View>

        {/* Sign Out Button */}
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