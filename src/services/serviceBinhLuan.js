import { https } from "./configURL";
import { serviceLocalStorage } from "./serviceLocalStorage";

export const serviceBinhLuan = {
  layBinhLuanTheoCongViec: (maCongViec) => {
    let uri = `/api/binh-luan/lay-binh-luan-theo-cong-viec/${maCongViec}`;
    return https.get(uri);
  },
  binhLuan: (data) => {
    let uri = `/api/binh-luan`;
    return https.post(uri, data, {
      headers: {
        token: serviceLocalStorage.user.get()?.token,
      },
    });
  },
};
