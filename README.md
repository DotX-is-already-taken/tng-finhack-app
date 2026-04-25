# TNG Finhack App 👋

A modern fintech application built for the TNG Finhack, focusing on seamless allowance management and business-to-employee financial interactions.

## Requirements

1.  **NodeJS V24**
2.  **XCode** (for iOS) / **Android Studio** (for Android)
3.  **Physical Device & Cable** (recommended for rapid installation and testing)

## Features

- 👤 **Dual Mode Support**: Seamlessly switch between Personal and Business (Admin) accounts.
- 💳 **Allowance Wallets**: Track and manage employment benefits like Medical, Travel, Meals, and Wellness.
- 📊 **Admin Dashboard**: Business owners can monitor active pools, manage policies, and track employee spending.
- 🛡️ **Policy Management**: Create and configure master policies with custom limits and MCC restrictions.
- 🔍 **Smart QR Scanning**: Pay at merchants with real-time verification and automatic company allowance detection.
- 📈 **Spending Insights**: Visual progress tracking and pace analysis for all allowance categories.

## Get Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory and add your API base URL:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://your-api-ip:8000/v1
   ```

3. **Install into iOS/Android Device**

   **iOS**
   ```bash
   npm run ios
   ```

   **Android**
   ```bash
   npm run android
   ```

4. **Start the server for wireless live debug**
   ```bash
   npm start
   ```

## Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **State Management**: React Context API (AccountProvider)
- **Navigation**: Expo Router (File-based)
- **Styling**: Vanilla React Native StyleSheet
- **Icons**: Ionicons & FontAwesome via @expo/vector-icons
- **Components**: Ant Design Mobile RN (Progress bars, etc.)

---
*Built with ❤️ for the TNG Finhack*



