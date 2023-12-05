import styled, { css, keyframes } from "styled-components";
import KakaoColorImg from "../assets/images/kakao_color.png";
import KakaoImg from "../assets/images/kakao_white.png";
import backgroundImage from "../assets/images/theme/bookInTheForest.jpg";
import logo from "../assets/images/logoPhrase.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const BackgroundImage = styled.div`
  z-index: 0;
  flex: 0.6;
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: row; // 가로 배치
  align-items: center;
  background: #ebecf0;
  overflow: hidden;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-position: left;
  background-repeat: no-repeat;
  background-size: 60%;
`;
const Form = styled.form`
  z-index: 1;
  flex: 0.6; // 백그라운드 이미지와 폼의 비율을 조절
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  width: 100%; // 폼의 너비를 100%로 설정
  max-width: 328px; // 폼의 최대 너비를 500px로 제한
  position: absolute; // 폼이 서로 겹치게 하기 위해 position을 absolute로 설정
  opacity: ${(props) => (props.$isRightPanelActive ? 0 : 1)};
`;

const LoginForm = styled(Form)`
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 328px;
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  animation: ${(props) =>
    props.$isRightPanelActive ? css`2s ${fadeOut}` : css`2s ${fadeIn}`};
  opacity: ${(props) => (props.$isRightPanelActive ? 0 : 1)};
  z-index: ${(props) => (props.$isRightPanelActive ? -1 : 1)};
`;

const SignupForm = styled(Form)`
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 328px;
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  animation: ${(props) =>
    props.$isRightPanelActive ? css`2s ${fadeIn}` : css`2s ${fadeOut}`};
  opacity: ${(props) => (props.$isRightPanelActive ? 1 : 0)};
  z-index: ${(props) => (props.$isRightPanelActive ? 1 : -1)};
`;
const Logo = styled.div`
  width: 100px; // 원하는 로고의 크기로 조정
  height: 100px;
  background: url(${logo}) no-repeat center/cover;
  margin-bottom: 20px; // 로고와 폼 사이의 간격 조정
`;
const Input = styled.input`
  background: #eee;
  padding: 16px;
  margin: 8px 0;
  width: 100%;
  border: 0;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
`;

const Button = styled.button`
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  padding: 15px 45px;
  margin: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 80ms ease-in;
  box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;

  &:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;
const SocialLinks = styled.div`
  margin: 20px 0;
  display: flex;
`;

const SocialLink = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 50%;
  box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
  cursor: pointer;
  background-image: url(${KakaoImg});
  background-size: cover;
  transition: background-image 0.5s ease-in-out;

  &:hover {
    background-image: url(${KakaoColorImg});
  }

  &:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;

const OverlayButton = styled.button`
  background-color: #ff4b2b;
  color: #fff;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  padding: 15px 45px;
  margin-top: 30px;
  cursor: pointer;
  transition: transform 80ms ease-in;
  box-shadow: -5px -5px 10px #ff6b3f, 5px 5px 8px #bf4b2b;
  &:active {
    box-shadow: inset 1px 1px 2px #bf4b2b, inset -1px -1px 2px #ff6b3f;
  }
`;

const Overlay = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  background-color: #ff4b2b;
  color: #fff;
  transition: all 0.5s;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 4px;
  animation: ${fadeIn} 1s;
`;

export {
  Wrapper,
  Container,
  Form,
  SignupForm,
  LoginForm,
  Input,
  Button,
  SocialLinks,
  SocialLink,
  OverlayButton,
  Overlay,
  ErrorText,
  Logo,
  BackgroundImage,
};
