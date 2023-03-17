import axios from "axios";

export const getSubdomains = async (domain: string) => {
const response = await axios.post(
    process.env.REACT_APP_API_URL + "/findsubdomains" || "",
    {
      domain: domain,
    }

    );    
    return response;
}