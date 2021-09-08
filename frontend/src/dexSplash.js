import axios from "axios";

const dexSplash = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default dexSplash;
