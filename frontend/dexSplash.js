import axios from "axios";

const dexSplash = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default dexSplash;
