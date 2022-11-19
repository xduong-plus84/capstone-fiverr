import React from "react";

// css
import "./marketplace.css";

export default function Marketplace() {
  return (
    <div className="marketplace">
      <div className="container">
        <h1 className="text-left text-4xl font-bold mb-5">
          Explore the marketplace
        </h1>
        <div className="cards flex flex-wrap justify-center items-center">
          <a className="cardImg mx-20 mb-10">
            <img src={require("./imgMarketplace/graphics.png")} />
            <h1>Graphics & Design</h1>
          </a>
          <a className="cardImg mx-20 mb-10">
            <img src={require("./imgMarketplace/digital.png")} />
            <h1>Digital Marketing</h1>
          </a>
          <a className="cardImg mx-20 mb-10">
            <img src={require("./imgMarketplace/writing.png")} />
            <h1>Writing & Translation</h1>
          </a>
          <a className="cardImg mx-20 mb-10">
            <img src={require("./imgMarketplace/video.png")} />
            <h1>Video & Animation</h1>
          </a>
          <a className="cardImg mx-20 mb-10">
            <img src={require("./imgMarketplace/music.png")} />
            <h1>Music & Audio</h1>
          </a>
          <a className="cardImg mx-20 mb-10">
            <img src={require("./imgMarketplace/programming.png")} />
            <h1>Programming & Tech</h1>
          </a>
          <a className="cardImg mx-20 mb-10">
            <img src={require("./imgMarketplace/business.png")} />
            <h1>Business</h1>
          </a>
        </div>
      </div>
    </div>
  );
}
