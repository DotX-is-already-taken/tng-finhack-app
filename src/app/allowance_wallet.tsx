import allowances from "@/mockData/allowance_details";
import styles from "@/styles/allowance_wallet";
import globalstyle from "@/styles/global";
import { spendingCategories } from "@/types/allowance";
import { Progress } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getStatusColor = (status: string): string => {
  return status === "Low balance" ? "#ff4d4f" : "#52c41a";
};

export default function AllowanceWallets() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
            <Text style={styles.summaryAmount}>RM 935.00</Text>
            <Text style={styles.summarySubtext}>
              from RM 1,800.00 monthly limit
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
            {Object.values(allowances).map((allowance) => (
              <TouchableOpacity
                key={allowance.id}
                onPress={() =>
                  router.push({
                    pathname: "/allowance_details",
                    params: { type: allowance.id },
                  })
                }
                activeOpacity={0.7}
              >
                <View style={styles.allowanceCard}>
                  {/* Card header */}
                  <View style={styles.cardHeader}>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                      <View style={styles.cardIconContainer}>
                        <Text style={styles.cardIcon}>{allowance.icon}</Text>
                      </View>
                      <View style={styles.cardTitleSection}>
                        <Text style={styles.cardTitle}>{allowance.name}</Text>
                        <View
                          style={[
                            styles.statusTag,
                            {
                              backgroundColor: getStatusColor(allowance.status),
                            },
                          ]}
                        >
                          <Text style={styles.statusText}>
                            {allowance.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/*<ChevronRight color="#ccc" size={20} />*/}
                  </View>

                  {/* Balance info */}
                  <View style={styles.balanceRow}>
                    <View style={styles.balanceSection}>
                      <Text style={styles.balanceLabel}>Remaining</Text>
                      <Text style={styles.balanceAmount}>
                        RM {allowance.remaining.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.balanceSection}>
                      <Text style={styles.limitLabel}>Monthly Limit</Text>
                      <Text style={styles.limitAmount}>
                        RM {allowance.limit.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  {/* Progress bar */}
                  <View style={styles.progressContainer}>
                    <View style={styles.progressLabel}>
                      <Text style={styles.progressLabelText}>
                        Used RM {allowance.used.toFixed(2)}
                      </Text>
                      <Text style={styles.progressPercentage}>
                        {100 - allowance.progress}%
                      </Text>
                    </View>
                    <Progress
                      percent={allowance.progress}
                      // strokeColor={getProgressColor(allowance.progress)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
