import React, { useState } from "react";
import kctLogo from "../assets/kct.svg";
import pieChart from "../assets/pieChart.svg";
import Table from "../components/Table";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import screenshot from "../assets/screenshot.svg";

let subdomainsFound: number = 0;
const Dashboard = () => {
  const { subdomains } = UseSubdomainContext();
  const [statusCode,setStatusCode] = useState({
    success:0,
    userErr:0,
    serverErr:0
  })
  console.log(subdomains);
  return (
    <div style={{position:"relative",}}>

    <div
      style={{
        color: "white",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        padding: "4rem"
      }}
    >
      <img src={kctLogo} alt="logo" width="300px" height="300px" />
      <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",color:"white",marginBottom:"3rem"}}>
      <div>
        <h2 className="dashboardTitle" style={{ fontSize: "58px",fontFamily:"Raleway",fontWeight:"500",marginBottom:"0px"}}>
        Subdomains <br></br> found {subdomainsFound}{" "}
        </h2>
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
      <div style={{paddingRight:"1.5rem"}}>
          <p className="success">200-{statusCode.success}</p>
        </div>
        <div style={{paddingRight:"1.5rem"}}>
          <p className="clientError">400-{statusCode.userErr}</p>
        </div>
        <div style={{paddingRight:"1.5rem"}}>
          <p className="serverError">500-{statusCode.serverErr}</p>
        </div>
      </div>
      </div>
      
      <div>
        <img src={pieChart} alt="" />
      </div>
      
      </div>

<div className="StatusCode">
<a href="#"><button type = "submit" style={{backgroundColor:"#ACC319",
borderRadius:"50%",
height:"50px",
width:"52px",
position:"absolute",
right:"50px",
left:"1025px",
bottom:"60px"
}}>
  <img src={screenshot} alt="screenshot Button"/>
  </button></a>
<button
  type="submit"
  style={{
    width: "7%",
    border: "10% solid gray",
    borderRadius: "15px",
    padding: "8px",
    backgroundColor:"#ACC319",
    fontFamily:"Raleway",
    fontWeight:"500",
    fontSize:"1rem",
    textAlign:"center",
    color:"#000000",
    position:"absolute",
    bottom:"60px",
    right:"10px",
    left:"1100px"
  }}
>
  NEXT
</button>
</div>
</div>

  );
};

export default Dashboard;
