import React, { useState, useEffect } from "react";
import kctLogo from "../assets/kct.svg";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import { ReactComponent as Share } from "../assets/share.svg";
import Table from "../components/Table";
import {
  TLocalStorageState,
  TsubdomainDisplayFormat,
} from "../types/StateSubdomainsContext";
import { useNavigate } from "react-router-dom";
import { convertToJson } from "../helpers/filterDomains";
import { Scrollbars } from "react-custom-scrollbars";
import { saveAs } from "file-saver";
import Blob from "blob";
import copy from "../assets/copy.svg";
import arrowup from "../assets/arrowup.svg";
import tick from "../assets/tick.svg";

export const buttonStyle = {
  border: "1.9px solid #ACC319",
  borderRadius: "27.1429px",
  fontFamily: "Raleway",
  width: "100px",
  height: "45px",
  background: "transparent",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
};

export const clickedStyle = {
  backgroundColor: "rgb(172, 195, 25)",
  border: "1.9px solid #ACC319",
  borderRadius: "27.1429px",
  fontFamily: "Raleway",
  width: "100px",
  height: "45px",
  fontSize: "18px",
  cursor: "pointer",
  color: "black",
};

const Enumeration = () => {
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [currentButton, setCurrentButton] =
    useState<TsubdomainDisplayFormat>("TABLE");
  const { subdomains, setSubDomains } = UseSubdomainContext();
  const [jsonData, setJsonData] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const data: TLocalStorageState = JSON?.parse(
    localStorage?.getItem("searchedsubdomains")!
  );
  console.log(data);

  const copyTextToClipboard = (type: "TEXT" | "JSON") => {
    let copydata: string =
      type === "TEXT"
        ? `${subdomains?.map((s) => s.subdomain).join("\n")}`
        : "{\nsubdomains:" + JSON.stringify(subdomains) + "\n}";
    navigator.clipboard.writeText(copydata);
  };

  useEffect(() => {
    const data: TLocalStorageState = JSON?.parse(
      localStorage?.getItem("searchedsubdomains")!
    );
    console.log(data);
    if (data.length > 0) {
      setSubDomains(data[data?.length - 1]?.subdomains);
    }
  }, []);
  const navigate = useNavigate();
  let isText = currentButton === "TEXT";
  let isJson = currentButton === "JSON";
  let isTable = currentButton === "TABLE";

  function downloadFile() {
    let csv = isTable ? exportToCsv() : "";
    let textData = isText && subdomains?.map((s) => s.subdomain).join("\n");

    const data = isText
      ? `${textData}`
      : isJson
      ? JSON.stringify(subdomains)
      : csv;
    const blob = new Blob([data], {
      type: `${
        isText ? "text/plain" : isJson ? "application/json" : "text/csv"
      };charset=utf-8`,
    });
    saveAs(
      blob,
      isText ? "subdomains.txt" : isJson ? "subdomains.json" : "subdomains.csv"
    );
    saveAs(
      blob,
      isText ? "subdomains.txt" : isJson ? "subdomains.json" : "subdomains.csv"
    );
  }

  const exportToCsv = () => {
    // Headers for each column
    let headers = ["subdomain,status code"];

    // Convert users data to a csv
    let subdomainsCsv = subdomains?.reduce((acc: any[], data) => {
      const { subdomain, statuscode } = data;
      acc.push([subdomain, statuscode].join(","));
      return acc;
    }, []);

    const csvData = [...headers, ...(subdomainsCsv || [])].join("\n");
    return csvData;
  };

  const downloadStyle = {
    backgroundColor: "rgb(172, 195, 25)",
    border: "1.9px solid #ACC319",
    borderRadius: "27.1429px",
    fontFamily: "Raleway",
    width: "100px",
    height: "45px",
    fontSize: "18px",
    cursor: "pointer",
    fill: "black",
  };
  const download = {
    border: "1.9px solid #ACC319",
    borderRadius: "27.1429px",
    fontFamily: "Raleway",
    width: "100px",
    height: "45px",
    background: "transparent",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    filter:
      "invert(98%)sepia(5%)saturate(598%)hue-rotate(260deg)brightness(116%)contrast(100%)",
  };
  return (
    <div
      style={{
        color: "white",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        paddingInline: "6rem",
        paddingBlock: "4rem",
        position: "relative",
        height: "80vh",
      }}
    >
      <img src={kctLogo} alt="logo" width="300px" height="300px" />

      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "5rem",
        }}
      >
        <h2
          className="font-gradient2"
          style={{
            fontFamily: "Raleway",
            fontSize: "96px",
            fontWeight: 500,
            display: "flex",
            flexDirection: "column",
            marginRight: "5rem",
            marginTop: "12px",
            marginBottom: "2px",
          }}
        >
          Subdomains found {subdomains?.length}
        </h2>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            paddingLeft: 0,
            marginTop: "14px",
          }}
        >
          <li>
            <button
              onClick={() => setCurrentButton("TABLE")}
              style={currentButton === "TABLE" ? clickedStyle : buttonStyle}
            >
              Table
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setCurrentButton("JSON");
                // setJsonData(convertToJson(subdomains));
                console.log(jsonData);
              }}
              style={currentButton === "JSON" ? clickedStyle : buttonStyle}
            >
              JSON
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentButton("TEXT")}
              style={currentButton === "TEXT" ? clickedStyle : buttonStyle}
            >
              Text
            </button>
          </li>
        </ul>
      </div>

      <div
        style={{
          color: "white",
          height: "400px",
          width: "300%",
          maxWidth: "300%",
          backgroundColor: "rgb(10,10,10)",
          borderRadius: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBlock: "auto",
          overflowY: "scroll",
          position: "relative",
        }}
        className="scrollbar"
      >
        {/* <img src={arrowup} className="arrowup" alt="arrowup" /> */}
        {currentButton === "TABLE" && <Table />}
        {currentButton === "JSON" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
              width: "80%",
              height: "80%",
              lineHeight: "1.75",
              fontFamily: "raleway",
              fontSize: "20px",
            }}
          >
            {isCopied ? (
              <>
                <img src={tick} alt="tick" className="tick" />
              </>
            ) : (
              <img
                src={copy}
                alt="copy"
                className="copy"
                onClick={() => {
                  setIsCopied(true);

                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                  copyTextToClipboard("JSON");
                }}
              />
            )}
            <div style={{ display: "block", fontSize: "30px" }}>{"{"}</div>
            {'"subdomain"  '}
            <span style={{ fontSize: "30px", display: "contents" }}>
              {" = ["}
            </span>
            {subdomains?.map((data, i) => (
              <div key={i}>{JSON.stringify(data.subdomain, null, 2)},</div>
            ))}
            <div style={{ display: "block" }}>
              <span style={{ visibility: "hidden" }}>lorem</span>
              <span style={{ fontSize: "30px", display: "contents" }}>
                {" ]"}
              </span>
            </div>
            <span style={{ fontSize: "30px", display: "contents" }}>
              {" }"}
            </span>
          </div>
        )}
        {currentButton === "TEXT" && (
          <div
            style={{
              fontSize: "20px",
              display: "flex",
              flexDirection: "column",
              width: "80%",
              height: "80%",
              fontFamily: "raleway",
              lineHeight: "1.75",
            }}
          >
            <img
              src={copy}
              alt="copy"
              className="copy"
              onClick={() => copyTextToClipboard("TEXT")}
            />

            {subdomains?.map((data, i) => (
              <div key={i}>{data.subdomain}</div>
            ))}
          </div>
        )}
        {/* share button */}
        <div
          style={{
            position: "sticky",
            top: "21rem",
            paddingBottom: "1rem",
            right: "0.25%",
            marginLeft: "30px",
          }}
        >
          <button
            onMouseOver={() => setDownloadBtn(true)}
            onMouseOut={() => setDownloadBtn(false)}
            style={downloadBtn ? downloadStyle : download}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Share
                onClick={downloadFile}
                fill={
                  downloadBtn
                    ? "#000000"
                    : "invert(98%)sepia(5%)saturate(598%)hue-rotate(260deg)brightness(116%)contrast(100%)"
                }
              />
            </div>
            {/* <img src={} alt="share" style={{ cursor: "pointer"}} /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enumeration;
