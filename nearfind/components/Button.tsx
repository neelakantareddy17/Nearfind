import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../lib/theme";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: any;
}

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.baseButton,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text
            style={[
              styles.baseText,
              styles[`text_${variant}`],
              styles[`textSize_${size}`],
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: RADIUS.button,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontWeight: "500",
    textAlign: "center",
  },
  
  // Variants
  variant_primary: {
    backgroundColor: COLORS.text,
  },
  variant_secondary: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  variant_ghost: {
    backgroundColor: "transparent",
  },
  
  // Sizes
  size_small: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  size_medium: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  size_large: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  
  // Text sizes
  textSize_small: {
    fontSize: 13,
  },
  textSize_medium: {
    fontSize: 15,
  },
  textSize_large: {
    fontSize: 16,
  },
  
  // Text colors
  text_primary: {
    color: "#FFFFFF",
  },
  text_secondary: {
    color: COLORS.text,
  },
  text_ghost: {
    color: COLORS.text,
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  
  // Full width
  fullWidth: {
    width: "100%",
  },
});
