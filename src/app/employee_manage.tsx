import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import employees from "@/mockData/employee_manage";
import styles from "@/styles/employee_manage";
import globalStyles from "@/styles/global";

export default function EmployeeManagement() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const insets = useSafeAreaInsets();

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.includes(searchQuery),
  );

  return (
    <View style={[globalStyles.safearea, { paddingTop: insets.top }]}>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Text style={styles.iconButtonText}>{"\u276E"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Employee Management</Text>
            <TouchableOpacity
              onPress={() => router.push("/add_employee")}
              style={styles.iconButton}
            >
              <Text style={styles.iconButtonText}>{"\u2795"}</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsCard}>
            <View style={styles.statsInner}>
              <View style={styles.statsIconWrap}>
                <Text style={styles.statsIcon}>{"\uD83D\uDC65"}</Text>
              </View>
              <View style={styles.statsInfo}>
                <Text style={styles.statsLabel}>Total Employees</Text>
                <Text style={styles.statsValue}>24</Text>
              </View>
              <View style={styles.statsRight}>
                <Text style={styles.statsLabel}>Avg. Allowance</Text>
                <Text style={styles.statsValue}>RM 1,400</Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Search */}
          <View style={styles.searchCard}>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>{"\uD83D\uDD0D"}</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search employees..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Employee List */}
          <View style={styles.employeeList}>
            {filteredEmployees.map((employee) => {
              const totalAllowance = employee.pools.reduce(
                (sum, pool) => sum + parseFloat(pool.amount),
                0,
              );

              return (
                <View key={employee.id} style={styles.employeeCard}>
                  <View style={styles.employeeCardHeader}>
                    <View style={styles.avatarWrap}>
                      <Text style={styles.avatarText}>{employee.avatar}</Text>
                    </View>
                    <View style={styles.employeeInfo}>
                      <Text style={styles.employeeName}>{employee.name}</Text>
                      <Text style={styles.employeePhone}>{employee.phone}</Text>
                      <Text style={styles.employeeTotal}>
                        RM {totalAllowance}/month
                      </Text>
                    </View>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editIcon}>{"\u270E"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteButton}>
                        <Text style={styles.deleteIcon}>{"\uD83D\uDDD1"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Pool Assignments */}
                  <View style={styles.poolTags}>
                    {employee.pools.map((pool, idx) => {
                      const colorMap: Record<
                        string,
                        { bg: string; text: string; border: string }
                      > = {
                        red: {
                          bg: "#FEF2F2",
                          text: "#B91C1C",
                          border: "#FECACA",
                        },
                        green: {
                          bg: "#F0FDF4",
                          text: "#15803D",
                          border: "#BBF7D0",
                        },
                        orange: {
                          bg: "#FFF7ED",
                          text: "#C2410C",
                          border: "#FED7AA",
                        },
                        blue: {
                          bg: "#EFF6FF",
                          text: "#1D4ED8",
                          border: "#BFDBFE",
                        },
                      };
                      const colors = colorMap[pool.color] || colorMap.blue;

                      return (
                        <View
                          key={idx}
                          style={[
                            styles.poolTag,
                            {
                              backgroundColor: colors.bg,
                              borderColor: colors.border,
                            },
                          ]}
                        >
                          <Text style={styles.poolTagEmoji}>{pool.emoji}</Text>
                          <Text
                            style={[styles.poolTagName, { color: colors.text }]}
                          >
                            {pool.name}
                          </Text>
                          <Text
                            style={[
                              styles.poolTagAmount,
                              { color: colors.text },
                            ]}
                          >
                            RM {pool.amount}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}

            {filteredEmployees.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>{"\uD83D\uDD0D"}</Text>
                <Text style={styles.emptyStateText}>No employees found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
