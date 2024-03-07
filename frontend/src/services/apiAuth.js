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

// =================================UPDATE USER
export async function updateUser({ username, address }) {
  const { data } = await axios.put("/api/users/updateUser", {
    username,
    address,
  });
  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

// =================================UPDATE USER PASSWORD
export async function updatePassword(newPassword) {
  try {
    const { data } = await axios.put("/api/users/updatePassword", newPassword);
    return data;
  } catch (error) {
    throw Error(error.response.data.error);
  }
}

// =================================GET ALL USER
export async function getUsers() {
  try {
    const { data } = await axios.get("/api/users/");
    return data.users;
  } catch (error) {
    throw new Error("Failed to fetch users data");
  }
}

// =================================BLOCK USER
export async function block(id) {
  try {
    const { data } = await axios.put("/api/users/toggleBlock/" + id);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch users data");
  }
}

// =================================GET  USER BY ID
export async function getUserById(id) {
  try {
    const { data } = await axios.get("/api/users/" + id);
    return data.user;
  } catch (error) {
    throw new Error("Failed to fetch users data");
  }
}

// =================================UPDATE USER BY ID
export async function updateUserById(newData) {
  try {
    const { data } = await axios.put("/api/users/updateUserById", newData);
    return data;
  } catch (error) {
    throw Error(error.response.data.error);
  }
}
