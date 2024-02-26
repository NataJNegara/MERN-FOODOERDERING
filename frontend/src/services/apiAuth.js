import axios from "axios";

// ==================================LOGIN
export async function login({ email, password }) {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

// =================================LOGOUT
export async function logout() {
  localStorage.removeItem("user");
}

// =================================GET CURRENT USER
export async function getCurrUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("Access denied: Please login!");
  }

  return user;
}

// =================================SIGN UP
export async function signup({ email, username, password, address }) {
  try {
    const { data } = await axios.post("/api/users/signup", {
      email,
      username,
      password,
      address,
    });
    return data;
  } catch (error) {
    throw Error(error.response.data.error);
  }
}