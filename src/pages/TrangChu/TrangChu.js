import React from "react";
import BannerHerro from "./BannerHerro/BannerHerro";
import CarouselQuote from "./CarouselQuote/CarouselQuote";
import CarouselService from "./CarouselService/CarouselService";
import Marketplace from "./Marketplace/Marketplace";
import TrangChuFeature from "./TrangChuFeature/TrangChuFeature";
import TrangChuFooter from "./TrangChuFooter/TrangChuFooter";
import TrangChuHeader from "./TrangChuHeader/TrangChuHeader";

export default function TrangChu() {
  return (
    <div className="trangChu">
      <TrangChuHeader />

      <BannerHerro />
      <CarouselService />
      <TrangChuFeature />
      <CarouselQuote />
      <Marketplace />
      <TrangChuFooter />
    </div>
  );
}
