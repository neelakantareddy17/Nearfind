import { Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { subscribeInventory } from "../../services/inventoryService";
import { updateStock } from "../../services/inventoryUpdateService";

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
      subtitle="Manage stock levels."
      showBack
    >
      <View style={{ gap: 16 }}>
        {items.map((item) => (
          <View
            key={item.id}
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
              {item.productName}
            </Text>

            <Text
              style={{
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              Stock: {item.stock}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Pressable
                onPress={() =>
                  updateStock(item.id, 1)
                }
                style={{
                  backgroundColor: "#1E7A43",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  +1
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  updateStock(item.id, 5)
                }
                style={{
                  backgroundColor: "#2980B9",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  +5
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  updateStock(item.id, 10)
                }
                style={{
                  backgroundColor: "#111111",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  +10
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </RoleScreenShell>
  );
}