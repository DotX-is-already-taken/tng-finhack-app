import allowanceData from "@/mockData/allowance_details";
import styles from "@/styles/allowance_details";
import { AllowanceType } from "@/types/allowance";
import { Progress } from "@ant-design/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AllowanceDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string | string[] }>();
  const insets = useSafeAreaInsets();

  const typeValue = Array.isArray(params.type) ? params.type[0] : params.type;
  const resolvedType: AllowanceType = (
    typeValue && typeValue in allowanceData ? typeValue : "medical"
  ) as AllowanceType;
  const allowance = allowanceData[resolvedType];

  const daysElapsed = 15;
  const daysLeft = 13;
  const dailySpend = allowance.used / daysElapsed;
  const projectedBalance = allowance.remaining - dailySpend * daysLeft;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <Text style={styles.iconButtonText}>{"\u276E"}</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{allowance.name}</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Remaining Balance</Text>
          <Text style={styles.balanceValue}>
            RM {allowance.remaining.toFixed(2)}
          </Text>
          <Progress percent={allowance.progress} />
          <View style={styles.balanceMetaRow}>
            <View>
              <Text style={styles.metaLabel}>Used</Text>
              <Text style={styles.metaValue}>
                RM {allowance.used.toFixed(2)}
              </Text>
            </View>
            <View style={styles.metaRight}>
              <Text style={styles.metaLabel}>Monthly Limit</Text>
              <Text style={styles.metaValue}>
                RM {allowance.limit.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📊</Text>
            <Text style={styles.statLabel}>Avg. Spend</Text>
            <Text style={styles.statValue}>RM {dailySpend.toFixed(0)}/day</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📅</Text>
            <Text style={styles.statLabel}>Days Left</Text>
            <Text style={styles.statValue}>{daysLeft} days</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statLabel}>Transactions</Text>
            <Text style={styles.statValue}>
              {allowance.transactions.length}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Smart Insights</Text>

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>💡 Spending Pace</Text>
            <Text style={styles.insightText}>
              You are spending {allowance.progress > 50 ? "faster" : "slower"}{" "}
              than average. At this rate, expected month-end balance is RM{" "}
              {projectedBalance.toFixed(0)}.
            </Text>
          </View>

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>📈 Budget Range</Text>
            <Text style={styles.insightText}>
              Similar users typically spend RM{" "}
              {(allowance.limit * 0.6).toFixed(0)} - RM{" "}
              {(allowance.limit * 0.8).toFixed(0)}.
            </Text>
          </View>

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>💰 Savings Opportunity</Text>
            <Text style={styles.insightText}>
              You could save up to RM 50 by choosing alternative merchants
              nearby.
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Simulate Changes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          {allowance.transactions.map((transaction, index) => (
            <View
              key={`${transaction.merchant}-${transaction.date}-${index}`}
              style={[
                styles.transactionRow,
                index === allowance.transactions.length - 1 && styles.lastRow,
              ]}
            >
              <View>
                <Text style={styles.transactionMerchant}>
                  {transaction.merchant}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>
                -RM {transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}

          <TouchableOpacity activeOpacity={0.7} style={styles.ghostButton}>
            <Text style={styles.ghostButtonText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
