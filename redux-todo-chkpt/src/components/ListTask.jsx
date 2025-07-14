// src/components/ListTask.js
import React from 'react';
import { useDispatch } from 'react-redux';
import Task from './Task';

const ListTask = ({ tasks }) => {
  const dispatch = useDispatch();
  
  const handleFilterChange = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <div className="task-list-container">
      <div className="filter-controls">
        <button 
          className="filter-button" 
          onClick={() => handleFilterChange('all')}
        >
          All Tasks
        </button>
        <button 
          className="filter-button" 
          onClick={() => handleFilterChange('done')}
        >
          Completed
        </button>
        <button 
          className="filter-button" 
          onClick={() => handleFilterChange('notDone')}
        >
          Pending
        </button>
      </div>
      
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="handwriting">No tasks found...</div>
            <div className="handwriting-sub">Try adding a task or changing filters</div>
          </div>
        ) : (
          tasks.map(task => (
            <Task key={task.id} task={task} />
          ))
        )}
      </div>
      
      <div className="task-stats">
        <div className="handwriting">Total: {tasks.length} tasks</div>
        <div className="handwriting">
          Completed: {tasks.filter(t => t.isDone).length}
        </div>
      </div>
    </div>
  );
};

export default ListTask;