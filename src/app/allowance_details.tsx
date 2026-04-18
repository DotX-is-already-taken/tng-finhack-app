import React from "react";
import { Progress } from "@ant-design/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AllowanceType = "medical" | "gym" | "meals" | "transport";

type Transaction = {
    date: string;
    merchant: string;
    amount: number;
};

type Allowance = {
    name: string;
    icon: string;
    remaining: number;
    limit: number;
    used: number;
    progress: number;
    transactions: Transaction[];
};

const allowanceData: Record<AllowanceType, Allowance> = {
    medical: {
        name: "Medical",
        icon: "🏥",
        remaining: 450,
        limit: 600,
        used: 150,
        progress: 75,
        transactions: [
            { date: "15 Apr 2026", merchant: "Guardian Pharmacy", amount: 45.5 },
            { date: "08 Apr 2026", merchant: "Klinik Kesihatan", amount: 60 },
            { date: "02 Apr 2026", merchant: "Watsons", amount: 44.5 },
        ],
    },
    gym: {
        name: "Gym / Wellness",
        icon: "💪",
        remaining: 180,
        limit: 300,
        used: 120,
        progress: 60,
        transactions: [
            { date: "10 Apr 2026", merchant: "Fitness First", amount: 85 },
            { date: "03 Apr 2026", merchant: "Yoga Studio KL", amount: 35 },
        ],
    },
    meals: {
        name: "Meals",
        icon: "🍽️",
        remaining: 220,
        limit: 500,
        used: 280,
        progress: 44,
        transactions: [
            { date: "16 Apr 2026", merchant: "Starbucks", amount: 18.5 },
            { date: "15 Apr 2026", merchant: "Nasi Kandar Pelita", amount: 22 },
            { date: "14 Apr 2026", merchant: "Secret Recipe", amount: 35.8 },
            { date: "13 Apr 2026", merchant: "McDonald's", amount: 15.9 },
            { date: "12 Apr 2026", merchant: "Subway", amount: 19.5 },
        ],
    },
    transport: {
        name: "Transport",
        icon: "🚗",
        remaining: 85,
        limit: 400,
        used: 315,
        progress: 21,
        transactions: [
            { date: "16 Apr 2026", merchant: "Petronas", amount: 60 },
            { date: "14 Apr 2026", merchant: "Grab", amount: 28.5 },
            { date: "12 Apr 2026", merchant: "Touch n Go RFID", amount: 12.8 },
            { date: "09 Apr 2026", merchant: "Petronas", amount: 55 },
        ],
    },
};

export default function AllowanceDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ type?: string | string[] }>();
    const insets = useSafeAreaInsets();

    const typeValue = Array.isArray(params.type) ? params.type[0] : params.type;
    const resolvedType: AllowanceType = (typeValue && typeValue in allowanceData
        ? typeValue
        : "medical") as AllowanceType;
    const allowance = allowanceData[resolvedType];

    const daysElapsed = 15;
    const daysLeft = 13;
    const dailySpend = allowance.used / daysElapsed;
    const projectedBalance = allowance.remaining - dailySpend * daysLeft;

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <View style={styles.headerTopRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerTitleWrap}>
                        <Text style={styles.headerEmoji}>{allowance.icon}</Text>
                        <Text style={styles.headerTitle}>{allowance.name}</Text>
                    </View>
                </View>

                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Remaining Balance</Text>
                    <Text style={styles.balanceValue}>RM {allowance.remaining.toFixed(2)}</Text>
                    <Progress percent={allowance.progress} />
                    <View style={styles.balanceMetaRow}>
                        <View>
                            <Text style={styles.metaLabel}>Used</Text>
                            <Text style={styles.metaValue}>RM {allowance.used.toFixed(2)}</Text>
                        </View>
                        <View style={styles.metaRight}>
                            <Text style={styles.metaLabel}>Monthly Limit</Text>
                            <Text style={styles.metaValue}>RM {allowance.limit.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
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
                        <Text style={styles.statValue}>{allowance.transactions.length}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Smart Insights</Text>

                    <View style={styles.insightBox}>
                        <Text style={styles.insightTitle}>💡 Spending Pace</Text>
                        <Text style={styles.insightText}>
                            You are spending {allowance.progress > 50 ? "faster" : "slower"} than average. At this rate,
                            expected month-end balance is RM {projectedBalance.toFixed(0)}.
                        </Text>
                    </View>

                    <View style={styles.insightBox}>
                        <Text style={styles.insightTitle}>📈 Budget Range</Text>
                        <Text style={styles.insightText}>
                            Similar users typically spend RM {(allowance.limit * 0.6).toFixed(0)} - RM {(allowance.limit * 0.8).toFixed(0)}.
                        </Text>
                    </View>

                    <View style={styles.insightBox}>
                        <Text style={styles.insightTitle}>💰 Savings Opportunity</Text>
                        <Text style={styles.insightText}>
                            You could save up to RM 50 by choosing alternative merchants nearby.
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
                            style={[styles.transactionRow, index === allowance.transactions.length - 1 && styles.lastRow]}
                        >
                            <View>
                                <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                                <Text style={styles.transactionDate}>{transaction.date}</Text>
                            </View>
                            <Text style={styles.transactionAmount}>-RM {transaction.amount.toFixed(2)}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    header: {
        backgroundColor: "#1976D2",
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerTopRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    backButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginTop: -1,
    },
    headerTitleWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    headerEmoji: {
        fontSize: 24,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 21,
        fontWeight: "700",
    },
    balanceCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
    },
    balanceLabel: {
        color: "#8C8C8C",
        fontSize: 13,
        marginBottom: 4,
    },
    balanceValue: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 10,
    },
    balanceMetaRow: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    metaLabel: {
        color: "#9CA3AF",
        fontSize: 12,
    },
    metaValue: {
        color: "#374151",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 2,
    },
    metaRight: {
        alignItems: "flex-end",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        gap: 12,
    },
    statsRow: {
        flexDirection: "row",
        gap: 8,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: "center",
    },
    statEmoji: {
        fontSize: 20,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        marginBottom: 2,
    },
    statValue: {
        fontSize: 12,
        color: "#1F2937",
        fontWeight: "700",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 10,
    },
    insightBox: {
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
    },
    insightTitle: {
        color: "#1F2937",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 4,
    },
    insightText: {
        color: "#4B5563",
        fontSize: 12,
        lineHeight: 18,
    },
    primaryButton: {
        backgroundColor: "#6D28D9",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        marginTop: 6,
    },
    primaryButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    transactionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        paddingVertical: 10,
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    transactionMerchant: {
        color: "#1F2937",
        fontSize: 14,
        fontWeight: "600",
    },
    transactionDate: {
        color: "#9CA3AF",
        fontSize: 12,
        marginTop: 2,
    },
    transactionAmount: {
        color: "#111827",
        fontSize: 14,
        fontWeight: "700",
    },
    ghostButton: {
        paddingTop: 10,
        alignItems: "center",
    },
    ghostButtonText: {
        color: "#1D4ED8",
        fontWeight: "700",
        fontSize: 13,
    },
});

