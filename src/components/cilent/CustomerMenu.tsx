import React from "react";
import {
  TabletOutlined,
  LaptopOutlined,
  MobileOutlined
} from "@ant-design/icons";
import { BsEarbuds, BsSmartwatch } from "react-icons/bs";
import { GrPlug } from 'react-icons/gr';
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useAppSelector } from './../../app/stores/hooks';
import { Link } from "react-router-dom";
interface Props { }

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


type MenuItem = Required<MenuProps>["items"][number];

// [
//   //   getItem("Điện thoại", '1', <MobileOutlined />, []),
//   //   getItem("Máy tính", "2", <LaptopOutlined />, []),
//   //   getItem("Laptop", "sub3", <TabletOutlined />, []),
//   //   getItem("Tai Nghe", "sub4", <BsEarbuds />, []),
//   //   getItem("Đồng Hồ", "sub5", <BsSmartwatch />, []),
//   //   getItem("Phụ Kiện", "sub6", <GrPlug />, []),

//   // ];


const CustomerMenu = () => {
  const { categories } = useAppSelector(state => state.cateReducer);
  const items: MenuItem[] = categories?.map((itemC: any, index: any) => (
    getItem(<Link to={`categories/${itemC?.slug}`}>{itemC?.cateName}</Link>, index, <LaptopOutlined />, [])
  ))
  return (
    <Menu
      style={{ width: 200 }}
      mode="vertical"
      items={items}
      className="surface-100"
    />)
}

export default CustomerMenu;
