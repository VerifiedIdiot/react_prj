// react의 기능을 임포트하여 사용할 수 있도록 합니다.
import { createContext, useContext, useState } from "react";
import AxiosApi from "../api/AxiosApi";
// axios를 사용하여 API 호출을 수행하는 인스턴스를 임포트합니다.

// UserContext라는 새로운 Context를 생성합니다. 이는 애플리케이션의 다양한 구성 요소에서 사용자 정보를 공유할 수 있게 합니다.
const UserContext = createContext();

// 이 함수는 UserContext를 사용하기 위한 훅입니다. 이를 통해 컴포넌트 내에서 쉽게 user 상태를 사용할 수 있습니다.
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider 컴포넌트는 user 상태를 관리하고, user 상태와 관련된 함수들을 자식 컴포넌트에게 제공하는 역할을 합니다.
export const UserProvider = ({ children }) => {
  // 사용자 정보를 저장하기 위한 상태입니다.
  const [user, setUser] = useState(null);
  // 사용자의 로그인 여부를 저장하기 위한 상태입니다.
  const [isLoggedin, setIsLoggedin] = useState(false);
  // 사용자의 인증 토큰을 저장하기 위한 상태입니다.
  const [token, setToken] = useState(null);

  // login 함수는 사용자 데이터와 토큰을 인수로 받아 상태를 업데이트하고, 로그인 상태를 true로 설정합니다.
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsLoggedin(true);
    // console.log(user); // 현재 로그인한 사용자 정보를 콘솔에 출력합니다.
  };

  // logout 함수는 사용자 정보와 토큰을 초기화하고, 로그인 상태를 false로 설정합니다.
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedin(false);
  };

  // checkLoginStatus 함수는 비동기로 로그인 상태를 체크합니다.
  // const checkLoginStatus = async () => {
  //   try {
  //     // 로컬 스토리지에서 'authToken'이라는 키로 저장된 토큰을 가져옵니다.
  //     const token = window.localStorage.getItem("authToken");
  //     // AxiosApi를 통해 로그인 상태를 체크하는 API를 호출하고, 토큰을 인자로 전달합니다.
  //     const response = await AxiosApi.checkLogin(token);
  //     // console.log(response.data); // 응답 데이터를 콘솔에 출력합니다.
  //     // 응답에서 "User is logged in" 메시지를 받으면 사용자가 로그인한 것으로 간주하고, login 함수를 호출합니다.
  //     if (response.data.message === "User is logged in") {
  //       login(response.data.user, token);
  //       console.log(`로그인 상태`);
  //     } else {
  //       // 그렇지 않다면 logout 함수를 호출하여 사용자를 로그아웃 처리합니다.
  //       logout();
  //       console.log("로그아웃 상태");
  //     }
  //   } catch (error) {
  //     // API 호출 중 에러가 발생하면 콘솔에 에러를 출력하고, logout 함수를 호출합니다.
  //     console.error("Error checking login status:", error);
  //     logout();
  //   }
  // };
  // 컨텍스트에 checkLoginStatus 함수 추가
  const checkLoginStatus = async () => {
    try {
      const token = window.localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기
      const response = await AxiosApi.checkLogin(token); // 토큰을 인자로 전달
      if (response.data.message === "User is logged in") {
        if (response.data.user.loginType === "kakao") {
          // 카카오 로그인 상태 확인
          const kakaoResponse = await AxiosApi.checkKakaoLogin(token);
          if (kakaoResponse.status === 200) {
            // 카카오 로그인 사용자의 정보 가져오기
            console.log(kakaoResponse);
            const kakaoUserInfoResponse = await AxiosApi.getKakaoUserInfo(
              token
            );
            if (kakaoUserInfoResponse.status === 200) {
              login(kakaoUserInfoResponse.data, token);
            }
          }
        } else {
          const userInfoResponse = await AxiosApi.getUserInfo(
            response.data.user.id
          );
          if (userInfoResponse.status === 200) {
            login(userInfoResponse.data, token);
          }
        }
        console.log(response.data.user.cash);
        console.log(response.data.user.id);
        console.log(response.data.user.loginType);
        console.log(`로그인 상태`);
      } else {
        logout();
        console.log("로그아웃 상태");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      logout();
    }
  };

  // contextValue 객체는 UserContext를 통해 제공될 값들을 정의합니다.
  // 이 객체는 사용자 정보, 로그인 상태, 로그인/로그아웃 함수, 토큰 정보, 로그인 상태 체크 함수를 포함합니다.
  const contextValue = {
    user,
    isLoggedin,
    login,
    logout,
    checkLoginStatus,
    token,
  };

  // UserContext.Provider는 contextValue를 value로 사용하여, 이를 자식 컴포넌트에게 제공합니다.
  // 이렇게 하면 모든 자식 컴포넌트들이 이 값을 사용할 수 있게 됩니다.
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
