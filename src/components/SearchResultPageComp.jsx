import React, { useState } from "react";
import { SearchResultBookModal } from "../utils/SearchResultBookModal";
import styled from "styled-components";

// 검색 결과
const Card = styled.div`
  border-radius: 1rem;
  /* padding: 0.5rem; */
  margin-bottom: 10px;
  border: 1px solid black;
  transition: 0.5s;
  text-align: center;
  position: relative;
  max-height: 400px;

  &:hover {
    transform: scale(0.9);
  }

  img {
    width: 100%;
    height: 40vh;
    max-height: 250px;
    border-radius: 1rem 1rem 0 0;
  }

  /* 책 사진 아래 */
  .bottom {
    display: flex;
    flex-direction: column;

    /* 책 제목 */
    .title {
      font-size: 1.5em;
      margin-bottom: 32px;
    }

    /* 가격 */
    .amount {
      position: absolute;
      bottom: 10px;
      left: 10px;
      right: 10px;
      font-size: 1em;
      font-weight: bold;
      padding: 0.2rem;
    }
  }
`;

export const SearchResultPageComp = ({ book = [] }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState(null);

  return (
    <>
      {book.map((item) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;

        if (thumbnail !== undefined && amount !== undefined) {
          return (
            <Card
              key={item.id}
              onClick={() => {
                setShow(true);
                setItem(item);
              }}
            >
              <img src={thumbnail} alt="" />
              <div className="bottom">
                <h3 className="title">{item.volumeInfo.title}</h3>
                <p className="amount">{amount} 원</p>
              </div>
            </Card>
          );
        }

        return null;
      })}

      <SearchResultBookModal
        show={show}
        item={bookItem}
        onClose={() => setShow(false)}
      />
    </>
  );
};
