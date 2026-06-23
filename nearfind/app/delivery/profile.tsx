import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { useAuth } from "../../context/AuthContext";

export default function DeliveryProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <RoleScreenShell
      role="delivery"
      activeTab="profile"
      roleHomeLabel="Home"
      title="Profile"
      subtitle="Manage your mock delivery account."
      showBack
    >
      <View style={{ gap: 18 }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 24, borderWidth: 1, borderColor: "#E8E8E3", padding: 18, gap: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: "900", color: "#111111" }}>{user?.name ?? "Delivery User"}</Text>
          <Text style={{ fontSize: 14, color: "#5F5F58" }}>{user?.email ?? "delivery@nearfind.com"}</Text>
          <Text style={{ fontSize: 14, color: "#1E7A43", fontWeight: "800" }}>Role: {user?.role ?? "delivery"}</Text>
        </View>

        <View style={{ backgroundColor: "#E9F7EF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#CDE9D4", gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "900", color: "#111111" }}>Rider summary</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>UID: {user?.uid ?? "delivery-uid"}</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>Accepted runs: 1</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>Completed today: 3</Text>
        </View>

        <Pressable
          onPress={async () => {
            await signOut();
            router.replace("/");
          }}
          style={{ minHeight: 44, borderRadius: 18, backgroundColor: "#111111", alignItems: "center", justifyContent: "center", paddingVertical: 14 }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>Sign out</Text>
        </Pressable>
      </View>
    </RoleScreenShell>
  );
}