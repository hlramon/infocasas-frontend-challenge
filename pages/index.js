import Layout from "../components/layout";

function HomePage({ todos }) {
  return (
    <Layout>
      <h1>Welcome to the Personal Task Management App!</h1>
      <div>
        <h2>TODOS</h2>

        <div>
          <form>
            <p>Add task</p>
            <input type="text" placeholder="Add task" />
            <button>Add task</button>
          </form>
        </div>

        <div>
          <p>Filter and Sort Tasks</p>
          <input type="text" placeholder="Filter tasks" />
          <button>Sort by completeness</button>
          <ul>
            {todos.map((todo) => {
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
