import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
// import App from './App';
import LoginForm from './components/LoginForm/LoginForm';
import reportWebVitals from './reportWebVitals';
import AdminPanel from './components/AdminPanel/AdminPanel';
import AddUser from './components/AddUser/AddUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm/>,
  },
  {
    path: "/admin",
    element: <AdminPanel/>,
  },
  {
    path: "/admin/user",
    element: <AddUser/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
