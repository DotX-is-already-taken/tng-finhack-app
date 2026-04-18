import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddEmployee() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPool, setSelectedPool] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  // Mock employee data
  const employees = [
    { id: "1", name: "Sarah Tan", phone: "+60 12-345 6789", avatar: "👩" },
    { id: "2", name: "Ahmad Razak", phone: "+60 12-456 7890", avatar: "👨" },
    { id: "3", name: "Mei Ling Wong", phone: "+60 12-567 8901", avatar: "👩" },
    { id: "4", name: "Kumar Raj", phone: "+60 12-678 9012", avatar: "👨" },
    { id: "5", name: "Nurul Aina", phone: "+60 12-789 0123", avatar: "👩" },
  ];

  const pools = [
    {
      id: "medical",
      name: "Medical Allowance",
      emoji: "🏥",
      defaultAmount: "600",
      color: "red",
    },
    {
      id: "gym",
      name: "Gym / Wellness",
      emoji: "💪",
      defaultAmount: "300",
      color: "green",
    },
    {
      id: "meals",
      name: "Meals Allowance",
      emoji: "🍽️",
      defaultAmount: "500",
      color: "orange",
    },
    {
      id: "transport",
      name: "Transport",
      emoji: "🚗",
      defaultAmount: "400",
      color: "blue",
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.includes(searchQuery),
  );

  const handleAddEmployee = () => {
    router.back();
  };

  const selectedPoolData = pools.find((p) => p.id === selectedPool);

  const poolColorClasses: Record<string, { bg: string; border: string }> = {
    red: { bg: "#FFF0F0", border: "#FECACA" },
    green: { bg: "#F0FDF4", border: "#BBF7D0" },
    orange: { bg: "#FFF7ED", border: "#FED7AA" },
    blue: { bg: "#EFF6FF", border: "#BFDBFE" },
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>{"\u276E"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Employee to Pool</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Step 1: Select Employee */}
        <View style={styles.card}>
          <Text style={styles.stepTitle}>Step 1: Select Employee</Text>
          <Text style={styles.stepSubtitle}>Search and choose an employee</Text>

          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>{"\uD83D\uDD0D"}</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <ScrollView style={styles.employeeList} nestedScrollEnabled={true}>
            <View>
              {filteredEmployees.map((employee) => {
                const isSelected = selectedEmployee === employee.id;
                return (
                  <TouchableOpacity
                    key={employee.id}
                    onPress={() => setSelectedEmployee(employee.id)}
                    style={[
                      styles.employeeRow,
                      isSelected
                        ? styles.employeeRowSelected
                        : styles.employeeRowUnselected,
                    ]}
                    activeOpacity={0.8}
                  >
                    <View style={styles.avatarWrap}>
                      <Text style={styles.avatarText}>{employee.avatar}</Text>
                    </View>
                    <View style={styles.employeeInfo}>
                      <Text style={styles.employeeName}>{employee.name}</Text>
                      <Text style={styles.employeePhone}>{employee.phone}</Text>
                    </View>
                    {isSelected && (
                      <View style={styles.checkCircle}>
                        <Text style={styles.checkIcon}>{"\u2714"}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Step 2: Select Pool */}
        <View style={styles.card}>
          <Text style={styles.stepTitle}>Step 2: Select Allowance Pool</Text>
          <Text style={styles.stepSubtitle}>Choose which pool to assign</Text>

          <View style={styles.poolList}>
            {pools.map((pool) => {
              const isSelected = selectedPool === pool.id;
              const colors = poolColorClasses[pool.color] || {
                bg: "#F9FAFB",
                border: "#E5E7EB",
              };

              return (
                <TouchableOpacity
                  key={pool.id}
                  onPress={() => {
                    setSelectedPool(pool.id);
                    setCustomAmount(pool.defaultAmount);
                  }}
                  style={[
                    styles.poolRow,
                    isSelected
                      ? [
                          styles.poolRowSelected,
                          {
                            backgroundColor: "#EFF6FF",
                            borderColor: "#2563EB",
                          },
                        ]
                      : {
                          backgroundColor: colors.bg,
                          borderColor: "transparent",
                        },
                  ]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.poolEmoji}>{pool.emoji}</Text>
                  <View style={styles.poolInfo}>
                    <Text style={styles.poolName}>{pool.name}</Text>
                    <Text style={styles.poolAmount}>
                      RM {pool.defaultAmount}/month
                    </Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkIcon}>{"\u2714"}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Step 3: Set Amount */}
        {selectedPool ? (
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 3: Set Monthly Amount</Text>
            <Text style={styles.stepSubtitle}>
              Default: RM {selectedPoolData?.defaultAmount} (you can customize)
            </Text>

            <View style={styles.amountInputContainer}>
              <Text style={styles.currencyLabel}>RM</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                placeholder="600"
                value={customAmount}
                onChangeText={setCustomAmount}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <Text style={styles.helperText}>
              This employee will receive this amount monthly
            </Text>
          </View>
        ) : null}

        {/* Summary */}
        {selectedEmployee && selectedPool && customAmount ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Assignment Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Employee:</Text>
              <Text style={styles.summaryValue}>
                {employees.find((e) => e.id === selectedEmployee)?.name}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pool:</Text>
              <Text style={styles.summaryValue}>
                {selectedPoolData?.emoji} {selectedPoolData?.name}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Monthly Allowance:</Text>
              <Text style={styles.totalValue}>RM {customAmount}</Text>
            </View>
          </View>
        ) : null}

        {/* Add Button */}
        <TouchableOpacity
          onPress={handleAddEmployee}
          disabled={!selectedEmployee || !selectedPool || !customAmount}
          style={[
            styles.createButton,
            (!selectedEmployee || !selectedPool || !customAmount) &&
              styles.createButtonDisabled,
          ]}
          activeOpacity={0.8}
        >
          <Text style={styles.createButtonText}>Add Employee to Pool</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    paddingBottom: 80,
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
    maxHeight: 300,
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
