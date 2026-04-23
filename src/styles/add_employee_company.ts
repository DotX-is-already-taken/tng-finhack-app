import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
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
  },
  backButton: {
    padding: 6,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
    backgroundColor: "#F9FAFB",
  },
  card: {
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
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    color: "#9CA3AF",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  employeeList: {
    maxHeight: "100%",
  },
  employeeRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 8,
  },
  employeeRowSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  employeeRowUnselected: {
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  avatarWrap: {
    width: 48,
    height: 48,
    backgroundColor: "#DBEAFE",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  employeePhone: {
    fontSize: 13,
    color: "#6B7280",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  checkIcon: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  poolList: {
    gap: 8,
  },
  poolRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 8,
  },
  poolRowSelected: {
    transform: [{ scale: 1.02 }],
  },
  poolEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  poolInfo: {
    flex: 1,
  },
  poolName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  poolAmount: {
    fontSize: 13,
    color: "#6B7280",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
  },
  currencyLabel: {
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 18,
    color: "#6B7280",
  },
  amountInput: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 16,
    fontSize: 18,
    color: "#1F2937",
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#4B5563",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  divider: {
    height: 1,
    backgroundColor: "#BFDBFE",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
  },
  createButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowOpacity: 0,
    elevation: 0,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});


const poolColorClasses: Record<string, { bg: string; border: string }> = {
  red: { bg: "#FFF0F0", border: "#FECACA" },
  green: { bg: "#F0FDF4", border: "#BBF7D0" },
  orange: { bg: "#FFF7ED", border: "#FED7AA" },
  blue: { bg: "#EFF6FF", border: "#BFDBFE" },
};


export {styles, poolColorClasses};