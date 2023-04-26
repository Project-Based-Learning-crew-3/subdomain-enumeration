import React, { useEffect, useState } from "react";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import {
  TLocalStorageState,
  TsubdomainWithStatusCode,
} from "../types/StateSubdomainsContext";
import { Link, useNavigate } from "react-router-dom";
import { buttonStyle, clickedStyle } from "../pages/Enumeration";
import download from "../assets/download.svg";

const Table = () => {
  const { subdomains, setSubDomains } = UseSubdomainContext();
  const [filter, setFilter] = useState<TsubdomainWithStatusCode[]>([]);
  const [currBtn, setCurrBtn] = useState<"ALL" | "2xx" | "4xx" | "5xx">("ALL");
  const navigate = useNavigate();
  useEffect(() => {
    setFilter(subdomains);
    const data: TLocalStorageState = JSON?.parse(
      localStorage?.getItem("searchedsubdomains")!
    );
    if (data.some((s) => s.domain === "")) {
      setSubDomains(data[data?.length - 1]?.subdomains);
    }
  }, []);
  return (
    <div style={{ width: "80%", height: "80%" }}>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          gap: "1rem",
          // gridColumn: "span 2",
        }}
      >
        <span
          style={{ color: "white", fontSize: "25px", fontFamily: "Raleway" }}
        >
          Filters :
        </span>
        <button
          style={
            currBtn === "ALL"
              ? {
                  ...clickedStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
              : {
                  ...buttonStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
          }
          onClick={() => {
            setFilter(subdomains);
            setCurrBtn("ALL");
          }}
        >
          all
        </button>
        <button
          onClick={() => {
            setFilter((prev) =>
              subdomains.filter(
                (s) => s.statuscode >= 200 && s.statuscode < 300
              )
            );
            setCurrBtn("2xx");
          }}
          style={
            currBtn === "2xx"
              ? {
                  ...clickedStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
              : {
                  ...buttonStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
          }
        >
          2xx
        </button>
        <button
          onClick={() => {
            setFilter((prev) =>
              subdomains.filter(
                (s) => s.statuscode >= 400 && s.statuscode < 500
              )
            );
            setCurrBtn("4xx");
          }}
          style={
            currBtn === "4xx"
              ? {
                  ...clickedStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
              : {
                  ...buttonStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
          }
        >
          4xx
        </button>
        <button
          onClick={() => {
            setFilter((prev) =>
              subdomains.filter(
                (s) => s.statuscode >= 500 && s.statuscode < 600
              )
            );
            setCurrBtn("5xx");
          }}
          style={
            currBtn === "5xx"
              ? {
                  ...clickedStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
              : {
                  ...buttonStyle,
                  borderRadius: "15px",
                  width: "65px",
                  height: "35px",
                }
          }
        >
          5xx
        </button>
      </div>

      <table
        style={{
          color: "white",
          fontFamily: "Raleway",
          width: "100%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ height: "60px", position: "sticky" }}>
            <th style={{ fontSize: "22px" }}>S.no</th>
            <th style={{ fontSize: "22px" }}>Subdomains</th>
            <th style={{ fontSize: "22px" }}>Status code</th>
          </tr>
        </thead>
        <tbody>
          {filter.length > 0 ? (
            filter?.map((data, index) => (
              <tr key={index} style={{ height: "40px" }}>
                <td style={{ fontSize: "22px" }}>{index + 1}</td>
                <td style={{ padding: "20px" }}>
                  <Link
                    to={`/detail/${data.subdomain}`}
                    style={{ fontSize: "20px" }}
                  >
                    {data.subdomain}
                  </Link>
                </td>
                <td style={{ fontSize: "20px" }}>{data.statuscode}</td>
              </tr>
            ))
          ) : (
            <>No subdomains with the specified status code</>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
