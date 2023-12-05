import { useState, useReducer } from "react";
import { reducer } from "../pages/MyPage";
import AxiosApi from "../api/MyPageAxiosApi";
import { InputBox, InputTag, InpuTitle, MyPageButton } from "./MyPageComp";
import { StyledButton } from "../globalStyle/StyledButton";
import { useNavigate } from "react-router-dom/dist";
import sha256 from "sha256";
import Modal from "../utils/LoginModal";

const MyPagePW = () => {
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
  };
  // 비밀번호 제약 조건
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
  };

  // 기본 이름 아이디 등 입력하고 난후 입력 조건이 적절하면 등장하는 정보 수정 입력창
  // 체크
  const [checkName, setCheckName] = useState(false);
  const [checkId, setCheckId] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  // 백엔드 이후 체크된 정보를 토대로 true or false
  const [checkedInfo, setCheckedInfo] = useState(false);
  const onClickCheck = async () => {
    const checked = await AxiosApi.memberCheck(
      data.name,
      data.id,
      data.pw,
      data.email
    );
    console.log(checked);
    console.log("온 클릭 체크 이후 결과가 잘 찍혔습니다.");
    console.log(data.name, data.id, data.pw, data.email);
    if (checked.data === true) {
      console.log("체크가 true입니다.");
      setCheckedInfo(true);
      setOldIsVisible(false);
      setNewIsVisible(true);
    } else {
      console.log("체크가 false입니다.");
      setCheckedInfo(false);
    }
  };

  // 이름 변경
  const [newName, setNewName] = useState("");
  const [msg, setMsg] = useState("");
  const onModifyName = (e) => {
    setMsg("");
    if (
      e.target.value.length >= 2 &&
      !/[0-9!@#$%^&*(),.?":{}|<>]/.test(e.target.value)
    ) {
      setMsg("유효합니다.");
      setNewName(e.target.value);
      console.log(newName);
      setCheckTrue(true);
    } else {
      setMsg("유효하지 않습니다.");
      setCheckTrue(false);
    }
  };

  // 비밀번호 변경 클릭 함수
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickModifyName = async () => {
    try {
      const chName = await AxiosApi.modifyName(data.name, newName);
      console.log("newName 값:", chName); // newId의 값을 확인
      alert("회원 정보가 변경되었습니다.");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("이름 변경 중 오류 발생:", error);
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
              회원 정보 변경
            </h1>
            <p>
              회원님의 이름을 변경합니다. 회원 정보 확인을 위해서 회원의 이름,
              아이디, 비밀번호, 이메일을 입력하세요.
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
              <p>새로운 회원 이름을 입력하시오.</p>
              <InputBox
                width="60%"
                height="10%"
                placeholder="NEW NAME"
                type="text"
                onChange={onModifyName}
              />
              <p>{msg}</p>
              {checkTrue && (
                <StyledButton
                  value="회원 이름 변경"
                  width="40%"
                  height="7%"
                  onClick={onClickModifyName}
                ></StyledButton>
              )}
              <Modal open={rst} close={closeModal}>
                회원 이름이 변경되었습니다.
              </Modal>
            </>
          )}
        </InputTag>
      )}
    </>
  );
};

export default MyPagePW;
