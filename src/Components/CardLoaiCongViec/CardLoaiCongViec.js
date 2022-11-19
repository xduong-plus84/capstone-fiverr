import React from "react";

export default function CardLoaiCongViec(props) {
  // console.log("props: ", props);
  let { hinhAnh, tenNhom, dsChiTietLoai } = props.nhomChiTietLoai;
  // console.log("dsChiTietLoai: ", dsChiTietLoai);
  let renderDsChiTietLoai = () => {
    return dsChiTietLoai.map((chiTietLoai, index) => {
      // console.log("chiTietLoai: ", chiTietLoai);
      return (
        <button
          key={index}
          className="py-2 px-4 font-medium text-base rounded-xl text-left hover:bg-gray-100 hover:text-[#48d048] duration-300"
        >
          {chiTietLoai.tenChiTiet}
        </button>
      );
    });
  };
  return (
    <div className="max-w-xs rounded-md shadow-md bg-gray-50 text-gray-900">
      <img
        src={hinhAnh}
        className="object-cover object-center w-full rounded-t-xl bg-gray-500"
        style={{ height: 200 }}
      />
      <div className="text-left py-5">
        <p className="text-2xl font-bold mb-2 px-4">{tenNhom}</p>
        <div className="flex flex-col text-xl text-gray-500">
          {renderDsChiTietLoai()}
        </div>
      </div>
    </div>
  );
}
