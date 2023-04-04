import { UseSubdomainContext } from "../context/UseSubdomainContext"

export const filterDomain = () => {
    const { subdomains } = UseSubdomainContext();
    console.log(subdomains)
}

export const convertToJson = (subdomains:string[]) => {

    const json = JSON.stringify(subdomains, null, 2)
    return json
}