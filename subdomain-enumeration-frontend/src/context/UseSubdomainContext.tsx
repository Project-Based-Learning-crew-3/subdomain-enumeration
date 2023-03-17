import { useContext } from "react";
import { subdomainContext } from "./subdomainContext";
import { StateSubdomainsContext } from "../types/StateSubdomainsContext";

export const UseSubdomainContext = () => {
  const subdomainData = useContext(subdomainContext) as StateSubdomainsContext;

  return subdomainData;
};
