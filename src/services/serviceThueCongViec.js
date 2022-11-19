import axios from "axios";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./configURL";
import { serviceLocalStorage } from "./serviceLocalStorage";

const MY_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzgiLCJlbWFpbCI6Im5oYXRuZ3V5ZW5ib2JvNzYwMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2NjY4MzMyODksImV4cCI6MTY2NzQzODA4OX0.aGDVCyTBhZK2EbaBZrjm_GDRY2aUhYR-RtNfubPEICI";

export const dichVuServ = {
  layDsDichVu: () => {
    let uri = `/api/thue-cong-viec`;

    return https.get(uri);
  },

  themDichVu: (data) =>
    axios({
      url: `${BASE_URL}/api/thue-cong-viec`,
      method: "POST",
      data,
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  thueCongViec: (data) => {
    let uri = `/api/thue-cong-viec`;
    return https.post(uri, data, {
      headers: {
        token: serviceLocalStorage.user.get()?.token,
      },
    });
  },

  layDichVuTheoId: (id) => {
    let uri = `/api/thue-cong-viec/${id}`;

    return https.get(uri);
  },

  updateDichVu: (id, data) =>
    axios({
      url: `${BASE_URL}/api/thue-cong-viec/${id}`,
      method: "PUT",
      data,
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  xoaDichVu: (id) =>
    axios({
      url: `${BASE_URL}/api/thue-cong-viec/${id}`,
      method: "DELETE",
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  layCongViecDaThueTheoUser: (token) =>
    axios({
      url: `${BASE_URL}/api/thue-cong-viec/lay-danh-sach-da-thue`,
      method: "GET",
      headers: {
        token,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),
};
