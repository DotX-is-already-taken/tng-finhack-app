import { getAllowanceSummary } from "@/api/getUserAllowance";
import { useRouter } from "expo-router";
import { useState } from "react";
import { getAuth, getUser } from "../api/getUser";
import { getTenants } from "../api/getUserTenants";
import { useAccount } from "../context/AccountContext";

export function useLogin() {
  const router = useRouter();
  const { setAuthData, setUserData, setUserTenants, setUserAllowanceSummary } =
    useAccount();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const authData = await getAuth(phone, password);
      setAuthData(authData);
      const userData = await getUser(authData.access_token, authData.user_id);
      setUserData(userData);
      const tenants = await getTenants(authData.user_id, authData.access_token);
      setUserTenants(tenants);
      const allowanceSummary = await getAllowanceSummary(
        tenants.user_tenant_id,
        authData.access_token,
      );
      setUserAllowanceSummary(allowanceSummary);

      if (authData.access_token) {
        router.replace("/home");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (authError) setError(false);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (authError) setError(false);
  };

  return {
    phone,
    setPhone,
    password,
    setPassword,
    authError,
    isLoading,
    handleLogin,
    handlePhoneChange,
    handlePasswordChange,
  };
}
