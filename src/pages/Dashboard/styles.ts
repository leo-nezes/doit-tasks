import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import ScrollArea from 'react-scrollbar';

interface ITodoListProps {
  isComplete: boolean;
  index: number;
}

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
  margin: 20px 0;
  padding: 16px;

  & > button {
    display: flex;
    border: 0;

    svg {
      color: #666360;

      width: 25px;
      height: 25px;
    }
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;
    font-size: 20px;

    margin: 0 16px;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const TodoListContainer = styled(ScrollArea)`
  background: #f0f0f2;
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const TodoList = styled.div<ITodoListProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border: 0;
    margin: 0 16px;
  }

  svg {
    ${(props) =>
      props.isComplete
        ? css`
            color: #4bb543;
          `
        : css`
            color: #666360;
          `}

    width: 25px;
    height: 25px;
  }

  label {
    white-space: nowrap;
    overflow: hidden;
    flex: 1;
    max-width: 400px;

    background: transparent;
    color: #666360;
    font-size: 20px;

    ${(props) =>
      props.isComplete &&
      css`
        color: ${transparentize(0.5, '#666360')};
        background: ${transparentize(0.5, '#f0f0f2')};
      `}
  }

  button:last-child > svg {
    color: #fa4353;

    width: 25px;
    height: 25px;
  }
`;

export const Footer = styled.footer`
  padding: 32px 0;
  background: #a6a6a6;
`;
