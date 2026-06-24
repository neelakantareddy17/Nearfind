import { Alert, Text, View } from "react-native";
import { router } from "expo-router";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { Button } from "../../components/Button";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";

export default function CartScreen() {
  const {
    items,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleOrderNow = async () => {
    try {
      for (const item of items) {
        for (
          let i = 0;
          i < item.quantity;
          i++
        ) {
          await createOrder(item);
        }
      }

      clearCart();

      Alert.alert(
        "Order Placed",
        "Your order has been placed successfully.",
        [
          {
            text: "OK",
            onPress: () =>
              router.push(
                "/customer/orders"
              ),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.message ??
          "Failed to place order."
      );
    }
  };

  return (
    <RoleScreenShell
      role="customer"
      activeTab="home"
      roleHomeLabel="Home"
      title="Cart"
      subtitle="Review your items"
      showBack
    >
      <View style={{ gap: 16 }}>
        {items.map((item: any) => (
          <View
            key={item.id}
            style={{
              backgroundColor: "#FFF",
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E5E5",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {item.productName}
            </Text>

            <Text>
              Qty: {item.quantity}
            </Text>

            <Text>
              ₹{item.price}
            </Text>

            <Button
              label="Remove"
              onPress={() =>
                removeFromCart(item.id)
              }
              variant="secondary"
            />
          </View>
        ))}

        {items.length > 0 && (
          <Button
            label="Order Now"
            onPress={handleOrderNow}
            variant="primary"
            fullWidth
          />
        )}
      </View>
    </RoleScreenShell>
  );
}