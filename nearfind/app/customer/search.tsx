import { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { Button } from "../../components/Button";
import { OrderSuccessModal } from "../../components/OrderSuccessModal";
import { subscribeInventory } from "../../services/inventoryService";
import { createOrder } from "../../services/orderService";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function CustomerSearchScreen() {
  const [query, setQuery] = useState("");
  const [inventory, setInventory] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

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
  }, [query, inventory]);

  const handleCreateOrder = async (item: any) => {
    try {
      await createOrder(item);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RoleScreenShell
      role="customer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Search"
      subtitle="Browse nearby retailers"
      showBack
    >
      <OrderSuccessModal visible={showSuccess} onDismiss={() => setShowSuccess(false)} />

      <View style={{ gap: SPACING.lg }}>
        {/* Search Box */}
        <View style={{ backgroundColor: COLORS.card, borderRadius: RADIUS.input, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md }}>
          <Text style={{ fontSize: 12, fontWeight: "500", color: COLORS.text, marginBottom: SPACING.sm }}>Search products</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Maggi, Milk, Bread..."
            placeholderTextColor={COLORS.textSecondary}
            style={{ fontSize: 15, color: COLORS.text, minHeight: 40, fontWeight: "400" }}
          />
        </View>

        {/* Results count */}
        <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text }}>{filteredProducts.length} results</Text>

        {/* Product List */}
        {filteredProducts.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: COLORS.card,
              padding: SPACING.lg,
              borderRadius: RADIUS.card,
              borderWidth: 1,
              borderColor: COLORS.border,
              gap: SPACING.md,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.sm }}>{item.productName}</Text>
              <Text style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: "400" }}>{item.retailerName}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "500", color: COLORS.text }}>₹{item.price}</Text>
                <Text style={{ fontSize: 12, color: COLORS.textSecondary, fontWeight: "400", marginTop: SPACING.xs }}>
                  Stock: {item.stock}
                </Text>
              </View>
            </View>

            {item.stock > 0 ? (
              <Button
                label="Order"
                onPress={() => handleCreateOrder(item)}
                variant="primary"
                size="medium"
                fullWidth
              />
            ) : (
              <Button
                label="Out of Stock"
                onPress={() => {}}
                variant="secondary"
                size="medium"
                fullWidth
                disabled
              />
            )}
          </View>
        ))}
      </View>
    </RoleScreenShell>
  );
}
