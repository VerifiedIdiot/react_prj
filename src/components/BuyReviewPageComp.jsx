import React, { useEffect, useState } from "react";
import ReviewModal from "../utils/ReviewModal";
import BookPurchase from "../components/PurchaseComponent";
import ReviewSection from "../components/ReviewComponent";
import LoginLogoutButton from "../components/LoginLogoutButtonComponent";
import { useUser } from "../contexts/Context";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

const BuyReviewPg = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터를 관리하는 상태
  const { isLoggedin, checkLoginStatus, user, login } = useUser();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedin]);

  useEffect(() => {
    fetchBookInfo();
  }, []);
  const openReviewModal = () => {
    if (isLoggedin) {
      // 로그인 상태 확인
      setIsReviewModalOpen(true); // 로그인 상태라면 리뷰 모달 창 열기
    } else {
      // 로그인 상태가 아니라면 로그인 페이지로 이동
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const reviewSubmit = async (reviewData) => {
    try {
      // 서버에 데이터 전송
      const response = await AxiosApi.reviewData(
        user.id, // 현재 사용자의 ID
        bookInfo.id, // 현재 책의 ID
        reviewData.reviewText,
        reviewData.rating
      );

      if (response.status === 201) {
        // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가
        setReviews([...reviews, reviewData]);

        closeReviewModal();
      } else {
        // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
        console.error("서버 응답 실패");
      }
    } catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
    }
  };
  const fetchBookInfo = async () => {
    try {
      const response = await AxiosApi.getBookInfo(21);
      if (response.status === 200) {
        if (response.data !== null) {
          setBookInfo(response.data);
          console.log(response.data);
        } else {
          console.error("요청은 성공했지만, 반환된 책 정보가 null입니다.");
        }
      } else {
        console.error(
          `책 정보를 가져오는 요청이 실패했습니다. 상태 코드: ${response.status}`
        );
      }
    } catch (error) {
      console.error("책 정보를 가져오는 도중 에러가 발생했습니다:", error);
    }
  };

  // 책 구매 여부 (예: true - 이미 구매한 책, false - 아직 구매하지 않은 책)
  const isPurchased = false; // 또는 true

  const addToCart = async () => {
    if (user) {
      // user 객체가 있을 때만 실행
      try {
        const response = await AxiosApi.addToCart(user.id, bookInfo.id);
        if (response.status === 200) {
          // ...
          navigate("/cart");
        } else {
          console.error("장바구니 담기기 에러");
        }
      } catch (error) {
        console.error("에러 확인", error);
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  // 책 구매 함수
  const purchaseBook = () => {};

  // 미리보기 함수
  const viewPreview = () => {};

  return (
    <div>
      <LoginLogoutButton />
      {bookInfo && (
        <BookPurchase
          info={bookInfo}
          isLoggedIn={isLoggedin}
          isPurchased={isPurchased}
          onAddToCart={addToCart}
          onPurchase={purchaseBook}
          onPreview={viewPreview}
        />
      )}

      <ReviewModal
        isOpen={isReviewModalOpen}
        closeModal={closeReviewModal}
        onSubmit={reviewSubmit}
      />
      <ReviewSection openReviewModal={openReviewModal} bookInfo={bookInfo} />
    </div>
  );
};

export default BuyReviewPg;
