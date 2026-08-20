const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "serenly_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Can't reach the server. Is the backend running?",
      0,
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && auth) clearToken();
    throw new ApiError(
      data.message || "Something went wrong",
      res.status,
      data.errors,
    );
  }

  return data;
}

function toQuery(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  ).toString();
  return qs ? `?${qs}` : "";
}

async function uploadImage(file) {
  const token = getToken();
  const form = new FormData();
  form.append("image", file);

  let res;
  try {
    res = await fetch(`${API_BASE}/uploads`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
  } catch {
    throw new ApiError("Can't reach the server. Is the backend running?", 0);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) clearToken();
    throw new ApiError(data.message || "Upload failed", res.status, data.errors);
  }
  return data;
}

export const api = {
  contact: {
    create: (payload) => request("/contact", { method: "POST", body: payload }),
    list: (params = {}) => request(`/contact${toQuery(params)}`, { auth: true }),
    get: (id) => request(`/contact/${id}`, { auth: true }),
    updateStatus: (id, status) =>
      request(`/contact/${id}`, { method: "PATCH", body: { status }, auth: true }),
    remove: (id) => request(`/contact/${id}`, { method: "DELETE", auth: true }),
  },
  auth: {
    login: (email, password) =>
      request("/auth/login", { method: "POST", body: { email, password } }),
    me: () => request("/auth/me", { auth: true }),
  },
  posts: {
    list: (params = {}) => request(`/posts${toQuery(params)}`),
    getBySlug: (slug) => request(`/posts/${slug}`),
    listAdmin: (params = {}) => request(`/posts/admin${toQuery(params)}`, { auth: true }),
    getByIdAdmin: (id) => request(`/posts/admin/${id}`, { auth: true }),
    create: (payload) => request("/posts", { method: "POST", body: payload, auth: true }),
    update: (id, payload) =>
      request(`/posts/${id}`, { method: "PUT", body: payload, auth: true }),
    remove: (id) => request(`/posts/${id}`, { method: "DELETE", auth: true }),
  },
  uploads: {
    image: uploadImage,
  },
  projects: {
    list: (params = {}) => request(`/projects${toQuery(params)}`, { auth: true }),
    get: (id) => request(`/projects/${id}`, { auth: true }),
    create: (payload) => request("/projects", { method: "POST", body: payload, auth: true }),
    update: (id, payload) =>
      request(`/projects/${id}`, { method: "PUT", body: payload, auth: true }),
    remove: (id) => request(`/projects/${id}`, { method: "DELETE", auth: true }),
  },
  stats: {
    overview: () => request("/stats/overview", { auth: true }),
  },
};

export { ApiError };
