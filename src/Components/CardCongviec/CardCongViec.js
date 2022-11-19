import { Rate } from "antd";
import React from "react";
import { HeartFilled } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function CardCongViec(props) {
  let { id, tenNguoiTao, avatar, congViec } = props.data;

  return (
    <NavLink to={`/chiTietCongViec/${id}`}>
      <div className="cardCongViec flex flex-col max-w-lg overflow-hidden rounded-lg shadow-md bg-gray-50 text-gray-800 hover:text-green-500 duration-500 divide-y">
        <img
          src={congViec.hinhAnh}
          className="object-cover w-full h-60 sm:h-96 bg-gray-500"
          style={{ height: 250 }}
        />

        <div className="flex flex-col p-4 text-left">
          <div className="flex space-x-4">
            <img
              src={avatar}
              className="object-cover w-12 h-12 rounded-full shadow bg-gray-500"
            />
            <div className="flex flex-col space-y-1 text-left">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-sm font-semibold text-black"
              >
                {tenNguoiTao}
              </a>
              <span className="text-xs text-gray-600">4 hours ago</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-base font-semibold h-12">
              {congViec.tenCongViec}
            </div>
            <Rate disabled allowHalf value={congViec.saoCongViec} />
            <span className="text-gray-500">({congViec.danhGia})</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between px-4 py-2">
          <div className="flex space-x-2  text-gray-600">
            <button className="flex justify-center items-center text-xl hover:text-red-500 focus:text-red-500 duration-300">
              <HeartFilled />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            STARTING AT
            <span className="text-xl font-bold"> $ {congViec.giaTien}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
