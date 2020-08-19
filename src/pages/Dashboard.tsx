import React, { useRef, useState, FormEvent } from 'react';
import { FiCircle, FiPlusCircle, FiCheckCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

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

interface TodoProps {
  id: string;
  value: string;
  complete: boolean;
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [show, setShow] = useState(false);

  const inputAddTodo = useRef<HTMLInputElement>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const test = (e: FormEvent<HTMLInputElement>): void => {
    console.log(e.target);
  };

  const handleEditing = (index: number): void => {
    const {
      defaultValue,
      innerHTML,
      innerText,
      textContent,
    } = inputRefs.current[index];

    console.log(defaultValue);
    console.log(innerHTML);
    console.log(innerText);
    console.log(textContent);
  };

  const handleChangeComplete = (todo: TodoProps): void => {
    const { id, value, complete } = todo;

    setIsComplete(!todo.complete);

    const newTodo = {
      id,
      value,
      complete: !complete,
    };

    const newTodos = todos.map((todoMap) => {
      const result = todoMap.id === id ? newTodo : todoMap;

      return result;
    });

    setTodos([...newTodos]);
  };

  const handleAddTodo = (): void => {
    const oldTodos = [...todos];

    if (!inputAddTodo.current) return;

    const { value } = inputAddTodo.current;

    const newTodo = {
      id: uuidv4(),
      value,
      complete: false,
    };

    setTodos([...oldTodos, newTodo]);

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

          {todos.length > 0 && (
            <TodoListContainer speed={0.8} horizontal={false}>
              {todos.map((todo, index) => (
                <TodoList
                  index={index}
                  isComplete={todo.complete}
                  key={todo.id}
                >
                  <button
                    onClick={() => handleChangeComplete(todo)}
                    type="button"
                  >
                    {todo.complete ? <FiCheckCircle /> : <FiCircle />}
                  </button>

                  <input
                    contentEditable="true"
                    ref={(el) =>
                      (inputRefs.current[index] = el as HTMLInputElement)
                    }
                    defaultValue={todo.value}
                    onChange={(e) => test(e)}
                    onBlur={() => handleEditing(index)}
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
