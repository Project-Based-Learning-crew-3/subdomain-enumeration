import React from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const headerCapitalize:any = {
        textTransform: 'Capitalize'
    }

  return (
    <>
    <div>
        <h1 style={{
          color: 'white'
        }}>Say goodbye to  cli </h1>
    </div>
      {/* <SearchBar /> */}
    </>
  );
};

export default Home;
