function Todo({ todo, onCheckCompleted, updateTodoTitle, deleteTodo }) {
  return (
    <li>
      <div className="row">
        <div className="col-sm-1 text-center">
          <div className="checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                onCheckCompleted(todo.id);
              }}
            />
          </div>
        </div>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            defaultValue={todo.title}
            onBlur={(e) => {
              updateTodoTitle({
                id: todo.id,
                title: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-sm-3">
          <button
            className="btn btn-danger"
            onClick={() => deleteTodo(todo.id)}
          >
            X
          </button>
        </div>
      </div>
    </li>
  );
}

export default Todo;
