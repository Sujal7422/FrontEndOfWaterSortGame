// src/utils/baseURL.js
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://backendofwatersortgame.onrender.com";

export default BASE_URL;
