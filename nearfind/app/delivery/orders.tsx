import { router } from "expo-router";
import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { Button } from "../../components/Button";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";
import { COLORS, SPACING } from "../../lib/theme";

export default function DeliveryOrdersScreen() {
  const acceptedDeliveries = mockOrders.filter((order) => order.status === "Ready For Pickup" || order.status === "Picked Up");
  const deliveryHistory = mockOrders.filter((order) => order.status === "Delivered");

  return (
    <RoleScreenShell
      role="delivery"
      activeTab="orders"
      roleHomeLabel="Home"
      title="Orders"
      subtitle="Your deliveries"
      showBack
    >
      <View style={{ gap: SPACING.lg }}>
        <Button
          label="Available deliveries"
          onPress={() => router.push("/delivery/available-orders")}
          variant="secondary"
          size="large"
          fullWidth
        />

        <View>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.md }}>Active</Text>
          {acceptedDeliveries.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.md }}>History</Text>
          {deliveryHistory.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      </View>
    </RoleScreenShell>
  );
}