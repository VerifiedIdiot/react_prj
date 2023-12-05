import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
`;

const StarRating = styled.div`
  display: flex;
  gap: 10px;
`;

const Star = styled(FaStar)`
  font-size: 28px;
  cursor: pointer;
`;

const ReviewModal = ({ isOpen, closeModal, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const reviewTextChange = (e) => {
    setReviewText(e.target.value);
  };
  const ratingChange = (value) => {
    setRating(value);
  };

  const mouseEnter = (value) => {
    setHoverRating(value);
  };

  const mouseLeave = () => {
    setHoverRating(0);
  };

  const submitReview = () => {
    if (!reviewText.trim()) {
      // 텍스트가 비어 있는지 확인
      alert("리뷰 내용을 입력해주세요."); // 알림 표시
      return;
    }
    onSubmit({ rating, reviewText });
    closeModal();
  };
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(); // 모달 바깥 부분 클릭 시 모달 닫기
    }
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper onClick={modalClick}>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>리뷰 작성</h2>
            <div>
              <label>평점:</label>
              <StarRating>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    onClick={() => ratingChange(value)}
                    onMouseEnter={() => mouseEnter(value)}
                    onMouseLeave={mouseLeave}
                    color={
                      value <= (hoverRating || rating) ? "#AAB9FF" : "gray"
                    }
                  />
                ))}
              </StarRating>
            </div>
            <div>
              <label htmlFor="reviewText">리뷰 내용:</label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={reviewTextChange}
                required
              />
            </div>
            <button onClick={submitReview}>리뷰 제출</button>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default ReviewModal;
