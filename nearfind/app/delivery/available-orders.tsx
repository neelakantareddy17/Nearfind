import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";
import { SPACING } from "../../lib/theme";

export default function AvailableOrdersScreen() {
  const availableOrders = mockOrders.filter((order) => order.status === "Ready For Pickup" || order.status === "Packed");

  return (
    <RoleScreenShell
      role="delivery"
      activeTab="home"
      roleHomeLabel="Home"
      title="Available Deliveries"
      subtitle="Ready for pickup"
      showBack
    >
      <View style={{ gap: SPACING.lg }}>
        {availableOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}
