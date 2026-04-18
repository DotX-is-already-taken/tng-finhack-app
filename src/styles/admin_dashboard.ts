import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  screenContent: {
    paddingBottom: 24,
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  statsHeaderCard: {
    backgroundColor: "#1565C0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  statsLabel: {
    color: "#D2E7FF",
    fontSize: 12,
    marginBottom: 4,
  },
  statsValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statsMiniCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: 10,
  },
  statsMiniLabel: {
    color: "#D2E7FF",
    fontSize: 11,
  },
  statsMiniValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#1A1A1A",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  linkText: {
    color: "#1976D2",
    fontSize: 12,
    fontWeight: "700",
  },
  quickActionsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  actionTile: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
  },
  actionEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  actionTitle: {
    fontSize: 13,
    color: "#263238",
    fontWeight: "700",
  },
  actionSub: {
    fontSize: 11,
    color: "#607D8B",
    marginTop: 2,
  },
  poolCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  poolTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  poolIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  poolIcon: {
    fontSize: 18,
  },
  poolTitleWrap: {
    flex: 1,
  },
  poolTitle: {
    fontSize: 13,
    color: "#1F2937",
    fontWeight: "700",
  },
  poolSub: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
  },
  poolStatsGrid: {
    flexDirection: "row",
    gap: 6,
  },
  poolStatBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  poolStatLabel: {
    fontSize: 10,
    color: "#6B7280",
  },
  poolStatValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 2,
  },
  remainingValue: {
    color: "#1F9D55",
  },
  activityRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  activityIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  activityTextWrap: {
    flex: 1,
  },
  activityText: {
    color: "#263238",
    fontSize: 12,
    fontWeight: "600",
  },
  activityTime: {
    color: "#90A4AE",
    fontSize: 11,
    marginTop: 2,
  },
  bottomNavCard: {
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
  },
  bottomIcon: {
    fontSize: 17,
    color: "#90A4AE",
  },
  bottomText: {
    marginTop: 2,
    fontSize: 11,
    color: "#90A4AE",
    fontWeight: "600",
  },
  bottomActive: {
    color: "#1976D2",
  },
});


export default styles;