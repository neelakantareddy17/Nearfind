import { Text, View } from "react-native";
import { StatusBadge } from "./StatusBadge";
import type { Product } from "../lib/mockData";
import { COLORS, RADIUS, SPACING } from "../lib/theme";

export function ProductCard({ product }: { product: Product }) {
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
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: SPACING.lg }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.sm }}>{product.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: SPACING.md, fontWeight: "400" }}>{product.retailer}</Text>
          <View style={{ flexDirection: "row", gap: SPACING.sm }}>
            <StatusBadge status={product.status} />
          </View>
        </View>
        <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text }}>{product.price}</Text>
          <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: "400", marginTop: SPACING.lg }}>{product.eta}</Text>
        </View>
      </View>
    </View>
  );
}
