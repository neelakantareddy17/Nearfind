import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { ProductCard } from "../../components/ProductCard";
import { mockProducts } from "../../lib/mockData";

export default function CustomerSearchScreen() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return mockProducts;
    }

    return mockProducts.filter((product) =>
      [product.name, product.retailer, product.status].some((field) => field.toLowerCase().includes(normalized)),
    );
  }, [query]);

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

        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </RoleScreenShell>
  );
}
