import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import HeaderCom from "../HeaderCom";
 type Props = {}

const CustomerLayout = (props: Props) => {
  return (
    <>
      <HeaderCom navBtnStatus={true}/>
      <div className="container mt-3">
        <div className="mt-5 ">
          <Outlet />
        </div>
      </div>
      <div className="mt-5 mb-5 ">
         <Footer />
      </div>
    </>
  );
};

export default CustomerLayout;
