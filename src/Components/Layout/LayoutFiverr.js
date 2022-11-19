import React from "react";
import FooterFiverr from "./FooterFiverr/FooterFiverr";
import HeaderFiverr from "./HeaderFiverr/HeaderFiverr";

export default function LayoutFiverr(props) {
  let { Component } = props;
  return (
    <div className="h-screen">
      <HeaderFiverr />
      <div>{<Component />}</div>
      {/* <FooterFiverr /> */}
    </div>
  );
}
