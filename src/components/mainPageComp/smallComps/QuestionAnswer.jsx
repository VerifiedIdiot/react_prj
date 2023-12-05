import React, { useState } from "react";
import styled from "styled-components";

const QnAContainer = styled.div`
  background-color: var(--black);
  padding: 20px;
  margin: auto;
  width: 100%; // 화면 전체 폭을 사용
  max-width: 800px; // 최대 폭 제한
  border-radius: 10px;
  font-size: 1rem; // 기본 폰트 크기 설정

  @media (max-width: 1500px) {
    font-size: 0.9rem; // 화면 크기에 따라 폰트 크기 줄임
  }

  @media (max-width: 1060px) {
    font-size: 0.8rem;
  }

  @media (max-width: 760px) {
    font-size: 0.7rem;
  }
  width: 100%;
  border-radius: 10px;
  
`;

const Header = styled.h2`
  color: var(--white);
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--dark-gray); // 질문에 대한 배경색 변경
  color: var(--white);
  margin-bottom: 0.5em; // 질문 사이의 여백 설정
  padding: 0.5em 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const Arrow = styled.span`
// 화살표 스타일 유지
`;

const Answer = styled.div`
  background-color: var(--black); // 배경색 일치
  color: var(--gray);
  margin-bottom: 1em; // 답변 사이의 여백 설정
  padding: ${({ $isOpen }) => ($isOpen ? '0.5em 1em' : '0')};
  border-radius: 5px;
  transition: max-height 0.5s ease, padding 0.5s ease;

  max-height: ${({ $isOpen }) => ($isOpen ? '100%' : '0')}; // 높이를 퍼센트로 설정하여 자연스러운 전환 효과 제공
  overflow: hidden;
  color: var(--white);
`;


const AnswerContent = styled.div`
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const QuestionAnswer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      Q: "안쓰면 정말 환불해 주나요?",
      A: "물론입니다. 결제 후 콘텐츠 다운로드 및 열람을 하지 않으셨다면 전액 환불해 드리고 있어요.",
    },
    {
      Q: "어떤 파일 형식들을 지원하나요?",
      A: "epub, pdf, txt 형식의 뷰어들을 지원하고 있습니다.",
    },
    {
      Q: "구매 후 평생 사용할 수 있나요?",
      A: "네, 회원가입을 하신 후 구매를 하시면 마이페이지에서 영구적으로 열람할 수 있습니다.",
    },
    {
      Q: "어떤 기기에서 사용할 수 있나요?",
      A: "스마트폰 / 태블릿 : iOS13, Android 6 이상 지원\nPC : MAC Yosemite, Window 10 이상 지원\nE-ink : Android 4.4 이상 지원합니다.",
    },
  ];

  return (
    <QnAContainer>
      <Header>자주 묻는 질문</Header>
      {questions.map((item, index) => (
        <div key={index}>
          <Question
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.Q}
            <Arrow>{openIndex === index ? "▲" : "▼"}</Arrow>
          </Question>
          <Answer $isOpen={openIndex === index}>
            <AnswerContent $isOpen={openIndex === index}>
              {item.A}
            </AnswerContent>
          </Answer>
        </div>
      ))}
    </QnAContainer>
  );
};

export default QuestionAnswer;
