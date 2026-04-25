import { employees, pools } from "@/mockData/add_employee";
import { poolColorClasses, styles } from "@/styles/add_employee";
import { styles as masterStyles } from "@/styles/create_pool";
import globalStyles from "@/styles/global";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreatePool() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const { tenantPoliciesList } = useAccount();

  const categoryEmojiMap: Record<string, string> = {
    medical: "🏥",
    transport: "🚗",
    meals: "🍽️",
    accomodation: "🏨",
    gym: "💪",
    others: "💰",
  };

  const displayPolicies = Array.isArray(tenantPoliciesList) ? tenantPoliciesList : [];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.includes(searchQuery),
  );

  const handleAddEmployee = () => {
    router.back();
  };

  const isFormValid = policyName && selectedEmployee && selectedPolicy;

  return (
    <View style={[globalStyles.safearea, { paddingTop: insets.top + 8 }]}>
      <View style={{ ...globalStyles.container }}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >   
              <Text style={styles.backButtonText}>{"\u276E"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Allowance Pool</Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 1: Pool Details</Text>
            <Text style={styles.stepSubtitle}>Configure Pool settings</Text>

            <View style={masterStyles.inputGroup}>
              <Text style={masterStyles.inputLabel}>Pool Name</Text>
              <View style={masterStyles.input}>
                <TextInput
                  style={{ flex: 1, fontSize: 16, color: "#1F2937" }}
                  placeholder="e.g. Weekly Coffee Allowance"
                  value={policyName}
                  onChangeText={setPolicyName}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Step 2: Select Employee */}
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 2: Select Employee</Text>
            <Text style={styles.stepSubtitle}>
              Search and choose an employee
            </Text>

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
                        <Text style={styles.employeePhone}>
                          {employee.phone}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Step 3: Select Pool */}
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 3: Select Category</Text>
            <Text style={styles.stepSubtitle}>Choose which category to assign</Text>

            <View style={styles.poolList}>
              {displayPolicies.map((policy) => {
                const isSelected = selectedPolicy === policy.tenant_policy_id;
                const emoji = categoryEmojiMap[policy.category?.toLowerCase()] || categoryEmojiMap["others"];

                return (
                  <TouchableOpacity
                    key={policy.tenant_policy_id}
                    onPress={() => {
                      setSelectedPolicy(policy.tenant_policy_id);
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
                            backgroundColor: "#F9FAFB",
                            borderColor: "transparent",
                          },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.poolEmoji}>{emoji}</Text>
                    <View style={styles.poolInfo}>
                      <Text style={styles.poolName}>{policy.policy_name}</Text>
                      <Text style={styles.poolAmount}>
                        RM {policy.max_limit}/month
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Add Button */}
          <TouchableOpacity
            onPress={handleAddEmployee}
            style={[
              styles.createButton,
              !isFormValid && styles.createButtonDisabled
            ]}
            activeOpacity={0.8}
            disabled={!isFormValid}
          >
            <Text style={styles.createButtonText}>Create Allowance Pool</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
