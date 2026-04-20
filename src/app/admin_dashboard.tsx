import { activities, pools } from "@/mockData/admin_dashboard";
import styles from "@/styles/admin_dashboard";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type AdminDashboardSectionProps = {
  onSwitchToPersonal?: () => void;
};

export function AdminDashboardSection({}: Readonly<AdminDashboardSectionProps>) {
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
            onPress={() => router.push("/create_pool")}
          >
            <Text style={styles.actionEmoji}>➕</Text>
            <Text style={styles.actionTitle}>Create Policy Group</Text>
            <Text style={styles.actionSub}>Set up new policy group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionTile, { backgroundColor: "#F3EEFF" }]}
            activeOpacity={0.8}
            onPress={() => router.push("/add_employee")}
          >
            <Text style={styles.actionEmoji}>👥</Text>
            <Text style={styles.actionTitle}>Create Pool</Text>
            <Text style={styles.actionSub}>Set up new pool</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Active Pools</Text>
          <TouchableOpacity
            activeOpacity={0.7}
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
