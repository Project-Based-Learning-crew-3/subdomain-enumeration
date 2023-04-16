import React, { ReactNode, createContext, useState } from "react";
import {
  TStateSubdomainsContext,
  TsubdomainWithStatusCode,
} from "../types/StateSubdomainsContext";

export const subdomainContext = createContext<TStateSubdomainsContext>({
  subdomains: JSON.parse(localStorage.getItem("searchedsubdomains")!)?.slice(-1)
    ?.subdomains,
  setSubDomains: () => {},
});

export const SubdomainProvider = ({ children }: { children: ReactNode }) => {
  const [subdomains, setSubDomains] = useState<TsubdomainWithStatusCode[]>([]);
  return (
    <subdomainContext.Provider value={{ subdomains, setSubDomains }}>
      {children}
    </subdomainContext.Provider>
  );
};
