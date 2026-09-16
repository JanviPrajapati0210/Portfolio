import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import Toast from './Toast';

const PRIORITIES = ['low', 'medium', 'high'];

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);
  const [confirmingId, setConfirmingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticTask = {
      _id: tempId,
      title,
      priority: newPriority,
      completed: false,
      __optimistic: true,
    };
    setTasks((prev) => [optimisticTask, ...prev]);
    setNewTitle('');
    setSubmitting(true);

    try {
      const created = await createTask({ title, priority: newPriority });
      setTasks((prev) => prev.map((t) => (t._id === tempId ? created : t)));
      showToast('Task added.', 'success');
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      showToast(err.message || 'Could not add task.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (task) => {
    const previous = tasks;
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, completed: !t.completed } : t))
    );
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch (err) {
      setTasks(previous);
      showToast(err.message || 'Could not update task.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== id));
    setConfirmingId(null);
    try {
      await deleteTask(id);
      showToast('Task deleted.', 'success');
    } catch (err) {
      setTasks(previous);
      showToast(err.message || 'Could not delete task.', 'error');
    }
  };

  if (loading) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '60px 0' }}>
        <span className="section__title section__title--projects">Tasks</span>
        <h3 style={{ color: 'var(--text)', marginTop: '16px', fontFamily: 'var(--font-display)' }}>
          Loading tasks...
        </h3>
        <div style={spinnerStyle}></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '60px 0' }}>
        <span className="section__title section__title--projects">Tasks</span>
        <h3 style={{ color: '#ff6b6b', marginTop: '16px', fontFamily: 'var(--font-display)' }}>
          Error Loading Tasks
        </h3>
        <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>{error}</p>
        <button onClick={loadTasks} className="btn btn--outline" style={{ cursor: 'pointer' }}>
          🔄 Retry
        </button>
      </section>
    );
  }

  return (
    <section className="section">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <span className="section__title section__title--projects" style={{ marginBottom: 0 }}>
          My Tasks
        </span>
        <span style={countBadgeStyle}>
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: '200px' }}
        />
        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)} style={inputStyle}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p[0].toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn--solid" disabled={submitting || !newTitle.trim()}>
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>
          No tasks yet. Add one above.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="projects__card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                opacity: task.__optimistic ? 0.6 : 1,
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  disabled={task.__optimistic}
                />
                <span>
                  <span
                    style={{
                      color: task.completed ? 'var(--muted)' : 'var(--text)',
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.title}
                  </span>
                  <span style={priorityBadgeStyle(task.priority)}>{task.priority}</span>
                </span>
              </label>

              {confirmingId === task._id ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Delete?</span>
                  <button className="btn btn--outline" style={{ padding: '4px 12px' }} onClick={() => handleDelete(task._id)}>
                    Yes
                  </button>
                  <button className="btn btn--outline" style={{ padding: '4px 12px' }} onClick={() => setConfirmingId(null)}>
                    No
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn--outline"
                  style={{ padding: '4px 12px' }}
                  onClick={() => setConfirmingId(task._id)}
                  disabled={task.__optimistic}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
};

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid var(--line)',
  borderTop: '4px solid var(--accent)',
  borderRadius: '50%',
  margin: '24px auto',
  animation: 'spin 1s linear infinite',
};

const inputStyle = {
  padding: '10px 16px',
  borderRadius: '999px',
  border: '1px solid var(--line)',
  backgroundColor: 'var(--bg-elevated)',
  color: 'var(--text)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem',
  outline: 'none',
};

const countBadgeStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: 'var(--text)',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--line)',
  padding: '4px 12px',
  borderRadius: '999px',
};

const priorityBadgeStyle = (priority) => ({
  marginLeft: '10px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  padding: '2px 8px',
  borderRadius: '999px',
  border: '1px solid var(--line)',
  color: priority === 'high' ? '#ff6b6b' : priority === 'low' ? 'var(--muted)' : 'var(--accent)',
});

export default TaskManager;