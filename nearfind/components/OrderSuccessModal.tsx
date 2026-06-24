import { useEffect } from "react";
import { Modal, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { COLORS, SPACING, RADIUS } from "../lib/theme";

interface OrderSuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export function OrderSuccessModal({ visible, onDismiss }: OrderSuccessModalProps) {
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
          <Text style={styles.title}>Order Placed Successfully</Text>
          <Text style={styles.subtitle}>Your order has been confirmed and sent to the retailer.</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    alignItems: "center",
    maxWidth: 280,
  },
  checkmark: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  checkmarkText: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.text,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
