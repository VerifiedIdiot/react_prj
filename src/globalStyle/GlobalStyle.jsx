import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    --black : #000000;
    --white : #fff;
    --gray : #f1f1f1;
    --radius : 10px;
  }

  @font-face {
  font-family: 'Peace-Bold';
  src: url('../assets/fonts/PyeongChangPeace-Bold.ttf') format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: 'Peace-Light';
  src: url('../assets/fonts/PyeongChangPeace-Light.ttf') format('truetype');
  font-weight: normal;
}


  * {
    box-sizing: border-box;
    --scrollWidth: 10px;
    
    margin: auto;
  }
  body {
    color: #000;
    font: 400 14px/24px 'Noto-regional,Noto-latin,TCCC-UnityText';
    letter-spacing: 0;
    margin: 0;
  padding: 0;
  height: 100%;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video{
    font-family: 'Noto Sans KR', sans-serif;
    
  }
  section {
    padding-top: 40px;
    padding-bottom: 40px;
  
  }
  h2 {
    font-size: 2.4em;
  }
  h3 {
    font-size: 1.2em;
  }
  [class*="container"] {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  @media only screen and (max-width:768px) {
    body {
      font-size: 14px;
    }
    h2 {
      font-size: 2em;
    }
    .container {
      width: 90vw;
    }
  }
`;

export default GlobalStyle;
