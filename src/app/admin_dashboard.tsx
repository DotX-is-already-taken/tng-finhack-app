import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "@/styles/admin_dashboard";

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
