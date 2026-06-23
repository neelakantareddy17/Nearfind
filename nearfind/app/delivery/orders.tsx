import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";

export default function DeliveryOrdersScreen() {
  const acceptedDeliveries = mockOrders.filter((order) => order.status === "Ready For Pickup" || order.status === "Picked Up");
  const deliveryHistory = mockOrders.filter((order) => order.status === "Delivered");

  return (
    <RoleScreenShell
      role="delivery"
      activeTab="orders"
      roleHomeLabel="Home"
      title="Orders"
      subtitle="Accepted deliveries and delivery history."
      showBack
    >
      <View style={{ gap: 18 }}>
        <Pressable
          onPress={() => router.push("/delivery/available-orders")}
          style={{
            borderRadius: 18,
            paddingVertical: 14,
            backgroundColor: "#E9F7EF",
            borderWidth: 1,
            borderColor: "#CDE9D4",
            alignItems: "center",
            minHeight: 44,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#1E7A43", fontWeight: "800" }}>Open available deliveries</Text>
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111" }}>Accepted deliveries</Text>
        {acceptedDeliveries.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111", marginTop: 6 }}>Delivery history</Text>
        {deliveryHistory.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}