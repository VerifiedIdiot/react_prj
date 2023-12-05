// 장바구니 페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useUser } from "../contexts/Context";

const CartPageContainer = styled.div`
  padding: 0 30px 70px 30px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    border-bottom: 2px solid #7d8e9e;
  }
`;

const BookCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;

  .book-image {
    width: 160px;
    height: 200px;
    margin-right: 10px;
  }

  .book-title {
    font-weight: bold;
    margin-right: 10px;
  }

  .book-info {
    flex: 1;
  }

  .remove-button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
`;
const CartPage = ({}) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const { user, checkLoginStatus } = useUser();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);
  useEffect(() => {
    checkLoginStatus();
  }, []);
  useEffect(() => {
    console.log(cartItems); // 상태 업데이트 후의 장바구니 항목 출력
  }, [cartItems]);
  const checkboxChange = (bookId) => {
    if (checkedItems.includes(bookId)) {
      setCheckedItems(checkedItems.filter((id) => id !== bookId));
    } else {
      setCheckedItems([...checkedItems, bookId]);
    }
    console.log(bookId);
  };
  const isChecked = (bookId) => checkedItems.includes(bookId);
  const purchaseSelected = async () => {
    try {
      const response = await AxiosApi.purchaseBooks(user.id, checkedItems);
      console.log(checkedItems);
      console.log(response); // 서버로부터의 응답 출력
      if (response.status === 200 && response.data) {
        fetchCartItems(); // 책을 구매한 후 장바구니 아이템 목록을 다시 불러옴
        setCheckedItems([]); // 체크된 아이템 초기화
      } else {
        console.error("책 구매 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await AxiosApi.getCartItems(user.id);
      console.log(response.data); // 응답 출력
      if (response.status === 200) {
        const cartItemsWithBookInfo = await Promise.all(
          // 병렬구문처리할떄 쓰는 Promise
          response.data.map(async (item) => {
            const bookResponse = await AxiosApi.getBookInfo(item.bookId);
            return {
              ...item,
              bookInfo: bookResponse.data,
            };
          })
        );
        setCartItems(cartItemsWithBookInfo);
        console.log(cartItems); // 상태 업데이트 후의 cartItems 출력
      } else {
        console.error("짱바구니 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };
  const purchaseAll = async () => {
    try {
      const bookIds = cartItems.map((item) => item.bookId); // 장바구니에 있는 모든 책의 ID를 가져옴
      const response = await AxiosApi.purchaseBooks(user.id, bookIds);
      console.log(response); // 서버로부터의 응답 출력
      if (response.status === 200) {
        fetchCartItems(); // 책을 구매한 후 장바구니 아이템 목록을 다시 불러옴
      } else {
        console.error("책 구매 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };
  const removeFromCart = async (bookId) => {
    try {
      const response = await AxiosApi.removeFromCart(user.id, bookId);
      console.log(response); // 서버로부터의 응답 출력
      if (response.status === 200) {
        fetchCartItems(); // 장바구니 아이템 제거 후 장바구니 아이템 목록을 다시 불러옴
      } else {
        console.error("장바구니 아이템 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };
  return (
    <CartPageContainer>
      <h2>장바구니</h2>
      {cartItems.map((item) => (
        <BookCard key={item.bookId}>
          <input
            type="checkbox"
            checked={isChecked(item.bookId)}
            onChange={() => checkboxChange(item.bookId)}
          />
          <img
            className="book-image"
            src={item.bookInfo.image_url}
            alt={item.bookInfo.title}
          />
          <div className="book-info">
            <p className="book-title">{item.bookInfo.title}</p>
            <p className="book-author">{item.bookInfo.author}</p>
            <p className="book-price">{item.bookInfo.price}원</p>
          </div>
          <button
            className="remove-button"
            onClick={() => removeFromCart(item.bookId)}
          >
            제거
          </button>
        </BookCard>
      ))}
      <button onClick={purchaseSelected}>선택 구매</button>
    </CartPageContainer>
  );
};

export default CartPage;
