// LocalImageContext.jsx
import React, { createContext, useContext } from "react";

// 로컬 책 이미지

// const bookImageContext = require.context('../assets/images/book', false, /\.(png|jpeg|jpg|svg)$/);
// const localBookImages = bookImageContext.keys().map(bookImageContext);

// const localBookImagesContext = createContext(localBookImages);

// export const useLocalImages = () => {
//   return useContext(localBookImagesContext);
// };

// export const LocalImageProvider = ({ children }) => {
//   // console.log(localBookImages);
//   return <localBookImagesContext.Provider value={localBookImages}>{children}</localBookImagesContext.Provider>;
// };

// 로컬 명언 이미지

const phraseImageContext = require.context(
  "../assets/images/phrase",
  false,
  /\.(png|jpeg|jpg|svg)$/
);
const localPhraseImages = phraseImageContext.keys().map(phraseImageContext);

const localPhraseImagesContext = createContext(localPhraseImages);

export const useLocalPhrase = () => {
  return useContext(localPhraseImagesContext);
};

export const LocalPhraseProvider = ({ children }) => {
  // console.log(localPhraseImages);
  return (
    <localPhraseImagesContext.Provider value={localPhraseImages}>
      {children}
    </localPhraseImagesContext.Provider>
  );
};
