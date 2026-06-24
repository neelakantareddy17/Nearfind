import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";
import { COLORS, SPACING } from "../../lib/theme";

export default function RetailerOrdersScreen() {
  const incomingOrders = mockOrders.filter((order) => order.status === "Placed" || order.status === "Accepted");
  const activeOrders = mockOrders.filter((order) => order.status === "Packed" || order.status === "Ready For Pickup");

  return (
    <RoleScreenShell
      role="retailer"
      activeTab="orders"
      roleHomeLabel="Home"
      title="Orders"
      subtitle="Manage all orders"
      showBack
    >
      <View style={{ gap: SPACING.lg }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.md }}>Incoming</Text>
          {incomingOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.md }}>Active</Text>
          {activeOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      </View>
    </RoleScreenShell>
  );
}
