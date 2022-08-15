import {
  AppstoreOutlined,
  UserOutlined,
  PieChartOutlined,
  BarsOutlined,
  ShoppingOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import React from "react";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to="/admin/dashboard">Thống kê</Link>,
    "link",
    <PieChartOutlined />
  ),
  getItem("Quản lí sản phẩm", "sub1", <AppstoreOutlined />, [
    getItem(<Link to="/admin/products"> Danh sách sản phẩm</Link>, "1"),
    getItem(<Link to="/admin/products/add"> Thêm sản phẩm</Link>, "2"),
  ]),
  getItem("Quản lí người dùng", "sub2", <UserOutlined />, [
    getItem(<Link to="/admin/users"> Danh sách người dùng</Link>, "3"),
    getItem(<Link to="/admin/users/add"> Thêm người dùng</Link>, "4"),
  ]),
  getItem("Quản lí danh mục", "sub4", <UserOutlined />, [
    getItem(<Link to="/admin/categories"> Danh sách danh mục</Link>, "7"),
    getItem(<Link to="/admin/categories/add"> Thêm danh mục</Link>, "8"),
  ]),
  getItem("Quản lí đơn hàng", "sub5", <ShoppingOutlined />, [
    getItem(<Link to="/admin/orders"> Danh sách đơn hàng</Link>, "9"),
    getItem(<Link to="/admin/orders/create">Thêm đơn hàng </Link>, "10"),
    getItem(<Link to="/admin/orders/deleted">Danh sách đơn hủy</Link>, "11"),
  ]),
  getItem("Quản lí slider", "sub6", <PictureOutlined />, [
    getItem(<Link to="/admin/sliders"> Danh sách slider</Link>, "12"),
    getItem(<Link to="/admin/sliders/add"> Thêm slider</Link>, "13"),
  ]),
  getItem("Quản lí thương hiệu", "sub7", <PictureOutlined />, [
    getItem(<Link to="/admin/brands"> Danh sách thương hiệu</Link>, "14"),
    getItem(<Link to="/admin/brands/add"> Thêm thương hiệu</Link>, "15"),
  ]),
];

const Sidebar2: React.FC = () => {
  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-2 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky pt-3">
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={["link"]}
            defaultOpenKeys={["link"]}
            items={items}
            mode="inline"
          />
        </div>
      </nav>
    </>
  );
};

export default Sidebar2;
