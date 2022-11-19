import { Breadcrumb, Collapse, Divider, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../redux/actions/actionTrangLoading";
import { serviceCongViec } from "../../services/serviceCongViec";
import BangGia from "./BangGia";
import Review from "./Review";
import "./trangChiTietCongviec.css";

const { Panel } = Collapse;

export default function TrangChiTietCongViec() {
  let dispatch = useDispatch();
  let { maCongViec } = useParams();

  const [congViecMoTa, setCongViecMota] = useState({});
  const [congViecContent, setCongViecContent] = useState([]);

  useEffect(() => {
    dispatch(setLoadingOnAction());
    serviceCongViec
      .layCongViecChiTiet(maCongViec)
      .then((res) => {
        let result = res.data.content;
        setCongViecMota(result[0]);
        setCongViecContent(result[0].congViec);
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  }, []);

  let {
    tenLoaiCongViec,
    tenNhomChiTietLoai,
    tenChiTietLoai,
    tenNguoiTao,
    avatar,
  } = congViecMoTa;

  let {
    tenCongViec,
    danhGia,
    giaTien,
    hinhAnh,
    moTa,
    maChiTietLoaiCongViec,
    moTaNgan,
    saoCongViec,
  } = congViecContent;

  let renderBreadcrumb = () => {
    // console.log("maChiTietLoaiCongViec: ", maChiTietLoaiCongViec);

    return (
      <Breadcrumb separator=">">
        <Breadcrumb.Item
          href={`/trangDanhSachCongViecVaLoaiCongViec/${maChiTietLoaiCongViec}`}
        >
          <span className="font-semibold text-base text-blue-500">
            {tenLoaiCongViec}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <span className="font-semibold text-base text-blue-500">
            {tenNhomChiTietLoai}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="font-semibold text-base text-blue-500">
            {tenChiTietLoai}
          </span>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  return (
    <div className="trangChiTietCongViec w-screen py-5 px-28 text-left flex justify-center flex-wrap lg:flex-nowrap">
      <div className="congViec w-3/5 mb-5">
        <div className="breadcrum">{renderBreadcrumb()}</div>

        <div className="gioiThieuCongViec mt-4">
          <p className="font-bold text-3xl">{tenCongViec}</p>
          <div className="flex items-center justify-start">
            <img src={avatar} style={{ height: 40 }} className="rounded-full" />
            <span className="font-semibold text-base px-3 border-r-2 border-gray-500">
              {tenNguoiTao}
            </span>
            <div className="rate px-3 mb-1">
              <Rate disabled allowHalf value={saoCongViec} />
              <span className="text-gray-500 ml-2">({danhGia})</span>
            </div>
          </div>
        </div>

        <Divider />

        <img
          src={hinhAnh}
          className="object-cover w-full h-60 sm:h-96 bg-gray-500"
        />

        <div className="moTaCongViec text-base">
          <p className="font-semibold text-2xl mt-10 mb-4">About This Gig</p>
          <span>{moTa}</span>
        </div>
        <Divider />
        <p className="font-semibold text-2xl mt-10 mb-4">About The Seller</p>
        <div className="aboutSeller flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={avatar}
              style={{ height: 100 }}
              className="rounded-full"
            />
            <div className="flex flex-col mx-4">
              <p className="mb-0 font-bold text-gray-600">{tenNguoiTao}</p>
              <p className="text-gray-500 mb-0">
                We don't just build Websites, We build your Business!
              </p>
              <div className="rate mb-1">
                <Rate disabled allowHalf value={saoCongViec} />
                <span className="text-gray-500 ml-2">({danhGia})</span>
              </div>
            </div>
          </div>
          <button className="mt-3 px-4 py-1 font-semibold border rounded border-gray-800 text-gray-500 hover:text-gray-100 hover:bg-gray-800 duration-300">
            Contact me
          </button>
        </div>
        {/* FQA  */}
        <div className="fQASeller">
          <div className="font-semibold text-2xl mt-10 mb-4">FQA</div>
          <Collapse bordered={false} className="bg-transparent">
            <Panel header="Do you provide regular updates on order?" key="1">
              <p>{text}</p>
            </Panel>
            <Panel
              header="How do you guarantee product quality and rellability?"
              key="2"
            >
              <p>{text}</p>
            </Panel>
            <Panel header="Do you convert PSD to HTML" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>

        {/* Review */}
        <Review maCongViec={maCongViec} />
      </div>

      <div
        className="bangGia w-2/5 sm:pl-20 sm:pr-20 lg:pl-32 lg:pr-0"
        style={{ minWidth: 518 }}
      >
        <BangGia moTaNgan={moTaNgan} maCongViec={maCongViec} />
      </div>
    </div>
  );
}
