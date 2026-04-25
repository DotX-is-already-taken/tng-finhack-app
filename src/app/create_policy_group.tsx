import categories from "@/mockData/create_policy";
import masterPolicies from "@/mockData/master_policy";
import { colorClasses, styles } from "@/styles/create_pool";
import globalStyles from "@/styles/global";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount } from "@/context/AccountContext";

const categoryUIMap: Record<string, { icon: string; bg: string; border: string; iconBg: string }> = {
  medical: { icon: "🏥", bg: "#FDECEC", border: "#FBCACA", iconBg: "#FFEBEE" },
  transport: { icon: "🚗", bg: "#ECF2FF", border: "#C5D8FF", iconBg: "#E3F2FD" },
  meals: { icon: "🍽️", bg: "#FFF7E8", border: "#F9E0B0", iconBg: "#FFF8E1" },
  accomodation: { icon: "🏨", bg: "#F5F3FF", border: "#DDD6FE", iconBg: "#F3E5F5" },
  "gym/wellness": { icon: "💪", bg: "#ECFDF3", border: "#C5F2D8", iconBg: "#E8F5E9" },
  "phone/internet": { icon: "📱", bg: "#F0F9FF", border: "#B9E6FE", iconBg: "#E1F5FE" },
  others: { icon: "💰", bg: "#F9FAFB", border: "#E5E7EB", iconBg: "#F5F5F5" },
};

export default function CreatePolicyGroup() {
  const router = useRouter();
  const { tenantPolicies } = useAccount();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [poolName, setPoolName] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");

  const insets = useSafeAreaInsets();

  const selectedPolicyData = tenantPolicies?.find(p => p.id === selectedCategory);
  const maxLimit = selectedPolicyData?.max_limit || 0;
  const isOverLimit = parseFloat(monthlyAmount) > maxLimit;

  const handleCreate = () => {
    router.back();
  };

  const isFormValid =
    selectedCategory && poolName && monthlyAmount && employeeCount && !isOverLimit;

  return (
    <View style={{ ...globalStyles.safearea, paddingTop: insets.top }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>{"\u276E"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Policy</Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Step 1: Select Category */}
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 1: Select Category</Text>
            <Text style={styles.stepSubtitle}>Choose the type of Pool</Text>

            <View style={styles.grid}>
              {(tenantPolicies || []).map((policy) => {
                const ui = categoryUIMap[policy.id] || categoryUIMap.others;
                const isSelected = selectedCategory === policy.id;

                return (
                  <TouchableOpacity
                    key={policy.id}
                    onPress={() => setSelectedCategory(policy.id)}
                    style={[
                      styles.categoryBtn,
                      { backgroundColor: ui.bg },
                      isSelected && {
                        borderColor: ui.border,
                        borderWidth: 2,
                        transform: [{ scale: 1.02 }],
                      },
                      !isSelected && {
                        borderColor: "transparent",
                        borderWidth: 2,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <View style={styles.catHeader}>
                      <View
                        style={[
                          styles.catIconWrap,
                          { backgroundColor: ui.iconBg },
                        ]}
                      >
                        <Text style={styles.catIcon}>{ui.icon}</Text>
                      </View>
                    </View>
                    <Text style={styles.catName}>{policy.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Step 2: Policy Details */}
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 2: Policy Details</Text>
            <Text style={styles.stepSubtitle}>Configure policy settings</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Policy Name</Text>
              <View style={styles.input}>
                <TextInput
                  style={{ flex: 1, fontSize: 16, color: "#1F2937" }}
                  keyboardType="default"
                  placeholder="Enter policy name"
                  value={poolName}
                  onChangeText={setPoolName}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text style={styles.helperText}>A name for the policy group</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Maximum Amount per Policy</Text>
              <View
                style={[
                  styles.amountInputContainer,
                  isOverLimit && { borderColor: "#EF4444", borderWidth: 1.5 },
                ]}
              >
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
              {isOverLimit ? (
                <Text style={{ color: "#EF4444", fontSize: 11, marginTop: 4 }}>
                  Maximum limit for this category is RM {maxLimit}. Please enter
                  a lower value.
                </Text>
              ) : (
                <Text style={styles.helperText}>
                  User cannot go beyond this amount for the policy
                </Text>
              )}
            </View>
          </View>

          {/* Summary */}
          {isFormValid ? (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Pool Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Monthly allocation per employee:
                </Text>
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
                  RM{" "}
                  {(
                    parseFloat(monthlyAmount || "0") *
                    parseInt(employeeCount || "0")
                  ).toLocaleString()}
                </Text>
              </View>
            </View>
          ) : null}

          {/* Create Button */}
          <TouchableOpacity
            onPress={handleCreate}
            disabled={!isFormValid}
            style={[
              styles.createButton,
              !isFormValid && styles.createButtonDisabled,
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.createButtonText}>Create Allowance Pool</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
