import styled, { css } from 'styled-components';
import { shade, tint, transparentize } from 'polished';

import ScrollArea from 'react-scrollbar';

interface ITodoListProps {
  isComplete: boolean;
  index: number;
}

interface IInputContainerProps {
  isErrored: boolean;
  isFocused: boolean;
}

export const Container = styled.div`
  height: 100vh;

  display: flex;
  padding: 16px;
`;

export const InformationContainer = styled.aside`
  width: 250px;
  height: 95vh;
  padding: 16px;
  border-radius: 5px;
  background: #fff;
`;

export const GraphicContainer = styled.div``;

export const InformationSession = styled.div`
  display: flex;
  flex: 1;
  margin-top: -25px;
  /* padding: 0 16px; */
  color: #666360;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li > svg {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin: 0 10px;
    }

    li:first-child > svg {
      color: #0bd3de;
      background: #0bd3de;
    }

    li:nth-child(2) > svg {
      color: #666360;
      background: #666360;
    }

    li:last-child > svg {
      color: #000;
    }
  }
`;

export const MainContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;

  background: #f0f0f2;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80px;

  color: #666360;
  font-size: 35px;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 503px;
  width: 80%;
  max-width: 828px;
  margin: 16px 0;
  padding: 16px 16px;

  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 11px 20px 0px rgba(0, 0, 0, 0.5);
`;

export const MainTitle = styled.h1`
  color: #000;
  font-size: 45px;

  padding: 10px 16px;
`;

export const InputContainer = styled.div<IInputContainerProps>`
  background: #f0f0f2;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 10px;
  padding: 16px;

  ${(props) =>
    props.isErrored
      ? css`
          border: 1px solid #fa4353;
        `
      : css`
          border: 0;
        `}

  ${(props) =>
    props.isFocused &&
    css`
      border: 0;
    `}

  button {
    display: flex;
    border: 0;

    svg {
      width: 25px;
      height: 25px;

      transition: color 0.5s;

      ${(props) =>
        props.isErrored
          ? css`
              color: #fa4353;
            `
          : css`
              color: #666360;
            `}
    }

    svg:hover {
      ${(props) =>
        props.isErrored
          ? css`
              color: ${tint(0.5, '#fa4353')};
            `
          : css`
              color: ${shade(0.5, '#666360')};
            `}
    }
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    font-size: 20px;

    margin: 0 16px;
    color: #666360;

    ${(props) =>
      props.isErrored &&
      css`
        &::placeholder {
          color: #fa4353;
        }
      `}

    ${(props) =>
      props.isFocused &&
      css`
        &::placeholder {
          color: #666360;
        }
      `}
  }
`;

export const TodoError = styled.label`
  margin: -10px 0 10px -560px;
  color: #fa4353;
`;

export const TodoListContainer = styled(ScrollArea)`
  background: #f0f0f2;

  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
`;

export const TodoList = styled.div<ITodoListProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;

  button:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;

    svg {
      width: 25px;
      height: 25px;

      transition: color 0.5s;

      ${(props) =>
        props.isComplete
          ? css`
              color: #4bb543;
            `
          : css`
              color: #666360;
            `}
    }

    svg:hover {
      ${(props) =>
        props.isComplete
          ? css`
              color: ${tint(0.5, '#4bb543')};
            `
          : css`
              color: ${shade(0.5, '#666360')};
            `}
    }
  }

  label {
    white-space: nowrap;
    overflow: hidden;
    flex: 1;
    margin: 0 10px;

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

  button:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;

    svg {
      color: #fa4353;

      width: 25px;
      height: 25px;

      transition: color 0.5s;
    }

    svg:hover {
      color: ${tint(0.5, '#fa4353')};
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;

  color: #666360;
  font-size: 14px;

  span > a {
    color: #666360;
    text-decoration: none;
  }
`;
