import React from "react";
import { UseSubdomainContext } from "../context/UseSubdomainContext";

const Table = () => {
  const { subdomains } = UseSubdomainContext();
  return (
    <div style={{ width: "80%", height: "80%", overflowY: "scroll" }}>
      <table
        style={{
          color: "white",
          fontFamily: "Raleway",
          width: "100%",
        }}
      >
        <thead>
          <tr style={{ height: "60px", position: "sticky" }}>
            <th>Subdomains</th>
          </tr>
        </thead>
        <tbody>
          {subdomains.map((subdomain) => (
            <tr key={subdomain} style={{ height: "40px" }}>
              <td style={{ padding: "20px" }}>
                <a href={`https://${subdomain}`}>{subdomain}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
