import React, { useState, useEffect } from 'react';

function Home() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const deleteTask = id => setTasks(tasks.filter(t => t.id !== id));

  const toggleTask = id =>
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const startEdit = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const saveEdit = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editInput } : t));
    setEditId(null);
    setEditInput('');
  };

  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true :
    filter === 'active' ? !t.completed :
    t.completed
  );

  return (
    <div className="mt-5 p-5">
      <h2>To-Do List</h2>
      <div>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div style={{ margin: '10px 0' }}>
        <button onClick={() => setFilter('all')} disabled={filter==='all'}>All</button>
        <button onClick={() => setFilter('active')} disabled={filter==='active'}>Active</button>
        <button onClick={() => setFilter('completed')} disabled={filter==='completed'}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ margin: '8px 0' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {editId === task.id ? (
              <>
                <input
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
                  autoFocus
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    marginLeft: 8,
                    marginRight: 8
                  }}
                >
                  {task.text}
                </span>
                <button onClick={() => startEdit(task.id, task.text)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;