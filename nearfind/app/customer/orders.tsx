import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { subscribeCustomerOrders } from "../../services/customerOrderService";

const statuses = [
  "PLACED",
  "ACCEPTED",
  "PACKED",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "DELIVERED",
];

export default function CustomerOrdersScreen() {
  const [orders, setOrders] = useState<any[]>([]);

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
    subtitle="Track each order through the fulfillment flow."
    showBack
  >
    <View style={{ gap: 18 }}>
      {orders.map((order) => (
        <View
          key={order.id}
          style={{
            backgroundColor: "#FFFFFF",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text>{order.productName}</Text>
         <Text style={{ marginBottom: 16 }}>
  Current Status: {order.status}
</Text>

{statuses.map((status, index) => {
  const currentIndex = statuses.indexOf(order.status);

  return (
    <Text
  key={status}
  style={{
    marginBottom: 8,
    fontSize: 15,
    color:
      index <= currentIndex
        ? "#1E7A43"
        : "#999999",
  }}
>
  {index <= currentIndex ? "✓" : "○"} {status}
</Text>
  );
})}
        </View>
      ))}
    </View>
  </RoleScreenShell>
);
}