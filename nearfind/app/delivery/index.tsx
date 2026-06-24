import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";
import { subscribeDeliveryOrders } from "../../services/deliveryService";
import { updateOrderStatus } from "../../services/orderUpdateService";

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

       {orders.map((order) => (
  <View
    key={order.id}
    style={{
      backgroundColor: "#FFFFFF",
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E8E8E3",
    }}
  >
    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
      }}
    >
      {order.productName}
    </Text>

    <Text>
      Customer: {order.customerName}
    </Text>

    <Text>
      Status: {order.status}
    </Text>

    {order.status === "READY_FOR_PICKUP" && (
  <Pressable
    onPress={() =>
      updateOrderStatus(order.id, "PICKED_UP")
    }
    style={{
      backgroundColor: "#1E7A43",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 12,
      alignSelf: "flex-start",
    }}
  >
    <Text style={{ color: "#FFFFFF" }}>
      Picked Up
    </Text>
  </Pressable>
)}

{order.status === "PICKED_UP" && (
  <Pressable
    onPress={() =>
      updateOrderStatus(order.id, "DELIVERED")
    }
    style={{
      backgroundColor: "#111111",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 12,
      alignSelf: "flex-start",
    }}
  >
    <Text style={{ color: "#FFFFFF" }}>
      Delivered
    </Text>
  </Pressable>
)}
    
  </View>
))}
      </View>
    </RoleScreenShell>
  );
}
