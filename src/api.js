const BASE_URL = 'http://localhost:5000';

async function handleResponse(res) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      (data && (data.message || data.error || (data.messages && data.messages.join(', ')))) ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

async function apiFetch(path, options) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, options);
  } catch (networkErr) {
    // fetch() throws (not a bad HTTP status) when the server can't be reached at all
    throw new Error('Network error. Is the Express backend running on port 5000?');
  }
  return handleResponse(res);
}

export async function getTasks() {
  return apiFetch('/tasks');
}

export async function createTask(payload) {
  const data = await apiFetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return data.task; // backend wraps created task as { message, task }
}

export async function updateTask(id, updates) {
  const data = await apiFetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return data.task; // backend wraps updated task as { task }
}

export async function deleteTask(id) {
  return apiFetch(`/tasks/${id}`, { method: 'DELETE' });
}