import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import './index.css';

// Initial state
const initialState = {
  tasks: [
    { id: 1, description: 'Buy groceries for dinner', isDone: false },
    { id: 2, description: 'Finish React project', isDone: true },
    { id: 3, description: 'Schedule dentist appointment', isDone: false },
    { id: 4, description: 'Read new book chapter', isDone: false },
  ],
  filter: 'all'
};

// Reducer function
function taskReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now(),
          description: action.payload,
          isDone: false
        }]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload 
            ? { ...task, isDone: !task.isDone } 
            : task
        )
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id 
            ? { ...task, description: action.payload.newDescription } 
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

// Create Redux store
const store = createStore(taskReducer);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
