import axios from "axios";

axios.defaults.baseURL =
  import.meta.env.NODE_ENV !== "production" ? "http://localhost:3000" : "/";
