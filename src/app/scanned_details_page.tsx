import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ScannedDetailsPage() {
  const { data } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned Details</Text>
      <Text style={styles.data}>
        {typeof data === "string"
          ? decodeURIComponent(data)
          : "No data scanned"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  data: {
    fontSize: 16,
  },
});
