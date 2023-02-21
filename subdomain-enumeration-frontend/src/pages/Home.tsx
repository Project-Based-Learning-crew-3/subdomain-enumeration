import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import "./home.css";

const Home = () => {

  return (
    <div className="header-container">

      <div className="home-title">
        <h1>
          Say
          <span style={{ textTransform: "uppercase" }}>goodbye</span>
          <span>
            to <span style={{ textTransform: "uppercase" }}>cli.</span>
          </span>
        </h1>
      </div>


      <p className="below-header pcol2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, harum consequatur, ipsam, odit commodi aut magni Lorem ipsum dolor sit, amet consectetur adipisicing.
      </p>

      <p className="below-header pcol1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, praesentium?Lorem ipsum dolor sit amet.</p>

      <SearchBar />
    </div>
  );
};

export default Home;
