import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { StatusBadge } from "../../components/StatusBadge";
import { mockOrders, mockProducts, mockRetailers, mockStatuses } from "../../lib/mockData";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function AdminDashboard() {
  return (
    <RoleScreenShell
      role="admin"
      activeTab="home"
      roleHomeLabel="Home"
      title="Admin Dashboard"
      subtitle="System overview"
    >
      <View style={{ gap: SPACING.lg }}>
        {/* Metrics */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACING.md }}>
          <View style={{ flex: 1, minWidth: 140, backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border }}>
            <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: SPACING.md, fontWeight: "500" }}>Products</Text>
            <Text style={{ fontSize: 28, fontWeight: "600", color: COLORS.text }}>{mockProducts.length}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 140, backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border }}>
            <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: SPACING.md, fontWeight: "500" }}>Retailers</Text>
            <Text style={{ fontSize: 28, fontWeight: "600", color: COLORS.text }}>{mockRetailers.length}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 140, backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border }}>
            <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: SPACING.md, fontWeight: "500" }}>Statuses</Text>
            <Text style={{ fontSize: 28, fontWeight: "600", color: COLORS.text }}>{mockStatuses.length}</Text>
          </View>
        </View>

        {/* System Statuses */}
        <View style={{ backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.lg }}>System statuses</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACING.md }}>
            {mockStatuses.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </View>
        </View>

        {/* Activity */}
        <View style={{ backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.lg }}>Recent activity</Text>
          {mockOrders.slice(0, 3).map((order, index) => (
            <View key={order.id} style={{ marginBottom: index < 2 ? SPACING.lg : 0 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: COLORS.text }}>{order.title}</Text>
              <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: SPACING.xs, fontWeight: "400" }}>{order.retailer}</Text>
            </View>
          ))}
        </View>
      </View>
    </RoleScreenShell>
  );
}
