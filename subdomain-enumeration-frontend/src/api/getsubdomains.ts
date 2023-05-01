import axios from "axios";
// const API_URL = process.env.REACT_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL
const API_URL= REACT_APP_BACKEND_URL;

export const getSubdomains = async (domain: string) => {
    const response = await axios.post(
      API_URL + "/findsubdomains" || "",
      {
        domain: domain,
      }
    );    
    return response;
}
// 
// export const getScreenshot = async(subdomain:string) => {
  // const response = await axios.get(
    
  //   "https://api.apiflash.com/v1/urltoimage?access_key=50b816ea01e643d096c4e7948539b372&wait_until=page_loaded&url=http://google.com",
  //   {
  //     // URLSearchParams :{
        
  //     //   access_key:"50b816ea01e643d096c4e7948539b372",
  //     //   url:"kct.ac.in"
  //     // },
  //     headers :{
  //       "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  //     }
      
  //   },
    
  // );    
  // return response;


  //api.apiflash.com/v1/urltoimage?access_key=YOUR_ACCESS_KEY&url=https://example.com')
    //  await axios.get("")
  //   {
    // .then(response => {
    //     response
    //         .blob()
    //         .then(blob => {
    //             let a = document.createElement('a');
    //             a.href = window.URL.createObjectURL(blob);
    //             a.download = 'screenshot.jpeg';
    //             document.body.appendChild(a);
    //             a.click();
    //         });
    // });
  

// }


export const findAllLinks = async (domain: string) => {
  const response = await axios.post(
    API_URL + "/findalllinks" || "",
    {
      domain: domain,
    }
  );    
  return response;

}


export const getHeaders = async (domain: string) => {
  const response = await axios.post(
    API_URL + "/getheaders" || "",
    {
      domain: domain,
    }
  );    
  return response;

}
