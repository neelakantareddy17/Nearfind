import { Text, View } from "react-native";

import { StatusBadge } from "./StatusBadge";
import type { Product } from "../lib/mockData";

export function ProductCard({ product }: { product: Product }) {
  return (
    <View
      style={{
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E8E8E3",
        padding: 18,
        marginBottom: 14,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: "#111111", marginBottom: 6 }}>{product.name}</Text>
          <Text style={{ fontSize: 13, color: "#666660", marginBottom: 12 }}>{product.retailer}</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <StatusBadge status={product.status} />
          </View>
        </View>
        <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: "#111111" }}>{product.price}</Text>
          <Text style={{ fontSize: 12, color: "#1E7A43", fontWeight: "700", marginTop: 32 }}>{product.eta}</Text>
        </View>
      </View>
    </View>
  );
}
