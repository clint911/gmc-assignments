// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import AddTask from './components/AddTask';
import ListTask from './components/ListTask';
import './App.css';

function App() {
  const tasks = useSelector(state => state.tasks);
  const filter = useSelector(state => state.filter);
  
  // Apply filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') return task.isDone;
    if (filter === 'notDone') return !task.isDone;
    return true;
  });

  return (
    <div className="notebook-app">
      <div className="notebook-cover">
        <div className="notebook-title">
          <h1>Neuromorphic Notes</h1>
          <div className="subtitle">Redux-powered Todo List</div>
        </div>
      </div>
      
      <div className="notebook-paper">
        <div className="notebook-margin">
          <div className="margin-line"></div>
          <div className="margin-line"></div>
          <div className="margin-line"></div>
          <div className="margin-line"></div>
          <div className="margin-line"></div>
        </div>
        
        <div className="notebook-content">
          <AddTask />
          <ListTask tasks={filteredTasks} />
        </div>
      </div>
      
      <div className="notebook-bottom">
        <div className="page-count">Page 1 of 1</div>
        <div className="notebook-spine"></div>
      </div>
    </div>
  );
}

export default App;