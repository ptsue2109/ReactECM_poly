import { message } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/stores/hooks";

interface Props {
    children: JSX.Element;
    roles?: string[];
}
export const PrivateRouter = ({ children, roles }: Props) => {
    const { userInfo } = useAppSelector((state) => state.authReducer);

    if (userInfo === null) {
          message.info("Login first")
        return <Navigate to="/login" replace />;
    }
    if (userInfo && roles && !roles?.includes(userInfo.role)) {
         message.info("Đăng nhập bằng quyền admin để tiếp tục")
        return <Navigate to="/login" replace />;
    }
    return children;
};