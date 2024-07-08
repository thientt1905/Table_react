export const fetchClient = async (url, options) => {
  url = "https://6683759c4102471fa4ca20eb.mockapi.io/post";
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
