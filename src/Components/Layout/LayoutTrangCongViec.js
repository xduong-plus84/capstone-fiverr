import React from "react";
import HeaderTrangCongViec from "./HeaderTrangCongViec/HeaderTrangCongViec";
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import FooterTrangCongViec from "./FooterTrangCongViec/FooterTrangCongViec";

export default function LayoutTrangCongViec(props) {
  let { Component } = props;

  return (
    <div className="h-screen container mx-auto">
      <HeaderTrangCongViec />
      <CategoriesMenu />
      {<Component />}
      <FooterTrangCongViec />
    </div>
  );
}
