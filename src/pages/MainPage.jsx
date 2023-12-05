import React from "react";
import Main from "../components/mainPageComp/Main";
import Footer from "../components/mainPageComp/Footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/Context";

const SubscribeButton = styled.button`
  display: block;
  position: fixed;
  bottom: 16px; 
  left: 50%;
  transform: translateX(-50%);

  z-index: 9999;
  
  width: 350px; 
  background: var(--black); 
  color: var(--white); 
  border-radius: 30px; 
  padding: 16px 0; 
  font-size: 16px; 
  line-height: 1.5; 
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16); 
  transition: 0.3s linear;
  &:hover {
    
    transform: translateX(-50%) scale(1.05);
  }
`;

export const MainPage = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useUser();

  return (
    <>
      <Main />
      <Footer />
      {!isLoggedin && ( 
        <SubscribeButton onClick={() => navigate("/login")}>독서 시작하기</SubscribeButton>
      )}
    </>
  );
};
