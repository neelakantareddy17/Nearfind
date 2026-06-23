import { Text, View } from "react-native";

import { StatusBadge } from "./StatusBadge";
import type { Order } from "../lib/mockData";

export function OrderCard({ order }: { order: Order }) {
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
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: "#111111", marginBottom: 6 }}>{order.title}</Text>
          <Text style={{ fontSize: 13, color: "#666660" }}>{order.retailer}</Text>
        </View>
        <Text style={{ fontSize: 12, color: "#8A8A84", fontWeight: "700" }}>{order.time}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <StatusBadge status={order.status} />
        <Text style={{ fontSize: 13, color: "#111111", fontWeight: "700" }}>{order.items}</Text>
      </View>
      <Text style={{ fontSize: 12, color: "#1E7A43", marginTop: 10, fontWeight: "700" }}>{order.id}</Text>
    </View>
  );
}
