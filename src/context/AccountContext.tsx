import React, { createContext, useContext, useState } from "react";

type AccountMode = "personal" | "business";

interface AccountContextType {
  accountMode: AccountMode;
  setAccountMode: (mode: AccountMode) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountMode, setAccountMode] = useState<AccountMode>("personal");

  return (
    <AccountContext.Provider value={{ accountMode, setAccountMode }}>
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
