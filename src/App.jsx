import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, id: Date.now() }]);
      setNewTask('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    setEditingTask(id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editingText } : task)));
    setEditingTask(null);
    setEditingText('');
  };

  return (
    <div className="app">
      <div className="todo-list">
        <h1>Todo List</h1>
        <input 
          type="text" 
          placeholder="Enter a task" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button onClick={addTask} className="add-task">Add Task</button>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {editingTask === task.id ? (
                <>
                  <input 
                    type="text" 
                    value={editingText} 
                    onChange={(e) => setEditingText(e.target.value)} 
                  />
                  <button onClick={() => saveTask(task.id)} className="save-task">Save</button>
                </>
              ) : (
                <>
                  {task.text}
                  <button onClick={() => editTask(task.id)} className="edit-task">Edit</button>
                  <button onClick={() => removeTask(task.id)} className="remove-task">Remove</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;