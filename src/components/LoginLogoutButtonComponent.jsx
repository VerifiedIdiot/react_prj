import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/Context";
import AxiosApi from "../api/AxiosApi";

const LoginLogoutButton = () => {
  const { isLoggedin, logout, token } = useUser();
  const navigate = useNavigate();

  const logoutButton = async () => {
    if (isLoggedin) {
      // 이미 로그인된 경우 로그아웃 처리
      await AxiosApi.memberLogout(token);
      logout();
      localStorage.clear();
      navigate("/");
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      navigate("/login");
    }
  };

  return (
    <button onClick={logoutButton}>{isLoggedin ? "Logout" : "Login"}</button>
  );
};

export default LoginLogoutButton;
