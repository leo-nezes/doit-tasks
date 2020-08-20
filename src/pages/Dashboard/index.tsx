import React, { useRef, useState } from 'react';
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
  prevValue: string;
  value: string;
  complete: boolean;
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([
    { id: 'string', prevValue: '', value: 'Teste', complete: false },
  ]);
  const [isComplete, setIsComplete] = useState(false);
  const [show, setShow] = useState(false);

  const inputAddTodo = useRef<HTMLInputElement>(null);
  const labelRefs = useRef<HTMLLabelElement[]>([]);

  const handleEditing = (index: number): void => {
    const oldTodosWithUpdatedValue = [...todos];

    const { innerText } = labelRefs.current[index];

    const todo = oldTodosWithUpdatedValue.find(
      (_, indexTodo) => indexTodo === index,
    );

    if (!todo) throw new Error('Error to edit todo item. Try again, later.');

    const newTodo = {
      id: todo.id,
      prevValue: todo.value,
      value: innerText,
      complete: todo.complete,
    };

    oldTodosWithUpdatedValue[index] = newTodo;

    setTodos([...oldTodosWithUpdatedValue]);
  };

  const handleChangeComplete = (todo: TodoProps): void => {
    const { id, prevValue, value, complete } = todo;

    setIsComplete(!todo.complete);

    const newTodo = {
      id,
      prevValue,
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
      prevValue: '',
      value,
      complete: false,
    };

    setTodos([...oldTodos, newTodo]);

    inputAddTodo.current.value = '';
    setShow(!show);
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

                  <label
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    ref={(el) =>
                      (labelRefs.current[index] = el as HTMLLabelElement)
                    }
                    defaultValue={todo.value}
                    onBlur={() => handleEditing(index)}
                  >
                    {todo.value}
                  </label>
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
