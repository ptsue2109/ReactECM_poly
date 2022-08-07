import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ScrollTop } from "primereact/scrolltop";
import { useAppDispatch, useAppSelector } from "./app/stores/hooks";
import { fetchHomeData } from "./app/stores/slices/homeSlice";
import { FetchProductList } from "./app/stores/thunks/productThunk";
import { FetchCateList } from "./app/stores/thunks/cateThunk";
import { ListBrands } from "./app/stores/thunks/brandThunk";
import { AsyncFetchUserList } from "./app/stores/thunks/userThunk";
import { AsyncFetchSliders } from "./app/stores/thunks/sliderThunk";
const CustomerLayout = React.lazy(() => import("./components/themes/custommer/CustomerLayout"));
const AdminLayout = React.lazy(() => import("./components/themes/admin/AdminLayout"));
import { PrivateRouter } from "./components/PrivateRoute";

const Home = React.lazy(() => import("./pages/Home"));
const Search = React.lazy(() => import("./pages/Search"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const ErrorBound = React.lazy(() => import("./components/Error"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const ProductList = React.lazy(() => import("./pages/admin/products/ProductList"));
const ProductAdd = React.lazy(() => import("./pages/admin/products/ProductAdd"));
const ProductEdit = React.lazy(() => import("./pages/admin/products/ProductEdit"));
const Detail = React.lazy(() => import("./pages/products/Detail"));
const CateList = React.lazy(() => import("./pages/admin/categories/CategoryList"));
const CateAdd = React.lazy(() => import("./pages/admin/categories/CategoryAdd"));
const CateEdit = React.lazy(() => import("./pages/admin/categories/CategoryEdit"));
const BrandList = React.lazy(() => import("./pages/admin/brands/BrandList"));
const BrandAdd = React.lazy(() => import("./pages/admin/brands/BrandAdd"));
const BrandEdit = React.lazy(() => import("./pages/admin/brands/BrandEdit"));
const UserList = React.lazy(() => import("./pages/admin/users/UserList"));
const UserAdd = React.lazy(() => import("./pages/admin/users/UserAdd"));
const UserEdit = React.lazy(() => import("./pages/admin/users/UserEdit"));
const SliderList = React.lazy(() => import("./pages/admin/sliders/SlidersList"));
const SliderAdd = React.lazy(() => import("./pages/admin/sliders/SlidersAdd"));
const SliderEdit = React.lazy(() => import("./pages/admin/sliders/SlidersEdit"));
const ProductByCate = React.lazy(() => import("./pages/products/ProductCate"));
const ProductBrand = React.lazy(() => import('./pages/products/ProductBrand'));
const ProductListClient = React.lazy(() => import("./pages/products/ProuductList"))
const CartItem = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"))
function App() {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.authReducer);
  const { carts } = useAppSelector((state) => state.orderSlice);

  React.useEffect(() => {
    dispatch(fetchHomeData());
    dispatch(FetchProductList());
    dispatch(FetchCateList());
    dispatch(ListBrands());
    dispatch(AsyncFetchUserList());
    dispatch(AsyncFetchSliders())
  }, [dispatch]);

  return (
    <div className="max-w-full overflow-x-hidden">
      <Routes >
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home Footer={true} />} />
          <Route path="tim-kiem/" element={<Search />} />
          <Route path="products/:slug" element={<Detail />} />
          <Route path="products" element={<ProductListClient />} />
          <Route path="categories/:slug" element={<ProductByCate />} />
          <Route path="brands/:slug" element={<ProductBrand />} />
          <Route path="cart" element={<CartItem />} />
          <Route path="checkout/:userId" element={<Checkout />} />
        </Route>
        <Route path="/admin" element={<PrivateRouter roles={["admin"]}><AdminLayout /></PrivateRouter>} >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path=":id/edit" element={<ProductEdit />} />
          </Route>
          <Route path="categories">
            <Route index element={< CateList />} />
            <Route path="add" element={<CateAdd />} />
            <Route path=":id/edit" element={<CateEdit />} />
          </Route>
          <Route path="brands">
            <Route index element={< BrandList />} />
            <Route path="add" element={<BrandAdd />} />
            <Route path=":id/edit" element={<BrandEdit />} />
          </Route>
          <Route path="sliders">
            <Route index element={< SliderList />} />
            <Route path="add" element={<SliderAdd />} />
            <Route path=":id/edit" element={<SliderEdit />} />
          </Route>
          <Route path="users">
            <Route index element={< UserList />} />
            <Route path="add" element={<UserAdd />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login user={userInfo} />} />
        <Route path="/register" element={<Register user={userInfo} />} />
        <Route path="*" element={<ErrorBound />} />
      </Routes>
      <ScrollTop threshold={20} />

    </div>
  );
}

export default App;
