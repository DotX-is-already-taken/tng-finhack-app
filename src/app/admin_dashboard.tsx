import { useAccount } from "@/context/AccountContext";
import { activities } from "@/mockData/admin_dashboard";
import styles from "@/styles/admin_dashboard";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type AdminDashboardSectionProps = {
  onSwitchToPersonal?: () => void;
};

const policyUIMap: Record<
  string,
  { icon: string; bg: string; border: string }
> = {
  medical: { icon: "🏥", bg: "#FDECEC", border: "#FBCACA" },
  transport: { icon: "🚗", bg: "#ECF2FF", border: "#C5D8FF" },
  meals: { icon: "🍽️", bg: "#FFF7E8", border: "#F9E0B0" },
  accomodation: { icon: "🏨", bg: "#F5F3FF", border: "#DDD6FE" },
  "gym/wellness": { icon: "💪", bg: "#ECFDF3", border: "#C5F2D8" },
  "phone/internet": { icon: "📱", bg: "#F0F9FF", border: "#B9E6FE" },
};

export function AdminDashboardSection({}: Readonly<AdminDashboardSectionProps>) {
  const router = useRouter();
  const { tenantOverview, tenantPools } = useAccount();

  const displayPools = tenantPools && tenantPools.length > 0 ? tenantPools : [];

  return (
    <View style={styles.wrapper}>
      <View style={styles.statsHeaderCard}>
        <Text style={styles.statsLabel}>Total Allowance Distributed</Text>
        <Text style={styles.statsValue}>
          {tenantOverview?.currency === "MYR"
            ? "RM"
            : tenantOverview?.currency || "RM"}{" "}
          {tenantOverview?.total_allowance_allocated
            ? tenantOverview.total_allowance_allocated.toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )
            : "0.00"}
        </Text>
        <View style={styles.statsGrid}>
          <View style={styles.statsMiniCard}>
            <Text style={styles.statsMiniLabel}>Active Employees</Text>
            <Text style={styles.statsMiniValue}>
              {tenantOverview?.active_employee_count ?? 0}
            </Text>
          </View>
          <View style={styles.statsMiniCard}>
            <Text style={styles.statsMiniLabel}>Active Pools</Text>
            <Text style={styles.statsMiniValue}>
              {tenantOverview?.active_pool_count ?? 0}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={[styles.actionTile, { backgroundColor: "#EDF4FF" }]}
            activeOpacity={0.8}
            onPress={() => router.push("/create_master_policy")}
          >
            <Text style={styles.actionEmoji}>➕</Text>
            <Text style={styles.actionTitle}>Create Master Policy</Text>
            <Text style={styles.actionSub}>Set up new master policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionTile, { backgroundColor: "#F3EEFF" }]}
            activeOpacity={0.8}
            onPress={() => router.push("/add_employee")}
          >
            <Text style={styles.actionEmoji}>👥</Text>
            <Text style={styles.actionTitle}>Add Employee</Text>
            <Text style={styles.actionSub}>Assign to pool</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={[styles.actionTile, { backgroundColor: "#EDF4FF" }]}
            activeOpacity={0.8}
            onPress={() => router.push("/create_policy_group")}
          >
            <Text style={styles.actionEmoji}>➕</Text>
            <Text style={styles.actionTitle}>Create Policy Group</Text>
            <Text style={styles.actionSub}>Set up new policy group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionTile, { backgroundColor: "#F3EEFF" }]}
            activeOpacity={0.8}
            onPress={() => router.push("/create_pool")}
          >
            <Text style={styles.actionEmoji}>👥</Text>
            <Text style={styles.actionTitle}>Create Pool</Text>
            <Text style={styles.actionSub}>Set up new pool</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pool_card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Active Pools</Text>
        </View>

        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 2 }}
        >
          {displayPools.length > 0 ? (
            displayPools.map((pool) => {
              const ui = policyUIMap[pool.category] || {
                icon: "💰",
                bg: "#F9FAFB",
                border: "#E5E7EB",
              };
              const currency = pool.currency || "RM";

              return (
                <TouchableOpacity
                  key={pool.pool_id}
                  activeOpacity={0.7}
                  style={[
                    styles.poolCardItem,
                    { backgroundColor: ui.bg, borderColor: ui.border },
                  ]}
                >
                  <View style={styles.poolTopRow}>
                    <View style={styles.poolIconWrap}>
                      <Text style={styles.poolIcon}>{ui.icon}</Text>
                    </View>
                    <View style={styles.poolTitleWrap}>
                      <Text style={styles.poolTitle}>{pool.pool_name}</Text>
                    </View>
                  </View>
                  <View style={styles.poolStatsGrid}>
                    <View style={styles.poolStatBox}>
                      <Text style={styles.poolStatLabel}>Allocated</Text>
                      <Text style={styles.poolStatValue}>
                        {currency} {(pool.total_limit || 0).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.poolStatBox}>
                      <Text style={styles.poolStatLabel}>Used</Text>
                      <Text style={styles.poolStatValue}>
                        {currency} {(pool.used_amount || 0).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.poolStatBox}>
                      <Text style={styles.poolStatLabel}>Remaining</Text>
                      <Text
                        style={[styles.poolStatValue, styles.remainingValue]}
                      >
                        {currency}{" "}
                        {(pool.remaining_limit || 0).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text
              style={{ textAlign: "center", padding: 20, color: "#6B7280" }}
            >
              No active pools found
            </Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        {activities.map((item) => (
          <View key={item.id} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: item.bg }]}>
              <Text>{item.icon}</Text>
            </View>
            <View style={styles.activityTextWrap}>
              <Text style={styles.activityText}>{item.text}</Text>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function AdminDashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
    >
      <AdminDashboardSection onSwitchToPersonal={() => router.push("/")} />
    </ScrollView>
  );
}
