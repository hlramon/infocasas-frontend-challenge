import React, { useState } from "react";

function TaskForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (title) {
      addTodo({ title });
      setTitle("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>Add task</p>
        <input
          type="text"
          placeholder="Add task"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button>Add task</button>
      </form>
    </div>
  );
}

export default TaskForm;
