import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { ProductCard } from "../../components/ProductCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders, mockProducts } from "../../lib/mockData";

export default function CustomerDashboard() {
  return (
    <RoleScreenShell
      role="customer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Customer Dashboard"
      subtitle="Browse nearby essentials and keep track of your live order flow."
    >
      <View style={{ gap: 18 }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#E8E8E3" }}>
          <Text style={{ fontSize: 18, lineHeight: 26, fontWeight: "800", color: "#111111", marginBottom: 10 }}>
            Search, order, and track from one clean dashboard.
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={() => router.push("/customer/search")}
              style={{ flex: 1, borderRadius: 18, paddingVertical: 14, backgroundColor: "#111111", alignItems: "center", minHeight: 44, justifyContent: "center" }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>Search products</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/customer/orders")}
              style={{ flex: 1, borderRadius: 18, paddingVertical: 14, backgroundColor: "#E9F7EF", borderWidth: 1, borderColor: "#CDE9D4", alignItems: "center", minHeight: 44, justifyContent: "center" }}
            >
              <Text style={{ color: "#1E7A43", fontWeight: "800" }}>Track orders</Text>
            </Pressable>
          </View>
        </View>

        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111", marginBottom: 12 }}>Featured products</Text>
        {mockProducts.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111", marginTop: 8, marginBottom: 12 }}>Recent orders</Text>
        {mockOrders.slice(0, 2).map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}
