import { Form, Input, message } from "antd";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../../../redux/actions/actionTrangLoading";
import { typeJobServ } from "../../../../services/serviceLoaiCongViec";

const TrangSuaLoaiCongViec = ({ infoTypeJob }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: infoTypeJob.id,
      tenLoaiCongViec: infoTypeJob.tenLoaiCongViec,
    },

    onSubmit: (values) => {
      dispatch(setLoadingOnAction());

      typeJobServ
        .updateLoaiCongViec(values.id, values)
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

  return (
    <Fragment>
      <h3 className="text-2xl text-center mb-7">
        Sửa thông tin loại công việc
      </h3>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        layout="horizontal"
      >
        <Form.Item label="Tên">
          <Input
            name="tenLoaiCongViec"
            value={formik.values.tenLoaiCongViec}
            onChange={formik.handleChange}
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

export default TrangSuaLoaiCongViec;
