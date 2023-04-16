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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime,
            harum consequatur, ipsam,
          </p>

          <p className="below-header pcol1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Blanditiis, praesentium?Lorem ipsum dolor sit amet
          </p>

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
