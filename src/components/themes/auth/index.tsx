import React from "react";
import { Outlet } from "react-router-dom";

type Props = {}

const index = (props: Props) => {
  return (
    <>   
      <Outlet/>
      
    </>
  )
}

export default index