const BASE_URL = process.env.REACT_APP_API_URL || "";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API 요청에 실패했습니다.");
  }
  return response.json();
};

export const apiClient = {
  get: async <T>(endpoint: string = ""): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },

  post: async <T>(endpoint: string, body: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  patch: async <T>(endpoint: string, body: unknown): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },
};
