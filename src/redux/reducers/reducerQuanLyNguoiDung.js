//rxr

import { serviceLocalStorage } from "../../services/serviceLocalStorage";
import { DANG_NHAP, DANG_XUAT } from "../constants/constantQuanLyNguoiDung";

let initialState = {
  userInfor: serviceLocalStorage.user.get(),
};

export let reducerQuanLyNguoiDung = (state = initialState, action) => {
  switch (action.type) {
    case DANG_NHAP: {
      return { ...state, userInfor: action.payload };
    }
    case DANG_XUAT: {
      return { ...state, userInfor: null };
    }
    default: {
      return { ...state };
    }
  }
};
