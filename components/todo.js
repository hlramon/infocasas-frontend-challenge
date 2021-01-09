function Todo({ todo, onCheckCompleted, updateTodoTitle, deleteTodo }) {
  return (
    <li>
      <p>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            onCheckCompleted(todo.id);
          }}
        />
        <input
          type="text"
          defaultValue={todo.title}
          onBlur={(e) => {
            updateTodoTitle({
              id: todo.id,
              title: e.target.value,
            });
          }}
        />
        <button onClick={() => deleteTodo(todo.id)}>X</button>
      </p>
    </li>
  );
}

export default Todo;
