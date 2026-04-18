import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Progress } from "@ant-design/react-native";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    headerGradient: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
        backgroundColor: "#1976D2",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    badge: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 16,
        backgroundColor: "#FF9800",
        shadowColor: "#FF9800",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    badgeText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
        letterSpacing: 0.3,
    },
    balanceSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    balanceIcon: {
        width: 36,
        height: 36,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    balanceText: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
        marginRight: 10,
        letterSpacing: -0.5,
    },
    balanceEye: {
        fontSize: 18,
        color: "#fff",
        opacity: 0.9,
    },
    viewDetailsText: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 13,
        marginBottom: 16,
        fontWeight: "500",
        letterSpacing: 0.2,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 10,
        marginTop: 8,
    },
    outlineButton: {
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 9,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    outlineButtonText: {
        color: "#fff",
        fontSize: 13,
        marginLeft: 5,
        fontWeight: "600",
    },
    outlineButtonIcon: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "bold",
    },
    quickActionsContainer: {
        marginHorizontal: 12,
        marginTop: -24,
        marginBottom: 20,
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    quickActionsInner: {
        backgroundColor: "#fff",
        paddingVertical: 18,
        paddingHorizontal: 12,
    },
    quickActionsGrid: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    actionCard: {
        alignItems: "center",
        width: "25%",
        paddingVertical: 4,
    },
    actionIcon: {
        width: 56,
        height: 56,
        backgroundColor: "#E3F2FD",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    actionLabel: {
        fontSize: 12,
        color: "#455A64",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: 0.2,
    },
    allowanceContainer: {
        marginHorizontal: 12,
        marginBottom: 20,
    },
    allowanceCardInner: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    allowanceHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    allowanceTitle: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    allowanceTitleIcon: {
        width: 40,
        height: 40,
        backgroundColor: "#1976D2",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    allowanceTitleText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1A1A",
        letterSpacing: -0.3,
    },
    allowanceSubtext: {
        fontSize: 12,
        color: "#757575",
        marginTop: 3,
        fontWeight: "500",
    },
    viewAllText: {
        fontSize: 12,
        color: "#1976D2",
        fontWeight: "700",
        letterSpacing: 0.3,
    },
    allowanceItem: {
        backgroundColor: "#F8F9FB",
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: "#1976D2",
    },
    allowanceItemHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    allowanceItemTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    allowanceItemIcon: {
        width: 28,
        height: 28,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
    },
    allowanceItemName: {
        fontSize: 13,
        color: "#424242",
        fontWeight: "600",
        letterSpacing: 0.2,
    },
    allowanceItemAmount: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1976D2",
        letterSpacing: -0.3,
    },
    progressContainer: {
        marginVertical: 10,
    },
    allowanceStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    allowanceStatText: {
        fontSize: 11,
        color: "#90A4AE",
        fontWeight: "600",
        letterSpacing: 0.2,
    },
    featureGridContainer: {
        marginHorizontal: 12,
        marginBottom: 24,
    },
    featureGridRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 12,
    },
    featureCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 13,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    featureIcon: {
        width: 52,
        height: 52,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        fontSize: 26,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 3,
        letterSpacing: -0.2,
    },
    featureSubtitle: {
        fontSize: 11,
        color: "#757575",
        fontWeight: "500",
        letterSpacing: 0.1,
    },
    newBadge: {
        fontSize: 9,
        color: "#FF9800",
        fontWeight: "700",
        marginTop: 4,
        letterSpacing: 0.5,
    },
    pointsText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#1976D2",
        marginTop: 2,
        letterSpacing: -0.2,
    },
    contentPadding: {
        paddingBottom: 100,
    },
});

const AllowanceItem = ({ icon, title, amount, used, total, percentage }: any) => (
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
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={[styles.headerGradient]}>
                <View style={styles.topBar}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>China Trip 🏮</Text>
                    </View>
                </View>

                {/* Balance Section */}
                <View style={styles.balanceSection}>
                    <View style={styles.balanceIcon}>
                        <Text style={{ fontSize: 18, color: "#fff" }}>✓</Text>
                    </View>
                    <Text style={styles.balanceText}>RM 0.30</Text>
                    <Text style={styles.balanceEye}>👁️</Text>
                </View>

                {/* View Details */}
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.viewDetailsText}>
                        View balance details →
                    </Text>
                </TouchableOpacity>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7}>
                        <Text style={styles.outlineButtonIcon}>+</Text>
                        <Text style={styles.outlineButtonText}>Add money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.viewDetailsText}>Transactions →</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
                            <TouchableOpacity key={action.id} style={styles.actionCard} activeOpacity={0.7}>
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
                                <Text style={styles.allowanceTitleText}>Allowance Wallets</Text>
                                <Text style={styles.allowanceSubtext}>Total RM 935.00 available</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => router.push('/allowance_wallet')}
                        >
                            <Text style={styles.viewAllText}>View All →</Text>

                        </TouchableOpacity>
                    </View>

                    <AllowanceItem
                        icon="🏥"
                        title="Medical"
                        amount="RM 450.00"
                        used="RM 150"
                        total="RM 600"
                        percentage={25}
                    />
                    <AllowanceItem
                        icon="💪"
                        title="Gym / Wellness"
                        amount="RM 180.00"
                        used="RM 120"
                        total="RM 300"
                        percentage={40}
                    />
                    <AllowanceItem
                        icon="🍽️"
                        title="Meals"
                        amount="RM 220.00"
                        used="RM 280"
                        total="RM 500"
                        percentage={56}
                    />
                </View>
            </View>

            {/* Feature Cards */}
            <View style={styles.featureGridContainer}>
                {/* Row 1 */}
                <View style={styles.featureGridRow}>
                    <TouchableOpacity style={[styles.featureCard, { backgroundColor: "#FFFDE7" }]} activeOpacity={0.7}>
                        <View style={[styles.featureIcon, { backgroundColor: "#FFF9C4" }]}>
                            <Text>🌱</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Grow Money</Text>
                            <Text style={styles.featureSubtitle}>Start with RM10</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.featureCard, { backgroundColor: "#E8EAF6" }]} activeOpacity={0.7}>
                        <View style={[styles.featureIcon, { backgroundColor: "#C5CAE9" }]}>
                            <Text>💱</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>BUDI95</Text>
                            <Text style={styles.featureSubtitle}>RON95 at RM1.99</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Row 2 */}
                <View style={styles.featureGridRow}>
                    <TouchableOpacity style={[styles.featureCard, { backgroundColor: "#FFFDE7" }]} activeOpacity={0.7}>
                        <View style={[styles.featureIcon, { backgroundColor: "#FFF9C4" }]}>
                            <Text>🎁</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>GOrewards</Text>
                            <Text style={styles.pointsText}>864 pts</Text>
                            <Text style={styles.newBadge}>NEW</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.featureCard, { backgroundColor: "#E3F2FD" }]} activeOpacity={0.7}>
                        <View style={[styles.featureIcon, { backgroundColor: "#BBDEFB" }]}>
                            <Text>⛽</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Fuel Balance</Text>
                            <Text style={styles.featureSubtitle}>184 litres</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Extra padding for bottom nav */}
            <View style={styles.contentPadding} />
        </ScrollView>
    );
}