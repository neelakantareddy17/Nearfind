import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";

export default function DeliveryDashboard() {
  return (
    <RoleScreenShell
      role="delivery"
      activeTab="home"
      roleHomeLabel="Home"
      title="Delivery Dashboard"
      subtitle="Pick up available deliveries and keep the handoff moving."
    >
      <View style={{ gap: 18 }}>
        <Pressable
          onPress={() => router.push("/delivery/orders")}
          style={{
            borderRadius: 18,
            paddingVertical: 14,
            backgroundColor: "#111111",
            alignItems: "center",
            minHeight: 44,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>View assigned deliveries</Text>
        </Pressable>

        {mockOrders.slice(1, 4).map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}
