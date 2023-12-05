import React, { createContext, useState, useEffect, useContext } from "react";
import { BookAxiosApi } from "../api/BookAxiosApi"; // axios를 사용하는 API 함수들을 import합니다.

// 컨텍스트를 생성합니다. 초기값으로 books 배열과 refreshBooks 함수를 포함합니다.
const BookInfoContext = createContext({
  books: [], // 책 목록을 저장할 배열
  refreshBooks: () => {}, // 책 목록을 새로고침하는 함수 (이 단계에서는 빈 함수로 초기화)
});

// 컨텍스트를 사용하는 훅을 직접 정의합니다. 이 훅을 통해 컨텍스트에 접근할 수 있습니다.
export const useBookInfo = () => {
  const context = useContext(BookInfoContext); // useContext 훅을 사용하여 컨텍스트의 값을 가져옵니다.
  if (context === undefined) {
    throw new Error("useBookInfo must be used within a BooksProvider"); // BooksProvider 외부에서 사용될 경우 오류를 발생시킵니다.
  }
  return context; // 컨텍스트 값을 반환합니다.
};

// 컨텍스트에 대한 프로바이더 컴포넌트를 정의합니다.
export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]); // 책 목록 상태를 저장하고 업데이트하는 함수를 설정합니다.

  // 책 목록을 가져와 상태를 업데이트하는 함수입니다.
  const refreshBooks = async () => {
    try {
      const response = await BookAxiosApi.getBooks(); // API를 호출하여 책 목록을 가져옵니다.
      setBooks(response.data); // 가져온 책 목록으로 상태를 업데이트합니다.
      // console.log(response);
    } catch (error) {
      // console.error('책 목록을 가져오는데 실패했습니다:', error); // 오류 발생 시 콘솔에 로그를 출력합니다.
    }
  };

  // 컴포넌트 마운트 시 책 목록을 가져오는 useEffect 훅입니다.
  useEffect(() => {
    refreshBooks(); // 컴포넌트가 마운트되면 책 목록을 가져옵니다.
  }, []); // 빈 배열을 의존성 배열로 제공하여 컴포넌트가 처음 마운트될 때만 호출되도록 합니다.

  // 컨텍스트 값으로 책 목록과 책 목록을 새로 고칠 수 있는 함수를 제공합니다.
  // 컨텍스트 프로바이더를 통해 value로 books와 refreshBooks를 내려줍니다.
  // 자식 컴포넌트들을 렌더링합니다.
  return (
    <BookInfoContext.Provider value={{ books, refreshBooks }}>
      {children}
    </BookInfoContext.Provider>
  );
};

export default BookInfoContext; // 만든 컨텍스트를 기본값으로 내보냅니다.
