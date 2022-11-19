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
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import moment from "moment/moment";
import { userServ } from "../../../../services/serviceNguoiDung";
import { useDispatch } from "react-redux";
import { dichVuServ } from "../../../../services/serviceThueCongViec";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../redux/actions/actionTrangLoading";

const { Option } = Select;

const TrangSuaUser = ({ infoService }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: infoService.id,
      maCongViec: infoService.maCongViec,
      maNguoiThue: infoService.maNguoiThue,
      ngayThue: infoService.ngayThue,
      hoanThanh: infoService.hoanThanh,
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      dichVuServ
        .updateDichVu(values.id, values)
        .then(() => {
          message.success("Cập nhật dịch vụ thành công!");
          dispatch(setLoadingOffAction());
        })
        .catch((err) => {
          message.error(err.response?.data);
          dispatch(setLoadingOffAction());
        });
    },
  });

  const handleChangeDate = (name) => (value) => {
    let birthday = moment(value).format("DD/MM/YYYY");

    formik.setFieldValue(name, birthday);
  };

  const handleChangeValue = (name) => (value) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Fragment>
      <h3 className="text-2xl text-center mb-7">Sửa thông tin dịch vụ</h3>

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
            value={formik.values.maCongViec}
            onChange={handleChangeValue("maCongViec")}
          />
        </Form.Item>

        <Form.Item label="Mã người thuê">
          <InputNumber
            type="number"
            controls={false}
            style={{ width: "100%" }}
            value={formik.values.maNguoiThue}
            onChange={handleChangeValue("maNguoiThue")}
          />
        </Form.Item>

        <Form.Item label="Ngày thuê">
          <DatePicker
            format={"DD/MM/YYYY"}
            className="w-full"
            value={moment(formik.values.ngayThue, "DD/MM/YYYY")}
            onChange={handleChangeDate("ngayThue")}
          />
        </Form.Item>

        <Form.Item label="Hoàn thành">
          <Switch
            checked={formik.values.hoanThanh}
            onChange={handleChangeValue("hoanThanh")}
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

export default TrangSuaUser;
