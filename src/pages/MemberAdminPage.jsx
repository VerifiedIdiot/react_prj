import React, { useEffect, useState } from "react";
import { Th } from "../globalStyle/StyledTable";
import { Td } from "../globalStyle/StyledTable";
import { Table } from "../globalStyle/StyledTable";
import { MiddleOrderBox } from "../globalStyle/MiddleOrderBox";
import { Input } from "../globalStyle/StyledTable";
import { TableBox } from "../globalStyle/StyledTable";
import { storage } from "../api/firebase";
import { StyledTd } from "../globalStyle/StyledTable";
import { StyledButton } from "../globalStyle/StyledButton";
import { MemberAdminApi } from "../api/MemberAdminApi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StyledTitle } from "../globalStyle/StyledTitle";

export const MemberAdminPage = () => {
  // 사용자 권한 정보 가져오기
  const navigateLocation = useLocation();
  const auth = navigateLocation.state ? navigateLocation.state.userAuth : null;
  console.log("회원 관리 페이지, 권한 : " + auth);

  const navigate = useNavigate();
  if (auth !== 1) {
    // 관리자 권한이 없다면,
    navigate("/"); // 자동으로 다시 메인 페이지로 이동하게
  }

  const [memberList, setMemberList] = useState([]);
  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    tel: "",
    cash: "",
    auth: "",
    profileUrl: "",
  });
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  // 책 전체 목록 가져오기
  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const response = await MemberAdminApi.getMember();
        setMemberList(response.data);
      } catch (error) {
        console.error("서버에 데이터를 가져오는 데 실패했습니다.", error);
      }
    };
    fetchMemberList();
  }, []);

  // 추가 (1)
  const handleInputChange = (e) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };
  // 추가 (2)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberToSave = {
      ...newMember, // 객체 리터럴 : newMember과 동일한 속성을 가진 새로운 객체 반환
      profileUrl: url,
    };
    try {
      const response = await MemberAdminApi.addMember(memberToSave);
      setMemberList([...memberList, response.data]);
    } catch (error) {
      console.error("서버에 회원을 추가하는 데 실패했습니다.", error);
    } finally {
      // 입력창 초기화
      setNewMember({
        id: "",
        name: "",
        email: "",
        password: "",
        tel: "",
        cash: "",
        auth: "",
        profileUrl: "",
      });
    }
  };

  // 삭제
  const deleteMember = async (id) => {
    if (window.confirm("정말로 이 행을 삭제하시겠습니까?")) {
      try {
        await MemberAdminApi.deleteMember(id);
        setMemberList(memberList.filter((member) => member.id !== id));
      } catch (error) {
        console.error("서버에서 회원을 삭제하는 데 실패했습니다.", error);
      }
    }
  };

  // 수정
  const selectMember = (member) => {
    // 수정할 행을 클릭하면, 해당 행의 정보가 호출되고
    console.log(member); // selectMember 함수 작동 확인
    setNewMember(member);
  };

  // 수정
  const updateMember = async (e) => {
    e.preventDefault();
    try {
      const response = await MemberAdminApi.updateMember(
        newMember.id,
        newMember
      );
      if (response.status === 200 || response.status === 201) {
        setMemberList(
          memberList.map((member) =>
            member.id === newMember.id ? response.data : member
          )
        );
      } else {
        console.error(
          "서버에서 회원 정보를 수정하는 데 실패했습니다.",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("서버에서 회원 정보를 수정하는 데 실패했습니다.", error);
    } finally {
      setNewMember({
        id: "",
        name: "",
        email: "",
        password: "",
        tel: "",
        cash: "",
        auth: "",
        profileUrl: "",
      });
    }
  };

  // firebase (1)
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  // firebase (2)
  const handleUploadClick = async () => {
    // 파이어 베이스와 연동
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    try {
      // 파일 업로드 완료까지 대기
      await fileRef.put(file);
      // 업로드 완료시 파일의 주소 호출
      const url = await fileRef.getDownloadURL();
      console.log("저장 경로 확인 : " + url);
      setUrl(url);
    } catch (error) {
      console.error("파일 업로드에 실패했습니다.", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MiddleOrderBox>
          <TableBox>
            <StyledTitle>회원 관리 페이지</StyledTitle>
            <Table>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>EMAIL</Th>
                  <Th>PASSWORD</Th>
                  <Th>TEL</Th>
                  <Th>CASH</Th>
                  <Th>AUTH</Th>
                  <Th>PROFILE_URL</Th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member, index) => (
                  <tr
                    key={index}
                    onClick={() => selectMember(member)}
                    onDoubleClick={() => deleteMember(member.id)}
                  >
                    <Td>{member.id}</Td>
                    <Td>{member.name}</Td>
                    <Td>{member.email}</Td>
                    <Td>{member.password}</Td>
                    <Td>{member.tel}</Td>
                    <Td>{member.cash}</Td>
                    <Td>{member.auth}</Td>
                    <Td>{member.profileUrl}</Td>
                  </tr>
                ))}
                <tr>
                  <StyledTd>
                    <Input
                      type="text"
                      name="id"
                      value={newMember.id}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="name"
                      value={newMember.name}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="email"
                      value={newMember.email}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="password"
                      value={newMember.password}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="tel"
                      value={newMember.tel}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="cash"
                      value={newMember.cash}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="auth"
                      value="0"
                      onChange={handleInputChange}
                      disabled={true}
                    />
                  </StyledTd>

                  <StyledTd>
                    <div>
                      <input type="file" onChange={handleFileInputChange} />
                      <button type="button" onClick={handleUploadClick}>
                        Upload
                      </button>
                    </div>

                    {url && <img src={url} alt="uploaded" />}
                    <p>{url}</p>
                  </StyledTd>
                </tr>
              </tbody>
            </Table>
          </TableBox>
        </MiddleOrderBox>
        <br />
        <br />
        <MiddleOrderBox>
          <StyledButton
            type="submit"
            value="추가"
            width="100px"
            height="50px"
          ></StyledButton>
          <StyledButton
            onClick={updateMember}
            value="수정"
            width="100px"
            height="50px"
          ></StyledButton>
        </MiddleOrderBox>
      </form>
      <br />
      <br />
    </>
  );
};
