import React, { useRef, useState, useCallback, RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import {
  FiArrowDownCircle,
  FiCircle,
  FiPlusCircle,
  FiCheckCircle,
  FiMinusCircle,
} from 'react-icons/fi';

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
  TodoError,
} from './styles';

interface TodoProps {
  id: string;
  prevValue: string;
  value: string;
  complete: boolean;
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([
    { id: 'string-Teste 1', prevValue: '', value: 'Teste 1', complete: false },
    { id: 'string-Teste 2', prevValue: '', value: 'Teste 2', complete: false },
    { id: 'string-Teste 3', prevValue: '', value: 'Teste 3', complete: false },
    { id: 'string-Teste 4', prevValue: '', value: 'Teste 4', complete: false },
    { id: 'string-Teste 5', prevValue: '', value: 'Teste 5', complete: false },
    { id: 'string-Teste 6', prevValue: '', value: 'Teste 6', complete: false },
    { id: 'string-Teste 7', prevValue: '', value: 'Teste 7', complete: false },
    { id: 'string-Teste 8', prevValue: '', value: 'Teste 8', complete: false },
    { id: 'string-Teste 9', prevValue: '', value: 'Teste 9', complete: false },
    {
      id: 'string-Teste 10',
      prevValue: '',
      value: 'Teste 10',
      complete: false,
    },
  ]);
  const [selectAll, setSelectAll] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [addTodoError, setAddTodoError] = useState({
    isError: false,
    locale: '',
    message: '',
  });
  const inputAddTodo = useRef<HTMLInputElement>(null);
  const labelRefs = useRef<HTMLLabelElement[]>([]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputAddTodo.current?.value);
  }, []);

  const addErrorMessage = useCallback((locale: string, message: string) => {
    const errorParam = { isError: true, locale, message };
    setAddTodoError(errorParam);
  }, []);

  const handleChangeComplete = useCallback((todo: TodoProps) => {
    const { id, prevValue, value, complete } = todo;

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
  }, []);

  const handleCompleteAll = useCallback(() => {
    const newTodosWithCompleteChange = todos.map((todo) => {
      const { id, prevValue, value } = todo;

      return {
        id,
        prevValue,
        value,
        complete: selectAll,
      };
    });

    setSelectAll(!selectAll);
    setTodos([...newTodosWithCompleteChange]);
  }, []);

  const handleAddTodo = useCallback(
    async (data: RefObject<HTMLInputElement>) => {
      try {
        const schema = Yup.object().shape({
          addTodo: Yup.string().required(
            'Preenchimento obrigatório no campo acima.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

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
      } catch (errors) {
        if (errors instanceof Yup.ValidationError) {
          console.log(errors);
          errors.inner.forEach((err) => {
            addErrorMessage(err.path, err.message);
          });

          return;
        }
        console.log(errors);
      }
    },
    [todos],
  );

  const handleEditTodo = useCallback(
    (index: number) => {
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
    },
    [todos],
  );

  const handleDeleteTodo = useCallback(
    (todo: TodoProps) => {
      const newTodos = todos.filter((todoFilter) => todoFilter.id !== todo.id);

      setTodos([...newTodos]);
    },
    [todos],
  );

  return (
    <Container>
      <Header>
        <h1>Todo App</h1>
      </Header>

      <MainContainer>
        <Main>
          <MainTitle>todo list</MainTitle>

          <InputContainer isErrored={addTodoError.isError}>
            <button onClick={handleCompleteAll} type="button">
              <FiArrowDownCircle />
            </button>

            <input
              ref={inputAddTodo}
              name="addTodo"
              placeholder="Add your todo on a list"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />

            <button onClick={() => handleAddTodo(inputAddTodo)} type="button">
              <FiPlusCircle />
            </button>
          </InputContainer>

          {addTodoError.isError && (
            <TodoError>{addTodoError.message}</TodoError>
          )}

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
                    onBlur={() => handleEditTodo(index)}
                  >
                    {todo.value}
                  </label>

                  <button onClick={() => handleDeleteTodo(todo)} type="button">
                    <FiMinusCircle />
                  </button>
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
