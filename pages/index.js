import React, { useState } from "react";
import Layout from "../components/layout";
import TaskForm from "../components/taskForm";

function HomePage({ todos }) {
  const [todosFromState, setTodosFromState] = useState(todos);
  const [filterTasksInput, setFilterTasksInput] = useState("");
  const [sortByCompleteness, setSortByCompleteness] = useState(false);

  const addTask = ({ title }) => {
    if (title) {
      const newTask = {
        id: todosFromState.length + 1,
        title,
        completed: false,
      };
      setTodosFromState([...todosFromState, newTask]);
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

  const onCheckCompleted = (id) => {
    const newTasks = todosFromState.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodosFromState(newTasks);
  };

  const sortTodos = (todoA, todoB) => {
    if (sortByCompleteness) {
      return todoA.completed ? -1 : 1;
    } else {
      return todoA.completed ? 1 : -1;
    }
  };

  return (
    <Layout>
      <h1>Welcome to the Personal Task Management App!</h1>
      <div>
        <h2>TODOS</h2>

        <TaskForm addTask={addTask} />

        <div>
          <p>Filter and Sort Tasks</p>
          <input
            type="text"
            placeholder="Filter tasks"
            value={filterTasksInput}
            onChange={(e) => setFilterTasksInput(e.target.value)}
          />
          <button
            onClick={() => setSortByCompleteness((prevSort) => !prevSort)}
          >
            Sort by completeness
          </button>
          <ul>
            {todosFromState
              .filter(filterTodos)
              .sort(sortTodos)
              .map((todo) => {
                return (
                  <li key={todo.id}>
                    <p>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => {
                          onCheckCompleted(todo.id);
                        }}
                      />
                      <input type="text" defaultValue={todo.title} />
                      <button>X</button>
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const todos = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
    },
  ];

  return {
    props: {
      todos,
    },
  };
}

export default HomePage;
