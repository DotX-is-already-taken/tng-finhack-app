import React, { createContext, useContext, useState } from "react";

type AccountMode = "personal" | "business";

interface AuthData {
  access_token: string;
  refresh_token?: string;
  user_id?: string;
  email?: string;
  full_name?: string;
  [key: string]: any;
}

interface UserData {
  id: string;
  full_name: string;
  email: string;
  user_status: string;
  created_at: string;
  updated_at: string;
  // Add other user fields as needed
}

interface UserTenantData {
  user_tenant_id: string;
  tenant_id: string;
  user_id: string;
  work_email: string;
  external_tenant_ref: string;
  user_tenant_status: string;
  verified_at: string;
  created_at: string;
  updated_at: string;
}

interface UserAllowanceSummary {
  user_tenant_id: string;
  items: [
    {
      policy_group_id: string;
      policy_group_name: string;
      policy_group_description: string;
      policy_group_status: string;
      max_limit: number;
      consumed_amount: number;
      reserved_amount: number;
      remaining_amount: number;
      currency: string;
      effective_from: string;
      effective_to: string;
      last_consumed_at: string;
    },
  ];
}

interface AccountContextType {
  accountMode: AccountMode;
  setAccountMode: (mode: AccountMode) => void;
  authData: AuthData | null;
  userData: UserData | null;
  userTenants: UserTenantData | null;
  userAllowanceSummary: UserAllowanceSummary | null;
  setAuthData: (data: AuthData) => void;
  setUserData: (data: UserData) => void;
  setUserTenants: (data: UserTenantData) => void;
  setUserAllowanceSummary: (data: UserAllowanceSummary) => void;
  clearAuthData: () => void;
  clearAllowanceSummary: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountMode, setAccountMode] = useState<AccountMode>("personal");
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userTenants, setUserTenants] = useState<UserTenantData | null>(null);
  const [userAllowanceSummary, setUserAllowanceSummary] =
    useState<UserAllowanceSummary | null>(null);

  const clearAuthData = () => {
    setAuthData(null);
    setUserData(null);
    setUserTenants(null);
    setUserAllowanceSummary(null);
  };

  const clearAllowanceSummary = () => {
    setUserAllowanceSummary(null);
  };

  return (
    <AccountContext.Provider
      value={{
        accountMode,
        setAccountMode,
        authData,
        setAuthData,
        clearAuthData,
        userData,
        setUserData,
        userTenants,
        setUserTenants,
        userAllowanceSummary,
        setUserAllowanceSummary,
        clearAllowanceSummary,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
