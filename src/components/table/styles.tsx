import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  z-index: 3;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(2, 2, 33, 1) 31%,
    rgba(0, 212, 255, 1) 100%
  );
  align-items: center;
  height: 5vh;
  top: 0;
  bottom: 0;
  padding: 2rem;
  img {
    height: 6vh;
  }
`;

export const Currency = styled.div`
  color: white;
  font-size: 2rem;
`;

export const TableContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  width: 82vw;
  background-color: #fff5;
  text-align: left;
`;

export const TableHeader = styled.thead`
  background-color: black;
  height: 2rem;
  color: #fff;
  font-size: 1.3rem;
  th {
    padding: 0.5rem;
  }
`;

export const TableBody = styled.tbody`
  text-align: left;
  td {
    padding: 0.5rem;
  }
`;
