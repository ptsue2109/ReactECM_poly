import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./app/stores/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Spin } from "antd";
import styled from "styled-components";
let persistor = persistStore(store);
const LoadingStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loading = (
  <LoadingStyle>
    <Spin size="large" />
  </LoadingStyle>
);

const App = React.lazy(() => import("./App"));
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.Suspense fallback={Loading}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Suspense>
    </PersistGate>
  </Provider>
);
