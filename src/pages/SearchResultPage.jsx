import { useState, useEffect } from "react";
import { SearchResultPageComp } from "../components/SearchResultPageComp";
import styled from "styled-components";
import { StyledButton } from "../globalStyle/StyledButton";
import { MiddleOrderBox } from "../globalStyle/MiddleOrderBox";
import { StyledSearch } from "../globalStyle/StyledSearch";

const Container = styled.div`
  width: 65%;
  margin: 0 auto;
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
  grid-gap: 20px;
  box-sizing: border-box;
`;

export const SearchResultPage = () => {
  const [bookData, setBookData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      const searchResult = localStorage.getItem("searchResult");
      if (searchResult) {
        setBookData(JSON.parse(searchResult).items);
      }
    };

    handleStorageChange();
  }, []);

  const nextPage = () => {
    if (bookData.length > startIndex + 10) {
      setStartIndex(startIndex + 10); // 다음 페이지로 이동
    } else {
      alert("더 이상 가져올 자료가 없습니다."); // 경고 메시지를 표시
    }
  };

  const prevPage = () => {
    if (startIndex >= 10) {
      setStartIndex(startIndex - 10); // 이전 페이지로 이동
    } else {
      alert("더 이상 가져올 자료가 없습니다."); // 경고 메시지를 표시
    }
  };

  return (
    <>
      <StyledSearch></StyledSearch>
      <Container>
        <SearchResultPageComp
          book={bookData.slice(startIndex, startIndex + 10)}
        />
      </Container>
      <MiddleOrderBox>
        <StyledButton
          onClick={prevPage}
          value="이전"
          width="50px"
          height="50px"
        ></StyledButton>
        <div style={{ margin: "5px" }}></div>
        <StyledButton
          onClick={nextPage}
          value="다음"
          width="50px"
          height="50px"
        ></StyledButton>
      </MiddleOrderBox>
    </>
  );
};
