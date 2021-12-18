import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import configureStore from "./Store/Store/store";
import Dashboard from "./pages/dashboard";

// const middleware = applyMiddleware(thunk);
// const store = configureStore(middleware);

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> */}
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
