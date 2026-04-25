import categories from "@/mockData/create_policy";
import { colorClasses, styles } from "@/styles/create_pool";
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

export default function CreateMasterPolicy() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");

  const insets = useSafeAreaInsets();

  const handleCreate = () => {
    router.back();
  };

  const isFormValid =
    selectedCategory && monthlyAmount;

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
            <Text style={styles.headerTitle}>Create Master Policy</Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Step 1: Select Category */}
          <View style={styles.card}>
            <Text style={styles.stepTitle}>Step 1: Select Category</Text>
            <Text style={styles.stepSubtitle}>
              Choose the type of master policy
            </Text>

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
                      isSelected && {
                        borderColor: colors.border,
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
                          { backgroundColor: colors.iconBg },
                        ]}
                      >
                        <Text style={styles.catIcon}>{category.emoji}</Text>
                      </View>
                    </View>
                    <Text style={styles.catName}>{category.name}</Text>
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
              <Text style={styles.inputLabel}>Maximum Amount per Policy</Text>
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
              <Text style={styles.helperText}>
                User cannot beyond this amount for the policy
              </Text>
            </View>
          </View>

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
