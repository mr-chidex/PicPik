import axios from "axios";

const dexSplash = axios.create({
  baseURL: "/api/v1",
});

export const getServerApiBaseUrl = (req) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  return `${protocol}://${req.headers.host}/api/v1`;
};

export default dexSplash;
