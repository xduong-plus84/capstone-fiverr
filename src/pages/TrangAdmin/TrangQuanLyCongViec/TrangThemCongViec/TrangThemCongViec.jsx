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
import { jobServ } from "../../../../services/serviceCongViec";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../redux/actions/actionTrangLoading";

const TrangThemCongViec = () => {
  const [state, setState] = useState({
    loaiCongViec: [],
    nhomChiTietLoai: [],
    chiTietLoai: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingOnAction());

    jobServ
      .layDanhSachLoaiCongViec()
      .then((res) => {
        setState({
          ...state,
          loaiCongViec: res.data.content,
        });
        dispatch(setLoadingOffAction());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOffAction());
      });
  }, []);

  const showLoaiCongViec = () => {
    return state.loaiCongViec?.map((loaiCV) => ({
      label: loaiCV.tenLoaiCongViec,
      value: loaiCV.id,
    }));
  };

  const showNhomChiTietLoai = () => {
    return state.nhomChiTietLoai?.map((nhom) => ({
      label: nhom.tenNhom,
      value: nhom.id,
    }));
  };

  const showChiTietLoai = () => {
    return state.chiTietLoai?.map((chiTietLoai) => ({
      label: chiTietLoai.tenChiTiet,
      value: chiTietLoai.id,
    }));
  };

  const formik = useFormik({
    initialValues: {
      tenCongViec: "",
      danhGia: null,
      giaTien: null,
      nguoiTao: 0,
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: null,
      moTaNgan: "",
      saoCongViec: null,
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      jobServ
        .themCongViec(values)
        .then(() => {
          message.success("Thêm công việc thành công!");
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

  const handleChangeLoaiCongViec = (value) => {
    jobServ
      .layDanhSachNhomChiTietLoai(value)
      .then((res) => {
        setState({
          ...state,
          nhomChiTietLoai: res.data.content[0].dsNhomChiTietLoai,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeNhomChiTietLoai = (value) => {
    let indexNhom = state.nhomChiTietLoai
      ?.map((nhom) => nhom.id)
      .indexOf(value);

    setState({
      ...state,
      chiTietLoai: state.nhomChiTietLoai[indexNhom].dsChiTietLoai,
    });
  };

  const handleChangeChiTietLoai = (value) => {
    formik.setFieldValue("maChiTietLoaiCongViec", value);
  };

  return (
    <Fragment>
      <h3 className="text-2xl text-center mb-7">Thêm công việc</h3>

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
            rows={2}
            name="moTa"
            value={formik.values.moTa}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item label="Loại công việc">
          <Select
            options={showLoaiCongViec()}
            onChange={handleChangeLoaiCongViec}
          />
        </Form.Item>

        <Form.Item label="Nhóm chi tiết loại">
          <Select
            options={showNhomChiTietLoai()}
            onChange={handleChangeNhomChiTietLoai}
          />
        </Form.Item>

        <Form.Item label="Chi tiết loại">
          <Select
            options={showChiTietLoai()}
            onChange={handleChangeChiTietLoai}
          />
        </Form.Item>

        <Form.Item label="Mô tả ngắn">
          <TextArea
            rows={2}
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
            Thêm
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default TrangThemCongViec;
