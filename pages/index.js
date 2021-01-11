import React, { useState } from "react";
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

  const getNewTodoId = () => {
    const newTodos = [...todosFromState].sort(
      (todoA, todoB) => todoB.id - todoA.id
    );
    return newTodos[0].id + 1;
  };

  const addTodo = async ({ title }) => {
    if (title) {
      const newTodo = {
        id: getNewTodoId(),
        title,
        completed: false,
        userId: 1,
      };
      setLoading(true);
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setLoading(false);

      setTodosFromState([...todosFromState, newTodo]);
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

    const newTodos = todosFromState.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: todo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setLoading(false);

    setTodosFromState(newTodos);
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
      method: "DELETE",
    });

    setLoading(false);

    setTodosFromState(newTodos);
  };

  const updateTodoTitle = async ({ id, title }) => {
    const todo = todosFromState.find(
      (todo) => todo.id === id && todo.title !== title
    );

    if (todo) {
      const newTodos = todosFromState.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      });

      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: todo.title,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      setLoading(false);

      setTodosFromState(newTodos);
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
      <h1>Welcome to the Personal Task Management App!</h1>
      <div>
        <h2>Tasks</h2>

        <TodoForm addTodo={addTodo} />

        <div>
          <FilterAndSort
            onFilterChange={onFilterChange}
            onSortChange={onSortChange}
            completeness={!sortByCompleteness}
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
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
  const todos = await res.json();

  return {
    props: {
      todos,
    },
  };
}

export default HomePage;
