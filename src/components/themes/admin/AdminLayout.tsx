import { Outlet } from "react-router-dom";
import HeaderCom from "../HeaderCom";
import Sidebar from "./components/Sidebar";

interface Props {

}

const AdminLayout = (props: Props) => {
    return (
        <div>
            <HeaderCom navBtnStatus={false}/>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div /></div><div className="chartjs-size-monitor-shrink"><div /></div></div>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h3 id="setPageName"></h3>
                        </div>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
