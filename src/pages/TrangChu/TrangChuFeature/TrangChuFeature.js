import { CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
import "./trangChuFeature.css";

export default function TrangChuFeature() {
  return (
    <div className="trangChuFeature">
      <div className="container">
        <div className="content text-left mr-40">
          <h1 className="font-bold">
            A whole world of freelance talent at your fingertips
          </h1>
          <h2>
            <CheckCircleOutlined className="mr-3 text-2xl" />
            The best for every budget
          </h2>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <h2>
            <CheckCircleOutlined className="mr-3 text-2xl" />
            Quality work done quickly
          </h2>
          <p>
            Find the right freelancer to begin working on your project within
            minutes.
          </p>
          <h2>
            <CheckCircleOutlined className="mr-3 text-2xl" />
            Protected payments, every time
          </h2>
          <p>
            Always know what you'll pay upfront. Your payment isn't released
            until you approve the work.
          </p>
          <h2>
            <CheckCircleOutlined className="mr-3 text-2xl" />
            24/7 support
          </h2>
          <p>
            Questions? Our round-the-clock support team is available to help
            anytime, anywhere.
          </p>
        </div>
        <div className="video">
          <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png" />
        </div>
      </div>
    </div>
  );
}
