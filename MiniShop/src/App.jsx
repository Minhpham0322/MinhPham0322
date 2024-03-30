import React from "react";
import LoginPage from "./Components/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSelector from "./core/hook";
import DefaultPage from "./Components/DefaultPage";

export default function App() {
  const { onLogin } = useSelector();

  return (
    <div>
      <ToastContainer />
      {onLogin ? <LoginPage /> : <DefaultPage />}
    </div>
  );
}
