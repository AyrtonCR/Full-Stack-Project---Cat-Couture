const api = {
  getProducts: async (limit, page) =>
    await fetch(
      `${process.env.REACT_APP_API_URL}/products?limit=${limit}&page=${page}`
    ),
  getReports: async (accessToken) =>
    await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default api;
