import { useContext } from "react";
import { subdomainContext } from "./subdomainContext";

export const UseSubdomainContext = () => {
  const subdomainData = useContext(subdomainContext);

  return subdomainData;
};
