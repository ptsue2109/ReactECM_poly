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
import styled from "styled-components";
interface Props { }

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem { return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


type MenuItem = Required<MenuProps>["items"][number];
const CustomerMenu = () => {
  const { categories } = useAppSelector(state => state.cateReducer);
  const items: MenuItem[] = categories?.map((itemC: any, index: any) => (
    getItem(<Link className="text-color hover:text-red-700" to={`categories/${itemC?.slug}`}>{itemC?.cateName}</Link>, index, <LaptopOutlined />, [])
  ))
  return (
    <Menu
      style={{ width: 200, lineHeight: '10px'  }}
      mode="vertical"
      items={items}
      className="surface-100 "
    />)
}

export default CustomerMenu;

const LinkC = styled(Link)`
  color: black;
  :hover{
    color: red
  }
`