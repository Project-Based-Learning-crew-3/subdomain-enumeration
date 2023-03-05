import React from "react";
import Lottie from "lottie-react";
import loading from "../assets/loading.json";
import "./css/loading.css";

const Loading = ({ domain }: { domain: string }) => {
  const animationStyle = {
    width: "600px",
    height: "600px",
    "@media (maxWidth: 395px)": {},
  };

  const fontStyle = {
    fontFamily: "Poppins",
    color: "white",
    fontSize: "30px",
    "@media (maxWidth: 395px)": {
      fontSize: "25px",
    },
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (maxWidth:395px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    // @ts-ignore
    <div className="loading-container" style={containerStyle}>
      <Lottie
        animationData={loading}
        loop={true}
        className="loading-animation"
        style={animationStyle}
      />
      <p className="loading-text" style={fontStyle}>
        Enumerating subdomains for{" "}
        <span className="font-gradient">{domain}</span> ...
      </p>
    </div>
  );
};

export default Loading;
