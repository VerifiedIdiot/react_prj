import React from "react";
import styled from "styled-components";

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
  z-index: 999; // 모달이 다른 내용 위에 나타나도록 z-index 설정
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
`;

const CartModal = ({ isOpen, closeModal, onConfirm, action }) => {
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
            <h2>
              책 {action === "add" ? "장바구니에 담기" : "장바구니에서 제거"}
            </h2>
            <p>
              이 책을{" "}
              {action === "add"
                ? "장바구니에 담으시겠습니까?"
                : "장바구니에서 제거하시겠습니까?"}
            </p>
            <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
            <ConfirmButton onClick={closeModal}>취소</ConfirmButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default CartModal;
