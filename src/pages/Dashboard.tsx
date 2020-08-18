import React, { useRef, useState } from 'react';

import { FiCircle, FiPlusCircle } from 'react-icons/fi';

import {
  Container,
  Header,
  MainContainer,
  Main,
  MainTitle,
  TodoListContainer,
  TodoList,
  InputContainer,
  Footer,
} from './styles';

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  const inputAddTodo = useRef<HTMLInputElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const inputEl3 = useRef<HTMLInputElement>(null);

  const handleEditing = (): void => {
    console.log(inputEl.current?.value);
    // console.log(inputEl3.current?.value);
  };

  const handleAddTodo = (): void => {
    const oldTodos = [...todos];

    if (!inputAddTodo.current) return;

    const { value } = inputAddTodo.current;

    setTodos([...oldTodos, value]);
    inputAddTodo.current.value = '';
    setShow(true);
  };

  return (
    <Container>
      <Header>
        <h1>Todo App</h1>
      </Header>

      <MainContainer>
        <Main>
          <MainTitle>todo list</MainTitle>

          <InputContainer>
            <input
              ref={inputAddTodo}
              name="add"
              placeholder="Add your todo on a list"
            />

            <button onClick={handleAddTodo} type="button">
              <FiPlusCircle />
            </button>
          </InputContainer>

          {show && (
            <TodoListContainer>
              {todos.map((todo) => (
                <TodoList key={todo} contentEditable="true">
                  <button type="button">
                    <FiCircle />
                  </button>

                  <input
                    ref={inputEl}
                    onBlur={handleEditing}
                    name="insert"
                    value={todo}
                  />
                </TodoList>
              ))}
            </TodoListContainer>
          )}
        </Main>
      </MainContainer>

      <Footer> Teste </Footer>
    </Container>
  );
};

export default Dashboard;
