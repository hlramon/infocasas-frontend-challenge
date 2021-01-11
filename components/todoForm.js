import React, { useState } from "react";
import utilsStyles from "../styles/utils.module.css";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (title) {
      addTodo({ title });
      setTitle("");
    }
  };

  return (
    <div className={utilsStyles.marginTop}>
      <form onSubmit={onSubmit}>
        <h3>Add task</h3>
        <div className="row">
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Add task"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary">Add task</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
