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
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../redux/actions/actionTrangLoading";

const children = [];

const { Option } = Select;

const TrangSuaUser = ({ infoUser }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: infoUser.id,
      name: infoUser.name,
      email: infoUser.email,
      phone: infoUser.phone,
      birthday: infoUser.birthday,
      gender: infoUser.gender,
      role: infoUser.role,
      skill: infoUser.skill,
      certification: infoUser.certification,
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      userServ
        .capNhatNguoiDung(values)
        .then(() => {
          message.success("Cập nhật thông tin thành công!");
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

  const handleChangeGender = (name) => (value) => {
    if (value === "nu") {
      formik.setFieldValue(name, false);
    } else {
      formik.setFieldValue(name, true);
    }
  };

  return (
    <Fragment>
      <h3 className="text-2xl text-center mb-7">Sửa thông tin người dùng</h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 5,
          offset: 2,
        }}
        wrapperCol={{
          span: 15,
        }}
        layout="horizontal"
      >
        <Form.Item label="Họ tên">
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Điện thoại">
          <InputNumber
            type="number"
            controls={false}
            style={{ width: "100%" }}
            value={formik.values.phone}
            onChange={handleChangeValue("phone")}
          />
        </Form.Item>

        <Form.Item label="Ngày sinh">
          <DatePicker
            format={"DD/MM/YYYY"}
            className="w-full"
            value={moment(formik.values.birthday, "DD/MM/YYYY")}
            onChange={handleChangeDate("birthday")}
          />
        </Form.Item>

        <Form.Item label="Giới tính">
          <Select
            value={formik.values.gender ? "nam" : "nu"}
            className="w-full"
            onChange={handleChangeGender("gender")}
          >
            <Option value="nu">Nữ</Option>
            <Option value="nam">Nam</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Kỹ năng">
          <Select
            mode="tags"
            className="w-full"
            value={formik.values.skill}
            onChange={handleChangeValue("skill")}
          >
            {children}
          </Select>
        </Form.Item>

        <Form.Item label="Chứng nhận">
          <Select
            mode="tags"
            className="w-full"
            value={formik.values.certification}
            onChange={handleChangeValue("certification")}
          >
            {children}
          </Select>
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
