import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#1565C0",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconButton: {
    padding: 6,
  },
  iconButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  statsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statsInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsIconWrap: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  statsIcon: {
    fontSize: 24,
  },
  statsInfo: {
    flex: 1,
  },
  statsLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginBottom: 4,
  },
  statsValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  statsRight: {
    alignItems: "flex-end",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  searchCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    fontSize: 16,
    color: "#9CA3AF",
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    fontSize: 16,
    color: "#1F2937",
  },
  employeeList: {
    gap: 12,
  },
  employeeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  employeeCardHeader: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-start",
  },
  avatarWrap: {
    width: 56,
    height: 56,
    backgroundColor: "#DBEAFE",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 32,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  employeePhone: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 6,
  },
  employeeTotal: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    color: "#2563EB",
    fontSize: 16,
  },
  deleteButton: {
    width: 32,
    height: 32,
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "#DC2626",
    fontSize: 16,
  },
  poolTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  poolTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  poolTagEmoji: {
    fontSize: 12,
  },
  poolTagName: {
    fontSize: 12,
    fontWeight: "500",
  },
  poolTagAmount: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyStateIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#4B5563",
  },
});


export default styles;