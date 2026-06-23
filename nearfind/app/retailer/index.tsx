import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders, mockRetailers } from "../../lib/mockData";

export default function RetailerDashboard() {
  return (
    <RoleScreenShell
      role="retailer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Retailer Dashboard"
      subtitle="Handle incoming orders with a calm, offline-first workflow."
    >
      <View style={{ gap: 18 }}>
        <View style={{ backgroundColor: "#E9F7EF", borderRadius: 22, padding: 16, borderWidth: 1, borderColor: "#CDE9D4" }}>
          <Text style={{ fontSize: 13, color: "#1E7A43", fontWeight: "800", marginBottom: 6 }}>Retailers</Text>
          <Text style={{ fontSize: 15, color: "#2D5E3A", lineHeight: 22 }}>{mockRetailers.join(" • ")}</Text>
        </View>

        <Pressable
          onPress={() => router.push("/retailer/orders")}
          style={{
            borderRadius: 18,
            paddingVertical: 14,
            backgroundColor: "#111111",
            alignItems: "center",
            minHeight: 44,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>Manage incoming orders</Text>
        </Pressable>

        {mockOrders.slice(0, 3).map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}
