import axios from "axios";

// const API_URL = process.env.REACT_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL
const API_URL= "https://subdomain-enumeration-backend.onrender.com/findsubdomains";

export const getSubdomains = async (domain: string) => {
    const response = await axios.post(
      API_URL + "/findsubdomains" || "",
      {
        domain: domain,
      }
    );    
    return response;
}