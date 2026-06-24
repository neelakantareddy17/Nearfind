import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockRetailers } from "../../lib/mockData";
import { updateOrderStatus } from "../../services/orderUpdateService";
import { subscribeRetailerOrders } from "../../services/retailerService";

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
      subtitle="Handle incoming orders with a calm, offline-first workflow."
    >
      <View style={{ gap: 18 }}>
        <View
          style={{
            backgroundColor: "#E9F7EF",
            borderRadius: 22,
            padding: 16,
            borderWidth: 1,
            borderColor: "#CDE9D4",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: "#1E7A43",
              fontWeight: "800",
              marginBottom: 6,
            }}
          >
            Retailers
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#2D5E3A",
              lineHeight: 22,
            }}
          >
            {mockRetailers.join(" • ")}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/retailer/orders")}
          style={{
            borderRadius: 18,
            paddingVertical: 14,
            backgroundColor: "#111111",
            alignItems: "center",
            minHeight: 44,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "800",
            }}
          >
            Manage incoming orders
          </Text>
        </Pressable>

        {orders.map((order) => (
          <View
            key={order.id}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 18,
              padding: 16,
              borderWidth: 1,
              borderColor: "#E8E8E3",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              {order.productName}
            </Text>

            <Text>Customer: {order.customerName}</Text>

            <Text
              style={{
                marginTop: 8,
                fontWeight: "600",
              }}
            >
              Status: {order.status}
            </Text>

            {order.status === "PLACED" && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                <Pressable
                  onPress={() =>
                    updateOrderStatus(order.id, "ACCEPTED")
                  }
                  style={{
                    backgroundColor: "#1E7A43",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>
                    Accept
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>
                    updateOrderStatus(order.id, "REJECTED")
                  }
                  style={{
                    backgroundColor: "#D9534F",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>
                    Reject
                  </Text>
                </Pressable>
              </View>
            )}

            {order.status === "ACCEPTED" && (
              <Pressable
                onPress={() =>
                  updateOrderStatus(order.id, "PACKED")
                }
                style={{
                  marginTop: 12,
                  backgroundColor: "#F39C12",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  Packed
                </Text>
              </Pressable>
            )}

            {order.status === "PACKED" && (
              <Pressable
                onPress={() =>
                  updateOrderStatus(order.id, "READY_FOR_PICKUP")
                }
                style={{
                  marginTop: 12,
                  backgroundColor: "#2980B9",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignSelf: "flex-start",
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  Ready For Pickup
                </Text>
              </Pressable>
            )}
          </View>
        ))}
      </View>
    </RoleScreenShell>
  );
}