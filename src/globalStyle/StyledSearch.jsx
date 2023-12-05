import styled from "styled-components";
import { StyledButton } from "./StyledButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 이미지
import { FaSearch, FaMicrophone } from "react-icons/fa";

// 검색바
const SearchBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchMode = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 70%;
  height: 40px;
  margin: 20px;
  border: 1.5px solid #c9cacc;
  border-radius: 24px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  background: white; // 배경색을 흰색으로 설정

  @media (max-width: 600px) {
    height: 30px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;

  padding: 0 10px; // 아이콘과 겹치지 않는 적절한 패딩을 설정
  background: white; // 배경색을 흰색으로 설정

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const SearchIcon = styled.div`
  margin-left: 3%;
  cursor: pointer;
  svg {
    color: #757575;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: var(--black);
    }
  }
`;

const MicIcon = styled.div`
  margin-right: 3%;
  cursor: pointer;
  svg {
    color: #757575;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: var(--black);
    }
  }
`;

export const StyledSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchBook = async () => {
    if (!search) {
      return;
    }

    const result = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: search,
          key: "AIzaSyBZeJKPL9ccyGsvYo3_JA5OHw6ohKwGGgw", // 보안에 문제
          maxResults: 20, // 한 페이지당 10개의 결과를 가져오도록 설정
        },
      }
    );

    // 검색 결과를 local storage에 저장합니다.
    localStorage.setItem("searchResult", JSON.stringify(result.data));

    // 검색 결과 페이지로 이동합니다.
    navigate("/SearchResultPage");

    // 검색 결과창에서 새로운 검색어를 입력했을때를 위한 처리
    window.location.reload(); // 페이지 새로고침
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchBook();
    }
  };

  return (
    <>
      <SearchBox>
        {/* <SearchLogo src={logo} alt="logo" /> */}
        <SearchMode>
          <SearchIcon>
            <FaSearch size={15} />
          </SearchIcon>
          <Input
            type="text"
            placeholder="원하는 책을 입력해 주세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <MicIcon>
            <FaMicrophone size={15} />
          </MicIcon>
        </SearchMode>
        <StyledButton
          onClick={searchBook}
          value="검색"
          width="80px"
          height="40px"
          smallWidth="60px"
          smallHeight="30px"
          breakpoint="600px"></StyledButton>
      </SearchBox>
    </>
  );
};
