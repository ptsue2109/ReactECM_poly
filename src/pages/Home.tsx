import React from "react";
import CardProduct from "../components/CardProduct";
import {  useAppSelector } from "../app/stores/hooks";
import { _access } from "../../db.json";
import Access from "../components/cilent/Access";
import Navbar from "../components/themes/custommer/components/Navbar";
import Brands from "../components/cilent/Brands";
import Footer from "../components/themes/custommer/components/Footer";

type Props = {
  Footer: boolean
};

const Home = ({}: Props) => {
  const { brands } = useAppSelector((state) => state.brandReducer);
  const { products } = useAppSelector((state) => state.productReducer);
  const { newProducts } = useAppSelector((state) => state.homeReducer);
  return (
    <>
      <Navbar sliderStatus={false} />
      <Brands data={brands} />
      <CardProduct data={newProducts} title="Sản phẩm mới" />
      <CardProduct data={products} title="Sản phẩm NỔI BẬT NHẤT" />
      <Access data={_access} title="Phụ kiện" />
      <Access data={_access} title="HÀNG CŨ" />
     
    </>
  );
};

export default Home;
