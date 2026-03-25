const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}

export const get  = (path)       => request(path);
export const put  = (path, body) => request(path, { method: 'PUT',    body: JSON.stringify(body) });
export const post = (path, body) => request(path, { method: 'POST',   body: JSON.stringify(body) });
export const del  = (path)       => request(path, { method: 'DELETE' });
