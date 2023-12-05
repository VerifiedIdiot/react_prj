import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookInfo } from "../../../contexts/BookInfoContext";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StyledSearch } from "../../../globalStyle/StyledSearch";

const HorizontalLayout = styled.div`
  display: flex;
  justify-content: space-between; // 컴포넌트들을 양쪽 끝으로 정렬합니다.
  align-items: center; // 컴포넌트들을 수직 중앙에 정렬합니다.
  width: 100%;
`;



const SearchWrapper = styled.div`
  flex-grow: 1; // 남은 공간을 모두 사용합니다.
  display: flex;
  align-items: center; // 검색창을 수직 중앙에 정렬합니다.
`;
// SliderWrapper 스타일링

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center; // 버튼들을 수직 중앙에 정렬합니다.
  
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const SliderWrapper = styled.div`
  width: 100vw;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px 20px;
    margin-right: auto;
    object-fit: contain;
    will-change: transform;

    @media (max-width: 1600px) {
      padding: 30px;
      margin-right: 20px;
    }

    @media (max-width: 1024px) {
      padding: 30px;
      margin-right: 40px;
    }

    @media (max-width: 850px) {
      padding: 20px;
      margin-right: 50px;
    }

    @media (max-width: 480px) {
      padding: 10px;
      margin-right: 10px;
    }

    &:hover {
      img {
        transform: scale(1.1);
        transition: 0.3s linear;
      }
      &:nth-child(odd) {
        img {
          transform: scale(1.1) rotateZ(-5deg);
        }
      }
      &:nth-child(even) {
        img {
          transform: scale(1.1) rotateZ(5deg);
        }
      }
    }
  }

  .slick-track {
    display: flex;
  }
`;

// 리렌더링 되었을때 간지나게 초밥벨트 등장
const StyledSliderWrapper = styled(SliderWrapper)`
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 1s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// ImageSliderItem 스타일링
const ImageSliderItem = styled.img`
  width: 300px; // 기본 이미지 크기
  height: 350px;

  max-width: 350px;
  max-height: 350px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: transform 0.5s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  @media (max-width: 1680px) {
    width: 225px; // 더 작은 화면에서 이미지 크기 조정
    height: 300px;
  }

  @media (max-width: 1300px) {
    width: 200px; // 더 작은 화면에서 이미지 크기 조정
    height: 250px;
  }

  @media (max-width: 1100px) {
    width: 180px; // 더 작은 화면에서 이미지 크기 조정
    height: 225px;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 130px;
  }
`;

// ToggleSlidersWrapper 스타일링
const ToggleSlidersWrapper = styled.div`
  transition: opacity 2s, max-height 2s;
  max-height: ${(props) => (props.$isVisible ? "auto" : "0px")};
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  overflow: hidden;
  position: relative;
  z-index: 10;
`;

// Button 스타일링
const Button = styled.button`
  margin: 5px;
  border: 1.8px solid #242424;
  font-weight: bolder;
  padding: 6px 16px;
  background-color: var(--gray);
  color: var(--black);
  border-radius: 100px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: var(--black);
    color: var(--white);
  }

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const StyledSearchAdjusted = styled(StyledSearch)`
  height: 40px; // 버튼의 높이에 맞게 조정합니다.
`;

// ConveyorBox 컴포넌트
const ConveyorBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { books } = useBookInfo(); // API 호출 함수 사용

  // 정렬 기준을 위한 useState
  const [sortedBooks, setSortedBooks] = useState([]);
  // 정렬이 됐으면 리렌더링을 해야 된다더라 아오
  const [reRender, setReRender] = useState(false);
  const [activeSortOrder, setActiveSortOrder] = useState("");

  const sortBooks = (order) => {
    if (order === activeSortOrder) {
      // 이미 활성화된 정렬 기준이면 정렬 x , 빡세다 빡세
      return;
    }
    let sorted;
    if (order === "latest") {
      // parseInt로 정수형으로 변경하면 , 해당 함수는 xxxx-xx-xx 인 경우 - 가 인식 되면 중단돰 , 그래서 날짜로 타입변환후 비교
      sorted = [...books].sort(
        (a, b) =>
          new Date(b.publishYear).getTime() - new Date(a.publishYear).getTime()
      );
      // console.log(sorted);
    } else if (order === "bestselling") {
      sorted = [...books].sort((a, b) => b.purchaseCount - a.purchaseCount);
      // console.log(sorted);
    }
    setSortedBooks(sorted);
    setReRender((prev) => !prev);
    setActiveSortOrder(order);
  };

  const handleSortChange = (order) => {
    sortBooks(order);
  };

  const handleImageClick = (id) => {
    console.log(id);
    navigate("/PurchasePage", { state: { bookId: id } });
  };

  const renderSlider = (settings) => (
    <Slider {...settings}>
      {sortedBooks.map((book, index) => (
        <div key={book.id || index}>
          <ImageSliderItem
            src={book.imageUrl}
            alt={"이미지"}
            onClick={() => handleImageClick(book.id)}
          />
        </div>
      ))}
    </Slider>
  );

  useEffect(() => {
    setSortedBooks(books);
    // console.log(books);
  }, [books]);

  // 회전 초밥 설정
  const settings = {
    infinite: true,
    speed: 20000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 5,
      //     slidesToScroll: 1
      //   }
      // }
    ],
  };

  const reverseSettings = { ...settings, rtl: true };

  return (
    <>
      <HorizontalLayout>
        <ButtonWrapper>
          <Button onClick={() => handleSortChange("latest")}>최신순</Button>
          <Button onClick={() => handleSortChange("bestselling")}>
            판매순
          </Button>
        </ButtonWrapper>
        <SearchWrapper>
          <StyledSearchAdjusted /* props를 여기에 전달 */ />
        </SearchWrapper>
      </HorizontalLayout>
      {/* reRender 상태에 따라 슬라이더 표시 */}
      {reRender && (
        <StyledSliderWrapper>{renderSlider(settings)}</StyledSliderWrapper>
      )}
      {reRender && (
        <StyledSliderWrapper>
          {renderSlider(reverseSettings)}
        </StyledSliderWrapper>
      )}
      <SliderWrapper>{renderSlider(settings)}</SliderWrapper>
      <SliderWrapper>{renderSlider(reverseSettings)}</SliderWrapper>

      {isVisible && (
        <ToggleSlidersWrapper $isVisible={isVisible}>
          <SliderWrapper>{renderSlider(settings)}</SliderWrapper>
          <SliderWrapper>{renderSlider(reverseSettings)}</SliderWrapper>
          <SliderWrapper>{renderSlider(settings)}</SliderWrapper>
          {/* reRender 상태에 따라 슬라이더 표시 */}
          {reRender && (
            <StyledSliderWrapper>{renderSlider(settings)}</StyledSliderWrapper>
          )}
          {reRender && (
            <StyledSliderWrapper>
              {renderSlider(reverseSettings)}
            </StyledSliderWrapper>
          )}
        </ToggleSlidersWrapper>
      )}
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "숨기기" : "더보기"}
      </Button>
    </>
  );
};

export default ConveyorBox;
