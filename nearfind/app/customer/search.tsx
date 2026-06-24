import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { ProductCard } from "../../components/ProductCard";
import { subscribeInventory } from "../../services/inventoryService";
import { createOrder } from "../../services/orderService";
export default function CustomerSearchScreen() {
  const [query, setQuery] = useState("");
const [inventory, setInventory] = useState<any[]>([]);

useEffect(() => {
  const unsubscribe =
    subscribeInventory(setInventory);

  return unsubscribe;
}, []);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return inventory;
    }

    return inventory.filter((item) =>
  item.productName?.toLowerCase().includes(normalized)
);
  }, [query,inventory]);

  return (
    <RoleScreenShell
      role="customer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Search"
      subtitle="Browse mock inventory from nearby retailers."
      showBack
    >
      <View style={{ gap: 18 }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#E8E8E3", paddingHorizontal: 16, paddingVertical: 12 }}>
          <Text style={{ fontSize: 13, fontWeight: "800", color: "#111111", marginBottom: 8 }}>Search products</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Maggi, Milk, Bread..."
            placeholderTextColor="#9A9A94"
            style={{ fontSize: 15, color: "#111111", minHeight: 44 }}
          />
        </View>

        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111" }}>{filteredProducts.length} results</Text>

        {filteredProducts.map((item) => (
  <View
    key={item.id}
    style={{
      backgroundColor: "#FFFFFF",
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#E8E8E3",
      gap: 8,
    }}
  >
    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
      }}
    >
      {item.productName}
    </Text>

    <Text>
      {item.retailerName}
    </Text>

    <Text>
      ₹{item.price}
    </Text>

    <Text>
  Stock: {item.stock}
</Text>

{item.stock <= 0 && (
  <Text
    style={{
      color: "#D9534F",
      fontWeight: "700",
      marginTop: 4,
    }}
  >
    Out of Stock
  </Text>
)}
    <Pressable
    
  disabled={item.stock <= 0}
  onPress={async () => {
    try {
      await createOrder(item);
      alert("Order placed successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  }}
      style={{
        marginTop: 8,
      backgroundColor:
  item.stock <= 0
    ? "#BDBDBD"
    : "#111111",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      <Text
  style={{
    color: "#FFFFFF",
    fontWeight: "700",
  }}
>
  {item.stock <= 0
    ? "Out of Stock"
    : "Order"}
</Text>
    </Pressable>
  </View>
))}
      </View>
    </RoleScreenShell>
  );
}
