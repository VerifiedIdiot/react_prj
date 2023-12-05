import axios from "axios";

const BACK_DOMAIN = "http://localhost:8111";

export const BookAxiosApi = {
  // 책 전체 목록 가져오기
  getBooks: async () => {
    const response = await axios.get(BACK_DOMAIN + "/book/admin");

    return response;
  },

  // ID를 기준으로 책을 찾음
  findBookById: async (id) => {
    const response = await axios.get(BACK_DOMAIN + `/book/${id}`);

    return response;
  },

  // 책 추가
  addBook: async (bookToSave) => {
    const response = await axios.post(BACK_DOMAIN + "/book/admin", bookToSave);
    return response;
  },

  // 책 삭제
  deleteBook: async (id) => {
    const response = await axios.delete(BACK_DOMAIN + `/book/admin/${id}`);
    return response;
  },

  // 책 수정
  updateBook: async (id, book) => {
    const response = await axios.put(BACK_DOMAIN + `/book/admin/${id}`, book);
    return response;
  },

  // 책 존재 여부 확인
  isBookexist: async (title, author) => {
    const response = await axios.get(
      BACK_DOMAIN + `/book/isbookexist?title=${title}&author=${author}`
    );
    return response;
  },

  // 책 구매 여부 확인
  isBookBought: async (userId, bookId) => {
    const response = await axios.get(
      BACK_DOMAIN + `/book/isbookbought?memberId=${userId}&bookId=${bookId}`
    );
    return response;
  },

  // 회원이 구매한 책 목록
  getBoughtBooks: async (userId) => {
    const response = await axios.get(
      `${BACK_DOMAIN}/buy/boughtbooks?memberId=${userId}`
    );
    return response;
  },

  // 구매 삭제
  deleteBuyBook: async (buyId) => {
    const response = await axios.delete(`${BACK_DOMAIN}/buy/${buyId}`);
    return response.data;
  },
};
