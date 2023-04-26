import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import "./css/home.css";
import Loading from "../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [enteredDomain, setEnteredDomain] = useState("");

  return (
    <>
      {loading ? (
        <Loading domain={enteredDomain} />
      ) : (
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
            We believe that safe and secure internet is a fundamental right. We
            help people realise this goal by building easy to use and efficient
            tools, Try it now!
          </p>

          <div style={{ visibility: "hidden" }}>hidden element</div>

          <SearchBar
            setLoading={setLoading}
            setEnteredDomain={setEnteredDomain}
          />
        </div>
      )}
    </>
  );
};

export default Home;
