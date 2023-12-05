import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import KakaoColorImg from "../images/kakao_color.png";
import KakaoImg from "../images/kakao_white.png";
import {
  Wrapper,
  Container,
  Form,
  Input,
  Button,
  SocialLinks,
  SocialLink,
  OverlayButton,
  OverlayLeft,
  OverlayRight,
  ErrorText,
} from "../components/LoginComponent";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import Modal from "../util/LoginModal";
import EmailVerificationComponent from "../components/MailComponent";
import { useUser } from "../context/Context";

const Login = () => {
  const [socialImage, setSocialImage] = useState(KakaoColorImg); // 초기 이미지 설정
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPwd] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { isLoggedin, checkLoginStatus, login } = useUser();

  const navigate = useNavigate();

  const closeModal = () => {
    setLoginModalOpen(false);
  };

  const socialHover = () => {
    setSocialImage(KakaoColorImg);
  };

  const socialLeave = () => {
    setSocialImage(KakaoImg);
  };

  const toggleRightPanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const [signUpData, setSignUpData] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    cash: "0",
  });

  const [dataErrors, setDataErrors] = useState({
    id: null,
    password: null,
    email: null,
    phone: null,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // 자식 호출 받는 함수
  const verifyEmail = (value) => {
    setIsVerified(value);
  };

  useEffect(() => {
    const validateForm = () => {
      const idRegex = /^[a-zA-Z0-9]{8,20}$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

      const idError = !idRegex.test(signUpData.id)
        ? "ID 8~20자의 영문 대소문자와 숫자 조합이어야 합니다."
        : false;

      const passwordError = !passwordRegex.test(signUpData.password)
        ? "Password 8~20자의 대소문자, 특수문자, 숫자를 포함해야 합니다."
        : false;

      const emailError = !emailRegex.test(signUpData.email)
        ? "올바른 이메일 형식이 아닙니다."
        : false;

      const phoneError = !phoneRegex.test(signUpData.phone)
        ? "올바른 전화번호 형식이 아닙니다."
        : false;

      setDataErrors({
        id: idError,
        password: passwordError,
        email: emailError,
        phone: phoneError,
      });
    };

    validateForm();
    checkLoginStatus();
    const checkAndRedirect = async () => {
      await checkLoginStatus(); // 로그인 상태 확인
      if (isLoggedin) {
        navigate("/purchase"); // 원하는 페이지로 리다이렉트
      }
    };
    checkAndRedirect();

    if (
      dataErrors.id === false &&
      dataErrors.password === false &&
      dataErrors.email === false &&
      dataErrors.phone === false &&
      isVerified
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [signUpData, isVerified, isLoggedin]);

  const textChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    const res = await AxiosApi.memberLogin(inputId, inputPw);
    console.log(res.data);
    if (res.data) {
      window.localStorage.setItem("userId", inputId);
      window.localStorage.setItem("userPw", inputPw);
      window.localStorage.setItem("isLogin", "TRUE");
      // 로그인이 성공하면 토큰을 클라이언트에 저장
      const token = res.data; // 토큰 응답 데이터
      console.log(token);

      if (token) {
        window.localStorage.setItem("authToken", token); // 토큰을 로컬 스토리지에 저장
        login(res, token);
      }

      navigate("/purchase");
    } else {
      setLoginModalOpen(true);
    }
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    const res = await AxiosApi.memberSignup(
      signUpData.id,
      signUpData.password,
      signUpData.email,
      signUpData.phone
    );
    if (res.data === true) {
      navigate("/login");
    } else {
      setLoginModalOpen(true);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Form $isRightPanelActive={isRightPanelActive}>
          {!isRightPanelActive ? (
            <>
              <h1>Sign In</h1>
              <SocialLinks>
                <SocialLink>
                  <img
                    src={socialImage}
                    alt="cacao"
                    style={{ width: "100%", height: "100%" }}
                    onMouseEnter={socialHover}
                    onMouseLeave={socialLeave}
                  />
                </SocialLink>
              </SocialLinks>
              <span>or use your account</span>
              <Input
                type="text"
                placeholder="ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={inputPw}
                onChange={(e) => setInputPwd(e.target.value)}
              />
              <Button className="form_btn" onClick={loginSubmit}>
                Sign In
              </Button>
              <Modal open={loginModalOpen} close={closeModal} header="error">
                아이디와 패스워드를 확인해주세요.
              </Modal>
            </>
          ) : (
            <>
              <h1>Create Account</h1>
              <Input
                type="text"
                name="id"
                placeholder="Name"
                value={signUpData.id}
                onChange={textChange}
              />
              {dataErrors.id && <ErrorText>{dataErrors.id}</ErrorText>}
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={signUpData.password}
                onChange={textChange}
              />
              {dataErrors.password && (
                <ErrorText>{dataErrors.password}</ErrorText>
              )}
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={signUpData.email}
                disabled={isVerified}
                onChange={textChange}
              />
              {dataErrors.email && <ErrorText>{dataErrors.email}</ErrorText>}
              <EmailVerificationComponent onVerification={verifyEmail} />
              <Input
                type="text"
                name="phone"
                placeholder="Phone"
                value={signUpData.phone}
                onChange={textChange}
              />
              {dataErrors.phone && <ErrorText>{dataErrors.phone}</ErrorText>}
              <Button disabled={isSubmitDisabled} onClick={signupSubmit}>
                Sign Up
              </Button>
            </>
          )}
        </Form>
        {isRightPanelActive ? (
          <OverlayLeft $isRightPanelActive={isRightPanelActive}>
            <h1>Welcome Back</h1>
            <p>
              To keep connected with us, please login with your personal info
            </p>
            <OverlayButton onClick={toggleRightPanel}>Sign In</OverlayButton>
          </OverlayLeft>
        ) : (
          <OverlayRight $isRightPanelActive={isRightPanelActive}>
            <h1>Hello, Friend</h1>
            <p>Enter your personal details and start a journey with us</p>
            <OverlayButton onClick={toggleRightPanel}>Sign Up</OverlayButton>
          </OverlayRight>
        )}
      </Container>
    </Wrapper>
  );
};

export default Login;
