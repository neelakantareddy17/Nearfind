import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { Button } from "../../components/Button";
import { subscribeDeliveryOrders } from "../../services/deliveryService";
import { updateOrderStatus } from "../../services/orderUpdateService";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeDeliveryOrders(setOrders);

    return unsubscribe;
  }, []);

  return (
    <RoleScreenShell
      role="delivery"
      activeTab="home"
      roleHomeLabel="Home"
      title="Delivery Dashboard"
      subtitle="Manage your deliveries"
    >
      <View style={{ gap: SPACING.lg }}>
        {/* View All Button */}
        <Button
          label="View all deliveries"
          onPress={() => router.push("/delivery/orders")}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Orders List */}
        {orders.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: COLORS.card,
              padding: SPACING.lg,
              borderRadius: RADIUS.card,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: COLORS.text,
                marginBottom: SPACING.sm,
              }}
            >
              {order.productName}
            </Text>

            <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: "400", marginBottom: SPACING.sm }}>
              Customer: {order.customerName}
            </Text>

            <Text style={{ fontSize: 13, color: COLORS.text, fontWeight: "500", marginBottom: SPACING.lg }}>
              Status: {order.status}
            </Text>

            {order.status === "READY_FOR_PICKUP" && (
              <Button
                label="Picked Up"
                onPress={() =>
                  updateOrderStatus(order.id, "PICKED_UP")
                }
                variant="primary"
                size="medium"
                fullWidth
              />
            )}

            {order.status === "PICKED_UP" && (
              <Button
                label="Delivered"
                onPress={() =>
                  updateOrderStatus(order.id, "DELIVERED")
                }
                variant="primary"
                size="medium"
                fullWidth
              />
            )}
          </View>
        ))}
      </View>
    </RoleScreenShell>
  );
}
