import styled from "styled-components";
import CartModal from "../utils/CartModal";
import PurchaseModal from "../utils/PurchaseModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookPurchaseBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column; /* 컨텐츠를 세로로 배치 */
  padding: 2rem;

  h2 {
    width: 100%; /* Full width */
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    border-bottom: 2px solid #7d8e9e;
  }

  .contents {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 800px;
    .coverimg {
      flex: 0 0 300px;
      margin-right: 1rem;
      img {
        display: block;
        width: 100%;
        max-width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .info {
      flex: 1;
      p {
        margin: 0;
        line-height: 1.5;
        margin-top: 0.5rem;
      }
      .buttons {
        margin-top: 1em;

        button {
          margin-right: 1em;
        }
      }
    }
  }
`;

const BookPurchase = ({
  info,
  isLoggedIn,
  isInCart,
  isPurchased,
  onAddToCart,
  onPurchase,
  bookUrl,
}) => {
  const { title, author, publisher, price, description, imageUrl } = info;
  const navigate = useNavigate();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const openPurchaseModal = () => {
    setPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModalOpen(false);
  };

  const addToCart = () => {
    openCartModal();
  };

  const purchaseBook = () => {
    openPurchaseModal();
  };

  const goToViewerPage = () => {
    navigate("/viewerpage", { state: { contentUrl: bookUrl } });
  };

  return (
    <BookPurchaseBlock>
      <h2>책 정보</h2>
      <div className="contents">
        <div className="coverimg">
          {imageUrl && <img src={imageUrl} alt="CoverImage" />}
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>저자: {author}</p>
          <p>출판사: {publisher}</p>
          <p>가격: {price} 원</p>
          <p>{description}</p>
          <div className="buttons">
            {isPurchased ? (
              <button onClick={goToViewerPage}>뷰어 열기</button>
            ) : (
              <>
                {isLoggedIn ? (
                  <>
                    <button onClick={addToCart}>
                      {isInCart ? "장바구니에서 제거" : "장바구니에 담기"}
                    </button>
                    <button onClick={purchaseBook}>구매하기</button>
                  </>
                ) : (
                  <button>로그인이 필요합니다</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CartModal
        isOpen={cartModalOpen}
        closeModal={closeCartModal}
        onConfirm={() => {
          onAddToCart();
          closeCartModal();
        }}
        action={isInCart ? "remove" : "add"}
      />
      <PurchaseModal
        isOpen={purchaseModalOpen}
        closeModal={closePurchaseModal}
        onConfirm={() => {
          onPurchase();
          closePurchaseModal();
        }}
        action="purchase"
      />
    </BookPurchaseBlock>
  );
};

export default BookPurchase;
