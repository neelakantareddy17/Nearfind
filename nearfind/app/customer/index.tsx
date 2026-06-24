import { router } from "expo-router";
import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { Button } from "../../components/Button";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders, mockProducts } from "../../lib/mockData";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function CustomerDashboard() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error);
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
          <View style={{ flexDirection: "row", gap: SPACING.md }}>
            <Button
              label="Search"
              onPress={() => router.push("/customer/search")}
              variant="primary"
              size="medium"
              fullWidth
            />
            <Button
              label="Orders"
              onPress={() => router.push("/customer/orders")}
              variant="secondary"
              size="medium"
              fullWidth
            />
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
          <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.md }}>Recent</Text>
          {mockOrders.slice(0, 2).map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      </View>
    </RoleScreenShell>
  );
}
