import { Text, View } from "react-native";

const statusColors: Record<string, { backgroundColor: string; color: string; borderColor: string }> = {
  Placed: { backgroundColor: "#F5F5F2", color: "#111111", borderColor: "#E4E4DF" },
  Accepted: { backgroundColor: "#EEF8F0", color: "#1E5D35", borderColor: "#CDE9D4" },
  Packed: { backgroundColor: "#ECF6F0", color: "#0F5132", borderColor: "#BEE3CB" },
  "Ready For Pickup": { backgroundColor: "#E7F6EE", color: "#0B6B3A", borderColor: "#A8DFC0" },
  "Picked Up": { backgroundColor: "#E8F4EA", color: "#146B3A", borderColor: "#B4E0C2" },
  Delivered: { backgroundColor: "#EAF7EC", color: "#0E6F2C", borderColor: "#B8E4C0" },
};

export function StatusBadge({ status, compact = false }: { status: string; compact?: boolean }) {
  const palette = statusColors[status] ?? statusColors.Placed;

  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: compact ? 10 : 12,
        paddingVertical: compact ? 5 : 6,
        borderRadius: 999,
        backgroundColor: palette.backgroundColor,
        borderWidth: 1,
        borderColor: palette.borderColor,
      }}
    >
      <Text style={{ color: palette.color, fontSize: compact ? 11 : 12, fontWeight: "700" }}>{status}</Text>
    </View>
  );
}
