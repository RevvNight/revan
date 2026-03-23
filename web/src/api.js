const BASE = process.env.REACT_APP_BACKEND;

const api = {
  post: async (path, data) => {
    const res = await fetch(`${BASE}/api${path}`, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  get: async (path) => {
    const res = await fetch(`${BASE}/api${path}`);
    return res.json();
  }
};

export default api;
