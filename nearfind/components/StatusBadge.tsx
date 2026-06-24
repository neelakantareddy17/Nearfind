import { Text, View } from "react-native";
import { COLORS, SPACING, RADIUS } from "../lib/theme";

const statusColors: Record<string, { backgroundColor: string; color: string; borderColor: string }> = {
  Placed: { backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border },
  Accepted: { backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border },
  Packed: { backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border },
  "Ready For Pickup": { backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border },
  "Picked Up": { backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border },
  Delivered: { backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border },
};

export function StatusBadge({ status, compact = false }: { status: string; compact?: boolean }) {
  const palette = statusColors[status] ?? statusColors.Placed;

  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: compact ? SPACING.sm : SPACING.md,
        paddingVertical: compact ? SPACING.xs : SPACING.sm,
        borderRadius: RADIUS.pill,
        backgroundColor: palette.backgroundColor,
        borderWidth: 1,
        borderColor: palette.borderColor,
      }}
    >
      <Text style={{ color: palette.color, fontSize: compact ? 11 : 12, fontWeight: "500" }}>{status}</Text>
    </View>
  );
}
