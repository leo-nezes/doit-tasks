import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #a6a6a6;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;

  background: #f0f0f2;
`;

export const Main = styled.main`
  /* border: 2px solid yellow; */

  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 503px;
  width: 503px;
  padding: 16px 16px;

  border-radius: 20px;
  box-shadow: 0px 11px 20px 0px rgba(0, 0, 0, 0.5);
`;

export const MainTitle = styled.h1`
  color: #000;
  font-size: 45px;

  padding: 10px 16px;
`;

export const InputContainer = styled.div`
  background: #f0f0f2;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 20px 100px;
  padding: 16px;

  /* svg {
    width: 20px;
    height: 20px;

    margin-right: 10px;
  } */

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;
    font-size: 20px;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const TodoList = styled.div``;

export const Footer = styled.footer`
  padding: 32px 0;
  background: #a6a6a6;
`;
