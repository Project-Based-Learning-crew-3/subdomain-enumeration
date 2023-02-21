import React from "react";
import SearchBar from "../components/SearchBar";
import "./home.css";

const Home = () => {
  return (
    <>

      <div className="home-title">
        <h1>
          Say
          <span style={{ textTransform: "uppercase" }}>goodbye</span>
          <span>
            to <span style={{ textTransform: "uppercase" }}>cli</span>
          </span>
        </h1>
      </div>
      {/* <SearchBar /> */}
    </>
  );
};

export default Home;
