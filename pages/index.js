import React, { useEffect, useState } from "react";
import ErrorMessage from "../components/errorMessage";
import FilterAndSort from "../components/filterAndSort";
import Layout from "../components/layout";
import Loading from "../components/loading";
import TodoForm from "../components/todoForm";
import Todos from "../components/todos";
function HomePage({ todos }) {
  const [todosFromState, setTodosFromState] = useState(todos);
  const [filterTasksInput, setFilterTasksInput] = useState("");
  const [sortByCompleteness, setSortByCompleteness] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (!todos || todos.length === 0) {
      setError("We could not load the previous tasks");
    }
  }, [todos]);

  const getNewTodoId = () => {
    if (todosFromState && todosFromState.length > 0) {
      const newTodos = [...todosFromState].sort(
        (todoA, todoB) => todoB.id - todoA.id
      );
      return newTodos[0].id + 1;
    }

    return 300;
  };

  const addTodo = async ({ title }) => {
    if (title) {
      const newTodo = {
        id: getNewTodoId(),
        title,
        completed: false,
        userId: 1,
      };
      console.log("🚀 ~ file: index.js ~ line 49 ~ addTodo ~ newTodo", newTodo);
      setLoading(true);

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        setLoading(false);

        if (response.ok) {
          todosFromState && todosFromState.length > 0
            ? setTodosFromState([...todosFromState, newTodo])
            : setTodosFromState([newTodo]);
        } else {
          setError("We couldn't add the new task. Please try again");
        }
      } catch (err) {
        setLoading(false);
        setError("We couldn't add the new task. Please try again");
      }
    }
  };

  const filterTodos = (todo) => {
    if (filterTasksInput === "") {
      return todo;
    }
    if (todo.title.toLowerCase().includes(filterTasksInput.toLowerCase())) {
      return todo;
    }
  };

  const onCheckCompleted = async (id) => {
    const todo = todosFromState.find((todo) => todo.id === id);
    const completed = todo.completed;

    const newTodos = todosFromState.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !completed };
      }
      return todo;
    });

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          completed: !completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setLoading(false);

      if (response.ok) {
        setTodosFromState(newTodos);
      } else {
        setError(
          `We couldn't mark ${
            !completed ? "completed" : "no completed"
          } the task. Please try again`
        );
      }
    } catch (err) {
      setLoading(false);
      setError(
        `We couldn't mark ${
          !completed ? "completed" : "no completed"
        } the task. Please try again`
      );
    }
  };

  const sortTodos = (todoA, todoB) => {
    if (sortByCompleteness) {
      return todoA.completed ? -1 : 1;
    } else {
      return todoA.completed ? 1 : -1;
    }
  };

  const deleteTodo = async (id) => {
    const newTodos = todosFromState.filter((todo) => todo.id !== id);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
        method: "DELETE",
      });

      setLoading(false);

      if (response.ok) {
        setTodosFromState(newTodos);
      } else {
        setError("We couldn't delete the task. Please try again");
      }
    } catch (err) {
      setLoading(false);
      setError("We couldn't delete the task. Please try again");
    }
  };

  const updateTodoTitle = async ({ id, title }) => {
    const todo = todosFromState.find(
      (todo) => todo.id === id && todo.title !== title
    );

    if (todo) {
      const newTodos = todosFromState.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title };
        }
        return todo;
      });

      setLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              title,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );

        setLoading(false);

        if (response.ok) {
          setTodosFromState(newTodos);
        } else {
          setError("We couldn't update the task. Please try again");
        }
      } catch (err) {
        setLoading(false);
        setError("We couldn't update the task. Please try again");
      }
    }
  };

  const onFilterChange = (e) => {
    setFilterTasksInput(e.target.value);
  };

  const onSortChange = (e) => {
    setSortByCompleteness((prevSort) => !prevSort);
  };

  return (
    <Layout>
      <Loading loading={loading} />
      <ErrorMessage error={error} />
      <h1>Welcome to the Personal Task Management App!</h1>
      <div>
        <h2>Tasks</h2>

        <TodoForm addTodo={addTodo} />

        <div>
          <FilterAndSort
            onFilterChange={onFilterChange}
            onSortChange={onSortChange}
            completeness={sortByCompleteness}
          />

          <Todos
            todos={todosFromState}
            filterTodos={filterTodos}
            sortTodos={sortTodos}
            onCheckCompleted={onCheckCompleted}
            updateTodoTitle={updateTodoTitle}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL);

    if (res.ok) {
      const todos = await res.json();
      return {
        props: {
          todos,
        },
      };
    } else {
      return {
        props: {
          todos: [],
        },
      };
    }
  } catch (error) {
    return {
      props: {
        todos: [],
      },
    };
  }
}

export default HomePage;
