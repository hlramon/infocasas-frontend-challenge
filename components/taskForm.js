import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addTask({ title });
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
        />
        <button>Add task</button>
      </form>
    </div>
  );
}

export default TaskForm;
