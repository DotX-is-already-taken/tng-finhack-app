import {
  getMasterPoliciesByTenantId,
  getPoolsByTenantId,
  getTenantByTenantId,
  getTenantPoliciesByTenantId,
} from "@/api/getTenant";
import { getAllowanceSummary } from "@/api/getUserAllowance";
import { useAccount } from "@/context/AccountContext";
import styles from "@/styles/home";
import { Progress } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AdminDashboardSection } from "../admin_dashboard";

const AllowanceItem = ({
  icon,
  title,
  amount,
  used,
  total,
  percentage,
}: any) => (
  <View style={styles.allowanceItem}>
    <View style={styles.allowanceItemHeader}>
      <View style={styles.allowanceItemTitle}>
        <View style={styles.allowanceItemIcon}>
          <Text>{icon}</Text>
        </View>
        <Text style={styles.allowanceItemName}>{title}</Text>
      </View>
      <Text style={styles.allowanceItemAmount}>{amount}</Text>
    </View>
    <View style={styles.progressContainer}>
      <Progress percent={percentage} />
    </View>
    <View style={styles.allowanceStats}>
      <Text style={styles.allowanceStatText}>Used {used}</Text>
      <Text style={styles.allowanceStatText}>of {total}</Text>
    </View>
  </View>
);

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    accountMode,
    setAccountMode,
    userData,
    userAllowanceSummary,
    setUserAllowanceSummary,
    clearAllowanceSummary,
    authData,
    userTenants,
    setTenantOverview,
    setTenantPolicies,
    setTenantPools,
    setTenantPoliciesList,
  } = useAccount();

  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isBusiness = accountMode === "business";

  const handleSwitchToBusiness = async () => {
    setShowAccountSwitcher(false);
    clearAllowanceSummary();
    setIsLoading(true);

    if (authData?.access_token && userTenants?.tenant_id) {
      try {
        const tenantData = await getTenantByTenantId(
          authData.access_token,
          userTenants.tenant_id,
        );
        setTenantOverview(tenantData);

        const policiesData = await getMasterPoliciesByTenantId(
          authData.access_token,
          userTenants.tenant_id,
        );

        // Transform the object into an array for the dashboard
        const policiesArray = Object.entries(policiesData)
          .filter(([key, value]) => key !== "tenant_id" && value !== null)
          .map(([key, value]: [string, any]) => ({
            id: key,
            name:
              key.charAt(0).toUpperCase() + key.slice(1).replace("/", " / "),
            ...value,
          }));

        setTenantPolicies(policiesArray);

        const poolsData = await getPoolsByTenantId(
          authData.access_token,
          userTenants.tenant_id,
        );
        setTenantPools(poolsData?.items || []);

        const policiesListData = await getTenantPoliciesByTenantId(
          authData.access_token,
          userTenants.tenant_id,
        );

        // Ensure we store an array
        const finalPoliciesList = Array.isArray(policiesListData)
          ? policiesListData
          : policiesListData?.items ||
            (policiesListData ? [policiesListData] : []);

        setTenantPoliciesList(finalPoliciesList);
      } catch (error) {
        console.error("Failed to fetch tenant data:", error);
      }
    }

    setAccountMode("business");
    setIsLoading(false);
  };

  const handleSwitchToPersonal = async () => {
    setShowAccountSwitcher(false);
    setIsLoading(true);

    if (authData?.access_token && userTenants?.user_tenant_id) {
      try {
        const summaryData = await getAllowanceSummary(
          userTenants.user_tenant_id,
          authData.access_token,
        );
        setUserAllowanceSummary(summaryData);
      } catch (error) {
        console.error("Failed to fetch allowance summary:", error);
      }
    }

    setAccountMode("personal");
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ ...styles.header, paddingTop: insets.top }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setShowAccountSwitcher(false)}
      >
        <View style={[styles.headerGradient]}>
          <View style={styles.topBar}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {isBusiness ? "Business Admin" : "China Trip 🏮"}
              </Text>
            </View>
            <View style={styles.profileArea}>
              <TouchableOpacity
                style={styles.profileButton}
                activeOpacity={0.8}
                onPress={() => setShowAccountSwitcher((prev) => !prev)}
              >
                <Text style={styles.profileButtonText}>
                  {isBusiness ? "BA" : "P"}
                </Text>
              </TouchableOpacity>

              {showAccountSwitcher && (
                <View style={styles.switcherMenu}>
                  <Text style={styles.switcherTitle}>Switch Account</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.switcherOption,
                      !isBusiness && styles.switcherOptionActive,
                    ]}
                    onPress={handleSwitchToPersonal}
                  >
                    <Text style={styles.switcherOptionLabel}>
                      {userData?.full_name || "Personal"}
                    </Text>
                    <Text style={styles.switcherOptionSub}>
                      Current wallet and rewards
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.switcherOption,
                      isBusiness && styles.switcherOptionActive,
                    ]}
                    onPress={handleSwitchToBusiness}
                  >
                    <Text style={styles.switcherOptionLabel}>
                      Business Admin
                    </Text>
                    <Text style={styles.switcherOptionSub}>
                      Team budgets and approvals
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <Text style={styles.balanceText}>
              {isBusiness ? "RM 42,860" : "RM 0.30"}
            </Text>
          </View>

          {/* View Details */}
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewDetailsText}>
              {isBusiness
                ? "View company account details →"
                : "View balance details →"}
            </Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7}>
              <Text style={styles.outlineButtonIcon}>+</Text>
              <Text style={styles.outlineButtonText}>
                {isBusiness ? "Top up company" : "Add money"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewDetailsButton}
              activeOpacity={0.7}
            >
              <Text style={styles.viewDetailsText}>
                {isBusiness ? "Approvals" : "Transactions"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isBusiness ? (
          <AdminDashboardSection
            onSwitchToPersonal={() => setAccountMode("personal")}
          />
        ) : (
          <>
            {/* Quick Actions Card */}
            <View style={styles.quickActionsContainer}>
              <View style={styles.quickActionsInner}>
                <View style={styles.quickActionsGrid}>
                  {[
                    { id: "apply", label: "Apply", icon: "👤" },
                    { id: "cash", label: "Cash flow", icon: "⏱️" },
                    { id: "transfer", label: "Transfer", icon: "↗️" },
                    { id: "cards", label: "Cards", icon: "💳" },
                  ].map((action) => (
                    <TouchableOpacity
                      key={action.id}
                      style={styles.actionCard}
                      activeOpacity={0.7}
                    >
                      <View style={styles.actionIcon}>
                        <Text style={{ fontSize: 24 }}>{action.icon}</Text>
                      </View>
                      <Text style={styles.actionLabel}>{action.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Allowance Wallets Section */}
            <View style={styles.allowanceContainer}>
              <View style={styles.allowanceCardInner}>
                <View style={styles.allowanceHeader}>
                  <View style={styles.allowanceTitle}>
                    <View style={styles.allowanceTitleIcon}>
                      <Text style={{ fontSize: 20, color: "#fff" }}>💰</Text>
                    </View>
                    <View>
                      <Text style={styles.allowanceTitleText}>
                        Allowance Wallets
                      </Text>
                      <Text style={styles.allowanceSubtext}>
                        Total{" "}
                        {userAllowanceSummary &&
                        userAllowanceSummary.items &&
                        userAllowanceSummary.items.length > 0
                          ? `${userAllowanceSummary.items[0].currency} ${userAllowanceSummary.items
                              .reduce(
                                (sum, item) =>
                                  sum + (item.remaining_amount || 0),
                                0,
                              )
                              .toFixed(2)}`
                          : "RM 0.00"}{" "}
                        available
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push("/allowance_wallet")}
                  >
                    <Text style={styles.viewAllText}>View All →</Text>
                  </TouchableOpacity>
                </View>

                {userAllowanceSummary &&
                userAllowanceSummary.items &&
                userAllowanceSummary.items.length > 0 ? (
                  userAllowanceSummary.items.map((allowance, index) => {
                    const percentage =
                      (allowance.consumed_amount / allowance.max_limit) * 100;
                    const icon = ["✈️", "🏨", "🍽️", "🚗", "📱"][index % 5];
                    return (
                      <AllowanceItem
                        key={allowance.policy_group_id}
                        icon={icon}
                        title={allowance.policy_group_name.slice(0, 25)}
                        amount={`${allowance.currency} ${allowance.remaining_amount?.toFixed(2)}`}
                        used={`${allowance.currency} ${allowance.consumed_amount?.toFixed(2)}`}
                        total={`${allowance.currency} ${allowance.max_limit?.toFixed(2)}`}
                        percentage={Math.min(Math.round(percentage), 100)}
                      />
                    );
                  })
                ) : (
                  <Text
                    style={{ padding: 16, textAlign: "center", color: "#999" }}
                  >
                    No allowance data available
                  </Text>
                )}
              </View>
            </View>

            {/* Feature Cards */}
            <View style={styles.featureGridContainer}>
              <View style={styles.featureGridRow}>
                <TouchableOpacity
                  style={[styles.featureCard, { backgroundColor: "#FFFDE7" }]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.featureIcon, { backgroundColor: "#FFF9C4" }]}
                  >
                    <Text>🌱</Text>
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>Grow Money</Text>
                    <Text style={styles.featureSubtitle}>Start with RM10</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.featureCard, { backgroundColor: "#E8EAF6" }]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.featureIcon, { backgroundColor: "#C5CAE9" }]}
                  >
                    <Text>💱</Text>
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>BUDI95</Text>
                    <Text style={styles.featureSubtitle}>RON95 at RM1.99</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.featureGridRow}>
                <TouchableOpacity
                  style={[styles.featureCard, { backgroundColor: "#FFFDE7" }]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.featureIcon, { backgroundColor: "#FFF9C4" }]}
                  >
                    <Text>🎁</Text>
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>GOrewards</Text>
                    <Text style={styles.pointsText}>864 pts</Text>
                    <Text style={styles.newBadge}>NEW</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.featureCard, { backgroundColor: "#E3F2FD" }]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.featureIcon, { backgroundColor: "#BBDEFB" }]}
                  >
                    <Text>⛽</Text>
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>Fuel Balance</Text>
                    <Text style={styles.featureSubtitle}>184 litres</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <View style={styles.contentPadding} />
      </ScrollView>
    </View>
  );
}
