import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import HeaderCom from "../HeaderCom";
interface Props { }

const CustomerLayout = (props: Props) => {
  return (
    <>
      <HeaderCom navBtnStatus={true}/>
      <div className="container mt-3">
        <div className="mt-5">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CustomerLayout;
