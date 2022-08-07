import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Dropdown, Menu, message, MenuProps, Space, Button ,Badge } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/stores/hooks";
import { topNavArr } from "../../../db.json";
import { clearState } from "../../app/stores/slices/authSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
interface Props {
  navBtnStatus: boolean;
}

const HeaderCom = ({ navBtnStatus }: Props) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.authReducer);
const carts = useAppSelector((state) => state.orderSlice)
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key == "admin-db") return message.info(`Welcom to  ${key}`);
  };

  const logout: any = () => {
    dispatch(clearState());
    message.success("Logout success");
  };
  const submitE = () => { };

  const menu = userInfo ? (
    <Menu
      onClick={onClick}
      items={[
        {
          label: "Profile",
          key: "1",
        },
        userInfo?.role == "admin"
          ? {
            label: <Link to="/admin">Admin</Link>,
            key: "admin-db",
          }
          : null,
        {
          label: <Button onClick={logout}>Logout</Button>,
          key: "3",
        },
      ]}
    />
  ) : (
    <Menu
      onClick={onClick}
      items={[
        {
          label: <Link to="/login">Login</Link>,
          key: "login",
        },
        {
          label: <Link to="/register">Register</Link>,
          key: "regsiter",
        },
      ]}
    />
  );
  return (
    <div className="">
      <div className="  flex justify-content-between align-items-center header_color max-h-4rem text-white ">
        <div className="flex-0 flex justify-items-between gap-4 ml-7 px-3">
          <Link to={"/"}>
            <img
              src="https://cdn.sforum.vn/sforum/wp-content/uploads/2021/08/logo_cps-1.png"
              className="max-w-10rem"
              alt=""
            />
          </Link>
        </div>
        <div className="flex-1 flex  justify-items-center align-items-center  m-2 px-5 py-3 border-round gap-3">
          <WrapperInput
            size="large"
            placeholder="Enter keyword.."
            prefix={<SearchOutlined />}
            onSubmit={submitE}
          />
        </div>
        {navBtnStatus == true ? (
          <NavBtn>
            <div className="flex-1 flex justify-content-start gap-3 top_nav-button">
              {topNavArr &&
                topNavArr.map((item: any, index: any) => (
                  <div className="top_nav-button--div w-6rem" key={index}>
                    <i className={`${item?.icon} icon`} ></i>
                    <Link to={item?.url} className="top_nav-buttonBox">
                      {item?.text}
                    </Link>
                  </div>
                ))}
              <Dropdown
                overlay={menu}
                className="cursor-pointer top_nav-button--div"
              >
                <Space>
                  <div className="capitalize">
                    {userInfo ? (
                      userInfo?.username
                    ) : (
                      <>
                        <div className="text-center">
                          <i className="pi pi-user text-center"></i>
                          <br />
                          Smember
                        </div>
                      </>
                    )}
                  </div>
                </Space>
              </Dropdown>
            </div>
          </NavBtn>
        ) : null}
      </div>
    </div>
  );
};

const WrapperInput = styled(Input)`
  border: none;
  border-radius: 5px;
  width: 500px;
`;

const NavBtn = styled.div`
  .top_nav-button--div {
    border-radius: 5px;
    &:hover {
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12),
        0px 4px 5px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
    }
  }
`;

export default HeaderCom;
