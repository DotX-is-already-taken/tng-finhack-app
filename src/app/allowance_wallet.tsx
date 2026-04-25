import { getAllowanceDetails } from "@/api/getUserAllowance";
import { useAccount } from "@/context/AccountContext";
import allowances from "@/mockData/allowance_details";
import styles from "@/styles/allowance_wallet";
import globalstyle from "@/styles/global";
import { spendingCategories } from "@/types/allowance";
import { Progress } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getStatusColor = (status: string): string => {
  return status === "Low balance" ? "#ff4d4f" : "#52c41a";
};

const getStatusFromPercentage = (percentage: number): string => {
  return percentage > 75 ? "Low balance" : "Available";
};

async function getAllowanceDetailsData(
  policy_group_id: string,
  accessToken: string,
  user_tenant_id: string,
) {
  try {
    const data = await getAllowanceDetails(
      policy_group_id,
      accessToken,
      user_tenant_id,
    );
    return data;
  } catch (error) {
    console.error("Error fetching allowance details:", error);
    throw error;
  }
}

export default function AllowanceWallets() {
  const router = useRouter();

  const data = useRef({
    user_tenant_id: "",
    policy_group_id: "",
    policy_group_name: "",
    policy_group_description: "",
    policy_group_status: "",
    max_limit: 0,
    transactions: [],
  });

  const insets = useSafeAreaInsets();
  const { userAllowanceSummary, authData } = useAccount();

  const iconMap: { [key: number]: string } = {
    0: "✈️",
    1: "🏨",
    2: "🍽️",
    3: "🚗",
    4: "📱",
  };

  const totalAvailable =
    userAllowanceSummary &&
    userAllowanceSummary.items &&
    userAllowanceSummary.items.length > 0
      ? userAllowanceSummary.items.reduce(
          (sum, item) => sum + (item.remaining_amount || 0),
          0,
        )
      : 0;

  const totalLimit =
    userAllowanceSummary &&
    userAllowanceSummary.items &&
    userAllowanceSummary.items.length > 0
      ? userAllowanceSummary.items.reduce(
          (sum, item) => sum + (item.max_limit || 0),
          0,
        )
      : 0;

  const currency =
    userAllowanceSummary &&
    userAllowanceSummary.items &&
    userAllowanceSummary.items.length > 0
      ? userAllowanceSummary.items[0].currency
      : "MYR";

  return (
    <View style={[globalstyle.safearea, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Text style={styles.iconButtonText}>{"\u276E"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Allowance Wallets</Text>
          </View>

          {/* Total summary card */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Available</Text>
            <Text style={styles.summaryAmount}>
              {currency} {totalAvailable.toFixed(2)}
            </Text>
            <Text style={styles.summarySubtext}>
              from {currency} {totalLimit.toFixed(2)} monthly limit
            </Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
            paddingTop: insets.top - 20,
          }}
        >
          {/* Allowance cards */}
          <View style={styles.contentContainer}>
            {userAllowanceSummary &&
            userAllowanceSummary.items &&
            userAllowanceSummary.items.length > 0 ? (
              userAllowanceSummary.items.map((allowance, index) => {
                const percentage =
                  (allowance.consumed_amount / allowance.max_limit) * 100;
                const status = getStatusFromPercentage(percentage);
                const icon = iconMap[index % 5] || "💼";

                return (
                  <TouchableOpacity
                    key={allowance.policy_group_id}
                    onPress={async () => {
                      try {
                        if (!authData?.access_token) {
                          console.error("Access token not available");
                          return;
                        }
                        data.current = await getAllowanceDetailsData(
                          allowance.policy_group_id,
                          authData.access_token,
                          userAllowanceSummary.user_tenant_id,
                        );
                      } catch (error) {
                        console.error(
                          "Failed to fetch allowance details:",
                          error,
                        );
                      }
                      router.push({
                        pathname: "/allowance_details",
                        params: {
                          data: JSON.stringify(data.current),
                        },
                      });
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.allowanceCard}>
                      {/* Card header */}
                      <View style={styles.cardHeader}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          <View style={styles.cardIconContainer}>
                            <Text style={styles.cardIcon}>{icon}</Text>
                          </View>
                          <View style={styles.cardTitleSection}>
                            <Text style={styles.cardTitle}>
                              {allowance.policy_group_name}
                            </Text>
                            <View
                              style={[
                                styles.statusTag,
                                {
                                  backgroundColor: getStatusColor(status),
                                },
                              ]}
                            >
                              <Text style={styles.statusText}>{status}</Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      {/* Balance info */}
                      <View style={styles.balanceRow}>
                        <View style={styles.balanceSection}>
                          <Text style={styles.balanceLabel}>Remaining</Text>
                          <Text style={styles.balanceAmount}>
                            {currency} {allowance.remaining_amount?.toFixed(2)}
                          </Text>
                        </View>
                        <View style={styles.balanceSection}>
                          <Text style={styles.limitLabel}>Monthly Limit</Text>
                          <Text style={styles.limitAmount}>
                            {currency} {allowance.max_limit?.toFixed(2)}
                          </Text>
                        </View>
                      </View>

                      {/* Progress bar */}
                      <View style={styles.progressContainer}>
                        <View style={styles.progressLabel}>
                          <Text style={styles.progressLabelText}>
                            Used {currency}{" "}
                            {allowance.consumed_amount?.toFixed(2)}
                          </Text>
                          <Text style={styles.progressPercentage}>
                            {Math.round(percentage)}%
                          </Text>
                        </View>
                        <Progress
                          percent={Math.min(Math.round(percentage), 100)}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={{ padding: 16, textAlign: "center", color: "#999" }}>
                No allowance data available
              </Text>
            )}
          </View>

          {/* Spending Categories */}
          <View style={styles.contentContainer}>
            <View style={styles.spendingCard}>
              <Text style={styles.spendingTitle}>Where you can spend</Text>

              {Object.values(allowances).map((allowance) => (
                <View key={allowance.id} style={styles.categorySection}>
                  <View style={styles.categoryTitle}>
                    <Text style={styles.categoryEmoji}>{allowance.icon}</Text>
                    <Text style={styles.categoryName}>{allowance.name}</Text>
                  </View>
                  <View style={styles.categoryTags}>
                    {spendingCategories[allowance.id]?.map((category, idx) => (
                      <View key={idx} style={styles.tag}>
                        <Text>{category.emoji}</Text>
                        <Text style={styles.tagText}>{category.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Info card */}
          <View style={styles.contentContainer}>
            <View style={styles.infoCard}>
              <Text
                style={[styles.infoTitle, { fontSize: 18, marginBottom: 8 }]}
              >
                ℹ️
              </Text>
              <Text style={styles.infoTitle}>About Allowance Wallets</Text>
              <Text style={styles.infoText}>
                These are employer-funded spending categories. Balances refresh
                monthly and can only be used at eligible merchants.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
