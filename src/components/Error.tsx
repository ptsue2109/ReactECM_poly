import React from "react";
import { Link } from "react-router-dom";
import Footer from "./themes/custommer/components/Footer";
import HeaderCom from "./themes/HeaderCom";

type Props = {};

const Error = (props: Props) => {

  return (
    <>
      <HeaderCom navBtnStatus />
      <img
        src="https://c1.staticflickr.com/9/8413/29279923381_ef4976acae_o.jpg"
        alt="not-found" className="w-full"
      />
      <Footer brandBanner={false} />
    </>
  );
};

export default Error;
