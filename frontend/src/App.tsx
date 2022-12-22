import React, { lazy, Suspense, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PUBLIC_ROUTE } from "./configs/Router";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchThunk } from "common/authThunk";
import API_PATHS from "configs/api";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "redux/reducer";
import { Action } from "redux";
import { setUserRD } from "modules/auth/redux/authSlice";
function App() {
  const dispatch =
    useDispatch<ThunkDispatch<IAppState, null, Action<string>>>();
  useEffect(() => {
    try {
      const token = Cookies.get(ACCESS_TOKEN);
      const getUser = async () => {
        const res = await dispatch(fetchThunk(API_PATHS.getUser, "get"));
        dispatch(setUserRD({ data: res.data, token: token }));
        // console.log(res);
      };
      if (token) {
        getUser();
      }
    } catch {
      alert("tim loi di thg l");
    }
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading.....</div>}>
        <Router>
          <Routes>
            {PUBLIC_ROUTE.map((item, idx) => {
              const Layout = item.layout ? item.layout : "div";

              return (
                <Route
                  key={idx}
                  element={<Layout>{item.component}</Layout>}
                  path={item.path}
                ></Route>
              );
            })}
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
