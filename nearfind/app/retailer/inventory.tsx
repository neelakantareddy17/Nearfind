import { Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { Button } from "../../components/Button";
import { subscribeInventory } from "../../services/inventoryService";
import { updateStock } from "../../services/inventoryUpdateService";
import { COLORS, RADIUS, SPACING } from "../../lib/theme";

export default function RetailerInventoryScreen() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeInventory(setItems);

    return unsubscribe;
  }, []);

  return (
    <RoleScreenShell
      role="retailer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Inventory"
      subtitle="Manage stock levels"
      showBack
    >
      <View style={{ gap: SPACING.lg }}>
        {items.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: COLORS.card,
              padding: SPACING.lg,
              borderRadius: RADIUS.card,
              borderWidth: 1,
              borderColor: COLORS.border,
            }}
          >
            {/* Product Info */}
            <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.text, marginBottom: SPACING.md }}>
              {item.productName}
            </Text>

            <Text style={{ fontSize: 14, color: COLORS.textSecondary, fontWeight: "500", marginBottom: SPACING.lg }}>
              Stock: {item.stock}
            </Text>

            {/* Restock Buttons */}
            <View style={{ flexDirection: "row", gap: SPACING.md }}>
              <Pressable
                onPress={() => updateStock(item.id, 1)}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    backgroundColor: COLORS.surface,
                    borderRadius: RADIUS.button,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    paddingVertical: SPACING.md,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={{ color: COLORS.text, fontWeight: "600", fontSize: 14 }}>+1</Text>
              </Pressable>

              <Pressable
                onPress={() => updateStock(item.id, 5)}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    backgroundColor: COLORS.surface,
                    borderRadius: RADIUS.button,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    paddingVertical: SPACING.md,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={{ color: COLORS.text, fontWeight: "600", fontSize: 14 }}>+5</Text>
              </Pressable>

              <Pressable
                onPress={() => updateStock(item.id, 10)}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    backgroundColor: COLORS.text,
                    borderRadius: RADIUS.button,
                    paddingVertical: SPACING.md,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14 }}>+10</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </RoleScreenShell>
  );
}