import React from "react";
import styled from "styled-components";
import { StyledButton } from "../globalStyle/StyledButton";
import { useEffect } from "react";
import { useUser } from "../contexts/Context"; // 로그인 여부 검사 전역 관리
import { BookAxiosApi } from "../api/BookAxiosApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Overlay = styled.div`
  min-height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  /* 바깥쪽 불투명도 */
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const OverlayInner = styled.div`
  background: white;
  width: 700px;
  height: 550px;
  padding: 1.5rem;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 1.3rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 17px;
`;

const InnerBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const InnerBoxImg = styled.img`
  margin-right: 20px;
  width: 150px;
  height: 200px;
`;

const InnerBoxH3 = styled.h3`
  margin-top: 10px;
  color: green;
`;

const InnerBoxH4 = styled.h4`
  color: blue;
`;

const Description = styled.div`
  margin-top: 2rem;
  text-align: justify;
  font-size: 13px;
`;

export const SearchResultBookModal = ({ show, item, onClose }) => {
  // useUser에서 isLoggedin 상태와 checkLoginStatus 함수를 호출
  const { isLoggedin, checkLoginStatus } = useUser();
  const [book, setBook] = useState(null);

  useEffect(() => {
    checkLoginStatus(); // 로그인 상태 확인
  }, []);

  const navigate = useNavigate();

  // 상태 확인
  useEffect(() => {
    const checkPurchase = async () => {
      if (book && book.id && isLoggedin) {
        const userId = await localStorage.getItem("userId");
        const responseBuy = await BookAxiosApi.isBookBought(userId, book.id);

        if (responseBuy.data) {
          alert("뷰어 페이지로 이동합니다.");
          navigate("/ViewerPage", { state: { contentUrl: book.contentUrl } });
        } else {
          alert("해당 책을 아직 구매하지 않았습니다.");
        }
      }
    };

    if (book && book.contentUrl) {
      checkPurchase();
    }
  }, [book, isLoggedin]);

  if (!show) {
    return null;
  }

  let thumbnail =
    item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;

  // check 함수에서는 책 정보를 가져오는 로직만 정의
  const check = async () => {
    // 로그인 O
    if (isLoggedin === true) {
      try {
        // 책 제목과 작가를 통해 데이터 베이스에 책 존재 여부 확인
        const response = await BookAxiosApi.isBookexist(
          item.volumeInfo.title,
          item.volumeInfo.authors[0]
        );

        setBook(response.data); // API로부터 받은 책 정보를 상태에 저장

        if (response.data && response.data.id) {
          alert("해당 책이 데이터베이스에 존재합니다.");
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert("죄송합니다. 아직 데이터베이스에 존재하지 않는 책입니다.");
          return;
        }

        console.error("서버에 요청을 보내는 중 에러가 발생했습니다:", error);
      }
    } else {
      // 로그인 X
      alert("로그인 해주세요.");
    }
  };

  return (
    <Overlay>
      <OverlayInner>
        <CloseButton onClick={onClose}>
          <i className="fas fa-times"></i>X
        </CloseButton>
        <InnerBox>
          <InnerBoxImg src={thumbnail} alt="" />
          <div className="info">
            <h1>{item.volumeInfo.title}</h1>
            <InnerBoxH3>{item.volumeInfo.authors}</InnerBoxH3>
            <InnerBoxH4>
              {item.volumeInfo.publisher}
              <span>{item.volumeInfo.publishedDate}</span>
            </InnerBoxH4>
            <br />
            <a href={item.volumeInfo.previewLink}>
              <StyledButton
                value="미리 보기"
                width="100px"
                height="50px"
              ></StyledButton>
            </a>
            <StyledButton
              value="뷰어 열기"
              width="100px"
              height="50px"
              onClick={check}
            ></StyledButton>
          </div>
        </InnerBox>
        <Description>{item.volumeInfo.description}</Description>
      </OverlayInner>
    </Overlay>
  );
};
