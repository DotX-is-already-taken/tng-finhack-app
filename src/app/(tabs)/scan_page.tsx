import { Ionicons } from "@expo/vector-icons";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScanPage() {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const insets = useSafeAreaInsets();
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  const isScannedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      isScannedRef.current = false;
    }, [])
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 250,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scanLineAnim]);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (isScannedRef.current || codes.length === 0) return;
      
      const value = codes[0].value;
      if (!value) return;

      isScannedRef.current = true;


      import('expo-router').then(({ router }) => {
        router.push({
          pathname: "/scanned_details_page",
          params: { data: value },
        });
      });
    }
  });

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={80} color="#007AFF" style={{ marginBottom: 20 }} />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          We need your permission to access the camera in order to scan QR codes.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFillObject}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
        torch={isFlashOn ? "on" : "off"}
      />
      <View style={styles.overlay}>
        <View style={styles.topOverlay}>
          <Text
            style={[styles.headerText, { marginTop: Math.max(insets.top, 40) }]}
          >
            Scan QR Code
          </Text>
          <Text style={styles.subHeaderText}>
            Align QR code within the frame
          </Text>
        </View>

        <View style={styles.middleOverlay}>
          <View style={styles.sideOverlay} />

          <View style={styles.scannerBox}>
            {/* Animated Scan Line */}
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineAnim }] },
              ]}
            />

            {/* Viewfinder Corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>

          <View style={styles.sideOverlay} />
        </View>

        <View style={styles.bottomOverlay}>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setIsFlashOn((current) => !current)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.flashIconContainer,
                isFlashOn && styles.flashIconContainerActive,
              ]}
            >
              <Ionicons
                name={isFlashOn ? "flash" : "flash-off"}
                size={24}
                color={isFlashOn ? "#000" : "#fff"}
              />
            </View>
            <Text style={styles.flashButtonText}>
              {isFlashOn ? "Flash On" : "Flash Off"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#FAFAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subHeaderText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
  },
  middleOverlay: {
    flexDirection: "row",
    height: 250,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  scannerBox: {
    width: 250,
    height: 250,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  scanLine: {
    width: "100%",
    height: 3,
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#007AFF",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  flashButton: {
    alignItems: "center",
    marginBottom: 24,
  },
  flashIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  flashIconContainerActive: {
    backgroundColor: "#fff",
  },
  flashButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  rescanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  rescanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
