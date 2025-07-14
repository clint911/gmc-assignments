// src/components/AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddTask = () => {
  const [newTask, setNewTask] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Write a new task..."
          className="handwritten-input"
        />
        <button type="submit" className="add-button">
          <span className="ink-effect">+ Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default AddTask;