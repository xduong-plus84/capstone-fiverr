import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  message,
  Rate,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { dichVuServ } from "../../../../services/serviceThueCongViec.js";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../redux/actions/actionTrangLoading.js";

const TrangThemDichVu = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: false,
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      dichVuServ
        .themDichVu(values)
        .then(() => {
          message.success("Thêm dịch vụ thành công!");
          dispatch(setLoadingOffAction());
        })
        .catch((err) => {
          message.error(err.response?.data);
          dispatch(setLoadingOffAction());
        });
    },
  });

  const handleChangeValue = (name) => (value) => {
    formik.setFieldValue(name, value);
  };

  const handleChangeDate = (name) => (value) => {
    let ngayThue = moment(value).format("DD/MM/YYYY");

    formik.setFieldValue(name, ngayThue);
  };

  return (
    <Fragment>
      <h3 className="text-2xl text-center mb-7">Thêm dịch vụ</h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
      >
        <Form.Item label="Mã công việc">
          <InputNumber
            type="number"
            controls={false}
            style={{ width: "100%" }}
            placeholder="Nhập mã công việc"
            onChange={handleChangeValue("maCongViec")}
          />
        </Form.Item>

        <Form.Item label="Mã người thuê">
          <InputNumber
            type="number"
            controls={false}
            style={{ width: "100%" }}
            placeholder="Nhập mã người thuê"
            onChange={handleChangeValue("maNguoiThue")}
          />
        </Form.Item>

        <Form.Item label="Ngày thuê">
          <DatePicker
            format={"DD/MM/YYYY"}
            className="w-full"
            placeholder="Chọn ngày thuê"
            onChange={handleChangeDate("ngayThue")}
          />
        </Form.Item>

        <Form.Item label="Hoàn thành">
          <Switch onChange={handleChangeValue("hoanThanh")} />
        </Form.Item>

        <Form.Item
          className="flex justify-center items-center"
          style={{ marginBottom: 0 }}
        >
          <button
            type="submit"
            className="text-white px-4 py-2 rounded w-max"
            style={{ backgroundColor: "#457b9d" }}
          >
            Thêm
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default TrangThemDichVu;
