import styled from "styled-components";

// 버튼
export const Button = styled.button`
  margin: 5px;
  position: relative;
  padding: 0;
  border: 2px solid #888888;
  outline: none;
  background-color: #f4f5f6;
  border-radius: 15px;
  /* box-shadow: -6px -20px 35px #ffffff, -6px -10px 15px #ffffff,
    -20px 0px 30px #ffffff, 6px 20px 25px rgba(0, 0, 0, 0.2); */
  transition: 0.13s ease-in-out;
  cursor: pointer;

  &:active {
    box-shadow: none;
    .button__content {
      box-shadow: none;
      .button__text,
      .button__icon {
        transform: translate3d(0px, 0px, 0px);
      }
    }
  }
  @media (max-width: ${props => props.breakpoint || '600px'}) {
    width: ${props => props.smallWidth || '60px'};
    height: ${props => props.smallHeight || '30px'};
  }

`;

const ButtonContent = styled.div`
  position: relative;
  top: 1px;
  width: 100%;
  height: 97%;
  box-shadow: inset 0px -5px 0px#dddddd, 0px -3px 0px #f4f5f6;
  border-radius: 12px;
  transition: 0.1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  &:active {
    box-shadow: none;
  }
`;

const ButtonText = styled.p`
  position: relative;
  transform: translate3d(0px, -4px, 0px);
  margin: 0;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: grey;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.2);
  font-weight: bold;

  /* 텍스트 내부에 배경 적용 */
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  transition: 0.13s ease-in-out;
`;

export const StyledButton = (props) => {
  const { onClick, width, height, value, margin, breakpoint, smallWidth, smallHeight } = props;

  return (
    <Button
      style={{ width, height, margin, smallHeight, smallWidth, breakpoint }}
      onClick={onClick}
    >
      <ButtonContent>
        <ButtonText>{value}</ButtonText>
      </ButtonContent>
    </Button>
  );
};
