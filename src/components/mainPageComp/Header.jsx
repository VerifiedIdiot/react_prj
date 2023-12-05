import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/Context";
import styled from "styled-components";
import appLogo from "../../assets/images/appLogo.png";
import AxiosApi from "../../api/AxiosApi";

// Styled Components 정의
const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  vertical-align: middle;
  background: var(--white);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 0.5px rgba(0, 0, 0, 0.12);
`;

const NavigationMenu = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  height: 80px;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
  cursor: pointer;
  img {
    height: 60px;
    width: auto;
    transition: 0.25s linear;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const MenuItem = styled.div`
  font-weight: bolder;
  color: var(--black);
  cursor: pointer;
  margin: 0 15px;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    transition: 0.3s linear;
    color: #747171;
  }
`;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedin, logout, token } = useUser();
  const { checkLoginStatus } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus().then(() => {
      // checkLoginStatus가 resolve된 후 0.2초 지연을 줍니다.
      setTimeout(() => {
        setIsLoading(false);
      }, 1);
    });
  }, []);

  if (isLoading) {
    // 0.2초 동안 또는 로그인 상태 확인이 완료될 때까지 로딩 인디케이터를 표시합니다.
    return <div></div>; // 또는 로딩 인디케이터 컴포넌트
  }

  // useEffect(() => {
  //   console.log("로그인 상태:", isLoggedin);
  // }, [isLoggedin]);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    if (isLoggedin) {
      // 로그인된 경우 로그아웃 처리
      await AxiosApi.memberLogout(token);
      logout();
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <HeaderContainer>
      <LogoContainer onClick={handleLogoClick}>
        <img src={appLogo} alt="로고" />
      </LogoContainer>
      <NavigationMenu>
        {isLoggedin ? (
          <>
            <MenuItem onClick={() => navigate("/CartPage")}>
              <h3>장바구니</h3>
            </MenuItem>
            <MenuItem onClick={() => navigate("/mypage")}>
              <h3>마이페이지</h3>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <h3>로그아웃</h3>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => navigate("/signup")}>
              <h3>회원가입</h3>
            </MenuItem>
            <MenuItem onClick={() => navigate("/login")}>
              <h3>로그인</h3>
            </MenuItem>
          </>
        )}
      </NavigationMenu>
    </HeaderContainer>
  );
}

export default Header;
