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

interface TenantOverview {
  active_employee_count: number;
  active_policy_count: number;
  active_pool_count: number;
  currency: string;
  tenant_id: string;
  total_allowance_allocated: number;
}

interface AccountContextType {
  accountMode: AccountMode;
  setAccountMode: (mode: AccountMode) => void;
  authData: AuthData | null;
  userData: UserData | null;
  userTenants: UserTenantData | null;
  userAllowanceSummary: UserAllowanceSummary | null;
  tenantOverview: TenantOverview | null;
  tenantPolicies: any[] | null;
  tenantPools: any[] | null;
  tenantPoliciesList: any[] | null;
  selectedAllowanceDetails: any | null;
  setAuthData: (data: AuthData) => void;
  setUserData: (data: UserData) => void;
  setUserTenants: (data: UserTenantData) => void;
  setUserAllowanceSummary: (data: UserAllowanceSummary) => void;
  setTenantOverview: (data: TenantOverview) => void;
  setTenantPolicies: (data: any[]) => void;
  setTenantPools: (data: any[]) => void;
  setTenantPoliciesList: (data: any[]) => void;
  setSelectedAllowanceDetails: (data: any) => void;
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
  const [tenantOverview, setTenantOverview] = useState<TenantOverview | null>(null);
  const [tenantPolicies, setTenantPolicies] = useState<any[] | null>(null);
  const [tenantPools, setTenantPools] = useState<any[] | null>(null);
  const [tenantPoliciesList, setTenantPoliciesList] = useState<any[] | null>(null);
  const [selectedAllowanceDetails, setSelectedAllowanceDetails] = useState<any | null>(null);

  const clearAuthData = () => {
    setAuthData(null);
    setUserData(null);
    setUserTenants(null);
    setUserAllowanceSummary(null);
    setTenantOverview(null);
    setTenantPolicies(null);
    setTenantPools(null);
    setTenantPoliciesList(null);
    setSelectedAllowanceDetails(null);
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
        tenantOverview,
        setTenantOverview,
        tenantPolicies,
        setTenantPolicies,
        tenantPools,
        setTenantPools,
        tenantPoliciesList,
        setTenantPoliciesList,
        selectedAllowanceDetails,
        setSelectedAllowanceDetails,
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
