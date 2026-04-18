import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "@/styles/create_pool";

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
