import axios from "axios";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./configURL";

const MY_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzgiLCJlbWFpbCI6Im5oYXRuZ3V5ZW5ib2JvNzYwMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2NjY4MzMyODksImV4cCI6MTY2NzQzODA4OX0.aGDVCyTBhZK2EbaBZrjm_GDRY2aUhYR-RtNfubPEICI";

export const jobServ = {
  layDanhSachCongViec: () => {
    let uri = `/api/cong-viec`;

    return https.get(uri);
  },

  layCongViecTheoId: (id) => {
    let uri = `/api/cong-viec/${id}`;

    return https.get(uri);
  },

  themCongViec: (data) =>
    axios({
      url: `${BASE_URL}/api/cong-viec`,
      method: "POST",
      data,
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  capNhatCongViec: (id, data) =>
    axios({
      url: `${BASE_URL}/api/cong-viec/${id}`,
      method: "PUT",
      data,
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  xoaCongViec: (id) =>
    axios({
      url: `${BASE_URL}/api/cong-viec/${id}`,
      method: "DELETE",
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  layDanhSachLoaiCongViec: () => {
    let uri = "/api/cong-viec/lay-menu-loai-cong-viec";

    return https.get(uri);
  },

  layDanhSachNhomChiTietLoai: (idLoai) => {
    let uri = `/api/cong-viec/lay-chi-tiet-loai-cong-viec/${idLoai}`;

    return https.get(uri);
  },

  searchCongViec: (tenCongViec) => {
    let uri = `/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${tenCongViec}`;

    return https.get(uri);
  },
};

// import { https } from "./configURL";
// import { serviceLocalStorageUser } from "./serviceLocalStorageUser";

export const serviceCongViec = {
  layMenuLoaiCongViec: () => {
    let uri = `/api/cong-viec/lay-menu-loai-cong-viec`;
    return https.get(uri);
  },
  layDanhSachCongViecTheoTen: (tenCongViec) => {
    let uri = `/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${tenCongViec}`;
    return https.get(uri);
  },
  layChiTietLoaiCongViec: (maLoaiCongviec) => {
    let uri = `/api/cong-viec/lay-chi-tiet-loai-cong-viec/${maLoaiCongviec}`;
    return https.get(uri);
  },
  layCongViecChiTiet: (maCongViec) => {
    let uri = `/api/cong-viec/lay-cong-viec-chi-tiet/${maCongViec}`;
    return https.get(uri);
  },
};
