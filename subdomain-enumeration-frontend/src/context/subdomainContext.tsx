import React, { ReactNode, createContext, useState } from "react";
import { StateSubdomainsContext, subdomainWithStatusCode } from "../types/StateSubdomainsContext";



export const subdomainContext = createContext<StateSubdomainsContext>({
  subdomains:null,
  setSubDomains: () => {},
});

export const SubdomainProvider = ({ children }: { children: ReactNode }) => {
  const [subdomains, setSubDomains] = useState<subdomainWithStatusCode[]>([]);
  return (
    <subdomainContext.Provider value={{ subdomains, setSubDomains }}>
      {children}
    </subdomainContext.Provider>
  );
};
