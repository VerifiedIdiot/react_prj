// 미사용
import React, { useState, useEffect } from "react";
import { ViewerComp } from "../components/ViewerComp";
import { TextBox } from "../components/ViewerComp";

export const ViewerPageTxt = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const fileUrl =
    "https://firebasestorage.googleapis.com/v0/b/reactminiproject-15ad8.appspot.com/o/txt_example.txt?alt=media&token=634c71bc-80db-419c-8b20-4548a935fc69";
  const charsPerPage = 1000; // 한 페이지에 보여줄 문자 수

  useEffect(() => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPages(splitTextIntoPages(reader.result, charsPerPage));
        };
        reader.readAsText(blob, "EUC-KR");
      });
  }, [fileUrl]);

  const splitTextIntoPages = (text, charsPerPage) => {
    let pages = [];
    // 모든 '. ' 문자를 '. \n'로 대체
    let replacedText = text.replace(/\. /gi, ".\n");
    for (let i = 0; i < replacedText.length; i += charsPerPage) {
      pages.push(replacedText.slice(i, i + charsPerPage));
    }
    return pages;
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ViewerComp>
      <TextBox>
        <pre>{pages[currentPage]}</pre>
      </TextBox>
      <div>
        <button onClick={handlePrevPage}>이전</button>
        <button onClick={handleNextPage}>다음</button>
      </div>
    </ViewerComp>
  );
};
