import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { Button } from "../../components/Button";
import { mockRetailers } from "../../lib/mockData";
import { updateOrderStatus } from "../../services/orderUpdateService";
import { subscribeRetailerOrders } from "../../services/retailerService";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function RetailerDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeRetailerOrders(
      setOrders
    );

    return unsubscribe;
  }, []);

  return (
    <RoleScreenShell
      role="retailer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Retailer Dashboard"
      subtitle="Manage incoming orders"
    >
      <View style={{ gap: SPACING.lg }}>
        {/* Info Card */}
        <View
          style={{
            backgroundColor: COLORS.surface,
            borderRadius: RADIUS.card,
            padding: SPACING.lg,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: COLORS.textSecondary,
              fontWeight: "500",
              marginBottom: SPACING.sm,
            }}
          >
            Retailers
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: COLORS.text,
              lineHeight: 20,
              fontWeight: "500",
            }}
          >
            {mockRetailers.join(" • ")}
          </Text>
        </View>

        {/* View Orders Button */}
        <Button
          label="Manage orders"
          onPress={() => router.push("/retailer/orders")}
          variant="primary"
          size="large"
          fullWidth
        />

        {/* Recent Orders */}
        {orders.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: RADIUS.card,
              padding: SPACING.lg,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: SPACING.sm,
                color: COLORS.text,
              }}
            >
              {order.productName}
            </Text>

            <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: "400", marginBottom: SPACING.md }}>
              Customer: {order.customerName}
            </Text>

            <Text
              style={{
                marginBottom: SPACING.lg,
                fontWeight: "500",
                color: COLORS.text,
                fontSize: 13,
              }}
            >
              Status: {order.status}
            </Text>

            {/* Action Buttons */}
            {order.status === "PLACED" && (
              <View style={{ flexDirection: "row", gap: SPACING.md }}>
                <Button
                  label="Accept"
                  onPress={() =>
                    updateOrderStatus(order.id, "ACCEPTED")
                  }
                  variant="primary"
                  size="medium"
                  fullWidth
                />
                <Button
                  label="Reject"
                  onPress={() =>
                    updateOrderStatus(order.id, "REJECTED")
                  }
                  variant="secondary"
                  size="medium"
                  fullWidth
                />
              </View>
            )}

            {order.status === "ACCEPTED" && (
  <View
    style={{
      flexDirection: "row",
      gap: SPACING.md,
    }}
  >
    <Button
      label="Mark Packed"
      onPress={() =>
        updateOrderStatus(order.id, "PACKED")
      }
      variant="primary"
      size="medium"
      fullWidth
    />

    <Button
      label="Cancel"
      onPress={() =>
        updateOrderStatus(order.id, "CANCELLED")
      }
      variant="secondary"
      size="medium"
      fullWidth
    />
  </View>
)}

            {order.status === "PACKED" && (
  <View
    style={{
      flexDirection: "row",
      gap: SPACING.md,
    }}
  >
    <Button
      label="Ready for Pickup"
      onPress={() =>
        updateOrderStatus(
          order.id,
          "READY_FOR_PICKUP"
        )
      }
      variant="primary"
      size="medium"
      fullWidth
    />

    <Button
      label="Cancel"
      onPress={() =>
        updateOrderStatus(
          order.id,
          "CANCELLED"
        )
      }
      variant="secondary"
      size="medium"
      fullWidth
    />
  </View>
)}
          </View>
        ))}
      </View>
    </RoleScreenShell>
  );
}