import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme3 from "../../../assets/images/theme/bookInTheForest.jpg";
import logoMan from "../../../assets/images/appLogo.png";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 0.9;
  }
`;

const ThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 0;
  margin: 0;
  background-color: black;
  img {
    width: 90vw;
    height: 40vw;
    border-radius: 0;
  }
`;

const BackgroundBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 4vw;
  width: 50vw;
  height: 33vw;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  animation: ${slideIn} 2s ease-out;
`;

const LogoContainer = styled.div`
  display: flex;
  padding-left: 20%;
  img {
    width: 15vw;
    height: 15vw;
    border-radius: 0;
    opacity: 0.8;
    z-index: 100000;
    animation: ${slideIn} 2s ease-out;
  }

  @media (max-width: 600px) {
    img {
      width: 12vw;
      height: 12vw;
    }
  }
`;

const PhraseContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20%; 
  color: white;
  font-family: "Peace-light";
  h1 {
    font-family: "Peace-light";
    margin: 3vw;
    margin-left: 0;
    font-size: 4vw;
    white-space: nowrap;
    opacity: 0.8;
    @media (max-width: 600px) {
      margin: 1.5vw;
    }
  }

  h3 {
    font-family: "Peace-light";
    margin: 3vw;
    margin-left: 0;
    font-size: 1vw;
    white-space: nowrap;
    opacity: 0.8;
    @media (max-width: 600px) {
      margin: 1.5vw;
    }
  }

  animation: ${slideIn} 2s ease-out;
`;

const ThemeBox = () => {
  return (
    <ThemeContainer>
      <img src={theme3} alt="테마 이미지" />
      <BackgroundBox>
        <LogoContainer>
          <img src={logoMan} alt="로고 이미지" />
        </LogoContainer>
        <PhraseContainer>
          <h1>독서야행</h1>
          <h3>매 페이지마다 마법 같은 여행이 펼쳐집니다.</h3>
        </PhraseContainer>
      </BackgroundBox>
    </ThemeContainer>
  );
};

export default ThemeBox;
