import React from "react";
import { message, Tabs } from "antd";

import {
  FieldTimeOutlined,
  SyncOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { dichVuServ } from "../../services/serviceThueCongViec";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { serviceLocalStorage } from "../../services/serviceLocalStorage";

export default function BangGia({ moTaNgan, maCongViec }) {
  let { userInfor } = useSelector((state) => state.reducerQuanLyNguoiDung);

  const handleBookJob = () => {
    console.log("continue");
    console.log("userInfor: ", userInfor);
    if (!userInfor) {
      return (window.location.href = "/trangDangNhap");
    }

    let thongTinBookJob = {
      maCongViec: maCongViec,
      maNguoiThue: serviceLocalStorage.user.get()?.user.id,
      ngayThue: moment().format("DD/MM/YYYY"),
      hoanThanh: true,
    };

    dichVuServ
      .thueCongViec(thongTinBookJob)
      .then((res) => {
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onFail();
      });
  };
  let onSuccess = () => {
    message.success("Thuê thành công");
    setTimeout(() => {
      // navigate(-1);
      window.location.href = "/trangThongTinCaNhan";
      // window.location.reload(true);
      // history.back();
    }, 1000);
  };
  let onFail = () => {
    message.error("Thuê thất bại");
  };
  const items = [
    {
      label: "Basic",
      key: "item-1",
      children: (
        <div className="basic">
          <div className="flex justify-between h-16">
            <h1 className="text-xl font-semibold">1 Section 😊</h1>
            <p className="font-bold text-2xl">$10</p>
          </div>
          <p className="text-gray-500 font-medium">{moTaNgan}</p>
          <div className="loiIch">
            <div className="text-gray-700 font-semibold text-base flex items-center">
              <FieldTimeOutlined />
              <span className="ml-1 mr-4 font-bold">3 Days Delivery</span>
              <SyncOutlined />
              <span className="mx-1">Unlimited Revisions</span>
            </div>
            <ul>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-red-500">
                  <CloseOutlined />
                </span>
                1 page
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Design customization
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Content upload
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-red-500">
                  <CloseOutlined />
                </span>
                Responsive design
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-red-500">
                  <CloseOutlined />
                </span>
                Source code
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              handleBookJob();
            }}
            className="w-full px-8 py-3 font-semibold rounded-xl bg-green-600 text-gray-100 border-2 text-xl hover:bg-white hover:text-green-600 hover:border-green-600 duration-300"
          >
            Continue ($10)
          </button>
          <p className="text-green-600 text-xl text-center font-normal mt-4 mb-2">
            Compare Packager
          </p>
        </div>
      ),
    },
    {
      label: "Standard",
      key: "item-2",
      children: (
        <div className="standard">
          <div className="flex justify-between h-16">
            <h1 className="text-xl font-semibold">Upto 7 Sections 😍</h1>
            <p className="font-bold text-2xl">$105</p>
          </div>
          <p className="text-gray-500 font-medium">{moTaNgan}</p>
          <div className="loiIch">
            <div className="text-gray-700 font-semibold text-base flex items-center">
              <FieldTimeOutlined />
              <span className="ml-1 mr-4 font-bold">4 Days Delivery</span>
              <SyncOutlined />
              <span className="mx-1">Unlimited Revisions</span>
            </div>
            <ul>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                1 page
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Design customization
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Content upload
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-red-500">
                  <CloseOutlined />
                </span>
                Responsive design
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Source code
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              handleBookJob();
            }}
            className="w-full px-8 py-3 font-semibold rounded-xl bg-green-600 text-gray-100 border-2 text-xl hover:bg-white hover:text-green-600 hover:border-green-600 duration-300"
          >
            Continue ($105)
          </button>
          <p className="text-green-600 text-xl text-center font-normal mt-4 mb-2">
            Compare Packager
          </p>
        </div>
      ),
    },
    {
      label: "Premium",
      key: "item-3",
      children: (
        <div className="premium">
          <div className="flex justify-between h-16">
            <h1 className="text-xl font-semibold">Upto 10 Sections 😎</h1>
            <p className="font-bold text-2xl">$250</p>
          </div>
          <p className="text-gray-500 font-medium">{moTaNgan}</p>
          <div className="loiIch">
            <div className="text-gray-700 font-semibold text-base flex items-center">
              <FieldTimeOutlined />
              <span className="ml-1 mr-4 font-bold">6 Days Delivery</span>
              <SyncOutlined />
              <span className="mx-1">Unlimited Revisions</span>
            </div>
            <ul>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                1 page
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Design customization
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Content upload
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Responsive design
              </li>
              <li className="flex items-center font-semibold text-gray-500">
                <span className="text-base mb-2 mr-2 text-green-500">
                  <CheckOutlined />
                </span>
                Source code
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              handleBookJob();
            }}
            className="w-full px-8 py-3 font-semibold rounded-xl bg-green-600 text-gray-100 border-2 text-xl hover:bg-white hover:text-green-600 hover:border-green-600 duration-300"
          >
            Continue ($250)
          </button>
          <p className="text-green-600 text-xl text-center font-normal mt-4 mb-2">
            Compare Packager
          </p>
        </div>
      ),
    },
  ];
  return <Tabs centered items={items} />;
}
