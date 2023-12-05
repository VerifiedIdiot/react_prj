import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa"; // 별 아이콘을 사용하기 위한 import
import AxiosApi from "../api/AxiosApi";
import { useUser } from "../contexts/Context";

const ReviewSectionContainer = styled.div`
  padding: 0 30px 70px 30px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    border-bottom: 2px solid #7d8e9e;
    text-transform: uppercase; /* 텍스트를 대문자로 변환 */
  }

  .review-starbox {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  .review-rating {
    display: table-cell;
    width: 120px;
    padding: 32px 0 20px 0;
    text-align: center;
    cursor: default;
    vertical-align: middle; /* 셀 내용 중앙 정렬 */
  }

  .average-rating {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    color: #007bff; /* 평균 평점의 색상 변경 */
  }

  .star-icons {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 24px;
    justify-content: center; /* 별 아이콘 가운데 정렬 */
  }

  .total-ratings {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    text-align: right; /* 총 평점을 오른쪽 정렬 */
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px; /* 테두리 둥글게 */
  }

  .review-rating {
    font-weight: bold;
    margin: 0;
    color: #007bff; /* 리뷰 평점의 색상 변경 */
  }

  .review-text {
    margin: 0;
    color: #333;
    font-style: italic; /* 리뷰 텍스트를 이탤릭체로 */
  }
`;

const ReviewSection = ({ openReviewModal, bookInfo }) => {
  const { checkLoginStatus, user } = useUser();
  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      stars.push(<FaStar key={i} color="#AAB9FF" />);
    } else if (i - 0.5 <= averageRating) {
      stars.push(<FaStarHalf key={i} color="#AAB9FF" />);
    } else {
      stars.push(<FaStar key={i} color="gray" />);
    }
  }
  // 리뷰 데이터를 가져오는 함수
  const fetchReviews = useCallback(async () => {
    if (!bookInfo) {
      console.log(
        "bookInfo is null. fetchReviews will be called again when bookInfo is set."
      );
      return;
    }
    try {
      const response = await AxiosApi.getReviews(bookInfo.id);
      if (response.status === 200) {
        setReviews(response.data);
      } else {
        console.error("리뷰 가져오기 실패");
      }
    } catch (error) {
      console.error("리뷰 데이터 요청 에러", error);
    }
  }, [bookInfo]);
  const fetchReviewStats = useCallback(async () => {
    if (!bookInfo) {
      console.log(
        "bookInfo is null. fetchReviewStats will be called again when bookInfo is set."
      );
      return;
    }
    try {
      const response = await AxiosApi.getReviewStats(bookInfo.id);
      console.log(response);
      if (response.status === 200) {
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalReviews);
      } else {
        console.error("Failed to fetch review stats");
      }
    } catch (error) {
      console.error("Failed to fetch review stats:", error);
    }
  }, [bookInfo]);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (bookInfo) {
      fetchReviews();
      fetchReviewStats();
    }
  }, [bookInfo]);
  return (
    <ReviewSectionContainer>
      <h2>리뷰</h2>
      <div className="review-starbox">
        <div className="review-rating">
          <p>평균 평점: {averageRating.toFixed(1)}</p>
          <p>별 개수: {stars}</p>
          <p>리뷰 개수: {totalRatings}</p>
          <button onClick={openReviewModal}>Review 작성</button>
        </div>
      </div>
      <ul>
        {reviews.length === 0 ? (
          <li>
            <p>리뷰가 없습니다.</p>
          </li>
        ) : (
          reviews.map((review, index) => (
            <li key={index}>
              <div className="star-icons">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i + 1 <= review.rating ? (
                      <FaStar color="#AAB9FF" />
                    ) : i + 0.5 === review.rating ? (
                      <FaStarHalf color="#AAB9FF" />
                    ) : (
                      <FaStar color="gray" />
                    )}
                  </span>
                ))}
              </div>
              <p className="review-rating">평점: {review.rating}</p>
              <p className="review-nickname">
                닉네임: {review.memberName}
              </p>{" "}
              <p className="review-id">작성자 ID: {review.memberId}</p>{" "}
              <p className="review-content">컨텐트: {review.content}</p>
            </li>
          ))
        )}
      </ul>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
