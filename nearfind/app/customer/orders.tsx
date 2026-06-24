import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { OrderTrackingStepper } from "../../components/OrderTrackingStepper";
import { subscribeCustomerOrders } from "../../services/customerOrderService";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function CustomerOrdersScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const activeOrders = orders.filter(
  (order) =>
    order.status !== "DELIVERED" &&
    order.status !== "REJECTED" &&
    order.status !== "CANCELLED"
);

const historyOrders = orders.filter(
  (order) =>
    order.status === "DELIVERED" ||
    order.status === "REJECTED" ||
    order.status === "CANCELLED"
);

  useEffect(() => {
    const unsubscribe = subscribeCustomerOrders(
      setOrders
    );

    return unsubscribe;
  }, []);

  return (
    <RoleScreenShell
      role="customer"
      activeTab="orders"
      roleHomeLabel="Home"
      title="Orders"
      subtitle="Track your orders"
      showBack
    >
     <View style={{ gap: SPACING.lg }}>
  <Text
    style={{
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.text,
    }}
  >
    Active Orders
  </Text>

  {activeOrders.map((order) => (
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
      <View style={{ marginBottom: SPACING.lg }}>
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

        <Text
          style={{
            fontSize: 13,
            color: COLORS.textSecondary,
          }}
        >
          Order ID: {order.id}
        </Text>
      </View>

      <OrderTrackingStepper
        currentStatus={order.status}
      />
    </View>
  ))}

  <Text
    style={{
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.text,
      marginTop: SPACING.lg,
    }}
  >
    Order History
  </Text>

  {historyOrders.map((order) => (
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
        }}
      >
        {order.productName}
      </Text>

      <Text
        style={{
          marginTop: SPACING.sm,
          color: COLORS.textSecondary,
        }}
      >
        Status: {order.status}
      </Text>
    </View>
  ))}
</View>
    </RoleScreenShell>
  );
}