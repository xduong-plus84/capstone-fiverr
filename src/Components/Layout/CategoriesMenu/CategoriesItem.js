import React from "react";
import { NavLink } from "react-router-dom";

export default function CategoriesItem(props) {
  let { dsNhomChiTietLoai } = props;
  // console.log("dsNhomChiTietLoai: ", dsNhomChiTietLoai);

  return (
    <div className="categoriesItem flex p-5 text-base rounded bg-white shadow-md border-t-2">
      {dsNhomChiTietLoai.map((nhomChiTietLoai, index) => {
        let { dsChiTietLoai } = nhomChiTietLoai;
        // console.log("dsChiTietLoai: ", dsChiTietLoai);
        return (
          <div className="mr-32">
            <p className="font-bold">{nhomChiTietLoai.tenNhom}</p>
            <ul>
              {dsChiTietLoai.map((item) => {
                console.log("item: ", item);
                return (
                  <li className="mt-1">
                    <NavLink to={`/${item.id}}`}>
                      <a className="text-gray-500 font-semibold hover:text-[#48d048]">
                        {item.tenChiTiet}
                      </a>
                    </NavLink>
                  </li>
                );
              })}

            </ul>
          </div>
        );
      })}
    </div>
  );
}
