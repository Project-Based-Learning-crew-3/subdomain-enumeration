import React, { useState } from "react";
import kctLogo from "../assets/kct.svg";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import { ReactComponent as Share } from "../assets/Share.svg";
import Table from "../components/Table";
import { subdomainDisplayFormat } from "../types/StateSubdomainsContext";
import { useNavigate } from "react-router-dom";
import { convertToJson } from "../helpers/filterDomains";
import { Scrollbars } from "react-custom-scrollbars";

const Enumeration = () => {
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [currentButton, setCurrentButton] =
    useState<subdomainDisplayFormat>("TABLE");
  const { subdomains } = UseSubdomainContext();
  const [jsonData, setJsonData] = useState([]);
  const navigate = useNavigate();

  const buttonStyle = {
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

  const clickedStyle = {
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
            marginBottom: "3rem",
          }}
        >
          Subdomains found 40
        </h2>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            paddingLeft: 0,
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
        }}
      >
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
            }}
          >
            <div style={{ display: "block" }}>{"{"}</div>
            {'"subdomain" = ['}
            {subdomains?.map((data, i) => (
              <div key={i}>{JSON.stringify(data.subdomain, null, 2)},</div>
            ))}
            <div style={{ display: "block" }}>
              <span style={{ visibility: "hidden" }}>lorem</span>
              {" ]"}
            </div>
            {"}"}
          </div>
        )}
        {currentButton === "TEXT" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              height: "80%",
              fontFamily: "raleway",
              lineHeight: "1.75",
            }}
          >
            {subdomains?.map((data, i) => (
              <div key={i}>{data.subdomain}</div>
            ))}
          </div>
        )}
        <button onClick={() => navigate("/dashboard")}>Go back</button>
      </div>

      {/* share button */}
      <div style={{ position: "absolute", top: "55rem", right: "12%" }}>
        <button
          onMouseOver={() => setDownloadBtn(true)}
          onMouseOut={() => setDownloadBtn(false)}
          style={downloadBtn ? downloadStyle : download}
        >
          <Share
            fill={
              downloadBtn
                ? "#000000"
                : "invert(98%)sepia(5%)saturate(598%)hue-rotate(260deg)brightness(116%)contrast(100%)"
            }
          />
          {/* <img src={} alt="share" style={{ cursor: "pointer"}} /> */}
        </button>
      </div>
    </div>
  );
};

export default Enumeration;
