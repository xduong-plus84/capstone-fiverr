import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { dangXuatAction } from "../../../redux/actions/actionQuanLyNguoiDung";
import { serviceLocalStorage } from "../../../services/serviceLocalStorage";
import "./trangChuHeader.css";

export default function TrangChuHeader() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let inputSearch = useRef(null);
  let { userInfor } = useSelector((state) => state.reducerQuanLyNguoiDung);

  const handelSearch = () => {
    navigate(`/danhSachCongViec/${inputSearch.current.value}`);
  };

  let handleLogOut = () => {
    serviceLocalStorage.user.remove();
    dispatch(dangXuatAction());
    window.location.href = "/trangDangNhap";
  };

  let renderUserNav = () => {
    if (!userInfor) {
      return (
        <>
          <NavLink to={`/trangDangNhap`}>
            <button className="self-center px-8 py-3 rounded text-white hover:text-[#48d048]">
              Sign in
            </button>
          </NavLink>
          <NavLink to={`/trangDangKy`}>
            <button className="self-center px-8 py-1 font-semibold rounded border-2 border-green-500 text-white hover:bg-green-500 duration-500">
              Join
            </button>
          </NavLink>
        </>
      );
    } else {
      console.log("userInfor: ", userInfor);

      return (
        <>
          <button
            onClick={() => {
              handleLogOut();
            }}
            className="self-center px-8 py-3 rounded text-white hover:text-[#48d048]"
          >
            Logout
          </button>
          <NavLink to={`/trangThongTinCaNhan`}>
            <button className="self-center px-3 py-1 font-semibold rounded border-2 border-green-500 text-white hover:bg-green-500 duration-500">
              {`${userInfor.user.name.slice(0, 8)}...`}
            </button>
          </NavLink>
        </>
      );
    }
  };

  return (
    <header className="tranChuHeader py-4 px-20 text-white font-semibold text-base">
      <div className="container flex justify-between items-center h-16 mx-auto">
        <NavLink to={`/`} className="flex items-center p-2">
          <svg
            width="89"
            height="27"
            viewBox="0 0 89 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#404145">
              <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
            </g>
            <g fill="#1dbf73">
              <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
            </g>
          </svg>
        </NavLink>
        <form className="flex-1">
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
              className="fa fa-search"
              type="submit"
              onClick={() => {
                handelSearch();
              }}
            />
          </div>
        </form>

        <div className="flex items-center">
          <ul className="items-stretch hidden space-x-3 lg:flex mb-0">
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent active"
              >
                Fiverr Business
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                Explore
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                English
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                USD
              </a>
            </li>
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                Become a Seller
              </a>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {renderUserNav()}
          </div>
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
