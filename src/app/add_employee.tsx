import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/styles/add_employee";

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