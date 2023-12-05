import React from 'react';
import styled from 'styled-components';

// Footer 컨테이너 스타일
const FooterContainer = styled.footer`
  background-color: var(--black);
  color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// Footer 링크 스타일
const FooterLink = styled.a`
  color: #fff;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }

  @media (max-width: 768px) {
    margin: 0 5px;
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    margin: 0 3px;
    font-size: 0.8em;
  }
`;

// Footer 저작권 정보 스타일
const CopyRight = styled.p`
  margin-top: 10px;
  font-size: 0.8em;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 0.7em;
  }

  @media (max-width: 480px) {
    font-size: 0.6em;
  }
`;

// Footer 컴포넌트
const Footer = () => {
  return (
    <FooterContainer>
      <nav>
        <FooterLink href="#">조영준</FooterLink>|
        <FooterLink href="#">정벼리</FooterLink>|
        <FooterLink href="#">길종환</FooterLink>|
        <FooterLink href="#">유동재</FooterLink>
      </nav>
      <CopyRight>&copy; {new Date().getFullYear()} My Company. All Rights Reserved.</CopyRight>
    </FooterContainer>
  );
};

export default Footer;
