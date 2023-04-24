import React, { useEffect } from "react";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import { TLocalStorageState } from "../types/StateSubdomainsContext";
import { NavLink, useNavigate } from "react-router-dom";

const Table = () => {
  const { subdomains, setSubDomains } = UseSubdomainContext();
  const navigate = useNavigate();
  useEffect(() => {
    const data: TLocalStorageState = JSON?.parse(
      localStorage?.getItem("searchedsubdomains")!
    );
    if (data.some((s) => s.domain === "")) {
      setSubDomains(data[data?.length - 1]?.subdomains);
    }
  }, []);
  return (
    <div style={{ width: "80%", height: "80%" }}>
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
          {subdomains?.map((data, index) => (
            <tr key={index} style={{ height: "40px" }}>
              <td style={{ fontSize: "22px" }}>{index + 1}</td>
              <td style={{ padding: "20px" }}>
                <NavLink
                  to={`/detail/${index + 1}`}
                  style={{ fontSize: "20px" }}
                >
                  {data.subdomain}
                </NavLink>
              </td>
              <td style={{ fontSize: "20px" }}>{data.statuscode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
