import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Space } from "antd";
import { serviceCongViec } from "../../../services/serviceCongViec";
import CategoriesItem from "./CategoriesItem";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function CategoriesMenu() {
  // let dispatch = useDispatch();
  let navigate = useNavigate();
  const [menuLoaiCongViec, setMenuLoaiCongViec] = useState([]);

  useEffect(() => {
    // dispatch(setLoadingOnAction());
    serviceCongViec
      .layMenuLoaiCongViec()
      .then((res) => {
        let result = res.data.content;
        setMenuLoaiCongViec(result);
        // dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        // dispatch(setLoadingOffAction());
      });
  }, []);

  let renderMenuLoaiCongViec = () => {
    return menuLoaiCongViec.map((loaiCongViec, index) => {
      // console.log("loaiCongViec: ", loaiCongViec);
      return (
        <Dropdown
          key={index}
          overlay={() => (
            <CategoriesItem
              dsNhomChiTietLoai={loaiCongViec.dsNhomChiTietLoai}
            />
          )}
        >
          {/* <Link to={`/categories/${loaiCongViec.id}`}> */}
          <button
            onClick={() => {
              navigate(
                `/trangDanhSachCongViecVaLoaiCongViec/${loaiCongViec.id}`
              );
              window.location.reload();
            }}
            className="mx-5 py-3 font-semibold drop-shadow-sm text-gray-500 border-b-2 border-transparent hover:text-[#48d048] hover:border-[#48d048] duration-300"
          >
            {/* <a className="nav-link" href={`/categories/${loaiCongViec.id}`}> */}
            {loaiCongViec.tenLoaiCongViec}
            {/* </a> */}
          </button>
          {/* </Link> */}
        </Dropdown>
      );
    });
  };

  return (
    <div className="categoriesMenu py-1 flex justify-center border-y-2 border-gray-100">
      <Space wrap>{renderMenuLoaiCongViec()}</Space>
    </div>
  );
}
