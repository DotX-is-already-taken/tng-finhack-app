import { StyleSheet } from "react-native";


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

export default styles;