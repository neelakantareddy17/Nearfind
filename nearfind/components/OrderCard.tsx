import { Text, View } from "react-native";
import { StatusBadge } from "./StatusBadge";
import type { Order } from "../lib/mockData";
import { COLORS, RADIUS, SPACING } from "../lib/theme";

export function OrderCard({ order }: { order: Order }) {
  return (
    <View
      style={{
        borderRadius: RADIUS.card,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.cardBorder,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.md }}>
        <View style={{ flex: 1, paddingRight: SPACING.md }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.sm }}>{order.title}</Text>
          <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: "400" }}>{order.retailer}</Text>
        </View>
        <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: "400" }}>{order.time}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: SPACING.md }}>
        <StatusBadge status={order.status} />
        <Text style={{ fontSize: 13, color: COLORS.text, fontWeight: "500" }}>{order.items}</Text>
      </View>
      <Text style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: SPACING.md, fontWeight: "400" }}>{order.id}</Text>
    </View>
  );
}
