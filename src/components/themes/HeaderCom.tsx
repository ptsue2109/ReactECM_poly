
import styled from "styled-components";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Input, Dropdown, Menu, message, MenuProps, Space } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/stores/hooks";
interface Props {
  navBtnStatus: boolean
}

const HeaderCom = ({ navBtnStatus }: Props) => {
  const { userInfo } = useAppSelector((state) => state.authReducer);
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key == "admin-db") return message.info(`Welcom to  ${key}`);
  };
  const submitE = () =>{
    
  }
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Profile',
          key: '1',
        },
        {
          label: (
            <Link to="/admin">
              Admin
            </Link>
          ),
          key: 'admin-db',

        },
        {
          label: 'Logout',
          key: '3',
        }
      ]}
    />
  )
  const topNavArr = [
    {
      url: '#',
      text: 'Gọi mua hàng 190033532'
    },
    {
      url: '#',
      text: 'Cửa hàng gần bạn',
      icon: 'pi pi-map-marker'
    },
    {
      url: '/cart',
      text: 'Giỏ hàng',
      icon: 'pi pi-shopping-bag'
    },
    {
      url: '/tra-cuu-don',
      text: 'Tra cứu đơn hàng',
      icon: 'pi pi-map-marker'
    }
  ]
  return (
    <>
      <div className="flex justify-content-between  align-items-center header_color max-h-4rem text-white ">
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
              {topNavArr && topNavArr.map((item: any, index: any) => (
                <div className="top_nav-button--div" key={index}>
                  <i className={`${item?.icon} icon`}></i>
                  <Link to={item?.url} className="top_nav-buttonBox">{item?.text}</Link>
                </div>
              ))}
              <Dropdown overlay={menu} className="cursor-pointer top_nav-button--div">
                <Space>
                  <div className="capitalize">{userInfo ? userInfo?.username : 'user'}</div>
                  <DownOutlined />
                </Space>
              </Dropdown>
            </div>
          </NavBtn>
        ) : null}
      </div>
    </>
  );
};


const WrapperInput = styled(Input)`
  border: none;
  border-radius: 5px;
  width: 500px;
`;

const NavBtn = styled.div`
  .top_nav-button--div{
    border-radius: 5px;
    &:hover {
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12),
      0px 4px 5px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
  }
`;

export default HeaderCom;
