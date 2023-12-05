import { useState, useReducer } from "react";
import { reducer } from "../pages/MyPage";
import { InputBox, InputTag, InpuTitle, MyPageButton } from "./MyPageComp";
import MyPageAxiosApi from "../api/MyPageAxiosApi";
import { StyledButton } from "../globalStyle/StyledButton";
import Modal from "../utils/LoginModal";
import sha256 from "sha256";
import { useNavigate } from "react-router-dom";

const MyPageDELETE = () => {
  const navigate = useNavigate();

  const [data, dispatch] = useReducer(reducer, {
    name: "",
    id: "",
    pw: "",
    email: "",
  });
  //모달창 제어
  const [rst, setRst] = useState(false);
  const closeModal = () => {
    setRst(false);
    navigate("/");
    window.location.reload();
  };

  const [msgName, setNameMsg] = useState("이름 형식에 맞추어 입력하시오.");
  const [msgId, setIdMsg] = useState("아이디 형식에 맞추어 입력하시오.");
  const [msgPw, setPwMsg] = useState("비밀번호 형식에 맞추어 입력하시오.");
  const [msgEmail, setEmailMsg] = useState("이메일 형식에 맞추어 입력하시오.");
  const allChecksTrue = () => {
    return checkName && checkId && checkPw && checkEmail;
  };
  // 이름 제약 조건
  const onChangeName = (e) => {
    const inputName = e.target.value;
    if (inputName.length >= 2 && !/[0-9!@#$%^&*(),.?":{}|<>]/.test(inputName)) {
      dispatch({ type: "Name", value: inputName });
      setNameMsg("유효합니다.");
      setCheckName(true);
    } else {
      dispatch({ type: "Name", value: false });
      setNameMsg("유효하지 않습니다.");
      setCheckName(false);
    }
    console.log(checkName);
  };
  // 아이디 제약 조건
  const onChangeId = (e) => {
    const inputId = e.target.value;
    if (/^[a-zA-Z0-9]{8,20}$/.test(inputId)) {
      dispatch({ type: "Id", value: inputId });
      setIdMsg("유효합니다.");
      setCheckId(true);
    } else {
      dispatch({ type: "Id", value: false });
      setIdMsg("유효하지 않습니다.");
      setCheckId(false);
    }
    console.log(checkId);
  };
  // 비밀번호 제약 조건
  const onChangePw = (e) => {
    const inputPw = e.target.value;
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        inputPw
      )
    ) {
      const hashedPassword = sha256(inputPw).toString();
      dispatch({ type: "Pw", value: hashedPassword });
      setPwMsg("유효합니다.");
      setCheckPw(true);
      console.log(hashedPassword);
    } else {
      dispatch({ type: "Pw", value: false });
      setPwMsg("유효하지 않습니다.");
      setCheckPw(false);
    }
  };
  // 이메일 제약 조건
  const onChangeEmail = (e) => {
    const inputEmail = e.target.value;
    if (/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(inputEmail)) {
      dispatch({ type: "Email", value: inputEmail });
      setEmailMsg("유효합니다.");
      setCheckEmail(true);
    } else {
      dispatch({ type: "Email", value: false });
      setEmailMsg("유효하지 않습니다.");
      setCheckEmail(false);
    }
    console.log(checkEmail);
  };

  // 기본 이름 아이디 등 입력하고 난후 입력 조건이 적절하면 등장하는 정보 수정 입력창
  const [checkName, setCheckName] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  // 백엔드 이후 체크된 정보를 토대로 true or false
  const [checkedInfo, setCheckedInfo] = useState(false);
  const onClickCheck = async () => {
    await MyPageAxiosApi.memberCheck(data.name, data.id, data.pw, data.email);
    console.log(data.name, data.id, data.pw, data.email);
    setCheckedInfo(true);
    setOldIsVisible(false);
    setNewIsVisible(true);
  };

  // 아이디 삭제 제약 조건
  const [delId, setDelId] = useState("");
  const [msg, setMsg] = useState("");
  const onDeleteId = (e) => {
    setMsg("");
    if (/^[a-zA-Z0-9]{8,20}$/.test(e.target.value)) {
      setMsg("유효합니다.");
      setDelId(e.target.value);
      setCheckTrue(true);
    } else {
      setMsg("유효하지 않습니다.");
      setCheckTrue(false);
    }
    console.log("제약 조건으로 입력된 삭제될 아이디" + delId);
  };
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickDeleteId = async () => {
    try {
      const response = await MyPageAxiosApi.memberDel(delId);
      console.log("del :" + delId);
      console.log("del의 값:", response.data);
      if (response.data === true) {
        setCheckTrue(true);
        setRst(true);
      } else {
        setCheckTrue(false);
        console.log("삭제되지 못했습니다.");
        alert("삭제되지 못했습니다");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  // 정보 제출 이후에 조건이 달성되면 해당 페이지 사라지고 다음 페이지 등장
  const [isOldVisible, setOldIsVisible] = useState(true);
  const [isNewVisible, setNewIsVisible] = useState(false);

  return (
    <>
      {isOldVisible && (
        <>
          <InputTag>
            <h1
              style={{
                border: "bold",
                fontSize: "1.5rem",
                borderBottom: "3px solid black",
              }}
            >
              회원 탈퇴
            </h1>
            <p>
              회원을 탈퇴합니다. 회원 정보 확인을 위해 이름, 아이디, 비밀번호,
              이메일을 입력하세요.
            </p>

            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="이름"
                type="text"
                onChange={onChangeName}
              />
            </InpuTitle>
            <p>{msgName}</p>
            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="아이디"
                type="text"
                onChange={onChangeId}
              />
            </InpuTitle>
            <p>{msgId}</p>
            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="비밀번호"
                type="password"
                onChange={onChangePw}
              />
            </InpuTitle>
            <p>{msgPw}</p>
            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="이메일"
                type="text"
                onChange={onChangeEmail}
              />
            </InpuTitle>
            <p>{msgEmail}</p>

            <MyPageButton onClick={onClickCheck} disabled={!allChecksTrue()}>
              정보 확인
            </MyPageButton>
          </InputTag>
        </>
      )}

      {isNewVisible && (
        <InputTag height="30%">
          {checkedInfo && (
            <>
              <p>회원 탈퇴할 아이디를 입력하세요.</p>
              <InputBox
                width="60%"
                height="10%"
                placeholder="ID"
                type="text"
                onChange={onDeleteId}
              />
              <p>{msg}</p>
              {checkTrue && (
                <StyledButton
                  value="비밀 번호 변경"
                  width="40%"
                  height="7%"
                  onClick={onClickDeleteId}
                ></StyledButton>
              )}
              <Modal open={rst} close={closeModal}>
                회원을 탈퇴하셨습니다..
              </Modal>
            </>
          )}
        </InputTag>
      )}
    </>
  );
};

export default MyPageDELETE;
