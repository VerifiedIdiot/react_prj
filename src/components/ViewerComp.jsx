import styled from "styled-components";

export const ViewerComp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: yellowgreen;
  height: 100vh;
`;

export const TextBox = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 10px;
  width: 75vw;
  height: 75vh;
  overflow: auto;
  overflow-wrap: break-word;
  font-size: 1rem;
  background-color: white;
  display: flex;
  align-items: center;
  line-height: 250%;
`;
