import React from "react";
import ThongTinCaNhan from "./ThongTinCaNhan/ThongTinCaNhan";
import CongViecDaThue from ".//CongViecDaThue/CongViecDaThue";
import { serviceLocalStorage } from "../../services/serviceLocalStorage";

export default function TrangChiTietThongTinCaNhan() {
  const tokenUser = serviceLocalStorage.user.get().token;

  return (
    <div className="pt-4">
      <div className="container mx-auto flex">
        <div className="mr-4">
          <ThongTinCaNhan />
        </div>

        <div className="w-full">
          <CongViecDaThue tokenUser={tokenUser} />
        </div>
      </div>
    </div>
  );
}
