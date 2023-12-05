import React from "react";
import styled from "styled-components";
import ThemeBox from "./smallComps/ThemeBox";
import ConveyorBox from "./smallComps/ConveyorBox";
import ImageSlider from "./smallComps/ImageSlider";
import QuestionAnswer from "./smallComps/QuestionAnswer";
import { useBookInfo } from "../../contexts/BookInfoContext";
import { useLocalPhrase } from "../../contexts/LocalImageContext";
import { useInView } from "react-intersection-observer";


const fadeIn = `
  opacity: 1;
  transform: translateY(0px);
`;

const fadeOut = `
  opacity: 0;
  transform: translateY(30px);
`;

const SectionContainer = styled.section.withConfig({
  shouldForwardProp: (prop) => !["inView"].includes(prop),
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  box-shadow: 0 .5px  rgba(0, 0, 0, 0.12);
  ${({ inView }) => (inView ? fadeIn : fadeOut)}
`;

const Main = () => {
  // 회전 초밥에 들어갈 api 컨텍스트
  const { books } = useBookInfo();
  const bookImages = books.map((book) => book.imageUrl);
  const phraseImages = useLocalPhrase();
  const [themeRef, themeInView] = useInView({ threshold: 0.1 });
  const [conveyorRef, conveyorInView] = useInView({ threshold: 0.1 });
  const [sliderRef, sliderInView] = useInView({ threshold: 0.1 });
  const [qaRef, qaInView] = useInView({ threshold: 0.1 });

  return (
    <>
      <SectionContainer
        ref={themeRef}
        inView={themeInView}
        style={{
          backgroundColor: "var(--gray)",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <ThemeBox />
       
      </SectionContainer>
      <SectionContainer
        ref={conveyorRef}
        inView={conveyorInView}
        style={{ backgroundColor: "var(--gray)", paddingTop: "20px" }}
      >
         
        <ConveyorBox images={bookImages} isVisible={conveyorInView} />
      </SectionContainer>
      <SectionContainer ref={sliderRef} inView={sliderInView}>
        <ImageSlider images={phraseImages} isVisible={sliderInView} />
      </SectionContainer>
      <SectionContainer
        ref={qaRef}
        inView={qaInView}
        style={{ backgroundColor: "var(--gray)", paddingBottom: "0" }}
      >
        <QuestionAnswer />
      </SectionContainer>
    </>
  );
};

export default Main;
