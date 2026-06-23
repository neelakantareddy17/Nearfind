import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";

export default function RetailerOrdersScreen() {
  const incomingOrders = mockOrders.filter((order) => order.status === "Placed" || order.status === "Accepted");
  const activeOrders = mockOrders.filter((order) => order.status === "Packed" || order.status === "Ready For Pickup");

  return (
    <RoleScreenShell
      role="retailer"
      activeTab="orders"
      roleHomeLabel="Home"
      title="Orders"
      subtitle="Review incoming and active retailer orders."
      showBack
    >
      <View style={{ gap: 18 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111" }}>Incoming orders</Text>
        {incomingOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111", marginTop: 6 }}>Active orders</Text>
        {activeOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}
