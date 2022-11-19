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
import { Option } from "antd/lib/mentions";
import moment from "moment/moment";
import { userServ } from "../../../../services/serviceNguoiDung";
import { useDispatch } from "react-redux";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../redux/actions/actionTrangLoading";

const children = [];

const TrangThemUser = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: false,
      role: "USER",
      skill: [],
      certification: [],
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      userServ
        .themNguoiDung(values)
        .then(() => {
          message.success("Thêm người dùng thành công!");
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
      <h3 className="text-2xl text-center mb-7">Thêm người dùng</h3>

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
          <Input name="name" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Mật khẩu">
          <Input.Password
            name="password"
            onChange={formik.handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item label="Điện thoại">
          <InputNumber
            type="number"
            controls={false}
            style={{ width: "100%" }}
            onChange={handleChangeValue("phone")}
          />
        </Form.Item>

        <Form.Item label="Ngày sinh">
          <DatePicker
            format={"DD/MM/YYYY"}
            className="w-full"
            placeholder="Chọn ngày sinh"
            onChange={handleChangeDate("birthday")}
          />
        </Form.Item>

        <Form.Item label="Giới tính">
          <Select
            placeholder="Chọn giới tính"
            className="w-full"
            onChange={handleChangeGender("gender")}
          >
            <Option value="nu">Nữ</Option>
            <Option value="nam">Nam</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Loại quyền">
          <Select
            placeholder="Chọn loại quyền"
            className="w-full"
            onChange={handleChangeValue("role")}
          >
            <Option value="USER">Khách hàng</Option>
            <Option value="ADMIN">Quản trị viên</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Kỹ năng">
          <Select
            mode="tags"
            className="w-full"
            placeholder="VD: HTML, CSS, ..."
            onChange={handleChangeValue("skill")}
          >
            {children}
          </Select>
        </Form.Item>

        <Form.Item label="Chứng nhận">
          <Select
            mode="tags"
            className="w-full"
            placeholder="VD: CyberSoft, ..."
            onChange={handleChangeValue("certification")}
          >
            {children}
          </Select>
        </Form.Item>

        <Form.Item className="flex justify-center" style={{ marginBottom: 0 }}>
          <button
            type="submit"
            className="text-white px-4 py-2 rounded"
            style={{ backgroundColor: "#1d3557" }}
          >
            Thêm
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default TrangThemUser;
