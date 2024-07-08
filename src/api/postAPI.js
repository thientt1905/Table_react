import { fetchClient } from "../untils/fetchAPI";
export const postsAPI = {
  getAll: () => {
    return fetchClient({ method: "GET" });
  },
  createPost: (newPost) => {
    return fetchClient({
      method: "POST",
      body: JSON.stringify(newPost),
    });
  },
};
