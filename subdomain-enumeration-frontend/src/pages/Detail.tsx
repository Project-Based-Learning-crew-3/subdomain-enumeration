import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { findAllLinks, getHeaders } from "../api/getsubdomains";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import axios from "axios";
import {
  TLocalStorageState,
  TsubdomainWithStatusCode,
} from "../types/StateSubdomainsContext";
import download from "../assets/download.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../assets/blurimg.jpg";
import "react-lazy-load-image-component/src/effects/blur.css";

const Detail = () => {
  const { subdomain } = useParams();
  const { subdomains, setSubDomains } = UseSubdomainContext();
  const [links, setLinks] = useState<string[]>([]);
  const [base64data, setBase64Data] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [headers, setHeaders] = useState<any>({});
  const navigate = useNavigate();

  let reqSubDomain = subdomains?.find(
    (s) => s?.subdomain === (subdomain as string)
  );
  console.log(reqSubDomain);

  useEffect(() => {
    // findAllLinks(reqSubDomain?.subdomain || "")
    //   .then((res) => {
    //     setLinks(res?.data?.links);
    //     // console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    getHeaders(reqSubDomain?.subdomain || "")
      .then((res) => {
        setHeaders(res?.data?.headers);
        console.log(headers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let btnStyle: any = {
    backgroundColor: "rgb(172, 195, 25)",
    border: "1.9px solid rgb(172, 195, 25)",
    borderRadius: "27.1429px",
    fontFamily: "Raleway",
    width: "100px",
    height: "35px",
    fontSize: "18px",
    cursor: "pointer",
    color: "black",
    marginTop: "1rem",
  };
  let downloadBtnStyle: any = {
    backgroundColor: "rgb(172, 195, 25)",
    border: "1.9px solid rgb(172, 195, 25)",
    borderRadius: "10px",
    fontFamily: "Raleway",
    // width: "100px",
    height: "45px",
    fontSize: "18px",
    cursor: "pointer",
    color: "black",
    marginTop: "1rem",
    // padding: "1rem",
  };

  // console.log(subdomains);
  useEffect(() => {
    const data: TLocalStorageState = JSON?.parse(
      localStorage?.getItem("searchedsubdomains")!
    );
    setDomain(data[data?.length - 1]?.domain);
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
            if (s.subdomain === reqSubDomain?.subdomain) {
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

  // console.log(base64data);
  // console.log(id);
  return (
    <div
      // className="dark-bg"
      style={{
        background: "rgb(10,10,10)",
        paddingLeft: "1rem",
        paddingTop: "2rem",
        paddingBottom: "1rem",
        margin: "3rem",
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "15px",
        // overflowX: "scroll",
      }}
    >
      <div
        style={{
          borderRadius: "25px",
        }}
      >
        {/* <h2 style={{ color: "white" }}>{reqSubDomain?.subdomain}</h2> */}
        <LazyLoadImage
          src={`data:image/png;base64,${base64data}`}
          alt="screenshot"
          height={500}
          width={900}
          placeholderSrc={placeholder}
          effect="opacity"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "900px",
            marginTop: "1rem",
          }}
        >
          <div>
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                fontFamily: "Raleway",
              }}
            >
              URL : https://{reqSubDomain?.subdomain}
            </p>

            <a
              href={`data:image/png;base64,${base64data}`}
              download={`${reqSubDomain?.subdomain}.png`}
              style={{
                textDecoration: "none",
              }}
            >
              <button style={downloadBtnStyle}>
                <span>Download image </span>
                <img
                  src={download}
                  alt="d"
                  style={{ width: "20px", marginTop: "2px" }}
                />
              </button>
            </a>
          </div>
          <button
            onClick={() => {
              window.open(`https://${reqSubDomain?.subdomain}`, "_blank");
            }}
            style={btnStyle}
          >
            visit url
          </button>
        </div>

        {/* <span style={{ color: "white", display: "block" }}>
          click
          <a
            style={{ marginInline: "5px" }}
            download={`${reqSubDomain?.subdomain}.png`}
            href={`data:image/png;base64${base64data}`}
          >
            here
          </a>
          to download the image
        </span> */}
      </div>

      {/* <img src={`data:image/png;base64,${ss}`} alt="" /> */}

      <div
        style={{
          color: "white",
          marginRight: "auto",
          marginLeft: "9rem",
          fontSize: "25px",
          height: "600px",
          overflowY: "scroll",
          width: "600px",
          // overflowX: "hidden",

          // display: "flex",
          // justifyContent: "flex-start",
        }}
        className="scrollbar"
      >
        <span style={{ marginBottom: "2rem" }}>URL details :</span>
        {/* fj */}
        <div>
          <p style={{ fontWeight: "bold" }}>Main domain : {domain}</p>
        </div>
        <span style={{ fontWeight: "bold" }}>Response Headers:</span>
        {headers &&
          Object.keys(headers).map((key) => (
            <div key={key}>
              <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>{key} :</h2>
              <ul style={{ padding: 0 }}>
                {headers[key].map((item: any) => (
                  <li style={{ color: "white" }} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {/* <ul> */}
        {/* map over links array and display if it startswith http */}
        {/* {links?.map((l) =>
            l?.startsWith("http") ? (
              <li>
                <a
                  href={l}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "20px", color: "white" }}
                >
                  {l}
                </a>
              </li>
            ) : (
              <></>
            )
          )}
        </ul> */}
        <div></div>
      </div>
    </div>
  );
};

export default Detail;
