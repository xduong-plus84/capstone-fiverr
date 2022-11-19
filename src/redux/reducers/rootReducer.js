import { combineReducers } from "redux";
import { reducerQuanLyNguoiDung } from "./reducerQuanLyNguoiDung";
import { reducerTrangLoading } from "./reducerTrangLoading";

export const rootReducer = combineReducers({
  reducerTrangLoading,
  reducerQuanLyNguoiDung,
});
