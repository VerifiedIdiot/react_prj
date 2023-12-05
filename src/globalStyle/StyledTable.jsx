import styled from "styled-components";

export const TableBox = styled.div`
  max-width: 1366px;
  overflow: scroll;
`;

export const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  background: white;
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border: 1px solid #ccc;
  background-color: #e9e9e9;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* width: 100px; */
`;

export const Input = styled.input`
  background-color: rgb(241, 241, 241);
  border: none;
  width: 100%;
  height: 20vh;
  margin: 0;
`;

export const StyledTd = styled.td`
  border: 1px solid #ccc;
  background-color: rgb(241, 241, 241);
  padding: 10px;
`;
