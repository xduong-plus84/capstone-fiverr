import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import "./assets/styleAdmin.css";
import CategoriesMenu from "./Components/Layout/CategoriesMenu/CategoriesMenu";
import LayoutFiverr from "./Components/Layout/LayoutFiverr";
import LayoutTrangCongViec from "./Components/Layout/LayoutTrangCongViec";
import TrangAdmin from "./pages/TrangAdmin/TrangAdmin";
import TrangChiTietCongViec from "./pages/TrangChiTietCongViec/TrangChiTietCongViec";
import TrangChiTietThongTinCaNhan from "./pages/TrangChiTietThongTinCaNhan/TrangChiTietThongTinCaNhan";
import TrangChu from "./pages/TrangChu/TrangChu";
import TrangDangKy from "./pages/TrangDangKy/TrangDangKy";
import TrangDangNhap from "./pages/TrangDangNhap/TrangDangNhap";
import TrangDanhSachCongViec from "./pages/TrangDanhSachCongViec/TrangDanhSachCongViec";
import TrangDanhSachCongViecVaLoaiCongViec from "./pages/TrangDanhSachCongViecVaLoaiCongViec/TrangDanhSachCongViecVaLoaiCongViec";
import TrangLoading from "./pages/TrangLoading/TrangLoading";
import TrangQuanLyUser from "./pages/TrangAdmin/TrangQuanLyUser/TrangQuanLyUser";
import TrangQuanLyCongViec from "./pages/TrangAdmin/TrangQuanLyCongViec/TrangQuanLyCongViec";
import TrangQuanLyLoaiCongViec from "./pages/TrangAdmin/TrangQuanLyLoaiCongViec/TrangQuanLyLoaiCongViec";
import TrangQuanLyDichVu from "./pages/TrangAdmin/TrangQuanLyDichVu/TrangQuanLyDichVu";
import TrangError from "./pages/TrangError/TrangError";

function App() {
  return (
    <div className="App">
      <TrangLoading />
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={<TrangAdmin Component={TrangQuanLyUser} />}
          />

          <Route
            path="/admin/job"
            element={<TrangAdmin Component={TrangQuanLyCongViec} />}
          />

          <Route
            path="/admin/typejob"
            element={<TrangAdmin Component={TrangQuanLyLoaiCongViec} />}
          />

          <Route
            path="/admin/service"
            element={<TrangAdmin Component={TrangQuanLyDichVu} />}
          />

          <Route
            path="/chiTietCongViec/:maCongViec"
            element={<LayoutTrangCongViec Component={TrangChiTietCongViec} />}
          />

          {/* TrangChiTietThongTinCaNhan */}
          <Route
            path="/trangThongTinCaNhan"
            element={
              <LayoutTrangCongViec Component={TrangChiTietThongTinCaNhan} />
            }
          />

          {/* TrangChu */}
          <Route path="/" element={<TrangChu />} />

          {/* TrangDangKy */}
          <Route path="/trangDangKy" element={<TrangDangKy />} />

          {/* TrangDangNhap */}
          <Route path="/trangDangNhap" element={<TrangDangNhap />} />

          {/* TrangDanhSachCongViec */}
          <Route
            path="/danhSachCongViec/:tenCongViec"
            element={<LayoutTrangCongViec Component={TrangDanhSachCongViec} />}
          />

          {/* TrangDanhSachCongViecVaLoaiCongViec */}
          <Route
            path="/trangDanhSachCongViecVaLoaiCongViec/:maLoaiCongViec"
            element={
              <LayoutTrangCongViec
                Component={TrangDanhSachCongViecVaLoaiCongViec}
              />
            }
          />

          {/* Trang Error  */}
          <Route path="*" element={<TrangError />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
