import { ReactReader } from "react-reader";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ViewerPageEpub = () => {
  // ContentUrl 값 가져오기
  const navigateLocation = useLocation();
  const contentUrl = navigateLocation.state.contentUrl;

  // 밑줄
  const [selections, setSelections] = useState([]);

  // 폰트 크기
  const [size, setSize] = useState(100);
  const changeSize = (newSize) => {
    setSize(newSize);
  };

  const [page, setPage] = useState("");
  const [location, setLocation] = useState(null);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const renditionRef = useRef(null);
  const tocRef = useRef(null);

  const locationChanged = (nowPageNumber) => {
    // 현재 페이지 번호와 TOC 데이터가 준비되어 있을 때, 페이지 번호가 표시되게 설정하는 메서드
    if (renditionRef.current && tocRef.current) {
      // 렌더링 시작 위치 정보 가져오기
      const { displayed, href } = renditionRef.current.location.start;

      // 현재 페이지의 챕터 찾기, 일치 → 포함관계로 수정
      // const chapter = tocRef.current.find((item) => item.href === href);
      const chapter = tocRef.current.find((item) => item.href.includes(href));

      // 페이지 번호 및 챕터 정보를 화면에 표시
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "N/A"
        }`
      );

      // console.log(tocRef.current[0].label);
      // console.log(tocRef.current);
      // console.log(renditionRef.current.location.start.href);
    }

    // 새로고침해도 마지막으로 읽던 페이지를 기억하게 설정하는 메서드
    if (!firstRenderDone) {
      // 로컬 저장소에서 사용자가 마지막으로 읽은 페이지 정보를 호출
      // 만약 저장된 페이지가 존재 X → NULL 반환 = 아무 작업도 수행하지 않고 함수를 종료
      setLocation(localStorage.getItem("last_reading_page"));

      // 다음 렌더링에는 또 다시 조건문이 실행되지 않게 설정
      setFirstRenderDone(true);
      return;
    }
    // 로컬 저장소에 사용자가 마지막으로 읽은 페이지 정보를 저장
    localStorage.setItem("last_reading_page", nowPageNumber);
    setLocation(nowPageNumber); // or setLocation(localStorage.getItem("book-progress"))
  };

  // 폰트 크기가 변경됐을 때만 렌더링이 일어나게 설정
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size]);

  // 하이라이트
  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(selectedPosition, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(selectedPosition).toString(),
            selectedPosition,
          })
        );

        // 밑줄 저장
        localStorage.setItem(
          "highlights",
          JSON.stringify(
            selections.concat({
              text: renditionRef.current.getRange(selectedPosition).toString(),
              selectedPosition,
            })
          )
        );

        renditionRef.current.annotations.add(
          "highlight",
          selectedPosition,
          {},
          null,
          "h1",
          {
            fill: "yellow",
            "fill-opacity": "0.5",
            "mix-blend-mode": "multiply",
          }
        );
        contents.window.getSelection().removeAllRanges();
      }
      renditionRef.current.on("selected", setRenderSelection);
      return () => {
        renditionRef.current.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, selections]);

  return (
    <>
      <div className="App">
        <div>ePub Demo</div>

        <button onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
        <span>Current Size : {size}%</span>
        <button onClick={() => changeSize(Math.max(80, size + 10))}>+</button>

        <div style={{ height: "100vh" }}>
          <ReactReader
            title="E-book project Sample"
            location={location}
            locationChanged={locationChanged}
            // 외부에서 접근이 가능한 사이트의 주소
            url={contentUrl}
            // 책이 불러와질때 실행
            getRendition={(rendtion) => {
              renditionRef.current = rendtion;
              // 밑줄
              renditionRef.current.themes.default({
                "::selection": {
                  background: "greenyellow",
                },
              });
              const highlightsString = localStorage.getItem("highlights");
              const highlights = highlightsString
                ? JSON.parse(highlightsString)
                : [];

              if (highlights.length > 0) {
                highlights.forEach((highlight) => {
                  renditionRef.current.annotations.add(
                    "highlight",
                    highlight.selectedPosition,
                    {},
                    null,
                    "h1",
                    {
                      fill: "yellow",
                      "fill-opacity": "0.5",
                      "mix-blend-mode": "multiply",
                    }
                  );
                });
              }

              setSelections(highlights);
            }}
            tocChanged={(toc) => (tocRef.current = toc)}
            // 슬라이드 → 스크롤
            // epubOptions={{
            //   flow: "scrolled",
            //   manager: "continuous",
            // }}
          />
        </div>
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            color: "darkgreen",
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            left: "1rem",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {page}
        </div>
      </div>
    </>
  );
};
