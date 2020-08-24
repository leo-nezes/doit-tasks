import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  RefObject,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import {
  FiArrowDownCircle,
  FiCircle,
  FiAlertCircle,
  FiPlusCircle,
  FiCheckCircle,
  FiMinusCircle,
} from 'react-icons/fi';

import {
  Container,
  InformationContainer,
  Header,
  MainContainer,
  Main,
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
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [selectAll, setSelectAll] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const [addTodoError, setAddTodoError] = useState({
    isError: false,
    locale: '',
    message: '',
  });
  const inputAddTodo = useRef<HTMLInputElement>(null);
  const labelRefs = useRef<HTMLLabelElement[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('@TodoApp:user-data');

    if (data) setTodos([...JSON.parse(data)]);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const addErrorMessage = useCallback((locale: string, message: string) => {
    const errorParam = { isError: true, locale, message };
    setAddTodoError(errorParam);
  }, []);

  const handleChangeComplete = useCallback(
    (todo: TodoProps) => {
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
      localStorage.setItem('@TodoApp:user-data', JSON.stringify([...newTodos]));
    },
    [todos],
  );

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
    localStorage.setItem(
      '@TodoApp:user-data',
      JSON.stringify([...newTodosWithCompleteChange]),
    );
  }, [selectAll, todos]);

  const handleAddTodo = useCallback(
    async (data: RefObject<HTMLInputElement>) => {
      try {
        const formattedData = { addTodo: data.current?.value };

        const schema = Yup.object().shape({
          addTodo: Yup.string().required('Preenchimento obrigatório.'),
        });

        await schema.validate(formattedData, {
          abortEarly: false,
        });

        const oldTodos = [...todos];

        if (!formattedData.addTodo)
          throw new Error('Erro ao encontrar valor do input addTodo');

        const { addTodo } = formattedData;

        const newTodo = {
          id: uuidv4(),
          prevValue: '',
          value: addTodo,
          complete: false,
        };

        setTodos([...oldTodos, newTodo]);
        localStorage.setItem(
          '@TodoApp:user-data',
          JSON.stringify([...oldTodos, newTodo]),
        );

        if (!inputAddTodo.current)
          throw new Error('Erro ao encontrar referência do input addTodo');

        inputAddTodo.current.value = '';

        setAddTodoError({
          isError: false,
          locale: '',
          message: '',
        });
      } catch (errors) {
        if (errors instanceof Yup.ValidationError) {
          errors.inner.forEach((err) => {
            addErrorMessage(err.path, err.message);
          });

          return;
        }
        console.log(errors);
      }
    },
    [todos, addErrorMessage],
  );

  const handleEditTodo = useCallback(
    (label: HTMLLabelElement, index: number) => {
      const formattedLabelData = { labelValue: label.innerText };

      if (!formattedLabelData.labelValue) {
        const todoToBeRemoved = todos[index];

        const newTodos = todos.filter((todo) => todo.id !== todoToBeRemoved.id);

        setTodos([...newTodos]);
        localStorage.setItem(
          '@TodoApp:user-data',
          JSON.stringify([...newTodos]),
        );

        return;
      }

      const todosUpdated = [...todos];
      const findedTodo = todosUpdated[index];

      if (!findedTodo)
        throw new Error('Error to edit todo item. Try again, later.');

      const newTodo = {
        id: findedTodo.id,
        prevValue: findedTodo.value,
        value: formattedLabelData.labelValue,
        complete: findedTodo.complete,
      };

      todosUpdated[index] = newTodo;

      setTodos([...todosUpdated]);
      localStorage.setItem(
        '@TodoApp:user-data',
        JSON.stringify([...todosUpdated]),
      );
    },
    [todos],
  );

  const handleDeleteTodo = useCallback(
    (todo: TodoProps) => {
      const newTodos = todos.filter((todoFilter) => todoFilter.id !== todo.id);

      setTodos([...newTodos]);
      localStorage.setItem('@TodoApp:user-data', JSON.stringify([...newTodos]));
    },
    [todos],
  );

  return (
    <Container>
      <InformationContainer>Teste</InformationContainer>

      <MainContainer>
        <Header>
          <h1>TODO App</h1>
        </Header>

        <Main>
          <InputContainer
            isErrored={addTodoError.isError}
            isFocused={isFocused}
          >
            {addTodoError.isError ? (
              <button type="button">
                <FiAlertCircle />
              </button>
            ) : (
              <button onClick={handleCompleteAll} type="button">
                <FiArrowDownCircle />
              </button>
            )}

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
                    onBlur={() =>
                      handleEditTodo(labelRefs.current[index], index)
                    }
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

        <Footer>
          <span>
            Created by{' '}
            <a href="https://github.com/leo-nezes/todo-app">leo.nezes</a>
          </span>
        </Footer>
      </MainContainer>
    </Container>
  );
};

export default Dashboard;
