import axios from "axios";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./configURL";

const MY_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzgiLCJlbWFpbCI6Im5oYXRuZ3V5ZW5ib2JvNzYwMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2NjY4MzMyODksImV4cCI6MTY2NzQzODA4OX0.aGDVCyTBhZK2EbaBZrjm_GDRY2aUhYR-RtNfubPEICI";

export const typeJobServ = {
  layDsLoaiCongViec: () => {
    let uri = `/api/loai-cong-viec`;

    return https.get(uri);
  },

  layLoaiCongViecTheoId: (id) => {
    let uri = `/api/loai-cong-viec/${id}`;

    return https.get(uri);
  },

  themLoaiCongViec: (data) =>
    axios({
      url: `${BASE_URL}/api/loai-cong-viec`,
      method: "POST",
      data,
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  xoaLoaiCongViec: (id) =>
    axios({
      url: `${BASE_URL}/api/loai-cong-viec/${id}`,
      method: "DELETE",
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  updateLoaiCongViec: (id, data) =>
    axios({
      url: `${BASE_URL}/api/loai-cong-viec/${id}`,
      method: "PUT",
      data,
      headers: {
        token: MY_TOKEN,
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  searchLoaiCongViec: (keyWord) => {
    let uri = `api/loai-cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=100&keyword=${keyWord}`;

    return https.get(uri);
  },
};
