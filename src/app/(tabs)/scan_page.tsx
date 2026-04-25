import { Ionicons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScanPage() {
  const [scanned, setScanned] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    setScanned(true);
    // Navigate to a new page with the scanned data
    router.push(
      `/scanned_details_page?data=${encodeURIComponent(result.data)}`,
    );
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color: "white" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        enableTorch={isFlashOn}
      />
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.middleOverlay}>
          <View style={styles.sideOverlay} />
          <View style={styles.scannerBox} />
          <View style={styles.sideOverlay} />
        </View>
        <View style={styles.bottomOverlay}>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setIsFlashOn((current) => !current)}
          >
            <Ionicons
              name={isFlashOn ? "flash" : "flash-off"}
              size={32}
              color="white"
            />
            <Text style={styles.flashButtonText}>
              {isFlashOn ? "Flash On" : "Flash Off"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {scanned && (
        <View style={styles.rescanButtonContainer}>
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
            color="#fff"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  middleOverlay: {
    flexDirection: "row",
    height: 250,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scannerBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  rescanButtonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  flashButton: {
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  flashButtonText: {
    color: "white",
    marginTop: 8,
  },
});
