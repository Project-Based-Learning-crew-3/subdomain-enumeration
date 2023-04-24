import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getScreenshot } from "../api/getsubdomains";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import axios from "axios";
import {
  TLocalStorageState,
  TsubdomainWithStatusCode,
} from "../types/StateSubdomainsContext";

const Detail = () => {
  const { id } = useParams();
  const { subdomains, setSubDomains } = UseSubdomainContext();
  const [base64data, setBase64Data] = useState<string>("");

  let reqSubDomain = subdomains[(id as any) - 1];
  console.log(reqSubDomain?.subdomain);

  console.log(subdomains);
  useEffect(() => {
    const data: TLocalStorageState = JSON?.parse(
      localStorage?.getItem("searchedsubdomains")!
    );
    // console.log(data);
    if (data.length > 0) {
      setSubDomains(data[data?.length - 1]?.subdomains);
    }
    if (reqSubDomain?.screenshot) {
      setBase64Data(reqSubDomain?.screenshot);
    } else {
      console.log("came to else block");
      axios
        .get(
          `https://api.apiflash.com/v1/urltoimage?access_key=50b816ea01e643d096c4e7948539b372&wait_until=page_loaded&url=https://${reqSubDomain?.subdomain}`,
          { responseType: "arraybuffer" }
        )
        .then((response) => {
          // convert to base64 from arraybuffer
          let base64 = btoa(
            new Uint8Array(response.data).reduce((data, byte) => {
              return data + String.fromCharCode(byte);
            }, "")
          );

          setBase64Data(base64);
          let newArrWithSs = subdomains.map((s) => {
            if (s.subdomain === reqSubDomain.subdomain) {
              return { ...s, screenshot: base64 };
            } else {
              return s;
            }
          });

          setSubDomains(newArrWithSs);

          const data: TLocalStorageState = JSON?.parse(
            localStorage?.getItem("searchedsubdomains")!
          );

          data[data.length - 1].subdomains = newArrWithSs;

          localStorage.setItem("searchedsubdomains", JSON.stringify(data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  console.log(base64data);
  // console.log(id);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ width: "1000px" }}
          src={`data:image/png;base64,${base64data}`}
          alt="screenshot"
        />
      </div>

      {/* <img src={`data:image/png;base64,${ss}`} alt="" /> */}
    </>
  );
};

export default Detail;
