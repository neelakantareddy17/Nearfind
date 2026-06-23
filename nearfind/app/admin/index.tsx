import { Text, View } from "react-native";

import { RoleScreenShell } from "../../components/RoleScreenShell";
import { StatusBadge } from "../../components/StatusBadge";
import { mockOrders, mockProducts, mockRetailers, mockStatuses } from "../../lib/mockData";

export default function AdminDashboard() {
  return (
    <RoleScreenShell
      role="admin"
      activeTab="home"
      roleHomeLabel="Home"
      title="Admin Dashboard"
      subtitle="High-level marketplace overview with mock metrics only."
    >
      <View style={{ gap: 18 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          <View style={{ flexGrow: 1, minWidth: 150, backgroundColor: "#FFFFFF", borderRadius: 22, padding: 16, borderWidth: 1, borderColor: "#E8E8E3" }}>
            <Text style={{ fontSize: 13, color: "#8A8A84", marginBottom: 8 }}>Products</Text>
            <Text style={{ fontSize: 30, fontWeight: "900", color: "#111111" }}>{mockProducts.length}</Text>
          </View>
          <View style={{ flexGrow: 1, minWidth: 150, backgroundColor: "#FFFFFF", borderRadius: 22, padding: 16, borderWidth: 1, borderColor: "#E8E8E3" }}>
            <Text style={{ fontSize: 13, color: "#8A8A84", marginBottom: 8 }}>Retailers</Text>
            <Text style={{ fontSize: 30, fontWeight: "900", color: "#111111" }}>{mockRetailers.length}</Text>
          </View>
          <View style={{ flexGrow: 1, minWidth: 150, backgroundColor: "#FFFFFF", borderRadius: 22, padding: 16, borderWidth: 1, borderColor: "#E8E8E3" }}>
            <Text style={{ fontSize: 13, color: "#8A8A84", marginBottom: 8 }}>Statuses</Text>
            <Text style={{ fontSize: 30, fontWeight: "900", color: "#111111" }}>{mockStatuses.length}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#E8E8E3" }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: "#111111", marginBottom: 12 }}>System statuses</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {mockStatuses.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </View>
        </View>

        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, borderWidth: 1, borderColor: "#E8E8E3" }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: "#111111", marginBottom: 12 }}>Activity snapshot</Text>
          {mockOrders.slice(0, 3).map((order) => (
            <View key={order.id} style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 15, fontWeight: "800", color: "#111111" }}>{order.title}</Text>
              <Text style={{ fontSize: 13, color: "#666660", marginTop: 4 }}>{order.retailer}</Text>
            </View>
          ))}
        </View>
      </View>
    </RoleScreenShell>
  );
}
