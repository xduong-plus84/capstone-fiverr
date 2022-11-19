import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceCongViec } from "../../services/serviceCongViec";
import CardCongViec from "../../Components/CardCongviec/CardCongViec";
import { Col, Divider, Pagination, Row, Slider } from "antd";
import "./trangCongViec.css";
import { useDispatch } from "react-redux";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../redux/actions/actionTrangLoading";

export default function TrangDanhSachCongViec(props) {
  let dispatch = useDispatch();
  let { tenCongViec } = useParams();

  const [danhSachCongViecTheoTen, setDanhSachCongViecTheoTen] = useState([]);
  let [dataRender, setDataRender] = useState([]);

  useEffect(() => {
    dispatch(setLoadingOnAction());
    serviceCongViec
      .layDanhSachCongViecTheoTen(tenCongViec)
      .then((res) => {
        let result = res.data.content;
        setDanhSachCongViecTheoTen(result);
        setDataRender(result.slice(0, 4));

        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  }, []);

  let renderCardCongViec = () => {
    return dataRender.map((item, index) => {
      return (
        <Col key={index} className="gutter-row" span={6}>
          <CardCongViec data={item} />
        </Col>
      );
    });
  };

  const handleChangePagination = (page, pageSize) => {
    let dataSlice = danhSachCongViecTheoTen?.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    setDataRender(dataSlice);
  };

  return (
    <div className="trangDanhSachCongViec py-5 px-28">
      <Divider orientation="left" orientationMargin="0">
        <span className="text-2xl font-bold">Result for "{tenCongViec}"</span>
      </Divider>

      <Pagination
        defaultCurrent={1}
        total={
          danhSachCongViecTheoTen.length == 0
            ? 1
            : danhSachCongViecTheoTen.length
        }
        defaultPageSize={4}
        showSizeChanger
        pageSizeOptions={[4, 8, 16, 100]}
        onChange={(page, pageSize) => {
          handleChangePagination(page, pageSize);
        }}
      />

      <Row className="my-4" gutter={[24, 24]}>
        {renderCardCongViec()}
      </Row>
    </div>
  );
}
