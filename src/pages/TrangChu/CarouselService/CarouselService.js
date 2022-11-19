import React from "react";

// css
import "./carouselService.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { dataCarouselHomePage } from "./dataCarouselHomePage";

export default function CarouselService() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="caourselService">
      <h1 className="text-left text-4xl font-bold mb-5">
        Popular professional services
      </h1>
      <Slider {...settings}>
        {dataCarouselHomePage.map((item) => (
          <div className="card">
            <div className="card-top">
              <img src={item.linkImg} alt={item.title} />
            </div>
            <div className="card-bottom text-left">
              <h3 className="text-white text-base mb-1">{item.title}</h3>
              <h1 className="category text-white text-2xl">{item.category}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
