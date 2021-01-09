import React, { useState } from "react";
import Layout from "../components/layout";
import TaskForm from "../components/taskForm";

function HomePage({ todos }) {
  const [todosFromState, setTodosFromState] = useState(todos);

  const addTask = ({ title }) => {
    const newTask = {
      id: todosFromState.length + 1,
      title,
      completed: false,
    };
    setTodosFromState([...todosFromState, newTask]);
  };

  return (
    <Layout>
      <h1>Welcome to the Personal Task Management App!</h1>
      <div>
        <h2>TODOS</h2>

        <TaskForm addTask={addTask} />

        <div>
          <p>Filter and Sort Tasks</p>
          <input type="text" placeholder="Filter tasks" />
          <button>Sort by completeness</button>
          <ul>
            {todosFromState.map((todo) => {
              return (
                <li key={todo.id}>
                  <p>
                    <input type="checkbox" defaultValue={todo.completed} />
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
