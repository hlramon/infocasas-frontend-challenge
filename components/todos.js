import React from "react";
import Todo from "./todo";
import utilStyles from "../styles/utils.module.css";
import styles from "./todos.module.css";

function Todos({
  todos,
  filterTodos,
  sortTodos,
  onCheckCompleted,
  updateTodoTitle,
  deleteTodo,
}) {
  return (
    <div className={utilStyles.marginTop}>
      <ul className={styles.todosList}>
        {todos &&
          todos.length > 0 &&
          todos
            .filter(filterTodos)
            .sort(sortTodos)
            .map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onCheckCompleted={onCheckCompleted}
                  updateTodoTitle={updateTodoTitle}
                  deleteTodo={deleteTodo}
                />
              );
            })}
      </ul>
    </div>
  );
}

export default Todos;
