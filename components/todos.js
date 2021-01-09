import React from "react";
import Todo from "./todo";

function Todos({
  todos,
  filterTodos,
  sortTodos,
  onCheckCompleted,
  updateTodoTitle,
  deleteTodo,
}) {
  return (
    <ul>
      {todos
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
  );
}

export default Todos;
