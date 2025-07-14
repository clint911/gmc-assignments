// src/components/Task.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    if (editedDescription.trim() !== '') {
      dispatch({
        type: 'EDIT_TASK',
        payload: { id: task.id, newDescription: editedDescription }
      });
      setIsEditing(false);
    }
  };

  return (
    <div className={`task-item ${task.isDone ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
            className="neuromorphic-checkbox"
          />
        </div>
        
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="handwritten-input"
              autoFocus
            />
            <div className="edit-buttons">
              <button onClick={handleEdit} className="save-button">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div 
            className={`task-description handwriting ${task.isDone ? 'strikethrough' : ''}`}
            onClick={() => setIsEditing(true)}
          >
            {task.description}
          </div>
        )}
        
        <button
          className="delete-button"
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
        >
          ×
        </button>
      </div>
      
      <div className="task-line"></div>
    </div>
  );
};

export default Task;