import { Pressable, Text, View } from "react-native";

export function RoleCard({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E7E7E2",
        padding: 20,
        marginBottom: 14,
        transform: [{ scale: pressed ? 0.985 : 1 }],
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 2,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1, paddingRight: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "#111111", marginBottom: 6 }}>{title}</Text>
          <Text style={{ fontSize: 14, lineHeight: 20, color: "#5E5E58" }}>{description}</Text>
        </View>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: "#E9F7EF",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "800", color: "#1E7A43" }}>→</Text>
        </View>
      </View>
    </Pressable>
  );
}
