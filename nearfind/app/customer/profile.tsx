import { router } from "expo-router";
import { Text, Pressable, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { useAuth } from "../../context/AuthContext";

export default function CustomerProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <RoleScreenShell
      role="customer"
      activeTab="profile"
      roleHomeLabel="Home"
      title="Profile"
      subtitle="Manage your mock customer account."
      showBack
    >
      <View style={{ gap: 18 }}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 24, borderWidth: 1, borderColor: "#E8E8E3", padding: 18, gap: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: "900", color: "#111111" }}>{user?.name ?? "Customer User"}</Text>
          <Text style={{ fontSize: 14, color: "#5F5F58" }}>{user?.email ?? "customer@nearfind.com"}</Text>
          <Text style={{ fontSize: 14, color: "#1E7A43", fontWeight: "800" }}>Role: {user?.role ?? "customer"}</Text>
          <Text style={{ fontSize: 13, lineHeight: 20, color: "#5F5F58" }}>
            This profile is powered by mock auth and will be easy to swap with Firebase Auth later.
          </Text>
        </View>

        <View style={{ backgroundColor: "#E9F7EF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#CDE9D4", gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: "900", color: "#111111" }}>Account info</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>UID: {user?.uid ?? "customer-uid"}</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>Saved addresses: 1</Text>
          <Text style={{ color: "#2F5D3D", fontSize: 13 }}>Payment methods: 0 mock cards</Text>
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