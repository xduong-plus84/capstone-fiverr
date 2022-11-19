import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { serviceNguoiDung } from "../../services/serviceNguoiDung";
import { message } from "antd";

export default function TrangDangKy() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    onSubmit: (thongTinDangKy) => {
      serviceNguoiDung
        .dangKy(thongTinDangKy)
        .then((res) => {
          let result = res.data.content;
          onSuccess(); // hien thong bao
        })
        .catch((err) => {
          console.log(err);
          onFail(err.response.data.content);
        });
    },
  });

  let onSuccess = () => {
    message.success("Đăng ký thành công");
    setTimeout(() => {
      navigate("/trangDangNhap");

      // history.back();""
    }, 1000);
  };
  let onFail = (name) => {
    message.error(name);
  };

  return (
    <div className="flex justify-center bg-gradient-to-b from-white to-zinc-700 pb-8 shadow-zinc-700 pt-5 items-center h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 w-3/12 shadow-2xl">
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          action
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="userName">
              <label htmlFor="name" className="block mb-2 text-sm text-left">
                Name
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Xuan Duong"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div className="passWord">
              <div className="flex justify-between mb-2">
                <label htmlFor="matKhau" className="text-sm">
                  Password
                </label>
              </div>
              <input
                onChange={formik.handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div className="email">
              <label htmlFor="email" className="block mb-2 text-sm text-left">
                Email
              </label>
              <input
                onChange={formik.handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="duongcute@gmail.com"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div className="phoneNumber">
              <label htmlFor="phone" className="block mb-2 text-sm text-left">
                Phone number
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                name="phone"
                id="phone"
                placeholder="0386677028"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button className="w-full px-8 py-3 font-semibold rounded-md bg-yellow-600 text-gray-50 hover:bg-yellow-700 transition duration-500">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
