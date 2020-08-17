import React from 'react';

import {
  Container,
  Header,
  MainContainer,
  Main,
  MainTitle,
  TodoList,
  InputContainer,
  Footer,
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>Todo App</h1>
      </Header>

      <MainContainer>
        <Main>
          <MainTitle>todo list</MainTitle>

          <InputContainer>
            <input name="search" placeholder="Add your todo on a list" />
          </InputContainer>

          <TodoList> Teste</TodoList>
        </Main>
      </MainContainer>

      <Footer> Teste </Footer>
    </Container>
  );
};

export default Dashboard;
