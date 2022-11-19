import { Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceCongViec } from "../../services/serviceCongViec";
import { dataBackGround } from "./dataBackGround";
import { dataServiceRelated } from "./dataServiceRelated";
import { PlayCircleFilled } from "@ant-design/icons";
import CardLoaiCongViec from "../../Components/CardLoaiCongViec/CardLoaiCongViec";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../redux/actions/actionTrangLoading";
import { useDispatch } from "react-redux";

export default function TrangDanhSachCongViecVaLoaiCongViec() {
  let dispatch = useDispatch();
  let { maLoaiCongViec } = useParams();

  const [loaiCongViec, setLoaiCongViec] = useState({});
  const [dsNhomChiTietLoai, setDsNhomChiTietLoai] = useState([]);

  useEffect(() => {
    dispatch(setLoadingOnAction());
    serviceCongViec
      .layChiTietLoaiCongViec(maLoaiCongViec)
      .then((res) => {
        let result = res.data.content;
        setLoaiCongViec(result[0]);
        setDsNhomChiTietLoai(result[0].dsNhomChiTietLoai);
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  }, []);

  let bgCongViec = dataBackGround.find(
    (item) => item.maLoaiCongviec == loaiCongViec.id
  )?.urlBg;

  let renderBannerCongViec = () => {
    return (
      <div className="bannerCongViec mb-20">
        <div
          className="w-full bg-gray-500 rounded-xl"
          style={{
            backgroundImage: `url(${bgCongViec})`,
            backgroundPosition: "center center ",
            // backgroundBlendMode: "multiply",
            // background-size: auto;
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
            <h1 className="text-5xl antialiased font-semibold leading-none text-center text-gray-100 mb-0">
              {loaiCongViec.tenLoaiCongViec}
            </h1>
            <p className="text-xl antialiased text-center text-gray-100">
              Find out about events and other news
            </p>
            <button className="flex items-center space-x-3 p-3 font-semibold rounded-lg bg-transparent text-gray-50 border border-white text-base hover:scale-105 duration-300">
              <PlayCircleFilled className="text-2xl" />
              <span>How Fiverr Works</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  let renderCardLoaiCongViec = () => {
    return dsNhomChiTietLoai.map((nhomChiTietLoai, index) => {
      return (
        <Col key={index} className="gutter-row" span={6}>
          <CardLoaiCongViec nhomChiTietLoai={nhomChiTietLoai} />
        </Col>
      );
    });
  };

  let renderSerViceRelative = () => {
    return dataServiceRelated.map((item, index) => {
      return (
        <span className="px-3 py-2 mx-1 my-2 bg-gray-100 rounded-full font-semibold">
          <a className="text-gray-400 hover:text-gray-500 hover:underline underline-offset-2">
            {item}
          </a>
        </span>
      );
    });
  };

  return (
    <div className="trangCongViec py-5 px-28">
      {renderBannerCongViec()}

      <Divider orientation="left" orientationMargin="0">
        <span className="text-2xl font-bold">
          Explore {loaiCongViec.tenLoaiCongViec}
        </span>
      </Divider>

      <Row className="my-10" gutter={[24, 24]}>
        {renderCardLoaiCongViec()}
      </Row>

      <Divider>
        <span className="text-2xl font-bold">
          Services Related To Graphics & Design
        </span>
      </Divider>

      {/* servive  */}
      <ul className="flex flex-wrap justify-center">
        {renderSerViceRelative()}
      </ul>
      {/* servive  */}
    </div>
  );
}
