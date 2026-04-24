/**
 * Environment configuration
 * All variables are loaded from .env file with EXPO_PUBLIC_ prefix
 */

export const ENV = {
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL || "http://192.168.100.15:8000/v1",
  API_KEY: process.env.EXPO_PUBLIC_API_KEY || "",
} as const;

export default ENV;
