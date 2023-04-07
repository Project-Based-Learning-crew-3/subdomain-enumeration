import React from "react";
import { UseSubdomainContext } from "../context/UseSubdomainContext";

const Table = () => {
  const { subdomains } = UseSubdomainContext();
  return (
    <div style={{ width: "80%", height: "80%"}}>
      <table
        style={{
          color: "white",
          fontFamily: "Raleway",
          width: "100%",
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
          {subdomains?.map((subdomain,index) => (
            <tr key={index} style={{ height: "40px" }}>
              <td>{index+1}</td>
              <td style={{ padding: "20px" }}>
                <a href={`https://${subdomain}`}>{subdomain?.subdomain}</a>
              </td>
              <td>{subdomain?.statusCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
