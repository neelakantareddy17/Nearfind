import { Text, View } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { RoleScreenShell } from "../../components/RoleScreenShell";
import { mockOrders } from "../../lib/mockData";

export default function AdminOrdersScreen() {
  return (
    <RoleScreenShell
      role="admin"
      activeTab="orders"
      roleHomeLabel="Home"
      title="Orders"
      subtitle="All orders system-wide."
      showBack
    >
      <View style={{ gap: 18 }}>
        {mockOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
    </RoleScreenShell>
  );
}