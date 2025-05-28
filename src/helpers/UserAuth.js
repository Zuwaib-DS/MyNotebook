const UserAuth = {
  saveAuth: (auth) => localStorage.setItem("user", JSON.stringify(auth)),
  getAuth: () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  clearAuth: () => localStorage.removeItem("user"),
  isAuthenticated: () => !!localStorage.getItem("user"),
};

export default UserAuth;