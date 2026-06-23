import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";

export default function CustomerOrdersScreen() {
  const activeOrders = mockOrders.filter((order) => order.status !== "Delivered");
  const pastOrders = mockOrders.filter((order) => order.status === "Delivered");

  return (
    <RoleScreenShell
      role="customer"
      activeTab="orders"
      roleHomeLabel="Home"
      title="Orders"
      subtitle="Track each order through the local fulfillment flow."
      showBack
    >
      <View style={{ gap: 18 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111" }}>Active tracking</Text>
        {activeOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111", marginTop: 6 }}>Order history</Text>
        {pastOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}
