import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "./Store/store/store";
import Dashboard from "./pages/dashboard";
import Post from "./pages/Post";

const middleware = applyMiddleware(thunk);
const store = configureStore(middleware);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router>
        <Switch>
          <Route path={"/"} component={Dashboard}></Route>
          <Route path={"/post"} component={Post}></Route>
        </Switch>
        </Router>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
