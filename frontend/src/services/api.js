const API_URL = "http://localhost:3000/api";

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de la requête.");
  }

  return response.json();
}

export const api = {
  login: (data) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getQuizzes: () =>
    apiRequest("/quizzes"),

  createQuiz: (data) =>
    apiRequest("/quizzes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getHistory: () =>
    apiRequest("/history"),
};