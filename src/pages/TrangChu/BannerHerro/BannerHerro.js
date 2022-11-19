import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./bannerHerro.css";

export default function BannerHerro() {
  let navigate = useNavigate();
  let inputSearch = useRef(null);

  // let [userLogin, setUserLogin] = useState({ userName: "" });

  const handelSearch = () => {
    // console.log("userName", userName.current);
    // console.log("userLogin", userLogin.userName);
    // userName.current = "abc";
    // setUserLogin({
    // userName: userName.current,
    // });
    // console.log("inputSearch: ", inputSearch.current.value);
    navigate(`/danhSachCongViec/${inputSearch.current.value}`);
    // <NavLink to={`/danhSachCongViec/${inputSearch.current.value}`} />;
    // navigate("/");
  };
  return (
    <div id="bannerHerro">
      <div className="contentBannder">
        <p>
          Find the perfect <i>freelance</i> <br /> service for your business
        </p>
        <form className="flex-1">
          {/* <form className="flex-1"> */}
          <div className="pseudo-search flex justify-between">
            <input
              type="text"
              placeholder="What service are you looking for today?"
              required
              name="search"
              className="flex-1"
              ref={inputSearch}
            />
            <button
              type="submit"
              className="text-lg font-bold bg-green-400 px-8 py-3"
              onClick={() => {
                handelSearch();
              }}
            >
              Search
            </button>
          </div>
        </form>
        <div className="popular mt-5 text-left">
          <span className="mr-5 text-base font-bold">Popular:</span>
          <button>Website Design</button>
          <button>WordPress</button>
          <button>Logo Design</button>
          <button>Video Editting</button>
        </div>
      </div>
    </div>
  );
}
