import { UseSubdomainContext } from "../context/UseSubdomainContext"

export const filterDomain = () => {
    const { subdomains } = UseSubdomainContext();
    console.log(subdomains)
}