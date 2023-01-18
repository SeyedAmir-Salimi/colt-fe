import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ContextProvider from "context/context";
import Login from "pages/login/Login";
import { HOME, HOME_ROUTE, LOGIN, LOGIN_ROUTE } from "const";
import Home from "pages/home/Home";
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const appRoutes = [
  {
    title: LOGIN,
    key: LOGIN,
    link: LOGIN_ROUTE,
    exact: true,
    component: <Login />,
  },
  {
    title: HOME,
    key: HOME,
    link: HOME_ROUTE,
    exact: true,
    component: <Home />,
  }
];

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContextProvider>
          <div>
            <Routes>
            {appRoutes.map(({ key, link, component}) => (
              <Route key={key} path={link} element={component}/>
              ))}
            </Routes>
          </div>
          <ToastContainer />
        </ContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
