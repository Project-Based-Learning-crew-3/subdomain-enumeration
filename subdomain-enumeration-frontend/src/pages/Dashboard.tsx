import React, { useEffect, useState } from "react";
import kctLogo from "../assets/kct.svg";
import pieChart from "../assets/pieChart.svg";
import { useNavigate } from "react-router-dom";
import { UseSubdomainContext } from "../context/UseSubdomainContext";
import screenshot from "../assets/screenshot.svg";
import { TLocalStorageState } from "../types/StateSubdomainsContext";
//graphing module
import { VictoryPie } from "victory";

const Dashboard = () => {
  const navigate = useNavigate();
  const { subdomains, setSubDomains } = UseSubdomainContext();
  const [domain, setDomain] = useState("");
  const [statusCode, setStatusCode] = useState({
    success: 0,
    userErr: 0,
    serverErr: 0,
  });
  const [loading, setLoading] = useState(false);

  // console.log(subdomains);

  useEffect(() => {
    const data: TLocalStorageState = JSON?.parse(
      localStorage?.getItem("searchedsubdomains")!
    );
    console.log(data);
    setDomain(data[data?.length - 1]?.domain);
    console.log(domain);
    if (data && subdomains?.length === 0) {
      setSubDomains(data[data?.length - 1]?.subdomains);
    }

    // setSubDomains(data[data?.length - 1]?.subdomains);
    //To count number of 200,400,500 status codes
    subdomains?.forEach((stat) => {
      if (stat.statuscode >= 200 && stat.statuscode < 300) {
        setStatusCode((prev) => ({ ...prev, success: prev.success + 1 }));
      } else if (stat.statuscode >= 400 && stat.statuscode < 500) {
        setStatusCode((prev) => ({ ...prev, userErr: prev.userErr + 1 }));
      } else {
        setStatusCode((prev) => ({ ...prev, serverErr: prev.serverErr + 1 }));
      }
    });
  }, [subdomains, setSubDomains]);

  console.log(statusCode);

  return (
    <>
      {loading ? (
        <div>`Loading...`</div>
      ) : (
        <div style={{ position: "relative" }}>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                color: "white",
                marginBottom: "3rem",
              }}
            >
              <div>
                <h2
                  className="dashboardTitle"
                  style={{
                    fontSize: "96px",
                    // marginLeft: "2rem",
                    fontFamily: "Raleway",
                    fontWeight: "500",
                    marginTop: "1.4rem",
                    marginBottom: "0px",
                    marginRight: "12rem",
                  }}
                >
                  Subdomains <br></br> found {subdomains?.length}{" "}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  // marginLeft: "2rem",
                }}
              >
                <div style={{ paddingRight: "1.5rem" }}>
                  <p className="success" style={{ marginTop: "0rem" }}>
                    2xx-{statusCode.success}
                  </p>
                </div>
                <div style={{ paddingRight: "1.5rem" }}>
                  <p className="clientError" style={{ marginTop: "0rem" }}>
                    4xx-{statusCode.userErr}
                  </p>
                </div>
                <div style={{ paddingRight: "1.5rem" }}>
                  <p className="serverError" style={{ marginTop: "0rem" }}>
                    5xx-{statusCode.serverErr}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "-2.5rem" }}>
              {/*dynamic graph*/}
              <VictoryPie
                colorScale={["tomato", "gold", "cyan"]}
                data={[
                  { x: "200", y: statusCode.success, opacity: 0.5 },
                  {
                    x: "400",
                    y: statusCode.userErr,
                  },
                  { x: "500", y: statusCode.serverErr },
                ]}
                style={{ labels: { fill: "white" } }}
              />
              {/* <img src={pieChart} alt="" /> */}
            </div>
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: "1.25rem",
                marginTop: "5rem",
                lineHeight: "1.5",
              }}
            >
              Total number of enumerated subdomains is {subdomains?.length}.
              <br />
              Number of 2xx is {statusCode.success}, number of 4xx is{" "}
              {statusCode.userErr}
              <br /> and number of 5xx is {statusCode.serverErr}
            </p>
          </div>

          <div className="StatusCode">
            <button
              onClick={() => navigate("/enumeration")}
              style={{
                width: "7%",
                border: "10% solid gray",
                borderRadius: "15px",
                padding: "8px",
                backgroundColor: "#ACC319",
                fontFamily: "Raleway",
                fontWeight: "500",
                fontSize: "1rem",
                textAlign: "center",
                color: "#000000",
                position: "absolute",
                bottom: "90px",
                right: "10px",
                left: "1100px",
              }}
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
