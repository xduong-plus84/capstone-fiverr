import React from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

export default function TrangLoading() {
  let { isLoading } = useSelector((state) => state.reducerTrangLoading);
  return isLoading ? (
    <div
      style={{ marginTop: 0 }}
      className="h-screen w-screen fixed left-0 top-0 bg-black flex justify-center items-center z-50 opacity-90"
    >
      <HashLoader color="#BB8E4D" size={200} />
    </div>
  ) : (
    <></>
  );
}
