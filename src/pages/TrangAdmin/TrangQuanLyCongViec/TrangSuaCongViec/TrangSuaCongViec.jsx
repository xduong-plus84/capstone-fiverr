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
import React, { Fragment, useState } from "react";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { jobServ } from "../../../../services/serviceCongViec";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../redux/actions/actionTrangLoading";

const TrangSuaCongViec = ({ infoJob }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: infoJob.id,
      tenCongViec: infoJob.tenCongViec,
      danhGia: infoJob.danhGia,
      giaTien: infoJob.giaTien,
      nguoiTao: infoJob.nguoiTao,
      hinhAnh: infoJob.hinhAnh,
      moTa: infoJob.moTa,
      maChiTietLoaiCongViec: infoJob.maChiTietLoaiCongViec,
      moTaNgan: infoJob.moTaNgan,
      saoCongViec: infoJob.saoCongViec,
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      jobServ
        .capNhatCongViec(values.id, values)
        .then(() => {
          message.success("Cập nhật thành công!");
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

  return (
    <Fragment>
      <h3 className="text-2xl text-center mb-7">Sửa thông tin công việc</h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 3,
          offset: 1,
        }}
        wrapperCol={{
          span: 19,
        }}
        layout="horizontal"
      >
        <Form.Item label="Tên">
          <Input
            name="tenCongViec"
            value={formik.values.tenCongViec}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Đánh giá">
          <InputNumber
            type="number"
            controls={false}
            style={{ width: "100%" }}
            value={formik.values.danhGia}
            onChange={handleChangeValue("danhGia")}
          />
        </Form.Item>

        <Form.Item label="Giá tiền">
          <InputNumber
            type="number"
            controls={false}
            style={{ width: "100%" }}
            value={formik.values.giaTien}
            onChange={handleChangeValue("giaTien")}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Input
            name="hinhAnh"
            value={formik.values.hinhAnh}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <TextArea
            rows={4}
            name="moTa"
            value={formik.values.moTa}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Mô tả ngắn">
          <TextArea
            rows={4}
            name="moTaNgan"
            value={formik.values.moTaNgan}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Số sao">
          <Rate
            value={formik.values.saoCongViec}
            onChange={handleChangeValue("saoCongViec")}
          />
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
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default TrangSuaCongViec;
