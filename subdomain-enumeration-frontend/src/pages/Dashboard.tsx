import React from "react";
import kctLogo from "../assets/kct.svg";
import pieChart from "../assets/pieChart.svg";
import { UseSubdomainContext } from "../context/UseSubdomainContext";

let subdomainsFound: number = 0;
const Dashboard = () => {
  const { subdomains } = UseSubdomainContext();

  console.log(subdomains);
  return (
    <div
      style={{
        color: "white",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        padding: "4rem",
      }}
    >
      <img src={kctLogo} alt="logo" width="300px" height="300px" />
      <h2 className="dashboardTitle" style={{ fontSize: "58px", marginLeft: "2rem",fontFamily:"Raleway",fontWeight:"500"}}>
        Subdomains <br></br> found {subdomainsFound}{" "}
      </h2>
      
      <div>
        <img src={pieChart} alt="" />
      </div>
      <div className="StatusCode">
        <button
          type="submit"
          style={{
            width: "20%",
            border: "10% solid gray",
            borderRadius: "15px",
            padding: "8px",
            backgroundColor:"#ACC319",
            color:"#000000"
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
