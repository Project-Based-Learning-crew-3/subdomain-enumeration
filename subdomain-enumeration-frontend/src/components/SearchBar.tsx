import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLogo } from "../helpers/getCompanyLogo";

const SearchBar = () => {
  const [domain, setDomain] = React.useState<string>("");
  const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("enter press here! ");
      getSubdomains(domain);
      setDomain("");
    }
  };

  const getSubdomains = async (domain: string) => {
    // const response = await axios.post(
    //   process.env.REACT_APP_API_URL + "findsubdomains" || "",
    //   {
    //     domain: domain,
    //   }
    // );
    // console.log(response);

    // if (response.status === 200) {
    if (domain !== "") {
      getLogo(domain);
      navigate("/dashboard");
    }
    // }
  };

  return (
    <>
      <div className="search-container">
        {/* search icon svg */}
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Enter a domain name"
          className="domain-input"
        />

        <svg
          onClick={() => {
            getSubdomains(domain);
            setDomain("");
          }}
          className="search"
          width="56"
          height="44"
          viewBox="0 0 56 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 17.9592C0 8.0406 7.3177 0 16.3445 0H39.2269C48.2537 0 55.5714 8.0406 55.5714 17.9592V26.0408C55.5714 35.9594 48.2537 44 39.2269 44H16.3445C7.3177 44 0 35.9594 0 26.0408V17.9592Z"
            fill="#ACC319"
          />
          <path
            d="M34.8783 25.6094H33.8769L33.522 25.2333C34.7642 23.6455 35.5121 21.5842 35.5121 19.3418C35.5121 14.3416 31.8234 10.2885 27.2728 10.2885C22.7222 10.2885 19.0335 14.3416 19.0335 19.3418C19.0335 24.3419 22.7222 28.395 27.2728 28.395C29.3136 28.395 31.1896 27.5733 32.6347 26.2083L32.9769 26.5983V27.6986L39.3149 34.6487L41.2036 32.5734L34.8783 25.6094ZM27.2728 25.6094C24.1165 25.6094 21.5687 22.8098 21.5687 19.3418C21.5687 15.8737 24.1165 13.0741 27.2728 13.0741C30.4291 13.0741 32.9769 15.8737 32.9769 19.3418C32.9769 22.8098 30.4291 25.6094 27.2728 25.6094Z"
            fill="black"
          />
        </svg>
      </div>
    </>
  );
};

export default SearchBar;
