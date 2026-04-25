import { useAccount } from "@/context/AccountContext";
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
  const { selectedAllowanceDetails } = useAccount();

  // If we have selected details from context, use them. Otherwise fallback to mock.
  const details = selectedAllowanceDetails;

  const typeValue = Array.isArray(params.type) ? params.type[0] : params.type;
  const resolvedType: AllowanceType = (
    typeValue && typeValue in allowanceData ? typeValue : "medical"
  ) as AllowanceType;
  
  const mockAllowance = allowanceData[resolvedType];

  const name = details?.policy_group_name || mockAllowance.name;
  const limit = details?.max_limit || mockAllowance.limit;
  const transactions = details?.transactions || mockAllowance.transactions;
  
  const consumed = details 
    ? (details.consumed_amount || 0)
    : mockAllowance.used;
    
  const remaining = details
    ? (details.remaining_amount || 0)
    : mockAllowance.remaining;
    
  const progress = (consumed / limit) * 100;

  const daysElapsed = 15;
  const daysLeft = 13;
  const dailySpend = consumed / daysElapsed;
  const projectedBalance = remaining - dailySpend * daysLeft;

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
            <Text style={styles.headerTitle}>{name}</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Remaining Balance</Text>
          <Text style={styles.balanceValue}>
            RM {remaining.toFixed(2)}
          </Text>
          <Progress percent={progress} />
          <View style={styles.balanceMetaRow}>
            <View>
              <Text style={styles.metaLabel}>Used</Text>
              <Text style={styles.metaValue}>
                RM {consumed.toFixed(2)}
              </Text>
            </View>
            <View style={styles.metaRight}>
              <Text style={styles.metaLabel}>Monthly Limit</Text>
              <Text style={styles.metaValue}>
                RM {limit.toFixed(2)}
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
              {transactions.length}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Smart Insights</Text>

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>💡 Spending Pace</Text>
            <Text style={styles.insightText}>
              You are spending {progress > 50 ? "faster" : "slower"}{" "}
              than average. At this rate, expected month-end balance is RM{" "}
              {projectedBalance.toFixed(0)}.
            </Text>
          </View>

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>📈 Budget Range</Text>
            <Text style={styles.insightText}>
              Similar users typically spend RM{" "}
              {(limit * 0.6).toFixed(0)} - RM{" "}
              {(limit * 0.8).toFixed(0)}.
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
          {transactions.map((transaction: any, index: number) => {
            const merchant = transaction.raw_vendor_name || transaction.merchant;
            const date = transaction.created_at 
              ? new Date(transaction.created_at).toLocaleDateString() 
              : transaction.date;
            const amount = transaction.amount;

            return (
              <View
                key={`${merchant}-${date}-${index}`}
                style={[
                  styles.transactionRow,
                  index === transactions.length - 1 && styles.lastRow,
                ]}
              >
                <View>
                  <Text style={styles.transactionMerchant}>{merchant}</Text>
                  <Text style={styles.transactionDate}>{date}</Text>
                </View>
                <Text style={styles.transactionAmount}>
                  -RM {amount.toFixed(2)}
                </Text>
              </View>
            );
          })}

          <TouchableOpacity activeOpacity={0.7} style={styles.ghostButton}>
            <Text style={styles.ghostButtonText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
