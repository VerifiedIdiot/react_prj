import axios from "axios";
const DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 로그인
  memberLogin: async (id, password) => {
    const login = {
      id: id,
      password: password,
    };
    return await axios.post(DOMAIN + "/users/login", login);
  },
  checkLogin: async (token) => {
    const response = await axios.get(DOMAIN + "/users/check-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  // 로그아웃
  memberLogout: async (id, password, token) => {
    const logout = {
      id: id,
      password: password,
      token: token,
    };
    return await axios.post(DOMAIN + "/users/logout", logout);
  },

  // 회원가입
  memberSignup: async (id, password, email, phone, name) => {
    const signupData = {
      id: id,
      password: password,
      name: name,
      email: email,
      tel: phone,
      cash: "0",
    };
    return await axios.post(DOMAIN + "/users/signup", signupData);
  },

  // 이메일 보내기
  sendVerificationEmail: async (email) => {
    const sendEmail = {
      email: email,
    };

    return await axios.post(`${DOMAIN}/api/send-email`, sendEmail);
  },
  // 중복 검사
  checkDuplicate: async (id, email, phone) => {
    const checkData = {
      id: id,
      email: email,
      tel: phone,
    };
    return await axios.post(
      `${DOMAIN}/users/signup/check-duplicate`,
      checkData
    );
  },

  // 이메일 인증 코드 확인
  verifyEmail: async (email, verificationCode) => {
    const verification = {
      email: email,
      code: verificationCode,
    };
    return await axios.post(`${DOMAIN}/api/verify-email`, verification);
  },

  // 리뷰 데이터
  reviewData: async (memberId, bookId, content, rating) => {
    const reviewData = {
      memberId: memberId,
      bookId: bookId,
      content: content,
      rating: rating,
    };
    return await axios.post(`${DOMAIN}/PurchasePage/review`, reviewData);
  },
  getReviews: async (bookid) => {
    return await axios.get(`${DOMAIN}/PurchasePage/reviewdata/${bookid}`);
  },
  getReviewStats: async (bookId) => {
    return await axios.get(`${DOMAIN}/PurchasePage/reviewdata/stats/${bookId}`);
  },

  // 장바구니 아이템 추가
  addToCart: async (memberId, bookId) => {
    return await axios.post(`${DOMAIN}/CartPage/add`, { memberId, bookId });
  },
  // 장바구니 아이템 가져오기
  getCartItems: async (memberId) => {
    return await axios.get(`${DOMAIN}/CartPage/${memberId}`);
  },
  // 장바구니 아이템 제거
  removeFromCart: async (memberId, bookId) => {
    return await axios.delete(`${DOMAIN}/CartPage/${memberId}/${bookId}`);
  },
  // 책 정보 가져오기
  getBookInfo: async (bookId) => {
    return await axios.get(`${DOMAIN}/books/${bookId}`);
  },
  // 로그인한 유저 정보 가져오기
  getUserInfo: async (userId) => {
    return await axios.get(`${DOMAIN}/users/${userId}`);
  },
  // 구매한 책인지 체크
  checkPurchase: async (memberId, bookId) => {
    return await axios.get(`${DOMAIN}/books/${memberId}/${bookId}`);
  },
  // 책 구매
  purchaseBook: async (memberId, bookId) => {
    return await axios.post(`${DOMAIN}/books/purchase/${memberId}/${bookId}`);
  },
  // 여러 책 구매
  purchaseBooks: async (memberId, bookIds) => {
    return await axios.post(
      `${DOMAIN}/books/purchase/multiple/${memberId}`,
      bookIds
    );
  },
  // 카카오 로그인
  kakaoLogin: async (data) => {
    return await axios.post(DOMAIN + "/users/kakao-login", data);
  },
  // 카카오 로그인 상태 확인
  checkKakaoLogin: async (token) => {
    const response = await axios.get(DOMAIN + "/users/check-kakao-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  // 관리자 아이디 여부 확인
  loginAuthCheck: async (id, password) => {
    const response = await axios.post(DOMAIN + "/users/loginAuthCheck", {
      id,
      password,
    });
    const userRole = response;
    return userRole;
  },
};

export default AxiosApi;
