import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { useAuth } from "../../context/AuthContext";

export default function RetailerProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <RoleScreenShell
      role="retailer"
      activeTab="profile"
      roleHomeLabel="Home"
      title="Profile"
      subtitle="Manage your mock retailer account."
      showBack
    >
      <View style={{ gap: 18 }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 24, borderWidth: 1, borderColor: "#E8E8E3", padding: 18, gap: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: "900", color: "#111111" }}>{user?.name ?? "Retailer User"}</Text>
          <Text style={{ fontSize: 14, color: "#5F5F58" }}>{user?.email ?? "retailer@nearfind.com"}</Text>
          <Text style={{ fontSize: 14, color: "#1E7A43", fontWeight: "800" }}>Role: {user?.role ?? "retailer"}</Text>
        </View>

        <View style={{ backgroundColor: "#E9F7EF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#CDE9D4", gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "900", color: "#111111" }}>Store details</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>UID: {user?.uid ?? "retailer-uid"}</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>Outlet status: Open</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>Packing queue: 2 orders</Text>
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