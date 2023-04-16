import React, { useEffect } from "react";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import { TLocalStorageState } from "../types/StateSubdomainsContext";

const Table = () => {
  const { subdomains, setSubDomains } = UseSubdomainContext();
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
            <th>S.no</th>
            <th>Subdomains</th>
            <th>Status code</th>
          </tr>
        </thead>
        <tbody>
          {subdomains?.map((data, index) => (
            <tr key={index} style={{ height: "40px" }}>
              <td>{index + 1}</td>
              <td style={{ padding: "20px" }}>
                <a href={`https://${data.subdomain}`}>{data.subdomain}</a>
              </td>
              <td>{data.statuscode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
