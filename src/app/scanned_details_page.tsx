import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScannedDetailsPage() {
  const { data } = useLocalSearchParams();
  const router = useRouter();
  
  const [amount, setAmount] = useState("");
  const [useWallet, setUseWallet] = useState(false);

  // Fake merchant name for demonstration
  const merchantName = "Starbucks Reserve";

  const handlePay = () => {
    // Implement payment logic here
    console.log(`Paying ${amount} to ${merchantName}. Using wallet: ${useWallet}`);
    alert(`Payment of RM${amount} successful!`);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex1}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.flex1}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#007AFF" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.container}>
              {/* Merchant Info */}
              <View style={styles.merchantContainer}>
                <View style={styles.merchantIconBg}>
                  <Ionicons name="storefront" size={40} color="#007AFF" />
                </View>
                <Text style={styles.merchantName}>{merchantName}</Text>
                <Text style={styles.scannedDataText} numberOfLines={1}>
                  ID: {typeof data === "string" ? decodeURIComponent(data) : "Unknown"}
                </Text>
              </View>

              {/* Payment Card */}
              <View style={styles.card}>
                <Text style={styles.inputLabel}>Enter Amount</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>RM</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={amount}
                    onChangeText={setAmount}
                    autoFocus={true}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.toggleRow}>
                  <View style={styles.toggleTextContainer}>
                    <Text style={styles.toggleLabel}>Employment Wallet</Text>
                    <Text style={styles.toggleSubText}>Use company allowance</Text>
                  </View>
                  <Switch
                    value={useWallet}
                    onValueChange={setUseWallet}
                    trackColor={{ false: "#E5E5EA", true: "#34C759" }}
                    ios_backgroundColor="#E5E5EA"
                  />
                </View>
              </View>

              <View style={styles.spacer} />

              {/* Pay Button */}
              <TouchableOpacity 
                style={[styles.payButton, !amount && styles.payButtonDisabled]} 
                onPress={handlePay}
                disabled={!amount}
              >
                <Text style={styles.payButtonText}>
                  Pay {amount ? `RM${amount}` : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  flex1: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 17,
    color: "#007AFF",
    marginLeft: 4,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  merchantContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  merchantIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  merchantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  scannedDataText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8E8E93",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    height: 50,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginVertical: 24,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  toggleSubText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  spacer: {
    flex: 1,
  },
  payButton: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: Platform.OS === "ios" ? 10 : 20,
  },
  payButtonDisabled: {
    backgroundColor: "#A1C8F6",
    shadowOpacity: 0,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
