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

export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  return handleResponse(res);
}

export async function createTask(payload) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse(res);
  return data.task; // backend wraps created task as { message, task }
}

export async function updateTask(id, updates) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await handleResponse(res);
  return data.task; // backend wraps updated task as { task }
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}