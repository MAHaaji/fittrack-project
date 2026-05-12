import API_BASE from "../config";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("fittrack_token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("fittrack_token");
    localStorage.removeItem("fittrack_user");
    window.location.href = "/login";
    return;
  }

  return res;
}