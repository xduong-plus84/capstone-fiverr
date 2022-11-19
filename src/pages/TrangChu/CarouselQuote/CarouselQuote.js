import React from "react";

// css
import "./carouselQuote.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { dataCarouselQuote } from "./dataCarouselQuote";

export default function CarouselQuote() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <div className="carouselQuote">
      <Slider {...settings}>
        {dataCarouselQuote.map((item) => (
          <div className="card">
            <div className="card-content">
              <img src={item.linkImg} alt={item.title} />
              <div className="card-right text-left">
                <h1 className="text-gray-500 text-xl mb-5">
                  {item.name} - {item.position}
                </h1>
                <h3
                  className="category text-2xl font-medium font-serif italic"
                  style={{ color: "#003912" }}
                >
                  " {item.speech} "
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
