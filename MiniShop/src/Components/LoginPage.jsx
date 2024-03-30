import React, { useState } from "react";
import "../assets/Login.scss";
import { client } from "../Api/cardAPI";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "../core/hook";
import Loading from "./Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { response, data } = await client.get(`/api-key?email=${email}`);
    
    try {
      if (response.ok) {
        setLoading(false);
        toast("chao mung ban da quay tro lai");
        const ApiKey = data.data.apiKey;
        localStorage.setItem("apiKey", ApiKey);
        localStorage.setItem("email", email);
        client.setApiKey = ApiKey;
        dispatch({
          type: "onLogin",
          payload: false,
        });
      } else {
        setLoading(false);
        toast("Vui lòng nhập đúng tài khoản và mật khẩu ");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="login">
      {loading && <Loading />}
      <form className="form-login" action="" onSubmit={handleSubmit}>
        <h2>Email</h2>
        <p> Tài khoản demo : phivanduc325@gmail.com</p>
        <input
          type="email"
          placeholder="Enter email "
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
