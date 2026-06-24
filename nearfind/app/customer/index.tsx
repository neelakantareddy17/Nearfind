import { router } from "expo-router";
import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { Button } from "../../components/Button";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { subscribeCustomerOrders } from "../../services/customerOrderService";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function CustomerDashboard() {
  const [products, setProducts] = useState<any[]>([]);
const [recentOrders, setRecentOrders] =
  useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);
  useEffect(() => {
  const unsubscribe =
    subscribeCustomerOrders(
      setRecentOrders
    );

  return unsubscribe;
}, []);

  return (
    <RoleScreenShell
      role="customer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Customer Dashboard"
      subtitle="Browse, order, and track"
    >
      <View style={{ gap: SPACING.lg }}>
        {/* CTA Section */}
        <View style={{ backgroundColor: COLORS.card, borderRadius: RADIUS.card, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border }}>
          <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.lg }}>
            Start shopping or track your orders
          </Text>
       <View>
  <Text
    style={{
      fontSize: 14,
      color: COLORS.textSecondary,
    }}
  >
    Browse products using Search below and
    track your orders in real time.
  </Text>
</View>
        </View>

        {/* Featured Products */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.md }}>Featured</Text>
          {products.length === 0 ? (
            <Text style={{ color: COLORS.textSecondary, fontWeight: "400" }}>Loading products...</Text>
          ) : (
            products.slice(0, 3).map((product) => (
              <View
                key={product.id}
                style={{
                  backgroundColor: COLORS.card,
                  padding: SPACING.lg,
                  borderRadius: RADIUS.card,
                  marginBottom: SPACING.md,
                  borderWidth: 1,
                  borderColor: COLORS.border,
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.xs }}>
                  {product.name}
                </Text>
                <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: "400" }}>
                  ₹{product.price}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Recent Orders */}
        <View>
  <Text
    style={{
      fontSize: 16,
      fontWeight: "600",
      color: COLORS.text,
      marginBottom: SPACING.md,
    }}
  >
    Recent Orders
  </Text>

  {recentOrders.length === 0 ? (
    <Text
      style={{
        color: COLORS.textSecondary,
      }}
    >
      No orders yet
    </Text>
  ) : (
    recentOrders
      .slice(0, 3)
      .map((order) => (
        <View
          key={order.id}
          style={{
            backgroundColor:
              COLORS.card,
            padding: SPACING.lg,
            borderRadius:
              RADIUS.card,
            marginBottom:
              SPACING.md,
            borderWidth: 1,
            borderColor:
              COLORS.border,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            {order.productName}
          </Text>

          <Text>
            {order.status}
          </Text>
        </View>
      ))
  )}
</View>
      </View>
    </RoleScreenShell>
  );
}
