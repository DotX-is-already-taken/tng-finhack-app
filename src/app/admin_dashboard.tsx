import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type AdminDashboardSectionProps = {
  onSwitchToPersonal?: () => void;
};

const pools = [
  {
    id: "medical",
    icon: "🏥",
    name: "Medical Allowance",
    subtitle: "24 employees - RM 600/month each",
    allocated: "RM 14,400",
    used: "RM 3,600",
    remaining: "RM 10,800",
    bg: "#FDECEC",
    border: "#FBCACA",
  },
  {
    id: "gym",
    icon: "💪",
    name: "Gym / Wellness",
    subtitle: "24 employees - RM 300/month each",
    allocated: "RM 7,200",
    used: "RM 2,880",
    remaining: "RM 4,320",
    bg: "#ECFDF3",
    border: "#C5F2D8",
  },
  {
    id: "meals",
    icon: "🍽️",
    name: "Meals Allowance",
    subtitle: "24 employees - RM 500/month each",
    allocated: "RM 12,000",
    used: "RM 6,720",
    remaining: "RM 5,280",
    bg: "#FFF7E8",
    border: "#F9E0B0",
  },
];

const activities = [
  {
    id: "1",
    icon: "👥",
    text: "Added 3 new employees to Medical pool",
    time: "2 hours ago",
    bg: "#E8F5E9",
  },
  {
    id: "2",
    icon: "💰",
    text: "Topped up Meals pool with RM 5,000",
    time: "1 day ago",
    bg: "#E3F2FD",
  },
  {
    id: "3",
    icon: "⚠️",
    text: "Gym pool running low - RM 4,320 remaining",
    time: "2 days ago",
    bg: "#FFF3E0",
  },
];

export function AdminDashboardSection({
  onSwitchToPersonal,
}: Readonly<AdminDashboardSectionProps>) {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.statsHeaderCard}>
        <Text style={styles.statsLabel}>Total Allowance Distributed</Text>
        <Text style={styles.statsValue}>RM 45,750.00</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statsMiniCard}>
            <Text style={styles.statsMiniLabel}>Active Employees</Text>
            <Text style={styles.statsMiniValue}>24</Text>
          </View>
          <View style={styles.statsMiniCard}>
            <Text style={styles.statsMiniLabel}>Active Pools</Text>
            <Text style={styles.statsMiniValue}>3</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={[styles.actionTile, { backgroundColor: "#EDF4FF" }]}
            activeOpacity={0.8}
            onPress={() => router.push("/create_pool")}
          >
            <Text style={styles.actionEmoji}>➕</Text>
            <Text style={styles.actionTitle}>Create Pool</Text>
            <Text style={styles.actionSub}>Set up new allowance</Text>
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
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Active Pools</Text>
          <TouchableOpacity activeOpacity={0.7}
          onPress={() => router.push("/allowance_details")}
          >
            <Text style={styles.linkText}>View All</Text>
          </TouchableOpacity>
        </View>

        {pools.map((pool) => (
          <TouchableOpacity
            key={pool.id}
            activeOpacity={0.85}
            onPress={() => router.push(`/allowance_details?type=${pool.id}`)}
            style={[
              styles.poolCard,
              { backgroundColor: pool.bg, borderColor: pool.border },
            ]}
          >
            <View style={styles.poolTopRow}>
              <View style={styles.poolIconWrap}>
                <Text style={styles.poolIcon}>{pool.icon}</Text>
              </View>
              <View style={styles.poolTitleWrap}>
                <Text style={styles.poolTitle}>{pool.name}</Text>
                <Text style={styles.poolSub}>{pool.subtitle}</Text>
              </View>
            </View>
            <View style={styles.poolStatsGrid}>
              <View style={styles.poolStatBox}>
                <Text style={styles.poolStatLabel}>Allocated</Text>
                <Text style={styles.poolStatValue}>{pool.allocated}</Text>
              </View>
              <View style={styles.poolStatBox}>
                <Text style={styles.poolStatLabel}>Used</Text>
                <Text style={styles.poolStatValue}>{pool.used}</Text>
              </View>
              <View style={styles.poolStatBox}>
                <Text style={styles.poolStatLabel}>Remaining</Text>
                <Text style={[styles.poolStatValue, styles.remainingValue]}>
                  {pool.remaining}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  screenContent: {
    paddingBottom: 24,
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  statsHeaderCard: {
    backgroundColor: "#1565C0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  statsLabel: {
    color: "#D2E7FF",
    fontSize: 12,
    marginBottom: 4,
  },
  statsValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statsMiniCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: 10,
  },
  statsMiniLabel: {
    color: "#D2E7FF",
    fontSize: 11,
  },
  statsMiniValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#1A1A1A",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  linkText: {
    color: "#1976D2",
    fontSize: 12,
    fontWeight: "700",
  },
  quickActionsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  actionTile: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
  },
  actionEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  actionTitle: {
    fontSize: 13,
    color: "#263238",
    fontWeight: "700",
  },
  actionSub: {
    fontSize: 11,
    color: "#607D8B",
    marginTop: 2,
  },
  poolCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  poolTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  poolIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  poolIcon: {
    fontSize: 18,
  },
  poolTitleWrap: {
    flex: 1,
  },
  poolTitle: {
    fontSize: 13,
    color: "#1F2937",
    fontWeight: "700",
  },
  poolSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
  },
  poolStatsGrid: {
    flexDirection: "row",
    gap: 6,
  },
  poolStatBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  poolStatLabel: {
    fontSize: 10,
    color: "#6B7280",
  },
  poolStatValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 2,
  },
  remainingValue: {
    color: "#1F9D55",
  },
  activityRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  activityIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityText: {
    color: "#263238",
    fontSize: 12,
    fontWeight: "600",
  },
  activityTime: {
    color: "#90A4AE",
    fontSize: 11,
    marginTop: 2,
  },
  bottomNavCard: {
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
  },
  bottomIcon: {
    fontSize: 17,
    color: "#90A4AE",
  },
  bottomText: {
    marginTop: 2,
    fontSize: 11,
    color: "#90A4AE",
    fontWeight: "600",
  },
  bottomActive: {
    color: "#1976D2",
  },
});
