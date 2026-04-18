import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreatePool() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [poolName, setPoolName] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");

  const categories = [
    { id: "medical", name: "Medical", emoji: "🏥", color: "red" },
    { id: "gym", name: "Gym / Wellness", emoji: "💪", color: "green" },
    { id: "meals", name: "Meals", emoji: "🍽️", color: "orange" },
    { id: "transport", name: "Transport", emoji: "🚗", color: "blue" },
    { id: "education", name: "Education", emoji: "📚", color: "purple" },
    { id: "childcare", name: "Childcare", emoji: "👶", color: "pink" },
  ];

  const handleCreate = () => {
    // Navigate back to admin dashboard
    router.back();
  };

  const colorClasses: Record<string, { bg: string; border: string; iconBg: string }> = {
    red: { bg: "#FFF0F0", border: "#FECACA", iconBg: "#FEE2E2" },
    green: { bg: "#F0FDF4", border: "#BBF7D0", iconBg: "#DCFCE7" },
    orange: { bg: "#FFF7ED", border: "#FED7AA", iconBg: "#FFEDD5" },
    blue: { bg: "#EFF6FF", border: "#BFDBFE", iconBg: "#DBEAFE" },
    purple: { bg: "#FAF5FF", border: "#E9D5FF", iconBg: "#F3E8FF" },
    pink: { bg: "#FDF2F8", border: "#FBCFE8", iconBg: "#FCE7F3" },
  };

  const isFormValid = selectedCategory && poolName && monthlyAmount && employeeCount;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>{"\u276E"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Allowance Pool</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Step 1: Select Category */}
        <View style={styles.card}>
          <Text style={styles.stepTitle}>Step 1: Select Category</Text>
          <Text style={styles.stepSubtitle}>Choose the type of allowance</Text>

          <View style={styles.grid}>
            {categories.map((category) => {
              const colors = colorClasses[category.color];
              const isSelected = selectedCategory === category.id;

              return (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[
                    styles.categoryBtn,
                    { backgroundColor: colors.bg },
                    isSelected && { borderColor: colors.border, borderWidth: 2, transform: [{ scale: 1.02 }] },
                    !isSelected && { borderColor: "transparent", borderWidth: 2 }
                  ]}
                  activeOpacity={0.8}
                >
                  <View style={styles.catHeader}>
                    <View style={[styles.catIconWrap, { backgroundColor: colors.iconBg }]}>
                      <Text style={styles.catIcon}>{category.emoji}</Text>
                    </View>
                    {isSelected && (
                      <View style={styles.checkCircle}>
                        <Text style={styles.checkIcon}>{"\u2714"}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.catName}>{category.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Step 2: Pool Details */}
        <View style={styles.card}>
          <Text style={styles.stepTitle}>Step 2: Pool Details</Text>
          <Text style={styles.stepSubtitle}>Configure allowance settings</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Pool Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Medical Allowance 2026"
              value={poolName}
              onChangeText={setPoolName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Monthly Amount per Employee</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencyLabel}>RM</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                placeholder="600"
                value={monthlyAmount}
                onChangeText={setMonthlyAmount}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <Text style={styles.helperText}>This amount will be allocated to each employee monthly</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Initial Number of Employees</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="24"
              value={employeeCount}
              onChangeText={setEmployeeCount}
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.helperText}>You can add more employees later</Text>
          </View>
        </View>

        {/* Summary */}
        {isFormValid ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Pool Summary</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Monthly allocation per employee:</Text>
              <Text style={styles.summaryValue}>RM {monthlyAmount}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Number of employees:</Text>
              <Text style={styles.summaryValue}>{employeeCount}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Monthly Budget:</Text>
              <Text style={styles.totalValue}>
                RM {(parseFloat(monthlyAmount || "0") * parseInt(employeeCount || "0")).toLocaleString()}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreate}
          disabled={!isFormValid}
          style={[styles.createButton, !isFormValid && styles.createButtonDisabled]}
          activeOpacity={0.8}
        >
          <Text style={styles.createButtonText}>Create Allowance Pool</Text>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  categoryBtn: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  catHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  catIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  catIcon: {
    fontSize: 20,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  catName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1F2937",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
  },
  currencyLabel: {
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 16,
    color: "#6B7280",
  },
  amountInput: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 16,
    fontSize: 16,
    color: "#1F2937",
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
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
