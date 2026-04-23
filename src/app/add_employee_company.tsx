import { employees } from "@/mockData/add_employee";
import { styles } from "@/styles/add_employee_company";
import globalStyles from "@/styles/global";
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

export default function AddEmployeeCompany() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone.includes(searchQuery),
  );

  const handleAddEmployee = () => {
    router.back();
  };

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
            <Text style={styles.headerTitle}>Add People to Company</Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <View style={styles.scrollContent}>
          {/* Step 1: Select Employee */}
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 1: Select People</Text>
            <Text style={styles.stepSubtitle}>Search and choose people</Text>

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
            <ScrollView style={styles.employeeList}>
              <View>
                {filteredEmployees.map((employee) => {
                  const isSelected = selectedEmployees.includes(employee.id);
                  const toggleEmployee = () => {
                    if (isSelected) {
                      setSelectedEmployees(
                        selectedEmployees.filter((id) => id !== employee.id),
                      );
                    } else {
                      setSelectedEmployees([...selectedEmployees, employee.id]);
                    }
                  };
                  return (
                    <TouchableOpacity
                      key={employee.id}
                      onPress={toggleEmployee}
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
                      {isSelected && (
                        <View style={styles.checkCircle}>
                          <Text style={styles.checkIcon}>{"\u2713"}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Add Button */}
          <TouchableOpacity
            onPress={handleAddEmployee}
            disabled={selectedEmployees.length === 0}
            style={[
              styles.createButton,
              selectedEmployees.length === 0 && styles.createButtonDisabled,
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.createButtonText}>
              Add {selectedEmployees.length} People
              {selectedEmployees.length !== 1 && selectedEmployees.length !== 0
                ? "s"
                : ""}{" "}
              to Company
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
